<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="40">
          <el-autocomplete
            v-model="city" 
            placeholder="请输入城市名" 
            :fetch-suggestions="querySearch" 
            style="width:100%">
            <el-button type="primary" slot="append" icon="el-icon-search" @click="getInfo"></el-button>
          </el-autocomplete>
        </el-col>
      </el-row>
    </el-header>
    <el-tabs :tab-position="tabPosition" type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基本概况" name="first">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card shadow="always">
              <div slot="header" class="clearfix">
                <span>城市地图</span>
              </div>
              <span v-if="myMap==null">
                <div>暂无内容</div>
              </span>
              <span v-else>
                <div class="map-area" :id="mapId"></div>
              </span>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card shadow="always">
              <div slot="header" class="clearfix">
                <span>城市简介</span>
              </div>
              <span v-if="generalInfoBaidu==''">
                <div>暂无内容</div>
              </span>
              <span v-else style="overflow-y:scroll;">
                <div v-html="generalInfoBaidu" class="left"></div>
                <el-divider content-position="right">来自：百度百科</el-divider>
                <div v-html="generalInfoWiki" class="left"></div>
                <el-divider content-position="right">来自：维基百科</el-divider>
              </span>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="环境状况" name="second">
        <el-card shadow="always">
          <div slot="header" class="clearfix">
            <span>城市环境状况</span>
          </div>
          <span v-if="currentAirQualityTableData.length==0">
            <div>暂无内容</div>
          </span>
          <span v-else>
            <el-row :gutter="20">
              <el-col :span="16">
                <div>今日空气质量：</div>
                <el-table :data="currentAirQualityTableData" stripe style="width: 100%">
                  <el-table-column prop="station" label="整体情况/部分站点" width="150"></el-table-column>
                  <el-table-column prop="aqi" label="aqi指数" width="100"></el-table-column>
                  <el-table-column prop="category" label="空气质量" width="100"></el-table-column>
                  <el-table-column prop="pm2p5" label="PM2.5" width="100"></el-table-column>
                  <el-table-column prop="pm10" label="PM10" width="100"></el-table-column>
                  <el-table-column prop="no2" label="NO₂" width="100"></el-table-column>
                  <el-table-column prop="so2" label="SO₂" width="100"></el-table-column>
                  <el-table-column prop="co" label="CO" width="100"></el-table-column>
                  <el-table-column prop="o3" label="O₃" width="100"></el-table-column>
                  <el-table-column prop="primary" label="主要污染物" width="150"></el-table-column>
                </el-table>
              </el-col>
              <el-col :span="8">
                <div>未来空气质量：</div>
                <el-table :data="futureAirQualityTableData" stripe style="width: 100%">
                  <el-table-column prop="date" label="日期" width="100"></el-table-column>
                  <el-table-column prop="aqi" label="aqi指数" width="100"></el-table-column>
                  <el-table-column prop="category" label="空气质量" width="100"></el-table-column>
                  <el-table-column prop="primary" label="主要污染物" width="150"></el-table-column>
                </el-table>
                <div v-html="'数据来源：' + airQualitySource" class="left"></div>
              </el-col>
            </el-row>
            <el-divider content-position="right">来自：和风天气</el-divider>
          </span>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="天气预报" name="third">
        <el-card shadow="always">
          <div slot="header" class="clearfix">
            <span>未来天气情况</span>
          </div>
          <span v-if="generalInfoBaidu==''">
            <div>暂无内容</div>
          </span>
          <span v-else>
            <el-row :gutter="20">
              <el-col :span="12">
                <div id="he-plugin-standard"></div>
                <el-divider content-position="right">来自：和风天气插件</el-divider>
              </el-col>
              <el-col :span="12">
                <el-table :data="weatherTableData" stripe style="width: 100%">
                  <el-table-column prop="date" label="日期" width="100"></el-table-column>
                  <el-table-column prop="lowest" label="最低温度" width="90"></el-table-column>
                  <el-table-column prop="highest" label="最高温度" width="100"></el-table-column>
                  <el-table-column prop="weather" label="天气情况" width="100"></el-table-column>
                  <el-table-column prop="wind" label="风向风力" width="120"></el-table-column>
                  <el-table-column prop="humidity" label="湿度" width="90"></el-table-column>
                  <el-table-column prop="uv_index" label="uv指数" width="90"></el-table-column>
                </el-table>
                <div v-html="'今日出行建议：' + weatherTipsToday" style="font-size: 12px"></div>
                <div v-html="'明日出行建议：' + weatherTipsTommorow" style="font-size: 12px"></div>
                <el-divider content-position="right">来自：在线天气查询接口</el-divider>
              </el-col>
            </el-row>
          </span>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="社会新闻" name="fourth">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-card shadow="always">
              <div slot="header" class="clearfix">
                <span>城市社会新闻</span>
              </div>
              <span v-if="newsList.length==0">
                <div>暂无内容</div>
              </span>
              <span v-else>
                <ul v-for="(news,index) in newsList" :key="index">
                  {{index+1}}、{{news.title}}——发布时间：{{news.ctime}}
                </ul>
                <el-divider content-position="right">来自：天行数据</el-divider>
              </span>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="always">
              <div slot="header" class="clearfix">
                <span>全国社会新闻</span>
              </div>
              <span v-if="newsListNational.length==0">
                <div>暂无内容</div>
              </span>
              <span v-else>
                <ul v-for="(news,index) in newsListNational" :key="index">
                  {{index+1}}、{{news.title}}——发布时间：{{news.ctime}}
                </ul>
                <el-divider content-position="right">来自：天行数据</el-divider>
              </span>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="always">
              <div slot="header" class="clearfix">
                <span>全国疫情新闻</span>
              </div>
              <span v-if="newsListCovid.length==0">
                <div>暂无内容</div>
              </span>
              <span v-else>
                <ul v-for="(news,index) in newsListCovid" :key="index">
                  {{index+1}}、{{news.summary}}——发布时间：{{news.pubDateStr}}
                </ul>
                <el-divider content-position="right">来自：天行数据</el-divider>
              </span>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="其他信息" name="fifth">
        <el-card shadow="always">
          <div slot="header" class="clearfix">
            <span>城市其他信息</span>
          </div>
          <span v-if="generalInfoBaidu==''">
            <div>暂无内容</div>
          </span>
          <span v-else>
            <div v-html="'外文名：' + cityForeignName" style="margin-top:10px;"></div>
            <div v-html="'别名：' + cityOtherName" style="margin-top:10px;"></div>
            <div v-html="'行政区划代码：' + cityDivisionCode" style="margin-top:10px;"></div>
            <div v-html="'行政区类别：' + cityType" style="margin-top:10px;"></div>
            <div v-html="'电话区号：' + cityPhone" style="margin-top:10px;"></div>
            <div v-html="'邮政编码：' + cityPostcode" style="margin-top:10px;"></div>
            <div v-html="'地理位置：' + cityPos" style="margin-top:10px;"></div>
            <div v-html="'气候条件：' + cityClimate" style="margin-top:10px;"></div>
            <div v-html="'著名景点：' + citySpot" style="margin-top:10px;"></div>
            <div style="margin-top:10px;">......</div>
            <div style="margin-top:10px;">
              <a :href="'https://www.baidu.com'">前往百度以获取更多信息</a>
            </div>
          </span>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </el-container>
