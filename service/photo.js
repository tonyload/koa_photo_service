const {
    Phopto
  } = require('./model')

module.exports = {
    async getPhotosByAlbumId (albumId, pageIndex, pageSize) {
        let result
        if (pageSize) {
          result = await Phopto.find({
            albumId,
            isApproved: true,
            isDelete: false
          }).skip((pageIndex - 1) * pageSize).limit(pageSize)
        } else {
          result = await Phopto.find({
            albumId,
            isApproved: true,
            isDelete: false
          }).sort({
            'updated': -1
          })
        }
        return result
    },
    async getApprovingPhotosCount(){
        return Phopto.count({
            isApproved: null,
            isDelete: false
        })
    },
    async getApprovingPhotos(pageIndex,pageSize){
        return Phopto.find({
            isApproved: null,
            isDelete: false
          }).skip((pageIndex - 1) * pageSize).limit(pageSize)
    },
    async add(userId, url, albumId,filename) {
      console.log("service 收到的filename 是=======",filename)
      let _photo = await Phopto.create({
        userId,
        url,
        albumId,
        filename
      })
      return _photo
    },
    async getPhotoById (id) {
      return Phopto.findById(id)
    }
}