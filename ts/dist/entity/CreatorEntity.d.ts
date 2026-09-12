import { CivitaiEntityBase } from '../CivitaiEntityBase';
import type { CivitaiSDK } from '../CivitaiSDK';
import type { Control } from '../types';
import type { Creator, CreatorListMatch } from '../CivitaiTypes';
declare class CreatorEntity extends CivitaiEntityBase<Creator> {
    constructor(client: CivitaiSDK, entopts: any);
    make(this: CreatorEntity): CreatorEntity;
    list(this: any, reqmatch?: CreatorListMatch, ctrl?: Control): Promise<CreatorEntity[]>;
}
export { CreatorEntity };
