# Model entity test

require "minitest/autorun"
require "json"
require_relative "../Civitai_sdk"
require_relative "runner"

class ModelEntityTest < Minitest::Test
  def test_create_instance
    testsdk = CivitaiSDK.test(nil, nil)
    ent = testsdk.Model(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = model_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "model." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set CIVITAI_TEST_MODEL_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    model_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.model")))
    model_ref01_data = nil
    if model_ref01_data_raw.length > 0
      model_ref01_data = Helpers.to_map(model_ref01_data_raw[0][1])
    end

    # LIST
    model_ref01_ent = client.Model(nil)
    model_ref01_match = {}

    model_ref01_list_result = model_ref01_ent.list(model_ref01_match, nil)
    assert model_ref01_list_result.is_a?(Array)

    # LOAD
    model_ref01_match_dt0 = {
      "id" => model_ref01_data["id"],
    }
    model_ref01_data_dt0_loaded = model_ref01_ent.load(model_ref01_match_dt0, nil)
    model_ref01_data_dt0_load_result = Helpers.to_map(model_ref01_data_dt0_loaded)
    assert !model_ref01_data_dt0_load_result.nil?
    assert_equal model_ref01_data_dt0_load_result["id"], model_ref01_data["id"]

  end
end

def model_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "model", "ModelTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = CivitaiSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["model01", "model02", "model03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["CIVITAI_TEST_MODEL_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "CIVITAI_TEST_MODEL_ENTID" => idmap,
    "CIVITAI_TEST_LIVE" => "FALSE",
    "CIVITAI_TEST_EXPLAIN" => "FALSE",
    "CIVITAI_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["CIVITAI_TEST_MODEL_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["CIVITAI_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
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
