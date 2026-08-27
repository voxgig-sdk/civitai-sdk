# Typed models for the Civitai SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Creator(TypedDict, total=False):
    link: str
    modelCount: int
    username: str


class CreatorListMatch(TypedDict, total=False):
    limit: int
    page: int
    query: str


class Image(TypedDict, total=False):
    createdAt: str
    hash: str
    height: int
    id: int
    meta: dict
    nsfw: bool
    nsfwLevel: str
    postId: int
    stats: dict
    url: str
    username: str
    width: int


class ImageListMatch(TypedDict, total=False):
    limit: int
    model_id: int
    model_version_id: int
    nsfw: Any
    page: int
    period: str
    post_id: int
    sort: str
    username: str


class Model(TypedDict, total=False):
    creator: dict
    description: str
    id: int
    mode: str
    modelVersions: list
    name: str
    nsfw: bool
    stats: dict
    tags: list
    type: str


class ModelLoadMatch(TypedDict):
    id: int


class ModelListMatch(TypedDict, total=False):
    allow_commercial_use: bool
    allow_derivatif: bool
    allow_different_license: bool
    allow_no_credit: bool
    favorite: bool
    hidden: bool
    limit: int
    nsfw: bool
    page: int
    period: str
    primary_file_only: bool
    query: str
    rating: float
    sort: str
    supports_generation: bool
    tag: str
    type: list
    username: str


class ModelVersion(TypedDict, total=False):
    createdAt: str
    description: str
    downloadUrl: str
    files: list
    id: int
    images: list
    name: str
    stats: dict
    trainedWords: list


class ModelVersionLoadMatch(TypedDict):
    id: int


class Tag(TypedDict, total=False):
    link: str
    modelCount: int
    name: str


class TagListMatch(TypedDict, total=False):
    limit: int
    page: int
    query: str
