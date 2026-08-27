// Typed models for the Civitai SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Creator {
  link?: string
  modelCount?: number
  username?: string
}

export interface CreatorListMatch {
  limit?: number
  page?: number
  query?: string
}

export interface Image {
  createdAt?: string
  hash?: string
  height?: number
  id?: number
  meta?: Record<string, any>
  nsfw?: boolean
  nsfwLevel?: string
  postId?: number
  stats?: Record<string, any>
  url?: string
  username?: string
  width?: number
}

export interface ImageListMatch {
  limit?: number
  model_id?: number
  model_version_id?: number
  nsfw?: any
  page?: number
  period?: string
  post_id?: number
  sort?: string
  username?: string
}

export interface Model {
  creator?: Record<string, any>
  description?: string
  id?: number
  mode?: string
  modelVersions?: any[]
  name?: string
  nsfw?: boolean
  stats?: Record<string, any>
  tags?: any[]
  type?: string
}

export interface ModelLoadMatch {
  id: number
}

export interface ModelListMatch {
  allow_commercial_use?: boolean
  allow_derivatif?: boolean
  allow_different_license?: boolean
  allow_no_credit?: boolean
  favorite?: boolean
  hidden?: boolean
  limit?: number
  nsfw?: boolean
  page?: number
  period?: string
  primary_file_only?: boolean
  query?: string
  rating?: number
  sort?: string
  supports_generation?: boolean
  tag?: string
  type?: any[]
  username?: string
}

export interface ModelVersion {
  createdAt?: string
  description?: string
  downloadUrl?: string
  files?: any[]
  id?: number
  images?: any[]
  name?: string
  stats?: Record<string, any>
  trainedWords?: any[]
}

export interface ModelVersionLoadMatch {
  id: number
}

export interface Tag {
  link?: string
  modelCount?: number
  name?: string
}

export interface TagListMatch {
  limit?: number
  page?: number
  query?: string
}

