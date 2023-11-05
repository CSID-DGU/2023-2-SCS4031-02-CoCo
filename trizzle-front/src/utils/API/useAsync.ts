import axios, { AxiosError } from "axios";
import { useReducer, useEffect } from "react";
import { useCookies } from "react-cookie";


//api 호출 커스텀 훅 -> useAsync

type StateType<D = any> = {
  data: D | null;
  loading: boolean;
  error: Error | null;
};

type ActionType<D> = {
  type: string;
  data?: D;
  error?: AxiosError;
};

type Reducer<D = any> = (
  state: StateType<D>,
  action: ActionType<D>,
) => StateType<D>;

const reducer:Reducer = (state, action) => {
    switch(action.type){
        case "LOADING":
            return {
                loading: true,
                data: null,
                error: null
            };
        case "SUCCESS":
            return {
                loading: false,
                data: action.data,
                error: null
            };
        case "ERROR":
            return {
                loading: false,
                data: null,
                error: action.error as AxiosError
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

export type AsyncState<D> = [StateType<D>, (url?:string, method?:string, data?:any) => void];

export const useAsync = <D = any>({
  url = "",
  method = "GET",
  data = null,
}: {
  url: string;
  method?: string;
  data?: any;
}): AsyncState<D> => {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null
  });

  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

  const fetchData = async (url?: string, method?:string, data?:any) => {
  
    if (url === "") return;

    const token = cookies.access_token;
    console.log(token);
    dispatch({ type: "LOADING" });
    try {
      const response = await axios({
        method: method,
        url: url,
        data: data,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${token}`
        },
      });
      dispatch({ type: "SUCCESS", data: response.data });
    } catch (e:any) {
      dispatch({ type: "ERROR", error: e });
    }
  };
  
  useEffect(() => {
    fetchData(url, method, data);
  }, [url]);

  return [state, fetchData];
}