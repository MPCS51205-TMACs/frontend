import axios, {AxiosResponse} from "axios";

export enum HttpMethod {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE"
}

export class GatewayService {

  static url: string = '/api'
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
    let authorization = {headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}}
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

    console.log({url: url, auth: authorization, body: body, method: method})
    await req.then(resp => onSuccess(resp)).catch(onCatch)


  }
}
