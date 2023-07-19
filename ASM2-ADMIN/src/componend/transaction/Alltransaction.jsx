import React, { useEffect, useState, useRef } from 'react';
import { getCookie } from 'react-use-cookie';
import { Btndownload } from '../../UI/Btndownload';
import { GetTransactionService } from '../../services/services';
import Spinner from '../../UI/Spinner';
import Pagination from '../../UI/Pagination';
import { useSearchParams } from 'react-router-dom';
import { getPagination } from '../../utils/helper';
const Alltransaction = () => {
    const tableref = useRef()
    const admintoken = getCookie("tokenadmin")
    const [statealltransaction, setalltransaction] = useState([])
    const { isError, isLoading, data } = GetTransactionService(admintoken)
    useEffect(() => {
        setalltransaction(data)
    }, [data])
    ///Pagination
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));
    const { currentData, PAGE_SIZE, startIndex } = getPagination(currentPage, statealltransaction)

    return (
        <>
            {
                (isLoading) && <Spinner />
            }
            {
                isError && !isLoading && <div>Some thing wrong!!!</div>
            }
            {statealltransaction &&
                <>
                    <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h2 >All Transaction</h2>

                    </div>
                    <div>
                        <table ref={tableref} className="table table-striped table-bordered" >
                            <thead style={{ backgroundColor: "rgb(91, 177, 235)", color: "white" }}>
                                <tr>
                                    <td >STT</td>
                                    <td >ID</td>
                                    <td >User</td>
                                    <td >Hotel</td>
                                    <td >Room</td>
                                    <td >Date</td>
                                    <td >Price</td>
                                    <td >Payment Method</td>
                                    <td >Status</td>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.map((item, i) => {
                                    let startdate = new Date(item.dataStart)
                                    let enddate = new Date(item.dataEnd)
                                    return <tr>
                                        <td >{startIndex + i + 1}</td>
                                        <td>{item._id}</td>
                                        <td>{item.user.userName}</td>
                                        <td>{item.hotel.name}</td>
                                        <td>{item.room.room.join(",")}</td>
                                        <td>{`${startdate.toLocaleDateString()} - ${enddate.toLocaleDateString()}`}</td>
                                        <td>{`$ ${item.price}`}</td>
                                        <td>{item.payment}</td>
                                        <td>{item.status}</td>
                                    </tr>
                                })
                                }
                            </tbody>
                        </table>

                    </div>
                    <div>
                        <Pagination count={statealltransaction.length} PAGE_SIZE={PAGE_SIZE} />
                        <Btndownload filename="All Transaction" reftable={tableref.current} />
                    </div>
                </>
            }
        </>
    )
}

export default Alltransaction;