</template>

<script>
import { getInfoFromBaidu,getInfoFromWiki } from '@/api/baike'
import { getIpAddress } from '@/api/ipaddress'
import { getCurrentAirQuality,getFutureAirQuality } from '@/api/airquality'
import { getWeather,getCityId } from '@/api/weather'
import loadBMap from '@/api/loadmap'
import { getLngLat } from '@/api/loadmap'
import { getNews } from '@/api/news'
import { getCovidInfo } from '@/api/covid'

export default {
    name: 'CityInformation',
    mounted() {
        //获取ip地址，给出输入栏推荐
        getIpAddress().then((response)=>{
            //console.log(response)
            let resultcity = response.data["city"].slice(0, response.data["city"].length - 1)
            this.recommendCity.push({"value": resultcity})
        }).catch((error)=>{
            console.log(error)
        })
    },
    methods: {
        //先获取城市的基本信息
        getBasicInfo() {
            //定义传递给接口的参数
            var param = this.city
            var newparam = this.city + "市"
            //获取城市的经纬度
            getLngLat(newparam).then((response)=>{
                //console.log(response)
                this.cityLng = response.result["location"]["lng"]
                this.cityLat = response.result["location"]["lat"]
            }).catch((error)=>{
                console.log(error)
            })
            //获取城市的id
            getCityId(param).then((response)=>{
                //console.log(response)
                this.cityId = response.location[0]["id"]
            }).catch((error)=>{
                console.log(error)
            })
        },
        //获取城市的百科信息
        getInfoFromBaike() {
            //定义传递给接口的参数
            var param = this.city
            //获取城市的基本信息
            getInfoFromBaidu(param).then((response)=>{
                console.log(response)
                this.generalInfoBaidu = response.abstract
                this.cityCard = response.card
                //提取关键信息
                for(var i = 0; i < this.cityCard.length; i++) {
                    if(this.cityCard[i]["name"] == "地理位置") {
                        this.cityPos = this.cityCard[i]["value"][0]
                    } else if(this.cityCard[i]["name"] == "邮政编码") {
                        this.cityPostcode = this.cityCard[i]["value"][0]
                    } else if(this.cityCard[i]["name"] == "电话区号") {
                        this.cityPhone = this.cityCard[i]["value"][0]
                    } else if(this.cityCard[i]["name"] == "气候条件") {
                        this.cityClimate = this.cityCard[i]["value"][0]
                    } else if(this.cityCard[i]["name"] == "著名景点") {
                        this.citySpot = this.cityCard[i]["value"][0]
                    } else if(this.cityCard[i]["name"] == "外文名") {
                        this.cityForeignName = this.cityCard[i]["value"][0]
                    } else if(this.cityCard[i]["name"] == "别名") {
                        this.cityOtherName = this.cityCard[i]["value"][0]
                    } else if(this.cityCard[i]["name"] == "行政区划代码") {
                        this.cityDivisionCode = this.cityCard[i]["value"][0]
                    } else if(this.cityCard[i]["name"] == "行政区类别") {
                        this.cityType = this.cityCard[i]["value"][0]
                    }
                }
                //利用正则表达式筛选出信息中的汉字和标点符号
                var reg = /[(\u4e00-\u9fa5)(\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3010|\u3011|\u007e)]+/g;
                //地理位置
                if(this.cityPos == '') {
                    this.cityPos = "暂无相关信息"
                } else {
                    this.cityPos = this.cityPos.match(reg).join("")
                }
                //邮政编码
                if(this.cityPostcode == '') {
                    this.cityPostcode = "暂无相关信息"
                }
                //电话区号
                if(this.cityPhone == '') {
                    this.cityPhone = "暂无相关信息"
                }
                //气候条件
                if(this.cityClimate == '') {
                    this.cityClimate = "暂无相关信息"
                } else {
                    this.cityClimate = this.cityClimate.match(reg).join("")
                }
                //著名景点
                if(this.citySpot == '') {
                    this.citySpot = "暂无相关信息"
                } else {
                    this.citySpot = this.citySpot.match(reg).join("")
                }
                //外文名
                if(this.cityForeignName == '') {
                    this.cityForeignName = "暂无相关信息"
                }
                //别名
                if(this.cityOtherName == '') {
                    this.cityOtherName = "暂无相关信息"
                } else {
                    this.cityOtherName = this.cityOtherName.match(reg).join("")
                }
                //行政区划代码
                if(this.cityDivisionCode == '') {
                    this.cityDivisionCode = "暂无相关信息"
                }
                //城市类别
                if(this.cityType == '') {
                    this.cityType = "暂无相关信息"
                } else {
                    this.cityType = this.cityType.match(reg).join("")
                }
            }).catch((error)=>{
                console.log(error)
            })
            //从维基百科获取信息
            getInfoFromWiki(param).then((response)=>{
                console.log(response)
                this.generalInfoWiki = response.data[0]["detailedDescription"]["articleBody"]
            }).catch((error)=>{
                console.log(error)
            })
        },
        //获取空气质量信息
        getAirQuality() {
            //定义传递给接口的参数
            var airparam = this.cityId
            //获取当前的空气质量
            getCurrentAirQuality(airparam).then((response)=>{
                //console.log(response)
                this.currentAirQualityTableData.push({
                    "station": "整体情况",
                    "aqi": response.now["aqi"],
                    "category": response.now["category"],
                    "pm2p5": response.now["pm2p5"],
                    "pm10": response.now["pm10"],
                    "no2": response.now["no2"],
                    "so2": response.now["so2"],
                    "co": response.now["co"],
                    "o3": response.now["o3"],
                    "primary": response.now["primary"]=="NA" ? "无" : response.now["primary"],
                })
                for(var i = 0;i < 5;i++) {
                    this.currentAirQualityTableData.push({
                        "station": response.station[i]["name"],
                        "aqi": response.station[i]["aqi"],
                        "category": response.station[i]["category"],
                        "pm2p5": response.station[i]["pm2p5"],
                        "pm10": response.station[i]["pm10"],
                        "no2": response.station[i]["no2"],
                        "so2": response.station[i]["so2"],
                        "co": response.station[i]["co"],
                        "o3": response.station[i]["o3"],
                        "primary": response.station[i]["primary"]=="NA" ? "无" : response.station[i]["primary"],
                    })
                }
            }).catch((error)=>{
                console.log(error)
            })
            //获取将来五天的空气质量
            getFutureAirQuality(airparam).then((response)=>{
                //console.log(response)
                for(var i = 0; i < response.daily.length; i++) {
                    this.futureAirQualityTableData.push({
                        "date": response.daily[i]["fxDate"],
                        "aqi": response.daily[i]["aqi"],
                        "category": response.daily[i]["category"],
                        "primary": response.daily[i]["primary"]=="NA" ? "无" : response.daily[i]["primary"],
                    })
                }
                this.airQualitySource = response.refer["sources"][0]
            }).catch((error)=>{
                console.log(error)
            })
        },
        //获取新闻信息
        getNews() {
            //定义传递给接口的参数
            var param = this.city
            //获取城市新闻
            getNews(param).then((response)=>{
                //console.log(response)
                this.newsList = response.newslist
            }).catch((error)=>{
                console.log(error)
            })
            //获取全国新闻
            getNews('').then((response)=>{
                //console.log(response)
                this.newsListNational = response.newslist
            }).catch((error)=>{
                console.log(error)
            })
            var aData = new Date();
            var month = aData.getMonth() < 9 ? "0" + (aData.getMonth() + 1) : aData.getMonth() + 1;
            var date = aData.getDate() <= 9 ? "0" + aData.getDate() : aData.getDate();
            var mydate = aData.getFullYear() + "-" + month + "-" + date;
            //获取疫情新闻
            getCovidInfo(mydate).then((response)=>{
                //console.log(response)
                this.newsListCovid = response.newslist[0]["news"]
            }).catch((error)=>{
                console.log(error)
            })
        },
        //用户输入城市名后，获取各类信息，加载插件
        getInfo() {
            //如果此时还没有城市名（如用户切换下方标签页），则不做任何操作
            if(this.city == '') {
                return
            }
            this.getBasicInfo()
            this.getInfoFromBaike()
            this.getAirQuality()
            this.getNews()
            //百度地图设置
            this.initMap()
            //定义传递给接口的参数
            var param = this.city
            //获取城市的天气情况（在线查询）
            getWeather(param).then((response)=>{
                //console.log(response)
                this.weatherInfo = response.newslist
                //console.log(this.weatherInfo)
                for(var i = 0;i < this.weatherInfo.length;i++) {
                    this.weatherTableData.push({
                        "date": this.weatherInfo[i]["date"],
                        "lowest": this.weatherInfo[i]["lowest"],
                        "highest": this.weatherInfo[i]["highest"],
                        "weather": this.weatherInfo[i]["weather"],
                        "wind": this.weatherInfo[i]["wind"] + this.weatherInfo[i]["windsc"],
                        "humidity": this.weatherInfo[i]["humidity"],
                        "uv_index": this.weatherInfo[i]["uv_index"],})
                }
                this.weatherTipsToday = this.weatherInfo[0]["tips"]
                this.weatherTipsTommorow = this.weatherInfo[1]["tips"]
                //console.log(this.tableData)
            }).catch((error)=>{
                console.log(error)
            })
            
            //和风天气插件设置
            window.WIDGET = {
                "CONFIG": {
                    "layout": "1",
                    "width": "700",
                    "height": "400",
                    "background": "1",
                    "dataColor": "FFFFFF",
                    "city": "CN" + this.cityId,
                    "key": "d67c479a55994456812602fced848ba7"
                }
            }
            let script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = "https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0"
            document.getElementsByTagName('head')[0].appendChild(script)
        },
        //对百度地图初始化
        initMap() {
            loadBMap('Ip8dveGyiHj0OyPdyZ1pPm72kG05aF3H')
            .then(() => {
                // 百度地图API功能
                this.myMap = new BMap.Map(this.mapId) // 创建Map实例
                this.myMap.centerAndZoom(new BMap.Point(this.cityLng, this.cityLat), 11) // 初始化地图,设置中心点坐标和地图级别
                //添加地图类型控件
                this.myMap.addControl(
                    new BMap.MapTypeControl({
                        mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
                    })
                )
                this.myMap.setCurrentCity(this.city) // 设置地图显示的城市 此项是必须设置的
            
                this.myMap.enableScrollWheelZoom(true) //开启鼠标滚轮缩放
                //添加marker等
                //...
                //调用点聚合方法
                //....这里不再描述，正常使用
            })
            .catch(() => {
                console.log('地图加载失败')
            })
        },
        //输入框推荐
        querySearch(queryString, cb) {
            var strlist = this.recommendCity;
            var results = queryString ? strlist.filter(this.createFilter(queryString)) : strlist;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        //输入框推荐
        createFilter(queryString) {
            return (strlist) => {
                return (strlist.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        //切换标签页
        handleClick(tab, event) {
            console.log(tab, event);
            //先清空缓存内容
            this.weatherTableData = []
            this.currentAirQualityTableData = []
            this.futureAirQualityTableData = []
            setTimeout(()=>{
                this.getInfo()  //保证切换标签页时信息同步更新
            },500)
        }
    },
    data() {
        return {
            activeName: 'first',  //进入页面时激活的标签页
            tabPosition: 'bottom',  //标签页的位置（建议不要改动）
            recommendCity: [],  //根据ip地址推荐的城市
            city: '',   //城市名
            cityId: '',   //城市的id，用于查询天气情况
            cityCard: [],   //城市的各类信息，来自百度百科
            cityPos: '',  //城市的地理位置，来自百度百科
            cityPostcode: '',   //城市的邮政编码，来自百度百科
            cityPhone: '',  //城市的电话区号，来自百度百科
            cityClimate: '',    //城市的气候条件，来自百度百科
            citySpot: '',   //城市的著名景点，来自百度百科
            cityLng: 0,   //城市的经度
            cityLat: 0,   //城市的纬度
            cityForeignName: '',    //城市的外文名
            cityOtherName: '',    //城市的别名
            cityDivisionCode: '',   //城市的行政区划代码
            cityType: '',     //城市的行政区类别
            generalInfoBaidu: '',   //城市的简介，来自百度百科
            generalInfoWiki: '',    //城市的简介，来自维基百科
            mapId: 'BMap-' + parseInt(Date.now() + Math.random()),  //地图的id，用于地图插件
            myMap: null,  //地图本体，用于地图插件
            currentAirQualityTableData: [],   //城市当前的空气质量
            futureAirQualityTableData: [],    //城市未来五天内的空气质量
            airQualitySource: '',   //空气质量数据的来源
            weatherInfo: [],    //从在线天气查询接口获得的数据
            weatherTipsToday: '',    //天气查询得到的出行建议
            weatherTipsTommorow: '',    //天气查询得到的出行建议
            weatherTableData: [],    //天气情况界面右侧表格的数据
            newsList: [],   //与城市相关的新闻列表
            newsListNational: [],   //全国新闻列表
            newsListCovid: [],    //疫情相关新闻列表
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
body > .el-container {
  margin-bottom: 40px;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-tabs--card {
  height: calc(100vh - 150px);
  /*overflow-y: auto;*/
}
.el-tab-pane {
  height: calc(100vh - 150px);
  /*overflow-y: auto;*/
}
.el-row {
  margin-bottom: 20px;
  display:flex;
  flex-wrap: wrap;
}
.el-row  .el-card {
  min-width: 100%;
  height: 35em;
  margin-right: 20px;
  transition: all .5s;
  text-align: left;
}
.el-card {
  min-width: 100%;
  height: 35em;
  margin-right: 20px;
  transition: all .5s;
  text-align: left;
  overflow-y: auto;
}
.map-area {
  width: 100%;
  height: 460px;
}
.ul {
  margin-left: 20px;
  display: inline-block;
  width: 300px;
}
</style>
