import { useAsync } from "./useAsync";



export function postPlan(data:any) {
  const url = `${import.meta.env.VITE_API_URL}/plans`;
  const [state, fetchDaata] = useAsync({url, method:"POST", data});

  return state;
};

