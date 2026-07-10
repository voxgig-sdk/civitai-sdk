// Typed models for the Civitai SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Creator {
  link?: string
  model_count?: number
  username?: string
}

export interface CreatorListMatch {
  link?: string
  model_count?: number
  username?: string
}

export interface Image {
  created_at?: string
  hash?: string
  height?: number
  id?: number
  meta?: Record<string, any>
  nsfw?: boolean
  nsfw_level?: string
  post_id?: number
  stat?: Record<string, any>
  url?: string
  username?: string
  width?: number
}

export interface ImageListMatch {
  created_at?: string
  hash?: string
  height?: number
  id?: number
  meta?: Record<string, any>
  nsfw?: boolean
  nsfw_level?: string
  post_id?: number
  stat?: Record<string, any>
  url?: string
  username?: string
  width?: number
}

export interface Model {
  creator?: Record<string, any>
  description?: string
  id?: number
  mode?: string
  model_version?: any[]
  name?: string
  nsfw?: boolean
  stat?: Record<string, any>
  tag?: any[]
  type?: string
}

export interface ModelLoadMatch {
  id: number
}

export interface ModelListMatch {
  creator?: Record<string, any>
  description?: string
  id?: number
  mode?: string
  model_version?: any[]
  name?: string
  nsfw?: boolean
  stat?: Record<string, any>
  tag?: any[]
  type?: string
}

export interface ModelVersion {
  created_at?: string
  description?: string
  download_url?: string
  file?: any[]
  id?: number
  image?: any[]
  name?: string
  stat?: Record<string, any>
  trained_word?: any[]
}

export interface ModelVersionLoadMatch {
  hash?: string
  id?: number
}

export interface Tag {
  link?: string
  model_count?: number
  name?: string
}

export interface TagListMatch {
  link?: string
  model_count?: number
  name?: string
}

