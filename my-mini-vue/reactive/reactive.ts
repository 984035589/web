/*
 * @Author: liujian
 * @Description: reactive
 * @Date: 2022-01-20 16:45:26
 * @LastEditTime: 2022-01-21 10:56:47
 * @FilePath: /web/my-mini-vue/reactive/reactive.ts
 */
import { track, trigger } from './effect'

export function reactive(raw) {
    return new Proxy(raw, {
        get(target, key) {
            const res = Reflect.get(target, key)
            track(target, key)
            return res
        },
        set(target, key, value) {
            const res = Reflect.set(target, key, value)
            // NOTICE: 这里要把Reflect.set之后的target传过去
            trigger(target, key)
            return res
        }
    })
}
