<?php
declare(strict_types=1);

// Civitai SDK base feature

class CivitaiBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(CivitaiContext $ctx, array $options): void {}
    public function PostConstruct(CivitaiContext $ctx): void {}
    public function PostConstructEntity(CivitaiContext $ctx): void {}
    public function SetData(CivitaiContext $ctx): void {}
    public function GetData(CivitaiContext $ctx): void {}
    public function GetMatch(CivitaiContext $ctx): void {}
    public function SetMatch(CivitaiContext $ctx): void {}
    public function PrePoint(CivitaiContext $ctx): void {}
    public function PreSpec(CivitaiContext $ctx): void {}
    public function PreRequest(CivitaiContext $ctx): void {}
    public function PreResponse(CivitaiContext $ctx): void {}
    public function PreResult(CivitaiContext $ctx): void {}
    public function PreDone(CivitaiContext $ctx): void {}
    public function PreUnexpected(CivitaiContext $ctx): void {}
}
