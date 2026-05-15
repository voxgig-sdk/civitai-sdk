# Civitai SDK utility: make_context

from core.context import CivitaiContext


def make_context_util(ctxmap, basectx):
    return CivitaiContext(ctxmap, basectx)
