<template lang="html">
  <div class="datatable">
    <Row type="flex" class="function">
      <Col span="24">
        <slot name="function"></slot>
      </Col>
    </Row>
    <Card>
      <div class="search">
        <Form
          ref="tableSearchForm"
          :model="searchForm"
          inline>
          <slot name="search"></slot>
          <Form-item v-if="hasSearch">
            <Button type="primary" @click="query">查询</Button>
          </Form-item>
          <Form-item v-if="hasSearch">
            <Button type="warning" @click="reset">重置</Button>
          </Form-item>
        </Form>
      </div>
      <Row type="flex" justify="center">
        <Col span="24">
          <Table
            :columns="columns"
            :data="tableData"
            :border="border"
            :stripe="stripe"
            :show-header="showHeader"
            :size="size"
            :context="this.$parent"></Table>
            <Spin size="large" fix v-if="loading">数据加载中……</Spin>
        </Col>
      </Row>
      <Row type="flex" justify="center" class="pagination">
        <Col span="24">
          <Page
            :current="pageNum"
            :page-size-opts="pageSizes"
            :page-size="pageSize"
            :total="total"
            @on-page-size-change="sizeChange"
            @on-change="pageChange"
            show-total
            show-elevator
            show-sizer>
          </Page>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'dataTable',
  props: {
    url: {
      type: String
    },
    columns: {
      type: Array,
      required: true
    },
    stripe: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    size: {
      type: String
    },
    searchForm: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      tableData: [],
      loading: true,
      pageSizes: [10, 20, 30],
      pageSize: 10,
      pageNum: 1,
      total: 0
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.loadData()
    })
  },
  methods: {
    // load remote data
    loadData () {
      this.loading = true
      this.$http.jsonp(this.url, {
        params: this.params
      }).then((response) => {
        this.tableData = response.body.obj.list
        this.total = response.body.obj.total
        this.loading = false
      })
    },
    //
    query () {
      this.pageNum = 1
      this.loadData()
    },
    reset () {
      this.$parent.resetTableSearchForm()
    },
    // change page size
    sizeChange (pageSize) {
      this.pageSize = pageSize
      this.loadData()
    },
    // change current page
    pageChange (pageNum) {
      this.pageNum = pageNum
      this.loadData()
    }
  },
  computed: {
    // dynamic pagination query params
    params: function () {
      let params = this.searchForm
      params.pageNum = this.pageNum
      params.pageSize = this.pageSize
      return params
    },
    hasSearch () {
      return !!this.$slots.search
    }
  }
}
</script>

<style lang="scss" scoped>
.datatable {

  .function {
    padding: 10px;
    line-height: 40px;
  }
  .search {
    margin: 10px 0px 0px 10px;
  }
  .pagination {
    margin: 10px 0px 0px 10px;
  }
}
</style>
