<?php
declare(strict_types=1);

// Civitai SDK utility: prepare_body

class CivitaiPrepareBody
{
    public static function call(CivitaiContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
