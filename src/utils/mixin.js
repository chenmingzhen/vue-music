import {mapGetters,mapActions} from "vuex";

export const recommendMixin={
    computed:{
        ...mapGetters(
            ['recommendScroll','columnMove','scrollMove','scrollFix','recommendOffsetY']
        )
    },
    methods:{
        ...mapActions(
            ['setRecommendScroll','setColumnMove','setScrollMove','setScrollFix','setRecommendOffsetY']
        ),
        realPx(px) {
            const maxWidth = window.innerWidth > 750 ? 750 : window.innerWidth;
            return px * (maxWidth / 375);
        }
    }
};
