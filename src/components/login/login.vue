<template>
    <transition name="fade-slide-right">
            <div class="login-wrapper">
                <div class="icon" @click="back"><i class="icon-back"></i></div>
                <div class="input-wrapper">
                    <div class="user">
                        <i class="icon-mine"></i>
                        <input type="text" class="user-input" placeholder="手机号" ref="phone">
                    </div>
                    <div class="password">
                        <i class="icon-mine"></i>
                        <input type="password" class="password-input" placeholder="密码" ref="password"
                               @keydown.enter="clickLogin">
                    </div>
                    <div class="commit" :class="{'loading':loading}" @click="clickLogin">
                        <span class="circle2"></span>
                        <span class="title2">登陆</span>
                        <span class="title-hover2">登陆中</span>
                    </div>
                </div>
                <Toast :text="msg" v-if="toastShow"></Toast>
            </div>
    </transition>
</template>

<script>
  import {login} from "../../api/login";
  import {userMixin} from "../../utils/mixin";
  import {setToken, getToken} from "../../assets/js/utils";
  import Toast from "../../base/toast/toast";

  export default {
    name: "login",
    mixins: [userMixin],
    components: {Toast},
    /*由于keep-alive 不使用create*/
    activated() {
      /*已经登陆*/
      if (getToken()) {
        this.$router.push('/selfInformation');
      }
    },
    data() {
      return {
        loading: false,
        msg: '',
        toastShow: false
      };
    },
    methods: {
      clickLogin() {
        this.loading = !this.loading;
        login(this.$refs.phone.value, this.$refs.password.value).then(data => {
          this.setUser({data});
          setToken(this.$refs.phone.value, 'phone');
          setToken(this.$refs.password.value, 'password');
          setToken(this.user.data.token);
          this.showToast('登陆成功', true);

        }).catch(e => {
          this.showToast('账号密码错误');
        });
      },
      back() {
        this.$router.go(-1);
      },
      showToast(msg, back = false) {
        this.msg = msg;
        this.toastShow = true;
        setTimeout(() => {
          this.loading = !this.loading;
          this.toastShow = false;
        }, 2000);
        if(back){
          setTimeout(() => {
            this.back();
          }, 2500);
        }
      }
    }
  };
</script>

<style scoped lang="scss">
    @import "src/assets/sass/variable";
    @import "src/assets/sass/transitions";

    .login-wrapper {
        z-index: 10000;
        background: $color-theme;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;

        .icon {
            margin-top: 0.533rem;
            margin-left: 0.25rem;
        }

        .input-wrapper {
            position: absolute;
            top: 20%;
            left: 25%;

            .user, .password {
                border: 0.053rem solid white;
                width: 60%;
                padding: 0.267rem 0.267rem;
                border-radius: 1rem;

                i {
                    margin-right: 0.5rem;
                    color: black;
                    font-weight: 600;
                    font-size: 0.8rem;
                }

                .user-input {
                    font-size: 0.8rem;
                    line-height: 0.8rem;
                    background: transparent;
                    outline: 0;
                    width: 80%;
                }
            }

            .password {
                margin-top: 0.8rem;

                .password-input {
                    font-size: 0.8rem;
                    line-height: 0.8rem;
                    outline: 0;
                    width: 80%;
                    background: transparent;
                }
            }

            .commit {
                position: relative;
                height: 1.333rem;
                width: 5.333rem;
                line-height: 1.333rem;
                padding: 0;
                border-radius: 1.333rem;
                background: #fdfdfd;
                border: 0.107rem solid #efa666;
                margin: 0.4rem 0.8rem 0;
                transition: 0.5s;
                font-size: 0.8rem;

                /*&:hover*/
                &.loading {
                    background-color: #efa666;
                }

                /*&:hover*/
                &.loading span.circle2 {
                    right: 100%;
                    margin-right: -1.333rem;
                    background-color: #fdfdfd;
                    color: #0099cc;
                }

                /*&:hover*/
                &.loading span.circle2 {
                    color: #efa666;
                }

                /*&:hover*/
                &.loading span.title2 {
                    right: 0.8rem;
                    opacity: 0;
                }

                /*&:hover*/
                .loading span.title-hover2 {
                    opacity: 1;
                    right: 1.067rem;
                }

                & span.circle2 {
                    display: block;
                    background-color: #0099cc;
                    color: #fff;
                    position: absolute;
                    float: right;
                    margin: 0.133rem;
                    line-height: 1.12rem;
                    height: 1.067rem;
                    width: 1.067rem;
                    top: 0;
                    right: 0;
                    transition: 0.5s;
                    border-radius: 50%;
                }

                & span.circle2 {
                    background-color: #efa666;
                }

                & span.title2,
                & span.title-hover2 {
                    position: absolute;
                    right: 2.4rem;
                    text-align: center;
                    margin: 0 auto;
                    font-size: 16px;
                    font-weight: bold;
                    color: #30abd5;
                    transition: 0.5s;
                }

                & span.title2,
                & span.title-hover2 {
                    color: #efa666;
                    right: 2.133rem;
                }

                & span.title-hover2 {
                    right: 2.133rem;
                    opacity: 0;
                }

                &.loading span.title-hover2 {
                    right: 1.5rem;
                    opacity: 1;
                }

                & span.title-hover2 {
                    color: #fff;
                }
            }

        }
    }
</style>
