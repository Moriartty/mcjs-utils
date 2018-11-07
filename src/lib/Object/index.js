let object = {};

/*
只为改变的属性创造一个新的对象，然后把那些没改变的属性直接“挂载”到新对象中，属于有选择地浅复制
*/
object.objectAppend = function(obj0,obj){
	for(var i in obj){
		if(!obj0.hasOwnProperty(i)){
			obj0[i] = obj[i];
		}
	}
	return obj0;
}
/*
复杂对象的深度复制
*/
object.objectAssign = function(obj){
	var newObj = obj instanceof Array?[]:{};
	for(var i in obj){
		if(typeof(obj[i])==='object')
			newObj[i] = arguments.callee(obj[i]);
		else
			newObj[i] = obj[i];
	}
	return newObj;
}


export default object;