# Civitai SDK configuration


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
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
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
            "type": "`$STRING`",
          },
          {
            "name": "modelCount",
            "type": "`$INTEGER`",
          },
          {
            "name": "username",
            "type": "`$STRING`",
          },
        ],
        "name": "creator",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 20,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "query",
                      "orig": "query",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/creators",
                "parts": [
                  "creators",
                ],
                "select": {
                  "exist": [
                    "limit",
                    "page",
                    "query",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
            "type": "`$STRING`",
          },
          {
            "name": "hash",
            "type": "`$STRING`",
          },
          {
            "name": "height",
            "type": "`$INTEGER`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "meta",
            "type": "`$OBJECT`",
          },
          {
            "name": "nsfw",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "nsfwLevel",
            "type": "`$STRING`",
          },
          {
            "name": "postId",
            "type": "`$INTEGER`",
          },
          {
            "name": "stats",
            "type": "`$OBJECT`",
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
          {
            "name": "username",
            "type": "`$STRING`",
          },
          {
            "name": "width",
            "type": "`$INTEGER`",
          },
        ],
        "name": "image",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 100,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "model_id",
                      "orig": "model_id",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "model_version_id",
                      "orig": "model_version_id",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "nsfw",
                      "orig": "nsfw",
                      "type": "`$ANY`",
                    },
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "period",
                      "orig": "period",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "post_id",
                      "orig": "post_id",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "sort",
                      "orig": "sort",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "username",
                      "orig": "username",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/images",
                "parts": [
                  "images",
                ],
                "select": {
                  "exist": [
                    "limit",
                    "model_id",
                    "model_version_id",
                    "nsfw",
                    "page",
                    "period",
                    "post_id",
                    "sort",
                    "username",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
            "type": "`$OBJECT`",
          },
          {
            "name": "description",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "mode",
            "type": "`$STRING`",
          },
          {
            "name": "modelVersions",
            "type": "`$ARRAY`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "nsfw",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "stats",
            "type": "`$OBJECT`",
          },
          {
            "name": "tags",
            "type": "`$ARRAY`",
          },
          {
            "name": "type",
            "type": "`$STRING`",
          },
        ],
        "name": "model",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "allow_commercial_use",
                      "orig": "allow_commercial_use",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "kind": "query",
                      "name": "allow_derivatif",
                      "orig": "allow_derivatif",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "kind": "query",
                      "name": "allow_different_license",
                      "orig": "allow_different_license",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "kind": "query",
                      "name": "allow_no_credit",
                      "orig": "allow_no_credit",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "kind": "query",
                      "name": "favorite",
                      "orig": "favorite",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "kind": "query",
                      "name": "hidden",
                      "orig": "hidden",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "example": 100,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "nsfw",
                      "orig": "nsfw",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "period",
                      "orig": "period",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "primary_file_only",
                      "orig": "primary_file_only",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "kind": "query",
                      "name": "query",
                      "orig": "query",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "rating",
                      "orig": "rating",
                      "type": "`$NUMBER`",
                    },
                    {
                      "kind": "query",
                      "name": "sort",
                      "orig": "sort",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "supports_generation",
                      "orig": "supports_generation",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "kind": "query",
                      "name": "tag",
                      "orig": "tag",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "type",
                      "orig": "type",
                      "type": "`$ARRAY`",
                    },
                    {
                      "kind": "query",
                      "name": "username",
                      "orig": "username",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/models",
                "parts": [
                  "models",
                ],
                "select": {
                  "exist": [
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
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "model_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/models/{modelId}",
                "parts": [
                  "models",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "modelId": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "type": "`$STRING`",
          },
          {
            "name": "downloadUrl",
            "type": "`$STRING`",
          },
          {
            "name": "files",
            "type": "`$ARRAY`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "images",
            "type": "`$ARRAY`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "stats",
            "type": "`$OBJECT`",
          },
          {
            "name": "trainedWords",
            "type": "`$ARRAY`",
          },
        ],
        "name": "model_version",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "hash",
                      "orig": "hash",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/model-versions/by-hash/{hash}",
                "parts": [
                  "model-versions",
                  "by-hash",
                  "{hash}",
                ],
                "select": {
                  "exist": [
                    "hash",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "model_version_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/model-versions/{modelVersionId}",
                "parts": [
                  "model-versions",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "modelVersionId": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "by_hash",
            ],
          ],
        },
      },
      "tag": {
        "fields": [
          {
            "name": "link",
            "type": "`$STRING`",
          },
          {
            "name": "modelCount",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
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
                "args": {
                  "query": [
                    {
                      "example": 20,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "query",
                      "orig": "query",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/tags",
                "parts": [
                  "tags",
                ],
                "select": {
                  "exist": [
                    "limit",
                    "page",
                    "query",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
