
export default class myArray{

	constructor(){

	}

	removeArray(var1,var2){
		for( var i = 0; i < var2.length; ++i){
			for( var j = 0; j < var1.length; ++j){
				var s = var1[i];
				var p = var2[j];
				if(s === p){
					var1.splice(j,1);
				}
			}
		}

		return var1;
	}
}



