<?php
declare(strict_types=1);

// Civitai SDK configuration

class CivitaiConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Civitai",
                "slug" => "civitai",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://civitai.com/api/v1",
                "auth" => [
                    "prefix" => "Bearer",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "creator" => [],
                    "image" => [],
                    "model" => [],
                    "model_version" => [],
                    "tag" => [],
                ],
            ],
            "entity" => [
        'creator' => [
          'fields' => [
            [
              'name' => 'link',
              'short' => 'Url to get all models from this user',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'modelCount',
              'short' => 'The amount of models linked to this user',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'username',
              'short' => 'The username of the creator',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'creator',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 20,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'query',
                        'orig' => 'query',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/creators',
                  'segments' => [
                    [
                      'lit' => 'creators',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'limit',
                      'page',
                      'query',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'creators',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'image' => [
          'fields' => [
            [
              'format' => 'date-time',
              'name' => 'createdAt',
              'short' => 'The date the image was posted',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'hash',
              'short' => 'The blurhash of the image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'height',
              'short' => 'The height of the image',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'id',
              'short' => 'The id of the image',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'meta',
              'short' => 'The generation parameters parsed or input for the image',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'nsfw',
              'short' => 'If the image has any mature content labels',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'nsfwLevel',
              'short' => 'The NSFW level of the image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'postId',
              'short' => 'The ID of the post the image belongs to',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'stats',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'url',
              'short' => 'The url of the image at its source resolution',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'username',
              'short' => 'The username of the creator',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'width',
              'short' => 'The width of the image',
              'type' => '`$INTEGER`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'image',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 100,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'model_id',
                        'orig' => 'model_id',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'model_version_id',
                        'orig' => 'model_version_id',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'nsfw',
                        'orig' => 'nsfw',
                        'type' => '`$ANY`',
                      ],
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'period',
                        'orig' => 'period',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'post_id',
                        'orig' => 'post_id',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'sort',
                        'orig' => 'sort',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'username',
                        'orig' => 'username',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/images',
                  'segments' => [
                    [
                      'lit' => 'images',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'limit',
                      'model_id',
                      'model_version_id',
                      'nsfw',
                      'page',
                      'period',
                      'post_id',
                      'sort',
                      'username',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'images',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'model' => [
          'fields' => [
            [
              'name' => 'creator',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'description',
              'short' => 'The description of the model (HTML)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'The identifier for the model',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'mode',
              'short' => 'The mode in which the model is currently on.',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'modelVersions',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'name',
              'short' => 'The name of the model',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'nsfw',
              'short' => 'Whether the model is NSFW or not',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'stats',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'tags',
              'short' => 'The tags associated with the model',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'type',
              'short' => 'The model type',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'model',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'allow_commercial_use',
                        'orig' => 'allow_commercial_use',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'allow_derivatif',
                        'orig' => 'allow_derivatif',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'allow_different_license',
                        'orig' => 'allow_different_license',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'allow_no_credit',
                        'orig' => 'allow_no_credit',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'favorite',
                        'orig' => 'favorite',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'hidden',
                        'orig' => 'hidden',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'example' => 100,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'nsfw',
                        'orig' => 'nsfw',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'period',
                        'orig' => 'period',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'primary_file_only',
                        'orig' => 'primary_file_only',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'query',
                        'orig' => 'query',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'rating',
                        'orig' => 'rating',
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'sort',
                        'orig' => 'sort',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'supports_generation',
                        'orig' => 'supports_generation',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'tag',
                        'orig' => 'tag',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'type',
                        'orig' => 'type',
                        'type' => '`$ARRAY`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'username',
                        'orig' => 'username',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/models',
                  'segments' => [
                    [
                      'lit' => 'models',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'allow_commercial_use',
                      'allow_derivatif',
                      'allow_different_license',
                      'allow_no_credit',
                      'favorite',
                      'hidden',
                      'limit',
                      'nsfw',
                      'page',
                      'period',
                      'primary_file_only',
                      'query',
                      'rating',
                      'sort',
                      'supports_generation',
                      'tag',
                      'type',
                      'username',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'models',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'model_id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/models/{modelId}',
                  'rename' => [
                    'param' => [
                      'modelId' => 'id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'models',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'models',
                    '{id}',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'model_version' => [
          'fields' => [
            [
              'format' => 'date-time',
              'name' => 'createdAt',
              'short' => 'The date in which the version was created',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'description',
              'short' => 'The description of the model version (usually a changelog)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'downloadUrl',
              'short' => 'The download url to get the model file for this specific version',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'files',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'id',
              'short' => 'The identifier for the model version',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'images',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'name',
              'short' => 'The name of the model version',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'stats',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'trainedWords',
              'short' => 'The words used to trigger the model',
              'type' => '`$ARRAY`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'model_version',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'hash',
                        'orig' => 'hash',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/model-versions/by-hash/{hash}',
                  'segments' => [
                    [
                      'lit' => 'model-versions',
                    ],
                    [
                      'lit' => 'by-hash',
                    ],
                    [
                      'var' => 'hash',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'hash',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'model-versions',
                    'by-hash',
                    '{hash}',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'model_version_id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/model-versions/{modelVersionId}',
                  'rename' => [
                    'param' => [
                      'modelVersionId' => 'id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'model-versions',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'model-versions',
                    '{id}',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'by_hash',
              ],
            ],
          ],
        ],
        'tag' => [
          'fields' => [
            [
              'name' => 'link',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'modelCount',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'name',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'tag',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 20,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'query',
                        'orig' => 'query',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/tags',
                  'segments' => [
                    [
                      'lit' => 'tags',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'limit',
                      'page',
                      'query',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'tags',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return CivitaiFeatures::make_feature($name);
    }
}
