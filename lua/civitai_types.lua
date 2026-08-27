-- Typed models for the Civitai SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Creator
---@field link? string
---@field modelCount? number
---@field username? string

---@class CreatorListMatch
---@field limit? number
---@field page? number
---@field query? string

---@class Image
---@field createdAt? string
---@field hash? string
---@field height? number
---@field id? number
---@field meta? table
---@field nsfw? boolean
---@field nsfwLevel? string
---@field postId? number
---@field stats? table
---@field url? string
---@field username? string
---@field width? number

---@class ImageListMatch
---@field limit? number
---@field model_id? number
---@field model_version_id? number
---@field nsfw? any
---@field page? number
---@field period? string
---@field post_id? number
---@field sort? string
---@field username? string

---@class Model
---@field creator? table
---@field description? string
---@field id? number
---@field mode? string
---@field modelVersions? table
---@field name? string
---@field nsfw? boolean
---@field stats? table
---@field tags? table
---@field type? string

---@class ModelLoadMatch
---@field id number

---@class ModelListMatch
---@field allow_commercial_use? boolean
---@field allow_derivatif? boolean
---@field allow_different_license? boolean
---@field allow_no_credit? boolean
---@field favorite? boolean
---@field hidden? boolean
---@field limit? number
---@field nsfw? boolean
---@field page? number
---@field period? string
---@field primary_file_only? boolean
---@field query? string
---@field rating? number
---@field sort? string
---@field supports_generation? boolean
---@field tag? string
---@field type? table
---@field username? string

---@class ModelVersion
---@field createdAt? string
---@field description? string
---@field downloadUrl? string
---@field files? table
---@field id? number
---@field images? table
---@field name? string
---@field stats? table
---@field trainedWords? table

---@class ModelVersionLoadMatch
---@field id number

---@class Tag
---@field link? string
---@field modelCount? number
---@field name? string

---@class TagListMatch
---@field limit? number
---@field page? number
---@field query? string

local M = {}

return M
