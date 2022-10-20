import request from '@/utils/request'
//根据给出的日期，返回疫情信息（部分）
export function getCovidInfo(mydate) {
    return request({
        url: 'tianapi/ncov/index',
        method: 'get',
        params: {
            key: 'cc3ef99b4451128bf9d039cf3efcbaca',
            date: mydate
        }
    })
}