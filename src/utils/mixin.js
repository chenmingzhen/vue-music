import {mapGetters,mapActions} from "vuex";
import {playMode} from "../assets/js/config";

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
                this.$router.go(-2);
            }
    }
};

export const playMixin={
    computed: {
        ...mapGetters(['playing','fullScreen','playList','sequenceList','mode','currentIndex','currentSong']),
        iconMode(){
            return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random';
        }
    },
    methods:{
        ...mapActions(['selectPlay','setFullScreen'])
    }
};
