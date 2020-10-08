//заглушки для модулей, не реализовавших поддержку типов typescript
declare module '*.html';
declare module '*wow.min';
declare module '*moment.min';
declare module 'ym';
declare module 'inputmask';
declare module 'vue-progressbar';
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
