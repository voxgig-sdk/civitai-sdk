# ProjectName SDK exists test

import pytest
from civitai_sdk import CivitaiSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = CivitaiSDK.test(None, None)
        assert testsdk is not None
