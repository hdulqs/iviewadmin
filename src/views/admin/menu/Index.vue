<template>
  <div id="sysMenuIndex" class="layout-content">
    <div class="layout-content-main">
      <DataTable
        :url="sysApis.sys.menu.find"
        :columns="columns"
        :searchForm="searchForm">
        <template slot="function">
          <Button type="primary" @click="handleAdd">新增</Button>
        </template>
        <template slot="search">
          <Form-item label="所属系统" :label-width="60">
            <SystemCombo v-model="searchForm.sid" needAll></SystemCombo>
          </Form-item>
          <Form-item label="菜单名称" :label-width="60">
            <Input type="text" v-model="searchForm.name"></Input>
          </Form-item>
          <Form-item label="url" :label-width="30">
            <Input type="text" v-model="searchForm.path"></Input>
          </Form-item>
        </template>
      </DataTable>
      <FormDialog :initOption="menuFormInitOption"></FormDialog>
    </div>
  </div>
</template>
<script>
import DataTable from '@/components/DataTable';
import FormDialog from '@/views/admin/menu/FormDialog';
import SystemCombo from '@/components/SystemCombo';
import sysApis from '../../../apis';

export default {
  name: 'sysMenuIndex',
  data () {
    return {
      sysApis: sysApis,
      columns: [{
        title: 'ID',
        key: 'id'
      }, {
        title: '菜单名称',
        key: 'name'
      }, {
        title: '所属系统',
        key: 'sname'
      }, {
        title: '父菜单',
        key: 'pid'
      }, {
        title: '路径',
        key: 'path'
      }, {
        title: '图标',
        key: 'icon',
        render (row) {
          if (row.icon) {
            return `<Icon type="#{row.icon}"></Icon>`;
          } else {
            return '';
          }
        }
      }, {
        title: '顺序',
        key: 'sort'
      }, {
        title: '是否父菜单',
        key: 'isparent',
        render (row) {
          switch (row.isparent) {
            case true:
              return '是';
            case false:
              return '否';
            default:
              return '';
          }
        }
      }, {
        title: '描述',
        key: 'description'
      }, {
        title: '操作',
        key: 'action',
        render (row, column, index) {
          return `<i-button type="primary" size="small" @click="handleView('${row.id}')">查看</i-button>
          <i-button type="warning" size="small" @click="handleEdit('${row.id}')">编辑</i-button>
          <i-button type="error" size="small" @click="hanldeDelete('${row.id}', '${row.name}')">删除</i-button>`;
        }
      }],
      searchForm: {
        name: '',
        url: ''
      },
      menuFormInitOption: {
        title: '',
        action: '',
        showModal: false,
        id: ''
      }
    };
  },
  methods: {
    handleAdd () {
      this.menuFormInitOption.title = '新增菜单';
      this.menuFormInitOption.action = 'add';
      this.menuFormInitOption.showModal = true;
    },
    handleView (id) {
      this.$Modal.info({
        title: '菜单信息',
        content: '1111',
        scrollable: true
      });
    },
    handleEdit (id) {
      this.menuFormInitOption.title = '编辑菜单';
      this.menuFormInitOption.action = 'edit';
      this.menuFormInitOption.showModal = true;
      this.menuFormInitOption.id = id;
      this.$children[1].getInfo();
    },
    hanldeDelete (id, name) {
      this.$Modal.confirm({
        title: '请确认',
        content: '确定删除【' + name + '】菜单？',
        onOk: () => {
          this.$http.jsonp(sysApis.sys.menu.delete, {
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
    SystemCombo
  }
};
</script>
<style>
</style>
