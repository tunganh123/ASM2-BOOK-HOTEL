import logo from "./logo.svg";
import "./App.css";
import Home from "./componend/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Addnewhotel from "./componend/hotel/Addnewhotel";
import Hotellist from "./componend/hotel/Hotellist";
import Addnewroom from "./componend/room/Addnewroom";
import Roomlist from "./componend/room/Roomlist";
import Login from "./componend/Login";
import Alltransaction from "./componend/Alltransaction";
import EditHotel from "./componend/hotel/EditHotel";
import EditRoom from "./componend/room/EditRoom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/addnewhotel" element={<Addnewhotel />} />
          <Route path="/hotellist" element={<Hotellist />} />
          <Route path="/edithotel/:idhotel" element={<EditHotel />} />
          <Route path="/addnewroom" element={<Addnewroom />} />
          <Route path="/roomlist" element={<Roomlist />} />
          <Route path="/editroom/:idroom" element={<EditRoom />} />
          <Route path="/alltransaction" element={<Alltransaction />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
