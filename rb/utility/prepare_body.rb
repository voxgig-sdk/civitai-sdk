# Civitai SDK utility: prepare_body
require_relative 'media'
module CivitaiUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return CivitaiUtilities.raw_body(ctx.reqdata) if CivitaiUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
