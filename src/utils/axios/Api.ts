import HttpClient from "./Http";

export default class Api extends HttpClient {
    private static classInstance?: Api;
    private constructor() {
      super();
    }
    public static getInstance() {
      if (!this.classInstance) {
        this.classInstance = new Api();
      }
      return this.classInstance.instance;
    }

  
  }