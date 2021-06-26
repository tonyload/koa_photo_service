

module.exports = {
    getAlbums:async(ctx,pageParams) =>{
        let pageSize = pageParams.pageSize
        let pageIndex =pageParams.pageIndex
        let userId = ctx.state.user.id
        const {app} = ctx
        let albums, count
        if (pageSize) {
            [count,albums ] = await Promise.all([app.service.album.getAlbumsCount(userId), app.service.album.getAlbums(userId, pageIndex, pageSize)])
        } else {
            albums = await app.service.album.getAlbums(userId)
        }
        let result = await Promise.all(albums.map(async function (item) {
            const id = item._id
            let ps = await app.service.photo.getPhotosByAlbumId(id)
            return Object.assign({
                        photoCount: ps.length,
                        fm: ps[0] ? ps[0].url : null
                    }, item.toObject())
        }))
        if (count) {
            return {
                count,
                data: result
            }
        }
        return result
    },
    async addAlbum(ctx){
        const {name} = ctx.request.body
        const {app} = ctx
        return app.service.album.add(ctx.state.user.id, name)
    },
    async updateAlbum(context){
        // .params.id, context.body.name, ctx.state.user
        const {app} = context
        let userId = context.state.user.id
        let albumId = context.params.id
        let name = context.body.name
        return app.service.album.update(albumId, name)
    },
    async deleteAlbum(context){
        const {app} = context
        let albumId = context.params.id
        return app.service.album.delete(albumId)
    }





}