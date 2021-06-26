  const {
    encodeErCode,
    decode
  } = require('../utils/crypto')
 module.exports = {

    getErCode:async(ctx,next)=>{
        const code = encodeErCode()
        const { app } = ctx
        await app.service.code.add(code)
        setTimeout(() => {
          app.service.code.removeData(code)
        }, 30000)
        return code
    },
    setSessionKeyForCode:async(context,next)=>{
        const code = context.params.code
        const sessionKey = context.get('x-session')
        const {timespan} = decode(code)
        const {app} = context
        // 30s 过期
        if (Date.now() - timespan > 30000) {
          return -1
        }else{
          return app.service.code.updateSessionKey(code, sessionKey)
        }
    },
    async getSessionKeyByCode (ctx,next) {
      const {app} = ctx 
      const sessionKey = await app.service.code.getSessionKey(ctx.params.code)
      if (sessionKey) {
        await app.service.code.removeData(ctx.params.code)
      }
      return sessionKey
    }




 }