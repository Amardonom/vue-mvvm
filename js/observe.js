class Observe {
  constructor (data) {
    this.data = data
    this.walk(data)
  }
  walk (data){
    const self = this
    Object.keys(data).forEach(function(key) {
      self.difineReactive(self.data, key, self.data[key])
    })
  }
  difineReactive (data, key, value){
    const self = this
    Object.defineProperty(data, key, {
      enumerable: true, // 可被遍历
      configurable: false, // 不可被重新define
      get: function () {
        console.log(`你正在访问${key}，值为${value}`)
        return value
      },
      set: function (newVal) {
        console.log(`你正在设置${key}，修改后的值为${newVal}`)
        value = newVal
      }
    })
  }
}

export function observe (value) {
  if (!value || typeof value !== 'object') {
    return
  }
  return new Observe(value)
}