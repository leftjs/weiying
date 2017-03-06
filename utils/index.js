/**
 * Created by jason on 2017/3/6.
 */
/**
 * 格式化firebase api为标准的error callback(第一个参数为error)
 * @param func
 * @returns {function(...[*])}
 */
export const formatFirstErrorCallback = function (func) {
  return (...args) => {
    let callback = args.pop()
    try {
      func(...args, (snapshot) => {
        callback(null, snapshot)
      })
    }catch (err) {
      callback(err)
    }
  }
}
