<template> 
  <el-dialog title="订单跟踪"
             :visible.sync="visible"
             :before-close="handleClose"
             @open="getExpressInfo"
             id="dialog_view"
             width="40%">
    <el-steps direction="vertical"
              :active="logisticsList.length-1"
              finish-status="success"
              space="50px">
      <el-step  v-for="item in logisticsList"
                :key="item.time"
                :title="item.description"
                :description="item.time"></el-step>
    </el-steps>
  </el-dialog>
</template>
<script>
  import {queryExpress} from '@/api/order'
  const defaultLogisticsList=[
    {description: '正在加载中...',time:'2020-11-26 12:00:00 '}
  ];
  export default {
    name:'logisticsDialog',
    props: {
      value: Boolean,
      selectId: {
        type: Number,
        default: 0
      }
    },
    computed:{
      visible: {
        get() {
          return this.value;
        },
        set(visible){
          this.value=visible;
        }
      }
    },
    data() {
      return {
        logisticsList:Object.assign({},defaultLogisticsList),
      }
    },
    methods:{
      getExpressInfo(){
        if(this.selectId>0){
          let loadingObj=this.$loading({
            target:document.querySelector('#dialog_view'),
            text: '加载中...'
          });
          queryExpress({order_id:this.selectId}).then(response => {
            loadingObj.close();
            this.logisticsList = response.data;
          }).catch(err=>{
            console.log(err);
            this.logisticsList=[{description: "加载失败...",time:"2020-11-26 24:00:00"}];
            loadingObj.close();
          })
        }
      },
      emitInput(val) {
        this.$emit('input', val)
      },
      handleClose(){
        this.emitInput(false);
      }
    }
  }
</script>
<style></style>


