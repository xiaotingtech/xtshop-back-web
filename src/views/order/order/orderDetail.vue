<template> 
  <div class="detail-container">
    <div>
      <el-steps :active="formatStepStatus(order.order_status)" finish-status="success" align-center>
        <el-step title="提交订单" :description="formatTime(order.create_time)"></el-step>
        <el-step title="支付订单" :description="formatTime(order.pay_time)"></el-step>
        <el-step title="平台发货" :description="formatTime(order.delivery_time)"></el-step>
        <el-step title="确认收货" :description="formatTime(order.receive_time)"></el-step>
        <el-step title="完成评价" :description="formatTime(order.comment_time)"></el-step>
      </el-steps>
    </div>
    <el-card shadow="never" style="margin-top: 15px">
      <div class="operate-container">
        <i class="el-icon-warning color-danger" style="margin-left: 20px"></i>
        <span class="color-danger">当前订单状态：{{order.order_status | formatStatus}}</span>
        <div class="operate-button-container" v-show="order.order_status===2">
          <el-button size="mini" @click="showUpdateReceiverDialog">修改收货人信息</el-button>
<!--          <el-button size="mini" @click="showUpdateMoneyDialog">修改费用信息</el-button>-->
<!--          <el-button size="mini" @click="showMessageDialog">发送站内信</el-button>-->
          <el-button size="mini" @click="showCloseOrderDialog">关闭订单</el-button>
          <el-button size="mini" @click="showMarkOrderDialog">备注订单</el-button>
        </div>
        <div class="operate-button-container" v-show="order.order_status===3">
<!--          <el-button size="mini" @click="showUpdateReceiverDialog">修改收货人信息</el-button>-->
<!--          <el-button size="mini" @click="showMessageDialog">发送站内信</el-button>-->
          <el-button size="mini" @click="showLogisticsDialog">订单跟踪</el-button>
          <el-button size="mini" @click="showMarkOrderDialog">备注订单</el-button>
        </div>
        <div class="operate-button-container" v-show="order.order_status===4||order.order_status===5">
<!--          <el-button size="mini" @click="showMessageDialog">发送站内信</el-button>-->
          <el-button size="mini" @click="showMarkOrderDialog">备注订单</el-button>
        </div>
