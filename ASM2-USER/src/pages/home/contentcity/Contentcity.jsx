import React, { useEffect, useState } from 'react';
import CityItem from './CityItem';
import "./Contentcity.css"
import { GetCityService } from '../../../services/services';
import SpinnerMini from '../../../UI/SpinnerMini';
export default function Contentcity() {
    const [statedatacity, setstatedatacity] = useState([])
    const { isError, isLoading, data } = GetCityService()
    useEffect(() => {
        if (data) {
            let c = data.map((item, i) => {
                item.image = `./Cityimage/${i}.jpg`
                return item
            })
            setstatedatacity(c)
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
                statedatacity &&
                <div className='divcontent'>
                    <div className='contentcity'>
                        {/* //Duyệt mảng datacity, trả về danh sách componend CityItem, truyền các giá trị sang CityItem */}
                        {statedatacity.map((data, i) => <CityItem key={i} name={data.name} subText={data.subText} image={data.image} />)
                        }
                    </div>
                </div>
            }



        </>
    );
}
