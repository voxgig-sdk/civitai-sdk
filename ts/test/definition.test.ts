import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "creator",
    "accessor": "Creator",
    "op": "list",
    "method": "GET",
    "path": "/creators",
    "args": [],
    "select": {
      "limit": 20,
      "page": 1,
      "query": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "limit",
      "page",
      "query"
    ],
    "queryArgs": [
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "query",
        "wire": "query"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": {
      "items": [
        {
          "username": "x",
          "modelCount": 1,
          "link": "x"
        }
      ],
      "metadata": {
        "totalItems": 1,
        "currentPage": 1,
        "pageSize": 1,
        "totalPages": 1,
        "nextPage": "x",
        "prevPage": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "image",
    "accessor": "Image",
    "op": "list",
    "method": "GET",
    "path": "/images",
    "args": [],
    "select": {
      "limit": 100,
      "model_id": "v1",
      "model_version_id": "v1",
      "nsfw": "v1",
      "page": 1,
      "period": "v1",
      "post_id": "v1",
      "sort": "v1",
      "username": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "limit",
      "postId",
      "modelId",
      "modelVersionId",
      "username",
      "nsfw",
      "sort",
      "period",
      "page"
    ],
    "queryArgs": [
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "model_id",
        "wire": "modelId"
      },
      {
        "name": "model_version_id",
        "wire": "modelVersionId"
      },
      {
        "name": "nsfw",
        "wire": "nsfw"
      },
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "period",
        "wire": "period"
      },
      {
        "name": "post_id",
        "wire": "postId"
      },
      {
        "name": "sort",
        "wire": "sort"
      },
      {
        "name": "username",
        "wire": "username"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": {
      "items": [
        {
          "id": 1,
          "url": "x",
          "hash": "x",
          "width": 1,
          "height": 1,
          "nsfw": true,
          "nsfwLevel": "None",
          "createdAt": "2026-01-01T00:00:00Z",
          "postId": 1,
          "stats": {
            "cryCount": 1,
            "laughCount": 1,
            "likeCount": 1,
            "dislikeCount": 1,
            "heartCount": 1,
            "commentCount": 1
          },
          "meta": {},
          "username": "x"
        }
      ],
      "metadata": {
        "nextCursor": 1,
        "currentPage": 1,
        "pageSize": 1,
        "nextPage": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "model",
    "accessor": "Model",
    "op": "list",
    "method": "GET",
    "path": "/models",
    "args": [],
    "select": {
      "allow_commercial_use": "v1",
      "allow_derivative": "v1",
      "allow_different_license": "v1",
      "allow_no_credit": "v1",
      "favorite": "v1",
      "hidden": "v1",
      "limit": 100,
      "nsfw": "v1",
      "page": 1,
      "period": "v1",
      "primary_file_only": "v1",
      "query": "v1",
      "rating": "v1",
      "sort": "v1",
      "supports_generation": "v1",
      "tag": "v1",
      "type": "v1",
      "username": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "limit",
      "page",
      "query",
      "tag",
      "username",
      "types",
      "sort",
      "period",
      "rating",
      "favorites",
      "hidden",
      "primaryFileOnly",
      "allowNoCredit",
      "allowDerivatives",
      "allowDifferentLicenses",
      "allowCommercialUse",
      "nsfw",
      "supportsGeneration"
    ],
    "queryArgs": [
      {
        "name": "allow_commercial_use",
        "wire": "allowCommercialUse"
      },
      {
        "name": "allow_derivative",
        "wire": "allowDerivatives"
      },
      {
        "name": "allow_different_license",
        "wire": "allowDifferentLicenses"
      },
      {
        "name": "allow_no_credit",
        "wire": "allowNoCredit"
      },
      {
        "name": "favorite",
        "wire": "favorites"
      },
      {
        "name": "hidden",
        "wire": "hidden"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "nsfw",
        "wire": "nsfw"
      },
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "period",
        "wire": "period"
      },
      {
        "name": "primary_file_only",
        "wire": "primaryFileOnly"
      },
      {
        "name": "query",
        "wire": "query"
      },
      {
        "name": "rating",
        "wire": "rating"
      },
      {
        "name": "sort",
        "wire": "sort"
      },
      {
        "name": "supports_generation",
        "wire": "supportsGeneration"
      },
      {
        "name": "tag",
        "wire": "tag"
      },
      {
        "name": "type",
        "wire": "types"
      },
      {
        "name": "username",
        "wire": "username"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": {
      "items": [
        {
          "id": 1,
          "name": "x",
          "description": "x",
          "type": "Checkpoint",
          "nsfw": true,
          "tags": [
            "x"
          ],
          "mode": "Archived",
          "creator": {
            "username": "x",
            "image": "x"
          },
          "stats": {
            "downloadCount": 1,
            "favoriteCount": 1,
            "commentCount": 1,
            "ratingCount": 1,
            "rating": 1
          },
          "modelVersions": [
            {
              "id": 1,
              "name": "x",
              "description": "x",
              "createdAt": "2026-01-01T00:00:00Z",
              "downloadUrl": "x",
              "trainedWords": [
                "x"
              ],
              "files": [
                {}
              ],
              "images": [
                {}
              ],
              "stats": {
                "downloadCount": 1,
                "ratingCount": 1,
                "rating": 1
              }
            }
          ]
        }
      ],
      "metadata": {
        "totalItems": 1,
        "currentPage": 1,
        "pageSize": 1,
        "totalPages": 1,
        "nextPage": "x",
        "prevPage": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "model",
    "accessor": "Model",
    "op": "load",
    "method": "GET",
    "path": "/models/{modelId}",
    "args": [
      {
        "name": "id",
        "wire": "modelId",
        "value": 257749
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 200,
    "sample": {
      "id": 1,
      "name": "x",
      "description": "x",
      "type": "Checkpoint",
      "nsfw": true,
      "tags": [
        "x"
      ],
      "mode": "Archived",
      "creator": {
        "username": "x",
        "image": "x"
      },
      "stats": {
        "downloadCount": 1,
        "favoriteCount": 1,
        "commentCount": 1,
        "ratingCount": 1,
        "rating": 1
      },
      "modelVersions": [
        {
          "id": 1,
          "name": "x",
          "description": "x",
          "createdAt": "2026-01-01T00:00:00Z",
          "downloadUrl": "x",
          "trainedWords": [
            "x"
          ],
          "files": [
            {
              "sizeKb": 1,
              "pickleScanResult": "Pending",
              "virusScanResult": "Pending",
              "scannedAt": "2026-01-01T00:00:00Z",
              "primary": true,
              "metadata": {
                "fp": "fp16",
                "size": "full",
                "format": "SafeTensor"
              }
            }
          ],
          "images": [
            {
              "id": "x",
              "url": "x",
              "nsfw": "x",
              "width": 1,
              "height": 1,
              "hash": "x",
              "meta": {}
            }
          ],
          "stats": {
            "downloadCount": 1,
            "ratingCount": 1,
            "rating": 1
          }
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "model_version",
    "accessor": "ModelVersion",
    "op": "load",
    "method": "GET",
    "path": "/model-versions/by-hash/{hash}",
    "args": [
      {
        "name": "hash",
        "wire": "hash",
        "value": "67AB2FD8EC439A89B3FEDB15CC65F54336AF163C7EB5E4F2ACC98F090A29B0B3"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 200,
    "sample": {
      "id": 1,
      "name": "x",
      "description": "x",
      "createdAt": "2026-01-01T00:00:00Z",
      "downloadUrl": "x",
      "trainedWords": [
        "x"
      ],
      "files": [
        {
          "sizeKb": 1,
          "pickleScanResult": "Pending",
          "virusScanResult": "Pending",
          "scannedAt": "2026-01-01T00:00:00Z",
          "primary": true,
          "metadata": {
            "fp": "fp16",
            "size": "full",
            "format": "SafeTensor"
          }
        }
      ],
      "images": [
        {
          "id": "x",
          "url": "x",
          "nsfw": "x",
          "width": 1,
          "height": 1,
          "hash": "x",
          "meta": {}
        }
      ],
      "stats": {
        "downloadCount": 1,
        "ratingCount": 1,
        "rating": 1
      }
    },
    "idField": "id"
  },
  {
    "entity": "model_version",
    "accessor": "ModelVersion",
    "op": "load",
    "method": "GET",
    "path": "/model-versions/{modelVersionId}",
    "args": [
      {
        "name": "id",
        "wire": "modelVersionId",
        "value": 290640
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 200,
    "sample": {
      "id": 1,
      "name": "x",
      "description": "x",
      "createdAt": "2026-01-01T00:00:00Z",
      "downloadUrl": "x",
      "trainedWords": [
        "x"
      ],
      "files": [
        {
          "sizeKb": 1,
          "pickleScanResult": "Pending",
          "virusScanResult": "Pending",
          "scannedAt": "2026-01-01T00:00:00Z",
          "primary": true,
          "metadata": {
            "fp": "fp16",
            "size": "full",
            "format": "SafeTensor"
          }
        }
      ],
      "images": [
        {
          "id": "x",
          "url": "x",
          "nsfw": "x",
          "width": 1,
          "height": 1,
          "hash": "x",
          "meta": {}
        }
      ],
      "stats": {
        "downloadCount": 1,
        "ratingCount": 1,
        "rating": 1
      }
    },
    "idField": "id"
  },
  {
    "entity": "tag",
    "accessor": "Tag",
    "op": "list",
    "method": "GET",
    "path": "/tags",
    "args": [],
    "select": {
      "limit": 20,
      "page": 1,
      "query": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "limit",
      "page",
      "query"
    ],
    "queryArgs": [
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "query",
        "wire": "query"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": {
      "items": [
        {
          "name": "x",
          "modelCount": 1,
          "link": "x"
        }
      ],
      "metadata": {
        "totalItems": 1,
        "currentPage": 1,
        "pageSize": 1,
        "totalPages": 1,
        "nextPage": "x",
        "prevPage": "x"
      }
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
