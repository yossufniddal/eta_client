import HttpClient from "./Http";

export default class ApiDotnet extends HttpClient {
    private static classInstance?: ApiDotnet;
    private constructor() {
      super(process.env.VUE_APP_SIGNER_URL);
    }
    public static getInstance() {
      if (!this.classInstance) {
        this.classInstance = new ApiDotnet();
      }
      return this.classInstance.instance;
    }

  
  }