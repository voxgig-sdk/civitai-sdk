import { CivitaiEntityBase } from '../CivitaiEntityBase';
import type { CivitaiSDK } from '../CivitaiSDK';
import type { Control } from '../types';
import type { Model, ModelLoadMatch, ModelListMatch } from '../CivitaiTypes';
declare class ModelEntity extends CivitaiEntityBase<Model> {
    constructor(client: CivitaiSDK, entopts: any);
    make(this: ModelEntity): ModelEntity;
    load(this: any, reqmatch?: ModelLoadMatch, ctrl?: Control): Promise<ModelEntity>;
    list(this: any, reqmatch?: ModelListMatch, ctrl?: Control): Promise<ModelEntity[]>;
}
export { ModelEntity };
