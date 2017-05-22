<template>
  <div id="sysGroupIndex" class="layout-content">
    <div class="layout-content-main">
      <DataTable
        :url="sysApis.sys.group.find"
        :columns="columns"
        :searchForm="searchForm">
        <template slot="function">
          <Button type="primary" @click="handleAdd">新增</Button>
        </template>
        <template slot="search">
          <Form-item label="组名称" :label-width="60">
            <Input type="text" v-model="searchForm.name"></Input>
          </Form-item>
        </template>
      </DataTable>
      <FormDialog :initOption="groupFormInitOption"></FormDialog>
    </div>
  </div>
</template>
<script>
import DataTable from '@/components/DataTable';
import FormDialog from '@/views/admin/group/FormDialog';
import sysApis from '../../../apis';

export default {
  name: 'sysGroupIndex',
  data: function data () {
    return {
      sysApis: sysApis,
      columns: [{
        title: 'ID',
        key: 'id'
      }, {
        title: '组名称',
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
      groupFormInitOption: {
        title: '',
        action: '',
        showModal: false,
        id: ''
      }
    };
  },
  methods: {
    handleAdd () {
      this.groupFormInitOption.title = '新增分组';
      this.groupFormInitOption.action = 'add';
      this.groupFormInitOption.showModal = true;
      this.$children[1].reset();
    },
    handleView (id) {
      this.$Modal.info({
        title: '分组信息',
        content: '查看分组信息',
        scrollable: true
      });
    },
    handleEdit (id) {
      this.groupFormInitOption.title = '编辑分组';
      this.groupFormInitOption.action = 'edit';
      this.groupFormInitOption.showModal = true;
      this.groupFormInitOption.id = id;
      this.$children[1].getInfo();
    },
    hanldeDelete (id, name) {
      this.$Modal.confirm({
        title: '请确认',
        content: '确定删除【' + name + '】分组？',
        onOk: () => {
          this.$http.get(sysApis.sys.group.delete, {
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
