import request from '@/utils/request'
//根据关键词获取相关新闻
export function getNews(keywords) {
    return request({
        url: 'tianapi/guonei/index',
        method: 'get',
        params: {
            key: 'cc3ef99b4451128bf9d039cf3efcbaca',
            num: 10,
            word: keywords
        }
    })
}