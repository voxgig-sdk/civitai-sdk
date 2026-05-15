<?php
declare(strict_types=1);

// Civitai SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class CivitaiFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new CivitaiBaseFeature();
            case "test":
                return new CivitaiTestFeature();
            default:
                return new CivitaiBaseFeature();
        }
    }
}
