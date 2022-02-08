/*
 * @Author: liujian
 * @Description:
 * @Date: 2022-01-21 17:57:37
 * @LastEditTime: 2022-01-24 14:45:48
 * @FilePath: /web/my-mini-vue/reactive/baseHandlers.ts
 */
import { ReactiveFlags, reactive, readonly } from './reactive'
import { extend, isObject } from '../shared'
import { track, trigger } from './effect'

const get = createGetter()
const set = createSetter()

const readonlyGet = createGetter(true)
const shallowReadonlyGet = createGetter(true, true)

function createGetter(isReadonly = false, shallow = false) {
    return function get(target, key) {
        if (key === ReactiveFlags.IS_REACTIVE) {
            return !isReadonly
        }
        if (key === ReactiveFlags.IS_READONLY) {
            return isReadonly
        }
        const res = Reflect.get(target, key)
        if (shallow) {
            return res
        }
        if (isObject(res)) {
            return isReadonly ? readonly(res) : reactive(res)
        }
        if (!isReadonly) {
            track(target, key)
        }
        return res
    }
}

function createSetter() {
    return function set(target, key, value) {
        const res = Reflect.set(target, key, value)
        // NOTICE: 这里要把Reflect.set之后的target传过去
        trigger(target, key)
        return res
    }
}

export const mutableHandlers = {
    get,
    set
}

export const readonlyHandlers = {
    get: readonlyGet,
    set(target, key, value) {
        console.warn(`key: ${key} set 失败，target是readonly`)
        return true
    }
}

export const shallowHandlers = extend({}, readonlyHandlers, { get: shallowReadonlyGet })
