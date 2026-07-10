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
    model_count: int
    username: str


class CreatorListMatch(TypedDict, total=False):
    link: str
    model_count: int
    username: str


class Image(TypedDict, total=False):
    created_at: str
    hash: str
    height: int
    id: int
    meta: dict
    nsfw: bool
    nsfw_level: str
    post_id: int
    stat: dict
    url: str
    username: str
    width: int


class ImageListMatch(TypedDict, total=False):
    created_at: str
    hash: str
    height: int
    id: int
    meta: dict
    nsfw: bool
    nsfw_level: str
    post_id: int
    stat: dict
    url: str
    username: str
    width: int


class Model(TypedDict, total=False):
    creator: dict
    description: str
    id: int
    mode: str
    model_version: list
    name: str
    nsfw: bool
    stat: dict
    tag: list
    type: str


class ModelLoadMatch(TypedDict):
    id: int


class ModelListMatch(TypedDict, total=False):
    creator: dict
    description: str
    id: int
    mode: str
    model_version: list
    name: str
    nsfw: bool
    stat: dict
    tag: list
    type: str


class ModelVersion(TypedDict, total=False):
    created_at: str
    description: str
    download_url: str
    file: list
    id: int
    image: list
    name: str
    stat: dict
    trained_word: list


class ModelVersionLoadMatch(TypedDict, total=False):
    hash: str
    id: int


class Tag(TypedDict, total=False):
    link: str
    model_count: int
    name: str


class TagListMatch(TypedDict, total=False):
    link: str
    model_count: int
    name: str
