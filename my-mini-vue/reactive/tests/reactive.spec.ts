/*
 * @Author: liujian
 * @Description: 测试reactive
 * @Date: 2022-01-20 17:06:27
 * @LastEditTime: 2022-01-24 14:59:34
 * @FilePath: /web/my-mini-vue/reactive/tests/reactive.spec.ts
 */
import { isProxy, isReactive, isReadonly, reactive, readonly, shallowReadonly } from '../reactive'

describe('reactive', () => {
    it('happy path', () => {
        const obj = { name: 'lj' }
        const observed = reactive(obj)
        expect(obj).not.toBe(observed)
        expect(observed.name).toBe('lj')
    })

    it('readonly', () => {
        const original = { age: 12 }
        const obj = readonly(original)
        expect(original).not.toBe(obj)
        expect(obj.age).toBe(12)
        obj.age = 13
    })

    it('readonly set', () => {
        console.warn = jest.fn()
        const user = readonly({
            age: 10
        })
        user.age = 11
        expect(console.warn).toBeCalled()
    })

    it('is Reactive', () => {
        const original = { name: 'li' }
        const observed = reactive(original)
        expect(observed).not.toBe(original)
        expect(isReactive(observed)).toBe(true)
        expect(isReactive(original)).toBe(false)
    })

    it('is readonly', () => {
        const original = { name: 'li' }
        const readonlyObj = readonly(original)
        expect(readonlyObj).not.toBe(original)
        expect(isReadonly(readonlyObj)).toBe(true)
        expect(isReadonly(original)).toBe(false)
    })

    it('nested reactive', () => {
        const original = {
            person: {
                age: 12
            },
            loves: [{ subject: 'boll' }]
        }
        const observed = reactive(original)
        ++original.person.age
        expect(observed.person.age).toBe(13)
        expect(isReactive(observed.person)).toBe(true)
        expect(isReactive(original.person)).toBe(false)
    })

    it('nested readonly', () => {
        const original = {
            person: {
                age: 12
            },
            loves: [{ subject: 'boll' }]
        }
        const readonlyObj = readonly(original)
        expect(isReadonly(original)).toBe(false)
        expect(isReadonly(readonlyObj)).toBe(true)
    })

    it('shallow readonly', () => {
        const original = {
            count: 10,
            person: {
                age: 12
            },
            loves: [{ subject: 'boll' }]
        }
        const shallowObj = shallowReadonly(original)
        expect(isReadonly(shallowObj)).toBe(true)
        expect(isReadonly(shallowObj.person)).toBe(false)
    })

    it('shallow readonly set', () => {
        console.warn = jest.fn()
        const user = shallowReadonly({
            age: 10
        })
        user.age = 11
        expect(console.warn).toBeCalled()
    })

    it('is proxy', () => {
        const observed = reactive({ age: 10 })
        const observedReadonly = readonly({ age: 10 })
        expect(isProxy(observed)).toBe(true)
        expect(isProxy(observedReadonly)).toBe(true)
    })
})
