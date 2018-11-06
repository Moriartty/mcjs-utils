var utils = {};
utils.findMixed = function(){
	var tmp = [];
	for(var i=0;i<arguments.length;i++){
		tmp = tmp.concat(arguments[i]);
	}
	var mixed = [];
	tmp.forEach(function(o,i,array){
		if(array.indexOf(o)!==i&&mixed.indexOf(o)<0)
			mixed.push(o);
	})
	return mixed;
}

export default utils;