import Vue from 'vue'
export const cloneDeep = (data)=> {
	let result;
	
	if(data instanceof Array) {
		result = [];
		data.forEach(item=> {
			result.push(cloneDeep(item))
		})
	} else if(Object.prototype.toString.call(data) === '[object Object]') {
		result = {};
		for(let key in data) {
			result[key] = cloneDeep(data[key])
		}
	} else {
		return data;
	}
	
	return result;
}

export const bus = ()=> {
    return new Vue()
}