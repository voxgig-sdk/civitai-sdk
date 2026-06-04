# Civitai SDK

Browse Civitai's catalogue of community-shared Stable Diffusion models, image generations, creators, and tags

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Civitai API

[Civitai](https://civitai.com) is a community hub for sharing AI image-generation models, primarily Stable Diffusion checkpoints, LoRAs, embeddings, and the images they produce. The site API exposes the same catalogue that powers civitai.com so applications can discover models, look up versions by file hash, and browse creator profiles and tagged content.

What you can do with the API:

- List and search models, with filters and SFW toggles
- Fetch a specific model or a model version (including lookup by file hash)
- Browse images posted to the site, with SFW filters
- List creators and tags used across the catalogue

The API is served from `https://civitai.com/api/v1` and has CORS enabled, so it can be called from browser apps. A separate Orchestration API and OAuth flow (authorization code + PKCE, scoped tokens, per-app buzz limits) are available from [developer.civitai.com](https://developer.civitai.com) for apps that need to act on behalf of users or submit generation workflows.

## Try it

**TypeScript**
```bash
npm install civitai
```

**Python**
```bash
pip install civitai-sdk
```

**PHP**
```bash
composer require voxgig/civitai-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/civitai-sdk/go
```

**Ruby**
```bash
gem install civitai-sdk
```

**Lua**
```bash
luarocks install civitai-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { CivitaiSDK } from 'civitai'

const client = new CivitaiSDK({})

// List all creators
const creators = await client.Creator().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o civitai-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "civitai": {
      "command": "/abs/path/to/civitai-mcp"
    }
  }
}
```

## Entities

The API exposes 5 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Creator** | A user profile that has published models or images on Civitai; listed via the creators endpoint under `/api/v1`. | `/creators` |
| **Image** | An image post on Civitai, typically a generation output, retrievable with SFW filtering through the images endpoint. | `/images` |
| **Model** | A published AI model entry (e.g. Stable Diffusion checkpoint, LoRA, embedding) browsable and fetchable by ID via the models endpoint. | `/models` |
| **ModelVersion** | A specific version of a model with its own files and metadata; can be fetched by ID or by file hash. | `/model-versions/by-hash/{hash}` |
| **Tag** | A label used to categorise models and images across the Civitai catalogue. | `/tags` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from civitai_sdk import CivitaiSDK

client = CivitaiSDK({})

# List all creators
creators, err = client.Creator(None).list(None, None)
```

### PHP

```php
<?php
require_once 'civitai_sdk.php';

$client = new CivitaiSDK([]);

// List all creators
[$creators, $err] = $client->Creator(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/civitai-sdk/go"

client := sdk.NewCivitaiSDK(map[string]any{})

// List all creators
creators, err := client.Creator(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "Civitai_sdk"

client = CivitaiSDK.new({})

# List all creators
creators, err = client.Creator(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("civitai_sdk")

local client = sdk.new({})

-- List all creators
local creators, err = client:Creator(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = CivitaiSDK.test()
const result = await client.Creator().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = CivitaiSDK.test(None, None)
result, err = client.Creator(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = CivitaiSDK::test(null, null);
[$result, $err] = $client->Creator(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Creator(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = CivitaiSDK.test(nil, nil)
result, err = client.Creator(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Creator(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Civitai API

- Upstream: [https://civitai.com](https://civitai.com)
- API docs: [https://developer.civitai.com](https://developer.civitai.com)

---

Generated from the Civitai API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
