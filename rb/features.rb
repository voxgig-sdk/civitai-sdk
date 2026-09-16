# Civitai SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module CivitaiFeatures
  def self.make_feature(name)
    case name
    when "base"
      CivitaiBaseFeature.new
    when "ratelimit"
      CivitaiRatelimitFeature.new
    when "retry"
      CivitaiRetryFeature.new
    when "test"
      CivitaiTestFeature.new
    when "timeout"
      CivitaiTimeoutFeature.new
    else
      CivitaiBaseFeature.new
    end
  end
end
