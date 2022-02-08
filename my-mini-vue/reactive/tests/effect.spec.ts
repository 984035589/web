/*
 * @Author: liujian
 * @Description:
 * @Date: 2022-01-20 17:06:36
 * @LastEditTime: 2022-01-24 09:26:46
 * @FilePath: /web/my-mini-vue/reactive/tests/effect.spec.ts
 */
import { effect, stop } from '../effect'

import { reactive } from '../reactive'

describe('effect', () => {
    it('effect', () => {
        const obj = reactive({ age: 12 })
        let nextAge
        effect(() => {
            nextAge = obj.age + 2
        })
        expect(nextAge).toBe(14)

        obj.age++
        expect(nextAge).toBe(15)
    })

    it('runner', () => {
        let age = 10
        const runner = effect(() => {
            age++
            return true
        })
        expect(age).toBe(11)

        const res = runner()
        expect(age).toBe(12)
        expect(res).toBe(true)
    })

    it('scheduler', () => {
        let dummy
        let run: any
        const scheduler = jest.fn(() => {
            run = runner
        })
        const obj = reactive({ foo: 1 })
        const runner = effect(
            () => {
                dummy = obj.foo
            },
            {
                scheduler
            }
        )
        // 初始化的时候执行的effect上的run
        expect(scheduler).not.toHaveBeenCalled()
        expect(dummy).toBe(1)
        // 响应式对象更新是执行的是scheduler
        obj.foo++
        expect(scheduler).toHaveBeenCalledTimes(1)
        expect(dummy).toBe(1)
        // 执行runner的时候执行的是run
        run()
        expect(scheduler).toHaveBeenCalledTimes(1)
        expect(dummy).toBe(2)
    })

    it('stop', () => {
        let nextAge
        const obj = reactive({ age: 1 })
        const onStop = jest.fn()
        const runner = effect(
            () => {
                nextAge = obj.age
            },
            {
                onStop
            }
        )
        obj.age = 2
        expect(nextAge).toBe(2)
        stop(runner)
        expect(onStop).toHaveBeenCalledTimes(1)
        obj.age++
        expect(nextAge).toBe(2)

        runner()
        expect(nextAge).toBe(3)
    })
})
