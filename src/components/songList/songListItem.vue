<template>
    <transition name="fade-slide-down">
        <div class="song-list-item-wrapper">
            <div class="icon" @click="back"><i class="icon-back"></i></div>
            <!--封面背景-->
            <div class="bg-image" :style="bgStyle" ref="bgImage"/>
            <!--推动-->
            <!--<div class="bg-layer" ref="layer"></div>-->
            <better-scroll class="list" ref="list" @scroll="scroll" :listen-scroll="true" :probe-type="3">
                <div class="item-wrapper">
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                    <div>7</div>
                    <div>8</div>
                    <div>9</div>
                    <div>10</div>
                    <div>11</div>
                    <div>12</div>
                    <div>13</div>
                    <div>14</div>
                    <div>15</div>
                    <div>16</div>
                    <div>17</div>
                    <div>18</div>
                    <div>19</div>
                    <div>20</div>
                    <div>21</div>
                    <div>22</div>
                    <div>23</div>
                    <div>24</div>
                    <div>25</div>
                    <div>26</div>
                    <div>27</div>
                    <div>28</div>
                    <div>29</div>
                    <div>30</div>
                </div>
            </better-scroll>
        </div>
    </transition>
</template>

<script>
  import {getPlayList} from "../../api/recommend";
  import BetterScroll from "../../base/betterScroll/betterScroll";
  export default {
    name: "songListItem",
    components:{BetterScroll},
    data(){
      return{
        playList:{}
      };
    },
    activated() {
      getPlayList(this.$route.query.id).then(data=>{
        this.playList=data.playlist;
      });
    },
    methods:{
      back(){

      }
    },
    computed:{
      bgStyle() {
        if(this.playList.creator){
          return `background-image:url(${this.playList.creator.backgroundUrl})`;
        }
        return ``;
      }
    }
  };
</script>

<style scoped lang="scss">
    @import "src/assets/sass/variable";
    @import "src/assets/sass/transitions";
    .song-list-item-wrapper{
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 10000;
        background-color: $c-b;
        .icon{
            z-index: 5000;
            position: absolute;
            margin-top: 0.533rem;
            margin-left: 0.25rem;
        }
        .bg-image{
            position: relative;
            width: 100%;
            height: 0;
            padding-top: 70%;
            transform-origin: top;
            background-size: cover;
        }
        .bg-layer{
            position: relative;
            height: 100%;
            background: $c-b;
        }
        .list{
            position: absolute;
            top: 0;
            bottom: 0;
            width: 100%;
            overflow: hidden;
        }

    }
</style>
