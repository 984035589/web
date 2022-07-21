import Schema, { Rules } from 'async-validator';

/**
 * 校验用户名密码
 */
export const adminRules: Rules = {
	name: [{ type: 'string', required: true, message: '用户名不能为空' }],
	password: [{ type: 'string', required: true, message: '密码不能为空' }]
};

