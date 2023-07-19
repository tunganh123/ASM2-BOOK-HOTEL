import React, { useEffect, useState } from 'react';
import "./Contenttype.css"
import TypeItem from "./TypeItem"
import { GetHotelService } from '../../../services/services';
import SpinnerMini from '../../../UI/SpinnerMini';
export default function Contenttype() {
    const [statedatatype, setstatedatatype] = useState([])
    const { isError, isLoading, data } = GetHotelService()
    useEffect(() => {
        if (data) {
            let reshotel = data.filter((item) => item.type == "hotel")
            let resapartment = data.filter((item) => item.type == "apartment")
            let resresort = data.filter((item) => item.type == "resort")
            let resvilla = data.filter((item) => item.type == "villa")
            let rescabin = data.filter((item) => item.type == "cabin")
            let dat = [
                { "name": "Hotels", "count": `${reshotel.length}` },
                { "name": "Apartments", "count": `${resapartment.length}` },
                { "name": "Resorts", "count": `${resresort.length}` },
                { "name": "Villas", "count": `${resvilla.length}` },
                { "name": "Cabins", "count": `${rescabin.length}` }
            ]
            const dataok = dat.map((da, i) => {
                da.image = `./images/type_${i + 1}.jpg`
                if (da.name == "Hotels") {
                    da.image = `./images/type_1.webp`
                }
                return da
            })
            setstatedatatype(dataok)
        }
    }, [data])

    return (
        <>

            {
                isLoading && <SpinnerMini />
            }
            {
                isError && !isLoading && <div>Some thing wrong!!!</div>
            }
            {
                statedatatype &&
                <div className='divcontenttype'>
                    <h2>Browse by property type</h2>
                    <div className='contenttype'>
                        {
                            // Duyệt danh sách data trả về danh sách componend TypeItem
                            statedatatype.map((data, i) => <TypeItem key={i} name={data.name} count={data.count} image={data.image} />)
                        }
                    </div>
                </div>
            }
        </>
    );
}
