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
    FormDialog
  }
};
</script>
<style>
</style>
