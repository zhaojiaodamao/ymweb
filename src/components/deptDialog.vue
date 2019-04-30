
<template>
    <div class="fillcontain">
        <el-tree :data="dialogdata" :props="treeProps" :default-expand-all=true @node-click="handleNodeClick"></el-tree>
        <el-row class="row_margin" >
            <el-col :span="5" :offset="12">
                <el-button size="small" type="primary" @click="onDialogSure">确定</el-button>
            </el-col>
            <el-col :span="5" :offset="2">
                <el-button size="small" type="warning" @click="onDialogCancer">取消</el-button>
            </el-col>
        </el-row>
    </div>
</template>


<script>
    
    import MyInterFace from '@/api/getData'
    import myTree from '../common/myTree'

    export default {
        data: function(){
            return {
                dialogdata:[],
                treeProps: {
                  id:'',
                  children: 'children',
                  label: 'label'
                },
                AddRoleSelectNode : {},
                myInterFace:'',
            }
        },
    	components: {
            
    	},

        methods: { 
            onDialogSure:function(){
                if(this.AddRoleSelectNode === null){
                    return;
                }
                this.$emit("listenToDialogData", this.AddRoleSelectNode);
                this.$emit("listenToDialogClose", false);
                this.AddRoleSelectNode = null;
            },
            onDialogCancer:function(){
                this.$emit("listenToDialogClose", false);
                this.AddRoleSelectNode = null;
            },
            handleNodeClick(data){
               
            },

            async getdialogdept(){
                let obj = await this.myInterFace.getroledept();
                let mytree = new myTree();
                this.dialogdata = mytree.getTree(obj.data.data);
            },

            handleNodeClick(data){
               this.AddRoleSelectNode = data;
               console.log(data);
            },

        },
        mounted(){
            this.myInterFace = new MyInterFace();
            this.getdialogdept();
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
</style>
