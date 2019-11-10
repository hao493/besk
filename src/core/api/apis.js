import request from "./http"  // request({})
import params from "./params"

var poxy = "/apis"

var url1 = "/json1811.ashx"
var url2 = "/user/topic"



class Apis {
    //首页数据
    getIndexData() {
        return request({
            method: "GET",
            url: poxy + url1,
            params: {
                c: "NewIndexController",
                m: "index",
                v: params.v
            }
        })
    };
    //列表页数据
    getListData() {
        return request({
            method: "GET",
            url: poxy + url1,
            params: {
                c: "NsCakeCenter",
                m: "GetJdListNew",
                v: params.v
            }
        })
    };
    
    //详情页数据1
    getShowDataOne(data){
        return request({
             method:"GET",
             url:poxy+url1,
             params:{
                Name:data.Name,
                c:"NsCakeCenter",
                m:data.m,
                v:params.v
            }
         })
     }
     //详情页数据2
     getShowDataTwo(data){
        return request({
             method:"GET",
             url:poxy+url1,
             params:{
                City: data.City,
                ProName:data.ProName,
                c:data.c,
                m:data.m,
                v:params.v
            }
         })
     } 

}

export default new Apis();  //{getTest:function(){}}