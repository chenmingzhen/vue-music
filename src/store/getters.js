const all={
    /*recommend*/
    recommendScroll:state=>state.recommend.recommendScroll,
    columnMove:state=>state.recommend.columnMove,
    scrollMove:state=>state.recommend.scrollMove,
    scrollFix:state=>state.recommend.scrollFix,
    recommendOffsetY:state=>state.recommend.recommendOffsetY,
    /*singer*/
    singer:state=>state.singer.singer,
    user:state=>state.userInf.user,
    /*play*/
    playing:state=>state.play.playing,
    fullScreen:state=>state.play.fullScreen,
    playList:state=>state.play.playList,
    sequenceList:state=>state.play.sequenceList,
    mode:state=>state.play.mode,
    currentIndex:state=>state.play.currentIndex,
    currentSong:state=>state.play.playList[state.play.currentIndex]||{}
};
export default all;
