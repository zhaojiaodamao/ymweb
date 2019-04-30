import fetch from '@/config/fetch'

/**
 * 登陆
 */

/*
export const login = data => fetch('/login', data, 'POST');

export const getnavmenu = () => fetch('/menu/nav');

export const getrolelist = data => fetch('/role/list',data,'POST');

export const deleterole = data => fetch('/role/delete',data, 'POST');

export const getroledept = () =>  fetch('/dept/select');

export const getmenulist = () =>  fetch('/menu/list');

export const addrole = data=>  fetch('/role/save',data,'POST');

export const getroleinfobyid = data=>  fetch(data);

export const updaterole = data=>  fetch('/role/update',data,'POST');

export const getAdminInfo = () => fetch('/admin/info');

*/

/**
 * 获取用户信息
 */


/**
 * 退出
 */

export const signout = () => fetch('/admin/singout');


export default class MyInterFace{
	constructor(){
		
	}

	login(data){return  fetch('/login', data, 'POST');}

	getnavmenu(){return fetch('/menu/nav');}

	getrolelist(data){return fetch('/role/list',data,'POST');}

	deleterole(data){return fetch('/role/delete',data, 'POST');}

	getroledept(){return fetch('/dept/select');}

	getmenulist(){return fetch('/menu/list');}

	addrole(data){return fetch('/role/save',data,'POST');}

	getroleinfobyid(data){return fetch(data);}

	updaterole(data){return fetch('/role/update',data,'POST');}

	getAdminInfo(){return fetch('/admin/info');}

	getdeptlist(){return fetch('/dept/list');}

	upload(data){return fetch('/file/upload',data,'POST');}

	getmenulist(){return fetch('/menu/list');}

	deletemune(data){return fetch('/mune/delete',data,'POST');}
}

