<template>
    <transition name="fade-slide-right">
    <div class="self-wrapper">
        <div class="icon" @click="back"><i class="icon-back"></i></div>
        <!--封面背景-->
        <div class="bg-image" :style="bgStyle" ref="bgImage"/>
        <!--推动-->
        <div class="bg-layer" ref="layer"></div>
        <better-scroll class="list" ref="list" @scroll="scroll" :listen-scroll="listenScroll" :probe-type="probeType">
            <!--一定要用item-wrapper这个名字-->
            <div class="item-wrapper">
                <div class="selfImg">
                    <img v-lazy="selfImg" alt="">
                    <div class="signature">
                        个性签名:{{signature}}
                    </div>
                </div>
                <div class="self-text">
                    <div class="name">{{nickName}}</div>
                    <div class="follow-wrapper">
                        <div class="followed">关注:{{follows}}</div>
                        <div>||</div>
                        <div class="follows">粉丝:{{followeds}}</div>
                    </div>
                </div>
                <div class="likedMusic">
                    <div class="title">我喜欢的音乐</div>
                    <div class="like-wrapper">
                        <div class="img">
                            <img src="../../assets/image/like.png" alt="">
                        </div>
                        <div class="text-wrapper">
                            <div class="title">{{nickName}}喜欢的音乐</div>
                            <div class="content">歌曲:{{likedMusic.length}}</div>
                        </div>
                    </div>
                </div>
                <div class="play-list-wrapper">
                    <div class="title">收藏的歌单</div>
                    <div class="bottom-wrapper"  v-for="(item,index) in playList" :key="index">
                        <div class="img"><img v-lazy="item.coverImgUrl" alt=""></div>
                        <div class="list-title">{{item.name}}</div>
                    </div>
                </div>
                <div class="subscribe-wrapper">
                    <div class="title">收藏的歌手</div>
                    <div class="subscribe-item" v-for="(item,index) in subscribeSinger" :key="index">
                        <div class="item-wrapper" >
                            <div class="img"><img v-lazy="item.picUrl" ></div>
                            <div class="name-wrapper">
                                <div class="name">{{item.name}}</div>
                                <div class="trans" v-if="item.trans">{{item.trans}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--不能拉到底部 用这个方法-->
                <div style="opacity: 0">_</div>
            </div>
        </better-scroll>
    </div>
    </transition>

</template>

<script>
  import {getToken} from "../../assets/js/utils";
  import {utilMixin} from "../../utils/mixin";
  import {userMixin} from "../../utils/mixin";
  import BetterScroll from "../../base/betterScroll/betterScroll";
  import {getLikeMusic,getPlayList,getSubscribeSinger} from "../../api/selfInformation";
  import SingerItem from "../../base/singerItem/singerItem";
  export default {
    name: "selfInformation",
    mixins: [utilMixin, userMixin],
    components: {BetterScroll},
    data(){
      return{
        scrollY: 0,
        likedMusic:[],
        playList:[],
        subscribeSinger:[]
      };
    },
    created() {
      this.probeType = 3;
      this.listenScroll = true;
      /*喜欢的音乐*/
      getLikeMusic(this.user.data.account.id).then(data=>{
        this.likedMusic=data.ids;
        this.$refs.list.refresh();
        setTimeout(()=>{
          this.$refs.list.refresh();
        },20);
      }).catch();
      getPlayList(this.user.data.account.id).then(data=>{
        this.playList=data.playlist;
        setTimeout(()=>{
          this.$refs.list.refresh();
        },20);
      });
      getSubscribeSinger().then(data=>{
        this.subscribeSinger=data.data;
        setTimeout(()=>{
          this.$refs.list.refresh();
        },20);
      });
    },
    mounted() {
      this.imageHeight = this.$refs.bgImage.clientHeight;
      this.minTransalteY = -this.imageHeight + 40;
      this.$refs.list.$el.style.top = `${this.imageHeight}px`;//能用
    },
    beforeRouteEnter(to, from, next) {
      if (getToken()) {
        next();
      } else {
        /*未登陆 不能访问*/
        next(false);
      }
    },
    computed: {
      bgStyle() {
        return `background-image:url(${this.user.data.profile.backgroundUrl})`;
      },
      selfImg(){
        return this.user.data.profile.avatarUrl;
      },
      nickName(){
        return this.user.data.profile.nickname;
      },
      follows(){
        return this.user.data.profile.follows;
      },
      followeds(){
        return this.user.data.profile.followeds;
      },
      signature(){
        return this.user.data.profile.signature;
      }
    },
    methods:{
      scroll(pos) {
        this.scrollY = pos.y;
      }
    },
    watch:{
      scrollY(newVal){
        let translateY = Math.max(this.minTransalteY, newVal);
        let zIndex = 0;
        let scale = 1;
        let blur = 0;
        const percent = Math.abs(newVal / this.imageHeight);
        if (newVal > 0) {
          zIndex = 1000;
          scale = 1 + percent;
        }
        this.$refs.layer.style['transform'] = `translate3d(0,${translateY}px,0)`;//能用
        //上面就初步可以了
        if (newVal < this.minTransalteY) {
          zIndex = 1000;
          this.$refs.bgImage.style.paddingTop = 0;
          this.$refs.bgImage.style.height = `40px`;//能用
        } else {
          this.$refs.bgImage.style.paddingTop = '70%';
          this.$refs.bgImage.style.height = 0;
        }
        this.$refs.bgImage.style['transform'] = `scale(${scale})`;
        this.$refs.bgImage.style.zIndex = zIndex.toString();

      }
    }
  };
</script>

<style scoped lang="scss">
    @import "src/assets/sass/variable";
    @import "src/assets/sass/transitions";
    .self-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: $color-background;
        width: 100%;
        height: 100%;
        z-index: 10000;

        .icon {
            z-index: 5000;
            position: absolute;
            margin-top: 0.533rem;
            margin-left: 0.25rem;
        }

        .bg-image {
            position: relative;
            width: 100%;
            height: 0;
            padding-top: 70%;
            transform-origin: top;
            background-size: cover;
        }

        .bg-layer {
            position: relative;
            height: 100%;
            background: $color-background;
        }

        .list {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 100%;
            background: $color-background;
            .item-wrapper{
                .selfImg{
                    display: flex;
                    margin: 0.8rem;
                    width: 100%;
                    height: 4rem;
                    img{
                        flex: 0 0 auto;
                        width: 4rem;
                        height: 100%;
                        border-radius: 50%;
                    }
                    .signature{
                        padding-top: 0.8rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        padding-left: 10%;
                        width: 50%;
                        font-size: 0.6rem;
                        font-weight: bold;
                        color: $c-b;
                    }
                }
                .self-text{
                    padding: 0 0.5rem;
                    .name{
                        font-size: 0.7rem;
                        font-weight: bolder;
                    }
                    .follow-wrapper{
                        display: flex;
                        padding: 0.3rem 0.3rem;
                        font-size: 0.5rem;
                        .followed,.follows,div{
                            font-weight: bold;
                            color: $c-t-s;
                            padding-right: 0.2rem;
                        }
                    }
                }
                .likedMusic{
                    padding: 0.6rem 0.6rem;
                    .title{
                       font-weight: bolder;
                        font-size: 0.7rem;
                        color:$c-t ;
                    }
                    .like-wrapper,{
                        padding-top: 0.3rem;
                        display: flex;
                        .img{
                            display: flex;
                            width: 10%;
                            background-color: $c-b-d;
                            border-radius: 0.15rem;
                            img{
                                width: 100%;
                            }
                        }
                        .text-wrapper{
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            margin-left: 0.8rem;
                            .title{
                                font-size: 0.5rem;
                                color: white;
                                font-weight: 500;
                            }
                            .content{
                                padding-top: 0.2rem;
                                font-size: 0.3rem;
                                color: white;
                            }
                        }
                    }
                }

                .play-list-wrapper{
                    padding: 0.6rem 0.6rem;
                    .title{
                        font-weight: bolder;
                        font-size: 0.7rem;
                        color:$c-t ;
                    }
                    .bottom-wrapper{
                        display: flex;
                        padding: 0.2rem 0;
                        align-items: center;
                        .img{
                            display: flex;
                            width: 10%;
                            background-color: $c-b-d;
                            img{
                                border-radius: 0.15rem;
                                width: 100%;
                            }
                        }
                        .list-title{
                            padding-left: 0.8rem;
                            font-size: 0.5rem;
                            color: white;
                            font-weight: 500;
                        }
                    }
                }

                .subscribe-wrapper{
                    padding: 0 .5rem;
                    .title{
                        font-weight: bolder;
                        font-size: 0.7rem;
                        color:$c-t ;
                    }
                    .subscribe-item{
                        .item-wrapper{
                            box-sizing: border-box;
                            //padding: 0 0.8rem 0 0.2rem;
                            margin-top: 0.533rem;
                            width: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;

                            .img{
                                width: 10%;
                                flex: 0;
                                img{
                                   width: 1.667rem !important;
                                    height: 1.667rem;
                                    border-radius: 50%;
                                    font-size: 0.267rem;
                                }
                            }
                            .name-wrapper{
                                flex: 1;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                flex-direction: column;
                                .name{
                                    flex: 1;
                                    //text-align: center;
                                    font-size: 0.6rem;
                                }
                                .trans{
                                    margin-top: 0.4rem;
                                    flex: 1;
                                    color: #7e8c8d;
                                    font-size: 0.4rem;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
