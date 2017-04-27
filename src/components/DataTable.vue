<template lang="html">
  <div class="datatable">
    <Row type="flex" justify="end" class="function">
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
        </Form>
        <Row type="flex" justify="center" v-if="hasSearch">
          <Form inline>
            <Form-item>
              <Button type="primary" @click="query" icon="search">查询</Button>
            </Form-item>
            <Form-item>
              <Button type="warning" @click="reset" icon="ios-refresh">重置</Button>
            </Form-item>
          </Form>
        </Row>
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
            :context="this.$parent"
            @on-sort-change="sortTable"></Table>
            <MyLoading size="large" :show="loading"></MyLoading>
        </Col>
      </Row>
      <Row type="flex" justify="center" class="pagination">
        <Col span="24">
          <div style="float: right;">
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
          </div>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
import MyLoading from '@/components/MyLoading';

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
      default: () => {
        return {};
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
    };
  },
  mounted () {
    this.$nextTick(() => {
      this.loadData();
    });
  },
  methods: {
    // load remote data
    loadData () {
      this.loading = true;
      this.$http.jsonp(this.url, {
        params: this.params
      }).then((response) => {
        if (response.body.success) {
          this.tableData = response.body.obj.list;
          this.total = response.body.obj.total;
          this.loading = false;
        } else {
          this.$Modal.error({
            title: '提示',
            content: response.body.msg
          });
          this.loading = false;
        }
      }, (response) => {
        this.loading = false;
      });
    },
    //
    query () {
      this.pageNum = 1;
      this.total = 0;
      this.loadData();
    },
    reset () {
      this.$refs.tableSearchForm.resetFields();
      if (typeof this.$parent.resetTableSearchForm === 'function') {
        this.$parent.resetTableSearchForm();
      }
    },
    // change page size
    sizeChange (pageSize) {
      this.pageSize = pageSize;
      this.loadData();
    },
    // change current page
    pageChange (pageNum) {
      this.pageNum = pageNum;
      this.loadData();
    },
    // handle sort
    sortTable (column, key, order) {
      console.log(column, key, order);
    }
  },
  computed: {
    // dynamic pagination query params
    params: function () {
      let params = this.searchForm;
      params.pageNum = this.pageNum;
      params.pageSize = this.pageSize;
      return params;
    },
    hasSearch () {
      return !!this.$slots.search;
    }
  },
  components: {
    MyLoading
  }
};
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
