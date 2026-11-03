package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/civitai-sdk/go"
	"github.com/voxgig-sdk/civitai-sdk/go/core"

	vs "github.com/voxgig-sdk/civitai-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const model_versionEntityLiveStrict = true


func TestModelVersionEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ModelVersion(nil)
		if ent == nil {
			t.Fatal("expected non-nil ModelVersionEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.ModelVersion(nil).Load(map[string]any{"id": "x"}, nil)
		if sdkerr, ok := err.(*core.CivitaiError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
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
		if setup.live {
			for _liveKey, _liveEx := range map[string]any{"model_version01": float64(290640)} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					setup.idmap[_liveKey] = _liveEx
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			liveExisting(t, model_versionEntityLiveStrict, setup.data, "model_version", func() (any, error) {
				return []any{map[string]any{"id": setup.idmap["model_version01"]}}, nil
			})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		modelVersionRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.model_version")))
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
		modelVersionRef01DataDt0LoadResult := core.ToMapAny(entityData(modelVersionRef01DataDt0Loaded))
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
	idmap, _ := vs.Transform(
		[]any{"model_version01", "model_version02", "model_version03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("CIVITAI_TEST_MODEL_VERSION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"CIVITAI_TEST_MODEL_VERSION_ENTID": idmap,
		"CIVITAI_TEST_LIVE":      "FALSE",
		"CIVITAI_TEST_EXPLAIN":   "FALSE",
		"CIVITAI_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["CIVITAI_TEST_MODEL_VERSION_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["CIVITAI_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["CIVITAI_APIKEY"],
			},
			extraOpts,
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
