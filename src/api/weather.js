import request from "@/utils/request";
//根据城市名获取将来七天内的天气预报
export function getWeather(cityname) {
  return request({
    url: "tianapi/tianqi/index",
    method: "get",
    params: {
      key: "cc3ef99b4451128bf9d039cf3efcbaca",
      city: cityname,
      type: 7,
    },
  });
}
//根据城市名获取城市id（用于查询天气）
export function getCityId(cityname) {
  return request({
    url: "myweather/v2/city/lookup",
    mothod: "get",
    params: {
      location: cityname,
      key: "8c1eb8ba37a74e3db0a7b808ce0aee75",
    },
  });
}
