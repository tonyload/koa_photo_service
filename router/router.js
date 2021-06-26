const router =require("koa-router")()
const auth = require("../middleware/auth/auth") //鉴权中间件 
import upload from '../utils/upload'

function getPageParams (context) {
  return {
    pageIndex: parseInt(context.query.pageIndex) || 1,
    pageSize: parseInt(context.query.pageSize) || 10
  }
}

async function responseOK (ctx, next) {
  ctx.body = {
    status: 0
  }
  await next()
}
module.exports = (app)=>{
  router.get("/",app.controller.user.index),
  router.get("/login",async (context,next)=>{
    context.body = {
      status: 0,
      data: await app.controller.user.login(context)
    }
  }),

  /**
   * 扫码登陆，admin端获取二维码字符串,
   */
  router.get('/login/ercode', async (context, next) => {
    context.body = {
      status: 0,
      data: await app.controller.code.getErCode(context)
    }
  })

/**
 * 扫码登陆中，小程序侧调用的接口。将扫到的二维码信息传递过来
 */
 router.get('/login/ercode/:code', auth, async (context, next) => {
  let msg = await app.controller.code.setSessionKeyForCode(context)
  if(msg == -1){
    context.body = {
      status: -1,
    }
  }else{
    context.body = {
      status:0
    }
  }
  await next()
})
//admin 轮训验证接口
router.get("/checkcode/:code",async(context,next)=>{
    const startTime = Date.now()
    console.log(startTime)
    async function login () {
      const code = context.params.code
      const sessionKey = await app.controller.code.getSessionKeyByCode(context)
      if (sessionKey) {
        context.body = {
          status: 0,
          data: {
            sessionKey: sessionKey
          }
        }
      } else {
        if (Date.now() - startTime < 10000) {
          await new Promise((resolve) => {
            process.nextTick(() => {
              resolve()
            })
          })
          await login()
        } else {
          context.body = {
            status: -1
          }
        }
      }
    }
    await login()

})

  /**
   * 获取当前登陆的用户信息
   */
  router.get('/my', auth, async (context, next) => {
    context.body = {
      status: 0,
      data: context.state.user
    }
  })
  router.put("/user",auth,async (context,next)=>{
    await app.controller.user.update(context)
    await next()
  }) 

  /**
 * 获取相册列表
 */
 router.get('/album', auth, async (context, next) => {
    const pageParams = getPageParams(context)
    console.log("获取相册server收到",pageParams)
    const albums = await app.controller.album.getAlbums(context, pageParams)
    context.body = {
      data: albums,
      status: 0
    }
  })

/**
 * 添加相册
 */
 router.post('/album', auth, async (context, next) => {
  await app.controller.album.addAlbum(context)
  await next()
}, responseOK)
/**
 * 修改相册
 */
 router.put('/album/:id', auth, async (context, next) => {
  await app.controller.album.updateAlbum(context)
  await next()
}, responseOK)
/**
 * 删除相册
 */
 router.delete('/album/:id', auth, async (context, next) => {
  await app.controller.album.deleteAlbum(context)
  await next()
}, responseOK)


/**
 * 获取某个相册的相片列表
 */
router.get("/album/:id",auth,async (ctx,next)=>{
  const pageParams = getPageParams(ctx)
    const photos = await app.controller.photo.getPhotos(ctx,pageParams)
    ctx.body = {
      state:0,
      data:photos
    }
})
/**
 * 上传文件,upload.single('file') 参数file是前端上传的文件字段名 element上传组件中的name
 */
router.post("/photo",auth, upload.single('file'),async (ctx,next)=>{
  await app.controller.photo.add(ctx, `http://localhost:3000/${ctx.file.filename}`)
  await next()
},responseOK)












  app.use(router.routes())
  .use(router.allowedMethods()) //从源码中我们可以看到.allowedMethods处理的业务是当所有路由中间件执行完成之后,若ctx.status为空或者404的时候,丰富response对象的header头.
}