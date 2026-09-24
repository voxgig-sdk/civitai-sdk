"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ModelEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CIVITAI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CIVITAI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CivitaiSDK.test();
        const ent = testsdk.Model();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CIVITAI_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'model.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "creator": { "a": true, "h": "Creator", "n": "creator", "r": false, "t": "`$OBJECT`", "key$": "creator", "index$": 0 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "The description of the model (HTML)", "t": "`$STRING`", "key$": "description", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "The identifier for the model", "t": "`$INTEGER`", "key$": "id", "index$": 2 }, "mode": { "a": true, "h": "Mode", "n": "mode", "r": false, "sh": "The mode in which the model is currently on.", "t": "`$STRING`", "key$": "mode", "index$": 3 }, "modelVersions": { "a": true, "h": "Model Versions", "n": "modelVersions", "r": false, "t": "`$ARRAY`", "key$": "modelVersions", "index$": 4 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "The name of the model", "t": "`$STRING`", "key$": "name", "index$": 5 }, "nsfw": { "a": true, "h": "Nsfw", "n": "nsfw", "r": false, "sh": "Whether the model is NSFW or not", "t": "`$BOOLEAN`", "key$": "nsfw", "index$": 6 }, "stats": { "a": true, "h": "Stats", "n": "stats", "r": false, "t": "`$OBJECT`", "key$": "stats", "index$": 7 }, "tags": { "a": true, "h": "Tags", "n": "tags", "r": false, "sh": "The tags associated with the model", "t": "`$ARRAY`", "key$": "tags", "index$": 8 }, "type": { "a": true, "h": "Type", "n": "type", "r": false, "sh": "The model type", "t": "`$STRING`", "key$": "type", "index$": 9 } }, "id": { "field": "id", "name": "id" }, "name": "model", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /models", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "allow_commercial_use", "or": "allow_commercial_use", "r": false, "t": "`$BOOLEAN`", "index$": 0 }, { "a": true, "k": "query", "n": "allow_derivative", "or": "allow_derivative", "r": false, "t": "`$BOOLEAN`", "index$": 1 }, { "a": true, "k": "query", "n": "allow_different_license", "or": "allow_different_license", "r": false, "t": "`$BOOLEAN`", "index$": 2 }, { "a": true, "k": "query", "n": "allow_no_credit", "or": "allow_no_credit", "r": false, "t": "`$BOOLEAN`", "index$": 3 }, { "a": true, "k": "query", "n": "favorite", "or": "favorite", "r": false, "t": "`$BOOLEAN`", "index$": 4 }, { "a": true, "k": "query", "n": "hidden", "or": "hidden", "r": false, "t": "`$BOOLEAN`", "index$": 5 }, { "a": true, "ex": 100, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 6 }, { "a": true, "k": "query", "n": "nsfw", "or": "nsfw", "r": false, "t": "`$BOOLEAN`", "index$": 7 }, { "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 8 }, { "a": true, "k": "query", "n": "period", "or": "period", "r": false, "t": "`$STRING`", "index$": 9 }, { "a": true, "k": "query", "n": "primary_file_only", "or": "primary_file_only", "r": false, "t": "`$BOOLEAN`", "index$": 10 }, { "a": true, "k": "query", "n": "query", "or": "query", "r": false, "t": "`$STRING`", "index$": 11 }, { "a": true, "k": "query", "n": "rating", "or": "rating", "r": false, "t": "`$NUMBER`", "index$": 12 }, { "a": true, "k": "query", "n": "sort", "or": "sort", "r": false, "t": "`$STRING`", "index$": 13 }, { "a": true, "k": "query", "n": "supports_generation", "or": "supports_generation", "r": false, "t": "`$BOOLEAN`", "index$": 14 }, { "a": true, "k": "query", "n": "tag", "or": "tag", "r": false, "t": "`$STRING`", "index$": 15 }, { "a": true, "k": "query", "n": "type", "or": "type", "r": false, "t": "`$ARRAY`", "index$": 16 }, { "a": true, "k": "query", "n": "username", "or": "username", "r": false, "t": "`$STRING`", "index$": 17 }] }, "k": "http", "m": "GET", "o": "/models", "q": { "exist": ["allow_commercial_use", "allow_derivative", "allow_different_license", "allow_no_credit", "favorite", "hidden", "limit", "nsfw", "page", "period", "primary_file_only", "query", "rating", "sort", "supports_generation", "tag", "type", "username"] }, "r": {}, "s": [{ "lit": "models" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /models/{modelId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "model_id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/models/{modelId}", "q": { "exist": ["id"] }, "r": { "param": { "modelId": "id" } }, "s": [{ "lit": "models" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "model", "name__orig": "model", "Name": "Model", "name_": "model", "name-": "model", "NAME": "MODEL", "index$": 2 }, { "active": true, "entity": "model", "key$": "BasicModelFlow", "kind": "basic", "name": "BasicModelFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "model_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "model_ref01", "srcdatavar": "model_ref01_data", "suffix": "_dt0" }, "m": { "id": "model01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-model_ref01" } }], "index$": 1 }] }, 'Model', { "GET /models": { "protocol": "http", "operationId": "getModels", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "items": { "items": { "properties": { "creator": { "properties": { "image": { "description": "The url of the creators avatar", "nullable": true, "type": "string" }, "username": { "description": "The name of the creator", "type": "string" } }, "type": "object", "key$": "creator" }, "description": { "description": "The description of the model (HTML)", "type": "string", "key$": "description" }, "id": { "description": "The identifier for the model", "type": "integer", "key$": "id" }, "mode": { "description": "The mode in which the model is currently on. If Archived, files field will be empty. If TakenDown, images field will be empty", "enum": ["Archived", "TakenDown"], "nullable": true, "type": "string", "key$": "mode" }, "modelVersions": { "items": { "properties": { "createdAt": { "description": "The date in which the version was created", "format": "date-time", "type": "string" }, "description": { "description": "The description of the model version (usually a changelog)", "type": "string" }, "downloadUrl": { "description": "The download url to get the model file for this specific version", "type": "string" }, "files": { "items": { "properties": { "metadata": { "properties": { "format": { "description": "The specified model format for the file", "enum": ["SafeTensor", "PickleTensor", "Other"], "type": "string" }, "fp": { "description": "The specified floating point for the file", "enum": ["fp16", "fp32"], "type": "string" }, "size": { "description": "The specified model size for the file", "enum": ["full", "pruned"], "type": "string" } }, "type": "object" }, "pickleScanResult": { "description": "Status of the pickle scan", "enum": ["Pending", "Success", "Danger", "Error"], "type": "string" }, "primary": { "description": "If the file is the primary file for the model version", "type": "boolean" }, "scannedAt": { "description": "The date in which the file was scanned", "format": "date-time", "nullable": true, "type": "string" }, "sizeKb": { "description": "The size of the model file in KB", "type": "number" }, "virusScanResult": { "description": "Status of the virus scan", "enum": ["Pending", "Success", "Danger", "Error"], "type": "string" } }, "type": "object" }, "type": "array" }, "id": { "description": "The identifier for the model version", "type": "integer" }, "images": { "items": { "properties": { "hash": { "description": "The blurhash of the image", "type": "string" }, "height": { "description": "The original height of the image", "type": "integer" }, "id": { "description": "The id for the image", "type": "string" }, "meta": { "additionalProperties": true, "description": "The generation params of the image", "nullable": true, "type": "object" }, "nsfw": { "description": "Whether or not the image is NSFW", "type": "string" }, "url": { "description": "The url for the image", "type": "string" }, "width": { "description": "The original width of the image", "type": "integer" } }, "type": "object" }, "type": "array" }, "name": { "description": "The name of the model version", "type": "string" }, "stats": { "properties": { "downloadCount": { "description": "The number of downloads the model version has", "type": "integer" }, "rating": { "description": "The average rating of the model version", "type": "number" }, "ratingCount": { "description": "The number of ratings the model version has", "type": "integer" } }, "type": "object" }, "trainedWords": { "description": "The words used to trigger the model", "items": { "type": "string" }, "type": "array" } }, "type": "object", "x-ref": "#/components/schemas/ModelVersion" }, "type": "array", "key$": "modelVersions" }, "name": { "description": "The name of the model", "type": "string", "key$": "name" }, "nsfw": { "description": "Whether the model is NSFW or not", "type": "boolean", "key$": "nsfw" }, "stats": { "properties": { "commentCount": { "description": "The number of comments the model has", "type": "integer" }, "downloadCount": { "description": "The number of downloads the model has", "type": "integer" }, "favoriteCount": { "description": "The number of favorites the model has", "type": "integer" }, "rating": { "description": "The average rating of the model", "type": "number" }, "ratingCount": { "description": "The number of ratings the model has", "type": "integer" } }, "type": "object", "key$": "stats" }, "tags": { "description": "The tags associated with the model", "items": { "type": "string" }, "type": "array", "key$": "tags" }, "type": { "description": "The model type", "enum": ["Checkpoint", "TextualInversion", "Hypernetwork", "AestheticGradient", "LORA", "Controlnet", "Poses"], "type": "string", "key$": "type" } }, "type": "object", "x-ref": "#/components/schemas/Model", "index$": 0 }, "key$": "items", "type": "array" }, "metadata": { "key$": "metadata", "properties": { "currentPage": { "description": "The current page you are at", "type": "integer" }, "nextPage": { "description": "The url to get the next batch of items", "nullable": true, "type": "string" }, "pageSize": { "description": "The size of the batch", "type": "integer" }, "prevPage": { "description": "The url to get the previous batch of items", "nullable": true, "type": "string" }, "totalItems": { "description": "The total number of items available", "type": "integer" }, "totalPages": { "description": "The total number of pages", "type": "integer" } }, "type": "object", "x-ref": "#/components/schemas/PaginationMetadata" } } } } } } }, "parameters": [{ "name": "limit", "in": "query", "description": "The number of results to be returned per page. This can be a number between 1 and 100. By default, each page will return 100 results", "required": false, "schema": { "type": "integer", "minimum": 1, "maximum": 100, "default": 100 }, "index$": 0 }, { "name": "page", "in": "query", "description": "The page from which to start fetching models", "required": false, "schema": { "type": "integer", "minimum": 1, "default": 1 }, "index$": 1 }, { "name": "query", "in": "query", "description": "Search query to filter models by name", "required": false, "schema": { "type": "string" }, "index$": 2 }, { "name": "tag", "in": "query", "description": "Search query to filter models by tag", "required": false, "schema": { "type": "string" }, "index$": 3 }, { "name": "username", "in": "query", "description": "Search query to filter models by user", "required": false, "schema": { "type": "string" }, "index$": 4 }, { "name": "types", "in": "query", "description": "The type of model you want to filter with. If none is specified, it will return all types", "required": false, "schema": { "type": "array", "items": { "type": "string", "enum": ["Checkpoint", "TextualInversion", "Hypernetwork", "AestheticGradient", "LORA", "Controlnet", "Poses"] } }, "index$": 5 }, { "name": "sort", "in": "query", "description": "The order in which you wish to sort the results", "required": false, "schema": { "type": "string", "enum": ["Highest Rated", "Most Downloaded", "Newest"] }, "index$": 6 }, { "name": "period", "in": "query", "description": "The time frame in which the models will be sorted", "required": false, "schema": { "type": "string", "enum": ["AllTime", "Year", "Month", "Week", "Day"] }, "index$": 7 }, { "name": "rating", "in": "query", "description": "The rating you wish to filter the models with. If none is specified, it will return models with any rating (Deprecated)", "required": false, "deprecated": true, "schema": { "type": "number" }, "index$": 8 }, { "name": "favorites", "in": "query", "description": "Filter to favorites of the authenticated user (this requires an API token or session cookie)", "required": false, "schema": { "type": "boolean" }, "index$": 9 }, { "name": "hidden", "in": "query", "description": "Filter to hidden models of the authenticated user (this requires an API token or session cookie)", "required": false, "schema": { "type": "boolean" }, "index$": 10 }, { "name": "primaryFileOnly", "in": "query", "description": "Only include the primary file for each model (This will use your preferred format options if you use an API token or session cookie)", "required": false, "schema": { "type": "boolean" }, "index$": 11 }, { "name": "allowNoCredit", "in": "query", "description": "Filter to models that require or don't require crediting the creator", "required": false, "schema": { "type": "boolean" }, "index$": 12 }, { "name": "allowDerivatives", "in": "query", "description": "Filter to models that allow or don't allow creating derivatives", "required": false, "schema": { "type": "boolean" }, "index$": 13 }, { "name": "allowDifferentLicenses", "in": "query", "description": "Filter to models that allow or don't allow derivatives to have a different license", "required": false, "schema": { "type": "boolean" }, "index$": 14 }, { "name": "allowCommercialUse", "in": "query", "description": "Filter to models based on their commercial permissions", "required": false, "schema": { "type": "string", "enum": ["None", "Image", "Rent", "Sell"] }, "index$": 15 }, { "name": "nsfw", "in": "query", "description": "If false, will return safer images and hide models that don't have safe images", "required": false, "schema": { "type": "boolean" }, "index$": 16 }, { "name": "supportsGeneration", "in": "query", "description": "If true, will return models that support generation", "required": false, "schema": { "type": "boolean" }, "index$": 17 }], "security": [{ "BearerAuth": [] }, { "QueryToken": [] }, {}], "securitySource": "definition", "securitySchemes": { "BearerAuth": { "type": "http", "scheme": "bearer", "description": "Use your API key as a Bearer token in the Authorization header" }, "QueryToken": { "type": "apiKey", "in": "query", "name": "token", "description": "Pass your API key as a query parameter" } } }, "GET /models/{modelId}": { "protocol": "http", "operationId": "getModelById", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "description": "The identifier for the model", "type": "integer", "key$": "id" }, "name": { "description": "The name of the model", "type": "string", "key$": "name" }, "description": { "description": "The description of the model (HTML)", "type": "string", "key$": "description" }, "type": { "description": "The model type", "enum": ["Checkpoint", "TextualInversion", "Hypernetwork", "AestheticGradient", "LORA", "Controlnet", "Poses"], "type": "string", "key$": "type" }, "nsfw": { "description": "Whether the model is NSFW or not", "type": "boolean", "key$": "nsfw" }, "tags": { "description": "The tags associated with the model", "items": { "type": "string" }, "type": "array", "key$": "tags" }, "mode": { "description": "The mode in which the model is currently on. If Archived, files field will be empty. If TakenDown, images field will be empty", "enum": ["Archived", "TakenDown"], "nullable": true, "type": "string", "key$": "mode" }, "creator": { "properties": { "image": { "description": "The url of the creators avatar", "nullable": true, "type": "string" }, "username": { "description": "The name of the creator", "type": "string" } }, "type": "object", "key$": "creator" }, "stats": { "properties": { "commentCount": { "description": "The number of comments the model has", "type": "integer" }, "downloadCount": { "description": "The number of downloads the model has", "type": "integer" }, "favoriteCount": { "description": "The number of favorites the model has", "type": "integer" }, "rating": { "description": "The average rating of the model", "type": "number" }, "ratingCount": { "description": "The number of ratings the model has", "type": "integer" } }, "type": "object", "key$": "stats" }, "modelVersions": { "items": { "properties": { "createdAt": { "description": "The date in which the version was created", "format": "date-time", "type": "string" }, "description": { "description": "The description of the model version (usually a changelog)", "type": "string" }, "downloadUrl": { "description": "The download url to get the model file for this specific version", "type": "string" }, "files": { "items": { "properties": { "metadata": { "properties": { "format": { "description": "The specified model format for the file", "enum": ["SafeTensor", "PickleTensor", "Other"], "type": "string" }, "fp": { "description": "The specified floating point for the file", "enum": ["fp16", "fp32"], "type": "string" }, "size": { "description": "The specified model size for the file", "enum": ["full", "pruned"], "type": "string" } }, "type": "object" }, "pickleScanResult": { "description": "Status of the pickle scan", "enum": ["Pending", "Success", "Danger", "Error"], "type": "string" }, "primary": { "description": "If the file is the primary file for the model version", "type": "boolean" }, "scannedAt": { "description": "The date in which the file was scanned", "format": "date-time", "nullable": true, "type": "string" }, "sizeKb": { "description": "The size of the model file in KB", "type": "number" }, "virusScanResult": { "description": "Status of the virus scan", "enum": ["Pending", "Success", "Danger", "Error"], "type": "string" } }, "type": "object" }, "type": "array" }, "id": { "description": "The identifier for the model version", "type": "integer" }, "images": { "items": { "properties": { "hash": { "description": "The blurhash of the image", "type": "string" }, "height": { "description": "The original height of the image", "type": "integer" }, "id": { "description": "The id for the image", "type": "string" }, "meta": { "additionalProperties": true, "description": "The generation params of the image", "nullable": true, "type": "object" }, "nsfw": { "description": "Whether or not the image is NSFW", "type": "string" }, "url": { "description": "The url for the image", "type": "string" }, "width": { "description": "The original width of the image", "type": "integer" } }, "type": "object" }, "type": "array" }, "name": { "description": "The name of the model version", "type": "string" }, "stats": { "properties": { "downloadCount": { "description": "The number of downloads the model version has", "type": "integer" }, "rating": { "description": "The average rating of the model version", "type": "number" }, "ratingCount": { "description": "The number of ratings the model version has", "type": "integer" } }, "type": "object" }, "trainedWords": { "description": "The words used to trigger the model", "items": { "type": "string" }, "type": "array" } }, "type": "object", "x-ref": "#/components/schemas/ModelVersion" }, "type": "array", "key$": "modelVersions" } }, "x-ref": "#/components/schemas/Model", "index$": 0 } } } }, "404": { "description": "Model not found" } }, "parameters": [{ "name": "modelId", "in": "path", "description": "The ID of the model to retrieve", "required": true, "schema": { "type": "integer" }, "index$": 0 }], "security": [{ "BearerAuth": [] }, { "QueryToken": [] }, {}], "securitySource": "definition", "securitySchemes": { "BearerAuth": { "type": "http", "scheme": "bearer", "description": "Use your API key as a Bearer token in the Authorization header" }, "QueryToken": { "type": "apiKey", "in": "query", "name": "token", "description": "Pass your API key as a query parameter" } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let model_ref01_data = Object.values(setup.data.existing.model)[0];
        // LIST
        const model_ref01_ent = client.Model();
        const model_ref01_match = {};
        const model_ref01_list = (await model_ref01_ent.list(model_ref01_match)).map((e) => e.data());
        // LOAD
        const model_ref01_match_dt0 = {};
        model_ref01_match_dt0.id = model_ref01_data.id;
        const model_ref01_data_dt0 = (await model_ref01_ent.load(model_ref01_match_dt0)).data();
        (0, node_assert_1.default)(model_ref01_data_dt0.id === model_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/model/ModelTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CivitaiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['model01', 'model02', 'model03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CIVITAI_TEST_MODEL_ENTID': idmap,
        'CIVITAI_TEST_LIVE': 'FALSE',
        'CIVITAI_TEST_EXPLAIN': 'FALSE',
        'CIVITAI_APIKEY': '',
    });
    idmap = env['CIVITAI_TEST_MODEL_ENTID'];
    const live = 'TRUE' === env.CIVITAI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CIVITAI_TEST_MODEL_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.CivitaiSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.CIVITAI_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.CIVITAI_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=ModelEntity.test.js.map