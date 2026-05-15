<?php
declare(strict_types=1);

// Civitai SDK utility: result_headers

class CivitaiResultHeaders
{
    public static function call(CivitaiContext $ctx): ?CivitaiResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
