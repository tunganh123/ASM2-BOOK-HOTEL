import "./Detail.css"
import Navbar from "../home/navbar/Navbar";
import Footer from "../home/footer/Footer";
import ContentForm from "../home/contentform/ContentForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Detail = () => {
  const navi = useNavigate()
  const hotel = useSelector((state) => state.statehotel)
  const datadetail = hotel.detail;

  return (
    <>
      <Navbar />
      <div className='divdetail'>
        <div className="detail">
          <div className="dt">
            <div className='book'>
              <h1>{datadetail.name}</h1>
              <button>Reserve or Book Now!</button>
            </div>
            {/* Lấy FontAwesomeIcon */}
            <p><FontAwesomeIcon icon="fa-solid fa-location-dot" /> {datadetail.address}</p>
            <p>Excellent location - {datadetail.distance}m from center</p>
            <p>Book a stay over ${datadetail.cheapestPrice} at this property {datadetail.featured ? "and get a free airport taxi" : ""} </p>
          </div>
          <div className="img">
            {/* Lấy danh sách img them đường dẫn từ danh sách datadetail.photo */}
            {
              datadetail.photos && datadetail.photos.map((imgd) =>
                <img src={imgd} alt="" />
              )
            }
          </div>
          <div className="staynow">
            <div className="title">
              <h2>{datadetail.title}</h2>
              <p>{datadetail.desc}</p>
            </div>
            <div className="night">
              <p style={{ fontSize: "2rem" }}><span>${datadetail.cheapestPrice}</span>(1 nights)</p>
              <button onClick={() => navi("/booking")}>Reserve or Book Now!</button>
            </div>
          </div>

        </div>
      </div>
      <ContentForm />
      <Footer />
    </>

  );
};

export default Detail;
