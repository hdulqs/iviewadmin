<template>
  <div id="sysSyslogIndex" class="layout-content">
    <div class="layout-content-main">
      <DataTable
        :url="sysApis.sys.syslog.find"
        :columns="columns"
        :searchForm="searchForm">
        <template slot="search">
          <Form-item label="日志类型" :label-width="60" prop="type">
            <Select v-model="searchForm.type">
              <Option value="" label="全部"></Option>
              <Option value="0" label="正常日志"></Option>
              <Option value="1" label="异常日志"></Option>
            </Select>
          </Form-item>
          <Form-item label="处理方法" :label-width="60" prop="method">
            <Input type="text" v-model="searchForm.method"></Input>
          </Form-item>
          <Form-item label="url" :label-width="40" prop="requestpath">
            <Input type="text" v-model="searchForm.requestpath"></Input>
          </Form-item>
          <Form-item label="IP" :label-width="40" prop="host">
            <Input type="text" v-model="searchForm.host"></Input>
          </Form-item>
          <Form-item label="创建日期" :label-width="60" prop="createtime">
            <Date-picker
              type="daterange"
              :options="dateRangOptions"
              v-model="searchForm.createtime"
              placement="bottom-end"
              placeholder="选择日期"
              @on-change="changeCreateDate"></Date-picker>
          </Form-item>
        </template>
      </DataTable>
      <Modal
        v-model="showDetail"
        title="日志详情">
        <Row type="flex" justify="center">
          <table class="ivu-table ivu-table-border" v-if="logDetail !== ''">
            <tr>
              <td>ID</td>
              <td>{{logDetail.id}}</td>
            </tr>
            <tr>
              <td>url</td>
              <td>{{logDetail.requestpath}}</td>
            </tr>
            <tr>
              <td>处理方法</td>
              <td>{{logDetail.method}}</td>
            </tr>
            <tr>
              <td>action开始时间</td>
              <td>{{logDetail.actionStartTime}}</td>
            </tr>
            <tr>
              <td>action结束时间</td>
              <td>{{logDetail.actionEndTime}}</td>
            </tr>
            <tr>
              <td>action耗时</td>
              <td>{{logDetail.actionTotalTime}}</td>
            </tr>
            <tr>
              <td>service开始时间</td>
              <td>{{logDetail.serviceStartTime}}</td>
            </tr>
            <tr>
              <td>service结束时间</td>
              <td>{{logDetail.serviceEndTime}}</td>
            </tr>
            <tr>
              <td>service耗时</td>
              <td>{{logDetail.serviceTotalTime}}</td>
            </tr>
            <tr>
              <td>总耗时</td>
              <td>{{logDetail.totalTime}}</td>
            </tr>
          </table>
        </Row>
      </Modal>
    </div>
  </div>
</template>
<script>
import DataTable from '@/components/DataTable';
import sysApis from '../../../apis';

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
              return '正常日志';
            case '1':
              return '异常日志';
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
              return `<Tag type="border" color="red">${row.actionTotalTime}ms</Tag>`;
            } else if (row.actionTotalTime > 50) {
              return `<Tag type="border" color="yellow">${row.actionTotalTime}ms</Tag>`;
            } else {
              return `<Tag type="border" color="green">${row.actionTotalTime}ms</Tag>`;
            }
          } else {
            if (row.actionTotalTime === 0) {
              return `<Tag type="border" color="green">${row.actionTotalTime}ms</Tag>`;
            } else {
              return '';
            }
          }
        }
      }, {
        title: 'service耗时',
        key: 'serviceTotalTime',
        render (row, column, index) {
          if (row.serviceTotalTime) {
            if (row.serviceTotalTime > 200) {
              return `<Tag type="border" color="red">${row.serviceTotalTime}ms</Tag>`;
            } else if (row.serviceTotalTime > 50) {
              return `<Tag type="border" color="yellow">${row.serviceTotalTime}ms</Tag>`;
            } else {
              return `<Tag type="border" color="green">${row.serviceTotalTime}ms</Tag>`;
            }
          } else {
            if (row.serviceTotalTime === 0) {
              return `<Tag type="border" color="green">${row.serviceTotalTime}ms</Tag>`;
            } else {
              return '';
            }
          }
        }
      }, {
        title: '总耗时',
        key: 'totalTime',
        render (row, column, index) {
          if (row.totalTime) {
            if (row.totalTime > 200) {
              return `<Tag type="border" color="red">${row.totalTime}ms</Tag>`;
            } else if (row.totalTime > 50) {
              return `<Tag type="border" color="yellow">${row.totalTime}ms</Tag>`;
            } else {
              return `<Tag type="border" color="green">${row.totalTime}ms</Tag>`;
            }
          } else {
            if (row.totalTime === 0) {
              return `<Tag type="border" color="green">${row.totalTime}ms</Tag>`;
            } else {
              return '';
            }
          }
        }
      }, {
        title: '操作',
        key: 'action',
        render (row, column, index) {
          return `<i-button type="primary" size="small" @click="handleView('${row.id}')" icon="search"></i-button>`;
        }
      }],
      searchForm: {
        type: '',
        method: '',
        requestpath: '',
        host: '',
        createtime: [],
        timeBegin: null,
        timeEnd: null
      },
      dateRangOptions: {
        shortcuts: [{
          text: '今天',
          value () {
            const end = new Date();
            const start = new Date();
            return [start, end];
          }
        }, {
          text: '最近三天',
          value () {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
            return [start, end];
          }
        }, {
          text: '最近一周',
          value () {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            return [start, end];
          }
        }, {
          text: '最近一个月',
          value () {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            return [start, end];
          }
        }, {
          text: '最近三个月',
          value () {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            return [start, end];
          }
        }]
      },
      showDetail: false,
      logDetail: ''
    };
  },
  methods: {
    handleView (id) {
      this.$http.get(sysApis.sys.syslog.get, {
        params: {
          id: id
        }
      }).then((response) => {
        if (response.body.success) {
          this.logDetail = response.body.obj;
          this.showDetail = true;
        } else {
          this.$Message.error(response.body.msg);
        }
      }, (response) => {
        this.$Modal.error({
          title: '提示',
          content: response.body.msg
        });
      });
    },
    changeCreateDate (val) {
      this.searchForm.timeBegin = val[0];
      this.searchForm.timeEnd = val[1];
    }
  },
  components: {
    DataTable
  }
};
</script>
<style>
</style>