<!--        <div class="operate-button-container" v-show="order.order_status===5">-->
<!--          <el-button size="mini" @click="handleDeleteOrder">删除订单</el-button>-->
<!--          <el-button size="mini" @click="showMarkOrderDialog">备注订单</el-button>-->
<!--        </div>-->
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">基本信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">订单编号</el-col>
          <el-col :span="6" class="table-cell-title">用户账号</el-col>
          <el-col :span="6" class="table-cell-title">支付方式</el-col>
          <el-col :span="6" class="table-cell-title">订单来源</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">{{order.order_no}}</el-col>
          <el-col :span="6" class="table-cell">{{order.nickname}}</el-col>
          <el-col :span="6" class="table-cell">{{order.pay_type | formatPayType}}</el-col>
          <el-col :span="6" class="table-cell">{{order.source_type | formatSourceType}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">配送方式</el-col>
          <el-col :span="6" class="table-cell-title">物流单号</el-col>
<!--          <el-col :span="4" class="table-cell-title">订单可得优币</el-col>-->
<!--          <el-col :span="4" class="table-cell-title">订单可得成长值</el-col>-->
<!--          <el-col :span="4" class="table-cell-title">活动信息</el-col>-->
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">{{order.delivery_company | formatNull}}</el-col>
          <el-col :span="6" class="table-cell">{{order.delivery_sn | formatNull}}</el-col>
<!--          <el-col :span="4" class="table-cell">{{order.integration}}</el-col>-->
<!--          <el-col :span="4" class="table-cell">{{order.growth}}</el-col>-->
<!--          <el-col :span="4" class="table-cell">-->
<!--            <el-popover-->
<!--              placement="top-start"-->
<!--              title="活动信息"-->
<!--              width="200"-->
<!--              trigger="hover"-->
<!--              :content="order.promotionInfo">-->
<!--              <span slot="reference">{{order.promotionInfo | formatLongText}}</span>-->
<!--            </el-popover>-->
<!--          </el-col>-->
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">收货人信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">收货人</el-col>
          <el-col :span="6" class="table-cell-title">手机号码</el-col>
          <el-col :span="6" class="table-cell-title">收货地址</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">{{order.username}}</el-col>
          <el-col :span="6" class="table-cell">{{order.phone}}</el-col>
          <el-col :span="6" class="table-cell">{{order.address}}</el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">商品信息</span>
      </div>
      <el-table
        ref="orderItemTable"
        :data="order.product_order"
        style="width: 100%;margin-top: 20px" border>
        <el-table-column label="商品图片" width="120" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.product_img" style="height: 80px">
          </template>
        </el-table-column>
        <el-table-column label="商品名称" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.product_name}}</p>
          </template>
        </el-table-column>
        <el-table-column label="价格" width="120" align="center">
          <template slot-scope="scope">
            <p>价格：￥{{scope.row.price}}</p>
          </template>
        </el-table-column>
        <el-table-column label="属性" width="120" align="center">
          <template slot-scope="scope">
            {{scope.row.property_value}}
          </template>
        </el-table-column>
        <el-table-column label="数量" width="120" align="center">
          <template slot-scope="scope">
            {{scope.row.product_num}}
          </template>
        </el-table-column>
        <el-table-column label="小计" width="120" align="center">
          <template slot-scope="scope">
            ￥{{scope.row.price*scope.row.product_num}}
          </template>
        </el-table-column>
      </el-table>
      <div style="float: right;margin: 20px">
        合计：<span class="color-danger">￥{{order.total_price}}</span>
      </div>
      <div style="margin-top: 60px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">费用信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">商品合计</el-col>
<!--          <el-col :span="6" class="table-cell-title">运费</el-col>-->
<!--          <el-col :span="6" class="table-cell-title">优惠券</el-col>-->
<!--          <el-col :span="6" class="table-cell-title">积分抵扣</el-col>-->
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">￥{{order.total_price}}</el-col>
<!--          <el-col :span="6" class="table-cell">￥{{order.freightAmount}}</el-col>-->
<!--          <el-col :span="6" class="table-cell">-￥{{order.couponAmount}}</el-col>-->
<!--          <el-col :span="6" class="table-cell">-￥{{order.integrationAmount}}</el-col>-->
        </el-row>
<!--        <el-row>-->
<!--          <el-col :span="6" class="table-cell-title">活动优惠</el-col>-->
<!--          <el-col :span="6" class="table-cell-title">折扣金额</el-col>-->
<!--          <el-col :span="6" class="table-cell-title">订单总金额</el-col>-->
<!--          <el-col :span="6" class="table-cell-title">应付款金额</el-col>-->
<!--        </el-row>-->
<!--        <el-row>-->
<!--          <el-col :span="6" class="table-cell">-￥{{order.promotionAmount}}</el-col>-->
<!--          <el-col :span="6" class="table-cell">-￥{{order.discountAmount}}</el-col>-->
<!--          <el-col :span="6" class="table-cell">-->
<!--            <span class="color-danger">￥{{order.totalAmount+order.freightAmount}}</span>-->
<!--          </el-col>-->
<!--          <el-col :span="6" class="table-cell">-->
<!--            <span class="color-danger">￥{{order.payAmount+order.freightAmount-order.discountAmount}}</span>-->
<!--          </el-col>-->
<!--        </el-row>-->
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">操作信息</span>
      </div>
      <el-table style="margin-top: 20px;width: 100%"
                ref="orderHistoryTable"
                :data="order.manage_log" border>
        <el-table-column label="操作者"  width="120" align="center">
          <template slot-scope="scope">
            {{scope.row.username}}
          </template>
        </el-table-column>
        <el-table-column label="操作时间"  width="160" align="center">
          <template slot-scope="scope">
            {{formatTime(scope.row.create_time)}}
          </template>
        </el-table-column>
        <el-table-column label="操作类型"  width="120" align="center">
          <template slot-scope="scope">
            {{scope.row.type | formatManageType}}
          </template>
        </el-table-column>
        <el-table-column label="操作信息"  width="120" align="center">
          <template slot-scope="scope">
