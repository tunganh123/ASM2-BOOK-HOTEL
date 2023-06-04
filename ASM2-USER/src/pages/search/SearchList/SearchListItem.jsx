import React from 'react';
import "./SearchListItem.css"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import statehotel from '../../../store/statehotel';
import { Fetchdataget as fetchdataget } from '../../../utils/fetchdata';
import { useSelector } from 'react-redux';
export default function SearchListItem({ dat }) {
    const navi = useNavigate()
    const dispatch = useDispatch()
    const action = statehotel.actions;
    const token = useSelector((state) => state.user).token
    const clickHandler = () => {
        const data = async () => {
            try {
                const a = await fetchdataget(`detailhotel/${dat._id}`, token)
                dispatch(action.getdetail(a))
                navi("/detail")
            } catch (error) {
                console.log(error)
            }
        }
        data()
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
