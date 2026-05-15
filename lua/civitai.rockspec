package = "voxgig-sdk-civitai"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/civitai-sdk.git"
}
description = {
  summary = "Civitai SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["civitai_sdk"] = "civitai_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