<!--            {{scope.row.record_content}}-->
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center">
          <template slot-scope="scope">
            {{scope.row.remark}}
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="修改收货人信息"
               :visible.sync="receiverDialogVisible"
               width="40%">
      <el-form :model="receiverInfo"
               ref="receiverInfoForm"
               label-width="150px">
        <el-form-item label="收货人姓名：">
          <el-input v-model="receiverInfo.username" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="手机号码：">
          <el-input v-model="receiverInfo.phone" style="width: 200px">
          </el-input>
        </el-form-item>
        <el-form-item label="详细地址：">
          <el-input v-model="receiverInfo.address" type="textarea" rows="3">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="receiverDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleUpdateReceiverInfo">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改费用信息"
               :visible.sync="moneyDialogVisible"
               width="40%">
      <div class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">商品合计</el-col>
          <el-col :span="6" class="table-cell-title">运费</el-col>
<!--          <el-col :span="6" class="table-cell-title">优惠券</el-col>-->
<!--          <el-col :span="6" class="table-cell-title">积分抵扣</el-col>-->
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">￥{{order.total_price}}</el-col>
          <el-col :span="6" class="table-cell">
            <el-input v-model.number="moneyInfo.freightAmount" size="mini"><template slot="prepend">￥</template></el-input>
          </el-col>
<!--          <el-col :span="6" class="table-cell">-￥{{order.couponAmount}}</el-col>-->
<!--          <el-col :span="6" class="table-cell">-￥{{order.integrationAmount}}</el-col>-->
        </el-row>
<!--        <el-row>-->
<!--          <el-col :span="6" class="table-cell-title">活动优惠</el-col>-->
<!--          <el-col :span="6" class="table-cell-title">折扣金额</el-col>-->
<!--          <el-col :span="6" class="table-cell-title">订单总金额</el-col>-->
<!--          <el-col :span="6" class="table-cell-title">应付款金额</el-col>-->
<!--        </el-row>-->
<!--        <el-row>-->
<!--          <el-col :span="6" class="table-cell">-￥{{order.promotionAmount}}</el-col>-->
<!--          <el-col :span="6" class="table-cell">-->
<!--            <el-input v-model.number="moneyInfo.discountAmount" size="mini"><template slot="prepend">-￥</template></el-input>-->
<!--          </el-col>-->
<!--          <el-col :span="6" class="table-cell">-->
<!--            <span class="color-danger">￥{{order.totalAmount+moneyInfo.freightAmount}}</span>-->
<!--          </el-col>-->
<!--          <el-col :span="6" class="table-cell">-->
<!--            <span class="color-danger">￥{{order.payAmount+moneyInfo.freightAmount-moneyInfo.discountAmount}}</span>-->
<!--          </el-col>-->
<!--        </el-row>-->
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button @click="moneyDialogVisible = false">取 消</el-button>
<!--      <el-button type="primary" @click="handleUpdateMoneyInfo">确 定</el-button>-->
      </span>
    </el-dialog>
    <el-dialog title="发送站内信"
               :visible.sync="messageDialogVisible"
               width="40%">
      <el-form :model="message"
               ref="receiverInfoForm"
               label-width="150px">
        <el-form-item label="标题：">
          <el-input v-model="message.title" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <el-input v-model="message.content" type="textarea" rows="3">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="messageDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSendMessage">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="关闭订单"
               :visible.sync="closeDialogVisible"
               width="40%">
      <el-form :model="closeInfo"
               label-width="150px">
        <el-form-item label="操作备注：">
          <el-input v-model="closeInfo.note" type="textarea" rows="3">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCloseOrder">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="备注订单"
               :visible.sync="markOrderDialogVisible"
               width="40%">
      <el-form :model="markInfo"
               label-width="150px">
        <el-form-item label="操作备注：">
          <el-input v-model="markInfo.remark" type="textarea" rows="3">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="markOrderDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleMarkOrder">确 定</el-button>
      </span>
    </el-dialog>
    <logistics-dialog v-model="logisticsDialogVisible" v-bind:selectId="order.id"></logistics-dialog>
  </div>
