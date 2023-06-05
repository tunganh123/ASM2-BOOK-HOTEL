import React, { useState } from 'react';
import "./SearchList.css"
import SearchListItem from './SearchListItem';
import { useSelector } from 'react-redux';


export default function SearchLists() {
    const hotel = useSelector((state) => state.statehotel)

    const arrfilter = hotel.arrsearch
    return (
        <>
            <div className='divsearchlist'>
                {
                    arrfilter.map((data, i) => <SearchListItem key={i} dat={data} />)
                }
            </div>

        </>
    );
}
