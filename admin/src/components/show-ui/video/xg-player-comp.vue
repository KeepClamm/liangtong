<template>
  <div class='xg-player-comp-box w100 h100' :class="{'is-fullscreen': isFullscreen}" v-if="videoUrl">
    <div id="xgPlayer" class="xg-player-comp"></div>

    <div
      v-show="showMask && !isFullscreen"
      class="xg-player-comp-mask w100 h100"
    >
      <div
        v-if="showCollectBtn"
        class="collect-btn"
        @click="collectVideo()"
      >
        <img
          class="block-img"
          :src="isCollect ? isCollectIcon : notCollectIcon"
        >
      </div>

      <img
        class="play-btn block-img"
        :src="notFullscreenPlayVideoIcon"
        @click.stop="playVideo()"
      >
    </div>

  </div>
</template>

<script>
import Player from 'xgplayer';
import '../../../assets/xgplayer/.xgplayer/skin/index';

import waterMarker from '@/utils/PTwarterMark';

const notFullscreenPlayVideoIcon = require('@/assets/images/show-ui/video/play-video-icon.png');
const isCollectIcon = require('@/assets/images/show-ui/video/is-collect-icon.png');
const notCollectIcon = require('@/assets/images/show-ui/video/not-collect-icon.png');

// const testVideoUrl2 = require('@/assets/video/ceshi2.mp4');

export default {
  components: {},
  props: {
    url: String,
    poster: String,
    lastPlayTime: {
      type: Number,
      default: 0
    },
    showCollectBtn: {
      type: Boolean,
      default: true,
    },
    isCollect: {
      type: Boolean,
      default: false,
    },
    showWaterMark: {
      type: Boolean,
      default: false,
    },
    markText: String,
  },
  data() {
    return {
      notFullscreenPlayVideoIcon,
      isCollectIcon,
      notCollectIcon,

      videoUrl: null,
      player: null,

      showMask: true,
      isFullscreen: false,

    };
  },
  computed: {},
  watch: {
    url(){ // 切换视频源
      if (this.player) {
        this.player.src = this.url;
      } else {
        this.setVideoUrl();
      }
    },
    poster(){ // 切换封面图
      if (this.poster) {
        this.player.poster = this.poster;
      }
    },
    lastPlayTime(){
      // this.player.lastPlayTime = this.lastPlayTime;
    },
  },
  created() {},
  mounted() {
    this.setVideoUrl();
  },
  methods: {
    setVideoUrl(){
      if (!this.url) {
        this.videoUrl = null;
        return ;
      }

      this.videoUrl = this.url;

      this.$nextTick(()=>{
        this.initVideo();
      })

      if (this.showWaterMark) {
        this.setWaterMarkOnVideo()
      }
    },
    initVideo(){
      let config = {
        id: 'xgPlayer',
        url: this.videoUrl,
        width: '100%',
        height: '100%',
        lang: 'en',
        playbackRate: [0.5, 0.75, 1, 1.5, 2],
        defaultPlaybackRate: 1.5,
        playbackRateUnit: 'X',
        lastPlayTime: this.lastPlayTime,
        videoInit: true,
        // lastPlayTimeHideDelay: 5, // //提示文字展示时长（单位：秒）
        // controls: false,
        ignores: ['replay'], // 'time', 'definition', 'error', 'fullscreen', 'i18n', 'loading', 'mobile', 'pc', 'play', 'progress', 'replay', 'volume', 'poster'
      };

      if (this.poster) {
        config.poster = this.poster;
      } else {
        config.videoInit = true;
      }

      this.player = new Player(config);

      this.player.emit('resourceReady', [
        {name: 'HD', url: this.videoUrl},
        // {name: 'SD', url: testVideoUrl2}
      ]);

      this.listenPlayEvents();
    },
    listenPlayEvents(){
      this.player.on('requestFullscreen', () => {
        this.isFullscreen = this.player.fullscreen;

        this.setWaterMarkOnVideo();
      })

      this.player.on('exitFullscreen', () => {
        this.isFullscreen = this.player.fullscreen;
        
        this.setWaterMarkOnVideo();
      })

      this.player.on('timeupdate', () => {
        let info = {
          type: 'time',
          currentTime: this.player.currentTime,
        };

        this.sendInfo(info)
      })

      this.player.on('play', () => {
        this.showMask = false;

        let info = {
          type: 'play',
        };

        this.sendInfo(info)
      })

      this.player.on('pause', () => {
        this.showMask = true;

        let info = {
          type: 'pause',
        };

        this.sendInfo(info)
      })
    },
    sendInfo(sendInfo){
      this.$emit('handle-video', sendInfo);
    },
    // 播放视频
    playVideo(){
      this.player.play();
    },
    // 点击收藏按钮
    collectVideo(){
      let info = {
        type: 'collect',
        isCollect: !this.isCollect,
      };

      this.sendInfo(info)
    },
    // 添加水印到视频播放器中
    setWaterMarkOnVideo(){
      const markText = this.markText || '水印';

      waterMarker.RemoveTpWatermark('xgPlayer');

      this.$nextTick(()=>{
        waterMarker.TpWatermark(markText,'250','350','-45','#383333','14','0.5','xgPlayer');
      });
    },

  },
}
</script>
<style lang='scss' scoped>
  .xg-player-comp-box {
    position: relative;
  }

  .xg-player-comp{
    z-index: 1;
    position: relative;
    overflow: hidden;
  }

  .xg-player-comp-mask{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    > .collect-btn{
      position: absolute;
      top: 24px;
      right: 24px;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      background: rgba(255, 255, 255, 0.8);
      mix-blend-mode: normal;
      box-shadow: 0px 8.4px 24px rgba(0, 0, 0, 0.05);
      backdrop-filter: blur(8.4px);
      border-radius: 100%;
      > img{
        width: 24px;
        height: 24px;
      }
    }

    > .play-btn{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 130px;
      height: 44px;
      cursor: pointer;
      overflow: hidden;
    }
  }

  .xg-player-comp-box ::v-deep .xgplayer-start{
    display: none;
  }

  .is-fullscreen ::v-deep .xgplayer-start{
    display: inline-block;
  }
  .is-fullscreen ::v-deep .xgplayer-skin-xg-player.xgplayer-playing .xgplayer-start{
    display: none;
  }
  .is-fullscreen ::v-deep .xgplayer-skin-xg-player.xgplayer-pause .xgplayer-start{
    display: inline-block;
  }
</style>