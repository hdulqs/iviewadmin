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
    </div>
  </div>
</template>
<script>
import DataTable from '@/components/DataTable';
import FormDialog from '@/views/admin/user/FormDialog';
import sysApis from '../../../apis';

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
        render (row, column, index) {
          return `<Button-group>
                  <i-button type="primary" size="small" @click="handleView('${row.id}')" icon="ios-search"></i-button>
                  <i-button type="warning" size="small" @click="handleEdit('${row.id}')" icon="edit"></i-button>
                  <i-button type="warning" size="small" @click="lockOrUnlockUser('${row.id}', '${row.name}', '1')" icon="ios-unlocked" v-if="!${row.status}"></i-button>
                  <i-button type="error" size="small" @click="lockOrUnlockUser('${row.id}', '${row.name}', '0')" icon="ios-locked" v-if="${row.status}"></i-button>
                  <i-button type="error" size="small" @click="hanldeDelete('${row.id}', '${row.name}')" icon="ios-trash"></i-button>
                  </Button-group>`;
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
    hanldeDelete (id, name) {
      this.$Modal.confirm({
        title: '请确认',
        content: '确定删除【' + name + '】用户？',
        onOk: () => {
          this.$http.jsonp(sysApis.sys.user.delete, {
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
    lockOrUnlockUser (id, name, status) {
      let title = '';
      if (status === '0') {
        title = '锁定';
      } else if (status === '1') {
        title = '解锁';
      }
      this.$Modal.confirm({
        title: '请确认',
        content: '确定' + title + '【' + name + '】用户？',
        onOk: () => {
          this.$http.jsonp(sysApis.sys.user.lockOrUnlock, {
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
