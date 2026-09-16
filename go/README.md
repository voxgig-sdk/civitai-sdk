# Civitai Golang SDK



The Golang SDK for the Civitai API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Creator(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/civitai-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/civitai-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/civitai-sdk/go=../civitai-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/civitai-sdk/go"
)

func main() {
    client := sdk.NewCivitaiSDK(map[string]any{
        "apikey": os.Getenv("CIVITAI_APIKEY"),
    })

    // List creator records — the value is the array of records itself.
    creators, err := client.Creator(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range creators.([]any) {
        fmt.Println(item)
    }
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
models, err := client.Model(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = models
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

model, err := client.Model(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(model) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewCivitaiSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
CIVITAI_TEST_LIVE=TRUE
CIVITAI_APIKEY=<your-key>
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewCivitaiSDK

```go
func NewCivitaiSDK(options map[string]any) *CivitaiSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *CivitaiSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### CivitaiSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Creator` | `(data map[string]any) CivitaiEntity` | Create a Creator entity instance. |
| `Image` | `(data map[string]any) CivitaiEntity` | Create an Image entity instance. |
| `Model` | `(data map[string]any) CivitaiEntity` | Create a Model entity instance. |
| `ModelVersion` | `(data map[string]any) CivitaiEntity` | Create a ModelVersion entity instance. |
| `Tag` | `(data map[string]any) CivitaiEntity` | Create a Tag entity instance. |

### Entity interface (CivitaiEntity)

All entities implement the `CivitaiEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    creator, err := client.Creator(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // creator is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Creator

| Field | Description |
| --- | --- |
| `"link"` | Url to get all models from this user |
| `"modelCount"` | The amount of models linked to this user |
| `"username"` | The username of the creator |

Operations: List.

API path: `/creators`

#### Image

| Field | Description |
| --- | --- |
| `"createdAt"` | The date the image was posted |
| `"hash"` | The blurhash of the image |
| `"height"` | The height of the image |
| `"id"` | The id of the image |
| `"meta"` | The generation parameters parsed or input for the image |
| `"nsfw"` | If the image has any mature content labels |
| `"nsfwLevel"` | The NSFW level of the image |
| `"postId"` | The ID of the post the image belongs to |
| `"stats"` |  |
| `"url"` | The url of the image at its source resolution |
| `"username"` | The username of the creator |
| `"width"` | The width of the image |

Operations: List.

API path: `/images`

#### Model

| Field | Description |
| --- | --- |
| `"creator"` |  |
| `"description"` | The description of the model (HTML) |
| `"id"` | The identifier for the model |
| `"mode"` | The mode in which the model is currently on. |
| `"modelVersions"` |  |
| `"name"` | The name of the model |
| `"nsfw"` | Whether the model is NSFW or not |
| `"stats"` |  |
| `"tags"` | The tags associated with the model |
| `"type"` | The model type |

Operations: List, Load.

API path: `/models`

#### ModelVersion

| Field | Description |
| --- | --- |
| `"createdAt"` | The date in which the version was created |
| `"description"` | The description of the model version (usually a changelog) |
| `"downloadUrl"` | The download url to get the model file for this specific version |
| `"files"` |  |
| `"id"` | The identifier for the model version |
| `"images"` |  |
| `"name"` | The name of the model version |
| `"stats"` |  |
| `"trainedWords"` | The words used to trigger the model |

Operations: Load.

API path: `/model-versions/by-hash/{hash}`

#### Tag

| Field | Description |
| --- | --- |
| `"link"` |  |
| `"modelCount"` |  |
| `"name"` |  |

Operations: List.

API path: `/tags`



## Entities


### Creator

Create an instance: `creator := client.Creator(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `link` | `string` | Url to get all models from this user |
| `modelCount` | `int` | The amount of models linked to this user |
| `username` | `string` | The username of the creator |

#### Example: List

```go
creators, err := client.Creator(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(creators) // the array of records
```


### Image

Create an instance: `image := client.Image(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` | The date the image was posted |
| `hash` | `string` | The blurhash of the image |
| `height` | `int` | The height of the image |
| `id` | `int` | The id of the image |
| `meta` | `map[string]any` | The generation parameters parsed or input for the image |
| `nsfw` | `bool` | If the image has any mature content labels |
| `nsfwLevel` | `string` | The NSFW level of the image |
| `postId` | `int` | The ID of the post the image belongs to |
| `stats` | `map[string]any` |  |
| `url` | `string` | The url of the image at its source resolution |
| `username` | `string` | The username of the creator |
| `width` | `int` | The width of the image |

#### Example: List

```go
images, err := client.Image(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(images) // the array of records
```


### Model

Create an instance: `model := client.Model(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `creator` | `map[string]any` |  |
| `description` | `string` | The description of the model (HTML) |
| `id` | `int` | The identifier for the model |
| `mode` | `string` | The mode in which the model is currently on. |
| `modelVersions` | `[]any` |  |
| `name` | `string` | The name of the model |
| `nsfw` | `bool` | Whether the model is NSFW or not |
| `stats` | `map[string]any` |  |
| `tags` | `[]any` | The tags associated with the model |
| `type` | `string` | The model type |

#### Example: Load

```go
model, err := client.Model(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(model) // the loaded record
```

#### Example: List

```go
models, err := client.Model(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(models) // the array of records
```


### ModelVersion

Create an instance: `modelVersion := client.ModelVersion(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` | The date in which the version was created |
| `description` | `string` | The description of the model version (usually a changelog) |
| `downloadUrl` | `string` | The download url to get the model file for this specific version |
| `files` | `[]any` |  |
| `id` | `int` | The identifier for the model version |
| `images` | `[]any` |  |
| `name` | `string` | The name of the model version |
| `stats` | `map[string]any` |  |
| `trainedWords` | `[]any` | The words used to trigger the model |

#### Example: Load

```go
modelVersion, err := client.ModelVersion(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(modelVersion) // the loaded record
```


### Tag

Create an instance: `tag := client.Tag(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `link` | `string` |  |
| `modelCount` | `int` |  |
| `name` | `string` |  |

#### Example: List

```go
tags, err := client.Tag(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(tags) // the array of records
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Client-side rate limiting via a token bucket |
| [`retry`](#retry) | Automatic retry of transient failures with exponential backoff |
| [`test`](#test) | In-memory mock transport for testing without a live server |
| [`timeout`](#timeout) | Per-request timeout with transport abort |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Client-side rate limiting via a token bucket.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Automatic retry of transient failures with exponential backoff.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Per-request timeout with transport abort.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/civitai-sdk/go/
├── civitai.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/civitai-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
model := client.Model(nil)
model.List(nil, nil)

// model.Data() now returns the model data from the last list
// model.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
