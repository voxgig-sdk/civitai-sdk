

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { CivitaiSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('ModelEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CIVITAI_TEST_LIVE=TRUE.
  afterEach(liveDelay('CIVITAI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CivitaiSDK.test()
    const ent = testsdk.Model()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('model hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of CivitaiSDK.test(offline).Model().stream('list')) { }
    }, /offline/)

    for await (const _item of CivitaiSDK.test(offline).Model()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = CivitaiSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Model().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of CivitaiSDK.test().Model().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new CivitaiSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Model().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Model().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = CivitaiSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Model().list({"allow_commercial_use":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CIVITAI_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'model.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"creator":{"a":true,"h":"Creator","n":"creator","r":false,"t":"`$OBJECT`","key$":"creator","index$":0},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"The description of the model (HTML)","t":"`$STRING`","key$":"description","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"The identifier for the model","t":"`$INTEGER`","key$":"id","index$":2},"mode":{"a":true,"h":"Mode","n":"mode","r":false,"sh":"The mode in which the model is currently on.","t":"`$STRING`","key$":"mode","index$":3},"modelVersions":{"a":true,"h":"Model Versions","n":"modelVersions","r":false,"t":"`$ARRAY`","key$":"modelVersions","index$":4},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"The name of the model","t":"`$STRING`","key$":"name","index$":5},"nsfw":{"a":true,"h":"Nsfw","n":"nsfw","r":false,"sh":"Whether the model is NSFW or not","t":"`$BOOLEAN`","key$":"nsfw","index$":6},"stats":{"a":true,"h":"Stats","n":"stats","r":false,"t":"`$OBJECT`","key$":"stats","index$":7},"tags":{"a":true,"h":"Tags","n":"tags","r":false,"sh":"The tags associated with the model","t":"`$ARRAY`","key$":"tags","index$":8},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"The model type","t":"`$STRING`","key$":"type","index$":9}},"id":{"field":"id","name":"id"},"name":"model","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /models","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"allow_commercial_use","or":"allowCommercialUse","r":false,"t":"`$BOOLEAN`","index$":0},{"a":true,"k":"query","n":"allow_derivative","or":"allowDerivatives","r":false,"t":"`$BOOLEAN`","index$":1},{"a":true,"k":"query","n":"allow_different_license","or":"allowDifferentLicenses","r":false,"t":"`$BOOLEAN`","index$":2},{"a":true,"k":"query","n":"allow_no_credit","or":"allowNoCredit","r":false,"t":"`$BOOLEAN`","index$":3},{"a":true,"k":"query","n":"favorite","or":"favorites","r":false,"t":"`$BOOLEAN`","index$":4},{"a":true,"k":"query","n":"hidden","or":"hidden","r":false,"t":"`$BOOLEAN`","index$":5},{"a":true,"ex":100,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":6},{"a":true,"k":"query","n":"nsfw","or":"nsfw","r":false,"t":"`$BOOLEAN`","index$":7},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":8},{"a":true,"k":"query","n":"period","or":"period","r":false,"t":"`$STRING`","index$":9},{"a":true,"k":"query","n":"primary_file_only","or":"primaryFileOnly","r":false,"t":"`$BOOLEAN`","index$":10},{"a":true,"k":"query","n":"query","or":"query","r":false,"t":"`$STRING`","index$":11},{"a":true,"k":"query","n":"rating","or":"rating","r":false,"t":"`$NUMBER`","index$":12},{"a":true,"k":"query","n":"sort","or":"sort","r":false,"t":"`$STRING`","index$":13},{"a":true,"k":"query","n":"supports_generation","or":"supportsGeneration","r":false,"t":"`$BOOLEAN`","index$":14},{"a":true,"k":"query","n":"tag","or":"tag","r":false,"t":"`$STRING`","index$":15},{"a":true,"k":"query","n":"type","or":"types","r":false,"t":"`$ARRAY`","index$":16},{"a":true,"k":"query","n":"username","or":"username","r":false,"t":"`$STRING`","index$":17}]},"k":"http","m":"GET","o":"/models","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"models"}],"t":{"req":"`reqdata`","res":"`body.items`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /models/{modelId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":257749,"k":"param","n":"id","or":"modelId","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/models/{modelId}","q":{"exist":["id"]},"r":{"param":{"modelId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"models"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"model","name__orig":"model","Name":"Model","name_":"model","name-":"model","NAME":"MODEL","index$":2}, {"active":true,"entity":"model","key$":"BasicModelFlow","kind":"basic","name":"BasicModelFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"model_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"model_ref01","srcdatavar":"model_ref01_data","suffix":"_dt0"},"m":{"id":"model01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-model_ref01"}}],"index$":1,"route":"GET /models/{modelId}","record":{}}]}, 'Model', {"GET /models":{"protocol":"http","parameters":[{"name":"limit","in":"query","description":"The number of results to be returned per page. This can be a number between 1 and 100. By default, each page will return 100 results","required":false,"schema":{"type":"integer","minimum":1,"maximum":100,"default":100},"index$":0},{"name":"page","in":"query","description":"The page from which to start fetching models","required":false,"schema":{"type":"integer","minimum":1,"default":1},"index$":1},{"name":"query","in":"query","description":"Search query to filter models by name","required":false,"schema":{"type":"string"},"index$":2},{"name":"tag","in":"query","description":"Search query to filter models by tag","required":false,"schema":{"type":"string"},"index$":3},{"name":"username","in":"query","description":"Search query to filter models by user","required":false,"schema":{"type":"string"},"index$":4},{"name":"types","in":"query","description":"The type of model you want to filter with. If none is specified, it will return all types","required":false,"schema":{"type":"array","items":{"type":"string","enum":["Checkpoint","TextualInversion","Hypernetwork","AestheticGradient","LORA","Controlnet","Poses"]}},"index$":5},{"name":"sort","in":"query","description":"The order in which you wish to sort the results","required":false,"schema":{"type":"string","enum":["Highest Rated","Most Downloaded","Newest"]},"index$":6},{"name":"period","in":"query","description":"The time frame in which the models will be sorted","required":false,"schema":{"type":"string","enum":["AllTime","Year","Month","Week","Day"]},"index$":7},{"name":"rating","in":"query","description":"The rating you wish to filter the models with. If none is specified, it will return models with any rating (Deprecated)","required":false,"deprecated":true,"schema":{"type":"number"},"index$":8},{"name":"favorites","in":"query","description":"Filter to favorites of the authenticated user (this requires an API token or session cookie)","required":false,"schema":{"type":"boolean"},"index$":9},{"name":"hidden","in":"query","description":"Filter to hidden models of the authenticated user (this requires an API token or session cookie)","required":false,"schema":{"type":"boolean"},"index$":10},{"name":"primaryFileOnly","in":"query","description":"Only include the primary file for each model (This will use your preferred format options if you use an API token or session cookie)","required":false,"schema":{"type":"boolean"},"index$":11},{"name":"allowNoCredit","in":"query","description":"Filter to models that require or don't require crediting the creator","required":false,"schema":{"type":"boolean"},"index$":12},{"name":"allowDerivatives","in":"query","description":"Filter to models that allow or don't allow creating derivatives","required":false,"schema":{"type":"boolean"},"index$":13},{"name":"allowDifferentLicenses","in":"query","description":"Filter to models that allow or don't allow derivatives to have a different license","required":false,"schema":{"type":"boolean"},"index$":14},{"name":"allowCommercialUse","in":"query","description":"Filter to models based on their commercial permissions","required":false,"schema":{"type":"string","enum":["None","Image","Rent","Sell"]},"index$":15},{"name":"nsfw","in":"query","description":"If false, will return safer images and hide models that don't have safe images","required":false,"schema":{"type":"boolean"},"index$":16},{"name":"supportsGeneration","in":"query","description":"If true, will return models that support generation","required":false,"schema":{"type":"boolean"},"index$":17}]},"GET /models/{modelId}":{"protocol":"http","parameters":[{"name":"modelId","in":"path","description":"The ID of the model to retrieve","required":true,"schema":{"type":"integer"},"example":257749,"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let model_ref01_data = Object.values(setup.data.existing.model)[0] as any

    // LIST
    const model_ref01_ent = client.Model()
    const model_ref01_match: any = {}

    const model_ref01_list = (await model_ref01_ent.list(model_ref01_match)).map((e: any) => e.data())


    // LOAD
    const model_ref01_match_dt0: any = {}
    model_ref01_match_dt0.id = model_ref01_data.id
    const model_ref01_data_dt0 = (await model_ref01_ent.load(model_ref01_match_dt0)).data()
    assert(model_ref01_data_dt0.id === model_ref01_data.id)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/model/ModelTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = CivitaiSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['model01','model02','model03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CIVITAI_TEST_MODEL_ENTID': idmap,
    'CIVITAI_TEST_LIVE': 'FALSE',
    'CIVITAI_TEST_EXPLAIN': 'FALSE',
    'CIVITAI_APIKEY': '',
  })

  idmap = env['CIVITAI_TEST_MODEL_ENTID']

  const live = 'TRUE' === env.CIVITAI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CIVITAI_TEST_MODEL_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new CivitaiSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
