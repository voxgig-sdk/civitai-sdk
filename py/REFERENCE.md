# Civitai Python SDK Reference

Complete API reference for the Civitai Python SDK.


## CivitaiSDK

### Constructor

```python
from civitai_sdk import CivitaiSDK

client = CivitaiSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CivitaiSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = CivitaiSDK.test()
```


### Instance Methods

#### `Creator(data=None)`

Create a new `CreatorEntity` instance. Pass `None` for no initial data.

#### `Image(data=None)`

Create a new `ImageEntity` instance. Pass `None` for no initial data.

#### `Model(data=None)`

Create a new `ModelEntity` instance. Pass `None` for no initial data.

#### `ModelVersion(data=None)`

Create a new `ModelVersionEntity` instance. Pass `None` for no initial data.

#### `Tag(data=None)`

Create a new `TagEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## CreatorEntity

```python
creator = client.Creator()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `link` | `str` | No |  |
| `model_count` | `int` | No |  |
| `username` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Creator().list()
for creator in results:
    print(creator)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CreatorEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ImageEntity

```python
image = client.Image()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No |  |
| `hash` | `str` | No |  |
| `height` | `int` | No |  |
| `id` | `int` | No |  |
| `meta` | `dict` | No |  |
| `nsfw` | `bool` | No |  |
| `nsfw_level` | `str` | No |  |
| `post_id` | `int` | No |  |
| `stat` | `dict` | No |  |
| `url` | `str` | No |  |
| `username` | `str` | No |  |
| `width` | `int` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Image().list()
for image in results:
    print(image)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ImageEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ModelEntity

```python
model = client.Model()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `creator` | `dict` | No |  |
| `description` | `str` | No |  |
| `id` | `int` | No |  |
| `mode` | `str` | No |  |
| `model_version` | `list` | No |  |
| `name` | `str` | No |  |
| `nsfw` | `bool` | No |  |
| `stat` | `dict` | No |  |
| `tag` | `list` | No |  |
| `type` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Model().list()
for model in results:
    print(model)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Model().load({"id": "model_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ModelEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ModelVersionEntity

```python
model_version = client.ModelVersion()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No |  |
| `description` | `str` | No |  |
| `download_url` | `str` | No |  |
| `file` | `list` | No |  |
| `id` | `int` | No |  |
| `image` | `list` | No |  |
| `name` | `str` | No |  |
| `stat` | `dict` | No |  |
| `trained_word` | `list` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ModelVersion().load({"id": "model_version_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ModelVersionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TagEntity

```python
tag = client.Tag()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `link` | `str` | No |  |
| `model_count` | `int` | No |  |
| `name` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Tag().list()
for tag in results:
    print(tag)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TagEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = CivitaiSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

