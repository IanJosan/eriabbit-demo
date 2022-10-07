<template>
    <div class="account-box">
      <div class="toggle">
        <a @click="isMsgLogin=false" href="javascript:;" v-if="isMsgLogin">
          <i class="iconfont icon-user"></i> 使用账号登录
        </a>
        <a @click="isMsgLogin=true" href="javascript:;" v-else>
          <i class="iconfont icon-msg"></i> 使用短信登录
        </a>
      </div>
      <Form ref="formCom" class="form" :validation-schema="schema" autocomplete="off" v-slot="{errors}">
        <template v-if="!isMsgLogin">
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-user"></i>
              <Field :class="{error:errors.account}" v-model="form.account" name="account" type="text" placeholder="请输入用户名或手机号" />
            </div>
            <div class="error" v-if="errors.account">
                <i class="iconfont icon-warning" />{{errors.account}}
            </div>
          </div>
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-lock"></i>
              <Field :class="{error:errors.password}" v-model="form.password" name="password" type="password" placeholder="请输入密码"/>
            </div>
            <div class="error" v-if="errors.password">
                <i class="iconfont icon-warning" />{{errors.password}}
            </div>
          </div>
        </template>
        <template v-else>
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-user"></i>
              <Field :class="{error:errors.mobile}" v-model="form.mobile" name="mobile" type="text" placeholder="请输入手机号" />
            </div>
            <div class="error" v-if="errors.mobile">
                <i class="iconfont icon-warning" />{{errors.mobile}}
            </div>
          </div>
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-code"></i>
              <Field :class="{error:errors.code}" v-model="form.code" name="code" type="text" placeholder="请输入验证码"/>
              <span @click="send()" class="code">{{time===0?'发送验证码':`${time}秒后发送`}}</span>
            </div>
            <div class="error" v-if="errors.code">
                <i class="iconfont icon-warning" />{{errors.code}}
            </div>
          </div>
        </template>
        <div class="form-item">
          <div class="agree">
            <Field as='XtxCheckbox' name="isAgree" v-model="form.isAgree" />
            <span>我已同意</span>
            <a href="javascript:;">《隐私条款》</a>
            <span>和</span>
            <a href="javascript:;">《服务条款》</a>
          </div>
          <div class="error" v-if="errors.isAgree">
                <i class="iconfont icon-warning" />{{errors.isAgree}}
            </div>
        </div>
        <a  @click="login()" href="javascript:;" class="btn">登录</a>
    </Form>
      <div class="action">
        <a href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback">
          <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="">
        </a>

        <div class="url">
          <a href="javascript:;">忘记密码</a>
          <a href="javascript:;">免费注册</a>
        </div>
      </div>
    </div>
  </template>

<script>
import { onUnmounted, reactive, ref, watch } from 'vue'
import { Form, Field } from 'vee-validate'
import veeSchema from '@/utils/vee-validate-schema'
import Message from '@/components/library/Message'
import { userAccountLogin, userMobileLogin, userMobileLoginMsg } from '@/api/user'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { useIntervalFn } from '@vueuse/shared'
export default {
  name: 'LoginForm',
  components: {
    Form, Field
  },
  setup () {
    // 是否短信登录
    const isMsgLogin = ref(false)
    // 表单信息对象
    const form = reactive({
      isAgree: true,
      account: null,
      password: null,
      mobile: null,
      code: null
    })
    // vee-validate 校验
    const mySchema = {
      // 校验函数规则 返回true成功 字符串失败
      account: veeSchema.account,
      password: veeSchema.password,
      mobile: veeSchema.mobile,
      code: veeSchema.code,
      isAgree: veeSchema.isAgree
    }
    const formCom = ref(null)
    // 监听重置表单
    watch(isMsgLogin, () => {
      form.isAgree = true
      form.account = null
      form.password = null
      form.mobile = null
      form.code = null
      // 补充校验效果清除，Form组件提供resetForm()
      formCom.value.resetForm()
    })
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const login = async () => {
      const valid = await formCom.value.validate()
      try {
        if (valid) {
          let data = null
          if (isMsgLogin.value) {
            const { mobile, code } = form
            data = await userMobileLogin({ mobile, code })
          } else {
            const { account, password } = form
            data = await userAccountLogin({ account, password })
          // const { account, password } = form
          // userAccountLogin({ account, password }).then(data => {
          //   const { id, account, mobile, nickname, token } = data.result
          //   store.commit('user/setUser', { id, account, mobile, nickname, token })
          //   router.push(route.query.redirectUrl || '/')
          //   Message({ type: 'success', text: '登陆成功' })
          // }).catch(e => {
          //   if (e.response.data) {
          //     Message({ type: 'error', text: e.response.data.message || '登录失败' })
          //   }
          // })
          }
          const { id, account, mobile, nickname, token } = data.result
          store.commit('user/setUser', { id, account, mobile, nickname, token })
          router.push(route.query.redirectUrl || '/')
          Message({ type: 'success', text: '登陆成功' })
        }
      } catch (e) {
        if (e.response.data) {
          Message({ type: 'error', text: e.response.data.message || '登录失败' })
        }
      }
    }
    const time = ref(0)
    const { pause, resume } = useIntervalFn(() => {
      time.value--
      if (time.value <= 0) {
        pause()
      }
    }, 1000, false)
    onUnmounted(() => {
      pause()
    })
    const send = async () => {
      const valid = mySchema.mobile(form.mobile)
      if (valid === true) {
        if (time.value === 0) {
          await userMobileLoginMsg(form.mobile)
          Message({ type: 'success', text: '发送成功' })
          time.value = 60
          resume()
        }
      } else {
        formCom.value.setFieldError('mobile', valid)
      }
    }
    return { time, isMsgLogin, form, schema: mySchema, formCom, login, send }
  }
}
</script>

<style lang="less" scoped>
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,&:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
