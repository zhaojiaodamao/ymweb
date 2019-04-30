import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const userManage = r => require.ensure([], () => r(require('@/page/userManage')), 'userManage');

const role = r => require.ensure([], () => r(require('@/page/role')), 'role');
const roleAdd = r => require.ensure([], () => r(require('@/page/role/roleAdd')), 'roleAdd');
const roleUpdate = r => require.ensure([], () => r(require('@/page/role/roleUpdate')), 'roleUpdate');
const roleMain = r => require.ensure([], () => r(require('@/page/role/roleMain')), 'roleMain');
const test = r => require.ensure([], () => r(require('@/page/role/test')), 'test');

const menu = r => require.ensure([], () => r(require('@/page/menu')), 'menu');
const menuMain = r => require.ensure([], () => r(require('@/page/menu/menuMain')), 'menuMain');
const menuAdd = r => require.ensure([], () => r(require('@/page/menu/menuAdd')), 'menuAdd');
const menuUpdate = r => require.ensure([], () => r(require('@/page/menu/menuUpdate')), 'menuUpdate');

const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children:[{
			path: '',
			component: home,
			meta:[]
		},{
			path: 'user',
			component: userManage,
			meta: ['系统管理', '管理员管理'],
		},{
			path: 'role',
			component: role,
			meta: ['系统管理', '角色管理'],
			children:[
			{
				path:"",
				component: roleMain,
				meta: ['系统管理', '角色管理'],
			},{
				path: 'roleUpdate',
				component: roleUpdate,
				meta: ['角色管理', '修改角色']
			},{
				path: 'roleAdd',
				component: roleAdd,
				meta: ['角色管理', '添加角色'],
			}]
		},{
			path: 'menu',
			component: menu,
			meta: ['系统管理', '菜单管理'],
			children:[
			{
				path:"",
				component: menuMain,
				meta: ['系统管理', '菜单管理'],
			},{
				path:"menuAdd",
				component: menuAdd,
				meta: ['菜单管理', '添加菜单'],
			},{
				path:"menuUpdate",
				component: menuUpdate,
				meta: ['菜单管理', '修改菜单'],
			}]
		}]
	}
]

export default new Router({
  mode:'hash',	
  routes,
  strict: process.env.NODE_ENV !== 'production'
})
