class Watcher {
  constructor (vm, expOrFn, callbacck) {
    this.vm = vm  //
    this.expOrFn = expOrFn
    this.callbacck = callbacck
    this.value = this.get()
  }
  update () {
    console.log('update')
    this.run()
  }
  run () {
    // update => run => get 当更新的时候拿到最新的值
    let value = this.get()
    let oldVal = this.value
    if (value !== oldVal) {
      this.value = value
      // 执行回调函数
      this.callbacck.call(this.vm, value, oldVal) 
    }
  }
  get () {
    Dep.target = this
    let value = this.vm.$data[this.expOrFn]
    Dep.target = null
    console.log('value', value)
    return value
  }
}