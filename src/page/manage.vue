<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%; min-width:100px">
	  		<el-col :span="4"  style="min-height: 1000px; min-width:120px">
				<el-menu router style="min-height: 1000px;"  background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
					<el-menu-item index="manage" style="min-height: 60px;"><i class="el-icon-menu"></i>首页</el-menu-item>
					<el-submenu index="2" v-for="item in obj" :key="item.menuId">
						<template slot="title" ><i class="el-icon-document"></i>{{item.name}}</template>
						<el-menu-item  v-for="items in item.list" :key="items.menuId" :index=items.url>{{items.name}}</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<el-row>
					<headTop></headTop>
				</el-row>
				<div style="height: 3%"> </div> 	
				<el-row>
					<router-view></router-view>
				</el-row>
			</el-col>	
			
		</el-row>

  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css';
import MyInterFace from '@/api/getData'
import headTop from '../components/headTop'
export default {
	data: function(){
		return {
			obj:'',
			myInterFace:''
		}
	},
	components:{
		headTop,
	},
	computed: {
		
	},
	methods: {
		async getMenu(){
			this.obj = await this.myInterFace.getnavmenu();
			this.obj = this.obj.data.data;
		},
	},
	mounted(){
		this.myInterFace = new MyInterFace();
		this.getMenu();
	}
}
</script>

<style lang="less" scoped>
	@import '../style/mixin';
	.manage_page{
		height: 1000px;
	}
	.el-submenu .el-menu-item {
  			min-width: 0;
  			padding:0;
	}

</style>
