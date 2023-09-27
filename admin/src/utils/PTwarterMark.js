
// 添加水印方法
/**
 * @param {String} CON 水印文字内容
 * @param {Number} H 水印行高
 * @param {Number} W 水印宽度
 * @param {Number} R 旋转度数（可为负值）
 * @param {String} C 水印字体颜色
 * @param {Number} S 水印字体的大小
 * @param {Number} O 水印透明度（0~1之间取值）
 * @param {String} waterId 水印所处 dom ID
 */

 function TpWatermark(CON,H,W,R,C,S,O,waterId) {
  // 判断水印是否存在，如果存在，那么不执行
  if (document.getElementById('tp-watermark') != null) {
    return;
  }
  let TpLine = parseInt(document.getElementById(waterId).clientWidth/W) * 2; // 一行显示几列

  let StrLine = '';
  for(let i = 0; i < TpLine; i++){
    StrLine += '<span style="display: inline-block; line-height:' + H + 'px; width:' + W + 'px; text-align: center; transform:rotate(' + R + 'deg); color:' + C + '; font-size:'+ S + 'px; opacity:' + O + ';">'+ CON +'</span>';
  }
  let DivLine = document.createElement('div');
  DivLine.innerHTML = StrLine;

  let TpColumn = parseInt(document.getElementById(waterId).clientHeight/H) * 2; // 一列显示几行
  let StrColumn = '';
  for(let i = 0; i < TpColumn; i++){
    StrColumn += '<div style="white-space: nowrap;">' + DivLine.innerHTML + '</div>';
  }
  let DivLayer = document.createElement('div');
  DivLayer.innerHTML = StrColumn;
  DivLayer.id = 'tp-watermark'; // 给水印盒子添加类名
  DivLayer.style.position = 'absolute'; // fixed
  DivLayer.style.top = '50%'; // 整体水印距离顶部距离 10px
  DivLayer.style.left = '-70px'; // 改变整体水印的left值 -100px
  DivLayer.style.zIndex = '99999'; // 水印页面层级
  DivLayer.style.transform = 'translateY(-50%)'; // 居中显示

  DivLayer.style.pointerEvents = 'none';

  document.getElementById(waterId).appendChild(DivLayer); // 到页面中
}

// 移除水印方法
function RemoveTpWatermark(waterId){
  // 判断水印是否存在，如果存在，那么执行
  if (document.getElementById('tp-watermark') == null) {
    return;
  }
  document.getElementById(waterId).removeChild(document.getElementById('tp-watermark'));
}
export default {
  TpWatermark,
  RemoveTpWatermark
};
