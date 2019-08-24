import axios from 'axios'
import qs from 'qs'
import {get , post } from '../request/Http'


//延时设置
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.params = {}
// POST传参序列化
axios.interceptors.request.use((config) => {
    // if (config.method === 'post') {
    //     config.data = qs.stringify(config.data)
    // }
    let URL = config.url.split(config.baseURL)
    return config
}, (error) => {
    return Promise.reject(error)
})
  
// 返回状态判断
axios.interceptors.response.use((res) => {
    //console.log(res)
    return res
}, (error) => {
    return Promise.reject(error)
})

/**
 * 
 * 备注：也可以使用fetch
 * 
 */

//封装获取数据
export const oGet = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.get(url, params)
            .then(res => {
                resolve(res.data)
            }, err => {
                reject(err)
            }).catch(err => {
                reject(err)
            })
    })
};
//封装发送数据
export const onPost = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify({params}),{headers:{'Content-Type':'application/x-www-form-urlencoded'
            }
        })
            .then(res => {
                resolve(res.data)
                console.log(res.data);
            }, err => {
                reject(err)
                console.log(err);
            }).catch(err => {
                reject(err)
                console.log(err);
            })
    })
}
//封装更新数据
export const oUpdate = (url ,param,params) => {
    return new Promise((resolve , reject) => {
        axios.patch(url ,param, params)
            .then(res => {
                resolve(res.data)
            }, err => {
                reject(err)
            }).catch(err => {
                reject(err)
            })
    })
}
//封装删除数据
export const oRemove = (url , params) => {
    return new Promise((resolve,reject) => {
        axios.delete(url,params)
            .then(res => {
                resolve(res.data)
            },err => {
                reject(err)
            }).catch(err => {
                reject(err)
            })
    })
}

export default {
   //此处是本地接口，你可在本公司局域网内使用 

   //获取用户数据
    _get () {
        return get('192.168.0.18:8080/hims/register');
    },
    
    //新建用户
    _RegisterPost (params) {
        return onPost('http://192.168.0.7:8080/hims/register',params);
    },

    //新建用户
    _loginPost (params) {
        return onPost('http://192.168.0.7:8080/hims/login',params);
    },
    
    //更新用户数据
    _update (param,params) {
        return oUpdate('http://192.168.1.190/api/v1/accounts'+'?ids='+param, params);
    },

    //删除单个用户
    _remove(user){
        //var userid = user.id;
        return oRemove('http://192.168.1.190/api/v1/accounts/');
        
    },

    //批量删除
    _removes(){
        // var ids = [];
        // $.each(this.selected, (i, user) => {
        //     ids.push(user.id);
        // });
        // ids = ids.join(",");
        return oRemove('http://192.168.1.190/api/v1/accounts/');
    },
}

