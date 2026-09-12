import { CivitaiEntityBase } from '../CivitaiEntityBase';
import type { CivitaiSDK } from '../CivitaiSDK';
import type { Control } from '../types';
import type { Image, ImageListMatch } from '../CivitaiTypes';
declare class ImageEntity extends CivitaiEntityBase<Image> {
    constructor(client: CivitaiSDK, entopts: any);
    make(this: ImageEntity): ImageEntity;
    list(this: any, reqmatch?: ImageListMatch, ctrl?: Control): Promise<ImageEntity[]>;
}
export { ImageEntity };
