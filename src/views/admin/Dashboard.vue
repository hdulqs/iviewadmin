<template>
  <div id="sysDashboard">
    <div class="layout-content">
      <div class="layout-content-main">
        <Row type="flex" justify="center">
          <Col span="24">
            <charts class="sell-charts" :options="sellChart" auto-resize></charts>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span="6">
            <Card :bordered="false">
              <i-circle
                :percent="store1"
                :stroke-color="calcColor(store1)">
                <h4>PS4库存量</h4>
              </i-circle>
            </Card>
          </Col>
          <Col span="6">
            <Card :bordered="false">
              <i-circle
                :percent="store2"
                :stroke-color="calcColor(store2)">
                <h4>xbox one s 库存量</h4>
              </i-circle>
            </Card>
          </Col>
          <Col span="6">
            <Card :bordered="false">
              <i-circle
                :percent="store3"
                :stroke-color="calcColor(store3)">
                <h4>本月销售目标完成度</h4>
              </i-circle>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>
<script>
import 'echarts/theme/default';

export default {
  name: 'sysDashboard',
  data: function data () {
    return {
      msg: 'dashboard',
      store1: 15,
      store2: 60,
      store3: 80,
      sellChart: {
        title: {
          text: '销售量与价格'
        },
        tooltip: {},
        legend: {
          data: ['PS4销量', 'PS4销售额', 'xbox销量', 'xbox 销售额']
        },
        xAxis: {
          data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
        },
        yAxis: [{
          type: 'value'
        }],
        series: [{
          name: 'PS4销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20, 50]
        }, {
          name: 'PS4销售额',
          type: 'line',
          data: [50, 200, 360, 100, 100, 200, 500]
        }, {
          name: 'xbox销量',
          type: 'bar',
          data: [130, 330, 110, 220, 440, 90, 290]
        }, {
          name: 'xbox 销售额',
          type: 'line',
          data: [260, 660, 220, 440, 880, 180, 580]
        }]
      }
    };
  },
  methods: {
    calcColor: function calcColor (percent) {
      if (percent < 10) {
        return '#EE0000';
      } else if (percent < 20) {
        return '#EE5C42';
      } else if (percent < 40) {
        return '#EEB4B4';
      } else if (percent < 60) {
        return '#C1FFC1';
      } else if (percent < 70) {
        return '#ADFF2F';
      } else if (percent < 80) {
        return '#7CFC00';
      } else if (percent < 90) {
        return '#00EE00';
      }
      return '#00FF00';
    }
  }
};
</script>
<style lang="scss" scoped>
.sell-charts {
  width: 100%;
  height: 200px;
}
.ivu-card {
  .ivu-card-body {
    text-align: center;
  }
}
</style>
