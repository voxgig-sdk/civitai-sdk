# Typed models for the Civitai SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Creator:
    link: Optional[str] = None
    model_count: Optional[int] = None
    username: Optional[str] = None


@dataclass
class CreatorListMatch:
    link: Optional[str] = None
    model_count: Optional[int] = None
    username: Optional[str] = None


@dataclass
class Image:
    created_at: Optional[str] = None
    hash: Optional[str] = None
    height: Optional[int] = None
    id: Optional[int] = None
    meta: Optional[dict] = None
    nsfw: Optional[bool] = None
    nsfw_level: Optional[str] = None
    post_id: Optional[int] = None
    stat: Optional[dict] = None
    url: Optional[str] = None
    username: Optional[str] = None
    width: Optional[int] = None


@dataclass
class ImageListMatch:
    created_at: Optional[str] = None
    hash: Optional[str] = None
    height: Optional[int] = None
    id: Optional[int] = None
    meta: Optional[dict] = None
    nsfw: Optional[bool] = None
    nsfw_level: Optional[str] = None
    post_id: Optional[int] = None
    stat: Optional[dict] = None
    url: Optional[str] = None
    username: Optional[str] = None
    width: Optional[int] = None


@dataclass
class Model:
    creator: Optional[dict] = None
    description: Optional[str] = None
    id: Optional[int] = None
    mode: Optional[str] = None
    model_version: Optional[list] = None
    name: Optional[str] = None
    nsfw: Optional[bool] = None
    stat: Optional[dict] = None
    tag: Optional[list] = None
    type: Optional[str] = None


@dataclass
class ModelLoadMatch:
    id: int


@dataclass
class ModelListMatch:
    creator: Optional[dict] = None
    description: Optional[str] = None
    id: Optional[int] = None
    mode: Optional[str] = None
    model_version: Optional[list] = None
    name: Optional[str] = None
    nsfw: Optional[bool] = None
    stat: Optional[dict] = None
    tag: Optional[list] = None
    type: Optional[str] = None


@dataclass
class ModelVersion:
    created_at: Optional[str] = None
    description: Optional[str] = None
    download_url: Optional[str] = None
    file: Optional[list] = None
    id: Optional[int] = None
    image: Optional[list] = None
    name: Optional[str] = None
    stat: Optional[dict] = None
    trained_word: Optional[list] = None


@dataclass
class ModelVersionLoadMatch:
    hash: str
    id: int


@dataclass
class Tag:
    link: Optional[str] = None
    model_count: Optional[int] = None
    name: Optional[str] = None


@dataclass
class TagListMatch:
    link: Optional[str] = None
    model_count: Optional[int] = None
    name: Optional[str] = None

