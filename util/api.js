const BY_PAGE = 10;

class API {
  constructor(startFromPage = 0) {
    this._startFromPage = startFromPage;
    this._data = [];
  }

  async load() {
    const url = "/users.json";
    const result = await fetch(url).then((res) => res.json());
    this._data = result;
  }

  async getUser(startFromPage) {
    let data = this._data.slice(startFromPage, startFromPage + BY_PAGE);
    return data;
  }

  getByPage() {
    return BY_PAGE;
  }

  getData() {
    return this._data;
  }
}

export default API;
