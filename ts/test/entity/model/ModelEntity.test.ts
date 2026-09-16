

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


describe('ModelEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CIVITAI_TEST_LIVE=TRUE.
  afterEach(liveDelay('CIVITAI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CivitaiSDK.test()
    const ent = testsdk.Model()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CIVITAI_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'model.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"creator","req":false,"type":"`$OBJECT`","index$":0},{"active":true,"name":"description","req":false,"short":"The description of the model (HTML)","type":"`$STRING`","index$":1},{"active":true,"name":"id","req":false,"short":"The identifier for the model","type":"`$INTEGER`","index$":2},{"active":true,"name":"mode","req":false,"short":"The mode in which the model is currently on.","type":"`$STRING`","index$":3},{"active":true,"name":"modelVersions","req":false,"type":"`$ARRAY`","index$":4},{"active":true,"name":"name","req":false,"short":"The name of the model","type":"`$STRING`","index$":5},{"active":true,"name":"nsfw","req":false,"short":"Whether the model is NSFW or not","type":"`$BOOLEAN`","index$":6},{"active":true,"name":"stats","req":false,"type":"`$OBJECT`","index$":7},{"active":true,"name":"tags","req":false,"short":"The tags associated with the model","type":"`$ARRAY`","index$":8},{"active":true,"name":"type","req":false,"short":"The model type","type":"`$STRING`","index$":9}],"id":{"field":"id","name":"id"},"name":"model","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"allow_commercial_use","orig":"allow_commercial_use","reqd":false,"type":"`$BOOLEAN`","index$":0},{"active":true,"kind":"query","name":"allow_derivatif","orig":"allow_derivatif","reqd":false,"type":"`$BOOLEAN`","index$":1},{"active":true,"kind":"query","name":"allow_different_license","orig":"allow_different_license","reqd":false,"type":"`$BOOLEAN`","index$":2},{"active":true,"kind":"query","name":"allow_no_credit","orig":"allow_no_credit","reqd":false,"type":"`$BOOLEAN`","index$":3},{"active":true,"kind":"query","name":"favorite","orig":"favorite","reqd":false,"type":"`$BOOLEAN`","index$":4},{"active":true,"kind":"query","name":"hidden","orig":"hidden","reqd":false,"type":"`$BOOLEAN`","index$":5},{"active":true,"example":100,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":6},{"active":true,"kind":"query","name":"nsfw","orig":"nsfw","reqd":false,"type":"`$BOOLEAN`","index$":7},{"active":true,"example":1,"kind":"query","name":"page","orig":"page","reqd":false,"type":"`$INTEGER`","index$":8},{"active":true,"kind":"query","name":"period","orig":"period","reqd":false,"type":"`$STRING`","index$":9},{"active":true,"kind":"query","name":"primary_file_only","orig":"primary_file_only","reqd":false,"type":"`$BOOLEAN`","index$":10},{"active":true,"kind":"query","name":"query","orig":"query","reqd":false,"type":"`$STRING`","index$":11},{"active":true,"kind":"query","name":"rating","orig":"rating","reqd":false,"type":"`$NUMBER`","index$":12},{"active":true,"kind":"query","name":"sort","orig":"sort","reqd":false,"type":"`$STRING`","index$":13},{"active":true,"kind":"query","name":"supports_generation","orig":"supports_generation","reqd":false,"type":"`$BOOLEAN`","index$":14},{"active":true,"kind":"query","name":"tag","orig":"tag","reqd":false,"type":"`$STRING`","index$":15},{"active":true,"kind":"query","name":"type","orig":"type","reqd":false,"type":"`$ARRAY`","index$":16},{"active":true,"kind":"query","name":"username","orig":"username","reqd":false,"type":"`$STRING`","index$":17}]},"contract":{"id":"GET /models","json":"{\"operationId\":\"getModels\",\"parameters\":[{\"description\":\"The number of results to be returned per page. This can be a number between 1 and 100. By default, each page will return 100 results\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":100,\"maximum\":100,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"The page from which to start fetching models\",\"in\":\"query\",\"name\":\"page\",\"required\":false,\"schema\":{\"default\":1,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Search query to filter models by name\",\"in\":\"query\",\"name\":\"query\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Search query to filter models by tag\",\"in\":\"query\",\"name\":\"tag\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Search query to filter models by user\",\"in\":\"query\",\"name\":\"username\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"The type of model you want to filter with. If none is specified, it will return all types\",\"in\":\"query\",\"name\":\"types\",\"required\":false,\"schema\":{\"items\":{\"enum\":[\"Checkpoint\",\"TextualInversion\",\"Hypernetwork\",\"AestheticGradient\",\"LORA\",\"Controlnet\",\"Poses\"],\"type\":\"string\"},\"type\":\"array\"}},{\"description\":\"The order in which you wish to sort the results\",\"in\":\"query\",\"name\":\"sort\",\"required\":false,\"schema\":{\"enum\":[\"Highest Rated\",\"Most Downloaded\",\"Newest\"],\"type\":\"string\"}},{\"description\":\"The time frame in which the models will be sorted\",\"in\":\"query\",\"name\":\"period\",\"required\":false,\"schema\":{\"enum\":[\"AllTime\",\"Year\",\"Month\",\"Week\",\"Day\"],\"type\":\"string\"}},{\"deprecated\":true,\"description\":\"The rating you wish to filter the models with. If none is specified, it will return models with any rating (Deprecated)\",\"in\":\"query\",\"name\":\"rating\",\"required\":false,\"schema\":{\"type\":\"number\"}},{\"description\":\"Filter to favorites of the authenticated user (this requires an API token or session cookie)\",\"in\":\"query\",\"name\":\"favorites\",\"required\":false,\"schema\":{\"type\":\"boolean\"}},{\"description\":\"Filter to hidden models of the authenticated user (this requires an API token or session cookie)\",\"in\":\"query\",\"name\":\"hidden\",\"required\":false,\"schema\":{\"type\":\"boolean\"}},{\"description\":\"Only include the primary file for each model (This will use your preferred format options if you use an API token or session cookie)\",\"in\":\"query\",\"name\":\"primaryFileOnly\",\"required\":false,\"schema\":{\"type\":\"boolean\"}},{\"description\":\"Filter to models that require or don't require crediting the creator\",\"in\":\"query\",\"name\":\"allowNoCredit\",\"required\":false,\"schema\":{\"type\":\"boolean\"}},{\"description\":\"Filter to models that allow or don't allow creating derivatives\",\"in\":\"query\",\"name\":\"allowDerivatives\",\"required\":false,\"schema\":{\"type\":\"boolean\"}},{\"description\":\"Filter to models that allow or don't allow derivatives to have a different license\",\"in\":\"query\",\"name\":\"allowDifferentLicenses\",\"required\":false,\"schema\":{\"type\":\"boolean\"}},{\"description\":\"Filter to models based on their commercial permissions\",\"in\":\"query\",\"name\":\"allowCommercialUse\",\"required\":false,\"schema\":{\"enum\":[\"None\",\"Image\",\"Rent\",\"Sell\"],\"type\":\"string\"}},{\"description\":\"If false, will return safer images and hide models that don't have safe images\",\"in\":\"query\",\"name\":\"nsfw\",\"required\":false,\"schema\":{\"type\":\"boolean\"}},{\"description\":\"If true, will return models that support generation\",\"in\":\"query\",\"name\":\"supportsGeneration\",\"required\":false,\"schema\":{\"type\":\"boolean\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"items\":{\"items\":{\"properties\":{\"creator\":{\"properties\":{\"image\":{\"description\":\"The url of the creators avatar\",\"nullable\":true,\"type\":\"string\"},\"username\":{\"description\":\"The name of the creator\",\"type\":\"string\"}},\"type\":\"object\"},\"description\":{\"description\":\"The description of the model (HTML)\",\"type\":\"string\"},\"id\":{\"description\":\"The identifier for the model\",\"type\":\"integer\"},\"mode\":{\"description\":\"The mode in which the model is currently on. If Archived, files field will be empty. If TakenDown, images field will be empty\",\"enum\":[\"Archived\",\"TakenDown\"],\"nullable\":true,\"type\":\"string\"},\"modelVersions\":{\"items\":{\"properties\":{\"createdAt\":{\"description\":\"The date in which the version was created\",\"format\":\"date-time\",\"type\":\"string\"},\"description\":{\"description\":\"The description of the model version (usually a changelog)\",\"type\":\"string\"},\"downloadUrl\":{\"description\":\"The download url to get the model file for this specific version\",\"type\":\"string\"},\"files\":{\"items\":{\"properties\":{\"metadata\":{\"properties\":{\"format\":{\"description\":\"The specified model format for the file\",\"enum\":[\"SafeTensor\",\"PickleTensor\",\"Other\"],\"type\":\"string\"},\"fp\":{\"description\":\"The specified floating point for the file\",\"enum\":[\"fp16\",\"fp32\"],\"type\":\"string\"},\"size\":{\"description\":\"The specified model size for the file\",\"enum\":[\"full\",\"pruned\"],\"type\":\"string\"}},\"type\":\"object\"},\"pickleScanResult\":{\"description\":\"Status of the pickle scan\",\"enum\":[\"Pending\",\"Success\",\"Danger\",\"Error\"],\"type\":\"string\"},\"primary\":{\"description\":\"If the file is the primary file for the model version\",\"type\":\"boolean\"},\"scannedAt\":{\"description\":\"The date in which the file was scanned\",\"format\":\"date-time\",\"nullable\":true,\"type\":\"string\"},\"sizeKb\":{\"description\":\"The size of the model file in KB\",\"type\":\"number\"},\"virusScanResult\":{\"description\":\"Status of the virus scan\",\"enum\":[\"Pending\",\"Success\",\"Danger\",\"Error\"],\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"id\":{\"description\":\"The identifier for the model version\",\"type\":\"integer\"},\"images\":{\"items\":{\"properties\":{\"hash\":{\"description\":\"The blurhash of the image\",\"type\":\"string\"},\"height\":{\"description\":\"The original height of the image\",\"type\":\"integer\"},\"id\":{\"description\":\"The id for the image\",\"type\":\"string\"},\"meta\":{\"additionalProperties\":true,\"description\":\"The generation params of the image\",\"nullable\":true,\"type\":\"object\"},\"nsfw\":{\"description\":\"Whether or not the image is NSFW\",\"type\":\"string\"},\"url\":{\"description\":\"The url for the image\",\"type\":\"string\"},\"width\":{\"description\":\"The original width of the image\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"name\":{\"description\":\"The name of the model version\",\"type\":\"string\"},\"stats\":{\"properties\":{\"downloadCount\":{\"description\":\"The number of downloads the model version has\",\"type\":\"integer\"},\"rating\":{\"description\":\"The average rating of the model version\",\"type\":\"number\"},\"ratingCount\":{\"description\":\"The number of ratings the model version has\",\"type\":\"integer\"}},\"type\":\"object\"},\"trainedWords\":{\"description\":\"The words used to trigger the model\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"},\"name\":{\"description\":\"The name of the model\",\"type\":\"string\"},\"nsfw\":{\"description\":\"Whether the model is NSFW or not\",\"type\":\"boolean\"},\"stats\":{\"properties\":{\"commentCount\":{\"description\":\"The number of comments the model has\",\"type\":\"integer\"},\"downloadCount\":{\"description\":\"The number of downloads the model has\",\"type\":\"integer\"},\"favoriteCount\":{\"description\":\"The number of favorites the model has\",\"type\":\"integer\"},\"rating\":{\"description\":\"The average rating of the model\",\"type\":\"number\"},\"ratingCount\":{\"description\":\"The number of ratings the model has\",\"type\":\"integer\"}},\"type\":\"object\"},\"tags\":{\"description\":\"The tags associated with the model\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"type\":{\"description\":\"The model type\",\"enum\":[\"Checkpoint\",\"TextualInversion\",\"Hypernetwork\",\"AestheticGradient\",\"LORA\",\"Controlnet\",\"Poses\"],\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"metadata\":{\"properties\":{\"currentPage\":{\"description\":\"The current page you are at\",\"type\":\"integer\"},\"nextPage\":{\"description\":\"The url to get the next batch of items\",\"nullable\":true,\"type\":\"string\"},\"pageSize\":{\"description\":\"The size of the batch\",\"type\":\"integer\"},\"prevPage\":{\"description\":\"The url to get the previous batch of items\",\"nullable\":true,\"type\":\"string\"},\"totalItems\":{\"description\":\"The total number of items available\",\"type\":\"integer\"},\"totalPages\":{\"description\":\"The total number of pages\",\"type\":\"integer\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"security\":[{\"BearerAuth\":[]},{\"QueryToken\":[]},{}],\"securitySchemes\":{\"BearerAuth\":{\"description\":\"Use your API key as a Bearer token in the Authorization header\",\"scheme\":\"bearer\",\"type\":\"http\"},\"QueryToken\":{\"description\":\"Pass your API key as a query parameter\",\"in\":\"query\",\"name\":\"token\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/models","segments":[{"lit":"models"}],"select":{"exist":["allow_commercial_use","allow_derivatif","allow_different_license","allow_no_credit","favorite","hidden","limit","nsfw","page","period","primary_file_only","query","rating","sort","supports_generation","tag","type","username"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"model_id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /models/{modelId}","json":"{\"operationId\":\"getModelById\",\"parameters\":[{\"description\":\"The ID of the model to retrieve\",\"in\":\"path\",\"name\":\"modelId\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"creator\":{\"properties\":{\"image\":{\"description\":\"The url of the creators avatar\",\"nullable\":true,\"type\":\"string\"},\"username\":{\"description\":\"The name of the creator\",\"type\":\"string\"}},\"type\":\"object\"},\"description\":{\"description\":\"The description of the model (HTML)\",\"type\":\"string\"},\"id\":{\"description\":\"The identifier for the model\",\"type\":\"integer\"},\"mode\":{\"description\":\"The mode in which the model is currently on. If Archived, files field will be empty. If TakenDown, images field will be empty\",\"enum\":[\"Archived\",\"TakenDown\"],\"nullable\":true,\"type\":\"string\"},\"modelVersions\":{\"items\":{\"properties\":{\"createdAt\":{\"description\":\"The date in which the version was created\",\"format\":\"date-time\",\"type\":\"string\"},\"description\":{\"description\":\"The description of the model version (usually a changelog)\",\"type\":\"string\"},\"downloadUrl\":{\"description\":\"The download url to get the model file for this specific version\",\"type\":\"string\"},\"files\":{\"items\":{\"properties\":{\"metadata\":{\"properties\":{\"format\":{\"description\":\"The specified model format for the file\",\"enum\":[\"SafeTensor\",\"PickleTensor\",\"Other\"],\"type\":\"string\"},\"fp\":{\"description\":\"The specified floating point for the file\",\"enum\":[\"fp16\",\"fp32\"],\"type\":\"string\"},\"size\":{\"description\":\"The specified model size for the file\",\"enum\":[\"full\",\"pruned\"],\"type\":\"string\"}},\"type\":\"object\"},\"pickleScanResult\":{\"description\":\"Status of the pickle scan\",\"enum\":[\"Pending\",\"Success\",\"Danger\",\"Error\"],\"type\":\"string\"},\"primary\":{\"description\":\"If the file is the primary file for the model version\",\"type\":\"boolean\"},\"scannedAt\":{\"description\":\"The date in which the file was scanned\",\"format\":\"date-time\",\"nullable\":true,\"type\":\"string\"},\"sizeKb\":{\"description\":\"The size of the model file in KB\",\"type\":\"number\"},\"virusScanResult\":{\"description\":\"Status of the virus scan\",\"enum\":[\"Pending\",\"Success\",\"Danger\",\"Error\"],\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"id\":{\"description\":\"The identifier for the model version\",\"type\":\"integer\"},\"images\":{\"items\":{\"properties\":{\"hash\":{\"description\":\"The blurhash of the image\",\"type\":\"string\"},\"height\":{\"description\":\"The original height of the image\",\"type\":\"integer\"},\"id\":{\"description\":\"The id for the image\",\"type\":\"string\"},\"meta\":{\"additionalProperties\":true,\"description\":\"The generation params of the image\",\"nullable\":true,\"type\":\"object\"},\"nsfw\":{\"description\":\"Whether or not the image is NSFW\",\"type\":\"string\"},\"url\":{\"description\":\"The url for the image\",\"type\":\"string\"},\"width\":{\"description\":\"The original width of the image\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"name\":{\"description\":\"The name of the model version\",\"type\":\"string\"},\"stats\":{\"properties\":{\"downloadCount\":{\"description\":\"The number of downloads the model version has\",\"type\":\"integer\"},\"rating\":{\"description\":\"The average rating of the model version\",\"type\":\"number\"},\"ratingCount\":{\"description\":\"The number of ratings the model version has\",\"type\":\"integer\"}},\"type\":\"object\"},\"trainedWords\":{\"description\":\"The words used to trigger the model\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"},\"name\":{\"description\":\"The name of the model\",\"type\":\"string\"},\"nsfw\":{\"description\":\"Whether the model is NSFW or not\",\"type\":\"boolean\"},\"stats\":{\"properties\":{\"commentCount\":{\"description\":\"The number of comments the model has\",\"type\":\"integer\"},\"downloadCount\":{\"description\":\"The number of downloads the model has\",\"type\":\"integer\"},\"favoriteCount\":{\"description\":\"The number of favorites the model has\",\"type\":\"integer\"},\"rating\":{\"description\":\"The average rating of the model\",\"type\":\"number\"},\"ratingCount\":{\"description\":\"The number of ratings the model has\",\"type\":\"integer\"}},\"type\":\"object\"},\"tags\":{\"description\":\"The tags associated with the model\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"type\":{\"description\":\"The model type\",\"enum\":[\"Checkpoint\",\"TextualInversion\",\"Hypernetwork\",\"AestheticGradient\",\"LORA\",\"Controlnet\",\"Poses\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Model not found\"}},\"security\":[{\"BearerAuth\":[]},{\"QueryToken\":[]},{}],\"securitySchemes\":{\"BearerAuth\":{\"description\":\"Use your API key as a Bearer token in the Authorization header\",\"scheme\":\"bearer\",\"type\":\"http\"},\"QueryToken\":{\"description\":\"Pass your API key as a query parameter\",\"in\":\"query\",\"name\":\"token\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/models/{modelId}","rename":{"param":{"modelId":"id"}},"segments":[{"lit":"models"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"model","name__orig":"model","Name":"Model","name_":"model","name-":"model","NAME":"MODEL","index$":2}, {"active":true,"entity":"model","key$":"BasicModelFlow","kind":"basic","name":"BasicModelFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"model_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"model_ref01","srcdatavar":"model_ref01_data","suffix":"_dt0"},"match":{"id":"model01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-model_ref01"}}],"index$":1}]}, 'Model')
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
  
