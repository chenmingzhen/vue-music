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

export const singerMixin={
    computed: {
        ...mapGetters(['singer'])
    },
    methods: {
        ...mapActions(['setSinger'])
    }
};

export const userMixin={
    computed: {
        ...mapGetters(['user'])
    },
    methods: {
        ...mapActions(['setUser'])
    }
};

export const utilMixin={
    methods:{
            back() {
                this.$router.go(-1);
            }
    }
};
