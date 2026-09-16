

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CIVITAI_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'image.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"date-time","name":"createdAt","req":false,"short":"The date the image was posted","type":"`$STRING`","index$":0},{"active":true,"name":"hash","req":false,"short":"The blurhash of the image","type":"`$STRING`","index$":1},{"active":true,"name":"height","req":false,"short":"The height of the image","type":"`$INTEGER`","index$":2},{"active":true,"name":"id","req":false,"short":"The id of the image","type":"`$INTEGER`","index$":3},{"active":true,"name":"meta","req":false,"short":"The generation parameters parsed or input for the image","type":"`$OBJECT`","index$":4},{"active":true,"name":"nsfw","req":false,"short":"If the image has any mature content labels","type":"`$BOOLEAN`","index$":5},{"active":true,"name":"nsfwLevel","req":false,"short":"The NSFW level of the image","type":"`$STRING`","index$":6},{"active":true,"name":"postId","req":false,"short":"The ID of the post the image belongs to","type":"`$INTEGER`","index$":7},{"active":true,"name":"stats","req":false,"type":"`$OBJECT`","index$":8},{"active":true,"name":"url","req":false,"short":"The url of the image at its source resolution","type":"`$STRING`","index$":9},{"active":true,"name":"username","req":false,"short":"The username of the creator","type":"`$STRING`","index$":10},{"active":true,"name":"width","req":false,"short":"The width of the image","type":"`$INTEGER`","index$":11}],"id":{"field":"id","name":"id"},"name":"image","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":100,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"kind":"query","name":"model_id","orig":"model_id","reqd":false,"type":"`$INTEGER`","index$":1},{"active":true,"kind":"query","name":"model_version_id","orig":"model_version_id","reqd":false,"type":"`$INTEGER`","index$":2},{"active":true,"kind":"query","name":"nsfw","orig":"nsfw","reqd":false,"type":"`$ANY`","index$":3},{"active":true,"example":1,"kind":"query","name":"page","orig":"page","reqd":false,"type":"`$INTEGER`","index$":4},{"active":true,"kind":"query","name":"period","orig":"period","reqd":false,"type":"`$STRING`","index$":5},{"active":true,"kind":"query","name":"post_id","orig":"post_id","reqd":false,"type":"`$INTEGER`","index$":6},{"active":true,"kind":"query","name":"sort","orig":"sort","reqd":false,"type":"`$STRING`","index$":7},{"active":true,"kind":"query","name":"username","orig":"username","reqd":false,"type":"`$STRING`","index$":8}]},"contract":{"id":"GET /images","json":"{\"operationId\":\"getImages\",\"parameters\":[{\"description\":\"The number of results to be returned per page. This can be a number between 0 and 200. By default, each page will return 100 results.\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":100,\"maximum\":200,\"minimum\":0,\"type\":\"integer\"}},{\"description\":\"The ID of a post to get images from\",\"in\":\"query\",\"name\":\"postId\",\"required\":false,\"schema\":{\"type\":\"integer\"}},{\"description\":\"The ID of a model to get images from (model gallery)\",\"in\":\"query\",\"name\":\"modelId\",\"required\":false,\"schema\":{\"type\":\"integer\"}},{\"description\":\"The ID of a model version to get images from (model gallery filtered to version)\",\"in\":\"query\",\"name\":\"modelVersionId\",\"required\":false,\"schema\":{\"type\":\"integer\"}},{\"description\":\"Filter to images from a specific user\",\"in\":\"query\",\"name\":\"username\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter to images that contain mature content flags or not (undefined returns all)\",\"in\":\"query\",\"name\":\"nsfw\",\"required\":false,\"schema\":{\"oneOf\":[{\"type\":\"boolean\"},{\"enum\":[\"None\",\"Soft\",\"Mature\",\"X\"],\"type\":\"string\"}]}},{\"description\":\"The order in which you wish to sort the results\",\"in\":\"query\",\"name\":\"sort\",\"required\":false,\"schema\":{\"enum\":[\"Most Reactions\",\"Most Comments\",\"Newest\"],\"type\":\"string\"}},{\"description\":\"The time frame in which the images will be sorted\",\"in\":\"query\",\"name\":\"period\",\"required\":false,\"schema\":{\"enum\":[\"AllTime\",\"Year\",\"Month\",\"Week\",\"Day\"],\"type\":\"string\"}},{\"description\":\"The page from which to start fetching creators\",\"in\":\"query\",\"name\":\"page\",\"required\":false,\"schema\":{\"default\":1,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"items\":{\"items\":{\"properties\":{\"createdAt\":{\"description\":\"The date the image was posted\",\"format\":\"date-time\",\"type\":\"string\"},\"hash\":{\"description\":\"The blurhash of the image\",\"type\":\"string\"},\"height\":{\"description\":\"The height of the image\",\"type\":\"integer\"},\"id\":{\"description\":\"The id of the image\",\"type\":\"integer\"},\"meta\":{\"additionalProperties\":true,\"description\":\"The generation parameters parsed or input for the image\",\"nullable\":true,\"type\":\"object\"},\"nsfw\":{\"description\":\"If the image has any mature content labels\",\"type\":\"boolean\"},\"nsfwLevel\":{\"description\":\"The NSFW level of the image\",\"enum\":[\"None\",\"Soft\",\"Mature\",\"X\"],\"type\":\"string\"},\"postId\":{\"description\":\"The ID of the post the image belongs to\",\"type\":\"integer\"},\"stats\":{\"properties\":{\"commentCount\":{\"description\":\"The number of comment reactions\",\"type\":\"integer\"},\"cryCount\":{\"description\":\"The number of cry reactions\",\"type\":\"integer\"},\"dislikeCount\":{\"description\":\"The number of dislike reactions\",\"type\":\"integer\"},\"heartCount\":{\"description\":\"The number of heart reactions\",\"type\":\"integer\"},\"laughCount\":{\"description\":\"The number of laugh reactions\",\"type\":\"integer\"},\"likeCount\":{\"description\":\"The number of like reactions\",\"type\":\"integer\"}},\"type\":\"object\"},\"url\":{\"description\":\"The url of the image at its source resolution\",\"type\":\"string\"},\"username\":{\"description\":\"The username of the creator\",\"type\":\"string\"},\"width\":{\"description\":\"The width of the image\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"metadata\":{\"properties\":{\"currentPage\":{\"description\":\"The current page you are at (if paging)\",\"type\":\"integer\"},\"nextCursor\":{\"description\":\"The id of the first image in the next batch\",\"nullable\":true,\"type\":\"integer\"},\"nextPage\":{\"description\":\"The url to get the next batch of items\",\"nullable\":true,\"type\":\"string\"},\"pageSize\":{\"description\":\"The size of the batch (if paging)\",\"type\":\"integer\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"security\":[{\"BearerAuth\":[]},{\"QueryToken\":[]},{}],\"securitySchemes\":{\"BearerAuth\":{\"description\":\"Use your API key as a Bearer token in the Authorization header\",\"scheme\":\"bearer\",\"type\":\"http\"},\"QueryToken\":{\"description\":\"Pass your API key as a query parameter\",\"in\":\"query\",\"name\":\"token\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/images","segments":[{"lit":"images"}],"select":{"exist":["limit","model_id","model_version_id","nsfw","page","period","post_id","sort","username"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"image","name__orig":"image","Name":"Image","name_":"image","name-":"image","NAME":"IMAGE","index$":1}, {"active":true,"entity":"image","key$":"BasicImageFlow","kind":"basic","name":"BasicImageFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"image_ref01"}}],"index$":0}]}, 'Image')
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
  
