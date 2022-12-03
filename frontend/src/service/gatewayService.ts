import axios, {AxiosResponse} from "axios";

export enum HttpMethod {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE"
}

export class GatewayService {

  static url: string = 'http://localhost:8080'
  static token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlN2YxNDI0OC03MWM3LTQ5MGQtOWYzOC0yNDdiMjRmNzI4YWEiLCJpc3MiOiJ1c2VyLXNlcnZpY2UiLCJhdWQiOiJtcGNzNTEyMDUiLCJlbWFpbCI6Im1hdHRfQG1wY3MuY29tIiwibmFtZSI6Im1hdHQiLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwiaWF0IjoxNjY5NDA4MDk1LCJleHAiOjE2NzIwMDAwOTV9.j0_T0boKVL0MMpTmI_xSUfc3M25MoWqeo-Sdg9fVelQ"
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
    await req.then(resp => onSuccess(resp)).catch(onFailure())


  }
}
