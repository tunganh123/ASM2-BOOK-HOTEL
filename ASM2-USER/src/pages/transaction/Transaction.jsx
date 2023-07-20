import React, { useState, useEffect } from 'react';
import Navbar from '../home/navbar/Navbar';
import { useSelector } from 'react-redux';
import { GetTransactionService } from '../../services/services';
import Spinner from '../../UI/Spinner';
import Pagination from '../../UI/Pagination';
import { useSearchParams } from 'react-router-dom';
import { getPagination } from '../../utils/helper';
import SpinnerMini from '../../UI/SpinnerMini';
const Transaction = () => {

    const user = useSelector((state) => state.user)
    const [statetransaction, settransaction] = useState()
    const { isError, isLoading, data } = GetTransactionService({ id: user.id })
    useEffect(() => {
        if (data) {
            settransaction(data)
        }
    }, [data])
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));
    const { currentData, PAGE_SIZE, startIndex } = getPagination(currentPage, statetransaction)
    return (
        <>

            <Navbar />
            <div style={{ margin: "0 30px" }}>
                <div style={{ margin: "3rem" }}>
                    <h2 style={{ marginBottom: "2rem" }}>Your Transactions</h2>
                    <table className="table table-striped table-bordered" >
                        <thead style={{ backgroundColor: "rgb(91, 177, 235)", color: "white" }}>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Hotel</th>
                                <th scope="col">Room</th>
                                <th scope="col">Date</th>
                                <th scope="col">Price</th>
                                <th scope="col">Payment Method</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                isLoading && <div style={{ display: "flex", justifyContent: "center" }}> <SpinnerMini /></div>
                            }
                            {
                                isError && !isLoading && <div style={{ textAlign: "center" }}>Some thing wrong!!!</div>
                            }
                            {
                                currentData && currentData.map((item, i) => {

                                    // convert date
                                    let timestart = new Date(item.dataStart);
                                    let timeend = new Date(item.dataEnd);
                                    let a = timestart.toLocaleDateString()
                                    let b = timeend.toLocaleDateString()
                                    return <tr key={i}>
                                        <th scope="row">{i + 1 + startIndex}</th>
                                        <td>{item.hotel.name}</td>
                                        <td>{item.room.room.join(",")}</td>
                                        <td>{`${a} - ${b}`}</td>
                                        <td>{item.price}</td>
                                        <td style={{ color: item.payment.includes("Đã thanh toán") ? "rgb(57, 202, 65)" : "" }}>{item.payment}</td>
                                        <td>{item.status}</td>
                                    </tr>
                                }

                                )
                            }
                        </tbody>

                    </table>
                    <Pagination count={statetransaction?.length} PAGE_SIZE={PAGE_SIZE} />
                </div>
            </div>
        </>
    )
}

export default Transaction;
