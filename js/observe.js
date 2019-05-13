
// Dep 发布中心
class Dep {
  constructor () {
    // 这里用来收集订阅者
    this.subs = []
  }
  addSub (sub) {
    // 新增订阅者
    this.subs.push(sub)
  }
  notify () {
    console.log('属性变化通知 Watcher 执行更新视图函数')
    const self = this
    // 当监听到数据更新的时候 通知订阅者 触发订阅者的update方法
    self.subs.forEach(function(sub){
      sub.update()
    })
  }
}

Dep.target = null

// Observe 数据劫持
class Observe {
  constructor (data) {
    this.data = data
    this.walk(data)
  }
  walk (data){
    const self = this
    Object.keys(data).forEach(function(key) {
      self.difineReactive(data, key, data[key])
    })
  }
  difineReactive (data, key, value){
    let dep = new Dep()
    observe(value) // 如果data[key]是对象的话 对data[key]进行监听
    Object.defineProperty(data, key, {
      enumerable: true, // 可被遍历
      configurable: false, // 不可被重新define
      get: function () {
        console.log(`你正在访问${key}，值为${value}`)
        if (Dep.target) {
          // 在这里添加一个订阅者
          console.log('Dep.target', Dep.target)
          dep.addSub(Dep.target)
        }
        return value
      },
      set: function (newVal) {
        if (newVal === value) {
          return
        }
        value = newVal
        observe(newVal) // 如果更新之后的值是对象的话继续监听
        dep.notify() // 通知订阅者
      }
    })
  }
}

function observe (value) {
  if (!value || typeof value !== 'object') {
    return
  }
  return new Observe(value)
}