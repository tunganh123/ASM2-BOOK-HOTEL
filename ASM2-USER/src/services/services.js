import { QueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { UseUrl } from "../hook/UseUrl";
import { setCookie } from "react-use-cookie";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import user from "../store/user";
import statehotel from "../store/statehotel";
export const fetchData = async (url, token, method = "GET", datapost) => {
  const a = await fetch(`${process.env.REACT_APP_URL_FETCH}/` + url, {
    method: method,
    credentials: "include", // tao cookie phia client
    withCredentials: true, // gui cookie len server
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datapost),
  });
  const b = await a.json();
  if (b?.err) {
    throw new Error(b.err);
  }
  return b;
};
export const GetCityService = () => {
  return UseUrl("getcity", "a");
};
export const GetHotelService = () => {
  return UseUrl("gethotel", "a");
};
export const GetRoomService = (datapost) => {
  return UseUrl("getroom", "a", "POST", datapost);
};
export const GetDetailHotelService = (idhotel) => {
  return UseUrl(`detailhotel/${idhotel}`, "a");
};
export const GetTransactionService = (datapost) => {
  return UseUrl(`gettransaction`, "a", "POST", datapost);
};
/////////////////////////////
export const DeleteHotelMutate = () => {
  // Access the client
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ token, datapost }) =>
      fetchData("deletehotel", token, "POST", datapost),
    onSuccess: () => {
      toast.success("SUCCESS Delete Hotel");
      queryClient.invalidateQueries({ queryKey: ["gethotellist"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutate, isLoading };
};
export const LoginMutate = () => {
  // Khai báo dispatch
  const dispatch = useDispatch();
  const navi = useNavigate();
  const action = user.actions;
  const { mutate, data, isLoading } = useMutation({
    mutationFn: (datapost) => fetchData("login", "x", "POST", datapost),
    onSuccess: async (b) => {
      toast.success("SUCCESS LOGIN");
      setCookie("token", b.token);
      const value = jwt_decode(b.token);
      dispatch(
        action.updateuser({
          ...value,
          token: b.token,
        })
      );
      navi("/");
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutate, data, isLoading };
};
export const SignupMutate = () => {
  const navi = useNavigate();
  const { mutate, data, isLoading } = useMutation({
    mutationFn: (datapost) => fetchData("register", "x", "POST", datapost),
    onSuccess: async (b) => {
      toast.success("SUCCESS Register");
      navi("/login");
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutate, data, isLoading };
};
export const SearchHotelMutate = () => {
  const navi = useNavigate();
  const dispatch = useDispatch();
  const action = statehotel.actions;
  const { mutate, data, isLoading } = useMutation({
    mutationFn: async (datapost) => {
      const a = await fetch(
        `${process.env.REACT_APP_URL_FETCH}/` + "searchhotel",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datapost),
        }
      );
      const b = await a.json();
      if (b?.err) {
        throw new Error(b.err);
      }
      return { b, datapost };
    },
    onSuccess: async ({ b, datapost }) => {
      dispatch(action.getarrsearch(b));
      dispatch(action.settimerange(datapost?.time));
      navi(
        `/search?location=${datapost?.location}&timestart=${
          datapost?.time?.startDate ? datapost?.time?.startDate : ""
        }&timeend=${
          datapost?.time?.endDate ? datapost?.time?.endDate : ""
        }&adult=${datapost?.count?.adult}&children=${
          datapost?.count?.children
        }&room=${datapost?.count?.room}`
      );
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutate, data, isLoading };
};
export const SearchPopupMutate = () => {
  const dispatch = useDispatch();
  const action = statehotel.actions;
  const { mutate, data, isLoading } = useMutation({
    mutationFn: (datapost) => fetchData("searchhotel", "x", "POST", datapost),
    onSuccess: async (b) => {
      dispatch(action.getarrsearch(b));
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutate, data, isLoading };
};
export const QueryRoomMutate = () => {
  const { mutate, data, isLoading } = useMutation({
    mutationFn: (datapost) => fetchData("queryroom", "x", "POST", datapost),
    onSuccess: async (b) => {},
    onError: (err) => toast.error(err.message),
  });
  return { mutate, data, isLoading };
};
export const TransactionMutate = () => {
  // Access the client
  const queryClient = useQueryClient();
  const navi = useNavigate();
  const { mutate, data, isLoading } = useMutation({
    mutationFn: (datapost) => fetchData("transaction", "x", "POST", datapost),
    onSuccess: async (b) => {
      toast.success("Đặt phòng thành công");
      await queryClient.refetchQueries("gettransaction");
      navi("/transaction");
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutate, data, isLoading };
};
