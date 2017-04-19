<template>
  <div id="sysSyslogIndex" class="layout-content">
    <div class="layout-content-main">
      <DataTable
        :url="sysApis.sys.syslog.find"
        :columns="columns"
        :searchForm="searchForm">
        <template slot="search">
          <Form-item label="日志类型" :label-width="60">
            <Select v-model="searchForm.type">
              <Option value="" label="全部"></Option>
              <Option value="0" label="正常日志"></Option>
              <Option value="1" label="异常日志"></Option>
            </Select>
          </Form-item>
          <Form-item label="处理方法" :label-width="60">
            <Input type="text" v-model="searchForm.method"></Input>
          </Form-item>
          <Form-item label="url" :label-width="40">
            <Input type="text" v-model="searchForm.requestpath"></Input>
          </Form-item>
          <Form-item label="IP" :label-width="40">
            <Input type="text" v-model="searchForm.host"></Input>
          </Form-item>
          <Form-item label="创建日期" :label-width="60">
            <Date-picker
              type="daterange"
              v-model="searchForm.createtime"
              confirm
              placement="bottom-end"
              placeholder="选择日期"></Date-picker>
          </Form-item>
        </template>
      </DataTable>
    </div>
  </div>
</template>
<script>
import DataTable from '@/components/DataTable'
import sysApis from '../../../apis'

export default {
  name: 'sysSyslogIndex',
  data () {
    return {
      sysApis: sysApis,
      columns: [{
        title: '记录时间',
        key: 'createtime'
      }, {
        title: '日志类型',
        key: 'type',
        render (row) {
          switch (row.type) {
            case '0':
              return '正常日志'
            case '1':
              return '异常日志'
            default:
          }
        }
      }, {
        title: '处理方法',
        key: 'method'
      }, {
        title: 'url',
        key: 'requestpath'
      }, {
        title: 'IP',
        key: 'host'
      }, {
        title: 'action耗时',
        key: 'actionTotalTime',
        render (row, column, index) {
          if (row.actionTotalTime) {
            if (row.actionTotalTime > 200) {
              return `<Tag type="border" color="red">${row.actionTotalTime}ms</Tag>`
            } else if (row.actionTotalTime > 50) {
              return `<Tag type="border" color="yellow">${row.actionTotalTime}ms</Tag>`
            } else {
              return `<Tag type="border" color="green">${row.actionTotalTime}ms</Tag>`
            }
          } else {
            if (row.actionTotalTime === 0) {
              return `<Tag type="border" color="green">${row.actionTotalTime}ms</Tag>`
            } else {
              return ''
            }
          }
        }
      }, {
        title: 'service耗时',
        key: 'serviceTotalTime',
        render (row, column, index) {
          if (row.serviceTotalTime) {
            if (row.serviceTotalTime > 200) {
              return `<Tag type="border" color="red">${row.serviceTotalTime}ms</Tag>`
            } else if (row.serviceTotalTime > 50) {
              return `<Tag type="border" color="yellow">${row.serviceTotalTime}ms</Tag>`
            } else {
              return `<Tag type="border" color="green">${row.serviceTotalTime}ms</Tag>`
            }
          } else {
            if (row.serviceTotalTime === 0) {
              return `<Tag type="border" color="green">${row.serviceTotalTime}ms</Tag>`
            } else {
              return ''
            }
          }
        }
      }, {
        title: '总耗时',
        key: 'totalTime',
        render (row, column, index) {
          if (row.totalTime) {
            if (row.totalTime > 200) {
              return `<Tag type="border" color="red">${row.totalTime}ms</Tag>`
            } else if (row.totalTime > 50) {
              return `<Tag type="border" color="yellow">${row.totalTime}ms</Tag>`
            } else {
              return `<Tag type="border" color="green">${row.totalTime}ms</Tag>`
            }
          } else {
            if (row.totalTime === 0) {
              return `<Tag type="border" color="green">${row.totalTime}ms</Tag>`
            } else {
              return ''
            }
          }
        }
      }, {
        title: '操作',
        key: 'action',
        render (row, column, index) {
          return `<i-button type="primary" size="small" @click="handleView('${row.id}')">查看</i-button>`
        }
      }],
      searchForm: {
        type: '',
        method: '',
        requestpath: '',
        host: '',
        createtime: []
      }
    }
  },
  methods: {
    handleView (id) {
      this.$Modal.info({
        title: '系统信息',
        content: '1111',
        scrollable: true
      })
    },
    resetTableSearchForm () {
      this.searchForm.name = ''
    }
  },
  components: {
    DataTable
  }
}
</script>
<style>
</style>
