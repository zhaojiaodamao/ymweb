export default class menulistTree{

	constructor(){
		this.obj = [];
		this.num = 0;
	}

	setTypeName(item){
		if(item.type === 0){
			item.typeName = "目录";
		}else if(item.type === 1){
			item.typeName = "菜单";
		}else if(item.type === 2){
			item.typeName = "按钮";
		}
	}

	getTree(list){
		for(var i = 0 ; i < list.length; ++i){
			if(list[i].parentName === null){
				var pItem = list[i];
				this.setTypeName(pItem);
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
				var pId = pItem.menuId;
				if(pId === list[i].parentId){
					this.num++;
					var node = list[i]; 
					this.setTypeName(node);	
					this.digui(node,list);
					child.push(node);
				}	
			}

			pItem.children = child;
		}	
	}

}
