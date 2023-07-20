import React, { useState, useEffect } from 'react';
import "./Contenthotel.css"
import HoltelItem from './HoltelItem';
import { GetHotelService } from '../../../services/services';
import SpinnerMini from '../../../UI/SpinnerMini';
export default function Contenthotel() {
    const [statedatarating, setstatedatarating] = useState([])
    const { isError, isLoading, data } = GetHotelService()
    useEffect(() => {
        if (data) {
            const dat = data.sort((a, b) => {
                return a.rating > b.rating ? -1 : 1
            })
            // slice 3 item
            const dataslice = dat.slice(0, 3);
            setstatedatarating(dataslice)
        }
    }, [data])
    return (
        <>
            {
                isLoading && <div style={{ display: "flex", justifyContent: "center" }}> <SpinnerMini /></div>
            }
            {
                isError && !isLoading && <div style={{ textAlign: "center" }}>Some thing wrong!!!</div>
            }
            {
                statedatarating &&
                <div className='divcontentholtel'>
                    <h2>Homes guests love</h2>
                    <div className='contentholtel'>
                        {/* Duyệt mảng dataHotel trả về ds HotelItem, truyền các giá trị qua HoltelItem */}
                        {statedatarating.map((data, i) =>
                            <HoltelItem key={i} data={data} />)
                        }
                    </div>
                </div>
            }
        </>
    );
}
