class Boss {
  constructor() {
    window.bsWait = function(timeout) {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve();
        }, timeout);
      });
    };
  }
}
export default new Boss();
