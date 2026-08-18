// Typed models for the Civitai SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/civitai-sdk/go/core"
)

// Creator is the typed data model for the creator entity.
type Creator struct {
	Link *string `json:"link,omitempty"`
	ModelCount *int `json:"modelCount,omitempty"`
	Username *string `json:"username,omitempty"`
}

// CreatorListMatch is the typed request payload for Creator.ListTyped.
type CreatorListMatch struct {
	Link *string `json:"link,omitempty"`
	ModelCount *int `json:"modelCount,omitempty"`
	Username *string `json:"username,omitempty"`
}

// Image is the typed data model for the image entity.
type Image struct {
	CreatedAt *string `json:"createdAt,omitempty"`
	Hash *string `json:"hash,omitempty"`
	Height *int `json:"height,omitempty"`
	Id *int `json:"id,omitempty"`
	Meta *map[string]any `json:"meta,omitempty"`
	Nsfw *bool `json:"nsfw,omitempty"`
	NsfwLevel *string `json:"nsfwLevel,omitempty"`
	PostId *int `json:"postId,omitempty"`
	Stats *map[string]any `json:"stats,omitempty"`
	Url *string `json:"url,omitempty"`
	Username *string `json:"username,omitempty"`
	Width *int `json:"width,omitempty"`
}

// ImageListMatch is the typed request payload for Image.ListTyped.
type ImageListMatch struct {
	CreatedAt *string `json:"createdAt,omitempty"`
	Hash *string `json:"hash,omitempty"`
	Height *int `json:"height,omitempty"`
	Id *int `json:"id,omitempty"`
	Meta *map[string]any `json:"meta,omitempty"`
	Nsfw *bool `json:"nsfw,omitempty"`
	NsfwLevel *string `json:"nsfwLevel,omitempty"`
	PostId *int `json:"postId,omitempty"`
	Stats *map[string]any `json:"stats,omitempty"`
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
	ModelVersions *[]any `json:"modelVersions,omitempty"`
	Name *string `json:"name,omitempty"`
	Nsfw *bool `json:"nsfw,omitempty"`
	Stats *map[string]any `json:"stats,omitempty"`
	Tags *[]any `json:"tags,omitempty"`
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
	ModelVersions *[]any `json:"modelVersions,omitempty"`
	Name *string `json:"name,omitempty"`
	Nsfw *bool `json:"nsfw,omitempty"`
	Stats *map[string]any `json:"stats,omitempty"`
	Tags *[]any `json:"tags,omitempty"`
	Type *string `json:"type,omitempty"`
}

// ModelVersion is the typed data model for the model_version entity.
type ModelVersion struct {
	CreatedAt *string `json:"createdAt,omitempty"`
	Description *string `json:"description,omitempty"`
	DownloadUrl *string `json:"downloadUrl,omitempty"`
	Files *[]any `json:"files,omitempty"`
	Id *int `json:"id,omitempty"`
	Images *[]any `json:"images,omitempty"`
	Name *string `json:"name,omitempty"`
	Stats *map[string]any `json:"stats,omitempty"`
	TrainedWords *[]any `json:"trainedWords,omitempty"`
}

// ModelVersionLoadMatch is the typed request payload for ModelVersion.LoadTyped.
type ModelVersionLoadMatch struct {
	Id int `json:"id"`
}

// Tag is the typed data model for the tag entity.
type Tag struct {
	Link *string `json:"link,omitempty"`
	ModelCount *int `json:"modelCount,omitempty"`
	Name *string `json:"name,omitempty"`
}

// TagListMatch is the typed request payload for Tag.ListTyped.
type TagListMatch struct {
	Link *string `json:"link,omitempty"`
	ModelCount *int `json:"modelCount,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
