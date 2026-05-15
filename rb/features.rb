# Civitai SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module CivitaiFeatures
  def self.make_feature(name)
    case name
    when "base"
      CivitaiBaseFeature.new
    when "test"
      CivitaiTestFeature.new
    else
      CivitaiBaseFeature.new
    end
  end
end
