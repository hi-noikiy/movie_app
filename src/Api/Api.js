import axios from 'axios'
// const ApiUrl = 'http://139.199.68.39/api';
const ApiUrl = '/api';
const ImgUrl = 'http://139.199.68.39/uploadfiles/';
let sessionId;

function fetchAjax({
  url,
  option
}) {
  console.log(33333)
  let promise = new Promise((resolve, reject) => {
    fetch(url, option).then((res) => {
      console.log(res)
      resolve(res)
    })
  })
  return promise;
}

function axiosApi(url, option, method='get',stopLogin=false) {
  let promise;

  promise = new Promise((resolve, reject) => {
    axios(Object.assign({method,url},option)).then((response) => {
      resolve(response.data)
    }).catch((err) => {
      console.log(err)
      reject(err)
    })
  })
  return promise;
}

function getSession() {
  let session = sessionStorage.getItem('sessionId');
  return session;
}

const Api = {
  /**
   * 1 公共，获取会话 ID，Session（APP）
   * 
   */
  getSession () {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n:'Session',
          q: {
            'deviceToken': 'none',
            'deviceType': 16,
            'version': '1.0' 
          }
        }
      }
    })
  },

  /**
   * 2 公共，系统设置 Setting
   * 
   * @returns 
   */
  getSetting () {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n:'Setting',
          q: {}
        }
      }
    })
  },


  /**
   * 3 公共，短信验证码 SMSCode（H5、 APP）
   * 
   * @param {any} a 
   * @param {any} type 
   * @returns 
   */
  getSMSCode(a, type, mobile, code) {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n: 'SMSCode',
          s: sessionId?sessionId:getSession(),
          q: {
            a,
            type,
            mobile,
            code
          }
        }
      }
    })
  },

  /**
   * 4 公共， 分类列表 CategoryList（H5、 APP）
   * 
   * @returns 
   */
  getCategoryList() {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n: 'CategoryList',
          q: {
            a: 1
          }
        }
      }
    })
  },

  /**
   * 13用户，个人详情 UserDetails（H5、 APP）
   * 
   * @param {id}  
   * @returns 
   */
  getUserDetails(id) {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n: 'UserDetails',
          // s: sessionId?sessionId:getSession(),
          q: {
            id
          }
        }
      }
    })
  },

  /**
   * 26业务，电影列表 MovieList（H5、APP）
   * 
   * @param (a) 1 近期热映；2 即将上映；
   * 
   * @returns 
   */
  getMovieList(a) {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n: 'MovieList',
          s: sessionId?sessionId:getSession(),
          q: {
            a
          }
        }
      }
    })
  },

  /**
   * 27业务，电影详情 MovieDetails（H5、 APP）
   * 
   * @param {id} 电影 id 
   * @returns 
   */
  getMovieDetails(id) {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n: 'MovieDetails',
          s: sessionId?sessionId:getSession(),
          q: {
            id
          }
        }
      }
    })
  },

  /**
   * 28业务，电影评价列表 ReviewList（H5、 APP）
   * 
   * @param {a} 0 全部； 1 好评； 2 中评； 3 差评； 4 有图；5 我的影评；
   * @param {id} 电影 id
   * @param {pa}
   * @param {li}
   * @param {userId} 用户 id
   * @returns 
   */
  getReviewList({a, id, pa, li, userId}) {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n: 'ReviewList',
          s: sessionId?sessionId:getSession(),
          q: {
            a,
            id,
            pa,
            li,
            userId
          }
        }
      }
    })
  },

  /**
   * 29业务，电影评价发布 ReviewSubmit（H5、 APP）
   * 
   * @param {movieId}  电影 id
   * @param {starRating}  评分
   * @param {content}  评价
   * @param {images}   配图 
   * @returns 
   */
  ReviewSubmit(movieId, starRating, content, images) {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n: 'ReviewSubmit',
          s: sessionId?sessionId:getSession(),
          q: {
            review: {
              movieId,
              starRating,
              content,
              images
            }
          }
        }
      }
    })
  },

  /**
   * 36业务，票房排行榜列表 MovieRankingList（H5、 APP）
   * 
   * @returns 
   */
  getMovieRankingList() {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n: 'MovieRankingList',
          s: sessionId?sessionId:getSession(),
          q: {}
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