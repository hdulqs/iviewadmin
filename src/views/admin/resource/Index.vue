<template>
  <div id="sysResIndex" class="layout-content">
    <div class="layout-content-main">
      <DataTable
        :url="sysApis.sys.resource.find"
        :columns="columns"
        :searchForm="searchForm">
        <template slot="function">
          <Button type="primary" @click="handleAdd">新增</Button>
        </template>
        <template slot="search">
          <Form-item label="所属系统" :label-width="60" prop="sid">
            <SystemCombo v-model="searchForm.sid" :needAll="true"></SystemCombo>
          </Form-item>
          <Form-item label="所属模块" :label-width="60" prop="mid">
            <ModuleCombo
              v-model="searchForm.mid"
              :needAll="true"
              :sid="searchForm.sid"></ModuleCombo>
          </Form-item>
          <Form-item label="资源名称" :label-width="60">
            <Input type="text" v-model="searchForm.name"></Input>
          </Form-item>
          <Form-item label="url" :label-width="30">
            <Input type="text" v-model="searchForm.url"></Input>
          </Form-item>
        </template>
      </DataTable>
      <FormDialog :initOption="resFormInitOption"></FormDialog>
    </div>
  </div>
</template>
<script>
import DataTable from '@/components/DataTable';
import FormDialog from '@/views/admin/resource/FormDialog';
import SystemCombo from '@/components/SystemCombo';
import ModuleCombo from '@/components/ModuleCombo';
import sysApis from '../../../apis';

export default {
  name: 'sysResIndex',
  data () {
    return {
      sysApis: sysApis,
      columns: [{
        title: '名称',
        key: 'name'
      }, {
        title: '类型',
        key: 'type',
        render (row) {
          if (row.type === '0') {
            return '功能资源';
          } else if (row.type === '1') {
            return '菜单资源';
          } else {
            return '未知类型';
          }
        }
      }, {
        title: '所属系统',
        key: 'sname'
      }, {
        title: '所属模块',
        key: 'mname'
      }, {
        title: 'url',
        key: 'url'
      }, {
        title: '描述',
        key: 'description'
      }, {
        title: '操作',
        key: 'action',
        render (row, column, index) {
          return `<Button-group>
                  <i-button type="primary" size="small" @click="handleView('${row.id}')" icon="ios-search"></i-button>
                  <i-button type="warning" size="small" @click="handleEdit('${row.id}')" icon="edit"></i-button>
                  <i-button type="error" size="small" @click="hanldeDelete('${row.id}', '${row.name}')" icon="ios-trash"></i-button>
                  </Button-group>`;
        }
      }],
      searchForm: {
        name: '',
        url: '',
        sid: '',
        mid: ''
      },
      resFormInitOption: {
        title: '',
        action: '',
        showModal: false,
        id: ''
      }
    };
  },
  methods: {
    handleAdd () {
      this.resFormInitOption.title = '新增资源';
      this.resFormInitOption.action = 'add';
      this.resFormInitOption.showModal = true;
      this.$children[1].reset();
    },
    handleView (id) {
      this.$Modal.info({
        title: '资源信息',
        content: '查看资源信息',
        scrollable: true
      });
    },
    handleEdit (id) {
      this.resFormInitOption.title = '编辑资源';
      this.resFormInitOption.action = 'edit';
      this.resFormInitOption.showModal = true;
      this.resFormInitOption.id = id;
      this.$children[1].getInfo();
    },
    hanldeDelete (id, name) {
      this.$Modal.confirm({
        title: '请确认',
        content: '确定删除【' + name + '】资源？',
        onOk: () => {
          this.$http.get(sysApis.sys.resource.delete, {
            params: {
              id: id
            }
          }).then(response => {
            if (response.body.success) {
              this.$Notice.success({
                title: '提示',
                desc: '【' + name + '】删除成功！'
              });
              this.$children[0].query();
            } else {
              this.$Notice.error({
                title: '提示',
                desc: response.body.msg
              });
            }
          }, response => {
            this.$Notice.error({
              title: '提示',
              desc: '网络连接失败，请稍后再试！'
            });
          });
        }
      });
    }
  },
  components: {
    DataTable,
    FormDialog,
    SystemCombo,
    ModuleCombo
  }
};
</script>
<style>
</style>
