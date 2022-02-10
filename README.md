# vue-route-query
自动更新路由参数的 Vue 指令, v-rq directive for automatically modifying router query  

# Installing

Using npm:  

```bash 
npm install --save vue-route-query
```


Using yarn:  

```bash
yarn add vue-route-query
```

# Usage

Use directive:  

```js
// use directive
import VueRouteQuery from 'vue-route-query'
Vue.use(VueRouteQuery)
```

* 默认用法：`<div v-rq="query.page" /> `根据传入的值支持自动转换为 string,number,boolean 不支持其它类型，可通过修饰符修改值类型
* 多个参数：`<div v-rq:page="query.page" v-rq:size="query.size">`
* 修饰符 replace: `<div v-rq:page.replace="query.page" />` replace 路由而不是 push
* 修饰符 number: `<div v-rq:page.number="query.page" />` 指定数据类型为 number
* 修饰符 boolean: `<div v-rq:enable.boolean="query.enable" />` 指定数据类型为 boolean
* 修饰符 popstate: `<div v-rq.popstate="getData" />` 处理浏览器后退事件


Example:

```vue
<template>
  <div style="padding: 50px">
    <el-pagination
      v-rq="page"
      v-rq:size.replace="pageSize"
      v-rq.popstate="getData"
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
```