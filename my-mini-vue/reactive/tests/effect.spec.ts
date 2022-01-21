/*
 * @Author: liujian
 * @Description:
 * @Date: 2022-01-20 17:06:36
 * @LastEditTime: 2022-01-21 10:35:27
 * @FilePath: /web/my-mini-vue/reactive/tests/effect.spec.ts
 */
import { effect } from '../effect'
import { reactive } from '../reactive'

describe('effect', () => {
    it('effect', () => {
        const obj = reactive({ age: 12 })
        let nextAge
        effect(() => {
            nextAge = obj.age + 1
        })
        expect(nextAge).toBe(13)

        obj.age++
        expect(nextAge).toBe(14)
    })
})
