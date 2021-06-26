const {appKey,appSecret}= require("../config/db")
const request = require("request") // 采用reqeest组件调用微信接口

module.exports = {
    async getSession(code){
        const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appKey}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`
        return new Promise((resolve,reject)=>{
            request(url,{
                method:"GET",
                json:true
            },(error,res,body)=>{
                if(error){
                    reject(error)
                }else{
                    if(body.errcode){
                        reject(new Error(body.errmsg))
                    }else{
                        resolve(body)
                    }
                }
            })
        })
    }
}







