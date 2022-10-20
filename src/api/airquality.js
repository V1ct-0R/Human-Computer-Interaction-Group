import request from '@/utils/request'
//根据城市id给出城市当前的空气质量
export function getCurrentAirQuality(cityid) {
    return request({
        url: 'myairquality/v7/air/now',
        method: 'get',
        params: {
            key: '8c1eb8ba37a74e3db0a7b808ce0aee75',
            location: cityid
        }
    })
}
//根据城市id给出城市未来五天的空气质量
export function getFutureAirQuality(cityid) {
    return request({
        url: 'myairquality/v7/air/5d',
        method: 'get',
        params: {
            key: '8c1eb8ba37a74e3db0a7b808ce0aee75',
            location: cityid
        }
    })
}