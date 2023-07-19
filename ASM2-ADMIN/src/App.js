import "./App.css";
import Home from "./componend/Dashboard/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Addnewhotel from "./componend/hotel/Addnewhotel";
import Hotellist from "./componend/hotel/Hotellist";
import Addnewroom from "./componend/room/Addnewroom";
import Roomlist from "./componend/room/Roomlist";
import Login from "./componend/Authentication/Login";
import Alltransaction from "./componend/transaction/Alltransaction";
import EditHotel from "./componend/hotel/EditHotel";
import EditRoom from "./componend/room/EditRoom";
import { AppLayOut } from "./layout/AppLayOut";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayOut />}>
              <Route index element={<Home />} />
              <Route path="/addnewhotel" element={<Addnewhotel />} />
              <Route path="/hotellist" element={<Hotellist />} />
              <Route path="/edithotel/:idhotel" element={<EditHotel />} />
              <Route path="/addnewroom" element={<Addnewroom />} />
              <Route path="/roomlist" element={<Roomlist />} />
              <Route path="/editroom/:idroom" element={<EditRoom />} />
              <Route path="/alltransaction" element={<Alltransaction />} />
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "3rem auto", marginLeft: "256px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 3000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "#18212f",
              color: "#e5e7eb",
            },
          }}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
