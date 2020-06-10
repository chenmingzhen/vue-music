<template>
    <div class="category-wrapper">
        <div class="title">{{data.title}}</div>
        <div class="content">
            <ul>
                <li class="item" v-for="(item,index) in data.list" :key="index"
                    :class="{'active':selectItem===index}" @click="click($event,index)">{{item}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
  export default {
    name: "singSelect",
    props:{
      data:Object,
      selectItem:{
        type:Number,
        default:0
      }
    },
    methods:{
      click(e,index){
        this.$emit('select',index);
      }
    }
  };
</script>

<style scoped lang="scss">
    @import "src/assets/sass/variable.scss";
    .category-wrapper {
        &:last-child{
            border-bottom: 1px gray solid;
            padding-bottom: 0.267rem;
        }
        margin-top: 0.533rem;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .title {
            font-size: 0.8rem;
            color: $color-theme;
            font-weight: bolder;
        }

        .content {
            flex: 1;

            ul {
                display: flex;
                align-items: center;
                justify-content: space-around;

                .item {
                    text-align: center;
                    font-size: 0.6rem;
                    color: rgba(255, 255, 255, .7);
                    padding: 0.1rem 0.2rem;
                }

                .active {
                    border-radius: 0.2rem;
                    border: 0.06rem solid $color-theme;
                    background-color: $color-theme;
                    color: black;
                }
            }
        }
    }
</style>
