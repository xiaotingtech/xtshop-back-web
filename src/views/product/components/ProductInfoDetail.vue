<template>
  <div style="margin-top: 50px">
    <el-form :model="value" :rules="rules" ref="productInfoForm" label-width="120px" style="width: 600px" size="small">
      <el-form-item label="商品分类：" prop="product_category_id">
        <el-cascader
          v-model="selectProductCateValue"
          :options="productCateOptions">
        </el-cascader>
      </el-form-item>
      <el-form-item label="首页专题：">
        <el-select v-model="value.subject_id"
                   placeholder="请选择专题">
          <el-option
            v-for="item in SubjectOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称：" prop="title">
        <el-input v-model="value.title"></el-input>
      </el-form-item>
      <el-form-item label="副标题：" prop="sub_title">
        <el-input v-model="value.sub_title"></el-input>
      </el-form-item>
<!--      <el-form-item label="商品品牌：" prop="brandId">-->
<!--        <el-select-->
<!--          v-model="value.brandId"-->
<!--          @change="handleBrandChange"-->
<!--          placeholder="请选择品牌">-->
<!--          <el-option-->
<!--            v-for="item in brandOptions"-->
<!--            :key="item.value"-->
<!--            :label="item.label"-->
<!--            :value="item.value">-->
<!--          </el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->
      <el-form-item label="商品介绍：">
        <el-input
          :autoSize="true"
          v-model="value.description"
          type="textarea"
          placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="商品货号：">
        <el-input v-model="value.product_sn"></el-input>
      </el-form-item>
      <el-form-item label="商品售价：">
        <el-input v-model="value.price"></el-input>
      </el-form-item>
      <el-form-item label="市场价：">
        <el-input v-model="value.original_price"></el-input>
      </el-form-item>
      <el-form-item label="商品库存：">
        <el-input v-model="value.stock"></el-input>
      </el-form-item>
      <el-form-item label="计量单位：">
        <el-input v-model="value.unit"></el-input>
      </el-form-item>
      <el-form-item label="商品重量：">
        <el-input v-model="value.weight" style="width: 300px"></el-input>
        <span style="margin-left: 20px">克</span>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="value.sort_num"></el-input>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" size="medium" @click="handleNext('productInfoForm')">下一步，填写商品属性</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {fetchListWithChildren} from '@/api/productCate'
  import {fetchSubjectWithChildren} from '@/api/subject'
  //import {fetchList as fetchBrandList} from '@/api/brand'
  //import {getProduct} from '@/api/product';`

  export default {
    name: "ProductInfoDetail",
    props: {
      value: Object,
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        hasEditCreated:false,
        //选中商品分类的值
        selectProductCateValue: [],
        productCateOptions: [],
        //选中专题的值
        SubjectOptions: [],
        //brandOptions: [],
        rules: {
          title: [
            {required: true, message: '请输入商品名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],
          sub_title: [{required: true, message: '请输入商品副标题', trigger: 'blur'}],
          product_category_id: [{required: true, message: '请选择商品分类', trigger: 'blur'}],
          //brand_id: [{required: true, message: '请选择商品品牌', trigger: 'blur'}],
          description: [{required: true, message: '请输入商品介绍', trigger: 'blur'}],
          requiredProp: [{required: true, message: '该项为必填项', trigger: 'blur'}]
        }
      };
    },
    created() {
      this.getProductCateList();
      this.getSubjectList();
    },
    computed:{
      //商品的编号
      productId(){
        return this.value.id;
      }
    },
    watch: {
      productId:function(newValue){
        if(!this.isEdit)return;
        if(this.hasEditCreated)return;
        if(newValue===undefined||newValue==null||newValue===0)return;
        this.handleEditCreated();
      },
      selectProductCateValue: function (newValue) {
        if (newValue != null && newValue.length === 2) {
          this.value.category_parent_id = newValue[0];
          this.value.product_category_id = newValue[1];
          this.value.product_category_name= this.getCateNameById(this.value.product_category_id);
        } else {
          this.value.product_category_id = 0;
          this.value.product_category_name=null;
          this.value.category_parent_id = 0;
        }
      }
    },
    methods: {
      //处理编辑逻辑
      handleEditCreated(){
        if(this.value.product_category_id!=null){
          this.selectProductCateValue.push(this.value.category_parent_id);
          this.selectProductCateValue.push(this.value.product_category_id);
        }
        this.hasEditCreated=true;
      },
      getProductCateList() {
        fetchListWithChildren().then(response => {
          let list = response;
          this.productCateOptions = [];
          for (let i = 0; i < list.length; i++) {
            let children = [];
            if (list[i].children != null && list[i].children.length > 0) {
              for (let j = 0; j < list[i].children.length; j++) {
                children.push({label: list[i].children[j].name, value: list[i].children[j].id});
              }
            }
            this.productCateOptions.push({label: list[i].name, value: list[i].id, children: children});
          }
        });
      },
      getSubjectList() {
        fetchSubjectWithChildren().then(response => {
          this.SubjectOptions = response;
          this.SubjectOptions.push({name:'无',id:0,parentId:0,sort_num:0,children:[]});
        });
      },
      // getBrandList() {
      //   fetchBrandList({pageNum: 1, pageSize: 100}).then(response => {
      //     this.brandOptions = [];
      //     let brandList = response.list;
      //     for (let i = 0; i < brandList.length; i++) {
      //       this.brandOptions.push({label: brandList[i].name, value: brandList[i].id});
      //     }
      //   });
      // },
      getCateNameById(id){
        let name=null;
        for(let i=0;i<this.productCateOptions.length;i++){
          for(let j=0;j<this.productCateOptions[i].children.length;j++){
            if(this.productCateOptions[i].children[j].value===id){
              name=this.productCateOptions[i].children[j].label;
              return name;
            }
          }
        }
        return name;
      },
      handleNext(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('nextStep');
          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        });
      },
      // handleBrandChange(val) {
      //   let brandName = '';
      //   for (let i = 0; i < this.brandOptions.length; i++) {
      //     if (this.brandOptions[i].value === val) {
      //       brandName = this.brandOptions[i].label;
      //       break;
      //     }
      //   }
      //   this.value.brandName = brandName;
      // }
    }
  }
</script>

<style scoped>
</style>
