import React, { useState, useEffect } from 'react';
import "./Contenthotel.css"
import HoltelItem from './HoltelItem';
import { Fetchdataget as fetchdataget } from '../../../utils/fetchdata';
import { useSelector } from 'react-redux';
export default function Contenthotel() {
    const [statedatarating, setstatedatarating] = useState([])
    const token = useSelector((state) => state.user).token
    useEffect(() => {
        const fetchdat = async () => {
            try {
                const res = await fetchdataget("gethotel", token);
                // sort max-> min by rating
                const data = res.sort((a, b) => {
                    return a.rating > b.rating ? -1 : 1
                })
                // slice 3 item
                const dataslice = data.slice(0, 3);
                setstatedatarating(dataslice)
            } catch (error) {
                console.log(error)
            }
        }
        fetchdat()
    }, [])
    return (
        <>

            <div className='divcontentholtel'>
                <h2>Homes guests love</h2>
                <div className='contentholtel'>
                    {/* Duyệt mảng dataHotel trả về ds HotelItem, truyền các giá trị qua HoltelItem */}
                    {statedatarating.map((data, i) =>
                        <HoltelItem key={i} data={data} />)
                    }
                </div>
            </div>
        </>
    );
}
