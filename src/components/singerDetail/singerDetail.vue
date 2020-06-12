<template>
    <transition name="fade-slide-right" appear>
        <div class="singerDetail">singerDetail</div>
    </transition>
</template>

<script>
  import {getSingerInf} from "../../api/singer";
  import {singerMixin} from "../../utils/mixin";

  export default {
    name: "singerDetail",
    mixins: [singerMixin],
    computed:{
      title(){
        return this.singer.name;
      },
      bgImage(){
        return this.singer.picUrl;
      },
    },
    data(){
      return {
        songs:[]
      };
    },
    created() {
      if(!this.singer.id){
        this.$router.push('/singer');
        return;
      }
      this.initSingerDetail();
    },
    methods: {
      initSingerDetail() {
        getSingerInf(this.singer.id).then(data => console.log(data) );
      }
    }
  };
</script>

<style scoped lang="scss">
    @import "src/assets/sass/transitions";
    /*測試類*/
    .singerDetail {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: black;
        z-index: 1000;
    }
</style>
