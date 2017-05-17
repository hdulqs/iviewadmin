<template>
  <Modal
    id="sysModuleFormDialog"
    v-model="initOption.showModal"
    :mask-closable="false">
    <p slot="header" style="color:#f60;text-align:center;">
      <Icon type="information-circled"></Icon>
      <span>{{initOption.title}}</span>
    </p>
    <Form
      ref="moduleForm"
      :model="moduleForm"
      :rules="formRules"
      :label-width="90">
      <Form-item prop="id" v-if="initOption.action === 'edit'">
        <input type="hidden" :model="moduleForm.id">
      </Form-item>
      <Form-item label="所属系统" prop="sid">
        <SystemCombo v-model="moduleForm.sid" :showDesc="true"></SystemCombo>
      </Form-item>
      <Form-item label="模块名称" prop="name">
        <Input type="text" v-model="moduleForm.name" placeholder="请输入模块名称"></Input>
      </Form-item>
      <Form-item label="描述" prop="description">
        <Input
          type="textarea"
          v-model="moduleForm.description"
          placeholder="请输入描述"></Input>
      </Form-item>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="handleSubmit">保存</Button>
      <Button type="error" @click="reset" v-if="initOption.action === 'add'">重置</Button>
    </div>
  </Modal>
</template>
<script>
import SystemCombo from '@/components/SystemCombo';
import sysApis from '../../../apis';

export default {
  name: 'sysModuleFormDialog',
  props: {
    initOption: {
      title: {
        type: String,
        default: '新增资源'
      },
      action: {
        type: String,
        default: 'add'
      },
      showModal: {
        type: Boolean
      },
      id: {
        type: String
      }
    }
  },
  data () {
    return {
      formRules: {
        sid: [
          {required: true, type: 'string', message: '所属系统必选', trigger: 'change'}
        ],
        name: [
          {required: true, type: 'string', message: '模块名称不能为空', trigger: 'blur'}
        ]
      },
      moduleForm: {
        id: this.initOption.id,
        sid: '',
        name: '',
        description: ''
      },
      systemList: []
    };
  },
  methods: {
    getInfo () {
      this.$http.get(sysApis.sys.module.get, {
        params: {
          id: this.initOption.id
        }
      }).then(response => {
        if (response.body.success) {
          this.moduleForm = response.body.obj;
        } else {
          this.$Modal.error({
            title: '提示',
            content: response.body.msg
          });
        }
      }, response => {
        this.$Modal.error({
          title: '提示',
          content: '网络不通！'
        });
      });
    },
    handleSubmit () {
      this.$refs.moduleForm.validate((valid) => {
        if (valid) {
          let url;
          if (this.initOption.action === 'add') {
            url = sysApis.sys.module.save;
          } else if (this.initOption.action === 'edit') {
            url = sysApis.sys.module.update;
          }
          this.$http.post(url, this.moduleForm).then(response => {
            if (response.body.success) {
              this.$Notice.success({
                title: '提示',
                desc: response.body.msg
              });
              this.$parent.$children[0].query();
              this.$parent.moduleFormInitOption.showModal = false;
              this.reset();
            } else {
              this.$Notice.error({
                title: '提示',
                desc: response.body.msg
              });
            }
          }, response => {
            this.$Notice.error({
              title: '提示',
              desc: '网络异常，请稍后再试！'
            });
          });
        }
      });
    },
    reset () {
      this.$refs.moduleForm.resetFields();
    },
    getSystemOptions (search, loading) {
      // loading(true)
      this.$http.get(sysApis.sys.system.find, {
        params: {
          pageSize: 50
        }
      }, (response) => {
        if (response.body.success) {
          this.systemList = response.body.obj.list;
          // loading(false)
        }
      });
    }
  },
  components: {
    SystemCombo
  }
};
</script>
<style>
</style>
