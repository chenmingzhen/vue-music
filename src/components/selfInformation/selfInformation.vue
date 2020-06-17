<template>
    <div>selfInformation</div>
</template>

<script>
  import {getToken} from "../../assets/js/utils";

  export default {
    name: "selfInformation",
    beforeRouteEnter(to, from, next){
      if(getToken()){
        next();
      }else{
        /*未登陆 不能访问*/
        next(false);
      }
    }
  };
</script>

<style scoped>

</style>
