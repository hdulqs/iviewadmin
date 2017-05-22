<template>
  <div class="login">
    <Form
      class="login-form"
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      inline>
        <Form-item prop="username">
          <Input type="text" v-model="loginForm.username" placeholder="Username">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Form-item prop="password">
          <Input type="password" v-model="loginForm.password" placeholder="Password">
            <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Form-item>
          <Button
            type="ghost"
            @click="handleSubmit()"
            icon="arrow-right-a">
          </Button>
        </Form-item>
        <Spin fix v-if="loginLoading">登录中 ...</Spin>
    </Form>
  </div>
</template>
<script>
import Apis from '../../../apis';

export default {
  name: 'loginForm',
  data () {
    return {
      loginRules: {
        username: [
          {required: true, message: '用户名不能为空！', trigger: 'blur'},
          {message: '用户名长度必须在5~50位之间！', trigger: 'blur', min: 5, max: 50}
        ],
        password: [
          {required: true, message: '密码不能为空！', trigger: 'blur'},
          {message: '密码长度必须在5~50位之间！', trigger: 'blur', min: 5, max: 50}
        ]
      },
      loginForm: {
        username: '',
        password: ''
      },
      loginLoading: false
    };
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.logingLoading = true;
          this.$http.post(Apis.sys.tokens.login, this.loginForm).then((response) => {
            let obj = response.data;
            // console.log(obj);
            if (obj.success) {
              let token = obj.obj.tokenObj.tokenType + ' ' + obj.obj.tokenObj.accessToken;
              sessionStorage.setItem('Authorization', token);
              sessionStorage.setItem('user', JSON.stringify(obj.obj.user));
              this.$Message.success(obj.msg);
              setInterval(() => {
                this.$http.get(Apis.sys.tokens.refresh).then((response) => {
                  let token = obj.obj.tokenObj.tokenType + ' ' + obj.obj.tokenObj.accessToken;
                  sessionStorage.setItem('Authorization', token);
                });
              }, obj.obj.tokenObj.expiresIn - (1000 * 60 * 5));
              this.$router.push('/');
            } else {
              this.$Message.error(obj.msg);
              this.loginLoading = false;
            }
          });
        }
      });
    }
  }
};
</script>
<style media="screen" lang="scss" scoped>
.login {
  background: url('../../../assets/images/loginbg.jpg');
  background-size: 100% 100%;
  width: 100%;
  height: 100%;

  .login-form {
    position: absolute;
    right: 20px;
    bottom: 20px;
  }
}
</style>
