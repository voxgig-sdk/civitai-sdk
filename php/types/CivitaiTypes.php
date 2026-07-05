<?php
declare(strict_types=1);

// Typed models for the Civitai SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Creator entity data model. */
class Creator
{
    public ?string $link = null;
    public ?int $model_count = null;
    public ?string $username = null;
}

/** Request payload for Creator#list. */
class CreatorListMatch
{
    public ?string $link = null;
    public ?int $model_count = null;
    public ?string $username = null;
}

/** Image entity data model. */
class Image
{
    public ?string $created_at = null;
    public ?string $hash = null;
    public ?int $height = null;
    public ?int $id = null;
    public ?array $meta = null;
    public ?bool $nsfw = null;
    public ?string $nsfw_level = null;
    public ?int $post_id = null;
    public ?array $stat = null;
    public ?string $url = null;
    public ?string $username = null;
    public ?int $width = null;
}

/** Request payload for Image#list. */
class ImageListMatch
{
    public ?string $created_at = null;
    public ?string $hash = null;
    public ?int $height = null;
    public ?int $id = null;
    public ?array $meta = null;
    public ?bool $nsfw = null;
    public ?string $nsfw_level = null;
    public ?int $post_id = null;
    public ?array $stat = null;
    public ?string $url = null;
    public ?string $username = null;
    public ?int $width = null;
}

/** Model entity data model. */
class Model
{
    public ?array $creator = null;
    public ?string $description = null;
    public ?int $id = null;
    public ?string $mode = null;
    public ?array $model_version = null;
    public ?string $name = null;
    public ?bool $nsfw = null;
    public ?array $stat = null;
    public ?array $tag = null;
    public ?string $type = null;
}

/** Request payload for Model#load. */
class ModelLoadMatch
{
    public int $id;
}

/** Request payload for Model#list. */
class ModelListMatch
{
    public ?array $creator = null;
    public ?string $description = null;
    public ?int $id = null;
    public ?string $mode = null;
    public ?array $model_version = null;
    public ?string $name = null;
    public ?bool $nsfw = null;
    public ?array $stat = null;
    public ?array $tag = null;
    public ?string $type = null;
}

/** ModelVersion entity data model. */
class ModelVersion
{
    public ?string $created_at = null;
    public ?string $description = null;
    public ?string $download_url = null;
    public ?array $file = null;
    public ?int $id = null;
    public ?array $image = null;
    public ?string $name = null;
    public ?array $stat = null;
    public ?array $trained_word = null;
}

/** Request payload for ModelVersion#load. */
class ModelVersionLoadMatch
{
    public string $hash;
    public int $id;
}

/** Tag entity data model. */
class Tag
{
    public ?string $link = null;
    public ?int $model_count = null;
    public ?string $name = null;
}

/** Request payload for Tag#list. */
class TagListMatch
{
    public ?string $link = null;
    public ?int $model_count = null;
    public ?string $name = null;
}

