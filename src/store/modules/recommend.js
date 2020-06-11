const recommend={
    state:{
        recommendScroll:0,
        scrollMove:false,
        columnMove:false,
        scrollFix:false,
        recommendOffsetY:0
    },
    mutations:{
        SET_RECOMMENDSCROLL:(state,recommendScroll)=>{
            state.recommendScroll=recommendScroll;
        },
        SET_COLUMNMOVE:(state,columnMove)=>{
            state.columnMove=columnMove;
        },
        SET_SCROLLMOVE:(state,scrollMove)=>{
            state.scrollMove=scrollMove;
        },
        SET_SCROLLFIX:(state,scrollFix)=>{
            state.scrollFix=scrollFix;
        },
        SET_RECOMMENDOFFSETY:(state,recommendOffsetY)=>{
            state.recommendOffsetY=recommendOffsetY;
        }
    }
};
export default recommend;
