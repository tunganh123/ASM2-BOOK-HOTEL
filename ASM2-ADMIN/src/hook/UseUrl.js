import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../services/services";
import { toast } from "react-hot-toast";
export const UseUrl = (url, token, method = "GET", datapost) => {
  const resquery = useQuery({
    queryKey: [url],
    queryFn: () => fetchData(url, token, method, datapost),
    onError: (error) => toast.error(error.message),
  });
  return resquery;
};
