import request from "@/utils/request";
//获取当前的ip地址，用于给出城市推荐
export function getIpAddress() {
  return request({
    url: "https://www.mxnzp.com/api/ip/self",
    method: "get",
    params: {
      app_id: "oirptzeimlumaorr",
      app_secret: "RUlQSnZpa0dCUkU1SmQ4eDUybTVhdz09",
    },
  });
}
