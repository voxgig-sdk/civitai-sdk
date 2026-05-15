# Civitai SDK utility: make_context
require_relative '../core/context'
module CivitaiUtilities
  MakeContext = ->(ctxmap, basectx) {
    CivitaiContext.new(ctxmap, basectx)
  }
end
