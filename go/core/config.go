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
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
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
						"title": "Link",
						"type": "`$STRING`",
						"short": "Url to get all models from this user",
					},
					map[string]any{
						"name": "modelCount",
						"title": "Model Count",
						"type": "`$INTEGER`",
						"short": "The amount of models linked to this user",
					},
					map[string]any{
						"name": "username",
						"title": "Username",
						"type": "`$STRING`",
						"short": "The username of the creator",
					},
				},
				"name": "creator",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/creators",
								"segments": []any{
									map[string]any{
										"lit": "creators",
									},
								},
								"parts": []any{
									"creators",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "query",
											"orig": "query",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"page",
										"query",
									},
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
						"name": "createdAt",
						"title": "Created At",
						"type": "`$STRING`",
						"short": "The date the image was posted",
						"format": "date-time",
					},
					map[string]any{
						"name": "hash",
						"title": "Hash",
						"type": "`$STRING`",
						"short": "The blurhash of the image",
					},
					map[string]any{
						"name": "height",
						"title": "Height",
						"type": "`$INTEGER`",
						"short": "The height of the image",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "The id of the image",
					},
					map[string]any{
						"name": "meta",
						"title": "Meta",
						"type": "`$OBJECT`",
						"short": "The generation parameters parsed or input for the image",
					},
					map[string]any{
						"name": "nsfw",
						"title": "Nsfw",
						"type": "`$BOOLEAN`",
						"short": "If the image has any mature content labels",
					},
					map[string]any{
						"name": "nsfwLevel",
						"title": "Nsfw Level",
						"type": "`$STRING`",
						"short": "The NSFW level of the image",
					},
					map[string]any{
						"name": "postId",
						"title": "Post Id",
						"type": "`$INTEGER`",
						"short": "The ID of the post the image belongs to",
					},
					map[string]any{
						"name": "stats",
						"title": "Stats",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"short": "The url of the image at its source resolution",
					},
					map[string]any{
						"name": "username",
						"title": "Username",
						"type": "`$STRING`",
						"short": "The username of the creator",
					},
					map[string]any{
						"name": "width",
						"title": "Width",
						"type": "`$INTEGER`",
						"short": "The width of the image",
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
								"kind": "http",
								"method": "GET",
								"orig": "/images",
								"segments": []any{
									map[string]any{
										"lit": "images",
									},
								},
								"parts": []any{
									"images",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 100,
										},
										map[string]any{
											"name": "model_id",
											"orig": "model_id",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "model_version_id",
											"orig": "model_version_id",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "nsfw",
											"orig": "nsfw",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "period",
											"orig": "period",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "post_id",
											"orig": "post_id",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "username",
											"orig": "username",
											"type": "`$STRING`",
											"kind": "query",
										},
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
						"title": "Creator",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "The description of the model (HTML)",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "The identifier for the model",
					},
					map[string]any{
						"name": "mode",
						"title": "Mode",
						"type": "`$STRING`",
						"short": "The mode in which the model is currently on.",
					},
					map[string]any{
						"name": "modelVersions",
						"title": "Model Versions",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "The name of the model",
					},
					map[string]any{
						"name": "nsfw",
						"title": "Nsfw",
						"type": "`$BOOLEAN`",
						"short": "Whether the model is NSFW or not",
					},
					map[string]any{
						"name": "stats",
						"title": "Stats",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "tags",
						"title": "Tags",
						"type": "`$ARRAY`",
						"short": "The tags associated with the model",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"short": "The model type",
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
								"kind": "http",
								"method": "GET",
								"orig": "/models",
								"segments": []any{
									map[string]any{
										"lit": "models",
									},
								},
								"parts": []any{
									"models",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "allow_commercial_use",
											"orig": "allow_commercial_use",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "allow_derivative",
											"orig": "allow_derivative",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "allow_different_license",
											"orig": "allow_different_license",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "allow_no_credit",
											"orig": "allow_no_credit",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "favorite",
											"orig": "favorite",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "hidden",
											"orig": "hidden",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 100,
										},
										map[string]any{
											"name": "nsfw",
											"orig": "nsfw",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "period",
											"orig": "period",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "primary_file_only",
											"orig": "primary_file_only",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "query",
											"orig": "query",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "rating",
											"orig": "rating",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "supports_generation",
											"orig": "supports_generation",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "tag",
											"orig": "tag",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "username",
											"orig": "username",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"allow_commercial_use",
										"allow_derivative",
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
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/models/{modelId}",
								"segments": []any{
									map[string]any{
										"lit": "models",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"models",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"modelId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "model_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"name": "createdAt",
						"title": "Created At",
						"type": "`$STRING`",
						"short": "The date in which the version was created",
						"format": "date-time",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "The description of the model version (usually a changelog)",
					},
					map[string]any{
						"name": "downloadUrl",
						"title": "Download Url",
						"type": "`$STRING`",
						"short": "The download url to get the model file for this specific version",
					},
					map[string]any{
						"name": "files",
						"title": "Files",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "The identifier for the model version",
					},
					map[string]any{
						"name": "images",
						"title": "Images",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "The name of the model version",
					},
					map[string]any{
						"name": "stats",
						"title": "Stats",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "trainedWords",
						"title": "Trained Words",
						"type": "`$ARRAY`",
						"short": "The words used to trigger the model",
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
								"parts": []any{
									"model-versions",
									"by-hash",
									"{hash}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "hash",
											"orig": "hash",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"hash",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/model-versions/{modelVersionId}",
								"segments": []any{
									map[string]any{
										"lit": "model-versions",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"model-versions",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"modelVersionId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "model_version_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"tag": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "link",
						"title": "Link",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "modelCount",
						"title": "Model Count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
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
								"kind": "http",
								"method": "GET",
								"orig": "/tags",
								"segments": []any{
									map[string]any{
										"lit": "tags",
									},
								},
								"parts": []any{
									"tags",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "query",
											"orig": "query",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"page",
										"query",
									},
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
