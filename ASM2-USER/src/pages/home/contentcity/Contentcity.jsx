import React, { useEffect, useState } from 'react';
import CityItem from './CityItem';
import "./Contentcity.css"
import { useSelector } from 'react-redux';
import { getCookie } from "react-use-cookie"
import { Fetchdataget as fetchdataget } from '../../../utils/fetchdata';
export default function Contentcity() {
    const [statedatacity, setstatedatacity] = useState([])
    const token = getCookie("token")
    useEffect(() => {
        const fetchzz = async () => {
            try {
                const val = await fetchdataget("getcity", token)
                let c = val.map((item, i) => {
                    item.image = `./Cityimage/${i}.jpg`
                    return item
                })
                setstatedatacity(c)
            } catch (error) {
                console.log(error)
            }
        }
        fetchzz()
    }, [])
    return (
        <>
            <div className='divcontent'>
                <div className='contentcity'>
                    {/* //Duyệt mảng datacity, trả về danh sách componend CityItem, truyền các giá trị sang CityItem */}
                    {statedatacity.map((data, i) => <CityItem key={i} name={data.name} subText={data.subText} image={data.image} />)
                    }
                </div>
            </div>


        </>
    );
}
