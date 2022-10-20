import request from '@/utils/request'
//获取当前的ip地址，用于给出城市推荐
export function getIpAddress() {
    return request({
        url: 'https://www.mxnzp.com/api/ip/self',
        method: 'get',
        params: {
            app_id: 'rgihdrm0kslojqvm',
            app_secret: 'WnhrK251TWlUUThqaVFWbG5OeGQwdz09' 
        }
    })
}