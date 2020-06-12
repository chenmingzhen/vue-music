const actions={
    /*recommend*/
    setRecommendScroll:({commit},recommendScroll)=>{
        return commit('SET_RECOMMENDSCROLL',recommendScroll);
    },
    setColumnMove:({commit},columnMove)=>{
        return commit('SET_COLUMNMOVE',columnMove);
    },
    setScrollMove:({commit},scrollMove)=>{
        return commit('SET_SCROLLMOVE',scrollMove);
    },
    setScrollFix:({commit},scrollFix)=>{
        return commit('SET_SCROLLFIX',scrollFix);
    },
    setRecommendOffsetY:({commit},recommendOffsetY)=>{
        return commit('SET_RECOMMENDOFFSETY',recommendOffsetY);
    },
    /*singer*/
    setSinger:({commit},singer)=>{
        return commit('SET_SINGER',singer);
    }
};
export default actions;
