import Vue from 'vue'

/*
* vue-router
*/
import VueRouter from 'vue-router'
Vue.use(VueRouter)

/*
* iview
*/
import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView)

/*
* iconfont
*/
import iconfont from '../src/iconfont.js'

/*
* google analytics
*/
const isProd = process.env.NODE_ENV === 'production'
import VueAnalytics from 'vue-analytics'
Vue.use(VueAnalytics, {
  id: 'UA-42562282-2',
  router,
  debug: !isProd,
  sendHitTask: isProd,
  autoTracking: {
    page: isProd
  }
})

/*
* vue bus
*/
import VueBus from 'vue-bus'
Vue.use(VueBus)

/*
* vue-localforage
*/
import VueLocalForage from 'vue-localforage'
Vue.use(VueLocalForage)

/*
* i18n
*/
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

import en from './lang/en.json'
import tw from './lang/tw.json'
import cn from './lang/cn.json'
import jp from './lang/jp.json'

const locales = {
  'en-US': en,
  'zh-TW': tw,
  ja: jp,
  'zh-CN': cn
}

// init language
const languages = navigator.languages
const languageList = ['zh-TW', 'zh-CN', 'en-US', 'ja']
for (let index = 0; index < languages.length; index++) {
  const language = languages[index]
  if (languageList.indexOf(language) >= 0) {
    var locale = languages[index]
    break
  } else {
    var locale = 'en'
  }
}

const i18n = new VueI18n({
  locale: locale,
  messages: locales
})

/*
* echarts
*/
import VeLine from 'v-charts/lib/line'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/visualMap'
Vue.component(VeLine.name, VeLine)

/*
* axios
*/
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
window.axios = axios

/*
* router pages
*/
import App from './App.vue'
import intro from './router/intro.vue'
import custom from './router/custom.vue'
import about from './router/about.vue'
import charts from './router/charts.vue'
import dashboard from './router/dashboard.vue'

/*
* components
*/
import appHeader from './components/navbar.vue'
import preview from './components/preview.vue'
import appFooter from './components/footer.vue'

/*
* new vue
*/
const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    component: App
  },
  {
    path: '/intro',
    component: intro
  },
  {
    path: '/preview',
    component: preview
  },
  {
    path: '/custom',
    component: custom
  },
  {
    path: '/about',
    component: about
  },
  {
    path: '/charts',
    component: charts
  },
  {
    path: '/dashboard',
    component: dashboard
  }
]

const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  router,
  i18n,
  components: {
    appHeader,
    appFooter
  }
})

// page loading bar
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  next()
})
router.afterEach(route => {
  iView.LoadingBar.finish()
})
