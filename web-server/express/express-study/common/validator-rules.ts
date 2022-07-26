import { Rules } from 'async-validator';

const passwordRule: Rules = { password: [{ type: 'string', required: true, message: '密码不能为空' }] };

export const nameRule: Rules = { name: [{ type: 'string', required: true, message: '用户名不能为空' }] };

/**
 * 校验用户名密码
 */
export const adminRules: Rules = {
	...nameRule,
	...passwordRule
};
