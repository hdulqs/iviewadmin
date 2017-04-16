<template>
  <div id="sysRoleIndex" class="layout-content">
    <div class="layout-content-main">
      <DataTable
        :url="sysApis.sys.role.find"
        :columns="columns"
        :searchForm="searchForm">
        <template slot="function">
          <Button type="primary" @click="handleAdd">新增</Button>
        </template>
        <template slot="search">
          <Form-item label="角色名称" :label-width="60">
            <Input type="text" v-model="searchForm.name"></Input>
          </Form-item>
        </template>
      </DataTable>
      <FormDialog :initOption="roleFormInitOption"></FormDialog>
    </div>
  </div>
</template>
<script>
import DataTable from '@/components/DataTable'
import FormDialog from '@/views/admin/role/FormDialog'
import sysApis from '../../../apis'

export default {
  name: 'sysRoleIndex',
  data () {
    return {
      sysApis: sysApis,
      columns: [{
        title: 'ID',
        key: 'id'
      }, {
        title: '角色名称',
        key: 'name'
      }, {
        title: '描述',
        key: 'description'
      }, {
        title: '操作',
        key: 'action',
        render (row, column, index) {
          return `<i-button type="primary" size="small" @click="handleView('${row.id}')">查看</i-button>
          <i-button type="warning" size="small" @click="handleEdit('${row.id}')">编辑</i-button>
          <i-button type="error" size="small" @click="hanldeDelete('${row.id}', '${row.name}')">删除</i-button>`
        }
      }],
      searchForm: {
        name: ''
      },
      roleFormInitOption: {
        title: '',
        action: '',
        showModal: false,
        id: ''
      }
    }
  },
  methods: {
    handleAdd () {
      this.roleFormInitOption.title = '新增角色'
      this.roleFormInitOption.action = 'add'
      this.roleFormInitOption.showModal = true
    },
    handleView (id) {
      this.$Modal.info({
        title: '角色信息',
        content: '1111',
        scrollable: true
      })
    },
    handleEdit (id) {
      this.roleFormInitOption.title = '编辑角色'
      this.roleFormInitOption.action = 'edit'
      this.roleFormInitOption.showModal = true
      this.roleFormInitOption.id = id
      this.$children[1].getInfo()
    },
    hanldeDelete (id, name) {
      this.$Modal.confirm({
        title: '请确认',
        content: '确定删除【' + name + '】角色？',
        onOk: () => {
          this.$http.jsonp(sysApis.sys.role.delete, {
            params: {
              id: id
            }
          }).then(response => {
            if (response.body.success) {
              this.$Notice.success({
                title: '提示',
                desc: '【' + name + '】删除成功！'
              })
              this.$children[0].query()
            } else {
              this.$Notice.error({
                title: '提示',
                desc: response.body.msg
              })
            }
          }, response => {
            this.$Notice.error({
              title: '提示',
              desc: '网络连接失败，请稍后再试！'
            })
          })
        }
      })
    },
    resetTableSearchForm () {
      this.searchForm.name = ''
    }
  },
  components: {
    DataTable,
    FormDialog
  }
}
</script>
<style>
</style>
