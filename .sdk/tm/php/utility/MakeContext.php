<?php
declare(strict_types=1);

// Civitai SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class CivitaiMakeContext
{
    public static function call(array $ctxmap, ?CivitaiContext $basectx): CivitaiContext
    {
        return new CivitaiContext($ctxmap, $basectx);
    }
}
