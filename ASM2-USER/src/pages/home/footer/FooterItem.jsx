import React from 'react';
import "./FooterItem.css"
export default function FooterItem(props) {
    return (
        <><div className='FooterItem'>
            {
                props.col_values.map((vl, i) => <div key={i}><a className='linka' href="#">{vl}</a><br /></div>)
            }
        </div>


        </>
    );
}
