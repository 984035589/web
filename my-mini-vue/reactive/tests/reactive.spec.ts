/*
 * @Author: liujian
 * @Description: 测试reactive
 * @Date: 2022-01-20 17:06:27
 * @LastEditTime: 2022-01-20 18:43:37
 * @FilePath: /web/my-mini-vue/reactive/tests/reactive.spec.ts
 */
import { reactive } from '../reactive'

describe('reactive', () => {
    it('happy path', () => {
        const obj = { name: 'lj' }
        const observed = reactive(obj)
        expect(obj).not.toBe(observed)
        expect(observed.name).toBe('lj')
    })
})
