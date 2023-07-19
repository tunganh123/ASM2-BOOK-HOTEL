import React, { useState, useEffect, useRef } from 'react';
import HotelItem from './HotelItem';
import { useNavigate } from 'react-router-dom';
import { getCookie } from 'react-use-cookie';
import { Btndownload } from '../../UI/Btndownload';
import { Button } from '../../UI/Button';
import { DeleteHotelMutate, GetHotelService } from '../../services/services';
import Spinner from '../../UI/Spinner';
import Pagination from '../../UI/Pagination';
import { useSearchParams } from 'react-router-dom';
import { getPagination } from '../../utils/helper';
const Hotellist = () => {
    const tableRef = useRef(null);
    const admintoken = getCookie("tokenadmin")
    const navi = useNavigate()
    const [statehotellist, setstatehotellist] = useState()
    const { isError, isLoading, data } = GetHotelService(admintoken)
    useEffect(() => {
        setstatehotellist(data)
    }, [data])
    ///Pagination
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));
    const { currentData, PAGE_SIZE, startIndex } = getPagination(currentPage, statehotellist)
    const { mutate, isLoading: load } = DeleteHotelMutate()
    const clickdelete = (id) => {
        if (window.confirm('Are you sure you wish to delete this Hotel?')) {
            mutate({ token: admintoken, datapost: { id: id } })
        }
    }
    return (
        <>
            {
                (isLoading || load) && <Spinner />
            }
            {
                isError && !isLoading && <div>Some thing wrong!!!</div>
            }

            <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 >Hotels List</h2>
                <Button onClick={() => navi("/addnewhotel")} sty={{ color: " #00973f", border: "1px solid  #00973f" }}> Add new</Button>
            </div>
            <div>
                <table ref={tableRef} className="table table-striped table-bordered" >
                    <thead style={{ backgroundColor: "rgb(91, 177, 235)", color: "white" }}>
                        <tr>
                            <td >STT</td>
                            <td >ID</td>
                            <td >Name</td>
                            <td >Type</td>
                            <td >Title</td>
                            <td >City</td>
                            <td >Action</td>
                            <td >Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {statehotellist && currentData.map((item, i) => <HotelItem clickdelete={clickdelete} key={i} item={item} i={i + startIndex} />)
                        }
                    </tbody>
                </table>
            </div>
            <div>
                <Pagination count={statehotellist?.length} PAGE_SIZE={PAGE_SIZE} />
                <Btndownload filename="Hotels List" reftable={tableRef.current} clickdelete={clickdelete} />
            </div>
        </>
    )
}

export default Hotellist;