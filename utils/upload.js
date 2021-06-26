const multer = require('@koa/multer');
const uuid = require('uuid')
const path = require('path')


const storage = multer.diskStorage({ // multer调用diskStorage可控制磁盘存储引擎
    destination: path.join(__dirname, '../uploads'),
    filename: function(req, file, cb){
      const ext = path.extname(file.originalname)
      cb(null, uuid.v4() + ext)
    }
  })
  const upload = multer({
    storage,
  })

  export default upload