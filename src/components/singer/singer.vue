<template>
    <div class="singer-wrapper">
        <div class="select-wrapper">
            <my-select :data="categoryData" @select="selectFromCategory" :select-item="selectList.category"></my-select>
            <my-select :data="areaData" @select="selectFromArea" :select-item="selectList.area"></my-select>
        </div>
        <scroll ref="scroll" :top=153.3 :bottom=-10>
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
        </scroll>
    </div>
</template>

<script>
  import {getHotSinger} from "../../api/singer";
  import Scroll from "../../base/scroll/scroll";
  import MySelect from "../../base/select/singSelect";
  export default {
    name: "singer",
    components: {Scroll,MySelect},
    data(){
      return{
        categoryData:{title:'分类:',list:['全部','男歌手','女歌手','乐队组合']},
        areaData:{title:'语种:',list:['全部','华语','欧美','日本','韩国','其他']},
        selectList:{category:0,area:0}
      };
    },
    created() {
      this.initSinger();
    },
    methods: {
      initSinger() {
        getHotSinger().then(data => console.log(data));
      },
      selectFromCategory(index){
        this.selectList.category=index;
      },
      selectFromArea(index){
        this.selectList.area=index;
      }
    }
  };
</script>

<style scoped lang="scss">
    @import "src/assets/sass/variable.scss";

    .singer-wrapper {
        box-sizing: border-box;
        padding: 0.08rem 0.533rem;
        .select-wrapper {
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
        }
    }
</style>
