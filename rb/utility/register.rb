# Civitai SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

CivitaiUtility.registrar = ->(u) {
  u.clean = CivitaiUtilities::Clean
  u.done = CivitaiUtilities::Done
  u.make_error = CivitaiUtilities::MakeError
  u.feature_add = CivitaiUtilities::FeatureAdd
  u.feature_hook = CivitaiUtilities::FeatureHook
  u.feature_init = CivitaiUtilities::FeatureInit
  u.fetcher = CivitaiUtilities::Fetcher
  u.make_fetch_def = CivitaiUtilities::MakeFetchDef
  u.make_context = CivitaiUtilities::MakeContext
  u.make_options = CivitaiUtilities::MakeOptions
  u.make_request = CivitaiUtilities::MakeRequest
  u.make_response = CivitaiUtilities::MakeResponse
  u.make_result = CivitaiUtilities::MakeResult
  u.make_point = CivitaiUtilities::MakePoint
  u.make_spec = CivitaiUtilities::MakeSpec
  u.make_url = CivitaiUtilities::MakeUrl
  u.param = CivitaiUtilities::Param
  u.prepare_auth = CivitaiUtilities::PrepareAuth
  u.prepare_body = CivitaiUtilities::PrepareBody
  u.prepare_headers = CivitaiUtilities::PrepareHeaders
  u.prepare_method = CivitaiUtilities::PrepareMethod
  u.prepare_params = CivitaiUtilities::PrepareParams
  u.prepare_path = CivitaiUtilities::PreparePath
  u.prepare_query = CivitaiUtilities::PrepareQuery
  u.result_basic = CivitaiUtilities::ResultBasic
  u.result_body = CivitaiUtilities::ResultBody
  u.result_headers = CivitaiUtilities::ResultHeaders
  u.transform_request = CivitaiUtilities::TransformRequest
  u.transform_response = CivitaiUtilities::TransformResponse
}
