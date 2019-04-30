
<template>
    <div class="fillcontain">
        <div style="height: 80%;">
            <el-row>
                <el-col :span="22" :offset="1">
                     <tree-table :data="output" :columns="columns" border/>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import myArray from '../../common/myArray'
    import bus from '../../common/eventBus'
    import MyInterFace from '@/api/getData'
    import myTree from '../../common/myTree'
    import myExpandTree from '../../common/myExpandTree'
    import treeTable from '@/components/TreeTable/treeTable'

    export default {
        data: function(){
            return {
                    input:{
                    limit:10,
                    page:1 
                },
                totalPage:0,
                currentPage:1,
                totalItem:0,
                all:[],
                roleName:'',
                output:[],
                multipleSelection:[],
                myInterFace:'',
                pdept : [],
                expandtree:'',
                columns:[{
                          text: '部门ID',
                          value: 'deptId',
                          width: 200
                        },
                        {
                          text: '部门名称',
                          value: 'name'
                        },
                        {
                          text: '上级部门',
                          value: 'parentName'
                        },
                        {
                          text: '排序号',
                          value: 'orderNum'
                        }
                ]
            }
        },
        components: {
            treeTable
        },

        methods: { 
            async getdept(){
                this.all = await  this.myInterFace.getdeptlist();
                console.log(this.all);
                this.expandtree = new myExpandTree();
                var req = this.all.data;
                this.output = this.expandtree.getTree(req);
                console.log(this.output);
            },

            testclick(data,expandedRows){

            }
        },
        mounted(){
            this.myInterFace = new MyInterFace();
            this.getdept();
        }
    }
</script>

<style lang="less">
    @import '../../style/mixin.less';
</style>