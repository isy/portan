import db from '@/plugins/nedb';
import { getPageInfo } from '@/plugins/puppeteer';

const state = {
  histories: []
};

const mutations = {
  addHistories(state, { histories }) {
    state.histories = histories;
  },
  addHistory(state, { history }) {
    state.histories.unshift(history);
  }
};

const actions = {
  getAllHistory({ commit }) {
    db.find({})
      .sort({ createdAt: -1 })
      .exec((err, docs) => {
        if (err) console.error(err);
        commit('addHistories', { histories: docs });
      });
  },
  async createHistory({ commit }, { url }) {
    const doc = await getPageInfo(url);
    db.insert(doc, (err, newDoc) => {
      if (err) console.error(err);
      commit('addHistory', { history: newDoc });
    });
  }
};

export default {
  state,
  mutations,
  actions,
  namespaced: true
};
