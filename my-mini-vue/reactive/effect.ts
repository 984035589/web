/*
 * @Author: liujian
 * @Description: effect
 * @Date: 2022-01-20 18:50:44
 * @LastEditTime: 2022-01-24 10:01:06
 * @FilePath: /web/my-mini-vue/reactive/effect.ts
 */
import { extend } from '../shared'

let activeEffect: ReactiveEffect
let shouldTrack
const targetMaps = new Map()

class ReactiveEffect {
    private _fn: any

    public deps = [] as any[]

    public scheduler: Function | undefined

    onStop: Function | undefined

    active = true

    constructor(fn, scheduler?) {
        this._fn = fn
        this.scheduler = scheduler
    }

    run() {
        activeEffect = this
        if (!this.active) {
            return this._fn()
        }
        shouldTrack = true
        activeEffect = this
        const result = this._fn()
        shouldTrack = false
        return result
    }

    stop() {
        if (this.active) {
            cleanupEffect(this)
            if (this.onStop) {
                this.onStop()
            }
            this.active = false
        }
    }
}

export function effect(fn, options: any = {}) {
    const reactiveEffect = new ReactiveEffect(fn, options.scheduler)
    extend(reactiveEffect, options)
    reactiveEffect.run()
    const runner: any = reactiveEffect.run.bind(reactiveEffect)
    runner.effect = reactiveEffect
    return runner
}

/**
 * 清空依赖
 * @param effectInstance
 */
function cleanupEffect(effectInstance: any) {
    effectInstance.deps.forEach((dep) => {
        dep.delete(effectInstance)
    })
    effectInstance.deps.length = 0
}

/**
 * 收集依赖
 * @param target
 * @param key
 */
export function track(target, key) {
    if (!isTracking()) {
        return
    }
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
    if (deps.has(activeEffect)) {
        return
    }
    deps.add(activeEffect)
    activeEffect.deps.push(deps)
}

function isTracking() {
    return shouldTrack && activeEffect
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
        if (dep.scheduler) {
            dep.scheduler()
        } else {
            dep.run()
        }
    }
}

/**
 * 停止触发依赖
 * @param runner
 */
export function stop(runner) {
    runner.effect.stop()
}
