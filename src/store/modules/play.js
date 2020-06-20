import {playMode} from "../../assets/js/config";

const play={
    state:{
        playing:false,
        fullScreen:false,
        playList:[],
        sequenceList:[],
        mode:playMode.sequence,
        currentIndex:-1
    },
    mutations:{
        SET_PLAYING:(state,playing)=>{
            state.playing=playing;
        },
        SET_FULLSCREEN:(state,fullScreen)=>{
            state.fullScreen=fullScreen;
        },
        SET_PLAYLIST:(state,playList)=>{
            state.playList=playList;
        },
        SET_SEQUENCE_LIST:(state,sequenceList)=>{
            state.sequenceList=sequenceList;
        },
        SET_MODE:(state,mode)=>{
            state.mode=mode;
        },
        SET_CURRENT_INDEX:(state,currentIndex)=>{
            state.currentIndex=currentIndex;
        }

    }
};
export default play;
