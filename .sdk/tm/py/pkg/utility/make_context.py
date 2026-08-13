# Civitai SDK utility: make_context

from projectname_sdk.core.context import CivitaiContext


def make_context_util(ctxmap, basectx):
    return CivitaiContext(ctxmap, basectx)
