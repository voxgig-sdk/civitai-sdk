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
(0, node_test_1.describe)('ImageEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CIVITAI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CIVITAI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CivitaiSDK.test();
        const ent = testsdk.Image();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CIVITAI_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'image.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "createdAt": { "a": true, "fo": "date-time", "h": "Created At", "n": "createdAt", "r": false, "sh": "The date the image was posted", "t": "`$STRING`", "key$": "createdAt", "index$": 0 }, "hash": { "a": true, "h": "Hash", "n": "hash", "r": false, "sh": "The blurhash of the image", "t": "`$STRING`", "key$": "hash", "index$": 1 }, "height": { "a": true, "h": "Height", "n": "height", "r": false, "sh": "The height of the image", "t": "`$INTEGER`", "key$": "height", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "The id of the image", "t": "`$INTEGER`", "key$": "id", "index$": 3 }, "meta": { "a": true, "h": "Meta", "n": "meta", "r": false, "sh": "The generation parameters parsed or input for the image", "t": "`$OBJECT`", "key$": "meta", "index$": 4 }, "nsfw": { "a": true, "h": "Nsfw", "n": "nsfw", "r": false, "sh": "If the image has any mature content labels", "t": "`$BOOLEAN`", "key$": "nsfw", "index$": 5 }, "nsfwLevel": { "a": true, "h": "Nsfw Level", "n": "nsfwLevel", "r": false, "sh": "The NSFW level of the image", "t": "`$STRING`", "key$": "nsfwLevel", "index$": 6 }, "postId": { "a": true, "h": "Post Id", "n": "postId", "r": false, "sh": "The ID of the post the image belongs to", "t": "`$INTEGER`", "key$": "postId", "index$": 7 }, "stats": { "a": true, "h": "Stats", "n": "stats", "r": false, "t": "`$OBJECT`", "key$": "stats", "index$": 8 }, "url": { "a": true, "h": "Url", "n": "url", "r": false, "sh": "The url of the image at its source resolution", "t": "`$STRING`", "key$": "url", "index$": 9 }, "username": { "a": true, "h": "Username", "n": "username", "r": false, "sh": "The username of the creator", "t": "`$STRING`", "key$": "username", "index$": 10 }, "width": { "a": true, "h": "Width", "n": "width", "r": false, "sh": "The width of the image", "t": "`$INTEGER`", "key$": "width", "index$": 11 } }, "id": { "field": "id", "name": "id" }, "name": "image", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /images", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 100, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "k": "query", "n": "model_id", "or": "model_id", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "k": "query", "n": "model_version_id", "or": "model_version_id", "r": false, "t": "`$INTEGER`", "index$": 2 }, { "a": true, "k": "query", "n": "nsfw", "or": "nsfw", "r": false, "t": "`$ANY`", "index$": 3 }, { "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 4 }, { "a": true, "k": "query", "n": "period", "or": "period", "r": false, "t": "`$STRING`", "index$": 5 }, { "a": true, "k": "query", "n": "post_id", "or": "post_id", "r": false, "t": "`$INTEGER`", "index$": 6 }, { "a": true, "k": "query", "n": "sort", "or": "sort", "r": false, "t": "`$STRING`", "index$": 7 }, { "a": true, "k": "query", "n": "username", "or": "username", "r": false, "t": "`$STRING`", "index$": 8 }] }, "k": "http", "m": "GET", "o": "/images", "q": { "exist": ["limit", "model_id", "model_version_id", "nsfw", "page", "period", "post_id", "sort", "username"] }, "r": {}, "s": [{ "lit": "images" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "image", "name__orig": "image", "Name": "Image", "name_": "image", "name-": "image", "NAME": "IMAGE", "index$": 1 }, { "active": true, "entity": "image", "key$": "BasicImageFlow", "kind": "basic", "name": "BasicImageFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "image_ref01" } }], "index$": 0 }] }, 'Image', { "GET /images": { "protocol": "http", "operationId": "getImages", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "items": { "items": { "properties": { "createdAt": { "description": "The date the image was posted", "format": "date-time", "type": "string", "key$": "createdAt" }, "hash": { "description": "The blurhash of the image", "type": "string", "key$": "hash" }, "height": { "description": "The height of the image", "type": "integer", "key$": "height" }, "id": { "description": "The id of the image", "type": "integer", "key$": "id" }, "meta": { "additionalProperties": true, "description": "The generation parameters parsed or input for the image", "nullable": true, "type": "object", "key$": "meta" }, "nsfw": { "description": "If the image has any mature content labels", "type": "boolean", "key$": "nsfw" }, "nsfwLevel": { "description": "The NSFW level of the image", "enum": ["None", "Soft", "Mature", "X"], "type": "string", "key$": "nsfwLevel" }, "postId": { "description": "The ID of the post the image belongs to", "type": "integer", "key$": "postId" }, "stats": { "properties": { "commentCount": { "description": "The number of comment reactions", "type": "integer" }, "cryCount": { "description": "The number of cry reactions", "type": "integer" }, "dislikeCount": { "description": "The number of dislike reactions", "type": "integer" }, "heartCount": { "description": "The number of heart reactions", "type": "integer" }, "laughCount": { "description": "The number of laugh reactions", "type": "integer" }, "likeCount": { "description": "The number of like reactions", "type": "integer" } }, "type": "object", "key$": "stats" }, "url": { "description": "The url of the image at its source resolution", "type": "string", "key$": "url" }, "username": { "description": "The username of the creator", "type": "string", "key$": "username" }, "width": { "description": "The width of the image", "type": "integer", "key$": "width" } }, "type": "object", "x-ref": "#/components/schemas/Image", "index$": 0 }, "key$": "items", "type": "array" }, "metadata": { "key$": "metadata", "properties": { "currentPage": { "description": "The current page you are at (if paging)", "type": "integer" }, "nextCursor": { "description": "The id of the first image in the next batch", "nullable": true, "type": "integer" }, "nextPage": { "description": "The url to get the next batch of items", "nullable": true, "type": "string" }, "pageSize": { "description": "The size of the batch (if paging)", "type": "integer" } }, "type": "object", "x-ref": "#/components/schemas/CursorPaginationMetadata" } } } } } } }, "parameters": [{ "name": "limit", "in": "query", "description": "The number of results to be returned per page. This can be a number between 0 and 200. By default, each page will return 100 results.", "required": false, "schema": { "type": "integer", "minimum": 0, "maximum": 200, "default": 100 }, "index$": 0 }, { "name": "postId", "in": "query", "description": "The ID of a post to get images from", "required": false, "schema": { "type": "integer" }, "index$": 1 }, { "name": "modelId", "in": "query", "description": "The ID of a model to get images from (model gallery)", "required": false, "schema": { "type": "integer" }, "index$": 2 }, { "name": "modelVersionId", "in": "query", "description": "The ID of a model version to get images from (model gallery filtered to version)", "required": false, "schema": { "type": "integer" }, "index$": 3 }, { "name": "username", "in": "query", "description": "Filter to images from a specific user", "required": false, "schema": { "type": "string" }, "index$": 4 }, { "name": "nsfw", "in": "query", "description": "Filter to images that contain mature content flags or not (undefined returns all)", "required": false, "schema": { "oneOf": [{ "type": "boolean" }, { "type": "string", "enum": ["None", "Soft", "Mature", "X"] }] }, "index$": 5 }, { "name": "sort", "in": "query", "description": "The order in which you wish to sort the results", "required": false, "schema": { "type": "string", "enum": ["Most Reactions", "Most Comments", "Newest"] }, "index$": 6 }, { "name": "period", "in": "query", "description": "The time frame in which the images will be sorted", "required": false, "schema": { "type": "string", "enum": ["AllTime", "Year", "Month", "Week", "Day"] }, "index$": 7 }, { "name": "page", "in": "query", "description": "The page from which to start fetching creators", "required": false, "schema": { "type": "integer", "minimum": 1, "default": 1 }, "index$": 8 }], "security": [{ "BearerAuth": [] }, { "QueryToken": [] }, {}], "securitySource": "definition", "securitySchemes": { "BearerAuth": { "type": "http", "scheme": "bearer", "description": "Use your API key as a Bearer token in the Authorization header" }, "QueryToken": { "type": "apiKey", "in": "query", "name": "token", "description": "Pass your API key as a query parameter" } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let image_ref01_data = Object.values(setup.data.existing.image)[0];
        // LIST
        const image_ref01_ent = client.Image();
        const image_ref01_match = {};
        const image_ref01_list = (await image_ref01_ent.list(image_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/image/ImageTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CivitaiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['image01', 'image02', 'image03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CIVITAI_TEST_IMAGE_ENTID': idmap,
        'CIVITAI_TEST_LIVE': 'FALSE',
        'CIVITAI_TEST_EXPLAIN': 'FALSE',
        'CIVITAI_APIKEY': '',
    });
    idmap = env['CIVITAI_TEST_IMAGE_ENTID'];
    const live = 'TRUE' === env.CIVITAI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CIVITAI_TEST_IMAGE_ENTID'];
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
//# sourceMappingURL=ImageEntity.test.js.map