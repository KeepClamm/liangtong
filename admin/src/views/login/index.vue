<template>
  <div class="login-wrap">
    登录
  </div>
</template>

<script>

export default {
  name: "Login",
  components: {
    
  },
  
  data() {
    return {
      
    };
  },
  computed: {

  },
  watch: {

  },
  methods: {
    
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;

  .video-box {
    position: relative;
    height: 100vh;
    background-color: #C1CFF7;
    overflow: hidden;

    .video-background {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      object-fit: cover;
      min-height: 800px;
    }
  }


  .login-container-center {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: #fff;

    .header {
      padding: 28px 40px 0 24px;
      align-items: center;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;

      .deloitte-istock {
        >img {
          width: 216px;
          height: 23.93px;
        }
      }
    }

    .center {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .warning-mark {
        width: 772px;
        height: 199.84px;

        .header-img {
          text-align: center;

          >img {
            width: 196.97px;
            height: 54.62px;
          }
        }

        >p {
          justify-content: space-between;
          font-weight: 900;
          font-size: 51.4056px;
          line-height: 130%;
          text-align: center;
          letter-spacing: 0.06em;
          color: #FFFFFF;
        }

        .slogan {
          font-weight: 400;
          font-size: 22.49px;
          line-height: 100%;
          text-align: center;
          letter-spacing: 0.56em;
          // text-align-last: justify;
          // text-justify:distribute-all-lines;
          color: #FFFFFF;
        }

      }
    }
  }

}
.transition-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
