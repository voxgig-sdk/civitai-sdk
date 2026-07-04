-- Typed models for the Civitai SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Creator
---@field link? string
---@field model_count? number
---@field username? string

---@class CreatorListMatch

---@class Image
---@field created_at? string
---@field hash? string
---@field height? number
---@field id? number
---@field meta? table
---@field nsfw? boolean
---@field nsfw_level? string
---@field post_id? number
---@field stat? table
---@field url? string
---@field username? string
---@field width? number

---@class ImageListMatch

---@class Model
---@field creator? table
---@field description? string
---@field id? number
---@field mode? string
---@field model_version? table
---@field name? string
---@field nsfw? boolean
---@field stat? table
---@field tag? table
---@field type? string

---@class ModelLoadMatch
---@field id number

---@class ModelListMatch

---@class ModelVersion
---@field created_at? string
---@field description? string
---@field download_url? string
---@field file? table
---@field id? number
---@field image? table
---@field name? string
---@field stat? table
---@field trained_word? table

---@class ModelVersionLoadMatch
---@field hash string
---@field id number

---@class Tag
---@field link? string
---@field model_count? number
---@field name? string

---@class TagListMatch

local M = {}

return M
