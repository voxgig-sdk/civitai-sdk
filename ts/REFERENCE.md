# Civitai TypeScript SDK Reference

Complete API reference for the Civitai TypeScript SDK.


## CivitaiSDK

### Constructor

```ts
new CivitaiSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CivitaiSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = CivitaiSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `CivitaiSDK` instance in test mode.


### Instance Methods

#### `Creator(data?: object)`

Create a new `Creator` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CreatorEntity` instance.

#### `Image(data?: object)`

Create a new `Image` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ImageEntity` instance.

#### `Model(data?: object)`

Create a new `Model` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ModelEntity` instance.

#### `ModelVersion(data?: object)`

Create a new `ModelVersion` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ModelVersionEntity` instance.

#### `Tag(data?: object)`

Create a new `Tag` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TagEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `CivitaiSDK.test()`.

**Returns:** `CivitaiSDK` instance in test mode.


---

## CreatorEntity

```ts
const creator = client.Creator()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `link` | `string` | No |  |
| `model_count` | `number` | No |  |
| `username` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Creator().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CreatorEntity` instance with the same client and
options.

#### `client()`

Return the parent `CivitaiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ImageEntity

```ts
const image = client.Image()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No |  |
| `hash` | `string` | No |  |
| `height` | `number` | No |  |
| `id` | `number` | No |  |
| `meta` | `Record<string, any>` | No |  |
| `nsfw` | `boolean` | No |  |
| `nsfw_level` | `string` | No |  |
| `post_id` | `number` | No |  |
| `stat` | `Record<string, any>` | No |  |
| `url` | `string` | No |  |
| `username` | `string` | No |  |
| `width` | `number` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Image().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ImageEntity` instance with the same client and
options.

#### `client()`

Return the parent `CivitaiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ModelEntity

```ts
const model = client.Model()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `creator` | `Record<string, any>` | No |  |
| `description` | `string` | No |  |
| `id` | `number` | No |  |
| `mode` | `string` | No |  |
| `model_version` | `any[]` | No |  |
| `name` | `string` | No |  |
| `nsfw` | `boolean` | No |  |
| `stat` | `Record<string, any>` | No |  |
| `tag` | `any[]` | No |  |
| `type` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Model().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Model().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ModelEntity` instance with the same client and
options.

#### `client()`

Return the parent `CivitaiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ModelVersionEntity

```ts
const model_version = client.ModelVersion()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No |  |
| `description` | `string` | No |  |
| `download_url` | `string` | No |  |
| `file` | `any[]` | No |  |
| `id` | `number` | No |  |
| `image` | `any[]` | No |  |
| `name` | `string` | No |  |
| `stat` | `Record<string, any>` | No |  |
| `trained_word` | `any[]` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ModelVersion().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ModelVersionEntity` instance with the same client and
options.

#### `client()`

Return the parent `CivitaiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TagEntity

```ts
const tag = client.Tag()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `link` | `string` | No |  |
| `model_count` | `number` | No |  |
| `name` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Tag().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TagEntity` instance with the same client and
options.

#### `client()`

Return the parent `CivitaiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new CivitaiSDK({
  feature: {
    test: { active: true },
  }
})
```

