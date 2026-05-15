package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/civitai-sdk"
	"github.com/voxgig-sdk/civitai-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestModelVersionEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ModelVersion(nil)
		if ent == nil {
			t.Fatal("expected non-nil ModelVersionEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := model_versionBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "model_version." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set CIVITAI_TEST_MODEL_VERSION_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		modelVersionRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.model_version", setup.data)))
		var modelVersionRef01Data map[string]any
		if len(modelVersionRef01DataRaw) > 0 {
			modelVersionRef01Data = core.ToMapAny(modelVersionRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = modelVersionRef01Data

		// LOAD
		modelVersionRef01Ent := client.ModelVersion(nil)
		modelVersionRef01MatchDt0 := map[string]any{
			"id": modelVersionRef01Data["id"],
		}
		modelVersionRef01DataDt0Loaded, err := modelVersionRef01Ent.Load(modelVersionRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		modelVersionRef01DataDt0LoadResult := core.ToMapAny(modelVersionRef01DataDt0Loaded)
		if modelVersionRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if modelVersionRef01DataDt0LoadResult["id"] != modelVersionRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func model_versionBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "model_version", "ModelVersionTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read model_version test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse model_version test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"model_version01", "model_version02", "model_version03", "by_hash01", "by_hash02", "by_hash03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("CIVITAI_TEST_MODEL_VERSION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"CIVITAI_TEST_MODEL_VERSION_ENTID": idmap,
		"CIVITAI_TEST_LIVE":      "FALSE",
		"CIVITAI_TEST_EXPLAIN":   "FALSE",
		"CIVITAI_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["CIVITAI_TEST_MODEL_VERSION_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["CIVITAI_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["CIVITAI_APIKEY"],
			},
			extra,
		})
		client = sdk.NewCivitaiSDK(core.ToMapAny(mergedOpts))
	}

	live := env["CIVITAI_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["CIVITAI_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
