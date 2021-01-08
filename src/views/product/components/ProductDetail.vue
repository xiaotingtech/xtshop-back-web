<template> 
  <el-card class="form-container" shadow="never">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="填写商品信息"></el-step>
<!--      <el-step title="填写商品促销"></el-step>-->
      <el-step title="填写商品属性"></el-step>
<!--      <el-step title="选择商品关联"></el-step>-->
    </el-steps>
    <product-info-detail
      v-show="showStatus[0]"
      v-model="productParam"
      :is-edit="isEdit"
      @nextStep="nextStep">
    </product-info-detail>
    <product-attr-detail
      v-show="showStatus[1]"
      v-model="productParam"
      :is-edit="isEdit"
      @prevStep="prevStep"
      @finishCommit="finishCommit">
    </product-attr-detail>
  </el-card>
</template>
<script>
  import ProductInfoDetail from './ProductInfoDetail';
  //import ProductSaleDetail from './ProductSaleDetail';
  import ProductAttrDetail from './ProductAttrDetail';
  //import ProductRelationDetail from './ProductRelationDetail';
  import {createProduct,getProduct,updateProduct} from '@/api/product';

  const defaultProductParam = {
    album_pic: '',
    //brandId: null,
    //brandName: '',
    delete_status: 0,
    description: '',
    detail_id: 0,
    detail_desc: '',
    detail_html: '',
    detail_mobile_html: '',
    detail_title: '',
    // feightTemplateId: 0,
    // flashPromotionCount: 0,
    // flashPromotionId: 0,
    // flashPromotionPrice: 0,
    // flashPromotionSort: 0,
    // giftPoint: 0,
    // giftGrowth: 0,
    keywords: '',
    low_stock: 0,
    title: '',
    new_status: 0,
    note: '',
    original_price: 0,
    img: '',
    //会员价格{memberLevelId: 0,memberPrice: 0,memberLevelName: null}
    //memberPriceList: [],
    //商品满减
    //productFullReductionList: [{fullPrice: 0, reducePrice: 0}],
    //商品阶梯价格
    //productLadderList: [{count: 0,discount: 0,price: 0}],
    preview_status: 0,
    price: 0,
    product_attribute_category_id: null,
    //商品属性相关{productAttributeId: 0, value: ''}
    product_attribute_value_list: [],
    //商品sku库存信息{low_stock: 0, pic: '', price: 0, sale_num: 0, sku_code: '', property_value: '', sku_stock: 0}
    sku_stock_list: [],
    category_parent_id:0,
    subject_id:0,
    product_category_id: 0,
    product_category_name: '',
    product_sn: '',
    promotion_end_time: '',
    promotion_per_limit: 0,
    promotion_price: null,
    promotion_start_time: '',
    promotion_type: 0,
    publish_status: 0,
    recommand_status: 0,
    sale_num: 0,
    //serviceIds: '',
    sort_num: 0,
    stock: 0,
    sub_title: '',
    unit: '',
    //usePointLimit: 0,
    verify_status: 0,
    weight: 0
  };
  export default {
    name: 'ProductDetail',
    components: {ProductInfoDetail, ProductAttrDetail},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        active: 0,
        productParam: Object.assign({}, defaultProductParam),
        showStatus: [true, false]
      }
    },
    created(){
      if(this.isEdit){
        getProduct(this.$route.query.id).then(response=>{
          this.productParam=response;
        });
      }
    },
    methods: {
      hideAll() {
        for (let i = 0; i < this.showStatus.length; i++) {
          this.showStatus[i] = false;
        }
      },
      prevStep() {
        if (this.active > 0 && this.active < this.showStatus.length) {
          this.active--;
          this.hideAll();
          this.showStatus[this.active] = true;
        }
      },
      nextStep() {
        if (this.active < this.showStatus.length - 1) {
          this.active++;
          this.hideAll();
          this.showStatus[this.active] = true;
        }
      },
      finishCommit(isEdit) {
        this.$confirm('是否要提交该产品', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(isEdit){
            updateProduct(this.productParam).then(response=>{
              this.$message({
                type: 'success',
                message: '提交成功',
                duration:1000
              });
              this.$router.back();
            });
          }else{
            createProduct(this.productParam).then(response=>{
              this.$message({
                type: 'success',
                message: '提交成功',
                duration:1000
              });
              this.$router.back();
            });
          }
        })
      }
    }
  }
</script>
<style>
  .form-container {
    width: 800px;
  }
</style>


