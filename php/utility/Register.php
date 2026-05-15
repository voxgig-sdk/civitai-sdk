<?php
declare(strict_types=1);

// Civitai SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

CivitaiUtility::setRegistrar(function (CivitaiUtility $u): void {
    $u->clean = [CivitaiClean::class, 'call'];
    $u->done = [CivitaiDone::class, 'call'];
    $u->make_error = [CivitaiMakeError::class, 'call'];
    $u->feature_add = [CivitaiFeatureAdd::class, 'call'];
    $u->feature_hook = [CivitaiFeatureHook::class, 'call'];
    $u->feature_init = [CivitaiFeatureInit::class, 'call'];
    $u->fetcher = [CivitaiFetcher::class, 'call'];
    $u->make_fetch_def = [CivitaiMakeFetchDef::class, 'call'];
    $u->make_context = [CivitaiMakeContext::class, 'call'];
    $u->make_options = [CivitaiMakeOptions::class, 'call'];
    $u->make_request = [CivitaiMakeRequest::class, 'call'];
    $u->make_response = [CivitaiMakeResponse::class, 'call'];
    $u->make_result = [CivitaiMakeResult::class, 'call'];
    $u->make_point = [CivitaiMakePoint::class, 'call'];
    $u->make_spec = [CivitaiMakeSpec::class, 'call'];
    $u->make_url = [CivitaiMakeUrl::class, 'call'];
    $u->param = [CivitaiParam::class, 'call'];
    $u->prepare_auth = [CivitaiPrepareAuth::class, 'call'];
    $u->prepare_body = [CivitaiPrepareBody::class, 'call'];
    $u->prepare_headers = [CivitaiPrepareHeaders::class, 'call'];
    $u->prepare_method = [CivitaiPrepareMethod::class, 'call'];
    $u->prepare_params = [CivitaiPrepareParams::class, 'call'];
    $u->prepare_path = [CivitaiPreparePath::class, 'call'];
    $u->prepare_query = [CivitaiPrepareQuery::class, 'call'];
    $u->result_basic = [CivitaiResultBasic::class, 'call'];
    $u->result_body = [CivitaiResultBody::class, 'call'];
    $u->result_headers = [CivitaiResultHeaders::class, 'call'];
    $u->transform_request = [CivitaiTransformRequest::class, 'call'];
    $u->transform_response = [CivitaiTransformResponse::class, 'call'];
});
