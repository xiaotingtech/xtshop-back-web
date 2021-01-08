<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
          size="small">
          查询搜索
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="输入搜索：">
            <el-input v-model="listQuery.order_no" class="input-width" placeholder="订单编号"></el-input>
          </el-form-item>
          <el-form-item label="收货人：">
            <el-input v-model="listQuery.receiver_keyword" class="input-width" placeholder="收货人姓名/手机号码"></el-input>
          </el-form-item>
          <el-form-item label="提交时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.create_time"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="订单状态：">
            <el-select v-model="listQuery.order_status" class="input-width" placeholder="全部" clearable>
              <el-option v-for="item in statusOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table ref="orderTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="80" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="订单编号" width="180" align="center">
          <template slot-scope="scope">{{scope.row.order_no}}</template>
        </el-table-column>
        <el-table-column label="提交时间" width="180" align="center">
          <template slot-scope="scope">{{scope.row.create_time | formatCreateTime}}</template>
        </el-table-column>
        <el-table-column label="用户账号" align="center">
          <template slot-scope="scope">{{scope.row.nickname}}</template>
        </el-table-column>
        <el-table-column label="订单金额" width="120" align="center">
          <template slot-scope="scope">￥{{scope.row.total_price}}</template>
        </el-table-column>
        <el-table-column label="支付方式" width="120" align="center">
          <template slot-scope="scope">{{scope.row.pay_type | formatPayType}}</template>
        </el-table-column>
        <el-table-column label="订单来源" width="120" align="center">
          <template slot-scope="scope">{{scope.row.source_type | formatSourceType}}</template>
        </el-table-column>
        <el-table-column label="订单状态" width="120" align="center">
          <template slot-scope="scope">{{scope.row.order_status | formatStatus}}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleViewOrder(scope.$index, scope.row)"
            >查看订单</el-button>
            <el-button
              size="mini"
              @click="handleCloseOrder(scope.$index, scope.row)"
              v-show="scope.row.order_status===1">关闭订单</el-button>
            <el-button
              size="mini"
              @click="handleDeliveryOrder(scope.$index, scope.row)"
              v-show="scope.row.order_status===2">订单发货</el-button>
            <el-button
              size="mini"
              @click="handleViewLogistics(scope.$index, scope.row)"
              v-show="scope.row.order_status===3||scope.row.status===4||scope.row.status===5">订单跟踪</el-button>
<!--            <el-button-->
<!--              size="mini"-->
<!--              type="danger"-->
<!--              @click="handleDeleteOrder(scope.$index, scope.row)"-->
<!--              v-show="scope.row.order_status===5">删除订单</el-button>-->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-select
        size="small"
        v-model="operateType" placeholder="批量操作">
        <el-option
          v-for="item in operateOptions"
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
        :current-page.sync="listQuery.page"
        :page-size="listQuery.list_row"
        :page-sizes="[5,10,15]"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      title="关闭订单"
      :visible.sync="closeOrder.dialogVisible" width="30%">
      <span style="vertical-align: top">操作备注：</span>
      <el-input
        style="width: 80%"
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        v-model="closeOrder.content">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeOrder.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCloseOrderConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <logistics-dialog v-model="logisticsDialogVisible" v-bind:selectId="selectOrderId"></logistics-dialog>
  </div>
