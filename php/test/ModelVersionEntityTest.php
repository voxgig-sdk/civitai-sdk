<?php
declare(strict_types=1);

// ModelVersion entity test

require_once __DIR__ . '/../civitai_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class ModelVersionEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = CivitaiSDK::test(null, null);
        $ent = $testsdk->ModelVersion(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = model_version_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "model_version." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set CIVITAI_TEST_MODEL_VERSION_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $model_version_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.model_version")));
        $model_version_ref01_data = null;
        if (count($model_version_ref01_data_raw) > 0) {
            $model_version_ref01_data = Helpers::to_map($model_version_ref01_data_raw[0][1]);
        }

        // LOAD
        $model_version_ref01_ent = $client->ModelVersion(null);
        $model_version_ref01_match_dt0 = [
            "id" => $model_version_ref01_data["id"],
        ];
        $model_version_ref01_data_dt0_loaded = $model_version_ref01_ent->load($model_version_ref01_match_dt0, null);
        $model_version_ref01_data_dt0_load_result = Helpers::to_map($model_version_ref01_data_dt0_loaded);
        $this->assertNotNull($model_version_ref01_data_dt0_load_result);
        $this->assertEquals($model_version_ref01_data_dt0_load_result["id"], $model_version_ref01_data["id"]);

    }
}

function model_version_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/model_version/ModelVersionTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = CivitaiSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["model_version01", "model_version02", "model_version03", "by_hash01", "by_hash02", "by_hash03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("CIVITAI_TEST_MODEL_VERSION_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "CIVITAI_TEST_MODEL_VERSION_ENTID" => $idmap,
        "CIVITAI_TEST_LIVE" => "FALSE",
        "CIVITAI_TEST_EXPLAIN" => "FALSE",
        "CIVITAI_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["CIVITAI_TEST_MODEL_VERSION_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["CIVITAI_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["CIVITAI_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new CivitaiSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["CIVITAI_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["CIVITAI_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
