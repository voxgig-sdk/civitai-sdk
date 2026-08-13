# Civitai SDK feature factory

from civitai_sdk.feature.base_feature import CivitaiBaseFeature
from civitai_sdk.feature.test_feature import CivitaiTestFeature


def _make_feature(name):
    features = {
        "base": lambda: CivitaiBaseFeature(),
        "test": lambda: CivitaiTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
