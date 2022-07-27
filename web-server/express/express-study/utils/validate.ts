import Schema, { Rules, Values } from 'async-validator';

async function validate<T extends Values>(data: Values, rules: Rules): Promise<{ data: T; error: null | any }> {
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
			return {
				data: {} as T,
				error: err.errors[0].message
			};
		});
}

export default validate;
