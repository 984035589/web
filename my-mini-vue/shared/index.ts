/*
 * @Author: liujian
 * @Description: 公共工具
 * @Date: 2022-01-21 17:03:28
 * @LastEditTime: 2022-01-24 14:06:03
 * @FilePath: /web/my-mini-vue/shared/index.ts
 */
export const extend = Object.assign

export const isObject = (value) => {
    return value !== null && typeof value === 'object'
}
