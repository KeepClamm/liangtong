<template>
  <div>
    <canvas id="s-canvas" :width="contentWidth" :height="contentHeight"></canvas>
  </div>
</template>
<script>
export default {
  name: "draw-code",
  props: {
    code: {
      type: String,
      default: "1234"
    },
    contentWidth: {
      type: Number,
      default: 80
    },
    contentHeight: {
      type: Number,
      default: 26
    },
    fontSizeMin: {
      type: Number,
      default: 18
    },
    fontSizeMax: {
      type: Number,
      default: 19
    },
    backgroundColorMin: {
      type: Number,
      default: 180
    },
    backgroundColorMax: {
      type: Number,
      default: 240
    },
    colorMin: {
      type: Number,
      default: 50
    },
    colorMax: {
      type: Number,
      default: 160
    },
    lineColorMin: {
      type: Number,
      default: 100
    },
    lineColorMax: {
      type: Number,
      default: 200
    },
    dotColorMin: {
      type: Number,
      default: 0
    },
    dotColorMax: {
      type: Number,
      default: 255
    },
  },
  watch: {
    code() {
      this.drawCode();
    }
  },
  mounted() {
    this.drawCode();
  },
  methods: {
    drawCode() {
      this.identifyCode = this.code;
      this.drawPic();
    },
    // 生成一个随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 生成一个随机的颜色
    randomColor(min, max) {
      let r = this.randomNum(min, max);
      let g = this.randomNum(min, max);
      let b = this.randomNum(min, max);
      return "rgb(" + r + "," + g + "," + b + ")";
    },
    transparent() {
      return "rgb(0,0,0)";
    },
    drawPic() {
      let canvas = document.getElementById("s-canvas");
      let ctx = canvas.getContext("2d");
      ctx.textBaseline = "bottom";
      // 绘制背景
      // ctx.fillStyle = this.randomColor(
      //   this.backgroundColorMin,
      //   this.backgroundColorMax
      // );
      ctx.fillStyle = this.transparent();
      ctx.fillRect(0, 0, this.contentWidth, this.contentHeight);
      // 绘制文字
      for (let i = 0; i < this.identifyCode.length; i++) {
        this.drawText(ctx, this.identifyCode[i], i);
      }
      //绘制线条
      this.drawLine(ctx)
      //绘制点
      this.drawDot(ctx)
    },
    drawText(ctx, txt, i) {
      ctx.fillStyle = this.randomColor(this.colorMin, this.colorMax);
      ctx.font = 'normal normal 600 ' + this.randomNum(this.fontSizeMin, this.fontSizeMax) + "px normal SimHei";
      let x = (i + 1) * (this.contentWidth / (this.identifyCode.length + 1));
      // let y = this.randomNum(this.fontSizeMax, this.contentHeight);
      let y = 24;
      var deg = this.randomNum(-10, 10);
      // 修改坐标原点和旋转角度
      ctx.translate(x, y);
      ctx.rotate((deg * Math.PI) / 180);
      ctx.fillText(txt, 0, 0);
      // 恢复坐标原点和旋转角度
      ctx.rotate((-deg * Math.PI) / 180);
      ctx.translate(-x, -y);
    },
    drawLine(ctx) {
      // 绘制干扰线
      for (let i = 0; i < 8; i++) {
        ctx.strokeStyle = this.randomColor(
          this.lineColorMin,
          this.lineColorMax
        );
        ctx.beginPath();
        ctx.moveTo(
          this.randomNum(0, this.contentWidth),
          this.randomNum(0, this.contentHeight)
        );
        ctx.lineTo(
          this.randomNum(0, this.contentWidth),
          this.randomNum(0, this.contentHeight)
        );
        ctx.stroke();
      }
    },
    drawDot(ctx) {
      // 绘制干扰点
      for (let i = 0; i < 8; i++) { // 100
        ctx.fillStyle = this.randomColor(0, 255);
        ctx.beginPath();
        ctx.arc(
          this.randomNum(0, this.contentWidth),
          this.randomNum(0, this.contentHeight),
          1,
          0,
          2 * Math.PI
        );
        ctx.fill();
      }
    },
    autoDraw(callback) {
      let code = this.randomText();
      
      this.identifyCode = code;
      this.drawPic();
      
      callback && callback({code: code});
    },
    randomText() {
      let sCode = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
      let aCode = sCode.split(",");
      let aLength = aCode.length; //获取到数组的长度
      let show_num = [];

      //4个验证码数
      for (let i = 0; i <= 3; i++) {
        let j = Math.floor(Math.random() * aLength); //获取到随机的索引值
        let deg = (Math.random() * 30 * Math.PI) / 180; //产生0~30之间的随机弧度
        let txt = aCode[j]; //得到随机的一个内容
        show_num[i] = txt.toLowerCase();// 依次把取得的内容放到数组里面
      }


      //最后把取得的验证码数组存起来，方式不唯一
      let num = show_num.join("");
      return num;
    }
  },
};
</script>