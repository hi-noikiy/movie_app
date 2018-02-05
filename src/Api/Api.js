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
          // s: sessionId?sessionId:getSession(),
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
   * 6 公共，心跳 HeartbeatAction（H5、 APP）
   * 
   * @param {a} 1 签到；
   * @returns 
   */
  HeartbeatAction() {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n: 'HeartbeatAction',
          q: {
            a: 1
          }
        }
      }
    })
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
          // s: sessionId?sessionId:getSession(),
          q: {
            a
          }
        }
      }
    })
  },

  /**
   * 8 公共，最新动态（公告栏） News（H5、 APP）
   * 
   * @returns 
   */
  getNews() {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n: 'News',
          // s: sessionId?sessionId:getSession(),
          q: {
            a:1
          }
        }
      }
    })
  },

  /**
   * 9	用户，登出UserLogout（APP)
   * 
   * @returns 
   */
  UserLogout() {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n: 'UserLogout',
          q: {}
        }
      }
    })
  },

  /**
   * 10	用户，微信授权登录重定向链接WeixinUr
   * 
   * @param {partner} 微信跳转
   * @returns 
   */
  WeixinUrl() {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n: 'WeixinUrl',
          q: {
            partner: 3
          }
        }
      }
    })
  },

  /**
   * 12用户，用户列表 UserList（H5、 APP）
   * 
   * @param {a} 0 全部； 1 附近； 2 我的好友； 3 好友申请；
   * @param {pa}
   * @param {li}
   * @param {sk}
   * @param {longitude}
   * @param {latitude}
   * @returns 
   */
  getUserList({a, pa, li, sk, longitude, latitude}) {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n: 'UserList',
          // s: sessionId?sessionId:getSession(),
          q: {
            a,
            pa,
            li,
            sk,
            longitude,
            latitude
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
          // s: sessionId?sessionId:getSession(),
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
   * 15用户，好友操作 FriendUpdate（H5、 APP）
   * 
   * @param {a}         1 同意添加好友； 2 赠送积分； 3 赠送卡券； 4 删除好友； 5 添加好友； 6 拒绝添加好友； 7 删除好友申请；
   * @param {userId}    action=1|2|3|4|5|6|7，用户 id
   * @param {integral}  
   * @param {orderId}  
   * @param {validationInfo}  action=5，添加好友；
   * @returns 
   */
  FriendUpdate({a, userId, integral, orderId, validationInfo}) {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n: 'FriendUpdate',
          // s: sessionId?sessionId:getSession(),
          q: {
            a,
            userId,
            integral,
            orderId,
            validationInfo
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
          // s: sessionId?sessionId:getSession(),
          q: {}
        }
      }
    })
  },

  /**
   * 17业务，影院列表 CinemaList（H5、 APP）
   * 
   * @param {pa}
   * @param {li}
   * @returns 
   */
  getCinemaList(pa, li) {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n: 'CinemaList',
          // s: sessionId?sessionId:getSession(),
          q: {
            pa,
            li
          }
        }
      }
    })
  },

  /**
   *18业务，约影列表 DateList（H5、 APP） 
   * 
   * @param {pa} 
   * @param {li} 
   * @returns 
   */
  getDateList(pa,li) {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n: 'DateList',
          // s: sessionId?sessionId:getSession(),
          q: {
            pa,
            li
          }
        }
      }
    })
  },

  /**
   * 19业务，约影申请 DateSubmit（H5、 APP）
   * 
   * @param {any} id 
   * @returns 
   */
  DateSubmit(id) {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n: 'DateSubmit',
          // s: sessionId?sessionId:getSession(),
          q: {
            id
          }
        }
      }
    })
  },

  /**
   * 20业务，约影操作 DateUpdate（H5、 APP）
   * 
   * @param {a}         1 接受邀请； 2 拒绝邀请； 3 晒票根
   * @param {id}        约影 id
   * @param {imagePath} Action=3；票根；
   * @returns 
   */
  DateUpdate(a,id,imagePath) {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n: 'DateUpdate',
          // s: sessionId?sessionId:getSession(),
          q: {
            a,
            date: {
              id,
              imagePath
            }
          }
        }
      }
    })
  },

  /**
   * 21业务，用户/约影赞操作 DateSwitch（H5、 APP）
   * 
   * @param {id}   对方用户 id；
   * @param {open} 1 赞； 2 取消赞；
   * @returns 
   */
  DateSwitch(id, open) {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n: 'DateSwitch',
          // s: sessionId?sessionId:getSession(),
          q: {
            id,
            open
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
          // s: sessionId?sessionId:getSession(),
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
          // s: sessionId?sessionId:getSession(),
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
          // s: sessionId?sessionId:getSession(),
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
          // s: sessionId?sessionId:getSession(),
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
   * 30业务，电影评价操作 ReviewUpdate（H5、 APP）
   * 
   * @param {any} id 
   * @returns 
   */
  ReviewUpdate(id) {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n: 'ReviewUpdate',
          // s: sessionId?sessionId:getSession(),
          q: {
            a: 1,
            id
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
          // s: sessionId?sessionId:getSession(),
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
          // s: sessionId?sessionId:getSession(),
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
   * 33	业务，评价评论操作CommentUpdate（H5、APP）
   * 
   * @param {a}  1删除
   * @param {id}  评论id
   * @returns 
   */
  CommentUpdate(id) {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n: 'CommentUpdate',
          q: {
            a: 1,
            id
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
          // s: sessionId?sessionId:getSession(),
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
          // s: sessionId?sessionId:getSession(),
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
          // s: sessionId?sessionId:getSession(),
          q: {}
        }
      }
    })
  },

  /**
   * 37业务，票根列表 TicketList（H5、 APP）
   * 
   * @param {pa}  
   * @param {li}  
   * @returns 
   */
  getTicketList(pa, li) {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n: 'TicketList',
          // s: sessionId?sessionId:getSession(),
          q: {
            pa,
            li
          }
        }
      }
    })
  },

  /**
   * 38业务，上传票根 TicketSubmit（H5、 APP）
   * 
   * @param {imagePath}  
   * @returns 
   */
  TicketSubmit(imagePath) {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n: 'TicketSubmit',
          // s: sessionId?sessionId:getSession(),
          q: {
            ticket: {
              imagePath
            }
          }
        }
      }
    })
  },

