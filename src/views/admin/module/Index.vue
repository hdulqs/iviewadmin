<template>
  <div id="sysModuleIndex" class="layout-content">
    <div class="layout-content-main">
      <DataTable
        :url="sysApis.sys.module.find"
        :columns="columns"
        :searchForm="searchForm">
        <template slot="function">
          <Button type="primary" @click="handleAdd" icon="ios-plus">新增</Button>
        </template>
        <template slot="search">
          <Form-item label="所属系统" :label-width="60" prop="sid">
            <SystemCombo v-model="searchForm.sid" :needAll="true"></SystemCombo>
          </Form-item>
          <Form-item label="模块名称" :label-width="60" prop="name">
            <Input type="text" v-model="searchForm.name"></Input>
          </Form-item>
        </template>
      </DataTable>
      <FormDialog :initOption="moduleFormInitOption"></FormDialog>
    </div>
  </div>
</template>
<script>
import DataTable from '@/components/DataTable';
import FormDialog from '@/views/admin/module/FormDialog';
import SystemCombo from '@/components/SystemCombo';
import sysApis from '../../../apis';

export default {
  name: 'sysModuleIndex',
  data () {
    return {
      sysApis: sysApis,
      columns: [{
        title: '所属系统',
        key: 'sname'
      }, {
        title: '模块名称',
        key: 'name'
      }, {
        title: '描述',
        key: 'description'
      }, {
        title: '操作',
        key: 'action',
        width: 80,
        render (row, column, index) {
          return `<Dropdown
                    trigger="click"
                    @on-click="handle(row, $event)">
                    <i-button type="ghost" icon="ios-more"></i-button>
                    <Dropdown-menu slot="list">
                      <Dropdown-item name="view">查看</Dropdown-item>
                      <Dropdown-item name="edit">编辑</Dropdown-item>
                      <Dropdown-item name="delete">删除</Dropdown-item>
                    </Dropdown-menu>
                  </Dropdown>`;
        }
      }],
      searchForm: {
        name: '',
        sid: ''
      },
      moduleFormInitOption: {
        title: '',
        action: '',
        showModal: false,
        id: ''
      }
    };
  },
  methods: {
    handleAdd () {
      this.moduleFormInitOption.title = '新增模块';
      this.moduleFormInitOption.action = 'add';
      this.moduleFormInitOption.showModal = true;
      this.$children[1].reset();
    },
    handleView (id) {
      this.$Modal.info({
        title: '模块信息',
        content: '查看模块信息',
        scrollable: true
      });
    },
    handleEdit (id) {
      this.moduleFormInitOption.title = '编辑模块';
      this.moduleFormInitOption.action = 'edit';
      this.moduleFormInitOption.showModal = true;
      this.moduleFormInitOption.id = id;
      this.$children[1].getInfo();
    },
    hanldeDelete (id, name) {
      this.$Modal.confirm({
        title: '请确认',
        content: '确定删除【' + name + '】模块？',
        onOk: () => {
          this.$http.get(sysApis.sys.module.delete, {
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
    },
    handle (row, operator) {
      switch (operator) {
        case 'view':
          this.handleView(row.id);
          break;
        case 'edit':
          this.handleEdit(row.id);
          break;
        case 'delete':
          this.hanldeDelete(row.id, row.name);
          break;
      }
    }
  },
  components: {
    DataTable,
    FormDialog,
    SystemCombo
  }
};
</script>
<style>
</style>
