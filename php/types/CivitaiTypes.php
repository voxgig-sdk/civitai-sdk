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
    public ?int $modelCount = null;
    public ?string $username = null;
}

/** Request payload for Creator#list. */
class CreatorListMatch
{
    public ?int $limit = null;
    public ?int $page = null;
    public ?string $query = null;
}

/** Image entity data model. */
class Image
{
    public ?string $createdAt = null;
    public ?string $hash = null;
    public ?int $height = null;
    public ?int $id = null;
    public ?array $meta = null;
    public ?bool $nsfw = null;
    public ?string $nsfwLevel = null;
    public ?int $postId = null;
    public ?array $stats = null;
    public ?string $url = null;
    public ?string $username = null;
    public ?int $width = null;
}

/** Request payload for Image#list. */
class ImageListMatch
{
    public ?int $limit = null;
    public ?int $model_id = null;
    public ?int $model_version_id = null;
    public mixed $nsfw = null;
    public ?int $page = null;
    public ?string $period = null;
    public ?int $post_id = null;
    public ?string $sort = null;
    public ?string $username = null;
}

/** Model entity data model. */
class Model
{
    public ?array $creator = null;
    public ?string $description = null;
    public ?int $id = null;
    public ?string $mode = null;
    public ?array $modelVersions = null;
    public ?string $name = null;
    public ?bool $nsfw = null;
    public ?array $stats = null;
    public ?array $tags = null;
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
    public ?bool $allow_commercial_use = null;
    public ?bool $allow_derivatif = null;
    public ?bool $allow_different_license = null;
    public ?bool $allow_no_credit = null;
    public ?bool $favorite = null;
    public ?bool $hidden = null;
    public ?int $limit = null;
    public ?bool $nsfw = null;
    public ?int $page = null;
    public ?string $period = null;
    public ?bool $primary_file_only = null;
    public ?string $query = null;
    public ?float $rating = null;
    public ?string $sort = null;
    public ?bool $supports_generation = null;
    public ?string $tag = null;
    public ?array $type = null;
    public ?string $username = null;
}

/** ModelVersion entity data model. */
class ModelVersion
{
    public ?string $createdAt = null;
    public ?string $description = null;
    public ?string $downloadUrl = null;
    public ?array $files = null;
    public ?int $id = null;
    public ?array $images = null;
    public ?string $name = null;
    public ?array $stats = null;
    public ?array $trainedWords = null;
}

/** Request payload for ModelVersion#load. */
class ModelVersionLoadMatch
{
    public int $id;
}

/** Tag entity data model. */
class Tag
{
    public ?string $link = null;
    public ?int $modelCount = null;
    public ?string $name = null;
}

/** Request payload for Tag#list. */
class TagListMatch
{
    public ?int $limit = null;
    public ?int $page = null;
    public ?string $query = null;
}

