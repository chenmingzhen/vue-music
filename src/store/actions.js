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
    },
    setUser:({commit},user)=>{
        return commit('SET_USER',user);
    },
    /*play*/
    selectPlay:({commit,state},{list,index})=>{
        commit('SET_PLAYLIST', list);
        commit('SET_SEQUENCE_LIST',list);
        commit('SET_CURRENT_INDEX', index);
        commit('SET_FULLSCREEN', true);
        commit('SET_PLAYING', true);
    },
    setFullScreen:({commit},isFull)=>{
        return commit('SET_FULLSCREEN',isFull);
    },
    setCurrentIndex:({commit},index)=>{
        return commit('SET_CURRENT_INDEX',index);
    },
    setPlaying:({commit},playing)=>{
        return commit('SET_PLAYING',playing);
    }
};
export default actions;
