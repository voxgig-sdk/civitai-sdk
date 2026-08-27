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
# @!attribute [rw] modelCount
#   @return [Integer, nil]
#
# @!attribute [rw] username
#   @return [String, nil]
Creator = Struct.new(
  :link,
  :modelCount,
  :username,
  keyword_init: true
)

# Request payload for Creator#list.
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] query
#   @return [String, nil]
CreatorListMatch = Struct.new(
  :limit,
  :page,
  :query,
  keyword_init: true
)

# Image entity data model.
#
# @!attribute [rw] createdAt
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
# @!attribute [rw] nsfwLevel
#   @return [String, nil]
#
# @!attribute [rw] postId
#   @return [Integer, nil]
#
# @!attribute [rw] stats
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
  :createdAt,
  :hash,
  :height,
  :id,
  :meta,
  :nsfw,
  :nsfwLevel,
  :postId,
  :stats,
  :url,
  :username,
  :width,
  keyword_init: true
)

# Request payload for Image#list.
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] model_id
#   @return [Integer, nil]
#
# @!attribute [rw] model_version_id
#   @return [Integer, nil]
#
# @!attribute [rw] nsfw
#   @return [Object, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] period
#   @return [String, nil]
#
# @!attribute [rw] post_id
#   @return [Integer, nil]
#
# @!attribute [rw] sort
#   @return [String, nil]
#
# @!attribute [rw] username
#   @return [String, nil]
ImageListMatch = Struct.new(
  :limit,
  :model_id,
  :model_version_id,
  :nsfw,
  :page,
  :period,
  :post_id,
  :sort,
  :username,
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
# @!attribute [rw] modelVersions
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] nsfw
#   @return [Boolean, nil]
#
# @!attribute [rw] stats
#   @return [Hash, nil]
#
# @!attribute [rw] tags
#   @return [Array, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
Model = Struct.new(
  :creator,
  :description,
  :id,
  :mode,
  :modelVersions,
  :name,
  :nsfw,
  :stats,
  :tags,
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

# Request payload for Model#list.
#
# @!attribute [rw] allow_commercial_use
#   @return [Boolean, nil]
#
# @!attribute [rw] allow_derivatif
#   @return [Boolean, nil]
#
# @!attribute [rw] allow_different_license
#   @return [Boolean, nil]
#
# @!attribute [rw] allow_no_credit
#   @return [Boolean, nil]
#
# @!attribute [rw] favorite
#   @return [Boolean, nil]
#
# @!attribute [rw] hidden
#   @return [Boolean, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] nsfw
#   @return [Boolean, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] period
#   @return [String, nil]
#
# @!attribute [rw] primary_file_only
#   @return [Boolean, nil]
#
# @!attribute [rw] query
#   @return [String, nil]
#
# @!attribute [rw] rating
#   @return [Float, nil]
#
# @!attribute [rw] sort
#   @return [String, nil]
#
# @!attribute [rw] supports_generation
#   @return [Boolean, nil]
#
# @!attribute [rw] tag
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [Array, nil]
#
# @!attribute [rw] username
#   @return [String, nil]
ModelListMatch = Struct.new(
  :allow_commercial_use,
  :allow_derivatif,
  :allow_different_license,
  :allow_no_credit,
  :favorite,
  :hidden,
  :limit,
  :nsfw,
  :page,
  :period,
  :primary_file_only,
  :query,
  :rating,
  :sort,
  :supports_generation,
  :tag,
  :type,
  :username,
  keyword_init: true
)

# ModelVersion entity data model.
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] downloadUrl
#   @return [String, nil]
#
# @!attribute [rw] files
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] images
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] stats
#   @return [Hash, nil]
#
# @!attribute [rw] trainedWords
#   @return [Array, nil]
ModelVersion = Struct.new(
  :createdAt,
  :description,
  :downloadUrl,
  :files,
  :id,
  :images,
  :name,
  :stats,
  :trainedWords,
  keyword_init: true
)

# Request payload for ModelVersion#load.
#
# @!attribute [rw] id
#   @return [Integer]
ModelVersionLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Tag entity data model.
#
# @!attribute [rw] link
#   @return [String, nil]
#
# @!attribute [rw] modelCount
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
Tag = Struct.new(
  :link,
  :modelCount,
  :name,
  keyword_init: true
)

# Request payload for Tag#list.
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] query
#   @return [String, nil]
TagListMatch = Struct.new(
  :limit,
  :page,
  :query,
  keyword_init: true
)

