<template>
  <div id="sysOrgIndex" class="layout-content">
    <div class="layout-content-main">
      <DataTable
        :url="sysApis.sys.org.find"
        :columns="columns"
        :searchForm="searchForm">
        <template slot="function">
          <Button type="primary" @click="handleAdd">新增</Button>
        </template>
        <template slot="search">
          <Form-item label="组织名称" :label-width="60">
            <Input type="text" v-model="searchForm.name"></Input>
          </Form-item>
        </template>
      </DataTable>
      <FormDialog :initOption="orgFormInitOption"></FormDialog>
    </div>
  </div>
</template>
<script>
import DataTable from '@/components/DataTable';
import FormDialog from '@/views/admin/org/FormDialog';
import sysApis from '../../../apis';

export default {
  name: 'sysOrgIndex',
  data () {
    return {
      sysApis: sysApis,
      columns: [{
        title: 'ID',
        key: 'id'
      }, {
        title: '组织名称',
        key: 'name'
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
      orgFormInitOption: {
        title: '',
        action: '',
        showModal: false,
        id: ''
      }
    };
  },
  methods: {
    handleAdd () {
      this.orgFormInitOption.title = '新增组织';
      this.orgFormInitOption.action = 'add';
      this.orgFormInitOption.showModal = true;
    },
    handleView (id) {
      this.$Modal.info({
        title: '组织信息',
        content: '1111',
        scrollable: true
      });
    },
    handleEdit (id) {
      this.orgFormInitOption.title = '编辑组织';
      this.orgFormInitOption.action = 'edit';
      this.orgFormInitOption.showModal = true;
      this.orgFormInitOption.id = id;
      this.$children[1].getInfo();
    },
    hanldeDelete (id, name) {
      this.$Modal.confirm({
        title: '请确认',
        content: '确定删除【' + name + '】组织？',
        onOk: () => {
          this.$http.get(sysApis.sys.org.delete, {
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
