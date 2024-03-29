import SearchPopup from "./SearchPopup/SearchPopup";
import SearchList from "./SearchList/SearchList";
import Footer from "../home/footer/Footer";
import "./Search.css"
import Navbar from "../home/navbar/Navbar";
const Search = () => {
  return (
    <>
      <Navbar />
      <div className="divpagesearch">
        <div className="pagesearch">
          <SearchPopup />
          <SearchList />
        </div>
      </div>
      <Footer />

    </>
  );
};

export default Search;
