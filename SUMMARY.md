# Civitai API

REST API for accessing Civitai creators, images, models, model versions, and tags. Provides endpoints for retrieving specific resources like models by ID or model versions by hash.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 5 entities and 7 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Creator

Results: Successful response.

SDK operations: `list`.

Key fields to recognise:

- `link`: Url to get all models from this user
- `modelCount`: The amount of models linked to this user
- `username`: The username of the creator

### Image

Results: Successful response.

SDK operations: `list`.

Key fields to recognise:

- `createdAt`: The date the image was posted
- `hash`: The blurhash of the image
- `height`: The height of the image
- `id`: The id of the image
- `meta`: The generation parameters parsed or input for the image

### Model

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `description`: The description of the model (HTML)
- `id`: The identifier for the model
- `mode`: The mode in which the model is currently on. If Archived, files field will be empty. If TakenDown, images field will be empty
- `name`: The name of the model
- `nsfw`: Whether the model is NSFW or not

### ModelVersion

Results: Successful response.

SDK operations: `load`.

Key fields to recognise:

- `createdAt`: The date in which the version was created
- `description`: The description of the model version (usually a changelog)
- `downloadUrl`: The download url to get the model file for this specific version
- `id`: The identifier for the model version
- `name`: The name of the model version

### Tag

Results: Successful response.

SDK operations: `list`.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Creator | `list` | `GET /creators` | Not required |
| Image | `list` | `GET /images` | Not required |
| Model | `list` | `GET /models` | Not required |
| Model | `load` | `GET /models/{modelId}` | Not required |
| ModelVersion | `load` | `GET /model-versions/by-hash/{hash}` | Not required |
| ModelVersion | `load` | `GET /model-versions/{modelVersionId}` | Not required |
| Tag | `list` | `GET /tags` | Not required |

## Connect to the API

- Civitai API v1 Production Server: `https://civitai.com/api/v1`

The default credential is sent in the `Authorization` header with the `Bearer` prefix.

Use your API key as a Bearer token in the Authorization header

Pass your API key as a query parameter

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

A read request without required parameters or authentication is `GET /creators`. For example:

```sh
curl --fail-with-body --silent --show-error 'https://civitai.com/api/v1/creators'
```

Inspect the response using the Creator reference. This checks the public route; authenticated operations need their own credentials and request data.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `civitai_list`: List records for an entity. Supported entities: `creator`, `image`, `model`, `tag`.
- `civitai_load`: Load one record for an entity. Supported entities: `model`, `model_version`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

