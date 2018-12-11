<template lang="pug">
.app
  .app-logo
    img.logo-img(src="~@/assets/images/logo.svg")
  form.window-form(@submit.prevent="handleClickCreateWindow(url)")
    .search-form
      font-awesome-icon.search-icon.ok(v-if="validUrl(url)" @click="handleClickCreateWindow(url)" icon="flushed")
      font-awesome-icon.search-icon(v-else icon="laugh")
      input.text-input(type="text" v-model.trim="url" placeholder="e.g. 'https://portan.com'")
  .history-view
    h2.title-history history
    app-history(:histories="histories" @createWindowHandler="handleClickCreateWindow")

</template>

<script>
import { mapActions, mapState } from 'vuex';
import AppHistory from '@/components/AppHistory';

const urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/;

export default {
  components: {
    AppHistory
  },
  data() {
    return {
      url: ''
    };
  },
  created() {
    this.getAllHistory();
  },
  computed: {
    ...mapState({
      histories: state => state.history.histories
    })
  },
  methods: {
    ...mapActions('history', ['getAllHistory', 'createHistory']),
    validUrl(url) {
      return urlRegex.test(url);
    },
    async handleClickCreateWindow(url) {
      if (!this.validUrl(url)) return;
      this.$electron.ipcRenderer.send('show-window', url);
      await this.createHistory({ url });
      this.url = '';
    }
  }
};
</script>

<style lang="scss">
.app {
  padding: 60px 80px;
  .app-logo {
    margin: 0 0 20px 0;
    .logo-img {
      width: 280px;
      -webkit-user-drag: none;
    }
  }
  .window-form {
    display: flex;
    justify-content: center;
    align-items: center;

    .search-form {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 22px;
      padding: 2px 8px;
      border: 1px solid rgba(154, 153, 153, 0.67);
      &:focus-within {
        box-shadow: 1px 1px 10px #ccc;
      }

      .search-icon {
        padding: 0 10px;
        border-right: 1px solid rgba(154, 153, 153, 0.67);
        font-size: 1.5em;
        color: #dfdfdf;
      }
      .ok {
        color: rgba(70, 67, 67, 0.87);
        cursor: pointer;
      }

      .text-input {
        padding: 8px 15px;
        min-width: 300px;
        font-size: 1.2em;
        &::placeholder {
          color: rgba(132, 124, 124, 0.39);
          font-size: 0.8em;
        }
      }
    }
  }

  .history-view {
    width: 100%;

    .title-history {
      font-size: 1.4em;
      color: rgba(0, 0, 0, 0.77);
      text-shadow: 1px 1px 5px #ccc;
      border-left: 4px solid rgba(0, 0, 0, 0.77);
      padding: 0 0 0 10px;
    }
  }
}
</style>
