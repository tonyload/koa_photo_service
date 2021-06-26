// const HomeService = require("../service/home")

const {
    getSession
  } = require('../service/wx')
 module.exports = {
    index: async(ctx, next) => {
        ctx.response.body = `<h1>index page123</h1>`
    },
    login: async(ctx, next) => {
        const session = await getSession(ctx.query.code)
        const { app } = ctx
        if (session) {
            const {
              openid
            } = session
            return app.service.user.login(openid)
          } else {
            throw new Error('登陆失败')
          }
    },
    update:async(context,next)=>{
      const { app } = context
      return app.service.user.update(context.state.user.id,context.request.body)
    },
 }