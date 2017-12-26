import axios from 'axios'
// const ApiUrl = 'http://139.199.68.39/api';
const ApiUrl = '/api';
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
  }
}

export default Api;