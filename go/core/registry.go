package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewCreatorEntityFunc func(client *CivitaiSDK, entopts map[string]any) CivitaiEntity

var NewImageEntityFunc func(client *CivitaiSDK, entopts map[string]any) CivitaiEntity

var NewModelEntityFunc func(client *CivitaiSDK, entopts map[string]any) CivitaiEntity

var NewModelVersionEntityFunc func(client *CivitaiSDK, entopts map[string]any) CivitaiEntity

var NewTagEntityFunc func(client *CivitaiSDK, entopts map[string]any) CivitaiEntity

