import React, { useEffect, useState } from 'react';
import "./Contenttype.css"
import TypeItem from "./TypeItem"
import { Fetchdataget as fetchdataget } from '../../../utils/fetchdata';
import { useSelector } from 'react-redux';
import { getCookie } from "react-use-cookie"
export default function Contenttype() {
    const token = getCookie("token")
    const [statedatatype, setstatedatatype] = useState([])
    useEffect(() => {
        fetchdataget("gethotel", token).then(
            (res) => {
                let reshotel = res.filter((item) => item.type == "hotel")
                let resapartment = res.filter((item) => item.type == "apartment")
                let resresort = res.filter((item) => item.type == "resort")
                let resvilla = res.filter((item) => item.type == "villa")
                let rescabin = res.filter((item) => item.type == "cabin")
                let data = [
                    { "name": "Hotels", "count": `${reshotel.length}` },
                    { "name": "Apartments", "count": `${resapartment.length}` },
                    { "name": "Resorts", "count": `${resresort.length}` },
                    { "name": "Villas", "count": `${resvilla.length}` },
                    { "name": "Cabins", "count": `${rescabin.length}` }
                ]
                const dataok = data.map((dat, i) => {
                    dat.image = `./images/type_${i + 1}.jpg`
                    if (dat.name == "Hotels") {
                        dat.image = `./images/type_1.webp`
                    }
                    return dat
                })
                setstatedatatype(dataok)
            }
        ).catch((err) => console.log(err))
    }, [])

    return (
        <>
            <div className='divcontenttype'>
                <h2>Browse by property type</h2>
                <div className='contenttype'>
                    {
                        // Duyệt danh sách data trả về danh sách componend TypeItem
                        statedatatype.map((data, i) => <TypeItem key={i} name={data.name} count={data.count} image={data.image} />)
                    }
                </div>
            </div>
        </>
    );
}
