<template>
  <div style="margin-top: 50px">
    <el-form :model="value" ref="productAttrForm" label-width="120px" style="width: 720px" size="small">
      <el-form-item label="属性类型：">
        <el-select v-model="value.product_attribute_category_id"
                   placeholder="请选择属性类型"
                   @change="handleProductAttrChange">
          <el-option
            v-for="item in productAttributeCategoryOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品规格：">
        <el-card shadow="never" class="cardBg">
          <div v-for="(productAttr,idx) in selectProductAttr">
            {{productAttr.name}}：
            <el-checkbox-group v-if="productAttr.handAddStatus===0" v-model="selectProductAttr[idx].values">
              <el-checkbox v-for="item in getInputListArr(productAttr.inputList)" :label="item" :key="item"
                           class="littleMarginLeft"></el-checkbox>
            </el-checkbox-group>
            <div v-else>
              <el-checkbox-group v-model="selectProductAttr[idx].values">
                <div v-for="(item,index) in selectProductAttr[idx].options" style="display: inline-block"
                     class="littleMarginLeft">
                  <el-checkbox :label="item" :key="item"></el-checkbox>
                  <el-button type="text" class="littleMarginLeft" @click="handleRemoveProductAttrValue(idx,index)">删除
                  </el-button>
                </div>
              </el-checkbox-group>
              <el-input v-model="addProductAttrValue" style="width: 160px;margin-left: 10px" clearable></el-input>
              <el-button class="littleMarginLeft" @click="handleAddProductAttrValue(idx)">增加</el-button>
            </div>
          </div>
        </el-card>
        <el-table style="width: 100%;margin-top: 20px"
                  :data="value.sku_stock_list"
                  border>
          <el-table-column
            v-for="(item,index) in selectProductAttr"
            :label="item.name"
            :key="item.id"
            align="center">
            <template slot-scope="scope">
              {{getProductSkuSp(scope.row,index)}}
            </template>
          </el-table-column>
          <el-table-column
            label="销售价格"
            width="80"
            align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.sku_price"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="商品库存"
            width="80"
            align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.sku_stock"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="库存预警值"
            width="80"
            align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.low_stock"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="SKU编号"
            align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.sku_code"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="80"
            align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="handleRemoveProductSku(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          style="margin-top: 20px"
          @click="handleRefreshProductSkuList">刷新列表
        </el-button>
        <el-button
          type="primary"
          style="margin-top: 20px"
          @click="handleSyncProductSkuPrice">同步价格
        </el-button>
        <el-button
          type="primary"
          style="margin-top: 20px"
          @click="handleSyncProductSkuStock">同步库存
        </el-button>
      </el-form-item>
