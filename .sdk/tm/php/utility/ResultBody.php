<?php
declare(strict_types=1);

// Civitai SDK utility: result_body

class CivitaiResultBody
{
    public static function call(CivitaiContext $ctx): ?CivitaiResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
