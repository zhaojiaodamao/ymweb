export default class myExpandTree{

	constructor(){
		this.obj = [];
		this.num = 0;
	}

	getTree(list){
		for(var i = 0 ; i < list.length; ++i){
			if(list[i].parentName === null){
				var pItem = {deptId:list[i].deptId,parentId:list[i].parentId,name:list[i].name,parentName:list[i].parentName,orderNum:list[i].orderNum};
				this.obj.push(pItem);
				this.num++;
				this.digui(pItem,list);	
			}
		}

		return this.obj;	
	}

	digui(pItem, list){
		var child = [];
		if(this.num < list.length){
			for(var i = 0 ; i < list.length; ++i){
				var pId = pItem.deptId;
				if(pId === list[i].parentId){
					this.num++;
					var node = {deptId:list[i].deptId,parentId:list[i].parentId,name:list[i].name,parentName:list[i].parentName,orderNum:list[i].orderNum}; 	
					this.digui(node,list);
					child.push(node);
				}	
			}

			pItem.children = child;
		}	
	}

}
