export const state = () => ({
  listUsers: [],
  startFromPage: 0,
});

export const mutations = {
  append(state, array) {
    const previousList = [...state.listUsers];
    state.listUsers = previousList.concat(array);
  },
  incrementStartFromPage(state, by_page) {
    state.startFromPage += by_page;
  },
};
