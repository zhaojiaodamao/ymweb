
<template>
    <div class="fillcontain">
        <div style="height: 80%;">
            <el-row>
            	 <el-col :span="24">
                    <el-col :span="24" :offset="1">
                        <div class="grid-content">
                          	<router-link to="/manage/menu/menuAdd">
                            	<el-button type="primary" icon="el-icon-circle-plus-outline">新增</el-button>  
                            </router-link>	
                            <router-link to="/manage/menu/menuUpdate">		
                            	<el-button type="primary" icon="el-icon-edit-outline">修改</el-button>  
                            </router-link>	           
                            <el-button type="primary" icon="el-icon-delete" @click="delMenu">删除</el-button>
                        </div>
                    </el-col>
                </el-col>
            </el-row>
            <div class="row_margin"> </div>
            <el-row>
                <el-col :span="22" :offset="1">
                     <tree-table @listenToTreeTable="getSelectData" :data="output" :columns="columns" border/>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import myArray from '../../common/myArray'
    import bus from '../../common/eventBus'
    import MyInterFace from '@/api/getData'
    import treeTable from '@/components/TreeTable/treeTable'
    import cMenulistTree from '../../common/menulistTree'

    export default {
        data: function(){
            return {
               MyInterFace:'',
               listTree:'',
               output:[],
               columns:[{
                          text: '菜单ID',
                          value: 'menuId',
                        },
                        {
                          text: '菜单名称',
                          value: 'name',
                          width: 200
                        },
                        {
                          text: '上级菜单',
                          value: 'parentName'
                        },
                        {
                          text: '图标',
                          value: 'icon'
                        },
                        {
                          text: '类型',
                          value: 'typeName'
                        },
                        {
                          text: '排序号',
                          value: 'orderNum'
                        },
                        {
                          text: '菜单url',
                          value: 'url'
                        },
                        {
                          text: '授权标识',
                          value: 'perms'
                        }
                ],
                multipleSelection:[],
            }
        },
    	components: {
            treeTable,
    	},

        methods: { 
            async getMuneList(){
              var ret = await  this.myInterFace.getmenulist();
              var menulist = ret.data.data;
              this.output = this.listTree.getTree(menulist);
              console.log(ret);
            },
            getSelectData(obj){
              this.multipleSelection = obj;

            },
            isselect:function(){
              var bselect = false;
              if(this.multipleSelection.length ===0){
                  this.$alert('请选择一条记录', '提示', {
                      confirmButtonText: '确定',
                      type: 'warning'
                  });
              }else{
                  bselect = true
              }

              return bselect;
            },
            async delMenu(){
              if(this.isselect() == true){
                var req = this.multipleSelection[0].menuId;
                var ret = await  this.myInterFace.deletemune({menuId:req});
                if(ret.data.code === 0){
                  this.$message({
                              type: 'success',
                              message: ret.data.msg
                          });
                    
                }else{
                    this.$message({
                                type: 'error',
                                message: ret.data.msg
                            });
                }
              }
            }
        },
        mounted(){
            this.listTree = new cMenulistTree();
            this.myInterFace = new MyInterFace();
            this.getMuneList();
        }
    }
</script>

<style lang="less">
    @import '../../style/mixin.less';
</style>