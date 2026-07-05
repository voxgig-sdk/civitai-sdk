# Civitai PHP SDK Reference

Complete API reference for the Civitai PHP SDK.


## CivitaiSDK

### Constructor

```php
require_once __DIR__ . '/civitai_sdk.php';

$client = new CivitaiSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CivitaiSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = CivitaiSDK::test();
```


### Instance Methods

#### `Creator($data = null)`

Create a new `CreatorEntity` instance. Pass `null` for no initial data.

#### `Image($data = null)`

Create a new `ImageEntity` instance. Pass `null` for no initial data.

#### `Model($data = null)`

Create a new `ModelEntity` instance. Pass `null` for no initial data.

#### `ModelVersion($data = null)`

Create a new `ModelVersionEntity` instance. Pass `null` for no initial data.

#### `Tag($data = null)`

Create a new `TagEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): CivitaiUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## CreatorEntity

```php
$creator = $client->Creator();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `link` | `string` | No |  |
| `model_count` | `int` | No |  |
| `username` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Creator()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CreatorEntity`

Create a new `CreatorEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ImageEntity

```php
$image = $client->Image();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No |  |
| `hash` | `string` | No |  |
| `height` | `int` | No |  |
| `id` | `int` | No |  |
| `meta` | `array` | No |  |
| `nsfw` | `bool` | No |  |
| `nsfw_level` | `string` | No |  |
| `post_id` | `int` | No |  |
| `stat` | `array` | No |  |
| `url` | `string` | No |  |
| `username` | `string` | No |  |
| `width` | `int` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Image()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ImageEntity`

Create a new `ImageEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ModelEntity

```php
$model = $client->Model();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `creator` | `array` | No |  |
| `description` | `string` | No |  |
| `id` | `int` | No |  |
| `mode` | `string` | No |  |
| `model_version` | `array` | No |  |
| `name` | `string` | No |  |
| `nsfw` | `bool` | No |  |
| `stat` | `array` | No |  |
| `tag` | `array` | No |  |
| `type` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Model()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Model()->load(["id" => "model_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ModelEntity`

Create a new `ModelEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ModelVersionEntity

```php
$model_version = $client->ModelVersion();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No |  |
| `description` | `string` | No |  |
| `download_url` | `string` | No |  |
| `file` | `array` | No |  |
| `id` | `int` | No |  |
| `image` | `array` | No |  |
| `name` | `string` | No |  |
| `stat` | `array` | No |  |
| `trained_word` | `array` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->ModelVersion()->load(["id" => "model_version_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ModelVersionEntity`

Create a new `ModelVersionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## TagEntity

```php
$tag = $client->Tag();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `link` | `string` | No |  |
| `model_count` | `int` | No |  |
| `name` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Tag()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): TagEntity`

Create a new `TagEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new CivitaiSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

