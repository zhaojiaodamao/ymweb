
<template>
    <div class="fillcontain">
        <div class="myborder">
            <div>
                <el-row>
                    <el-col style="background: #EFF2F7; padding:10px 15px;" >
                         修改
                    </el-col>
                </el-row>
            </div>
            <div class="myborder_down"></div>
            <div>
                <el-row  type="flex"  align="middle" class="row_margin">
                    <el-col :span="3" :offset="3">
                         角色名称
                    </el-col>
                    <el-col :span="6" :offset="1" :pull="1">
                         <el-input placeholder="角色名称"  v-model="auroleName"> </el-input>
                    </el-col>
                </el-row >
                <el-row  type="flex"  align="middle" class="row_margin">
                    <el-col :span="3" :offset="3">所属部门</el-col>
                    <el-col :span="6" :offset="1" :pull="1">
                        <el-input  readonly  placeholder="所属部门" v-model="audept" @click.native="getdialogdept"></el-input>
                    </el-col>
                </el-row>
                <el-row  type="flex"  align="middle" class="row_margin">
                    <el-col :span="3" :offset="3">备注</el-col>
                    <el-col :span="6" :offset="1" :pull="1">
                         <el-input placeholder="备注" v-model="remark"> </el-input>
                    </el-col>
                </el-row>
                <el-row  type="flex"  align="middle" class="row_margin">
                    <el-col :span="5" :offset="3">
                        <b>功能权限</b>
                    </el-col>
                    <el-col :span="5">
                        <b>数据权限</b>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="5" :offset="3">
                        <el-tree :data="funcpre" show-checkbox default-expand-all node-key="id" ref="Functree" highlight-current :props="treeProps"></el-tree>
                    </el-col>

                    <el-col :span="5">
                        <el-tree :data="datapre" show-checkbox default-expand-all expand-on-click-node node-key="id" ref="Datatree" highlight-current :props="treeProps"></el-tree>
                    </el-col>
                </el-row>
                
                <el-row class="row_margin">
                    <el-col :span="2" :offset="8">
                        <router-link to="/manage/role">
                            <el-button type="primary" @click="onsure">确定</el-button>
                        </router-link>
                    </el-col>
                    <el-col :span="2">
                        <router-link to="/manage/role">
                            <el-button type="warning" @click="onback">返回</el-button>
                        </router-link>
                    </el-col>
                </el-row>    
                <el-dialog title="选择部门" :visible.sync="dialogshow" width="30%">
                    <deptDialog @listenToDialogClose="changeDialogVisible" @listenToDialogData="getDialogData" /> 
                </el-dialog> 
            </div>
        </div>
    </div>
</template>

<script>
    import MyInterFace from '@/api/getData'
    import bus from '../../common/eventBus';
    import myFuncPreTree from '../../common/myFuncPreTree'
    import myTree from '../../common/myTree'
    import deptDialog from '../../components/deptDialog'

    export default {
        data: function(){
            return {
                auroleName: '',
                audept:'',
                remark:'',
                funcpre: [],
                datapre:[],
                treeProps: {
                      id:'',
                      children: 'children',
                      label: 'label'
                },
                multipleSelection:{},
                dialogshow:false,
                UpdateRoleSelectNode:{},
                myInterFace:''
            }
        },
    	components: {
            deptDialog
    	},

        methods: { 
            async onsure (){
                if(this.auroleName === ''){
                    this.$alert('角色名称不能为空', '提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    });
                    return;
                }
                if(this.audept === ''){
                    this.$alert('单位不能为空', '提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    });
                    return;
                }
                let menuIdList = this.$refs.Functree.getCheckedKeys();
                let deptIdList = this.$refs.Datatree.getCheckedKeys();
                let req = {};
                req.roleId = this.multipleSelection.roleId;
                req.roleName = this.auroleName;
                req.deptId = this.UpdateRoleSelectNode.id;
                req.remark = this.remark;
                req.menuIdList = menuIdList;
                req.deptIdList = deptIdList;

                let obj = await this.myInterFace.updaterole(req);

                this.auroleName = '';
                this.audept = '';
                this.remark = '';
                console.log(obj);
                if(obj.data.code === 0){
                     this.$message({
                                type: 'success',
                                message: '修改角色成功!'
                            });
                    bus.$emit('query','');
                }else{
                    this.$message({
                                type: 'error',
                                message: '修改角色失败!'
                            });
                }
            },
            onback:function(){

            },
            async getdialogdept(){
                this.dialogshow=true;
            },
            async getFuncAndDataPre(){
                let obj =  await this.myInterFace.getmenulist();
                let preTree = new myFuncPreTree();
                this.funcpre = preTree.getTree(obj.data.data);
                console.log(this.funcpre);

                obj = await this.myInterFace.getroledept();
                let mytree = new myTree();
                this.datapre = mytree.getTree(obj.data.data);
            },
            async init(){
                this.multipleSelection = this.$route.query;
                console.log('update:'+this.multipleSelection);
             
                let url = this.multipleSelection.roleId;
                url = "/role/info/"+url;
                let ret = await this.myInterFace.getroleinfobyid(url);

                this.auroleName = ret.data.data.roleName;
                this.audept = ret.data.data.deptName;
                this.remark = ret.data.data.remark;
                let menuIdList = ret.data.data.menuIdList;
                let deptIdList = ret.data.data.deptIdList;

                this.getFuncAndDataPre();

                this.$refs.Functree.setCheckedKeys(menuIdList);
                this.$refs.Datatree.setCheckedKeys(deptIdList);
            },
            changeDialogVisible(flag){
                this.dialogshow = false;
            },
            getDialogData(obj){
                this.UpdateRoleSelectNode = obj;
                console.log(obj);
                this.audept = this.UpdateRoleSelectNode.label;
            },
        },
        mounted(){
            this.myInterFace = new MyInterFace();
            this.init();
        }
    }
</script>

<style lang="less">
    @import '../../style/mixin.less';
     .myborder{
        border-style:solid;
        border-color:#DDDDDD;
        border-width:2px;
        margin-left:20px;
        margin-right:20px;
        padding-bottom:20px;

    }
    .myborder_down{
        border-style:solid;
        border-color:#DDDDDD; 
        border-width:1px
    }
</style>