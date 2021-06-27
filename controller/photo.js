

module.exports = {
    async getPhotos(context,pageParams){
        const {app} = context   
        let userId = context.state.user.id
        let albumId = context.params.id
        const [count,photos] =await Promise.all([app.service.photo.getApprovingPhotosCount(),app.service.photo.getApprovingPhotos(pageParams.pageIndex, pageParams.pageSize)])
        return {
            count,
            data: photos
        }
    },
    async add(context,url){
        let userId = context.state.user.id
        const {app} = context
        return app.service.photo.add(userId, url, context.request.body.id,context.file.filename)
    },
    async getPhotoById(ctx){
        const id =ctx.params.id
        const {app} = ctx
        return app.service.photo.getPhotoById(id)
    },
    







}