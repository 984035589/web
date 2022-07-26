import Schema, { Rules, Values } from 'async-validator';

async function validate<T extends Values>(data: Values, rules: Rules): Promise<{ data: T; error: null | any }> {
	const data1 = { name: '1', password: '2321312' };
	// const rules: Rules = {
	// 	password: [{ type: 'string', required: true, message: '密码不能为空' }],
	// 	name: [{ type: 'string', required: true, message: '用户名不能为空' }]
	// };
	const validator = new Schema(rules);
	return await validator
		.validate(data)
		.then(() => {
			return {
				data: data as unknown as T,
				error: null
			};
		})
		.catch((err) => {
			console.log(`------------111`);
			return {
				data: {} as T,
				error: err.errors[0].message
			};
		});
}

function testValidate() {
	const data = { name: '1' };
	const rules: Rules = {
		password: [{ type: 'string', required: true, message: '密码不能为空' }],
		name: [{ type: 'string', required: true, message: '用户名不能为空' }]
	};
	const validator = new Schema(rules);
	validator
		.validate(data)
		.then(() => {
			console.log('------- success -------');
		})
		.catch((err) => {
			console.log('------- error -------');
		});
}

export { testValidate };

export default validate;
