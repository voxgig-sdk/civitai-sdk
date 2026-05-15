
import { Context } from './Context'


class CivitaiError extends Error {

  isCivitaiError = true

  sdk = 'Civitai'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  CivitaiError
}

