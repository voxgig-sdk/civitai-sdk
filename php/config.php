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
              'title' => 'Link',
              'type' => '`$STRING`',
              'short' => 'Url to get all models from this user',
            ],
            [
              'name' => 'modelCount',
              'title' => 'Model Count',
              'type' => '`$INTEGER`',
              'short' => 'The amount of models linked to this user',
            ],
            [
              'name' => 'username',
              'title' => 'Username',
              'type' => '`$STRING`',
              'short' => 'The username of the creator',
            ],
          ],
          'name' => 'creator',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/creators',
                  'segments' => [
                    [
                      'lit' => 'creators',
                    ],
                  ],
                  'parts' => [
                    'creators',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 20,
                      ],
                      [
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 1,
                      ],
                      [
                        'name' => 'query',
                        'orig' => 'query',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'limit',
                      'page',
                      'query',
                    ],
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
              'name' => 'createdAt',
              'title' => 'Created At',
              'type' => '`$STRING`',
              'short' => 'The date the image was posted',
              'format' => 'date-time',
            ],
            [
              'name' => 'hash',
              'title' => 'Hash',
              'type' => '`$STRING`',
              'short' => 'The blurhash of the image',
            ],
            [
              'name' => 'height',
              'title' => 'Height',
              'type' => '`$INTEGER`',
              'short' => 'The height of the image',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$INTEGER`',
              'short' => 'The id of the image',
            ],
            [
              'name' => 'meta',
              'title' => 'Meta',
              'type' => '`$OBJECT`',
              'short' => 'The generation parameters parsed or input for the image',
            ],
            [
              'name' => 'nsfw',
              'title' => 'Nsfw',
              'type' => '`$BOOLEAN`',
              'short' => 'If the image has any mature content labels',
            ],
            [
              'name' => 'nsfwLevel',
              'title' => 'Nsfw Level',
              'type' => '`$STRING`',
              'short' => 'The NSFW level of the image',
            ],
            [
              'name' => 'postId',
              'title' => 'Post Id',
              'type' => '`$INTEGER`',
              'short' => 'The ID of the post the image belongs to',
            ],
            [
              'name' => 'stats',
              'title' => 'Stats',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'url',
              'title' => 'Url',
              'type' => '`$STRING`',
              'short' => 'The url of the image at its source resolution',
            ],
            [
              'name' => 'username',
              'title' => 'Username',
              'type' => '`$STRING`',
              'short' => 'The username of the creator',
            ],
            [
              'name' => 'width',
              'title' => 'Width',
              'type' => '`$INTEGER`',
              'short' => 'The width of the image',
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
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/images',
                  'segments' => [
                    [
                      'lit' => 'images',
                    ],
                  ],
                  'parts' => [
                    'images',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 100,
                      ],
                      [
                        'name' => 'model_id',
                        'orig' => 'model_id',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'model_version_id',
                        'orig' => 'model_version_id',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'nsfw',
                        'orig' => 'nsfw',
                        'type' => '`$ANY`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 1,
                      ],
                      [
                        'name' => 'period',
                        'orig' => 'period',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'post_id',
                        'orig' => 'post_id',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'sort',
                        'orig' => 'sort',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'username',
                        'orig' => 'username',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
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
              'title' => 'Creator',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'description',
              'title' => 'Description',
              'type' => '`$STRING`',
              'short' => 'The description of the model (HTML)',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$INTEGER`',
              'short' => 'The identifier for the model',
            ],
            [
              'name' => 'mode',
              'title' => 'Mode',
              'type' => '`$STRING`',
              'short' => 'The mode in which the model is currently on.',
            ],
            [
              'name' => 'modelVersions',
              'title' => 'Model Versions',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$STRING`',
              'short' => 'The name of the model',
            ],
            [
              'name' => 'nsfw',
              'title' => 'Nsfw',
              'type' => '`$BOOLEAN`',
              'short' => 'Whether the model is NSFW or not',
            ],
            [
              'name' => 'stats',
              'title' => 'Stats',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'tags',
              'title' => 'Tags',
              'type' => '`$ARRAY`',
              'short' => 'The tags associated with the model',
            ],
            [
              'name' => 'type',
              'title' => 'Type',
              'type' => '`$STRING`',
              'short' => 'The model type',
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
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/models',
                  'segments' => [
                    [
                      'lit' => 'models',
                    ],
                  ],
                  'parts' => [
                    'models',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'allow_commercial_use',
                        'orig' => 'allow_commercial_use',
                        'type' => '`$BOOLEAN`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'allow_derivative',
                        'orig' => 'allow_derivative',
                        'type' => '`$BOOLEAN`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'allow_different_license',
                        'orig' => 'allow_different_license',
                        'type' => '`$BOOLEAN`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'allow_no_credit',
                        'orig' => 'allow_no_credit',
                        'type' => '`$BOOLEAN`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'favorite',
                        'orig' => 'favorite',
                        'type' => '`$BOOLEAN`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'hidden',
                        'orig' => 'hidden',
                        'type' => '`$BOOLEAN`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 100,
                      ],
                      [
                        'name' => 'nsfw',
                        'orig' => 'nsfw',
                        'type' => '`$BOOLEAN`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 1,
                      ],
                      [
                        'name' => 'period',
                        'orig' => 'period',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'primary_file_only',
                        'orig' => 'primary_file_only',
                        'type' => '`$BOOLEAN`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'query',
                        'orig' => 'query',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'rating',
                        'orig' => 'rating',
                        'type' => '`$NUMBER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'sort',
                        'orig' => 'sort',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'supports_generation',
                        'orig' => 'supports_generation',
                        'type' => '`$BOOLEAN`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'tag',
                        'orig' => 'tag',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'type',
                        'orig' => 'type',
                        'type' => '`$ARRAY`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'username',
                        'orig' => 'username',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'allow_commercial_use',
                      'allow_derivative',
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
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/models/{modelId}',
                  'segments' => [
                    [
                      'lit' => 'models',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'models',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'modelId' => 'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'model_id',
                        'type' => '`$INTEGER`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
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
              'name' => 'createdAt',
              'title' => 'Created At',
              'type' => '`$STRING`',
              'short' => 'The date in which the version was created',
              'format' => 'date-time',
            ],
            [
              'name' => 'description',
              'title' => 'Description',
              'type' => '`$STRING`',
              'short' => 'The description of the model version (usually a changelog)',
            ],
            [
              'name' => 'downloadUrl',
              'title' => 'Download Url',
              'type' => '`$STRING`',
              'short' => 'The download url to get the model file for this specific version',
            ],
            [
              'name' => 'files',
              'title' => 'Files',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$INTEGER`',
              'short' => 'The identifier for the model version',
            ],
            [
              'name' => 'images',
              'title' => 'Images',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$STRING`',
              'short' => 'The name of the model version',
            ],
            [
              'name' => 'stats',
              'title' => 'Stats',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'trainedWords',
              'title' => 'Trained Words',
              'type' => '`$ARRAY`',
              'short' => 'The words used to trigger the model',
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
                  'parts' => [
                    'model-versions',
                    'by-hash',
                    '{hash}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'hash',
                        'orig' => 'hash',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'hash',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/model-versions/{modelVersionId}',
                  'segments' => [
                    [
                      'lit' => 'model-versions',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'model-versions',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'modelVersionId' => 'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'model_version_id',
                        'type' => '`$INTEGER`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'tag' => [
          'fields' => [
            [
              'name' => 'link',
              'title' => 'Link',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'modelCount',
              'title' => 'Model Count',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
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
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/tags',
                  'segments' => [
                    [
                      'lit' => 'tags',
                    ],
                  ],
                  'parts' => [
                    'tags',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 20,
                      ],
                      [
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 1,
                      ],
                      [
                        'name' => 'query',
                        'orig' => 'query',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'limit',
                      'page',
                      'query',
                    ],
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