</template>
<script>
  import {getOrderDetail,updateReceiverInfo,closeOrder,updateOrderNote,deleteOrder} from '@/api/order';
  import LogisticsDialog from '@/views/order/order/components/logisticsDialog';
  import {formatDate} from '@/utils/date';
  import VDistpicker from 'v-distpicker';
  const defaultReceiverInfo = {
    order_id:null,
    username:null,
    phone:null,
    address:null,
    status:null
  };
  export default {
    name: 'orderDetail',
    components: { VDistpicker, LogisticsDialog},
    data() {
      return {
        id: null,
        order: {},
        receiverDialogVisible:false,
        receiverInfo:Object.assign({},defaultReceiverInfo),
        moneyDialogVisible:false,
        moneyInfo:{orderId:null, freightAmount:0, discountAmount:0,status:null},
        messageDialogVisible:false,
        message: {title:null, content:null},
        closeDialogVisible:false,
        closeInfo:{note:null,id:null},
        markOrderDialogVisible:false,
        markInfo:{remark:null},
        logisticsDialogVisible:false
      }
    },
    created() {
      this.id = this.list = this.$route.query.id;
      getOrderDetail(this.id).then(response => {
        this.order = response;
      });
    },
    filters: {
      formatNull(value) {
        if(value===undefined||value===null||value===''){
          return '暂无';
        }else{
          return value;
        }
      },
      formatLongText(value) {
        if(value===undefined||value===null||value===''){
          return '暂无';
        }else if(value.length>8){
          return value.substr(0, 8) + '...';
        }else{
          return value;
        }
      },
      formatPayType(value) {
        if (value === 1) {
          return '微信';
        } else if (value === 2) {
          return '支付宝';
        } else {
          return '未支付';
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
        if (value === 1) {
          return '提交订单';
        } else if (value === 2) {
          return '支付订单';
        } else if (value === 3) {
          return '平台发货';
        } else if (value === 4) {
          return '确认收货';
        } else if (value === 5) {
          return '完成评价';
        } else if (value === 0) {
          return '已关闭';
        } else {
          return '其他';
        }
      },
      formatPayStatus(value) {
        if (value === 0) {
          return '未支付';
        } else if(value===4){
          return '已退款';
        }else{
          return '已支付';
        }
      },
      formatDeliverStatus(value) {
        if (value < 3) {
          return '未发货';
        } else {
          return '已发货';
        }
      },
      formatManageType(type){
        switch(type){
          case 1:
            return '修改';
          case 2:
            return '发货';
          case 3:
            return '备注';
          case 4:
            return '关闭订单';
          case 5:
            return '确认收货';
          default:
            return '未知';
        }
      }
    },
    methods: {
      // onSelectRegion(data){
      //   this.receiverInfo.receiverProvince=data.province.value;
      //   this.receiverInfo.receiverCity=data.city.value;
      //   this.receiverInfo.receiverRegion=data.area.value;
      // },
      formatTime(time) {
        if (time == null || time === ''|| time === 0) {
          return '';
        }
        let numReg = /^[0-9]*$/;
        let numRe = new RegExp(numReg);
        let dateStr=new Date();
        if(!numRe.test(time)) {
          dateStr = new Date(time);
        }else{
          dateStr = new Date(parseInt(time) * 1000);
        }
        return formatDate(dateStr, 'yyyy-MM-dd hh:mm:ss')
      },
      formatStepStatus(value) {
        if (value === 2) {
          //待发货
          return 1;
        } else if (value === 3) {
          //已发货
          return 2;
        } else if (value === 4) {
          //已完成
          return 3;
        }else if (value === 5) {
          //完成评价
          return 4;
        }else {
          //待付款、已关闭、无限订单
          return 0;
        }
      },
      showUpdateReceiverDialog(){
        this.receiverDialogVisible=true;
        this.receiverInfo={
          order_id:this.order.id,
          username:this.order.username,
          phone:this.order.phone,
          address:this.order.address,
          status:this.order.order_status
        }
      },
      handleUpdateReceiverInfo(){
        this.$confirm('是否要修改收货信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateReceiverInfo(this.receiverInfo).then(response=>{
            this.receiverDialogVisible=false;
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
            getOrderDetail(this.id).then(response => {
              this.order = response;
            });
          });
        });
      },
      showUpdateMoneyDialog(){
        this.moneyDialogVisible=true;
        this.moneyInfo.orderId=this.order.id;
        this.moneyInfo.freightAmount=this.order.freightAmount;
        this.moneyInfo.discountAmount=this.order.discountAmount;
        this.moneyInfo.status=this.order.status;
      },
      // handleUpdateMoneyInfo(){
      //   this.$confirm('是否要修改费用信息?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     updateMoneyInfo(this.moneyInfo).then(response=>{
      //       this.moneyDialogVisible=false;
      //       this.$message({
      //         type: 'success',
      //         message: '修改成功!'
      //       });
      //       getOrderDetail(this.id).then(response => {
      //         this.order = response;
      //       });
      //     });
      //   });
      // },
      showMessageDialog(){
        this.messageDialogVisible=true;
        this.message.title=null;
        this.message.content=null;
      },
      handleSendMessage(){
        this.$confirm('是否要发送站内信?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.messageDialogVisible=false;
          this.$message({
            type: 'success',
            message: '发送成功!'
          });
        });
      },
      showCloseOrderDialog(){
        this.closeDialogVisible=true;
        this.closeInfo.note=null;
        this.closeInfo.id=this.id;
      },
      handleCloseOrder(){
        this.$confirm('是否要关闭?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            let params = new URLSearchParams();
            params.append("ids",[this.closeInfo.id]);
            params.append("note",this.closeInfo.note);
            closeOrder(params).then(response=>{
              this.closeDialogVisible=false;
              this.$message({
                type: 'success',
                message: '订单关闭成功!'
              });
              getOrderDetail(this.id).then(response => {
                this.order = response.data;
              });
            });
        });
      },
      showMarkOrderDialog(){
        this.markOrderDialogVisible=true;
        this.markInfo.id=this.id;
        this.closeOrder.note=null;
      },
      handleMarkOrder(){
        this.$confirm('是否要备注订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateOrderNote({order_id:this.markInfo.id,remark:this.markInfo.remark})
            .then(response=>{
            this.markOrderDialogVisible=false;
            this.$message({
              type: 'success',
              message: '订单备注成功!'
            });
            getOrderDetail(this.id).then(response => {
              this.order = response;
            });
          });
        });
      },
      handleDeleteOrder(){
        this.$confirm('是否要进行该删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = new URLSearchParams();
          params.append("ids",[this.id]);
          deleteOrder(params).then(response=>{
            this.$message({
              message: '删除成功！',
              type: 'success',
              duration: 1000
            });
            this.$router.back();
          });
        })
      },
      showLogisticsDialog(){
        this.logisticsDialogVisible=true;
      }
    }
  }
</script>
<style scoped>
  .detail-container {
    width: 80%;
    padding: 20px 20px 20px 20px;
    margin: 20px auto;
  }

  .operate-container {
    background: #F2F6FC;
    height: 80px;
    margin: -20px -20px 0;
    line-height: 80px;
  }

  .operate-button-container {
    float: right;
    margin-right: 20px
  }

  .table-layout {
    margin-top: 20px;
    border-left: 1px solid #DCDFE6;
    border-top: 1px solid #DCDFE6;
  }

  .table-cell {
    height: 60px;
    line-height: 40px;
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
    font-size: 14px;
    color: #606266;
    text-align: center;
    overflow: hidden;
  }

  .table-cell-title {
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
    background: #F2F6FC;
    text-align: center;
    font-size: 14px;
    color: #303133;
  }
</style>


