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
  link?: string
  modelCount?: number
  username?: string
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
  hash?: string
  id?: number
}

export interface Tag {
  link?: string
  modelCount?: number
  name?: string
}

export interface TagListMatch {
  link?: string
  modelCount?: number
  name?: string
}

