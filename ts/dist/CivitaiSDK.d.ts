import { CreatorEntity } from './entity/CreatorEntity';
import { ImageEntity } from './entity/ImageEntity';
import { ModelEntity } from './entity/ModelEntity';
import { ModelVersionEntity } from './entity/ModelVersionEntity';
import { TagEntity } from './entity/TagEntity';
export type * from './CivitaiTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { CivitaiEntityBase } from './CivitaiEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class CivitaiSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Creator(entopts?: Record<string, any>): CreatorEntity;
    Image(entopts?: Record<string, any>): ImageEntity;
    Model(entopts?: Record<string, any>): ModelEntity;
    ModelVersion(entopts?: Record<string, any>): ModelVersionEntity;
    Tag(entopts?: Record<string, any>): TagEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): CivitaiSDK;
    tester(testopts?: any, sdkopts?: any): CivitaiSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof CivitaiSDK;
export { stdutil, config, BaseFeature, CivitaiEntityBase, CivitaiSDK, SDK, };
