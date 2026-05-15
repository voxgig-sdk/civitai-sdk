<?php
declare(strict_types=1);

// Civitai SDK utility: feature_add

class CivitaiFeatureAdd
{
    public static function call(CivitaiContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
