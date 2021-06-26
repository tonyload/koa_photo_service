import {findBySessionKey}  from "../../service/user"

module.exports = async function(context,next){
    const sessionKey = context.get("x-session")
    console.log(`[auth] 获取到到sessionKey为${sessionKey}`)
    if(!sessionKey){
        context.throw(401,"请求头中为包涵x-session")
    }
    const user = await findBySessionKey(sessionKey)
    console.log(`[auth]========user`,user)
    if(user){
        if (user.userType === -1) {
            context.throw(401, '当前用户被禁用')
        }
        context.state.user = {
            id: user._id,
            name: user.name,
            avatar: user.avatar,
            isAdmin: user.userType === 1
         }
    }else{
        context.logger.info(`[auth] 根据sessionKey未获取到用户`)
        context.throw(401, 'session 过期')
    }

    await next()
}
