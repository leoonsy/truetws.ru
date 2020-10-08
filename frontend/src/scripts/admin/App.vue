<template>
  <div id="app">
    <v-app id="app">
      <vue-progress-bar></vue-progress-bar>
      <v-main v-if="!loadPage">
        <v-container>
          <div v-if="logged" class="panel">
            <Panel @logged="logged = $event"></Panel>
          </div>
          <Login v-else @logged="logged = $event"></Login>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import '@/styles/admin.scss';
import Api from '@/scripts/common/api';
import Login from '@/scripts/admin/components/Login.vue';
import Panel from '@/scripts/admin/components/Panel.vue';

@Component({
  components: {
    Login,
    Panel,
  },
})
export default class App extends Vue {
  logged = false;
  loadPage = true;
  newPrice = 0;
  oldPrice = 0;
  $Progress: any;
  async created() {
    this.$Progress.start();
    this.loadPage = true;
    try {
      if (await Api.isAuth()) this.logged = true;
    } catch (e) {
      console.log(e);
    }
    this.$Progress.finish();
    this.loadPage = false;
  }
}
</script>
<style lang="scss"></style>
