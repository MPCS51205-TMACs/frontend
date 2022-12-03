import axios, {AxiosResponse} from "axios";

export enum HttpMethod {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE"
}

export class GatewayService {

  static url: string = '/api'
  static token: string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4MGY1MjQxYi05ZjM1LTRhMzItYjE4Ni02NTViY2Y2ZjQ5ZmQiLCJhdWQiOiJtcGNzNTEyMDUiLCJyZXZvY2F0aW9uSWQiOiIxZTc2NTg1Mi05NWE2LTQ4MjUtOWZmZi0wMzgwNGZlNTA4ODkiLCJpc3MiOiJ1c2VyLXNlcnZpY2UiLCJuYW1lIjoibWF0dCIsImV4cCI6MTY3MDEzMDQzNiwiaWF0IjoxNjcwMDg3MjM2LCJlbWFpbCI6Im1hdHRAbXBjcy5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiLCJST0xFX0FETUlOIl19.zHxshygIKyBWJQGXWlKV1dDo4r8PJwnWKSBPhVAbw1Q"
  static defaultFunction: CallableFunction = () => {
  }

  static async sendRequest(
    method: HttpMethod,
    endpoint: string,
    query: string = "",
    onSuccess: Function = this.defaultFunction,
    onFailure: Function = this.defaultFunction,
    body: object | null = null
  ) {
    let url = `${(GatewayService.url)}/${endpoint}?${query}`
    // TODO: remove default token
    let authorization = {headers: {'Authorization': `Bearer ${localStorage.getItem("token") ? localStorage.getItem("token") : this.token}`}}
    let req: Promise<AxiosResponse>
    switch (method) {
      case HttpMethod.DELETE:
        req = axios.delete(url, authorization)
        break
      case HttpMethod.GET:
        req = axios.get(url, authorization)
        break
      case HttpMethod.POST:
        req = axios.post(url, body, authorization)
        break
      case HttpMethod.PUT:
        req = axios.put(url, body, authorization)
        break
    }

    const onCatch = (e)=>{
      alert(e)
      onFailure()
    }
    await req.then(resp => onSuccess(resp)).catch(onCatch)


  }
}
