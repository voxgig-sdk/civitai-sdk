
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { CivitaiSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = CivitaiSDK.test()
    equal(testsdk instanceof CivitaiSDK, true,
      'CivitaiSDK.test() must return a client synchronously')
  })

})
