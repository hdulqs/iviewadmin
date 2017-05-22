<template>
  <div id="sysUserIndex" class="layout-content">
    <div class="layout-content-main">
      <DataTable
        :url="sysApis.sys.user.find"
        :columns="columns"
        :searchForm="searchForm">
        <template slot="function">
          <Button type="primary" @click="handleAdd">新增</Button>
        </template>
        <template slot="search">
          <Form-item label="用户名" :label-width="60" prop="username">
            <Input type="text" v-model="searchForm.username"></Input>
          </Form-item>
          <Form-item
            label="邮箱"
            :label-width="40"
            prop="email">
            <Input type="text" v-model="searchForm.email"></Input>
          </Form-item>
          <Form-item label="昵称" :label-width="40" prop="name">
            <Input type="text" v-model="searchForm.name"></Input>
          </Form-item>
          <Form-item label="状态" :label-width="40" prop="status">
            <Select v-model="searchForm.status">
              <Option label="全部" value=""></Option>
              <Option label="正常" value="1"></Option>
              <Option label="禁用" value="0"></Option>
            </Select>
          </Form-item>
        </template>
      </DataTable>
      <FormDialog :initOption="userFormInitOption"></FormDialog>
      <GroupCheckBoxs :initOption="initGroupCheckbox"></GroupCheckBoxs>
    </div>
  </div>
</template>
<script>
import DataTable from '@/components/DataTable';
import FormDialog from '@/views/admin/user/FormDialog';
import sysApis from '../../../apis';
import GroupCheckBoxs from './GroupCheckBoxs';

export default {
  name: 'sysUserIndex',
  data () {
    return {
      sysApis: sysApis,
      columns: [{
        title: '用户名',
        key: 'username'
      }, {
        title: '昵称',
        key: 'name'
      }, {
        title: 'email',
        key: 'email'
      }, {
        title: '启用状态',
        key: 'status',
        align: 'center',
        render (row) {
          if (row.status === '1') {
            return `<Tag color="green">启用</Tag>`;
          } else if (row.status === '0') {
            return `<Tag color="red">禁用</Tag>`;
          } else {
            return `<Tag color="yellow">未知状态</Tag>`;
          }
        }
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
                      <Dropdown-item name="unlockUser" v-if="!${row.status}">启用</Dropdown-item>
                      <Dropdown-item name="lockUser" v-if="${row.status}">禁用</Dropdown-item>
                      <Dropdown-item name="grantGroup">分组</Dropdown-item>
                    </Dropdown-menu>
                  </Dropdown>`;
        }
      }],
      searchForm: {
        username: '',
        name: '',
        email: '',
        status: ''
      },
      userFormInitOption: {
        title: '',
        action: '',
        showModal: false,
        id: ''
      },
      initGroupCheckbox: {
        id: '',
        visible: false
      }
    };
  },
  methods: {
    handleAdd () {
      this.userFormInitOption.title = '新增用户';
      this.userFormInitOption.action = 'add';
      this.userFormInitOption.showModal = true;
      this.$children[1].reset();
    },
    handleView (id) {
      this.$Modal.info({
        title: '用户信息',
        content: '查看用户信息',
        scrollable: true
      });
    },
    handleEdit (id) {
      this.userFormInitOption.title = '编辑用户';
      this.userFormInitOption.action = 'edit';
      this.userFormInitOption.showModal = true;
      this.userFormInitOption.id = id;
      this.$children[1].getInfo();
    },
    hanldeDelete (id) {
      this.$Modal.confirm({
        title: '请确认',
        content: '确定删除该用户？',
        onOk: () => {
          this.$http.get(sysApis.sys.user.delete, {
            params: {
              id: id
            }
          }).then(response => {
            if (response.body.success) {
              this.$Notice.success({
                title: '提示',
                desc: '该用户已成功删除！'
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
    lockOrUnlockUser (id, name, status) {
      let title = '';
      if (status === '0') {
        title = '禁用';
      } else if (status === '1') {
        title = '启用';
      }
      this.$Modal.confirm({
        title: '请确认',
        content: '确定' + title + '【' + name + '】用户？',
        onOk: () => {
          this.$http.get(sysApis.sys.user.lockOrUnlock, {
            params: {
              id: id,
              status: status
            }
          }).then(response => {
            if (response.body.success) {
              this.$Notice.success({
                title: '提示',
                desc: title + '【' + name + '】用户成功！'
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
          this.hanldeDelete(row.id);
          break;
        case 'lockUser':
          this.lockOrUnlockUser(row.id, row.name, 0);
          break;
        case 'unlockUser':
          this.lockOrUnlockUser(row.id, row.name, 1);
          break;
        case 'grantGroup':
          this.grantGroup(row.id);
          break;
      }
    },
    grantGroup (id) {
      console.log(id);
      this.initGroupCheckbox.id = id;
      this.initGroupCheckbox.visible = true;
    }
  },
  components: {
    DataTable,
    FormDialog,
    GroupCheckBoxs
  }
};
</script>
<style>
</style>
