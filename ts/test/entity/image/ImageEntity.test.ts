

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


describe('ImageEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CIVITAI_TEST_LIVE=TRUE.
  afterEach(liveDelay('CIVITAI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CivitaiSDK.test()
    const ent = testsdk.Image()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('image hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of CivitaiSDK.test(offline).Image().stream('list')) { }
    }, /offline/)

    for await (const _item of CivitaiSDK.test(offline).Image()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = CivitaiSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Image().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of CivitaiSDK.test().Image().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new CivitaiSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Image().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Image().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = CivitaiSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Image().list({"limit":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CIVITAI_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'image.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"createdAt":{"a":true,"fo":"date-time","h":"Created At","n":"createdAt","r":false,"sh":"The date the image was posted","t":"`$STRING`","key$":"createdAt","index$":0},"hash":{"a":true,"h":"Hash","n":"hash","r":false,"sh":"The blurhash of the image","t":"`$STRING`","key$":"hash","index$":1},"height":{"a":true,"h":"Height","n":"height","r":false,"sh":"The height of the image","t":"`$INTEGER`","key$":"height","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"The id of the image","t":"`$INTEGER`","key$":"id","index$":3},"meta":{"a":true,"h":"Meta","n":"meta","r":false,"sh":"The generation parameters parsed or input for the image","t":"`$OBJECT`","key$":"meta","index$":4},"nsfw":{"a":true,"h":"Nsfw","n":"nsfw","r":false,"sh":"If the image has any mature content labels","t":"`$BOOLEAN`","key$":"nsfw","index$":5},"nsfwLevel":{"a":true,"h":"Nsfw Level","n":"nsfwLevel","r":false,"sh":"The NSFW level of the image","t":"`$STRING`","key$":"nsfwLevel","index$":6},"postId":{"a":true,"h":"Post Id","n":"postId","r":false,"sh":"The ID of the post the image belongs to","t":"`$INTEGER`","key$":"postId","index$":7},"stats":{"a":true,"h":"Stats","n":"stats","r":false,"t":"`$OBJECT`","key$":"stats","index$":8},"url":{"a":true,"h":"Url","n":"url","r":false,"sh":"The url of the image at its source resolution","t":"`$STRING`","key$":"url","index$":9},"username":{"a":true,"h":"Username","n":"username","r":false,"sh":"The username of the creator","t":"`$STRING`","key$":"username","index$":10},"width":{"a":true,"h":"Width","n":"width","r":false,"sh":"The width of the image","t":"`$INTEGER`","key$":"width","index$":11}},"id":{"field":"id","name":"id"},"name":"image","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /images","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":100,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"model_id","or":"modelId","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"model_version_id","or":"modelVersionId","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"k":"query","n":"nsfw","or":"nsfw","r":false,"t":"`$ANY`","index$":3},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":4},{"a":true,"k":"query","n":"period","or":"period","r":false,"t":"`$STRING`","index$":5},{"a":true,"k":"query","n":"post_id","or":"postId","r":false,"t":"`$INTEGER`","index$":6},{"a":true,"k":"query","n":"sort","or":"sort","r":false,"t":"`$STRING`","index$":7},{"a":true,"k":"query","n":"username","or":"username","r":false,"t":"`$STRING`","index$":8}]},"k":"http","m":"GET","o":"/images","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"images"}],"t":{"req":"`reqdata`","res":"`body.items`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"image","name__orig":"image","Name":"Image","name_":"image","name-":"image","NAME":"IMAGE","index$":1}, {"active":true,"entity":"image","key$":"BasicImageFlow","kind":"basic","name":"BasicImageFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"image_ref01"}}],"index$":0}]}, 'Image', {"GET /images":{"protocol":"http","parameters":[{"name":"limit","in":"query","description":"The number of results to be returned per page. This can be a number between 0 and 200. By default, each page will return 100 results.","required":false,"schema":{"type":"integer","minimum":0,"maximum":200,"default":100},"index$":0},{"name":"postId","in":"query","description":"The ID of a post to get images from","required":false,"schema":{"type":"integer"},"index$":1},{"name":"modelId","in":"query","description":"The ID of a model to get images from (model gallery)","required":false,"schema":{"type":"integer"},"index$":2},{"name":"modelVersionId","in":"query","description":"The ID of a model version to get images from (model gallery filtered to version)","required":false,"schema":{"type":"integer"},"index$":3},{"name":"username","in":"query","description":"Filter to images from a specific user","required":false,"schema":{"type":"string"},"index$":4},{"name":"nsfw","in":"query","description":"Filter to images that contain mature content flags or not (undefined returns all)","required":false,"schema":{"oneOf":[{"type":"boolean"},{"type":"string","enum":["None","Soft","Mature","X"]}]},"index$":5},{"name":"sort","in":"query","description":"The order in which you wish to sort the results","required":false,"schema":{"type":"string","enum":["Most Reactions","Most Comments","Newest"]},"index$":6},{"name":"period","in":"query","description":"The time frame in which the images will be sorted","required":false,"schema":{"type":"string","enum":["AllTime","Year","Month","Week","Day"]},"index$":7},{"name":"page","in":"query","description":"The page from which to start fetching creators","required":false,"schema":{"type":"integer","minimum":1,"default":1},"index$":8}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let image_ref01_data = Object.values(setup.data.existing.image)[0] as any

    // LIST
    const image_ref01_ent = client.Image()
    const image_ref01_match: any = {}

    const image_ref01_list = (await image_ref01_ent.list(image_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/image/ImageTestData.json')

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
    ['image01','image02','image03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CIVITAI_TEST_IMAGE_ENTID': idmap,
    'CIVITAI_TEST_LIVE': 'FALSE',
    'CIVITAI_TEST_EXPLAIN': 'FALSE',
    'CIVITAI_APIKEY': '',
  })

  idmap = env['CIVITAI_TEST_IMAGE_ENTID']

  const live = 'TRUE' === env.CIVITAI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CIVITAI_TEST_IMAGE_ENTID']
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
  
