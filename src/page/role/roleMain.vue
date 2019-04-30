
<template>
    <div class="fillcontain">
        <div style="height: 80%;">
            <el-row>
                <el-col :span="24">
                    <el-col :span="6" :offset="1">
                        <div class="grid-content bg-purple">
                             <el-input placeholder="请输入角色名称" v-model="roleName"> <i slot="prefix" class="el-input__icon el-icon-search"></i> </el-input>
                        </div>
                    </el-col>
                    <el-col :span="10" :offset="1">
                        <div class="grid-content">
                            <el-button type="primary" icon="el-icon-search" @click="onquery">查询</el-button>
                            <router-link to="/manage/role/roleAdd">
                                <el-button type="primary" icon="el-icon-circle-plus-outline">新增</el-button>
                            </router-link>
                            <router-link to @click.native="toUpdatePage">
                                <el-button type="primary" icon="el-icon-edit-outline">修改</el-button>
                            </router-link>
                            <el-button type="primary" icon="el-icon-delete" @click="ondelete">删除</el-button>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                        </div>
                    </el-col>
                </el-col>
            </el-row>
            <div class="row_margin"> </div>
            <el-row>
                <el-col :span="22" :offset="1">
                    <el-table ref="multipleTable" border :data="output" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column type="selection"></el-table-column>                
                        <el-table-column prop="roleId"  label="角色ID"> </el-table-column>
                        <el-table-column prop="roleName"  label="角色名称"> </el-table-column>
                        <el-table-column prop="deptName"  label="所属部门"> </el-table-column>
                        <el-table-column prop="remark"  label="备注"> </el-table-column>
                        <el-table-column prop="createTime" label="日期"></el-table-column>       
                    </el-table>    
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22" :offset="1" class="el-mycol">
                    <el-row>
                        <el-col :span="8" :offset="8">
                            <el-pagination
                                  @size-change="updataPageSize"
                                  @current-change="goToWhitchPage"
                                  :current-page="currentPage"
                                  :page-sizes="[10, 20, 30, 40,50]"
                                  :page-size="10"
                                  layout="total, sizes, prev, pager, next, jumper"
                                  :total="totalItem">
                            </el-pagination>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import myArray from '../../common/myArray'
    import bus from '../../common/eventBus'
    import MyInterFace from '@/api/getData'

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
            }
        },
    	components: {

    	},

        methods: { 
            async getrole(){
                this.all = await this.myInterFace.getrolelist({limit: this.input.limit.toString(), page: this.input.page.toString()});
                this.totalItem = this.all.data.data.totalCount;
                console.log(this.all);
                this.all=this.all.data.data.list;
                console.log(this.all);
                this.output = this.all;
            },
            onquery:function(){
                var pthis = this;
                if(pthis.roleName !== ''){
                    pthis.output = [];
                    this.all.forEach(function(e){ 
                        if(e.roleName === pthis.roleName){
                            pthis.output.push(e);
                            console.log(pthis.output);
                        }
                    })
                }else{
                     this.getrole();
                }   
            },
            ondelete:function(){
                 var pthis = this;
                 if(this.isselect()){
                    if(pthis.multipleSelection.length > 0){
                        this.$confirm('确定要删除选中的记录?', '提示',{
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then( async ()=>{
                            let roleArray = [];
                            pthis.multipleSelection.forEach(function(e){
                                let roleId = e.roleId;
                                roleArray.push(roleId);    
                            });

                            const ret = await this.myInterFace.deleterole(roleArray);
                            if(ret.data.code === 0){
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });

                                let myarray = new myArray();
                                console.log(myarray);
                                pthis.output = myarray.removeArray(pthis.output, pthis.multipleSelection);
                                this.onquery();
                                
                            }else{
                                this.$message({
                                    type: 'success',
                                    message: ret.data.msg
                                });
                            }  
                        }).catch( async ()=>{
                            this.$message({
                                type: 'info',
                                message: '已取消删除'
                            });    
                        });
                    }
                }
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
            handleSelectionChange:function(val){
                  this.multipleSelection = val;
                  console.log(val)
            },

            updataPageSize(val){
                this.input.limit = val;
                console.log(this.input.limit);
                this.getrole();
            },
            goToWhitchPage(val){
                console.log(`当前页: ${val}`);
                this.input.page=val;
                this.getrole();
            },

            toUpdatePage:function(){
                if(this.isselect()){
                    if(this.multipleSelection.length >1){
                            this.$alert('只能选择一条记录', '提示', {
                            confirmButtonText: '确定',
                            type: 'warning'
                        });
                    }else{
                        console.log(this.multipleSelection[0]);
                        this.$router.push({path:'/manage/role/roleUpdate',query:this.multipleSelection[0]});
                    }
                }
            },
        },
        mounted(){
            this.myInterFace = new MyInterFace();
            this.getrole();
            var pthis = this;
            bus.$on('query',function(message){
                pthis.onquery();
            })
        }
    }
</script>

<style lang="less">
    @import '../../style/mixin.less';
</style>