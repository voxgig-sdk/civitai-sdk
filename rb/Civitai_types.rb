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
# @!attribute [rw] link
#   @return [String, nil]
#
# @!attribute [rw] modelCount
#   @return [Integer, nil]
#
# @!attribute [rw] username
#   @return [String, nil]
CreatorListMatch = Struct.new(
  :link,
  :modelCount,
  :username,
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
ImageListMatch = Struct.new(
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
ModelListMatch = Struct.new(
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
# @!attribute [rw] link
#   @return [String, nil]
#
# @!attribute [rw] modelCount
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
TagListMatch = Struct.new(
  :link,
  :modelCount,
  :name,
  keyword_init: true
)

