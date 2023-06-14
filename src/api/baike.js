import request from "@/utils/request";
//根据城市名给出百度百科的简介
export function getInfoFromBaidu(cityname) {
  return request({
    url: "baidubaike/api/openapi/BaikeLemmaCardApi",
    method: "get",
    params: {
      appid: 379020,
      bk_key: cityname,
    },
  });
}
//根据城市名给出维基百科的简介
export function getInfoFromWiki(cityname) {
  return request({
    url: "maitanbang/apis/mtbwkbaike/",
    method: "get",
    params: {
      key: "RurN62F7k9gY5c2f3XHIHoMCQJ",
      keyword: cityname,
    },
  });
}
