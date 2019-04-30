
<template>
    <div class="fillcontain">
        <div style="height: 80%;">
	        <el-scrollbar  style="height: 100%;"> <!-- 滚动条 -->
	        	<router-view></router-view>
	        </el-scrollbar>	
	    </div>    
    </div>
</template>


<script>
    import menuMain from './menu/menuMain'
    export default {
        data: function(){
            return {
            }
        },
    	components: {
            menuMain,
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
