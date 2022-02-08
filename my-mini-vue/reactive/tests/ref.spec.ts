/*
 * @Author: liujian
 * @Description: ref
 * @Date: 2022-01-24 15:07:16
 * @LastEditTime: 2022-01-24 15:09:03
 * @FilePath: /web/my-mini-vue/reactive/tests/ref.spec.ts
 */
import { ref } from '../ref'

describe('ref', () => {
    it('happy path', () => {
        const count = ref(1)
        expect(count.value).toBe(1)
    })
})
