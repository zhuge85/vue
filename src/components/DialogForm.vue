<template>
  <el-dialog @close="clearValidate('form')" :title="dialog.title" :visible.sync="dialog.show" :close-on-click-modal='false' :close-on-press-escape='false' :modal-append-to-body="false" center>
    <el-form :model="form" ref="form" :rules="form_rules">
      <el-form-item prop="title" label="标题" :label-width="formLabelWidth">
        <el-input v-model="form.title" placeholder="请填写标题"></el-input>
      </el-form-item>
      <el-form-item prop="type" label="标签" :label-width="formLabelWidth">
        <el-select v-model="form.type" placeholder="请选择活动区域标签">
          <el-option v-for="item in labelarr" :label="item.title" :value="item.title" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog('form')">取 消</el-button>
      <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialog: Object,
    form: Object
  },
  data() {
    return {
      labelarr: null,
      formLabelWidth: '120px',
      form_rules: {
        title: [{ required: true, message: "标签名不能为空！", trigger: "blur" }],
        type: [{ required: true, message: "路径名不能为空！", trigger: "blur" }]
      }
    };
  },
  created() {
    this.label()
  },
  methods: {
    label() {
      this.$axios('/index/label.php').then(res => {
        let arr = []
        res.data.forEach(item => {
          arr.push({
            id: item.id,
            title: item.title
          })
        })
        this.labelarr = arr;
      })
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const url = this.dialog.option == "add" ? "add" : `edit/${this.form.id}`
          const info = this.dialog.option == "add" ? "添加成功！" : "编辑成功！"
          // this.$axios.post(`/api/labels/${url}`, this.form).then(res => {
          // 操作成功
          this.$message({
            message: info,
            type: "success"
          })
          this.dialog.show = false
          this.clearValidate(formName)
          this.$emit("update")
          // });
        } else {
          this.$message.warning('请填写必要的信息')
          return false;
        }
      })
    },
    clearValidate(formName) {
      this.$refs[formName].resetFields()
    },
    closeDialog(formName) {
      this.dialog.show = false
    }
  }
}
</script>