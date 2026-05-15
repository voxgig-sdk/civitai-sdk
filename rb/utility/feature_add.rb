# Civitai SDK utility: feature_add
module CivitaiUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
