// 获取canvas元素和context
var lineCanvas = document.getElementById('line');
lineCanvas.width = window.innerWidth;
lineCanvas.height = window.innerHeight;
var ctx = lineCanvas.getContext('2d');
// 设置lineCanvas的宽度和高度
ctx.strokeStyle = 'white'
ctx.lineWidth = 3

ctx.moveTo(780, 432)
ctx.lineTo(720, 397.2)
ctx.moveTo(600, 348)
ctx.lineTo(520, 300)
// y=0.6x-20
ctx.moveTo(530, 370)
ctx.lineTo(480, 350)
ctx.moveTo(680, 420)
ctx.lineTo(630, 400)
// y=0.4x+170
ctx.moveTo(730, 470)
ctx.lineTo(660, 460.666)
ctx.moveTo(590, 434)
ctx.lineTo(520, 420)
ctx.moveTo(505, 457)
ctx.lineTo(416, 446.333)
// y=2/15*x+380.6
ctx.moveTo(640, 500)
ctx.lineTo(590, 495)
//ctx.moveTo(510, 503)
//ctx.lineTo(450, 499)
ctx.moveTo(410, 513)
ctx.lineTo(350, 510)
//ctx.moveTo(680, 516)
//ctx.lineTo(620, 513)
ctx.moveTo(660, 520)
ctx.lineTo(510, 520)
ctx.moveTo(740, 552)
ctx.lineTo(680, 562)
ctx.moveTo(610, 560)
ctx.lineTo(530, 565)
ctx.moveTo(430, 576)
ctx.lineTo(370, 580)
ctx.moveTo(700, 600)
ctx.lineTo(640, 613)
ctx.moveTo(560, 600)
ctx.lineTo(470, 615)
ctx.moveTo(600, 666)
ctx.lineTo(530, 688)
ctx.moveTo(520, 646)
ctx.lineTo(440, 668)

ctx.stroke()