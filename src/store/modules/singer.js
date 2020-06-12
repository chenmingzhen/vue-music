const singer={
    state:{
        singer:{}
    },
    mutations:{
        SET_SINGER:(state,singer)=>{
            state.singer=singer;
        }
    }
};
export default singer;
