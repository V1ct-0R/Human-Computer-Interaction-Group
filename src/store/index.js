import Vue from 'vue'
import Vuex from 'vuex'
import { Loading } from 'element-ui'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //存储token
    Authorization:localStorage.getItem('Authorization')?localStorage.getItem('Authorization') : '',
    userName:localStorage.getItem('userName')?localStorage.getItem('userName'):'',
    userType:localStorage.getItem('userType')?localStorage.getItem('userType'):'',
    name:localStorage.getItem('name')?localStorage.getItem('name'):'', 
    id:localStorage.getItem('id')?localStorage.getItem('id'):'', 
    major:localStorage.getItem('major')?localStorage.getItem('major'):'', 
    grade:localStorage.getItem('grade')?localStorage.getItem('grade'):'',
    credit:localStorage.getItem('credit')?localStorage.getItem('credit'):'',
    department:localStorage.getItem('department')?localStorage.getItem('department'):'',
    loadingInstance:''
  },
  getters: {
  },
  mutations: {
    //修改token，并把token存入localStorage
    changeLogin(state,user){
      state.Authorization=user.Authorization
      state.userName=user.userName
      state.userType=user.userType //登录身份
      localStorage.setItem('Authorization',user.Authorization)
      localStorage.setItem('userName',user.userName)
      localStorage.setItem('userType',user.userType)
    },

    //将用于基本信息存入localStorage
    storeInfo(state,user){
      state.name=user.name
      state.id=user.id
      state.major=user.major
      state.grade=user.grade
      state.credit=user.credit
      state.department=user.department
      localStorage.setItem('name',user.name)
      localStorage.setItem('id',user.id)
      localStorage.setItem('major',user.major)
      localStorage.setItem('grade',user.grade)
      localStorage.setItem('credit',user.credit)
      localStorage.setItem('department',user.department)
    },

    //删除token
    delLogin(state){
      console.log('delete token')
      localStorage.clear()
    },
    startLoading(){
      this.loadingInstance = Loading.service("fullscreen");
      // setTimeout(() => {
      //   this.loadingInstance.close();
      // }, 2000);
      // this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
      //   this.loadingInstance.close();
      // });
    },
    closeLoading(){
      this.loadingInstance.close();
    }

  },
  actions: {
  },
  modules: {
  }
})
