import axios from 'axios'
// const ApiUrl = 'http://139.199.68.39/api';
const ApiUrl = '/api';
const ImgUrl = 'http://139.199.68.39/uploadfiles/';
let sessionId;

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

  UploadFiles(file) {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n: 'UploadFiles'
        }
      },
      data: file,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }, 'post')
  },

  /**
   * 7 公共，广告列表 AdList（H5、 APP）
   * 
   * @param {action} 1 影讯； 2 卡券
   * @returns 
   */
  getAdList(a) {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n: 'AdList',
          s: sessionId?sessionId:getSession(),
          q: {
            a
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
   * 14用户，用户更新 UserUpdate（H5、 APP）
   * 
   * @param {any} {
   *     a,   1 个人资料； 2 约影资料； 3 设置/重设支付密码； 4 修改支付密码； 5 更新坐标位置； 6 验证身份信息
   *     nickname,  Action=1，昵称
   *     imagePath, Action=1，头像
   *     sex,       Action=1，性别： 1 男； 2 女； 3 未知；
   *     images,    Action=1，用户相册
   *     birthday,  Action=1，生日年-月-日；
   *     loveStatus,  Action=1，恋爱状态： 1 隐藏； 2 单身； 3 情侣； 4 已婚；
   *     favoriteTypes,  Action=1，喜欢类型
   *     favoriteSuperStars,  Action=1，喜欢明星
   *     signature,           Action=1，个性签名
   *     industryId,          Action=1，行业 id
   *     regionId,            Action=1，区级地区 id
   *     cinemaId,            Action=2，约影院 id
   *     matchSex,            Action=2，匹配性别
   *     matchAgeMin,         Action=2，匹配年龄最小值
   *     matchAgeMax,         Action=2，匹配年龄最大值
   *     payPassword,         Action=2，匹配年龄最大值
   *     oldPassword,         Action=4；原密码（md5）；
   *     longitude,           Action=5；经度；
   *     latitude,            Action=5；纬度；
   *     realname,            Action=6；姓名；
   *     idNumber}            Action=6；身份证号；
   * @returns 
   */
  UserUpdate({
    a, 
    nickname,
    imagePath,
    sex,
    images,
    birthday,
    loveStatus,
    favoriteTypes,
    favoriteSuperStars,
    signature,
    industryId,
    regionId,
    cinemaId,
    matchSex,
    matchAgeMin,
    matchAgeMax,
    payPassword,
    oldPassword,
    longitude,
    latitude,
    realname,
    idNumber}) {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n: 'UserUpdate',
          s: sessionId?sessionId:getSession(),
          q: {
            a,
            user: {
              nickname,
              imagePath,
              sex,
              images,
              birthday,
              loveStatus,
              favoriteTypes,
              favoriteSuperStars,
              signature,
              industryId,
              regionId,
              cinemaId,
              matchSex,
              matchAgeMin,
              matchAgeMax,
              payPassword,
              oldPassword,
              longitude,
              latitude,
              realname,
              idNumber
            }
          }
        }
      }
    })
  },

  /**
   * 16用户，用户积分排行榜 UserRankList（H5、 APP）
   * 
   * @returns 
   */
  getUserRankList() {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n: 'UserRankList',
          s: sessionId?sessionId:getSession(),
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
   * 31业务，评价评论列表 CommentList（H5、 APP）
   * 
   * @param {id}  评价 id
   * @param {pa}  页数
   * @param {li}  条数
   * @returns 
   */
  getCommentList(id, pa, li) {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n: 'CommentList',
          s: sessionId?sessionId:getSession(),
          q: {
            id,
            pa,
            li
          }
        }
      }
    })
  },

  /**
   * 32业务，评价评论发布 CommentSubmit（H5、 APP）
   * 
   * @param {reviewId}  评价 id
   * @param {content}  评论
   * @param {replyUserId}  被回复人 id
   * @returns 
   */
  CommentSubmit(reviewId, content, replyUserId) {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n: 'CommentSubmit',
          s: sessionId?sessionId:getSession(),
          q: {
            comment: {
              reviewId,
              content,
              replyUserId
            }
          }
        }
      }
    })
  },

  /**
   * 34业务，评价赞列表 PraiseList（H5、 APP）
   * 
   * @param {id}  评价 id
   * @param {pa}  页数
   * @param {li}  条数
   * @returns 
   */
  getPraiseList(id, pa, li) {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n: 'PraiseList',
          s: sessionId?sessionId:getSession(),
          q: {
            id,
            pa,
            li
          }
        }
      }
    })
  },

  /**
   * 35业务，评价赞操作 PraiseSwitch（H5、 APP）
   * 
   * @param {id}  评价 id
   * @param {open} 1 赞； 2 取消赞；
   * @returns 
   */
  PraiseSwitch(id, open) {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n: 'PraiseSwitch',
          s: sessionId?sessionId:getSession(),
          q: {
            id,
            open
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