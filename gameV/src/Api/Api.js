import axios from 'axios'
import router from './../router'
// const ApiUrl = 'http://api.yyh517.com';
let apiLink = process.env.NODE_ENV == 'development'?"/api": "http://api.yyh517.com"

const ApiUrl = apiLink;
const ImgUrl = 'http://api.yyh517.com/uploadfiles/';
let sessionId;

axios.defaults.withCredentials = true
axios.defaults.crossDomain = true


function axiosApi(url, option, method='get',stopLogin=false) {
  let promise;

  promise = new Promise((resolve, reject) => {
    axios(Object.assign({method,url},option)).then((response) => {
      resolve(response.data)
      // if(response.data.q.s == 1002 || response.data.q.s == 1100) {
      //   router.push('login')
      // }
    }).catch((err) => {
      console.log(err)
      reject(err)
    })
  })
  return promise;
}

const Api = {
  /**
   * 13用户，个人详情 UserDetails（H5、 APP）
   * 
   * @param {id}  
   * @returns 
   */
  getUserDetails(s, id) {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n: 'UserDetails',
          s,
          q: {
            id
          }
        }
      }
    })
  },
  /**
   * 39	业务，游戏详情GameDetails（H5、APP）
   * 
   * @param {a}  1老虎机；2大转盘；3砸金蛋；
   * @returns 
   */
  GameDetails(a) {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n:'GameDetails',
          q: {
            a
          }
        }
      }
    })
  },

  /**
   * 40	业务，游戏操作GameUpdate（H5、APP）
   * 
   * @param {a}     1老虎机抽奖；2大转盘抽奖；3砸金蛋；
   * @param {type}  1玩；2分享；
   * @returns 
   */
  GameUpdate(a, type, s) {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n:'GameUpdate',
          s,
          q: {
            a,
            type,
          }
        }
      }
    })
  },

  /**
   * 返回图片链接
   * 
   * @returns 
   */
  getImgUrl() {
    return ImgUrl;
  }
}

export default Api;