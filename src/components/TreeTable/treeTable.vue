<template>
    <el-table ref="multipleTable" :data="formatData" :row-style="showRow" border   @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column> 
        <el-table-column v-for="(column, index) in columns" :key="column.value" :label="column.text" :width="column.width">
            <template slot-scope="scope">
                <span v-for="space in scope.row._level" v-if="index === 1" :key="space" class="ms-tree-space"/>
                <span v-if="iconShow(index,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
                    <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
                    <i v-else class="el-icon-minus"/>
                </span>
                <span v-if="!iconShow(index,scope.row)">
                    <span  class="ms-tree-space2"/>
                </span>
                {{ scope.row[column.value] }}
            </template>
        </el-table-column>
    </el-table>
</template>

<script>

import treeToArray from './eval'
export default {
  props: {
      data: {
        type: [Array, Object],
        required: true
      },
      columns: {
        type: Array,
        default: () => []
      },
      evalFunc: Function,
      evalArgs: Array,
      expandAll: {
        type: Boolean,
        default: false
      },
  },
  computed: {
    // 格式化数据源
    formatData: function() {
      let tmp
      if (!Array.isArray(this.data)) {
        tmp = [this.data]
      } else {
        tmp = this.data
      }

      const func = this.evalFunc || treeToArray
      const args = this.evalArgs ? Array.concat([tmp, this.expandAll], this.evalArgs) : [tmp, this.expandAll]
      console.log(args);
      console.log(func.apply(null, args));
      return func.apply(null, args)
    }
  },
  methods: {
    showRow: function(row) {
      const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true)
      row.row._show = show
      return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
    },
    // 切换下级是否展开
    toggleExpanded: function(trIndex) {
      const record = this.formatData[trIndex]
      record._expanded = !record._expanded
    },
    // 图标显示
    iconShow(index, record) {
      return (index === 1 && record.children && record.children.length > 0)
    },

    handleSelectionChange:function(val){
      //把选择的内容传给父亲组件
      this.$emit("listenToTreeTable", val);
    },
  
  }
}
</script>
<style lang="less" scoped>
  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    width:20px;
    line-height: 1;
    height: 14px;
  }
  .ms-tree-space2 {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    width:15px;
  }
  .processContainer{
    width: 100%;
    height: 100%;
  }
  table td {
    line-height: 26px;
  }

  .tree-ctrl{
    position: relative;
    cursor: pointer;
    color: red;
  }
</style>

