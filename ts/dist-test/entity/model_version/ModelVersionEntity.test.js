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
(0, node_test_1.describe)('ModelVersionEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CIVITAI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CIVITAI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CivitaiSDK.test();
        const ent = testsdk.ModelVersion();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.CivitaiSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ModelVersion().load({ "id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CIVITAI_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'model_version.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "createdAt": { "a": true, "fo": "date-time", "h": "Created At", "n": "createdAt", "r": false, "sh": "The date in which the version was created", "t": "`$STRING`", "key$": "createdAt", "index$": 0 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "The description of the model version (usually a changelog)", "t": "`$STRING`", "key$": "description", "index$": 1 }, "downloadUrl": { "a": true, "h": "Download Url", "n": "downloadUrl", "r": false, "sh": "The download url to get the model file for this specific version", "t": "`$STRING`", "key$": "downloadUrl", "index$": 2 }, "files": { "a": true, "h": "Files", "n": "files", "r": false, "t": "`$ARRAY`", "key$": "files", "index$": 3 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "The identifier for the model version", "t": "`$INTEGER`", "key$": "id", "index$": 4 }, "images": { "a": true, "h": "Images", "n": "images", "r": false, "t": "`$ARRAY`", "key$": "images", "index$": 5 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "The name of the model version", "t": "`$STRING`", "key$": "name", "index$": 6 }, "stats": { "a": true, "h": "Stats", "n": "stats", "r": false, "t": "`$OBJECT`", "key$": "stats", "index$": 7 }, "trainedWords": { "a": true, "h": "Trained Words", "n": "trainedWords", "r": false, "sh": "The words used to trigger the model", "t": "`$ARRAY`", "key$": "trainedWords", "index$": 8 } }, "id": { "field": "id", "name": "id" }, "name": "model_version", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /model-versions/by-hash/{hash}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "67AB2FD8EC439A89B3FEDB15CC65F54336AF163C7EB5E4F2ACC98F090A29B0B3", "k": "param", "n": "hash", "or": "hash", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/model-versions/by-hash/{hash}", "q": { "exist": ["hash"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "model-versions" }, { "lit": "by-hash" }, { "var": "hash" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /model-versions/{modelVersionId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": 290640, "k": "param", "n": "id", "or": "modelVersionId", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/model-versions/{modelVersionId}", "q": { "exist": ["id"] }, "r": { "param": { "modelVersionId": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "model-versions" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "model_version", "name__orig": "model_version", "Name": "ModelVersion", "name_": "model_version", "name-": "model-version", "NAME": "MODEL_VERSION", "index$": 3 }, { "active": true, "entity": "model_version", "key$": "BasicModelVersionFlow", "kind": "basic", "name": "BasicModelVersionFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "model_version_ref01", "srcdatavar": "model_version_ref01_data", "suffix": "_dt0" }, "m": { "id": "model_version01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-model_version_ref01" } }], "index$": 0, "route": "GET /model-versions/{modelVersionId}", "record": {} }] }, 'ModelVersion', { "GET /model-versions/by-hash/{hash}": { "protocol": "http", "parameters": [{ "name": "hash", "in": "path", "description": "The hash of the model version to retrieve", "required": true, "schema": { "type": "string" }, "example": "67AB2FD8EC439A89B3FEDB15CC65F54336AF163C7EB5E4F2ACC98F090A29B0B3", "index$": 0 }] }, "GET /model-versions/{modelVersionId}": { "protocol": "http", "parameters": [{ "name": "modelVersionId", "in": "path", "description": "The ID of the model version to retrieve", "required": true, "schema": { "type": "integer" }, "example": 290640, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let model_version_ref01_data = Object.values(setup.data.existing.model_version)[0];
        // LOAD
        const model_version_ref01_ent = client.ModelVersion();
        const model_version_ref01_match_dt0 = {};
        model_version_ref01_match_dt0.id = model_version_ref01_data.id;
        const model_version_ref01_data_dt0 = (await model_version_ref01_ent.load(model_version_ref01_match_dt0)).data();
        (0, node_assert_1.default)(model_version_ref01_data_dt0.id === model_version_ref01_data.id);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/model_version/ModelVersionTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CivitaiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['model_version01', 'model_version02', 'model_version03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CIVITAI_TEST_MODEL_VERSION_ENTID': idmap,
        'CIVITAI_TEST_LIVE': 'FALSE',
        'CIVITAI_TEST_EXPLAIN': 'FALSE',
        'CIVITAI_APIKEY': '',
    });
    idmap = env['CIVITAI_TEST_MODEL_VERSION_ENTID'];
    const live = 'TRUE' === env.CIVITAI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CIVITAI_TEST_MODEL_VERSION_ENTID'];
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
//# sourceMappingURL=ModelVersionEntity.test.js.map