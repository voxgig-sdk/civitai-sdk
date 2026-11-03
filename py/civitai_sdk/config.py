# Civitai SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Civitai",
            "slug": "civitai",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "now": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://civitai.com/api/v1",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "creator": {},
                "image": {},
                "model": {},
                "model_version": {},
                "tag": {},
            },
        },
        "entity": {
      "creator": {
        "fields": [
          {
            "name": "link",
            "title": "Link",
            "type": "`$STRING`",
            "short": "Url to get all models from this user",
          },
          {
            "name": "modelCount",
            "title": "Model Count",
            "type": "`$INTEGER`",
            "short": "The amount of models linked to this user",
          },
          {
            "name": "username",
            "title": "Username",
            "type": "`$STRING`",
            "short": "The username of the creator",
          },
        ],
        "name": "creator",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/creators",
                "segments": [
                  {
                    "lit": "creators",
                  },
                ],
                "parts": [
                  "creators",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.items`",
                },
                "args": {
                  "query": [
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 20,
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "query",
                      "orig": "query",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "image": {
        "fields": [
          {
            "name": "createdAt",
            "title": "Created At",
            "type": "`$STRING`",
            "short": "The date the image was posted",
            "format": "date-time",
          },
          {
            "name": "hash",
            "title": "Hash",
            "type": "`$STRING`",
            "short": "The blurhash of the image",
          },
          {
            "name": "height",
            "title": "Height",
            "type": "`$INTEGER`",
            "short": "The height of the image",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
            "short": "The id of the image",
          },
          {
            "name": "meta",
            "title": "Meta",
            "type": "`$OBJECT`",
            "short": "The generation parameters parsed or input for the image",
          },
          {
            "name": "nsfw",
            "title": "Nsfw",
            "type": "`$BOOLEAN`",
            "short": "If the image has any mature content labels",
          },
          {
            "name": "nsfwLevel",
            "title": "Nsfw Level",
            "type": "`$STRING`",
            "short": "The NSFW level of the image",
          },
          {
            "name": "postId",
            "title": "Post Id",
            "type": "`$INTEGER`",
            "short": "The ID of the post the image belongs to",
          },
          {
            "name": "stats",
            "title": "Stats",
            "type": "`$OBJECT`",
          },
          {
            "name": "url",
            "title": "Url",
            "type": "`$STRING`",
            "short": "The url of the image at its source resolution",
          },
          {
            "name": "username",
            "title": "Username",
            "type": "`$STRING`",
            "short": "The username of the creator",
          },
          {
            "name": "width",
            "title": "Width",
            "type": "`$INTEGER`",
            "short": "The width of the image",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "image",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/images",
                "segments": [
                  {
                    "lit": "images",
                  },
                ],
                "parts": [
                  "images",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.items`",
                },
                "args": {
                  "query": [
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 100,
                    },
                    {
                      "name": "model_id",
                      "orig": "modelId",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "model_version_id",
                      "orig": "modelVersionId",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "nsfw",
                      "orig": "nsfw",
                      "type": "`$ANY`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "period",
                      "orig": "period",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "post_id",
                      "orig": "postId",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "sort",
                      "orig": "sort",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "username",
                      "orig": "username",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "model": {
        "fields": [
          {
            "name": "creator",
            "title": "Creator",
            "type": "`$OBJECT`",
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
            "short": "The description of the model (HTML)",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
            "short": "The identifier for the model",
          },
          {
            "name": "mode",
            "title": "Mode",
            "type": "`$STRING`",
            "short": "The mode in which the model is currently on.",
          },
          {
            "name": "modelVersions",
            "title": "Model Versions",
            "type": "`$ARRAY`",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "short": "The name of the model",
          },
          {
            "name": "nsfw",
            "title": "Nsfw",
            "type": "`$BOOLEAN`",
            "short": "Whether the model is NSFW or not",
          },
          {
            "name": "stats",
            "title": "Stats",
            "type": "`$OBJECT`",
          },
          {
            "name": "tags",
            "title": "Tags",
            "type": "`$ARRAY`",
            "short": "The tags associated with the model",
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
            "short": "The model type",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "model",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/models",
                "segments": [
                  {
                    "lit": "models",
                  },
                ],
                "parts": [
                  "models",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.items`",
                },
                "args": {
                  "query": [
                    {
                      "name": "allow_commercial_use",
                      "orig": "allowCommercialUse",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "allow_derivative",
                      "orig": "allowDerivatives",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "allow_different_license",
                      "orig": "allowDifferentLicenses",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "allow_no_credit",
                      "orig": "allowNoCredit",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "favorite",
                      "orig": "favorites",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "hidden",
                      "orig": "hidden",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 100,
                    },
                    {
                      "name": "nsfw",
                      "orig": "nsfw",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "period",
                      "orig": "period",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "primary_file_only",
                      "orig": "primaryFileOnly",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "query",
                      "orig": "query",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "rating",
                      "orig": "rating",
                      "type": "`$NUMBER`",
                      "kind": "query",
                    },
                    {
                      "name": "sort",
                      "orig": "sort",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "supports_generation",
                      "orig": "supportsGeneration",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "tag",
                      "orig": "tag",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "type",
                      "orig": "types",
                      "type": "`$ARRAY`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "username",
                      "orig": "username",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/models/{modelId}",
                "segments": [
                  {
                    "lit": "models",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "models",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "modelId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "modelId",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                      "example": 257749,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "model_version": {
        "fields": [
          {
            "name": "createdAt",
            "title": "Created At",
            "type": "`$STRING`",
            "short": "The date in which the version was created",
            "format": "date-time",
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
            "short": "The description of the model version (usually a changelog)",
          },
          {
            "name": "downloadUrl",
            "title": "Download Url",
            "type": "`$STRING`",
            "short": "The download url to get the model file for this specific version",
          },
          {
            "name": "files",
            "title": "Files",
            "type": "`$ARRAY`",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
            "short": "The identifier for the model version",
          },
          {
            "name": "images",
            "title": "Images",
            "type": "`$ARRAY`",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "short": "The name of the model version",
          },
          {
            "name": "stats",
            "title": "Stats",
            "type": "`$OBJECT`",
          },
          {
            "name": "trainedWords",
            "title": "Trained Words",
            "type": "`$ARRAY`",
            "short": "The words used to trigger the model",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "model_version",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/model-versions/by-hash/{hash}",
                "segments": [
                  {
                    "lit": "model-versions",
                  },
                  {
                    "lit": "by-hash",
                  },
                  {
                    "var": "hash",
                  },
                ],
                "parts": [
                  "model-versions",
                  "by-hash",
                  "{hash}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "hash",
                      "orig": "hash",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "67AB2FD8EC439A89B3FEDB15CC65F54336AF163C7EB5E4F2ACC98F090A29B0B3",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "hash",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/model-versions/{modelVersionId}",
                "segments": [
                  {
                    "lit": "model-versions",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "model-versions",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "modelVersionId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "modelVersionId",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                      "example": 290640,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "tag": {
        "fields": [
          {
            "name": "link",
            "title": "Link",
            "type": "`$STRING`",
          },
          {
            "name": "modelCount",
            "title": "Model Count",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
          },
        ],
        "name": "tag",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/tags",
                "segments": [
                  {
                    "lit": "tags",
                  },
                ],
                "parts": [
                  "tags",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.items`",
                },
                "args": {
                  "query": [
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 20,
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "query",
                      "orig": "query",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