</template>
<script>
  import {fetchList,closeOrder,deleteOrder} from '@/api/order'
  import {formatDate} from '@/utils/date';
  import LogisticsDialog from '@/views/order/order/components/logisticsDialog';
  const defaultListQuery = {
    page: 1,
    list_row: 10,
    order_no: null,
    receiver_keyword: null,
    status: null,
    create_time: null,
  };
  export default {
    name: "orderList",
    components:{LogisticsDialog},
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        listLoading: true,
        list: null,
        total: null,
        operateType: null,
        multipleSelection: [],
        closeOrder:{
          dialogVisible:false,
          content:null,
          orderIds:[]
        },
        statusOptions: [
          {
            label: '已关闭',
            value: -1
          },
          {
            label: '待付款',
            value: 1
          },
          {
            label: '代发货',
            value: 2
          },
          {
            label: '已发货',
            value: 3
          },
          {
            label: '已完成',
            value: 4
          }
        ],
        operateOptions: [
          {
            label: "批量发货",
            value: 1
          },
          {
            label: "关闭订单",
            value: 2
          },
          {
            label: "删除订单",
            value: 3
          }
        ],
        logisticsDialogVisible:false,
        selectOrderId:0
      }
    },
    created() {
      this.getList();
    },
    filters: {
      formatCreateTime(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      formatPayType(value) {
        if (value === 1) {
          return '微信';
        } else if (value === 2) {
          return '支付宝';
        } else {
          return '其他';
        }
      },
      formatSourceType(value) {
        if (value === 0) {
          return '小程序订单';
        } else {
          return '其他订单';
        }
      },
      formatStatus(value) {
        if (value === 0) {
          return '已关闭';
        } else if (value === 1) {
          return '待支付';
        } else if (value === 2) {
          return '支付订单';
        } else if (value === 3) {
          return '平台发货';
        } else if (value === 4) {
          return '确认收货';
        }else if (value === 5) {
          return '完成评价';
        }else {
          return '其他';
        }
      },
    },
    methods: {
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSearchList() {
        this.listQuery.page = 1;
        this.getList();
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      handleViewOrder(index, row){
        this.$router.push({path:'/order/detail',query:{id:row.id}})
      },
      handleCloseOrder(index, row){
        this.closeOrder.dialogVisible=true;
        this.closeOrder.orderIds=[row.id];
      },
      handleDeliveryOrder(index, row){
        let listItem = this.covertOrder(row);
        this.$router.push({path:'/order/deliver',query:{list:[listItem]}})
      },
      handleViewLogistics(index, row){
        this.selectOrderId=row.id;
        this.logisticsDialogVisible=true;
      },
      handleDeleteOrder(index, row){
        let ids=[];
        ids.push(row.id);
        this.deleteOrder(ids);
      },
      handleBatchOperate(){
        if(this.multipleSelection==null||this.multipleSelection.length<1){
          this.$message({
            message: '请选择要操作的订单',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        if(this.operateType===1){
          //批量发货
          let list=[];
          for(let i=0;i<this.multipleSelection.length;i++){
            if(this.multipleSelection[i].status===1){
              list.push(this.covertOrder(this.multipleSelection[i]));
            }
          }
          if(list.length===0){
            this.$message({
              message: '选中订单中没有可以发货的订单',
              type: 'warning',
              duration: 1000
            });
            return;
          }
          this.$router.push({path:'/order/deliver',query:{list:list}})
        }else if(this.operateType===2){
          //关闭订单
          this.closeOrder.orderIds=[];
          for(let i=0;i<this.multipleSelection.length;i++){
            this.closeOrder.orderIds.push(this.multipleSelection[i].id);
          }
          this.closeOrder.dialogVisible=true;
        }else if(this.operateType===3){
          //删除订单
          let ids=[];
          for(let i=0;i<this.multipleSelection.length;i++){
            ids.push(this.multipleSelection[i].id);
          }
          this.deleteOrder(ids);
        }
      },
      handleSizeChange(val){
        this.listQuery.page = 1;
        this.listQuery.list_row = val;
        this.getList();
      },
      handleCurrentChange(val){
        this.listQuery.page = val;
        this.getList();
      },
      handleCloseOrderConfirm() {
        if (this.closeOrder.content == null || this.closeOrder.content === '') {
          this.$message({
            message: '操作备注不能为空',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        let params = new URLSearchParams();
        params.append('ids', this.closeOrder.orderIds);
        params.append('note', this.closeOrder.content);
        closeOrder(params).then(response=>{
          this.closeOrder.orderIds=[];
          this.closeOrder.dialogVisible=false;
          this.getList();
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        });
      },
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.list;
          this.total = response.total;
        });
      },
      deleteOrder(ids){
        this.$confirm('是否要进行该删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = new URLSearchParams();
          params.append("ids",ids);
          deleteOrder(params).then(response=>{
            this.$message({
              message: '删除成功！',
              type: 'success',
              duration: 1000
            });
            this.getList();
          });
        })
      },
      covertOrder(order){
        let address=order.address;
        let listItem={
          order_id:order.id,
          order_no:order.order_no,
          username:order.username,
          phone:order.phone,
          address:address,
          delivery_company:null,
          delivery_sn:null
        };
        return listItem;
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 203px;
  }
</style>


