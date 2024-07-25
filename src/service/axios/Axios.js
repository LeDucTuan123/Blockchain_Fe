import axios from "axios";

class Axios {
  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:8000",
      timeout: 30000,
    });
  }
}

const HttpRequest = new Axios().instance;

export default HttpRequest;
