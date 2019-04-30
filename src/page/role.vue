
<template>
    <div class="fillcontain" >
        <div style="height: 80%;">
	        <el-scrollbar  style="height: 100%;"> <!-- 滚动条 -->
	        	<router-view></router-view>
	        </el-scrollbar>	
	    </div>    
    </div>
</template>


<script>
    import roleMain from './role/roleMain'
    import roleUpdate from './role/roleUpdate'
    import roleAdd from './role/roleAdd'
    export default {
        data: function(){
            return {
            }
        },
    	components: {
            roleMain,
            roleUpdate,
            roleAdd
    	},

        methods: { 
            
        },
        mounted(){
        }
    }
</script>

<style lang="less">
	@import '../style/mixin';

</style>
