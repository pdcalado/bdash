class Getter {
  baseUrl: string;

  constructor(baseUrl: string, token?: string) {
    this.baseUrl = baseUrl;
  }

  setTokenInHeaders = (headers: Headers) => {
    const token = sessionStorage.getItem("token");
    token && headers.set("Authorization", "Bearer " + token);
  };

  get = async (path: string, extraHeaders?: Headers): Promise<Response> => {
    let url = new URL(this.baseUrl + path);

    let headers: Headers = extraHeaders ? extraHeaders : new Headers();
    this.setTokenInHeaders(headers);

    return await fetch(url.toString(), {
      headers,
    });
  };
}

const getter = new Getter(process.env.REACT_APP_BASE_URL!);

export default getter;
