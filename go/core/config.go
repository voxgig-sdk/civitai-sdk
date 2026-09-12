package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Civitai",
			"slug": "civitai",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://civitai.com/api/v1",
			"auth": map[string]any{
				"prefix": "Bearer",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"creator": map[string]any{},
				"image": map[string]any{},
				"model": map[string]any{},
				"model_version": map[string]any{},
				"tag": map[string]any{},
			},
		},
		"entity": map[string]any{
			"creator": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "link",
						"short": "Url to get all models from this user",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "modelCount",
						"short": "The amount of models linked to this user",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "username",
						"short": "The username of the creator",
						"type": "`$STRING`",
					},
				},
				"name": "creator",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 20,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "query",
											"orig": "query",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/creators",
								"segments": []any{
									map[string]any{
										"lit": "creators",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"page",
										"query",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"creators",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"image": map[string]any{
				"fields": []any{
					map[string]any{
						"format": "date-time",
						"name": "createdAt",
						"short": "The date the image was posted",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "hash",
						"short": "The blurhash of the image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "height",
						"short": "The height of the image",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"short": "The id of the image",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "meta",
						"short": "The generation parameters parsed or input for the image",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "nsfw",
						"short": "If the image has any mature content labels",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "nsfwLevel",
						"short": "The NSFW level of the image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "postId",
						"short": "The ID of the post the image belongs to",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "stats",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "url",
						"short": "The url of the image at its source resolution",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "username",
						"short": "The username of the creator",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "width",
						"short": "The width of the image",
						"type": "`$INTEGER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "image",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 100,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "model_id",
											"orig": "model_id",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "model_version_id",
											"orig": "model_version_id",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "nsfw",
											"orig": "nsfw",
											"type": "`$ANY`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "period",
											"orig": "period",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "post_id",
											"orig": "post_id",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "username",
											"orig": "username",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/images",
								"segments": []any{
									map[string]any{
										"lit": "images",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"model_id",
										"model_version_id",
										"nsfw",
										"page",
										"period",
										"post_id",
										"sort",
										"username",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"images",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"model": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "creator",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "description",
						"short": "The description of the model (HTML)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "The identifier for the model",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "mode",
						"short": "The mode in which the model is currently on.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "modelVersions",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "name",
						"short": "The name of the model",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "nsfw",
						"short": "Whether the model is NSFW or not",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "stats",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "tags",
						"short": "The tags associated with the model",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "type",
						"short": "The model type",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "model",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "allow_commercial_use",
											"orig": "allow_commercial_use",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "allow_derivatif",
											"orig": "allow_derivatif",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "allow_different_license",
											"orig": "allow_different_license",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "allow_no_credit",
											"orig": "allow_no_credit",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "favorite",
											"orig": "favorite",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "hidden",
											"orig": "hidden",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": 100,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "nsfw",
											"orig": "nsfw",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "period",
											"orig": "period",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "primary_file_only",
											"orig": "primary_file_only",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "query",
											"orig": "query",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "rating",
											"orig": "rating",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"kind": "query",
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "supports_generation",
											"orig": "supports_generation",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "tag",
											"orig": "tag",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "type",
											"orig": "type",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"kind": "query",
											"name": "username",
											"orig": "username",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/models",
								"segments": []any{
									map[string]any{
										"lit": "models",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"allow_commercial_use",
										"allow_derivatif",
										"allow_different_license",
										"allow_no_credit",
										"favorite",
										"hidden",
										"limit",
										"nsfw",
										"page",
										"period",
										"primary_file_only",
										"query",
										"rating",
										"sort",
										"supports_generation",
										"tag",
										"type",
										"username",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"models",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "model_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/models/{modelId}",
								"rename": map[string]any{
									"param": map[string]any{
										"modelId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "models",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"models",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"model_version": map[string]any{
				"fields": []any{
					map[string]any{
						"format": "date-time",
						"name": "createdAt",
						"short": "The date in which the version was created",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"short": "The description of the model version (usually a changelog)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "downloadUrl",
						"short": "The download url to get the model file for this specific version",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "files",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"short": "The identifier for the model version",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "images",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "name",
						"short": "The name of the model version",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "stats",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "trainedWords",
						"short": "The words used to trigger the model",
						"type": "`$ARRAY`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "model_version",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "hash",
											"orig": "hash",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/model-versions/by-hash/{hash}",
								"segments": []any{
									map[string]any{
										"lit": "model-versions",
									},
									map[string]any{
										"lit": "by-hash",
									},
									map[string]any{
										"var": "hash",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"hash",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"model-versions",
									"by-hash",
									"{hash}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "model_version_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/model-versions/{modelVersionId}",
								"rename": map[string]any{
									"param": map[string]any{
										"modelVersionId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "model-versions",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"model-versions",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"by_hash",
						},
					},
				},
			},
			"tag": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "link",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "modelCount",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
				},
				"name": "tag",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 20,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "query",
											"orig": "query",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/tags",
								"segments": []any{
									map[string]any{
										"lit": "tags",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"page",
										"query",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"tags",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
