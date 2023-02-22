import data from "./dev-config";

// Getter defines an interface for getting key value data
export interface Getter {
  get(path: string, extraHeaders?: Headers): Promise<string>
}

// RemoteGetter requests data from BASE_URL provided by env var.
class RemoteGetter {
  baseUrl: string;

  constructor(baseUrl: string, token?: string) {
    this.baseUrl = baseUrl;
  }

  private setTokenInHeaders = (headers: Headers) => {
    const token = sessionStorage.getItem("token");
    token && headers.set("Authorization", "Bearer " + token);
  };

  get = async (path: string, extraHeaders?: Headers): Promise<string> => {
    let url = new URL(this.baseUrl + path);

    let headers: Headers = extraHeaders ? extraHeaders : new Headers();
    this.setTokenInHeaders(headers);

    const response = await fetch(url.toString(), {
      headers,
    });

    return await response.text();
  };
}

// LocalGetter requests data from browser's sessionStorage
class LocalGetter {
  prefix = "keyvalue";

  constructor() {
    const keys = Object.keys(data);
    const d = data as any;
    keys.forEach((key) => {
        const v = d[key];
        const serialized = typeof v === "string" ? v : JSON.stringify(v);
        sessionStorage.setItem(this.prefix+key, serialized);
    });
  }

  get = async (path: string, extraHeaders?: Headers): Promise<string> => {

    let sanePath = path;
    if (sanePath.startsWith(process.env.REACT_APP_BLOCK_URL_PATH!)) {
        sanePath = sanePath.slice(process.env.REACT_APP_BLOCK_URL_PATH!.length);
    }

    const value = sessionStorage.getItem(this.prefix+sanePath);
    if (value == null) {
      throw new Error(`path ${sanePath} not found`);
    }
    return value;
  }
}

const getter: Getter = process.env.REACT_APP_BASE_URL ?
  new RemoteGetter(process.env.REACT_APP_BASE_URL) :
  new LocalGetter();
;

export default getter;
