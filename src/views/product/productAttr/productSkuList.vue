<template> 
  <div class="app-container">
    <el-card class="operate-container" shadow="never">

      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">数据列表</span>
      <el-button
        class="btn-add"
        @click="addProductAttr()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="productAttrTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="属性名称" width="140" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="商品类型" width="140" align="center">
          <template slot-scope="scope">{{$route.query.cname}}</template>
        </el-table-column>
        <el-table-column label="可选值列表" align="center">
          <template slot-scope="scope">{{scope.row.input_list}}</template>
        </el-table-column>
        <el-table-column label="排序" width="100" align="center">
          <template slot-scope="scope">{{scope.row.sort_num}}</template>
        </el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="getSkuValueList(scope.$index, scope.row)">值列表
            </el-button>
            <el-button
              size="mini"
              type="warning"
              @click="handleUpdate(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-select
        size="small"
        v-model="operateType" placeholder="批量操作">
        <el-option
          v-for="item in operates"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleBatchOperate()"
        type="primary"
        size="small">
        确定
      </el-button>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.list_row"
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.page"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      :title="isEdit?'编辑SKU':'添加SKU'"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form :model="skuData"
               ref="adminForm"
               label-width="150px" size="small">
        <el-form-item label="SKU名称：">
          <el-input v-model="skuData.name" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="skuData.sort_num" style="width: 250px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {fetchList, deleteProductAttr,createProductAttr,updateProductAttr} from '@/api/productAttr'
  const defaultSku = {
    id: null,
    name: null,
    sort_num: null,
    cate_id:null,
    type:null
  };
  export default {
    name: 'productAttrList',
    data() {
      return {
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          list_row: 5,
          type: this.$route.query.type,
          cid:this.$route.query.cid
        },
        operateType: null,
        multipleSelection: [],
        dialogVisible: false,
        skuData: Object.assign({}, defaultSku),
        isEdit: false,
        operates: [
          {
            label: "删除",
            value: "deleteProductAttr"
          }
        ]
      }
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        this.listLoading = true;
        fetchList(this.$route.query.cid,this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.list;
          this.total = response.total;
        });
      },
      addProductAttr() {
        this.dialogVisible = true;
        this.isEdit = false;
        this.skuData.name="";
        this.skuData.sort_num=0;
        this.skuData.id=0;
        this.skuData.cate_id=this.listQuery.cid;
        this.skuData.type=this.listQuery.type;
      },
      handleUpdate(index, row) {
        this.dialogVisible = true;
        this.isEdit = true;
        this.skuData = Object.assign({},row);
      },
      handleDialogConfirm() {
        this.$confirm('是否要确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.isEdit) {
            updateProductAttr(this.skuData).then(response => {
              this.$message({
                message: '修改成功！',
                type: 'success'
              });
              this.dialogVisible =false;
              this.getList();
            })
          } else {
            createProductAttr(this.skuData).then(response => {
              this.$message({
                message: '添加成功！',
                type: 'success'
              });
              this.dialogVisible =false;
              this.getList();
            })
          }
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleBatchOperate() {
        if (this.multipleSelection < 1) {
          this.$message({
            message: '请选择一条记录',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        if (this.operateType !== 'deleteProductAttr') {
          this.$message({
            message: '请选择批量操作类型',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        let ids = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].id);
        }
        this.handleDeleteProductAttr(ids);
      },
      handleSizeChange(val) {
        this.listQuery.page = 1;
        this.listQuery.list_row = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList();
      },
      getSkuValueList(index, row) {
        this.$router.push({path: '/product/productskuvalue',query:{sid:row.id,cname:row.name,type:0,cid:this.listQuery.cid}})
      },
      handleDeleteProductAttr(ids) {
        this.$confirm('是否要删除该属性', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = new URLSearchParams();
          data.append("ids", ids);
          deleteProductAttr(data).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            });
            this.getList();
          });
        });
      },
      handleDelete(index, row) {
        let ids = [];
        ids.push(row.id);
        this.handleDeleteProductAttr(ids);
      },
    },
    filters: {
      inputTypeFilter(value) {
        if (value === 1) {
          return '从列表中选取';
        } else {
          return '手工录入'
        }
      },
      selectTypeFilter(value) {
        if (value === 1) {
          return '单选';
        } else if (value === 2) {
          return '多选';
        } else {
          return '唯一'
        }
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>


