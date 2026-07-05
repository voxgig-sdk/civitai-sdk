# Civitai Ruby SDK



The Ruby SDK for the Civitai API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Creator` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/civitai-sdk/releases](https://github.com/voxgig-sdk/civitai-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "Civitai_sdk"

client = CivitaiSDK.new({
  "apikey" => ENV["CIVITAI_APIKEY"],
})
```

### 2. List creator records

```ruby
begin
  # list returns an Array of Creator records — iterate directly.
  creators = client.Creator.list
  creators.each do |item|
    puts "#{item["link"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  creators = client.Creator.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = CivitaiSDK.test

# Entity ops return the bare mock record (raises on error).
creator = client.Creator.list()
puts creator
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = CivitaiSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### CivitaiSDK

```ruby
require_relative "Civitai_sdk"
client = CivitaiSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `String` | API key for authentication. |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = CivitaiSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### CivitaiSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `Creator` | `(data) -> CreatorEntity` | Create a Creator entity instance. |
| `Image` | `(data) -> ImageEntity` | Create an Image entity instance. |
| `Model` | `(data) -> ModelEntity` | Create a Model entity instance. |
| `ModelVersion` | `(data) -> ModelVersionEntity` | Create a ModelVersion entity instance. |
| `Tag` | `(data) -> TagEntity` | Create a Tag entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `CivitaiError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

### Entities

#### Creator

| Field | Description |
| --- | --- |
| `link` |  |
| `model_count` |  |
| `username` |  |

Operations: List.

API path: `/creators`

#### Image

| Field | Description |
| --- | --- |
| `created_at` |  |
| `hash` |  |
| `height` |  |
| `id` |  |
| `meta` |  |
| `nsfw` |  |
| `nsfw_level` |  |
| `post_id` |  |
| `stat` |  |
| `url` |  |
| `username` |  |
| `width` |  |

Operations: List.

API path: `/images`

#### Model

| Field | Description |
| --- | --- |
| `creator` |  |
| `description` |  |
| `id` |  |
| `mode` |  |
| `model_version` |  |
| `name` |  |
| `nsfw` |  |
| `stat` |  |
| `tag` |  |
| `type` |  |

Operations: List, Load.

API path: `/models`

#### ModelVersion

| Field | Description |
| --- | --- |
| `created_at` |  |
| `description` |  |
| `download_url` |  |
| `file` |  |
| `id` |  |
| `image` |  |
| `name` |  |
| `stat` |  |
| `trained_word` |  |

Operations: Load.

API path: `/model-versions/by-hash/{hash}`

#### Tag

| Field | Description |
| --- | --- |
| `link` |  |
| `model_count` |  |
| `name` |  |

Operations: List.

API path: `/tags`



## Entities


### Creator

Create an instance: `creator = client.Creator`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `link` | `String` |  |
| `model_count` | `Integer` |  |
| `username` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Creator records (raises on error).
creators = client.Creator.list
```


### Image

Create an instance: `image = client.Image`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `String` |  |
| `hash` | `String` |  |
| `height` | `Integer` |  |
| `id` | `Integer` |  |
| `meta` | `Hash` |  |
| `nsfw` | `Boolean` |  |
| `nsfw_level` | `String` |  |
| `post_id` | `Integer` |  |
| `stat` | `Hash` |  |
| `url` | `String` |  |
| `username` | `String` |  |
| `width` | `Integer` |  |

#### Example: List

```ruby
# list returns an Array of Image records (raises on error).
images = client.Image.list
```


### Model

Create an instance: `model = client.Model`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `creator` | `Hash` |  |
| `description` | `String` |  |
| `id` | `Integer` |  |
| `mode` | `String` |  |
| `model_version` | `Array` |  |
| `name` | `String` |  |
| `nsfw` | `Boolean` |  |
| `stat` | `Hash` |  |
| `tag` | `Array` |  |
| `type` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Model record (raises on error).
model = client.Model.load({ "id" => "model_id" })
```

#### Example: List

```ruby
# list returns an Array of Model records (raises on error).
models = client.Model.list
```


### ModelVersion

Create an instance: `model_version = client.ModelVersion`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `String` |  |
| `description` | `String` |  |
| `download_url` | `String` |  |
| `file` | `Array` |  |
| `id` | `Integer` |  |
| `image` | `Array` |  |
| `name` | `String` |  |
| `stat` | `Hash` |  |
| `trained_word` | `Array` |  |

#### Example: Load

```ruby
# load returns the bare ModelVersion record (raises on error).
model_version = client.ModelVersion.load({ "id" => "model_version_id" })
```


### Tag

Create an instance: `tag = client.Tag`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `link` | `String` |  |
| `model_count` | `Integer` |  |
| `name` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Tag records (raises on error).
tags = client.Tag.list
```


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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── Civitai_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`Civitai_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
creator = client.Creator
creator.list()

# creator.data_get now returns the creator data from the last list
# creator.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
