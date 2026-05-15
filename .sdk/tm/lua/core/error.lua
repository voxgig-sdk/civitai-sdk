-- Civitai SDK error

local CivitaiError = {}
CivitaiError.__index = CivitaiError


function CivitaiError.new(code, msg, ctx)
  local self = setmetatable({}, CivitaiError)
  self.is_sdk_error = true
  self.sdk = "Civitai"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function CivitaiError:error()
  return self.msg
end


function CivitaiError:__tostring()
  return self.msg
end


return CivitaiError
