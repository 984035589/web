/*
 * @Author: liujian
 * @Description: effect
 * @Date: 2022-01-20 18:50:44
 * @LastEditTime: 2022-01-21 10:31:11
 * @FilePath: /web/my-mini-vue/reactive/effect.ts
 */

let activeEffect: ReactiveEffect
const targetMaps = new Map()

class ReactiveEffect {
    private _fn: any

    constructor(fn) {
        this._fn = fn
    }

    run() {
        activeEffect = this
        this._fn()
    }
}

export function effect(fn) {
    const reactiveEffect = new ReactiveEffect(fn)
    reactiveEffect.run()
}

/**
 * 收集依赖
 * @param target
 * @param key
 */
export function track(target, key) {
    let depsMap = targetMaps.get(target)
    if (!depsMap) {
        depsMap = new Map()
        targetMaps.set(target, depsMap)
    }
    let deps: Set<ReactiveEffect> = depsMap.get(key)
    if (!deps) {
        deps = new Set()
        depsMap.set(key, deps)
    }
    deps.add(activeEffect)
}

/**
 * 触发依赖
 * @param trigger
 * @param key
 */
export function trigger(target, key) {
    const depsMap = targetMaps.get(target)
    const deps: Set<ReactiveEffect> = depsMap.get(key)
    for (const dep of deps) {
        dep.run()
    }
}
