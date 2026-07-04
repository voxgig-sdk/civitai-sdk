# frozen_string_literal: true

# Typed models for the Civitai SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Creator entity data model.
#
# @!attribute [rw] link
#   @return [String, nil]
#
# @!attribute [rw] model_count
#   @return [Integer, nil]
#
# @!attribute [rw] username
#   @return [String, nil]
Creator = Struct.new(
  :link,
  :model_count,
  :username,
  keyword_init: true
)

# Match filter for Creator#list (any subset of Creator fields).
#
# @!attribute [rw] link
#   @return [String, nil]
#
# @!attribute [rw] model_count
#   @return [Integer, nil]
#
# @!attribute [rw] username
#   @return [String, nil]
CreatorListMatch = Struct.new(
  :link,
  :model_count,
  :username,
  keyword_init: true
)

# Image entity data model.
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] hash
#   @return [String, nil]
#
# @!attribute [rw] height
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] nsfw
#   @return [Boolean, nil]
#
# @!attribute [rw] nsfw_level
#   @return [String, nil]
#
# @!attribute [rw] post_id
#   @return [Integer, nil]
#
# @!attribute [rw] stat
#   @return [Hash, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] username
#   @return [String, nil]
#
# @!attribute [rw] width
#   @return [Integer, nil]
Image = Struct.new(
  :created_at,
  :hash,
  :height,
  :id,
  :meta,
  :nsfw,
  :nsfw_level,
  :post_id,
  :stat,
  :url,
  :username,
  :width,
  keyword_init: true
)

# Match filter for Image#list (any subset of Image fields).
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] hash
#   @return [String, nil]
#
# @!attribute [rw] height
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] nsfw
#   @return [Boolean, nil]
#
# @!attribute [rw] nsfw_level
#   @return [String, nil]
#
# @!attribute [rw] post_id
#   @return [Integer, nil]
#
# @!attribute [rw] stat
#   @return [Hash, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] username
#   @return [String, nil]
#
# @!attribute [rw] width
#   @return [Integer, nil]
ImageListMatch = Struct.new(
  :created_at,
  :hash,
  :height,
  :id,
  :meta,
  :nsfw,
  :nsfw_level,
  :post_id,
  :stat,
  :url,
  :username,
  :width,
  keyword_init: true
)

# Model entity data model.
#
# @!attribute [rw] creator
#   @return [Hash, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] mode
#   @return [String, nil]
#
# @!attribute [rw] model_version
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] nsfw
#   @return [Boolean, nil]
#
# @!attribute [rw] stat
#   @return [Hash, nil]
#
# @!attribute [rw] tag
#   @return [Array, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
Model = Struct.new(
  :creator,
  :description,
  :id,
  :mode,
  :model_version,
  :name,
  :nsfw,
  :stat,
  :tag,
  :type,
  keyword_init: true
)

# Request payload for Model#load.
#
# @!attribute [rw] id
#   @return [Integer]
ModelLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Match filter for Model#list (any subset of Model fields).
#
# @!attribute [rw] creator
#   @return [Hash, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] mode
#   @return [String, nil]
#
# @!attribute [rw] model_version
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] nsfw
#   @return [Boolean, nil]
#
# @!attribute [rw] stat
#   @return [Hash, nil]
#
# @!attribute [rw] tag
#   @return [Array, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
ModelListMatch = Struct.new(
  :creator,
  :description,
  :id,
  :mode,
  :model_version,
  :name,
  :nsfw,
  :stat,
  :tag,
  :type,
  keyword_init: true
)

# ModelVersion entity data model.
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] download_url
#   @return [String, nil]
#
# @!attribute [rw] file
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] image
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] stat
#   @return [Hash, nil]
#
# @!attribute [rw] trained_word
#   @return [Array, nil]
ModelVersion = Struct.new(
  :created_at,
  :description,
  :download_url,
  :file,
  :id,
  :image,
  :name,
  :stat,
  :trained_word,
  keyword_init: true
)

# Request payload for ModelVersion#load.
#
# @!attribute [rw] hash
#   @return [String]
#
# @!attribute [rw] id
#   @return [Integer]
ModelVersionLoadMatch = Struct.new(
  :hash,
  :id,
  keyword_init: true
)

# Tag entity data model.
#
# @!attribute [rw] link
#   @return [String, nil]
#
# @!attribute [rw] model_count
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
Tag = Struct.new(
  :link,
  :model_count,
  :name,
  keyword_init: true
)

# Match filter for Tag#list (any subset of Tag fields).
#
# @!attribute [rw] link
#   @return [String, nil]
#
# @!attribute [rw] model_count
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
TagListMatch = Struct.new(
  :link,
  :model_count,
  :name,
  keyword_init: true
)

