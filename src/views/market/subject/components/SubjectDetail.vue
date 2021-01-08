<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="subject"
             :rules="rules"
             ref="subjectFrom"
             label-width="150px">
      <el-form-item label="分类名称：" prop="name">
        <el-input v-model="subject.name"></el-input>
      </el-form-item>
<!--      <el-form-item label="上级分类：">-->
<!--        <el-select v-model="subject.pid"-->
<!--                   placeholder="请选择分类">-->
<!--          <el-option-->
<!--            v-for="item in selectSubjectList"-->
<!--            :key="item.id"-->
<!--            :label="item.name"-->
<!--            :value="item.id">-->
<!--          </el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->
      <el-form-item label="排序：">
        <el-input v-model="subject.sort_num"></el-input>
      </el-form-item>
      <el-form-item label="是否显示：">
        <el-radio-group v-model="subject.status">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否显示首页：">
        <el-radio-group v-model="subject.show_home">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否显示首页活动：">
        <el-radio-group v-model="subject.show_home_recommend">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="分类图标：">
        <single-upload v-model="subject.icon"></single-upload>
      </el-form-item>
      <el-form-item label="关键词：">
        <el-input v-model="subject.keywords"></el-input>
      </el-form-item>
      <el-form-item label="描述：">
        <el-input type="textarea" :autosize="true" v-model="subject.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('subjectFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('subjectFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import {fetchList, createApiSubject, updateApiSubject, getApiSubject} from '@/api/subject';
  //import {fetchListWithAttr} from '@/api/productAttrCate';
  //import {getProductAttrInfo} from '@/api/productAttr';
  import SingleUpload from '@/components/Upload/singleUpload';

  const defaultSubject = {
    description: '',
    icon: '',
    keywords: '',
    name: '',
    pid: 0,
    status: 0,
    show_home: 0,
    show_home_recommend: 0,
    sort_num: 0
  };
  export default {
    name: "SubjectDetail",
    components: {SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        subject: Object.assign({}, defaultSubject),
        selectSubjectList: [],
        rules: {
          name: [
            {required: true, message: '请输入分类名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
        getApiSubject(this.$route.query.id).then(response => {
          this.subject = response;
        });
        // getProductAttrInfo(this.$route.query.id).then(response => {
        //   if (response != null && response.length > 0) {
        //     this.filterProductAttrList = [];
        //     for (let i = 0; i < response.length; i++) {
        //       this.filterProductAttrList.push({
        //         key: Date.now() + i,
        //         value: [response[i].attributeCategoryId, response[i].attributeId]
        //       })
        //     }
        //   }
        // });
      } else {
        this.subject = Object.assign({}, defaultSubject);
      }
      this.getSelectSubjectList();
      //this.getProductAttrCateList();
    },
    methods: {
      getSelectSubjectList() {
        fetchList(0, {list_row: 100, page: 1}).then(response => {
          this.selectSubjectList = response.list;
          this.selectSubjectList.unshift({id: 0, name: '无上级分类'});
        });
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                //this.subject.productAttributeIdList = this.getProductAttributeIdList();
                updateApiSubject(this.subject).then(response => {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              } else {
                //this.subject.productAttributeIdList = this.getProductAttributeIdList();
                createApiSubject(this.subject).then(response => {
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
        this.subject = Object.assign({}, defaultSubject);
        this.getSelectSubjectList();
        this.filterProductAttrList = [{
          value: []
        }];
      }
    }
  }
</script>

<style scoped>

</style>
