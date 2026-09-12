import { Context } from './Context';
declare class CivitaiError extends Error {
    isCivitaiError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { CivitaiError };
