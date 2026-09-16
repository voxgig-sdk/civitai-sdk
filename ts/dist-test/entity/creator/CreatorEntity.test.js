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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('CreatorEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CIVITAI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CIVITAI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CivitaiSDK.test();
        const ent = testsdk.Creator();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CIVITAI_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'creator.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "link", "req": false, "short": "Url to get all models from this user", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "modelCount", "req": false, "short": "The amount of models linked to this user", "type": "`$INTEGER`", "index$": 1 }, { "active": true, "name": "username", "req": false, "short": "The username of the creator", "type": "`$STRING`", "index$": 2 }], "name": "creator", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": 20, "kind": "query", "name": "limit", "orig": "limit", "reqd": false, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "example": 1, "kind": "query", "name": "page", "orig": "page", "reqd": false, "type": "`$INTEGER`", "index$": 1 }, { "active": true, "kind": "query", "name": "query", "orig": "query", "reqd": false, "type": "`$STRING`", "index$": 2 }] }, "contract": { "id": "GET /creators", "json": "{\"operationId\":\"getCreators\",\"parameters\":[{\"description\":\"The number of results to be returned per page. This can be a number between 0 and 200. By default, each page will return 20 results. If set to 0, it'll return all the creators\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":20,\"maximum\":200,\"minimum\":0,\"type\":\"integer\"}},{\"description\":\"The page from which to start fetching creators\",\"in\":\"query\",\"name\":\"page\",\"required\":false,\"schema\":{\"default\":1,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Search query to filter creators by username\",\"in\":\"query\",\"name\":\"query\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"items\":{\"items\":{\"properties\":{\"link\":{\"description\":\"Url to get all models from this user\",\"type\":\"string\"},\"modelCount\":{\"description\":\"The amount of models linked to this user\",\"type\":\"integer\"},\"username\":{\"description\":\"The username of the creator\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"metadata\":{\"properties\":{\"currentPage\":{\"description\":\"The current page you are at\",\"type\":\"integer\"},\"nextPage\":{\"description\":\"The url to get the next batch of items\",\"nullable\":true,\"type\":\"string\"},\"pageSize\":{\"description\":\"The size of the batch\",\"type\":\"integer\"},\"prevPage\":{\"description\":\"The url to get the previous batch of items\",\"nullable\":true,\"type\":\"string\"},\"totalItems\":{\"description\":\"The total number of items available\",\"type\":\"integer\"},\"totalPages\":{\"description\":\"The total number of pages\",\"type\":\"integer\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"security\":[{\"BearerAuth\":[]},{\"QueryToken\":[]},{}],\"securitySchemes\":{\"BearerAuth\":{\"description\":\"Use your API key as a Bearer token in the Authorization header\",\"scheme\":\"bearer\",\"type\":\"http\"},\"QueryToken\":{\"description\":\"Pass your API key as a query parameter\",\"in\":\"query\",\"name\":\"token\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/creators", "segments": [{ "lit": "creators" }], "select": { "exist": ["limit", "page", "query"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "creator", "name__orig": "creator", "Name": "Creator", "name_": "creator", "name-": "creator", "NAME": "CREATOR", "index$": 0 }, { "active": true, "entity": "creator", "key$": "BasicCreatorFlow", "kind": "basic", "name": "BasicCreatorFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "creator_ref01" } }], "index$": 0 }] }, 'Creator');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let creator_ref01_data = Object.values(setup.data.existing.creator)[0];
        // LIST
        const creator_ref01_ent = client.Creator();
        const creator_ref01_match = {};
        const creator_ref01_list = (await creator_ref01_ent.list(creator_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/creator/CreatorTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CivitaiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['creator01', 'creator02', 'creator03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CIVITAI_TEST_CREATOR_ENTID': idmap,
        'CIVITAI_TEST_LIVE': 'FALSE',
        'CIVITAI_TEST_EXPLAIN': 'FALSE',
        'CIVITAI_APIKEY': '',
    });
    idmap = env['CIVITAI_TEST_CREATOR_ENTID'];
    const live = 'TRUE' === env.CIVITAI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CIVITAI_TEST_CREATOR_ENTID'];
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
//# sourceMappingURL=CreatorEntity.test.js.map