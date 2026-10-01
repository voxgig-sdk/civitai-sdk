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
      "limit": "v1",
      "page": "v1",
      "query": "v1"
    },
    "headers": [],
    "query": [
      "limit",
      "page",
      "query"
    ],
    "auth": [],
    "status": 200,
    "sample": {
      "items": [
        {
          "link": "x",
          "modelCount": 1,
          "username": "x"
        }
      ],
      "metadata": {
        "currentPage": 1,
        "nextPage": "x",
        "pageSize": 1,
        "prevPage": "x",
        "totalItems": 1,
        "totalPages": 1
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
      "limit": "v1",
      "model_id": "v1",
      "model_version_id": "v1",
      "nsfw": "v1",
      "page": "v1",
      "period": "v1",
      "post_id": "v1",
      "sort": "v1",
      "username": "v1"
    },
    "headers": [],
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
    "auth": [],
    "status": 200,
    "sample": {
      "items": [
        {
          "createdAt": "2026-01-01T00:00:00Z",
          "hash": "x",
          "height": 1,
          "id": 1,
          "meta": {},
          "nsfw": true,
          "nsfwLevel": "None",
          "postId": 1,
          "stats": {
            "commentCount": 1,
            "cryCount": 1,
            "dislikeCount": 1,
            "heartCount": 1,
            "laughCount": 1,
            "likeCount": 1
          },
          "url": "x",
          "username": "x",
          "width": 1
        }
      ],
      "metadata": {
        "currentPage": 1,
        "nextCursor": 1,
        "nextPage": "x",
        "pageSize": 1
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
      "limit": "v1",
      "nsfw": "v1",
      "page": "v1",
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
    "auth": [],
    "status": 200,
    "sample": {
      "items": [
        {
          "creator": {
            "image": "x",
            "username": "x"
          },
          "description": "x",
          "id": 1,
          "mode": "Archived",
          "modelVersions": [
            {
              "createdAt": "2026-01-01T00:00:00Z",
              "description": "x",
              "downloadUrl": "x",
              "files": [
                {}
              ],
              "id": 1,
              "images": [
                {}
              ],
              "name": "x",
              "stats": {
                "downloadCount": 1,
                "rating": 1,
                "ratingCount": 1
              },
              "trainedWords": [
                "x"
              ]
            }
          ],
          "name": "x",
          "nsfw": true,
          "stats": {
            "commentCount": 1,
            "downloadCount": 1,
            "favoriteCount": 1,
            "rating": 1,
            "ratingCount": 1
          },
          "tags": [
            "x"
          ],
          "type": "Checkpoint"
        }
      ],
      "metadata": {
        "currentPage": 1,
        "nextPage": "x",
        "pageSize": 1,
        "prevPage": "x",
        "totalItems": 1,
        "totalPages": 1
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
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
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
        "image": "x",
        "username": "x"
      },
      "stats": {
        "commentCount": 1,
        "downloadCount": 1,
        "favoriteCount": 1,
        "rating": 1,
        "ratingCount": 1
      },
      "modelVersions": [
        {
          "createdAt": "2026-01-01T00:00:00Z",
          "description": "x",
          "downloadUrl": "x",
          "files": [
            {
              "metadata": {
                "format": "SafeTensor",
                "fp": "fp16",
                "size": "full"
              },
              "pickleScanResult": "Pending",
              "primary": true,
              "scannedAt": "2026-01-01T00:00:00Z",
              "sizeKb": 1,
              "virusScanResult": "Pending"
            }
          ],
          "id": 1,
          "images": [
            {
              "hash": "x",
              "height": 1,
              "id": "x",
              "meta": {},
              "nsfw": "x",
              "url": "x",
              "width": 1
            }
          ],
          "name": "x",
          "stats": {
            "downloadCount": 1,
            "rating": 1,
            "ratingCount": 1
          },
          "trainedWords": [
            "x"
          ]
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
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
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
          "metadata": {
            "format": "SafeTensor",
            "fp": "fp16",
            "size": "full"
          },
          "pickleScanResult": "Pending",
          "primary": true,
          "scannedAt": "2026-01-01T00:00:00Z",
          "sizeKb": 1,
          "virusScanResult": "Pending"
        }
      ],
      "images": [
        {
          "hash": "x",
          "height": 1,
          "id": "x",
          "meta": {},
          "nsfw": "x",
          "url": "x",
          "width": 1
        }
      ],
      "stats": {
        "downloadCount": 1,
        "rating": 1,
        "ratingCount": 1
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
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
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
          "metadata": {
            "format": "SafeTensor",
            "fp": "fp16",
            "size": "full"
          },
          "pickleScanResult": "Pending",
          "primary": true,
          "scannedAt": "2026-01-01T00:00:00Z",
          "sizeKb": 1,
          "virusScanResult": "Pending"
        }
      ],
      "images": [
        {
          "hash": "x",
          "height": 1,
          "id": "x",
          "meta": {},
          "nsfw": "x",
          "url": "x",
          "width": 1
        }
      ],
      "stats": {
        "downloadCount": 1,
        "rating": 1,
        "ratingCount": 1
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
      "limit": "v1",
      "page": "v1",
      "query": "v1"
    },
    "headers": [],
    "query": [
      "limit",
      "page",
      "query"
    ],
    "auth": [],
    "status": 200,
    "sample": {
      "items": [
        {
          "link": "x",
          "modelCount": 1,
          "name": "x"
        }
      ],
      "metadata": {
        "currentPage": 1,
        "nextPage": "x",
        "pageSize": 1,
        "prevPage": "x",
        "totalItems": 1,
        "totalPages": 1
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
