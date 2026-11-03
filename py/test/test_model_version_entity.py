# ModelVersion entity test

import json
import os
import time

import pytest

from civitai_sdk.utility.voxgig_struct import voxgig_struct as vs
from civitai_sdk import CivitaiSDK
from civitai_sdk.core import helpers
from civitai_sdk.config import shared_config
from civitai_sdk.feature.base_feature import CivitaiBaseFeature

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestModelVersionEntity:

    def test_should_create_instance(self):
        testsdk = CivitaiSDK.test(None, None)
        ent = testsdk.ModelVersion(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = CivitaiSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.ModelVersion(None).load({"id": "x"}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _model_version_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "model_version." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"]:
            for _live_key, _live_ex in {"model_version01": 290640}.items():
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    setup["idmap"][_live_key] = _live_ex
        client = setup["client"]
        if setup["live"]:
            runner.live_existing(setup, LIVE_STRICT, "model_version",
                                 lambda: [{"id": setup["idmap"].get("model_version01")}])

        # Bootstrap entity data from existing test data.
        model_version_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.model_version")))
        model_version_ref01_data = None
        if len(model_version_ref01_data_raw) > 0:
            model_version_ref01_data = helpers.to_map(model_version_ref01_data_raw[0][1])

        # LOAD
        model_version_ref01_ent = client.ModelVersion(None)
        model_version_ref01_match_dt0 = {
            "id": model_version_ref01_data["id"],
        }
        model_version_ref01_data_dt0_loaded = model_version_ref01_ent.load(model_version_ref01_match_dt0, None)
        model_version_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(model_version_ref01_data_dt0_loaded))
        assert model_version_ref01_data_dt0_load_result is not None
        assert model_version_ref01_data_dt0_load_result["id"] == model_version_ref01_data["id"]



def _model_version_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/model_version/ModelVersionTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = CivitaiSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["model_version01", "model_version02", "model_version03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Whether *_ENTID supplied the idmap, read before env_override consumes
    # it: without it, the ids a live flow binds are the fixture's synthetic ones.
    _entid_env_raw = os.environ.get(
        "CIVITAI_TEST_MODEL_VERSION_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "CIVITAI_TEST_MODEL_VERSION_ENTID": idmap,
        "CIVITAI_TEST_LIVE": "FALSE",
        "CIVITAI_TEST_EXPLAIN": "FALSE",
        "CIVITAI_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("CIVITAI_TEST_MODEL_VERSION_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("CIVITAI_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
                "apikey": env.get("CIVITAI_APIKEY"),
            },
            extra or {},
        ])
        client = CivitaiSDK(helpers.to_map(merged_opts))

    _live = env.get("CIVITAI_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("CIVITAI_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
