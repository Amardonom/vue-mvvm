class Yyfvue {
  constructor (options, prop) {
    this.$options = options;
    this.$data = options.data;
    this.$prop = prop;
    this.$el = document.querySelector(options.el);
    this.init();
  }
  init () {
    observe(this.$data)
    this.$el.textContent = this.$data[this.$prop]
    new Watcher(this, this.$prop, value => {
      console.log('进入回调 更新数据')
      this.$el.textContent = value;
    })
  }
}