<template>
  <div>
    <div class="compare-container">
      <div class="abs-progress">
        <div class="percentage">
          <div class="progress-numshow">{{ line1Left }}</div>
        </div>
      </div>
      <div class="circle mr">
        <div class="circle-text">单一业务客户</div>
      </div>
      <div class="img-box">
        <img src="@/assets/compare.png" alt="" class="wh100" />
      </div>
      <div class="circle ml">
        <div class="circle-text">跨业务客户</div>
      </div>
      <div class="abs-progress-right">
        <div class="percentageR">
          <div class="progress-numshow-right">{{ line1Right }}</div>
        </div>
      </div>
    </div>
    <div class="compare-container">
      <div class="abs-progress">
        <div class="percentage line2Left">
          <div class="progress-numshow">{{ line2Left }}</div>
        </div>
      </div>
      <div class="circle mr">
        <div class="circle-text">机构客户</div>
      </div>
      <div class="img-box">
        <img src="@/assets/compare.png" alt="" class="wh100" />
      </div>
      <div class="circle ml">
        <div class="circle-text">个人客户</div>
      </div>
      <div class="abs-progress-right">
        <div class="percentageR line2Right">
          <div class="progress-numshow-right">{{ line2Right }}</div>
        </div>
      </div>
    </div>
    <div class="compare-container">
      <div class="abs-progress br62b5e5">
        <div class="percentage line3Left bg62b5e5">
          <div class="progress-numshow" style="margin-left: -30px;">{{ line3Left }}</div>
        </div>
      </div>
      <div class="circle mr bg62b5e5">
        <div class="circle-text">高风险客户</div>
      </div>
      <div class="img-box">
        <img src="@/assets/compare.png" alt="" class="wh100" />
      </div>
      <div class="circle ml bg62b5e5">
        <div class="circle-text">非高风险客户</div>
      </div>
      <div class="abs-progress-right br62b5e5">
        <div class="percentageR line3Right bg62b5e5">
          <div class="progress-numshow-right">{{ line3Right }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
  },
  data() {
    return {
      total: 71419,
      line1Left: 58343,
      line1Right: 13076,
      line2Left: 6850,
      line2Right: 64050,
      line3Left: 2366,
      line3Right: 69053
    };
  },
  mounted() {
    const abs1Ele = document.querySelector(".percentage");
    const abs1EleR = document.querySelector(".percentageR");
    abs1Ele.style.width = (this.line1Left / this.total).toFixed(2) * 400 + 20 + "px";
    abs1EleR.style.width = (this.line1Right / this.total).toFixed(2) * 400 + 20 + "px";
    const line2Left = document.querySelector(".line2Left");
    const line2Right = document.querySelector(".line2Right");
    line2Left.style.width = (this.line2Left / this.total).toFixed(2) * 400 + 20 + "px";
    line2Right.style.width = (this.line2Right / this.total).toFixed(2) * 400 + 20 + "px";
    const line3Left = document.querySelector(".line3Left");
    const line3Right = document.querySelector(".line3Right");
    line3Left.style.width = (this.line3Left / this.total).toFixed(2) * 400 + 30 + "px";
    line3Right.style.width = (this.line3Right / this.total).toFixed(2) * 400 + 20 + "px";
  },
};
</script>

<style lang="scss" scoped>

.bg62b5e5 {
  background-color: #62b5e5 !important;
}
.br62b5e5 {
  border: 2px solid #62b5e5 !important;
}
.ml {
  margin-left: 30px;
}
.mr {
  margin-right: 30px;
}
.compare-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
  .abs-progress-right {
    width: 400px;
    background-color: #fff;
    height: 30px;
    border-radius: 0 20px 20px 0;
    border: 2px solid #0070c0;
    position: relative;
    left: -10px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
    .percentageR {
      position: absolute;
      height: 26px;
      top: 0px;
      left: -20px;
      background-color: #0070c0;
      border-radius: 0 20px 20px 0;
      .progress-numshow-right {
        position: absolute;
        bottom: 28px;
        right: 0px;
        font-style: italic;
        font-weight: 600;
        font-size: 18px;
      }
    }
  }
  .abs-progress {
    width: 400px;
    background-color: #fff;
    height: 30px;
    border-radius: 20px 0 0 20px;
    border: 2px solid #0070c0;
    position: relative;
    left: 10px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
    .percentage {
      position: absolute;
      height: 26px;
      top: 0px;
      right: -20px;
      background-color: #0070c0;
      border-radius: 20px 0 0 20px;
      .progress-numshow {
        position: absolute;
        bottom: 29px;
        left: -20px;
        font-style: italic;
        font-weight: 600;
        font-size: 18px;
      }
    }
  }
  .circle {
    width: 100px;
    height: 100px;
    background-color: #0070c0; /* 外圈颜色 */
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1000;
    .circle-text {
      z-index: 100;
      width: 50px; /* 内圈宽度 */
      height: 50px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
  }
  .circle::after {
    content: "";
    width: 80px; /* 内圈宽度 */
    height: 80px; /* 内圈高度 */
    background-color: white; /* 内圈颜色 */
    border-radius: 50%;
    position: absolute;
  }
  .img-box {
    width: 80px;
    height: 80px;
    .wh100 {
      width: 80px;
      height: 80px;
      object-fit: contain;
    }
  }
}
</style>
