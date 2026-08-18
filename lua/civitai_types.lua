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
---@field link? string
---@field modelCount? number
---@field username? string

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
---@field link? string
---@field modelCount? number
---@field name? string

local M = {}

return M
