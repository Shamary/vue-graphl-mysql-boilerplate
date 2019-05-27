// IMPORTS
import Vue from 'vue'
import VueApollo from 'vue-apollo'
import Vuetify from 'vuetify'
import veevalidate from 'vee-validate'
import pageTitle from 'vue-page-title'
import axios from 'axios'
import vueCookies from 'vue-cookies'

import ApolloClient from './apollo'
import store from './store'
import router from './router'
import App from './App'
// import { setContext } from 'apollo-link-context'

// SETUP PLUGINS
Vue.config.productionTip = false
Vue.use(VueApollo)
Vue.use(Vuetify)
Vue.use(veevalidate)
Vue.use(pageTitle, { router })
Vue.use(vueCookies)

// set default config
vueCookies.config('7d')

Vue.prototype.$axios = axios

/*
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')

  return {
    headers,
    authoriztion: token ? `Bearer ${token}` : ''
  }
})

const client = ApolloClient({
  link: authLink
}) */

// APOLLO PROVIDER
const apolloProvider = new VueApollo({
  defaultClient: ApolloClient,
  defaultOptions: {
    $loadingKey: 'loading'
  }
})

new Vue({
  store,
  router,
  el: '#app',
  provide: apolloProvider.provide(),
  render: h => h(App)
})
