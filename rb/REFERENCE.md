# Civitai Ruby SDK Reference

Complete API reference for the Civitai Ruby SDK.


## CivitaiSDK

### Constructor

```ruby
require_relative 'Civitai_sdk'

client = CivitaiSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CivitaiSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = CivitaiSDK.test
```


### Instance Methods

#### `Creator(data = nil)`

Create a new `Creator` entity instance. Pass `nil` for no initial data.

#### `Image(data = nil)`

Create a new `Image` entity instance. Pass `nil` for no initial data.

#### `Model(data = nil)`

Create a new `Model` entity instance. Pass `nil` for no initial data.

#### `ModelVersion(data = nil)`

Create a new `ModelVersion` entity instance. Pass `nil` for no initial data.

#### `Tag(data = nil)`

Create a new `Tag` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## CreatorEntity

```ruby
creator = client.Creator
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `link` | `String` | No |  |
| `model_count` | `Integer` | No |  |
| `username` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Creator.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CreatorEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ImageEntity

```ruby
image = client.Image
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `String` | No |  |
| `hash` | `String` | No |  |
| `height` | `Integer` | No |  |
| `id` | `Integer` | No |  |
| `meta` | `Hash` | No |  |
| `nsfw` | `Boolean` | No |  |
| `nsfw_level` | `String` | No |  |
| `post_id` | `Integer` | No |  |
| `stat` | `Hash` | No |  |
| `url` | `String` | No |  |
| `username` | `String` | No |  |
| `width` | `Integer` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Image.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ImageEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ModelEntity

```ruby
model = client.Model
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `creator` | `Hash` | No |  |
| `description` | `String` | No |  |
| `id` | `Integer` | No |  |
| `mode` | `String` | No |  |
| `model_version` | `Array` | No |  |
| `name` | `String` | No |  |
| `nsfw` | `Boolean` | No |  |
| `stat` | `Hash` | No |  |
| `tag` | `Array` | No |  |
| `type` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Model.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Model.load({ "id" => "model_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ModelEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ModelVersionEntity

```ruby
model_version = client.ModelVersion
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `String` | No |  |
| `description` | `String` | No |  |
| `download_url` | `String` | No |  |
| `file` | `Array` | No |  |
| `id` | `Integer` | No |  |
| `image` | `Array` | No |  |
| `name` | `String` | No |  |
| `stat` | `Hash` | No |  |
| `trained_word` | `Array` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.ModelVersion.load({ "id" => "model_version_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ModelVersionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## TagEntity

```ruby
tag = client.Tag
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `link` | `String` | No |  |
| `model_count` | `Integer` | No |  |
| `name` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Tag.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `TagEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = CivitaiSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

