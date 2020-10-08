<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">
            {{ dialogTitle }}
          </v-card-title>
          <v-card-text>{{ dialogText }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">
              Понял, принял
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-card class="panel mx-auto" max-width="344">
      <v-btn class="panel__logout" color="error" @click="logout">Выйти</v-btn>
      <v-card-title> Параметры сайта </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="save">
          <v-text-field
            v-model.number.trim="oldPrice"
            label="Старая цена"
            required
          ></v-text-field>
          <v-text-field
            v-model.number.trim="newPrice"
            label="Новая цена"
            required
          ></v-text-field>

          <v-btn
            class="panel__submit"
            color="primary"
            type="submit"
            :disabled="loading"
          >
            Сохранить
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Api from '@/scripts/common/api';

@Component
export default class Panel extends Vue {
  newPrice: number | string = 'loading...';
  oldPrice: number | string = 'loading...';
  loading = false;
  dialog = false;
  dialogTitle = '';
  dialogText = '';
  $Progress: any;
  async created() {
    this.loading = true;
    try {
      const prices = await Api.getPrices();
      this.newPrice = prices.data.newPrice;
      this.oldPrice = prices.data.oldPrice;
    } catch (e) {
      console.log(e);
    }
    this.loading = false;
  }

  async save() {
    this.$Progress.start();
    this.loading = true;
    try {
      await Api.savePrices(this.oldPrice, this.newPrice);
      this.dialogTitle = 'Успешно';
      this.dialogText = 'Цены успешно сохранены!';
    } catch (err) {
      this.dialogTitle = 'Ошибка!';
      if (err.responseJSON?.message) {
        this.dialogText = err.responseJSON.message;
      } else {
        this.dialogText = 'Произошла неизвестная ошибка';
      }
    }
    this.dialog = true;
    this.$Progress.finish();
    this.loading = false;
  }

  logout() {
    Api.logout();
    this.$emit('logged', false);
  }
}
</script>

<style lang="scss">
.panel {
  &__logout {
    width: 100px;
    position: absolute;
    top: 0;
    right: -100px;

    @media (max-width: 600px) {
      position: static;
      margin-left: auto;
      display: block;
    }
  }

  &__submit {
    margin: 15px 0 0 0;
  }
}
</style>
