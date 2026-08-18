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
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "modelCount",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "username",
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
								"parts": []any{
									"creators",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "hash",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "height",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "meta",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "nsfw",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "nsfwLevel",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "postId",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "stats",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "username",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "width",
						"type": "`$INTEGER`",
					},
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
								"parts": []any{
									"images",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "mode",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "modelVersions",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "nsfw",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "stats",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "tags",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "type",
						"type": "`$STRING`",
					},
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
								"parts": []any{
									"models",
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
								"parts": []any{
									"models",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"modelId": "id",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "downloadUrl",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "files",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "images",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "stats",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "trainedWords",
						"type": "`$ARRAY`",
					},
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
								"parts": []any{
									"model-versions",
									"by-hash",
									"{hash}",
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
								"parts": []any{
									"model-versions",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"modelVersionId": "id",
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
								"parts": []any{
									"tags",
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
