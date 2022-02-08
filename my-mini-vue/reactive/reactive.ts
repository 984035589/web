/*
 * @Author: liujian
 * @Description: reactive
 * @Date: 2022-01-20 16:45:26
 * @LastEditTime: 2022-01-24 14:57:00
 * @FilePath: /web/my-mini-vue/reactive/reactive.ts
 */
import { mutableHandlers, readonlyHandlers, shallowHandlers } from './baseHandlers'

export const enum ReactiveFlags {
    IS_REACTIVE = '__v__isReactive',
    IS_READONLY = '__v_isReadonly'
}

export function reactive(raw) {
    return createActiveObject(raw, mutableHandlers)
}

export function isReactive(obj) {
    return !!obj[ReactiveFlags.IS_REACTIVE]
}

export function isReadonly(obj) {
    return !!obj[ReactiveFlags.IS_READONLY]
}

export function isProxy(obj) {
    return isReactive(obj) || isReadonly(obj)
}

export function readonly(raw) {
    return createActiveObject(raw, readonlyHandlers)
}

export function shallowReadonly(raw) {
    return createActiveObject(raw, shallowHandlers)
}

function createActiveObject(raw: any, baseHandlers) {
    return new Proxy(raw, baseHandlers)
}
