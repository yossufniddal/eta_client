import HttpClient from "./Http";

export default class Api extends HttpClient {
    private static classInstance?: Api;
    private constructor() {
      super(process.env.VUE_APP_API_URL);
    }
    public static getInstance() {
      if (!this.classInstance) {
        this.classInstance = new Api();
      }
      return this.classInstance.instance;
    }

  
  }