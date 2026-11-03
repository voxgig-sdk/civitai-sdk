package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewCreatorEntityFunc func(client *CivitaiSDK, entopts map[string]any) CivitaiEntityBase

var NewImageEntityFunc func(client *CivitaiSDK, entopts map[string]any) CivitaiEntityBase

var NewModelEntityFunc func(client *CivitaiSDK, entopts map[string]any) CivitaiEntityBase

var NewModelVersionEntityFunc func(client *CivitaiSDK, entopts map[string]any) CivitaiEntityBase

var NewTagEntityFunc func(client *CivitaiSDK, entopts map[string]any) CivitaiEntityBase

