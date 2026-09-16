

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


describe('ModelVersionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CIVITAI_TEST_LIVE=TRUE.
  afterEach(liveDelay('CIVITAI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CivitaiSDK.test()
    const ent = testsdk.ModelVersion()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CIVITAI_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'model_version.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"date-time","name":"createdAt","req":false,"short":"The date in which the version was created","type":"`$STRING`","index$":0},{"active":true,"name":"description","req":false,"short":"The description of the model version (usually a changelog)","type":"`$STRING`","index$":1},{"active":true,"name":"downloadUrl","req":false,"short":"The download url to get the model file for this specific version","type":"`$STRING`","index$":2},{"active":true,"name":"files","req":false,"type":"`$ARRAY`","index$":3},{"active":true,"name":"id","req":false,"short":"The identifier for the model version","type":"`$INTEGER`","index$":4},{"active":true,"name":"images","req":false,"type":"`$ARRAY`","index$":5},{"active":true,"name":"name","req":false,"short":"The name of the model version","type":"`$STRING`","index$":6},{"active":true,"name":"stats","req":false,"type":"`$OBJECT`","index$":7},{"active":true,"name":"trainedWords","req":false,"short":"The words used to trigger the model","type":"`$ARRAY`","index$":8}],"id":{"field":"id","name":"id"},"name":"model_version","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"hash","orig":"hash","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /model-versions/by-hash/{hash}","json":"{\"operationId\":\"getModelVersionByHash\",\"parameters\":[{\"description\":\"The hash of the model version to retrieve\",\"in\":\"path\",\"name\":\"hash\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"createdAt\":{\"description\":\"The date in which the version was created\",\"format\":\"date-time\",\"type\":\"string\"},\"description\":{\"description\":\"The description of the model version (usually a changelog)\",\"type\":\"string\"},\"downloadUrl\":{\"description\":\"The download url to get the model file for this specific version\",\"type\":\"string\"},\"files\":{\"items\":{\"properties\":{\"metadata\":{\"properties\":{\"format\":{\"description\":\"The specified model format for the file\",\"enum\":[\"SafeTensor\",\"PickleTensor\",\"Other\"],\"type\":\"string\"},\"fp\":{\"description\":\"The specified floating point for the file\",\"enum\":[\"fp16\",\"fp32\"],\"type\":\"string\"},\"size\":{\"description\":\"The specified model size for the file\",\"enum\":[\"full\",\"pruned\"],\"type\":\"string\"}},\"type\":\"object\"},\"pickleScanResult\":{\"description\":\"Status of the pickle scan\",\"enum\":[\"Pending\",\"Success\",\"Danger\",\"Error\"],\"type\":\"string\"},\"primary\":{\"description\":\"If the file is the primary file for the model version\",\"type\":\"boolean\"},\"scannedAt\":{\"description\":\"The date in which the file was scanned\",\"format\":\"date-time\",\"nullable\":true,\"type\":\"string\"},\"sizeKb\":{\"description\":\"The size of the model file in KB\",\"type\":\"number\"},\"virusScanResult\":{\"description\":\"Status of the virus scan\",\"enum\":[\"Pending\",\"Success\",\"Danger\",\"Error\"],\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"id\":{\"description\":\"The identifier for the model version\",\"type\":\"integer\"},\"images\":{\"items\":{\"properties\":{\"hash\":{\"description\":\"The blurhash of the image\",\"type\":\"string\"},\"height\":{\"description\":\"The original height of the image\",\"type\":\"integer\"},\"id\":{\"description\":\"The id for the image\",\"type\":\"string\"},\"meta\":{\"additionalProperties\":true,\"description\":\"The generation params of the image\",\"nullable\":true,\"type\":\"object\"},\"nsfw\":{\"description\":\"Whether or not the image is NSFW\",\"type\":\"string\"},\"url\":{\"description\":\"The url for the image\",\"type\":\"string\"},\"width\":{\"description\":\"The original width of the image\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"name\":{\"description\":\"The name of the model version\",\"type\":\"string\"},\"stats\":{\"properties\":{\"downloadCount\":{\"description\":\"The number of downloads the model version has\",\"type\":\"integer\"},\"rating\":{\"description\":\"The average rating of the model version\",\"type\":\"number\"},\"ratingCount\":{\"description\":\"The number of ratings the model version has\",\"type\":\"integer\"}},\"type\":\"object\"},\"trainedWords\":{\"description\":\"The words used to trigger the model\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Model version not found\"}},\"security\":[{\"BearerAuth\":[]},{\"QueryToken\":[]},{}],\"securitySchemes\":{\"BearerAuth\":{\"description\":\"Use your API key as a Bearer token in the Authorization header\",\"scheme\":\"bearer\",\"type\":\"http\"},\"QueryToken\":{\"description\":\"Pass your API key as a query parameter\",\"in\":\"query\",\"name\":\"token\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/model-versions/by-hash/{hash}","segments":[{"lit":"model-versions"},{"lit":"by-hash"},{"var":"hash"}],"select":{"exist":["hash"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"model_version_id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /model-versions/{modelVersionId}","json":"{\"operationId\":\"getModelVersionById\",\"parameters\":[{\"description\":\"The ID of the model version to retrieve\",\"in\":\"path\",\"name\":\"modelVersionId\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"createdAt\":{\"description\":\"The date in which the version was created\",\"format\":\"date-time\",\"type\":\"string\"},\"description\":{\"description\":\"The description of the model version (usually a changelog)\",\"type\":\"string\"},\"downloadUrl\":{\"description\":\"The download url to get the model file for this specific version\",\"type\":\"string\"},\"files\":{\"items\":{\"properties\":{\"metadata\":{\"properties\":{\"format\":{\"description\":\"The specified model format for the file\",\"enum\":[\"SafeTensor\",\"PickleTensor\",\"Other\"],\"type\":\"string\"},\"fp\":{\"description\":\"The specified floating point for the file\",\"enum\":[\"fp16\",\"fp32\"],\"type\":\"string\"},\"size\":{\"description\":\"The specified model size for the file\",\"enum\":[\"full\",\"pruned\"],\"type\":\"string\"}},\"type\":\"object\"},\"pickleScanResult\":{\"description\":\"Status of the pickle scan\",\"enum\":[\"Pending\",\"Success\",\"Danger\",\"Error\"],\"type\":\"string\"},\"primary\":{\"description\":\"If the file is the primary file for the model version\",\"type\":\"boolean\"},\"scannedAt\":{\"description\":\"The date in which the file was scanned\",\"format\":\"date-time\",\"nullable\":true,\"type\":\"string\"},\"sizeKb\":{\"description\":\"The size of the model file in KB\",\"type\":\"number\"},\"virusScanResult\":{\"description\":\"Status of the virus scan\",\"enum\":[\"Pending\",\"Success\",\"Danger\",\"Error\"],\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"id\":{\"description\":\"The identifier for the model version\",\"type\":\"integer\"},\"images\":{\"items\":{\"properties\":{\"hash\":{\"description\":\"The blurhash of the image\",\"type\":\"string\"},\"height\":{\"description\":\"The original height of the image\",\"type\":\"integer\"},\"id\":{\"description\":\"The id for the image\",\"type\":\"string\"},\"meta\":{\"additionalProperties\":true,\"description\":\"The generation params of the image\",\"nullable\":true,\"type\":\"object\"},\"nsfw\":{\"description\":\"Whether or not the image is NSFW\",\"type\":\"string\"},\"url\":{\"description\":\"The url for the image\",\"type\":\"string\"},\"width\":{\"description\":\"The original width of the image\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"name\":{\"description\":\"The name of the model version\",\"type\":\"string\"},\"stats\":{\"properties\":{\"downloadCount\":{\"description\":\"The number of downloads the model version has\",\"type\":\"integer\"},\"rating\":{\"description\":\"The average rating of the model version\",\"type\":\"number\"},\"ratingCount\":{\"description\":\"The number of ratings the model version has\",\"type\":\"integer\"}},\"type\":\"object\"},\"trainedWords\":{\"description\":\"The words used to trigger the model\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Model version not found\"}},\"security\":[{\"BearerAuth\":[]},{\"QueryToken\":[]},{}],\"securitySchemes\":{\"BearerAuth\":{\"description\":\"Use your API key as a Bearer token in the Authorization header\",\"scheme\":\"bearer\",\"type\":\"http\"},\"QueryToken\":{\"description\":\"Pass your API key as a query parameter\",\"in\":\"query\",\"name\":\"token\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/model-versions/{modelVersionId}","rename":{"param":{"modelVersionId":"id"}},"segments":[{"lit":"model-versions"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["by_hash"]]},"key$":"model_version","name__orig":"model_version","Name":"ModelVersion","name_":"model_version","name-":"model-version","NAME":"MODEL_VERSION","index$":3}, {"active":true,"entity":"model_version","key$":"BasicModelVersionFlow","kind":"basic","name":"BasicModelVersionFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"model_version_ref01","srcdatavar":"model_version_ref01_data","suffix":"_dt0"},"match":{"id":"model_version01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-model_version_ref01"}}],"index$":0}]}, 'ModelVersion')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let model_version_ref01_data = Object.values(setup.data.existing.model_version)[0] as any

    // LOAD
    const model_version_ref01_ent = client.ModelVersion()
    const model_version_ref01_match_dt0: any = {}
    model_version_ref01_match_dt0.id = model_version_ref01_data.id
    const model_version_ref01_data_dt0 = (await model_version_ref01_ent.load(model_version_ref01_match_dt0)).data()
    assert(model_version_ref01_data_dt0.id === model_version_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/model_version/ModelVersionTestData.json')

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
    ['model_version01','model_version02','model_version03','by_hash01','by_hash02','by_hash03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CIVITAI_TEST_MODEL_VERSION_ENTID': idmap,
    'CIVITAI_TEST_LIVE': 'FALSE',
    'CIVITAI_TEST_EXPLAIN': 'FALSE',
    'CIVITAI_APIKEY': '',
  })

  idmap = env['CIVITAI_TEST_MODEL_VERSION_ENTID']

  const live = 'TRUE' === env.CIVITAI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CIVITAI_TEST_MODEL_VERSION_ENTID']
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
  
