let REDIS_CONF = {
	port: 6379,
	host: '127.0.0.1'
}
const env = process.env
const appKey = env.APP_KET || 'wxa32cc12617b4d10b'
const appSecret = env.APP_SECRET || '836210038a2033edef7982b1151a44a8'
const nodeEnv = env.NODE_ENV

let db = {
	name: 'mongodb://localhost/xcx',
  }
  if (nodeEnv === 'production') {
	db = {
	  name: 'mongodb://localhost/xcx',
	}
  }


module.exports ={
	REDIS_CONF,
	appKey,
	appSecret,
	db
}