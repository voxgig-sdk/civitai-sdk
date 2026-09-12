import { CivitaiEntityBase } from '../CivitaiEntityBase';
import type { CivitaiSDK } from '../CivitaiSDK';
import type { Control } from '../types';
import type { Tag, TagListMatch } from '../CivitaiTypes';
declare class TagEntity extends CivitaiEntityBase<Tag> {
    constructor(client: CivitaiSDK, entopts: any);
    make(this: TagEntity): TagEntity;
    list(this: any, reqmatch?: TagListMatch, ctrl?: Control): Promise<TagEntity[]>;
}
export { TagEntity };
