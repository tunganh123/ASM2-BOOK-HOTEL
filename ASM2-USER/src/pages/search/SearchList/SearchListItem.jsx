import React from 'react';
import "./SearchListItem.css"
import { useNavigate } from 'react-router-dom';
export default function SearchListItem({ dat }) {
    const navi = useNavigate()
    const clickHandler = () => {
        navi(`/detail/${dat._id}`)

    }
    return (
        <>
            <div className='divsearchlistitem'>
                <div >
                    <img src={dat.photos[0]} alt="" />
                </div>
                <div className='info'>
                    <h2>{dat.name}</h2>
                    <p>{dat.distance} from center</p>
                    <span className='tagg'>{dat.tag}</span>
                    <p className='description'>{dat.desc}</p>
                    <p>{dat.type}</p>
                    <p className='check one'>{dat.featured ? "Free cancellation" : ""}</p>
                    <p className='check'>{dat.free_cancel ? "You can cancel later, so lock in this great price today!" : ""}</p>
                </div>
                <div className='pricerate'>
                    <div className='rate'>
                        <span >{dat.rating}</span>
                    </div>
                    <div>
                        <div className='price'>${dat.cheapestPrice}</div>
                        <p>includes taxes and fees</p>
                        <button onClick={clickHandler}>See availability</button>
                    </div>


                </div>
            </div>
        </>
    );
}
