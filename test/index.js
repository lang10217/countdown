const Countdown = require("../index");
const countdown = new Countdown();
countdown.start({
  // 总时间（毫秒）
  totalTime: 5000,
  // 时间间隔
  interval: 1000,
  // 到达时间间隔后回调
  onTime: value => {
    // count 第几次执行
    // second 以秒为单位的倒计时
    // duration 从开始执行计算过去的毫秒数
    console.log("value", value);
  },
  // 完成回调
  onComplete: duration => {
    console.log("duration", duration);
  }
});
