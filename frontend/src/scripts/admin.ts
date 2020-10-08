import Vue from 'vue';
import App from './admin/App.vue';
import VueProgressBar from 'vue-progressbar';
import vuetify from './admin/plugins/vuetify';
//можно бы было использовать vue-router, vuex, но ради 2 компонентов не захотел

Vue.use(VueProgressBar, {
  color: 'rgb(53,120,255)',
  failedColor: 'red',
  height: '6px',
  autoFinish: false,
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  vuetify,
}).$mount('#app');
