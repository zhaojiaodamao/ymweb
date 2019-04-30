export default class myTree{

	constructor(){
		this.obj = [];
		this.num = 0;
	}

	getTree(list){
		for(var i = 0 ; i < list.length; ++i){
			if(list[i].parentName === null){
				var pItem = {label:list[i].name,id:list[i].deptId};
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
				var pId = pItem.id;
				if(pId === list[i].parentId){
					this.num++;
					var node = {label:list[i].name,id:list[i].deptId}; 	
					this.digui(node,list);
					child.push(node);
				}	
			}

			pItem.children = child;
		}	
	}

}
