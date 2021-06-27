
const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    openId: { 
        //存储微信的 OpenID
        type: String,
        index: true,//因为需要按照openID查询用户，所以简历索引
        unique: true //openid唯一约束
      },
      created: {
        type: Date,
        default: Date.now
      },
      lastLogin: {
        type: Date
      },
      name: {
        type: String,
        index: true
      },
      avatar: {
        type: String
      },
      userType: { //用户类型标记管理员，普通用户，禁用用户
        type: Number,
        default: 0
      }
});


const albumSchema = new mongoose.Schema({
  userId: {
    type: String
  },
  name: {
    type: String
  }
}, {
  versionKey: false,
  timestamps: { createdAt: 'created', updatedAt: 'updated' }
})


const photoSchema = new mongoose.Schema({
  userId: {
    type: String
  },
  url: {
    type: String
  },
  albumId: {
    type: mongoose.Schema.Types.ObjectId
  },
  fileName:{
    type:String,
  },
  isApproved: {
    type: Boolean,
    default: null,
    index: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  isDelete: {
    type: Boolean,
    default: false
  },
})


const codeSchema = new mongoose.Schema({
  code: {
    type: String
  },
  sessionKey: String
})


module.exports = {
  User: mongoose.model('User', userSchema),
  Phopto: mongoose.model('photo', photoSchema),
  Album: mongoose.model('album', albumSchema),
  Code:mongoose.model("code",codeSchema)
}