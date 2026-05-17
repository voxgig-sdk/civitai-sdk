package voxgigcivitaisdk

import (
	"github.com/voxgig-sdk/civitai-sdk/go/core"
	"github.com/voxgig-sdk/civitai-sdk/go/entity"
	"github.com/voxgig-sdk/civitai-sdk/go/feature"
	_ "github.com/voxgig-sdk/civitai-sdk/go/utility"
)

// Type aliases preserve external API.
type CivitaiSDK = core.CivitaiSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type CivitaiEntity = core.CivitaiEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type CivitaiError = core.CivitaiError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewCreatorEntityFunc = func(client *core.CivitaiSDK, entopts map[string]any) core.CivitaiEntity {
		return entity.NewCreatorEntity(client, entopts)
	}
	core.NewImageEntityFunc = func(client *core.CivitaiSDK, entopts map[string]any) core.CivitaiEntity {
		return entity.NewImageEntity(client, entopts)
	}
	core.NewModelEntityFunc = func(client *core.CivitaiSDK, entopts map[string]any) core.CivitaiEntity {
		return entity.NewModelEntity(client, entopts)
	}
	core.NewModelVersionEntityFunc = func(client *core.CivitaiSDK, entopts map[string]any) core.CivitaiEntity {
		return entity.NewModelVersionEntity(client, entopts)
	}
	core.NewTagEntityFunc = func(client *core.CivitaiSDK, entopts map[string]any) core.CivitaiEntity {
		return entity.NewTagEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewCivitaiSDK = core.NewCivitaiSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
