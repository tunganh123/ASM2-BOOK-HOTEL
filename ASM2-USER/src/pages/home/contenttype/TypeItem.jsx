import React, { createContext } from 'react';
import "./TypeItem.css"
import { useState } from 'react';
export const statetype = createContext()
function TypeItem(props) {
    const [state1, set1] = useState("31")

    return (

        <statetype.Provider value={state1}>
            <div className='typeitem'>
                <img className='imge' src={props.image} alt={props.image} />
                <div className='cten'>
                    <div className='name'>{props.name}</div>
                    <div className='word'>{props.count} hotels</div>
                </div>
            </div>
        </statetype.Provider>

    );
}
export default TypeItem