/**
 * 40	业务，票根操作TicketUpdate（H5、APP）
 * 
 * @param {ids} 票根id，["1","2","3"]
 * @returns 
 */
TicketUpdate({ids}) {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n: 'TicketUpdate',
          q: {
            a: 1,
            ids
          }
        }
      }
    })
  },

  /**`
   * 41业务，卡券列表 CouponList（H5、 APP）
   * 
   * @param {a} 1 积分商城；2 积分商城（不含 type4：积分+现金券）3 我的关注；
   * @param {categoryId}  Action=1|2，分类 id； 0 为全部
   * @param {isRecommend}  Action=1|2，分类 id； 0 为全部
   * @param {searchKey} sk，商品名称
   * @returns 
   */
  getCouponList({a, pa, li, categoryId, isRecommend, sk}) {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n: 'CouponList',
          // s: sessionId?sessionId:getSession(),
          q: {
            a,
            pa,
            li,
            categoryId,
            isRecommend,
            sk
          }
        }
      }
    })
  },

  /**
   * 42业务，卡券详情 CouponDetails（H5、 APP）
   * 
   * @param {id}  卡券id
   * @returns 
   */
  getCouponDetails(id) {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n: 'CouponDetails',
          // s: sessionId?sessionId:getSession(),
          q: {
            id
          }
        }
      }
    })
  },

  /**
   * 43业务，卡券关注操作 CouponSwitch（H5、 APP）
   * 
   * @param {id}  
   * @returns 
   */
  CouponSwitch(id, open) {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n: 'CouponSwitch',
          // s: sessionId?sessionId:getSession(),
          q: {
            id,
            open
          }
        }
      }
    })
  },

  /**
   * 44	业务，订单列表（我的卡券）OrderList（H5、APP
   * 
   * @param {a}  1我的订单（H5、APP）；2我的核销记录（H5）
   * @param {status}  0全部；1待使用；2已使用；3已过期；
   * @returns 
   */
  getOrderList({a, pa, li, status}) {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n: 'OrderList',
          // s: sessionId?sessionId:getSession(),
          q: {
            a,
            pa,
            li,
            status
          }
        }
      }
    })
  },

  /**
   * 46业务，订单提交（领取卡券） OrderSubmit
   * 
   * @param {a} 1 提交新订单； 2 待支付订单重新支付；
   * @param {id} action=2 时，传入旧订单 id；
   * @param {couponId}  action=1 时，传入卡券 id；
   * @param {transferWay} 支付方式： 1 余额； 2 支付宝； 3 微信； 4 银联
   * @returns 
   */
  OrderSubmit({a, id, couponId, transferWay}) {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n: 'OrderSubmit',
          // s: sessionId?sessionId:getSession(),
          q: {
            a,
            order: {
              id,
              couponId,
              transferWay
            }
          }
        }
      }
    })
  },
  
  /**
   * 47	业务，订单操作OrderUpdate（H5）（核销员）
   * 
   * @param {code} action=1时，券码；
   * @returns 
   */
  OrderUpdate(code) {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n: 'OrderUpdate',
          // s: sessionId?sessionId:getSession(),
          q: {
            a: 1,
            code
          }
        }
      }
    })
  },
  
  /**
   * 48财务，积分列表 IntegralList（H5、 APP）
   * 
   * @param {any} pa 
   * @param {any} li 
   * @returns 
   */
  getIntegralList(pa, li) {
    return axiosApi(ApiUrl, {
      params: {
        json: {
          n: 'IntegralList',
          // s: sessionId?sessionId:getSession(),
          q: {
            pa,
            li
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