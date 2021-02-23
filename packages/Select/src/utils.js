/* eslint-disable no-undef */

const isPlainObject = obj => {
	return Object.prototype.toString.call(obj) === '[object Object]'
}
const cloneDeep = (data) => {
	let result;

	if (data instanceof Array) {
		result = [];
		data.forEach(item => {
			result.push(cloneDeep(item))
		})
	} else if (isPlainObject(data)) {
		result = {};
		for (let key in data) {
			result[key] = cloneDeep(data[key])
		}
	} else {
		return data;
	}

	return result;
}

const assignDeep = function() {
	const args = cloneDeep(Array.from(arguments));
	if (args.length < 2) return args[0];
	let result = args[0];
	args.shift();
	args.forEach(item => {
		if (isPlainObject(item)) {
			if (!isPlainObject(result)) result = {}
			for (let key in item) {
				if (result[key] && isPlainObject(item[key])) {
					result[key] = assignDeep(result[key], item[key])
				} else {
					result[key] = item[key]
				}
			}
		}
		else if (item instanceof Array) {
			if (!(result instanceof Array)) result = []
			item.forEach((arrItem, arrIndex) => {
				if (isPlainObject(arrItem)) {
					result[arrIndex] = assignDeep(result[arrIndex])
				} else {
					result[arrIndex] = arrItem
				}
			})
		}
	})
	return result;
}

export { isPlainObject, cloneDeep, assignDeep }