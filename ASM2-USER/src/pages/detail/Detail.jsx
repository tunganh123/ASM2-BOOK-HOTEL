import "./Detail.css"
import Navbar from "../home/navbar/Navbar";
import Footer from "../home/footer/Footer";
import ContentForm from "../home/contentform/ContentForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../UI/Button";
import { GetDetailHotelService } from "../../services/services";
import { useState, useEffect } from "react";
import Spinner from "../../UI/Spinner";
import SpinnerMini from "../../UI/SpinnerMini";
const Detail = () => {
  const navi = useNavigate()
  const idhotel = useParams().idhotel
  const [statedetail, setdetail] = useState()
  const { isError, isLoading, data } = GetDetailHotelService(idhotel)
  useEffect(() => {
    if (data) {
      setdetail(data)
    }
  }, [data])

  return (
    <>
      {
        isLoading && <SpinnerMini />
      }
      {
        isError && !isLoading && <div>Some thing wrong!!!</div>
      }
      {
        !isError && !isLoading && statedetail &&
        <>
          <Navbar />
          <div className='divdetail'>
            <div className="detail">
              <div className="dt">
                <div className='book'>
                  <h1>{statedetail.name}</h1>
                  <Button>Reserve or Book Now!</Button>
                </div>
                {/* Lấy FontAwesomeIcon */}
                <p><FontAwesomeIcon icon="fa-solid fa-location-dot" /> {statedetail.address}</p>
                <p>Excellent location - {statedetail.distance}m from center</p>
                <p>Book a stay over ${statedetail.cheapestPrice} at this property {statedetail.featured ? "and get a free airport taxi" : ""} </p>
              </div>
              <div className="img">
                {/* Lấy danh sách img them đường dẫn từ danh sách datadetail.photo */}
                {
                  statedetail.photos && statedetail.photos.map((imgd) =>
                    <img src={imgd} alt="" />
                  )
                }
              </div>
              <div className="staynow">
                <div className="title">
                  <h2>{statedetail.title}</h2>
                  <p>{statedetail.desc}</p>
                </div>
                <div className="night">
                  <p style={{ fontSize: "2rem" }}><span>${statedetail.cheapestPrice}</span>(1 nights)</p>
                  <Button onClick={() => navi(`/booking/${idhotel}`)}>Reserve or Book Now!</Button>
                </div>
              </div>

            </div>
          </div>
          <ContentForm />
          <Footer />
        </>
      }
    </>

  );
};

export default Detail;
