module.exports = () => {
    function render(json) {
        this.set("Content-Type", "application/json")
        this.body = JSON.stringify(json)
    }
    return async (ctx, next) => {
        ctx.send = render.bind(ctx) //我们把 JSON 数据的处理方法挂载在 ctx 对象中，并起名为 send
        await next()
    }
  }