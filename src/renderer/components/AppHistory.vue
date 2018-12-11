<template lang="pug">
.app-history
  .history-list
    .history-item(v-for="history in histories" :key="history._id" @click="handleClickCreateWindow(history.url)")
      .icon-circle
        img.icon-img(:src="history.favicon || 'static/favicon.svg'")
      .history-title
        p.title-text {{ history.title }}
      .history-url
        p.url-text {{ history.url }}
      .history-time
        p.time-text {{ history.createdAt | dateTimeFilter }}
</template>

<script>
import dayjs from 'dayjs';

export default {
  filters: {
    dateTimeFilter: val => dayjs(val).format('YYYY/MM/DD/ HH:mm')
  },
  props: {
    histories: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleClickCreateWindow(url) {
      this.$emit('createWindowHandler', url);
    }
  }
};
</script>

<style lang="scss">
.app-history {
  width: 100%;

  .history-list {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;

    .history-item {
      width: 112px;
      height: 112px;
      margin: 5px 5px;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      overflow: hidden;
      cursor: pointer;
      &:hover {
        background: #efefef;
      }
      .icon-circle {
        width: 48px;
        height: 48px;
        background: #e6e6e6;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon-img {
          width: 28px;
          height: 28px;
          border-radius: 50%;
        }
      }

      .history-title {
        width: 90%;
        .title-text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 0.8em;
          text-align: center;
          color: rgba(0, 0, 0, 0.6);
          font-weight: 600;
          margin: 0;
        }
      }

      .history-url {
        width: 90%;
        .url-text {
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 0.5em;
          text-align: center;
          color: rgba(0, 0, 0, 0.6);
        }
      }
      .history-time {
        width: 90%;
        .time-text {
          font-size: 0.5em;
          color: #ccc;
          text-align: right;
          margin: 0;
        }
      }
    }
  }
}
</style>
