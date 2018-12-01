let binaryTree = {};

function BNode(val){
	this.val = val;
	this.left = null;
	this.right = null;
}

//数组转完全二叉树
binaryTree.array2completeTree = (array,bNode,index) => {
	let length = array.length;
	if(index>length-1)
		return null;
	else{
		bNode.val = array[index];
		bNode.left = arguments.callee(array,new BNode(),2*index+1,length);
		bNode.right = arguments.callee(array,new BNode(),2*index+2,length);
		return bNode;
	}
}

// 数组转搜索二叉树
binaryTree.array2searchTree = (array,bNode) => {
	if(!bNode)
		bNode = new BNode();
	bNode.val = array[0];
	for(var i=1;i<array.length;i++){
		insertNode(bNode,array[i]);
	}
	function insertNode(parentNode,val){
		if(val>parentNode.val){
			if(parentNode.right==null)
				parentNode.right = new BNode(val);
			else 
				arguments.callee(parentNode.right,val);
		}else{
			if(parentNode.left==null)
				parentNode.left = new BNode(val);
			else
				arguments.callee(parentNode.left,val);
		}
	}
}

//寻找树中是否有指定节点
binaryTree.findNodeInTree = (root,node) => {
	if(!root)
		return false;
	if(root.val===node.val)
		return true;
	else{
		return arguments.callee(root.left,node)||arguments.callee(root.right,node);
	}
}

// 判断两棵树是否相同 (递归)
binaryTree.isSameTreeWithRecursive = (bNode1,bNode2) => {
	if(!bNode1&&!bNode2)
		return true;
	else if(!bNode1||!bNode2)
		return false;
	else{
		return (bNode1.val===bNode2.val)&&diff(bNode1.left,bNode2.left)&&diff(bNode1.right,bNode2.right);
	}
}

// 二叉树镜像反转
binaryTree.reverse = (bNode) =>{
	let left,right;
	if(bNode){
		let tempNode = new BNode(bNode.val);
		tempNode.left = arguments.callee(bNode.right);
		tempNode.right = arguments.callee(bNode.left);
		return tempNode;
	}
	else
		return null;
}

//求二叉树不相邻节点的最大和
binaryTree.maxSumInNotAdjacent =  (bNode) => {
	var res  = [0,0];//temp[0]抢,temp[1]不抢
	if(!bNode)
		return res;
	else{
		var lRes = solution(bNode.left);
		var rRes = solution(bNode.right);
		res[0] = lRes[1]+rRes[1]+bNode.val; //抢了父节点就不抢两个子节点
		res[1] = Math.max(lRes[0],lRes[1])+Math.max(rRes[0],rRes[1]); //不抢父节点，就根据两个子节点分别抢与不抢的最大值求和
		return res;
	}
}

// 判断一棵树是否是另一棵树的子结构
binaryTree.isSubConstruct = (bNode1,bNode2) => {
	var result = false;
	if(bNode1&&bNode2){
		if(bNode1.val===bNode2.val){
			result = hasSameNode(bNode1,bNode2);
		}
		if(!result){
			result = arguments.callee(bNode1.left,bNode2);
		}
		if(!result){
			result = arguments.callee(bNode1.right,bNode2);
		}
	}
	return result;
}

// 判断一棵树是否是另一棵树的子结构(具有相同根节点)
binaryTree.hasSameNode = (bNode1,bNode2) => {
	if(bNode2==null)
		return true;
	else{
		return (bNode1.val===bNode2.val)&&diff(bNode1.left,bNode2.left)&&diff(bNode1.right,bNode2.right);
	}
}

// 先序中序还原树
binaryTree.rebuildTree = (frontArr,midArr) => {
	let start = 0,end = midArr.length-1;
	function solution(start,end){
		if(start>end)
			return null;
		var bNode = new BNode(frontArr[0]);
		frontArr.shift();
		var index = midArr.indexOf(bNode.val);
		if(start===index||end===index)
			return bNode;
		if(index>start)
			bNode.left = arguments.callee(start,index-1);
		if(end>index)
			bNode.right = arguments.callee(index+1,end);
		return bNode;
	}
	return solution(start,end);
}

// 寻找两个节点的共同最近父节点
binaryTree.findCommonParentNode = (bNode,bNode1,bNode2) => {
	if(bNode.val === bNode1.val||bNode.val === bNode2.val)
		return bNode;
	var x1InLeft,x2InLeft;
	x1InLeft = binaryTree.findNodeInTree(bNode.left,bNode1);
	x2InLeft = binaryTree.findNodeInTree(bNode.left,bNode2);
	if(x1InLeft&&x2InLeft)
		return arguments.callee(bNode.left,bNode1,bNode2);
	else if(!x1InLeft&&!x2Inright)
		return arguments.callee(bNode.right,bNode1,bNode2);
	else
		return bNode;
}

//深度遍历
binaryTree.dfs = (root) => {
	let result = [];
	result.push(root);
	while(result.length){
		var bNode = result.pop();
		console.log(bNode.val);
		if(bNode.right)
			result.push(bNode.right);
		if(bNode.left)
			result.push(bNode.left);
	}
}

//广度遍历
binaryTree.bfs = (root) => {
	let result = [];
	result.push(root);
	while(result.length>0){
		var bNode = result.shift();
		console.log(bNode.val);
		if(bNode.left)
			result.push(bNode.left);
		if(bNode.right)
			result.push(bNode.right);
	}
}

// 先序遍历
binaryTree.preOrder = (bNode) => {
	if(bNode){
		console.log(bNode.val);
		arguments.callee(bNode.left);
		arguments.callee(bNode.right);
	}
}

//中序遍历
binaryTree.midOrder = (bNode) => {
	if(bNode){
		arguments.callee(bNode.left);
		console.log(bNode.val);
		arguments.callee(bNode.right);
	}	
}

// 后序遍历
binaryTree.afterOrder = (bNode) => {
	if(bNode){
		arguments.callee(bNode.left);
		arguments.callee(bNode.right);
		console.log(bNode.val);
	}
}

export default binaryTree;