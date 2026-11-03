# ModelVersion entity test

require "minitest/autorun"
require "json"
require_relative "../Civitai_sdk"
require_relative "runner"

class ModelVersionEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = CivitaiSDK.test(nil, nil)
    ent = testsdk.ModelVersion(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = CivitaiConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = CivitaiSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.ModelVersion(nil).load({ "id" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = model_version_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "model_version." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live]
      { "model_version01" => 290640 }.each do |_live_key, _live_ex|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          setup[:idmap][_live_key] = _live_ex
        end
      end
    end
    client = setup[:client]
    if setup[:live]
      Runner.live_existing(setup, LIVE_STRICT, "model_version") do
        [{ "id" => setup[:idmap]["model_version01"] }]
      end
    end

    # Bootstrap entity data from existing test data.
    model_version_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.model_version")))
    model_version_ref01_data = nil
    if model_version_ref01_data_raw.length > 0
      model_version_ref01_data = Helpers.to_map(model_version_ref01_data_raw[0][1])
    end

    # LOAD
    model_version_ref01_ent = client.ModelVersion(nil)
    model_version_ref01_match_dt0 = {
      "id" => model_version_ref01_data["id"],
    }
    model_version_ref01_data_dt0_loaded = model_version_ref01_ent.load(model_version_ref01_match_dt0, nil)
    model_version_ref01_data_dt0_load_result = Helpers.to_map(model_version_ref01_data_dt0_loaded.respond_to?(:data_get) ? model_version_ref01_data_dt0_loaded.data_get : model_version_ref01_data_dt0_loaded)
    assert !model_version_ref01_data_dt0_load_result.nil?
    assert_equal model_version_ref01_data_dt0_load_result["id"], model_version_ref01_data["id"]

  end
end

def model_version_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "model_version", "ModelVersionTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = CivitaiSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["model_version01", "model_version02", "model_version03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["CIVITAI_TEST_MODEL_VERSION_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "CIVITAI_TEST_MODEL_VERSION_ENTID" => idmap,
    "CIVITAI_TEST_LIVE" => "FALSE",
    "CIVITAI_TEST_EXPLAIN" => "FALSE",
    "CIVITAI_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["CIVITAI_TEST_MODEL_VERSION_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["CIVITAI_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
        "apikey" => env["CIVITAI_APIKEY"],
      },
      extra || {},
    ])
    client = CivitaiSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["CIVITAI_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["CIVITAI_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
