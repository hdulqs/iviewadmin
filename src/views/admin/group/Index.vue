<template>
  <div id="groupIndex" class="layout-content">
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
import DataTable from '@/components/DataTable'
import FormDialog from '@/views/admin/group/FormDialog'
import sysApis from '../../../apis'

export default {
  name: 'groupIndex',
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
        title: '创建时间',
        key: 'createtime'
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
      groupFormInitOption: {
        title: '',
        action: '',
        showModal: false,
        id: ''
      }
    }
  },
  methods: {
    handleAdd () {
      this.groupFormInitOption.title = '新增分组'
      this.groupFormInitOption.action = 'add'
      this.groupFormInitOption.showModal = true
    },
    handleView (id) {
      this.$Modal.info({
        title: '分组信息',
        content: '1111',
        scrollable: true
      })
    },
    handleEdit (id) {
      this.groupFormInitOption.title = '编辑分组'
      this.groupFormInitOption.action = 'edit'
      this.groupFormInitOption.showModal = true
      this.groupForm.id = id
    },
    hanldeDelete (id, name) {
      this.$Modal.confirm({
        title: '请确认',
        content: '确定删除【' + name + '】分组？',
        onOk: () => {
          this.$http.jsonp(sysApis.sys.group.delete, {
            params: {
              id: id
            }
          }).then(response => {
            if (response.body.success) {
              this.$Notice.success({
                title: '提示',
                desc: '【' + name + '】删除成功！'
              })
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
