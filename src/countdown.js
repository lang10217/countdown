class Countdown {
  /**
   *
   * @param {Object} options
   * options.thisObj
   * options.totalTime 总时间（毫秒）
   * options.interval 触发回调函数的时间间隔（毫秒）
   */
  start(options) {
    const interval = options.interval - 0;
    const totalTime = options.totalTime - 0;
    if (isNaN(interval) || interval < 100) {
      throw new Error("时间间隔(interval)不能少于100毫秒");
    }
    if (isNaN(interval) || totalTime < 1000) {
      throw new Error("总时间(totalTime)不能少于1000毫秒");
    }
    // 开始的时间点
    let startTime = Date.now();
    // 记录上个触发间隔回调函数的时间点
    let prevTime = startTime;
    // 计时器
    let timer = setInterval(() => {
      // 当前时间点
      let currentTime = Date.now();
      // 从上一下时间点到当前的持续时间
      let currentDuration = currentTime - prevTime;
      // 总持续时间
      let totalDuration = currentTime - startTime;
      

      // 判断是否达到触发间隔函数的条件
      if (currentDuration >= interval) {
        prevTime = currentTime - (currentDuration - interval);
        if (options.onTime) {
          if (options.thisObj) {
            options.onTime.call(options.thisObj);
          } else {
            let count = Math.round(totalDuration / interval);
            options.onTime({
              count, // 第几次
              second: Math.round((totalTime - totalDuration) / interval), // 以秒为单位的时间（倒计时）
              duration: totalDuration, // 从开始时间算具体执行的时间
            });
          }
        }
      }
      // 是否结束
      if ( totalDuration >= totalTime) {
        clearInterval(timer);
        if (options.onComplete) {
          if (options.thisObj) {
            options.onComplete.call(options.thisObj);
          } else {
            options.onComplete(totalDuration);
          }
        }
      }
    }, 50);
  }
}
module.exports = Countdown;
