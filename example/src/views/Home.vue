<template>
  <div style="padding: 50px">
    <el-pagination
      v-rq="page"
      v-rq:size.replace="pageSize"
      :current-page.sync="page"
      :page-size.sync="pageSize"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next"
      :total="1000"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    >
    </el-pagination>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      page: 1,
      pageSize: 10,
      tableData: [],
    }
  },
  created() {
    console.log('created: page,size is ', this.page, this.pageSize)
    // this.getData() can not getData on created
  },
  mounted() {
    console.log('mounted: page,size is ', this.page, this.pageSize)
    this.getData() // you can getData on mounted
  },
  methods: {
    getData() {
      const tableData = []
      for (let i = 0; i < this.pageSize; i++) {
        tableData.push({
          date: `2016-05-${i + this.page * this.pageSize}`,
          name: '王小虎',
          address: `上海市普陀区金沙江路 ${i + this.page * this.pageSize} 弄`,
        })
      }
      this.tableData = tableData
    },
    handleSizeChange() {
      this.page = 1
      this.getData()
    },
    handleCurrentChange() {
      this.getData()
    },
  },
}
</script>
