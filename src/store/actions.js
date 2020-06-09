const actions={
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
    }
};
export default actions;
