# Civitai Lua SDK



The Lua SDK for the Civitai API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Creator()` — each with the same small set of operations (`list`, `load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/civitai-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("civitai_sdk")

local client = sdk.new({
  apikey = os.getenv("CIVITAI_APIKEY"),
})
```

### 2. List creator records

Entity operations return `(value, err)`. For `list`, `value` is the
array of records itself — iterate it directly (there is no wrapper).

```lua
local creators, err = client:Creator():list()
if err then error(err) end

for _, item in ipairs(creators) do
  print(item["link"])
end
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local models, err = client:Model():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Model():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### CivitaiSDK

```lua
local sdk = require("civitai_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### CivitaiSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `Creator` | `(data) -> CreatorEntity` | Create a Creator entity instance. |
| `Image` | `(data) -> ImageEntity` | Create an Image entity instance. |
| `Model` | `(data) -> ModelEntity` | Create a Model entity instance. |
| `ModelVersion` | `(data) -> ModelVersionEntity` | Create a ModelVersion entity instance. |
| `Tag` | `(data) -> TagEntity` | Create a Tag entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local model, err = client:Model():load({ id = "example_id" })
    if err then error(err) end
    -- model is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### Creator

| Field | Description |
| --- | --- |
| `link` | Url to get all models from this user |
| `modelCount` | The amount of models linked to this user |
| `username` | The username of the creator |

Operations: List.

API path: `/creators`

#### Image

| Field | Description |
| --- | --- |
| `createdAt` | The date the image was posted |
| `hash` | The blurhash of the image |
| `height` | The height of the image |
| `id` | The id of the image |
| `meta` | The generation parameters parsed or input for the image |
| `nsfw` | If the image has any mature content labels |
| `nsfwLevel` | The NSFW level of the image |
| `postId` | The ID of the post the image belongs to |
| `stats` |  |
| `url` | The url of the image at its source resolution |
| `username` | The username of the creator |
| `width` | The width of the image |

Operations: List.

API path: `/images`

#### Model

| Field | Description |
| --- | --- |
| `creator` |  |
| `description` | The description of the model (HTML) |
| `id` | The identifier for the model |
| `mode` | The mode in which the model is currently on. |
| `modelVersions` |  |
| `name` | The name of the model |
| `nsfw` | Whether the model is NSFW or not |
| `stats` |  |
| `tags` | The tags associated with the model |
| `type` | The model type |

Operations: List, Load.

API path: `/models`

#### ModelVersion

| Field | Description |
| --- | --- |
| `createdAt` | The date in which the version was created |
| `description` | The description of the model version (usually a changelog) |
| `downloadUrl` | The download url to get the model file for this specific version |
| `files` |  |
| `id` | The identifier for the model version |
| `images` |  |
| `name` | The name of the model version |
| `stats` |  |
| `trainedWords` | The words used to trigger the model |

Operations: Load.

API path: `/model-versions/by-hash/{hash}`

#### Tag

| Field | Description |
| --- | --- |
| `link` |  |
| `modelCount` |  |
| `name` |  |

Operations: List.

API path: `/tags`



## Entities


### Creator

Create an instance: `local creator = client:Creator(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `link` | `string` | Url to get all models from this user |
| `modelCount` | `number` | The amount of models linked to this user |
| `username` | `string` | The username of the creator |

#### Example: List

```lua
local creators, err = client:Creator():list()
```


### Image

Create an instance: `local image = client:Image(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` | The date the image was posted |
| `hash` | `string` | The blurhash of the image |
| `height` | `number` | The height of the image |
| `id` | `number` | The id of the image |
| `meta` | `table` | The generation parameters parsed or input for the image |
| `nsfw` | `boolean` | If the image has any mature content labels |
| `nsfwLevel` | `string` | The NSFW level of the image |
| `postId` | `number` | The ID of the post the image belongs to |
| `stats` | `table` |  |
| `url` | `string` | The url of the image at its source resolution |
| `username` | `string` | The username of the creator |
| `width` | `number` | The width of the image |

#### Example: List

```lua
local images, err = client:Image():list()
```


### Model

Create an instance: `local model = client:Model(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `creator` | `table` |  |
| `description` | `string` | The description of the model (HTML) |
| `id` | `number` | The identifier for the model |
| `mode` | `string` | The mode in which the model is currently on. |
| `modelVersions` | `table` |  |
| `name` | `string` | The name of the model |
| `nsfw` | `boolean` | Whether the model is NSFW or not |
| `stats` | `table` |  |
| `tags` | `table` | The tags associated with the model |
| `type` | `string` | The model type |

#### Example: Load

```lua
local model, err = client:Model():load({ id = 1 })
```

#### Example: List

```lua
local models, err = client:Model():list()
```


### ModelVersion

Create an instance: `local model_version = client:ModelVersion(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` | The date in which the version was created |
| `description` | `string` | The description of the model version (usually a changelog) |
| `downloadUrl` | `string` | The download url to get the model file for this specific version |
| `files` | `table` |  |
| `id` | `number` | The identifier for the model version |
| `images` | `table` |  |
| `name` | `string` | The name of the model version |
| `stats` | `table` |  |
| `trainedWords` | `table` | The words used to trigger the model |

#### Example: Load

```lua
local model_version, err = client:ModelVersion():load({ id = 1 })
```


### Tag

Create an instance: `local tag = client:Tag(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `link` | `string` |  |
| `modelCount` | `number` |  |
| `name` | `string` |  |

#### Example: List

```lua
local tags, err = client:Tag():list()
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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── civitai_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── schema.lua               -- Generated option + entity specs
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`civitai_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local model = client:Model()
model:list()

-- model:data_get() now returns the model data from the last list
-- model:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
