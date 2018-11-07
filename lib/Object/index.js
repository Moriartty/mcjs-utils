'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var object = {};

/*
只为改变的属性创造一个新的对象，然后把那些没改变的属性直接“挂载”到新对象中，属于有选择地浅复制
*/
object.objectAppend = function (obj0, obj) {
	for (var i in obj) {
		if (!obj0.hasOwnProperty(i)) {
			obj0[i] = obj[i];
		}
	}
	return obj0;
};
/*
复杂对象的深度复制
*/
object.objectAssign = function (obj) {
	var newObj = obj instanceof Array ? [] : {};
	for (var i in obj) {
		if (_typeof(obj[i]) === 'object') newObj[i] = arguments.callee(obj[i]);else newObj[i] = obj[i];
	}
	return newObj;
};

exports.default = object;