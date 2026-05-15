# Civitai SDK exists test

require "minitest/autorun"
require_relative "../Civitai_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = CivitaiSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
