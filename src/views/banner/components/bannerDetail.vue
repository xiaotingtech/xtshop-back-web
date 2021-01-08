<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="banner"
             :rules="rules"
             ref="bannerFrom"
             label-width="150px">
      <el-form-item label="分类名称：" prop="name">
        <el-input v-model="banner.title"></el-input>
      </el-form-item>
      <el-form-item label="版本：">
        <el-select v-model="banner.version"
                   placeholder="请选择分类">
          <el-option
            v-for="item in selectVersionList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型：">
        <el-select v-model="banner.type"
                   placeholder="请选择类型">
          <el-option
            v-for="(item,typeKey) in selectTypeList"
            :key="typeKey+1"
            :label="item"
            :value="typeKey+1">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="跳转类型：">
        <el-select v-model="banner.target_type"
                   placeholder="请选择跳转类型">
          <el-option
            v-for="(item,typeKey) in selectTargetTypeList"
            :key="typeKey+1"
            :label="item"
            :value="typeKey+1">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="轮播图内容：" prop="url">
        <el-input v-model="banner.url"></el-input>
      </el-form-item>
      <el-form-item label="轮播图：">
        <single-upload v-model="banner.pic"></single-upload>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input v-model="banner.sort_num"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('bannerFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('bannerFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import {fetchList, createBanner, updateBanner, getBanner} from '@/api/banner';
  //import {fetchListWithAttr} from '@/api/productAttrCate';
  //import {getProductAttrInfo} from '@/api/productAttr';
  import SingleUpload from '@/components/Upload/singleUpload';

  const defaultBanner = {
    pic: '',
    title: '',
    url: '',
    version:1,
    type: 1,
    target_type: 1,
    sort_num: 0,
  };
  export default {
    name: "BannerDetail",
    components: {SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        banner: Object.assign({}, defaultBanner),
        selectVersionList: [
          {
            'id':1,
            "name":'第一版'
          },
          {
            'id':2,
            "name":'第二版'
          },
        ],
        selectTypeList: [],
        selectTargetTypeList:[],
        rules: {
          title: [
            {required: true, message: '请输入分类名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
        getBanner(this.$route.query.id).then(response => {
          this.banner = response.banner;
          this.selectTargetTypeList=response.target_types;
          this.selectTypeList=response.types;
        });
      } else {
        getBanner(0).then(response => {
          this.selectTargetTypeList=response.target_types;
          this.selectTypeList=response.types;
        });
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                //this.banner.productAttributeIdList = this.getProductAttributeIdList();
                updateBanner(this.banner).then(response => {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              } else {
                //this.banner.productAttributeIdList = this.getProductAttributeIdList();
                createBanner(this.banner).then(response => {
                  this.$refs[formName].resetFields();
                  this.resetForm(formName);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration: 1000
                  });
                });
              }
            });

          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration: 1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.banner = Object.assign({}, defaultBanner);
      },
      removeFilterAttr(productAttributeId) {
        if (this.filterProductAttrList.length === 1) {
          this.$message({
            message: '至少要留一个',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        var index = this.filterProductAttrList.indexOf(productAttributeId);
        if (index !== -1) {
          this.filterProductAttrList.splice(index, 1)
        }
      }
    },
    filters: {
      filterLabelFilter(index) {
        if (index === 0) {
          return '筛选属性：';
        } else {
          return '';
        }
      }
    }
  }
</script>

<style scoped>

</style>
