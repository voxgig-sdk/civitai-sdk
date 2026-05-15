# Civitai PHP SDK

The PHP SDK for the Civitai API. Provides an entity-oriented interface using PHP conventions.


## Install
```bash
composer require voxgig/civitai-sdk
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'civitai_sdk.php';

$client = new CivitaiSDK([
    "apikey" => getenv("CIVITAI_APIKEY"),
]);
```

### 2. List creators

```php
[$result, $err] = $client->Creator(null)->list(null, null);
if ($err) { throw new \Exception($err); }

if (is_array($result)) {
    foreach ($result as $item) {
        $d = $item->data_get();
        echo $d["id"] . " " . $d["name"] . "\n";
    }
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
if ($err) { throw new \Exception($err); }

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
}
```

### Prepare a request without sending it

```php
[$fetchdef, $err] = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);
if ($err) { throw new \Exception($err); }

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = CivitaiSDK::test(null, null);

[$result, $err] = $client->Civitai(null)->load(
    ["id" => "test01"], null
);
// $result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new CivitaiSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
CIVITAI_TEST_LIVE=TRUE
CIVITAI_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### CivitaiSDK

```php
require_once 'civitai_sdk.php';
$client = new CivitaiSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = CivitaiSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### CivitaiSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Creator` | `($data): CreatorEntity` | Create a Creator entity instance. |
| `Image` | `($data): ImageEntity` | Create a Image entity instance. |
| `Model` | `($data): ModelEntity` | Create a Model entity instance. |
| `ModelVersion` | `($data): ModelVersionEntity` | Create a ModelVersion entity instance. |
| `Tag` | `($data): TagEntity` | Create a Tag entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `($reqmatch, $ctrl): array` | List entities matching the criteria. |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return `[$result, $err]`. The first value is an
`array` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `const creator = client.Creator()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `link` | ``$STRING`` |  |
| `model_count` | ``$INTEGER`` |  |
| `username` | ``$STRING`` |  |

#### Example: List

```ts
const creators = await client.Creator().list()
```


### Image

Create an instance: `const image = client.Image()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | ``$STRING`` |  |
| `hash` | ``$STRING`` |  |
| `height` | ``$INTEGER`` |  |
| `id` | ``$INTEGER`` |  |
| `meta` | ``$OBJECT`` |  |
| `nsfw` | ``$BOOLEAN`` |  |
| `nsfw_level` | ``$STRING`` |  |
| `post_id` | ``$INTEGER`` |  |
| `stat` | ``$OBJECT`` |  |
| `url` | ``$STRING`` |  |
| `username` | ``$STRING`` |  |
| `width` | ``$INTEGER`` |  |

#### Example: List

```ts
const images = await client.Image().list()
```


### Model

Create an instance: `const model = client.Model()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `creator` | ``$OBJECT`` |  |
| `description` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `mode` | ``$STRING`` |  |
| `model_version` | ``$ARRAY`` |  |
| `name` | ``$STRING`` |  |
| `nsfw` | ``$BOOLEAN`` |  |
| `stat` | ``$OBJECT`` |  |
| `tag` | ``$ARRAY`` |  |
| `type` | ``$STRING`` |  |

#### Example: Load

```ts
const model = await client.Model().load({ id: 'model_id' })
```

#### Example: List

```ts
const models = await client.Model().list()
```


### ModelVersion

Create an instance: `const model_version = client.ModelVersion()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `download_url` | ``$STRING`` |  |
| `file` | ``$ARRAY`` |  |
| `id` | ``$INTEGER`` |  |
| `image` | ``$ARRAY`` |  |
| `name` | ``$STRING`` |  |
| `stat` | ``$OBJECT`` |  |
| `trained_word` | ``$ARRAY`` |  |

#### Example: Load

```ts
const model_version = await client.ModelVersion().load({ id: 'model_version_id' })
```


### Tag

Create an instance: `const tag = client.Tag()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `link` | ``$STRING`` |  |
| `model_count` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |

#### Example: List

```ts
const tags = await client.Tag().list()
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller as the second element in the return array.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── civitai_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`civitai_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$moon = $client->Moon();
[$result, $err] = $moon->load(["planet_id" => "earth", "id" => "luna"]);

// $moon->dataGet() now returns the loaded moon data
// $moon->matchGet() returns the last match criteria
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
