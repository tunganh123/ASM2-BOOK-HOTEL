import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { UseUrl } from "../hook/UseUrl";
import { setCookie } from "react-use-cookie";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import stateadmin from "../store/stateadmin";
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
export const GetInfoBoardService = (token) => {
  return UseUrl("getinfoboard", token);
};
export const GetTransactionService = (token) => {
  return UseUrl("gettransaction", token);
};
export const GetHotelService = (token) => {
  return UseUrl("gethotellist", token);
};
export const GetDetailHotelService = (token, idhotel) => {
  return UseUrl(`getdetailhotel/${idhotel}`, token);
};
export const GetRoomService = (token) => {
  return UseUrl("getroomlist", token);
};
export const GetDetailRoomService = (token, idroom) => {
  return UseUrl(`getdetailroom/${idroom}`, token);
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
  // Lấy các hàm action từ Statelogin
  const action = stateadmin.actions;
  const { mutate, data, isLoading } = useMutation({
    mutationFn: (datapost) => fetchData("adminlogin", "x", "POST", datapost),
    onSuccess: async (b) => {
      toast.success("SUCCESS LOGIN");
      setCookie("tokenadmin", b.token);
      const value = jwt_decode(b.token);
      let dataadmin = {
        email: value.email,
        token: b.token,
      };
      dispatch(action.updateadmin(dataadmin));
      navi("/");
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutate, data, isLoading };
};
export const AddHotelMutate = () => {
  const navi = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ token, datapost }) =>
      fetchData("addnewhotel", token, "POST", datapost),
    onSuccess: async () => {
      toast.success("SUCCESS Add New Hotel");
      await queryClient.refetchQueries({ queryKey: ["gethotellist"] });
      navi("/hotellist");
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutate, isLoading };
};
export const EditHotelMutate = () => {
  // Access the client
  const navi = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ token, datapost }) =>
      fetchData("editdetailhotel", token, "POST", datapost),
    onSuccess: async () => {
      toast.success("SUCCESS Edit Hotel");
      await queryClient.refetchQueries({ queryKey: ["gethotellist"] });
      navi("/hotellist");
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutate, isLoading };
};
export const DeleteRoomMutate = () => {
  // Access the client
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ token, datapost }) =>
      fetchData("deleteroom", token, "POST", datapost),
    onSuccess: () => {
      toast.success("SUCCESS Delete Room");
      queryClient.invalidateQueries({ queryKey: ["getroomlist"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutate, isLoading };
};
export const AddRoomMutate = () => {
  const navi = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ token, datapost }) =>
      fetchData("addnewroom", token, "POST", datapost),
    onSuccess: async () => {
      toast.success("SUCCESS Add New Room");
      await queryClient.refetchQueries({ queryKey: ["getroomlist"] });
      navi("/roomlist");
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutate, isLoading };
};
export const EditRoomMutate = () => {
  // Access the client
  const navi = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ token, datapost }) =>
      fetchData("editdetailroom", token, "POST", datapost),
    onSuccess: async () => {
      toast.success("SUCCESS Edit Room");
      await queryClient.refetchQueries({ queryKey: ["getroomlist"] });
      navi("/roomlist");
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutate, isLoading };
};
