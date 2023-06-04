import React from 'react';
import "./HoltelItem.css"
import { useContext, createContext, useState } from 'react';
import { stateapp } from '../../../App';
export const stateholtel = createContext();
export default function HoltelItem({ data }) {
    const [state, setstate] = useState("456");


    return (
        <>
            <stateholtel.Provider value={state}>
                <div className='holtelitem'>
                    <img className='imge' src={data.photos[0]} alt={""} />
                    <div className='cten'>
                        <a href="#" className='name'>{data.name}</a>
                        <div className='city'>{data.city}</div>
                        <div className='price'>Starting from ${data.cheapestPrice
                        }</div>
                    </div>
                </div>
            </stateholtel.Provider>
        </>
    );
}
