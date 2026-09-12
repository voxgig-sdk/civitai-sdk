import { CivitaiEntityBase } from '../CivitaiEntityBase';
import type { CivitaiSDK } from '../CivitaiSDK';
import type { Control } from '../types';
import type { ModelVersion, ModelVersionLoadMatch } from '../CivitaiTypes';
declare class ModelVersionEntity extends CivitaiEntityBase<ModelVersion> {
    constructor(client: CivitaiSDK, entopts: any);
    make(this: ModelVersionEntity): ModelVersionEntity;
    load(this: any, reqmatch?: ModelVersionLoadMatch, ctrl?: Control): Promise<ModelVersionEntity>;
}
export { ModelVersionEntity };
