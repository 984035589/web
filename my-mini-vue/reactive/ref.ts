/*
 * @Author: liujian
 * @Description: Ref
 * @Date: 2022-01-24 15:05:32
 * @LastEditTime: 2022-01-24 15:06:57
 * @FilePath: /web/my-mini-vue/reactive/ref.ts
 */

class RefImpl {
    private _value: any
    constructor(value) {
        this._value = value
    }

    get value() {
        return this._value
    }
}

export function ref(value) {
    return new RefImpl(value)
}
