import React, { useEffect, useState, useRef } from 'react';
import { Fetchdataget, Fetchdata } from '../../utils/fetchdata';
import { useNavigate } from 'react-router-dom';
import RoomItem from './RoomItem';
import { getCookie } from 'react-use-cookie';
import { Btndownload } from '../../UI/Btndownload';
import { Button } from '../../UI/Button';
import { DeleteRoomMutate, GetRoomService } from '../../services/services';
import Spinner from '../../UI/Spinner';
import { useSearchParams } from 'react-router-dom';
import { getPagination } from '../../utils/helper';
import Pagination from '../../UI/Pagination';
const Roomlist = () => {
    const tableref = useRef()
    const admintoken = getCookie("tokenadmin")
    const navi = useNavigate()
    const [stateroomlist, setstateroomlist] = useState([])
    const { isError, isLoading, data } = GetRoomService(admintoken)
    const { mutate, isLoading: load } = DeleteRoomMutate()
    useEffect(() => {
        setstateroomlist(data)
    }, [data])
    ///Pagination
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));
    const { currentData, PAGE_SIZE, startIndex } = getPagination(currentPage, stateroomlist)


    const clickdelete = (id) => {
        if (window.confirm('Are you sure you wish to delete this Room?')) {
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
                <h2 >Rooms List</h2>
                <Button onClick={() => navi("/addnewroom")} sty={{ color: " #00973f", border: "1px solid  #00973f" }}> Add new</Button>
            </div>
            {
                stateroomlist &&
                <>
                    <div>
                        <table ref={tableref} className="table table-striped table-bordered" >
                            <thead style={{ backgroundColor: "rgb(91, 177, 235)", color: "white" }}>
                                <tr>
                                    <td >STT</td>
                                    <td >ID</td>
                                    <td >Title</td>
                                    <td >Description</td>
                                    <td >Price</td>
                                    <td >MaxPeople</td>
                                    <td >Action</td>
                                    <td >Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.map((item, i) => <RoomItem clickdelete={clickdelete} key={i} item={item} i={i + startIndex} />)
                                }
                            </tbody>
                        </table>

                    </div>
                    <div>
                        <Pagination count={stateroomlist.length} PAGE_SIZE={PAGE_SIZE} />
                        <Btndownload filename="Rooms List" reftable={tableref.current} />
                    </div>
                </>
            }

        </>
    )
}

export default Roomlist;