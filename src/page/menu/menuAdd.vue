
<template>
    <div class="fillcontain">
        <div class="myborder">
            <div>
                <el-row>
                    <el-col style="background: #EFF2F7; padding:10px 15px;" >
                     新增
                    </el-col>
                </el-row>
            </div>
            <div class="myborder_down">
            </div>
            <div>
                <el-row  type="flex"  align="middle" class="row_margin">
                    <el-col :span="3" :offset="3">
                        类型
                    </el-col>
                    <el-col :span="5">
                        <el-radio-group v-model="radio" @change="radioClick">
                            <el-radio v-model="radio" label="1">目录</el-radio>
                            <el-radio v-model="radio" label="2">菜单</el-radio>
                            <el-radio v-model="radio" label="3">按钮</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-row>
                <el-row  type="flex"  align="middle" class="row_margin">
                    <el-col :span="3" :offset="3">
                        菜单名称
                    </el-col>
                    <el-col :span="5">
                        <el-input placeholder="菜单名称或按钮名称" v-model="menuName"> </el-input>
                    </el-col>
                </el-row>
                <el-row  type="flex"  align="middle" class="row_margin">
                    <el-col :span="3" :offset="3">
                        上级菜单
                    </el-col>
                    <el-col :span="5">
                        <el-input readonly v-model="parentMenu"> </el-input>
                    </el-col>
                </el-row>

                <!-- 菜单 -->
                <div v-show="showurl">
                    <el-row  type="flex"  align="middle" class="row_margin">
                        <el-col :span="3" :offset="3">
                            菜单URL
                        </el-col>
                        <el-col :span="5">
                            <el-input placeholder="菜单URL" v-model="url"> </el-input>
                        </el-col>
                    </el-row>
                </div>  
                <div v-show="showpre">
                    <el-row  type="flex"  align="middle" class="row_margin">
                        <el-col :span="3" :offset="3">
                            授权标识
                        </el-col>
                        <el-col :span="5">
                            <el-input placeholder="多个逗号分隔,如:user:list,user:create" v-model="perms"> </el-input>
                        </el-col>
                    </el-row>
                </div>

                <div v-show="shownum">
                    <el-row  type="flex"  align="middle" class="row_margin">
                        <el-col :span="3" :offset="3">
                            排序号
                        </el-col>
                        <el-col :span="5">
                            <el-input v-model="orderNum"> </el-input>
                        </el-col>
                    </el-row>
                </div>
                <div v-show="showicon">
                    <el-row  type="flex"  align="middle" class="row_margin">
                        <el-col :span="3" :offset="3">
                            菜单图标
                        </el-col>
                        <el-col :span="5">
                            <el-input placeholder="菜单图标" v-model="icon"> </el-input>
                        </el-col>
                    </el-row>
                </div>

                 <el-row class="row_margin">
                    <el-col :span="3" :offset="3">
                        <router-link to="/manage/menu">
                            <el-button type="primary" @click="onsure">确定</el-button>
                        </router-link>
                    </el-col>
                    <el-col :span="3">
                        <router-link to="/manage/menu">
                            <el-button type="warning" @click="onback">返回</el-button>
                        </router-link>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    import MyInterFace from '@/api/getData'

    export default {
        data: function(){
            return {
                myInterFace:'',
                radio: '1',
               	showurl:false,
               	showpre:false,
               	shownum:true,
               	showicon:true,
                menuName:'',
                parentMenu:'',
                url:'',
                perms:'',
                orderNum:'',
                icon:'',
            }
        },
    	components: {
           
    	},

        methods: { 
            radioClick(value){
            	this.radio = value;
            	if(value === '1'){
            		this.showurl = false;
	               	this.showpre = false;
	               	this.shownum = true;
	               	this.showicon = true;
            	}else if(value === '2'){
            		this.showurl = true;
	               	this.showpre = true;
	               	this.shownum = true;
	               	this.showicon = true;
            	}else if(value === '3'){
            		this.showurl = false;
	               	this.showpre = false;
	               	this.shownum = false;
	               	this.showicon = true;
            	}
            },

            async onsure(){
                
            },

            async onback(){
                
            }

        },
        mounted(){
            this.myInterFace = new MyInterFace();
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