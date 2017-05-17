<template>
  <div id="sysSystemIndex" class="layout-content">
    <div class="layout-content-main">
      <DataTable
        :url="sysApis.sys.system.find"
        :columns="columns"
        :searchForm="searchForm">
        <template slot="function">
          <Button type="primary" @click="handleAdd">新增</Button>
        </template>
        <template slot="search">
          <Form-item label="系统名称" :label-width="60" prop="name">
            <Input type="text" v-model="searchForm.name"></Input>
          </Form-item>
        </template>
      </DataTable>
      <FormDialog :initOption="sysFormInitOption"></FormDialog>
    </div>
  </div>
</template>
<script>
import DataTable from '@/components/DataTable';
import FormDialog from '@/views/admin/system/FormDialog';
import sysApis from '../../../apis';

export default {
  name: 'sysSystemIndex',
  data () {
    return {
      sysApis: sysApis,
      columns: [{
        title: '系统名称',
        key: 'name'
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
        name: ''
      },
      sysFormInitOption: {
        title: '',
        action: '',
        showModal: false,
        id: ''
      }
    };
  },
  methods: {
    handleAdd () {
      this.sysFormInitOption.title = '新增系统';
      this.sysFormInitOption.action = 'add';
      this.sysFormInitOption.showModal = true;
      this.$children[1].reset();
    },
    handleView (id) {
      this.$Modal.info({
        title: '系统信息',
        content: '查看系统信息',
        scrollable: true
      });
    },
    handleEdit (id) {
      this.sysFormInitOption.title = '编辑系统';
      this.sysFormInitOption.action = 'edit';
      this.sysFormInitOption.showModal = true;
      this.sysFormInitOption.id = id;
      this.$children[1].getInfo();
    },
    hanldeDelete (id, name) {
      this.$Modal.confirm({
        title: '请确认',
        content: '确定删除【' + name + '】系统？',
        onOk: () => {
          this.$http.get(sysApis.sys.system.delete, {
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
    FormDialog
  }
};
</script>
<style>
</style>