<!--      <el-form-item label="属性图片：" v-if="hasAttrPic">-->
<!--        <el-card shadow="never" class="cardBg">-->
<!--          <div v-for="(item,index) in selectProductAttrPics">-->
<!--            <span>{{item.name}}:</span>-->
<!--            <single-upload v-model="item.pic"-->
<!--                           style="width: 300px;display: inline-block;margin-left: 10px"></single-upload>-->
<!--          </div>-->
<!--        </el-card>-->
<!--      </el-form-item>-->
      <el-form-item label="商品参数：">
        <el-card shadow="never" class="cardBg">
          <div v-for="(item,index) in selectProductParam" :class="{littleMarginTop:index!==0}">
            <div class="paramInputLabel">{{item.name}}:</div>
            <el-select v-if="item.inputType===1" class="paramInput" v-model="selectProductParam[index].value">
              <el-option
                v-for="item in getParamInputList(item.inputList)"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <el-input v-else class="paramInput" v-model="selectProductParam[index].value"></el-input>
          </div>
        </el-card>
      </el-form-item>
      <el-form-item label="商品相册：">
        <multi-upload v-model="selectProductPics"></multi-upload>
      </el-form-item>
      <el-form-item label="规格参数：">
        <el-tabs v-model="activeHtmlName" type="card">
          <el-tab-pane label="电脑端详情" name="pc">
            <tinymce :width="595" :height="300" v-model="value.detail_html"></tinymce>
          </el-tab-pane>
          <el-tab-pane label="移动端详情" name="mobile">
            <tinymce :width="595" :height="300" v-model="value.detail_mobile_html"></tinymce>
          </el-tab-pane>
        </el-tabs>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">上一步，填写商品信息</el-button>
        <el-button type="primary" size="medium" @click="handleFinishCommit">完成，提交商品</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {fetchList as fetchProductAttrCateList} from '@/api/productAttrCate'
  import {fetchList as fetchProductAttrList} from '@/api/productAttr'
  import SingleUpload from '@/components/Upload/singleUpload'
  import MultiUpload from '@/components/Upload/multiUpload'
  import Tinymce from '@/components/Tinymce'

  export default {
    name: "ProductAttrDetail",
    components: {SingleUpload, MultiUpload, Tinymce},
    props: {
      value: Object,
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        //编辑模式时是否初始化成功
        hasEditCreated:false,
        //商品属性分类下拉选项
        productAttributeCategoryOptions: [],
        //选中的商品属性
        selectProductAttr: [],
        //选中的商品参数
        selectProductParam: [],
        //选中的商品属性图片
        //selectProductAttrPics: [],
        //可手动添加的商品属性
        addProductAttrValue: '',
        //商品富文本详情激活类型
        activeHtmlName: 'pc'
      }
    },
    computed: {
      //是否有商品属性图片
      // hasAttrPic() {
      //   if (this.selectProductAttrPics.length < 1) {
      //     return false;
      //   }
      //   return true;
      // },
      //商品的编号
      productId(){
        return this.value.id;
      },
      //商品的主图和画册图片
      selectProductPics:{
        get:function () {
          let pics=[];
          if(this.value.img===undefined||this.value.img==null||this.value.img===''){
            return pics;
          }
          pics.push(this.value.img);
          if(this.value.album_pic===undefined||this.value.album_pic==null||this.value.album_pic===''){
            return pics;
          }
          let album_pic = this.value.album_pic.split(',');
          for(let i=0;i<album_pic.length;i++){
            pics.push(album_pic[i]);
          }
          return pics;
        },
        set:function (newValue) {
          if (newValue == null || newValue.length === 0) {
            this.value.img = null;
            this.value.album_pic = null;
          } else {
            this.value.img = newValue[0];
            this.value.album_pic = '';
            if (newValue.length > 1) {
              for (let i = 1; i < newValue.length; i++) {
                this.value.album_pic += newValue[i];
                if (i !== newValue.length - 1) {
                  this.value.album_pic += ',';
                }
              }
            }
          }
        }
      }
    },
    created() {
      this.getProductAttrCateList();
    },
    watch: {
      productId:function (newValue) {
        if(!this.isEdit)return;
        if(this.hasEditCreated)return;
        if(newValue===undefined||newValue==null||newValue===0)return;
        this.handleEditCreated();
      }
    },
    methods: {
      handleEditCreated() {
        //根据商品属性分类id获取属性和参数
        if(this.value.product_attribute_category_id!=null){
          this.handleProductAttrChange(this.value.product_attribute_category_id);
        }
        this.hasEditCreated=true;
      },
      getProductAttrCateList() {
        let param = {page: 1, list_row: 100};
        fetchProductAttrCateList(param).then(response => {
          this.productAttributeCategoryOptions = [];
          let list = response.list;
          for (let i = 0; i < list.length; i++) {
            this.productAttributeCategoryOptions.push({label: list[i].name, value: list[i].id});
          }
        });
      },
      getProductAttrList(type, cid) {
        let param = {page: 1, list_row: 100, type: type};
        fetchProductAttrList(cid, param).then(response => {
          let list = response.list;
          if (type === 0) {
            this.selectProductAttr = [];
            for (let i = 0; i < list.length; i++) {
              let options = [];
              let values = [];
              if (this.isEdit) {
                if (list[i].input_type === 1) {
                  //编辑状态下获取手动添加编辑属性
                  options = this.getEditAttrOptions(list[i].id);
                }
                //编辑状态下获取选中属性
                values = this.getEditAttrValues(i);
              }
              this.selectProductAttr.push({
                id: list[i].id,
                name: list[i].name,
                handAddStatus: list[i].hand_add_status,
                inputList: list[i].input_list,
                inputListIds: list[i].input_list_id.split(','),
                values: values,
                options: options
              });
            }
            // if(this.isEdit){
            //   //编辑模式下刷新商品属性图片
            //   this.refreshProductAttrPics();
            // }
          } else {
            this.selectProductParam = [];
            for (let i = 0; i < list.length; i++) {
              let value=null;
              if(this.isEdit){
                //编辑模式下获取参数属性
                value= this.getEditParamValue(list[i].id);
              }
              this.selectProductParam.push({
                id: list[i].id,
                name: list[i].name,
                value: value,
                inputType: list[i].input_type,
                inputList: list[i].input_list
              });
            }
          }
        });
      },
      //获取设置的可手动添加属性值
      getEditAttrOptions(id) {
        let options = [];
        for (let i = 0; i < this.value.product_attribute_value_list.length; i++) {
          let attrValue = this.value.product_attribute_value_list[i];
          if (attrValue.product_attribute_id === id) {
            let strArr = attrValue.value.split(',');
            for (let j = 0; j < strArr.length; j++) {
              options.push(strArr[j]);
            }
            break;
          }
        }
        return options;
      },
      //获取选中的属性值
      getEditAttrValues(index) {
        let values = new Set();
        if (index === 0) {
          for (let i = 0; i < this.value.sku_stock_list.length; i++) {
            let sku = this.value.sku_stock_list[i];
            let spData = sku.property_value.split(",");
            if (spData!= null && spData.length>=1) {
              let spDataArr=spData[0].split(':');
              values.add(spDataArr[1]);
            }
          }
        } else if (index === 1) {
          for (let i = 0; i < this.value.sku_stock_list.length; i++) {
            let sku = this.value.sku_stock_list[i];
            let spData = sku.property_value.split(",");
            if (spData!= null && spData.length>=2) {
              let spDataArr=spData[1].split(':');
              values.add(spDataArr[1]);
            }
          }
        } else {
          for (let i = 0; i < this.value.sku_stock_list.length; i++) {
            let sku = this.value.sku_stock_list[i];
            let spData = sku.property_value.split(",");
            if (spData!= null && spData.length>=3) {
              let spDataArr=spData[2].split(':');
              values.add(spDataArr[1]);
            }
          }
        }
        return Array.from(values);
      },
      //获取属性的id
      getEditAttrValueIds(index) {
        let valueIds = new Set();
        if (index === 0) {
          for (let i = 0; i < this.value.sku_stock_list.length; i++) {
            let sku = this.value.sku_stock_list[i];
            let spData = sku.sku_property.split(",");
            if (spData!= null && spData.length>=1) {
              let spDataArr=spData[0].split(':');
              valueIds.add(spDataArr[1]);
            }
          }
        } else if (index === 1) {
          for (let i = 0; i < this.value.sku_stock_list.length; i++) {
            let sku = this.value.sku_stock_list[i];
            let spData = sku.sku_property.split(",");
            if (spData!= null && spData.length>=2) {
              let spDataArr=spData[1].split(':');
              valueIds.add(spDataArr[1]);
            }
          }
        } else {
          for (let i = 0; i < this.value.sku_stock_list.length; i++) {
            let sku = this.value.sku_stock_list[i];
            let spData = sku.sku_property.split(",");
            if (spData!= null && spData.length>=3) {
              let spDataArr=spData[2].split(':');
              valueIds.add(spDataArr[1]);
            }
          }
        }
        return Array.from(valueIds);
      },
      //获取属性的值
      getEditParamValue(id){
        for(let i=0;i<this.value.product_attribute_value_list.length;i++){
          if(id===this.value.product_attribute_value_list[i].product_attribute_id){
            return this.value.product_attribute_value_list[i].value;
          }
        }
      },
      handleProductAttrChange(value) {
        this.getProductAttrList(0, value);
        this.getProductAttrList(1, value);
      },
      getInputListArr(inputList) {
        return inputList.split(',');
      },
      handleAddProductAttrValue(idx) {
        let options = this.selectProductAttr[idx].options;
        if (this.addProductAttrValue == null || this.addProductAttrValue == '') {
          this.$message({
            message: '属性值不能为空',
            type: 'warning',
            duration: 1000
          });
          return
        }
        if (options.indexOf(this.addProductAttrValue) !== -1) {
          this.$message({
            message: '属性值不能重复',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        this.selectProductAttr[idx].options.push(this.addProductAttrValue);
        this.addProductAttrValue = null;
      },
      handleRemoveProductAttrValue(idx, index) {
        this.selectProductAttr[idx].options.splice(index, 1);
      },
      getProductSkuSp(row, index) {
        let spData = row.property_value.split(',');
        if(spData!=null&&index<spData.length){
          let spDataArr=spData[index].split(':');
          return spDataArr[1];
        }else{
          return null;
        }
      },
      handleRefreshProductSkuList() {
        this.$confirm('刷新列表将导致sku信息重新生成，是否要刷新', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //this.refreshProductAttrPics();
          this.refreshProductSkuList();
        });
      },
      handleSyncProductSkuPrice(){
        this.$confirm('将同步第一个sku的价格到所有sku,是否继续', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(this.value.sku_stock_list!==null&&this.value.sku_stock_list.length>0){
            let tempSkuList = [];
            tempSkuList = tempSkuList.concat(tempSkuList,this.value.sku_stock_list);
            let price=this.value.sku_stock_list[0].sku_price;
            for(let i=0;i<tempSkuList.length;i++){
              tempSkuList[i].sku_price=price;
            }
            this.value.sku_stock_list=[];
            this.value.sku_stock_list=this.value.sku_stock_list.concat(this.value.sku_stock_list,tempSkuList);
          }
        });
      },
      handleSyncProductSkuStock(){
        this.$confirm('将同步第一个sku的库存到所有sku,是否继续', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(this.value.sku_stock_list!==null&&this.value.sku_stock_list.length>0){
            let tempSkuList = [];
            tempSkuList = tempSkuList.concat(tempSkuList,this.value.sku_stock_list);
            let stock=this.value.sku_stock_list[0].sku_stock;
            let low_stock=this.value.sku_stock_list[0].low_stock;
            for(let i=0;i<tempSkuList.length;i++){
              tempSkuList[i].sku_stock=stock;
              tempSkuList[i].low_stock=low_stock;
            }
            this.value.sku_stock_list=[];
            this.value.sku_stock_list=this.value.sku_stock_list.concat(this.value.sku_stock_list,tempSkuList);
          }
        });
      },
      refreshProductSkuList() {
        this.value.sku_stock_list = [];
        let skuList = this.value.sku_stock_list;
        //只有一个属性时
        if (this.selectProductAttr.length === 1) {
          let attr = this.selectProductAttr[0];
          for (let i = 0; i < attr.values.length; i++) {
            skuList.push({
              sku_property:attr.id+':'+attr.inputListIds[i],
              property_value: attr.name+':'+attr.values[i]
            });
          }
        } else if (this.selectProductAttr.length === 2) {
          let attr0 = this.selectProductAttr[0];
          let attr1 = this.selectProductAttr[1];
          for (let i = 0; i < attr0.values.length; i++) {
            if (attr1.values.length === 0) {
              skuList.push({
                sku_property:attr0.id+':'+attr0.inputListIds[i],
                property_value:attr0.name+':'+attr0.values[i]
              });
              continue;
            }
            for (let j = 0; j < attr1.values.length; j++) {
              let spData = [];
              let spIdData = [];
              spIdData.push(attr0.id+':'+attr0.inputListIds[i]);
              spIdData.push(attr1.id+':'+attr1.inputListIds[j]);
              spData.push(attr0.name+':'+attr0.values[i]);
              spData.push(attr1.name+':'+attr1.values[j]);
              skuList.push({
                sku_property:spIdData.join(','),
                property_value: spData.join(',')
              });
            }
          }
        } else {
          let attr0 = this.selectProductAttr[0];
          let attr1 = this.selectProductAttr[1];
          let attr2 = this.selectProductAttr[2];
          for (let i = 0; i < attr0.values.length; i++) {
            if (attr1.values.length === 0) {
              skuList.push({
                sku_property: attr0.id+':'+attr0.inputListIds[i],
                property_value: attr0.name+':'+attr0.values[i]
              });
              continue;
            }
            for (let j = 0; j < attr1.values.length; j++) {
              if (attr2.values.length === 0) {
                let spData = [];
                let spIdData = [];
                spIdData.push(attr0.id+':'+attr0.inputListIds[i]);
                spIdData.push(attr1.id+':'+attr1.inputListIds[j]);
                spData.push(attr0.name+':'+attr0.values[i]);
                spData.push(attr1.name+':'+attr1.values[j]);
                skuList.push({
                  sku_property:spIdData.join(','),
                  property_value: spData.join(',')
                });
                continue;
              }
              for (let k = 0; k < attr2.values.length; k++) {
                let spData = [];
                let spIdData = [];
                spIdData.push(attr0.id+':'+attr0.inputListIds[i]);
                spIdData.push(attr1.id+':'+attr1.inputListIds[j]);
                spIdData.push(attr2.id+':'+attr1.inputListIds[k]);
                spData.push(attr0.name+':'+attr0.values[i]);
                spData.push(attr1.name+':'+attr1.values[j]);
                spData.push(attr2.name+':'+attr2.values[k]);
                skuList.push({
                  sku_property:spIdData.join(','),
                  property_value: spData.join(',')
                });
              }
            }
          }
        }
      },
      // refreshProductAttrPics() {
      //   this.selectProductAttrPics = [];
      //   if (this.selectProductAttr.length >= 1) {
      //     let values = this.selectProductAttr[0].values;
      //     for (let i = 0; i < values.length; i++) {
      //       let pic=null;
      //       if(this.isEdit){
      //         //编辑状态下获取图片
      //         pic=this.getProductSkuPic(values[i]);
      //       }
      //       this.selectProductAttrPics.push({name: values[i], pic: pic})
      //     }
      //   }
      // },
      //获取商品相关属性的图片
      // getProductSkuPic(name){
      //   for(let i=0;i<this.value.sku_stock_list.length;i++){
      //     let spData = JSON.parse(this.value.sku_stock_list[i].spData);
      //     if(name===spData[0].value){
      //       return this.value.sku_stock_list[i].pic;
      //     }
      //   }
      //   return null;
      // },
      //合并商品属性
      mergeProductAttrValue() {
        this.value.product_attribute_value_list = [];
        for (let i = 0; i < this.selectProductAttr.length; i++) {
          let attr = this.selectProductAttr[i];
          if (attr.handAddStatus === 1 && attr.options != null && attr.options.length > 0) {
            this.value.product_attribute_value_list.push({
              product_attribute_id: attr.id,
              value: this.getOptionStr(attr.options)
            });
          }
        }
        for (let i = 0; i < this.selectProductParam.length; i++) {
          let param = this.selectProductParam[i];
          this.value.product_attribute_value_list.push({
            product_attribute_id: param.id,
            value: param.value
          });
        }
      },
      //合并商品属性图片
      // mergeProductAttrPics() {
      //   for (let i = 0; i < this.selectProductAttrPics.length; i++) {
      //     for (let j = 0; j < this.value.sku_stock_list.length; j++) {
      //       let spData = JSON.parse(this.value.sku_stock_list[j].spData);
      //       if (spData[0].value === this.selectProductAttrPics[i].name) {
      //         this.value.sku_stock_list[j].img = this.selectProductAttrPics[i].pic;
      //       }
      //     }
      //   }
      // },
      getOptionStr(arr) {
        let str = '';
        for (let i = 0; i < arr.length; i++) {
          str += arr[i];
          if (i != arr.length - 1) {
            str += ',';
          }
        }
        return str;
      },
      handleRemoveProductSku(index, row) {
        let list = this.value.sku_stock_list;
        if (list.length === 1) {
          list.pop();
        } else {
          list.splice(index, 1);
        }
      },
      getParamInputList(inputList) {
        return inputList.split(',');
      },
      handlePrev() {
        this.$emit('prevStep')
      },
      handleFinishCommit(){
        this.mergeProductAttrValue();
        this.$emit('finishCommit',this.isEdit);
      }
    }
  }
</script>

<style scoped>
  .littleMarginLeft {
    margin-left: 10px;
  }

  .littleMarginTop {
    margin-top: 10px;
  }

  .paramInput {
    width: 250px;
  }

  .paramInputLabel {
    display: inline-block;
    width: 100px;
    text-align: right;
    padding-right: 10px
  }

  .cardBg {
    background: #F8F9FC;
  }
</style>
