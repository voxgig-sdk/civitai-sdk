

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { CivitaiSDK, BaseFeature, stdutil } from '../../..'

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


describe('TagEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CIVITAI_TEST_LIVE=TRUE.
  afterEach(liveDelay('CIVITAI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CivitaiSDK.test()
    const ent = testsdk.Tag()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CIVITAI_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'tag.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"link":{"a":true,"h":"Link","n":"link","r":false,"t":"`$STRING`","key$":"link","index$":0},"modelCount":{"a":true,"h":"Model Count","n":"modelCount","r":false,"t":"`$INTEGER`","key$":"modelCount","index$":1},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":2}},"name":"tag","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /tags","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":20,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"query","or":"query","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/tags","q":{"exist":["limit","page","query"]},"r":{},"s":[{"lit":"tags"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"tag","name__orig":"tag","Name":"Tag","name_":"tag","name-":"tag","NAME":"TAG","index$":4}, {"active":true,"entity":"tag","key$":"BasicTagFlow","kind":"basic","name":"BasicTagFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"tag_ref01"}}],"index$":0}]}, 'Tag', {"GET /tags":{"protocol":"http","operationId":"getTags","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"items":{"items":{"properties":{"link":{"type":"string","key$":"link"},"modelCount":{"type":"integer","key$":"modelCount"},"name":{"type":"string","key$":"name"}},"type":"object","index$":0},"key$":"items","type":"array"},"metadata":{"key$":"metadata","properties":{"currentPage":{"description":"The current page you are at","type":"integer"},"nextPage":{"description":"The url to get the next batch of items","nullable":true,"type":"string"},"pageSize":{"description":"The size of the batch","type":"integer"},"prevPage":{"description":"The url to get the previous batch of items","nullable":true,"type":"string"},"totalItems":{"description":"The total number of items available","type":"integer"},"totalPages":{"description":"The total number of pages","type":"integer"}},"type":"object","x-ref":"#/components/schemas/PaginationMetadata"}}}}}}},"parameters":[{"name":"limit","in":"query","description":"The number of results to be returned per page","required":false,"schema":{"type":"integer","minimum":1,"maximum":200,"default":20},"index$":0},{"name":"page","in":"query","description":"The page from which to start fetching tags","required":false,"schema":{"type":"integer","minimum":1,"default":1},"index$":1},{"name":"query","in":"query","description":"Search query to filter tags","required":false,"schema":{"type":"string"},"index$":2}],"security":[{"BearerAuth":[]},{"QueryToken":[]},{}],"securitySource":"definition","securitySchemes":{"BearerAuth":{"type":"http","scheme":"bearer","description":"Use your API key as a Bearer token in the Authorization header"},"QueryToken":{"type":"apiKey","in":"query","name":"token","description":"Pass your API key as a query parameter"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let tag_ref01_data = Object.values(setup.data.existing.tag)[0] as any

    // LIST
    const tag_ref01_ent = client.Tag()
    const tag_ref01_match: any = {}

    const tag_ref01_list = (await tag_ref01_ent.list(tag_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/tag/TagTestData.json')

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
    ['tag01','tag02','tag03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CIVITAI_TEST_TAG_ENTID': idmap,
    'CIVITAI_TEST_LIVE': 'FALSE',
    'CIVITAI_TEST_EXPLAIN': 'FALSE',
    'CIVITAI_APIKEY': '',
  })

  idmap = env['CIVITAI_TEST_TAG_ENTID']

  const live = 'TRUE' === env.CIVITAI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CIVITAI_TEST_TAG_ENTID']
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
  
