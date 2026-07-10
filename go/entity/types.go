// Typed models for the Civitai SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Creator is the typed data model for the creator entity.
type Creator struct {
	Link *string `json:"link,omitempty"`
	ModelCount *int `json:"model_count,omitempty"`
	Username *string `json:"username,omitempty"`
}

// CreatorListMatch is the typed request payload for Creator.ListTyped.
type CreatorListMatch struct {
	Link *string `json:"link,omitempty"`
	ModelCount *int `json:"model_count,omitempty"`
	Username *string `json:"username,omitempty"`
}

// Image is the typed data model for the image entity.
type Image struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Hash *string `json:"hash,omitempty"`
	Height *int `json:"height,omitempty"`
	Id *int `json:"id,omitempty"`
	Meta *map[string]any `json:"meta,omitempty"`
	Nsfw *bool `json:"nsfw,omitempty"`
	NsfwLevel *string `json:"nsfw_level,omitempty"`
	PostId *int `json:"post_id,omitempty"`
	Stat *map[string]any `json:"stat,omitempty"`
	Url *string `json:"url,omitempty"`
	Username *string `json:"username,omitempty"`
	Width *int `json:"width,omitempty"`
}

// ImageListMatch is the typed request payload for Image.ListTyped.
type ImageListMatch struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Hash *string `json:"hash,omitempty"`
	Height *int `json:"height,omitempty"`
	Id *int `json:"id,omitempty"`
	Meta *map[string]any `json:"meta,omitempty"`
	Nsfw *bool `json:"nsfw,omitempty"`
	NsfwLevel *string `json:"nsfw_level,omitempty"`
	PostId *int `json:"post_id,omitempty"`
	Stat *map[string]any `json:"stat,omitempty"`
	Url *string `json:"url,omitempty"`
	Username *string `json:"username,omitempty"`
	Width *int `json:"width,omitempty"`
}

// Model is the typed data model for the model entity.
type Model struct {
	Creator *map[string]any `json:"creator,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Mode *string `json:"mode,omitempty"`
	ModelVersion *[]any `json:"model_version,omitempty"`
	Name *string `json:"name,omitempty"`
	Nsfw *bool `json:"nsfw,omitempty"`
	Stat *map[string]any `json:"stat,omitempty"`
	Tag *[]any `json:"tag,omitempty"`
	Type *string `json:"type,omitempty"`
}

// ModelLoadMatch is the typed request payload for Model.LoadTyped.
type ModelLoadMatch struct {
	Id int `json:"id"`
}

// ModelListMatch is the typed request payload for Model.ListTyped.
type ModelListMatch struct {
	Creator *map[string]any `json:"creator,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Mode *string `json:"mode,omitempty"`
	ModelVersion *[]any `json:"model_version,omitempty"`
	Name *string `json:"name,omitempty"`
	Nsfw *bool `json:"nsfw,omitempty"`
	Stat *map[string]any `json:"stat,omitempty"`
	Tag *[]any `json:"tag,omitempty"`
	Type *string `json:"type,omitempty"`
}

// ModelVersion is the typed data model for the model_version entity.
type ModelVersion struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Description *string `json:"description,omitempty"`
	DownloadUrl *string `json:"download_url,omitempty"`
	File *[]any `json:"file,omitempty"`
	Id *int `json:"id,omitempty"`
	Image *[]any `json:"image,omitempty"`
	Name *string `json:"name,omitempty"`
	Stat *map[string]any `json:"stat,omitempty"`
	TrainedWord *[]any `json:"trained_word,omitempty"`
}

// ModelVersionLoadMatch is the typed request payload for ModelVersion.LoadTyped.
type ModelVersionLoadMatch struct {
	Hash *string `json:"hash,omitempty"`
	Id *int `json:"id,omitempty"`
}

// Tag is the typed data model for the tag entity.
type Tag struct {
	Link *string `json:"link,omitempty"`
	ModelCount *int `json:"model_count,omitempty"`
	Name *string `json:"name,omitempty"`
}

// TagListMatch is the typed request payload for Tag.ListTyped.
type TagListMatch struct {
	Link *string `json:"link,omitempty"`
	ModelCount *int `json:"model_count,omitempty"`
	Name *string `json:"name,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
