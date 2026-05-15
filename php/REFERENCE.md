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

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. Returns `[$result, $err]`.

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

**Returns:** `array [$result, $err]`

#### `prepare(array $fetchargs = []): array`

Prepare a fetch definition without sending the request. Returns `[$fetchdef, $err]`.


---

## CreatorEntity

```php
$creator = $client->Creator();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `link` | ``$STRING`` | No |  |
| `model_count` | ``$INTEGER`` | No |  |
| `username` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Creator()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CreatorEntity`

Create a new `CreatorEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## ImageEntity

```php
$image = $client->Image();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | ``$STRING`` | No |  |
| `hash` | ``$STRING`` | No |  |
| `height` | ``$INTEGER`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `meta` | ``$OBJECT`` | No |  |
| `nsfw` | ``$BOOLEAN`` | No |  |
| `nsfw_level` | ``$STRING`` | No |  |
| `post_id` | ``$INTEGER`` | No |  |
| `stat` | ``$OBJECT`` | No |  |
| `url` | ``$STRING`` | No |  |
| `username` | ``$STRING`` | No |  |
| `width` | ``$INTEGER`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Image()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ImageEntity`

Create a new `ImageEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## ModelEntity

```php
$model = $client->Model();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `creator` | ``$OBJECT`` | No |  |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `mode` | ``$STRING`` | No |  |
| `model_version` | ``$ARRAY`` | No |  |
| `name` | ``$STRING`` | No |  |
| `nsfw` | ``$BOOLEAN`` | No |  |
| `stat` | ``$OBJECT`` | No |  |
| `tag` | ``$ARRAY`` | No |  |
| `type` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Model()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Model()->load(["id" => "model_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ModelEntity`

Create a new `ModelEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## ModelVersionEntity

```php
$model_version = $client->ModelVersion();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `download_url` | ``$STRING`` | No |  |
| `file` | ``$ARRAY`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `image` | ``$ARRAY`` | No |  |
| `name` | ``$STRING`` | No |  |
| `stat` | ``$OBJECT`` | No |  |
| `trained_word` | ``$ARRAY`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->ModelVersion()->load(["id" => "model_version_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ModelVersionEntity`

Create a new `ModelVersionEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## TagEntity

```php
$tag = $client->Tag();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `link` | ``$STRING`` | No |  |
| `model_count` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Tag()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): TagEntity`

Create a new `TagEntity` instance with the same client and
options.

#### `getName(): string`

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

