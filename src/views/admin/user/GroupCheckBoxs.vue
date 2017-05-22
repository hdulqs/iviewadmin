<template lang="html">
  <Modal
    v-model="initOption.visible"
    title="用户分组设置"
    @on-ok="grantGroup"
    :mask-closable="false">
    <Checkbox-group
      v-model="currentValue">
      <Checkbox :label="g.id" v-for="g in groupList" :key="g.id">
        <span>{{g.name}}</span>
      </Checkbox>
    </Checkbox-group>
  </Modal>
</template>
<script>
import sysApis from '../../../apis';

export default {
  name: 'groupCheckBox',
  props: {
    initOption: {
      id: {
        required: true,
        type: String
      },
      visible: false
    }
  },
  data () {
    return {
      currentValue: [],
      visible: this.initOption.visible,
      groupList: []
    };
  },
  methods: {
    getGroups () {
      this.$http.post(sysApis.sys.group.find, {
        pageSize: 50
      }).then((response) => {
        // console.log(response);
        this.groupList = response.data.obj.list;
        if (this.initOption.id) {
          this.getUserInfo();
        }
      });
    },
    getUserInfo () {
      this.$http.get(sysApis.sys.user.get, {
        params: {
          id: this.initOption.id
        }
      }).then((response) => {
        // console.log(response);
        if (response.data.obj.gids !== null) {
          this.currentValue = response.data.obj.gids.split(',');
        } else {
          this.currentValue = [];
        }
      });
    },
    grantGroup () {
      let gIds = this.currentValue.join(',');
      this.$http.get(sysApis.sys.user.grantGroup, {
        params: {
          id: this.initOption.id,
          gIds: gIds
        }
      }).then((response) => {
        let obj = response.data;
        if (obj.success) {
          this.$Message.success(obj.msg);
        } else {
          this.$Message.error(obj.msg);
        }
      });
    }
  },
  watch: {
    'initOption.id' (val) {
      if (val !== null && val !== '' && val !== undefined) {
        this.getGroups();
      }
    },
    'initOption.visible' (val) {
      if (val) {
        this.getGroups();
      }
    }
  }
};
</script>

<style lang="css">
</style>
