import React from 'react';
import "./CityItem.css"

export default function CityItem(props) {
    return (
        <>
            <div className='cityitem'>
                <img className='imge' src={props.image} alt={props.image} />
                <div className='cten'>
                    <div className='name'>{props.name}</div>
                    <div className='word'>{props.subText}</div>
                </div>
            </div>


        </>
    );
}
