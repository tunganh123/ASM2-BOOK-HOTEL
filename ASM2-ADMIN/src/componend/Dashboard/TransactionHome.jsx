import React from 'react'
import Table from '../../UI/Table'
import { TransactionItem } from './TransactionItem'
import Pagination from '../../UI/Pagination'
import { useSearchParams } from "react-router-dom";
import { getPagination } from "../../utils/helper.js"
export const TransactionHome = ({ transaction }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));
    const { currentData, PAGE_SIZE, startIndex } = getPagination(currentPage, transaction)
    return (
        <>
            <Table columns="0.6fr 1fr 2.2fr 1fr 1fr 1fr 2fr">
                <Table.Header>
                    <div>STT</div>
                    <div>User</div>
                    <div>Hotel</div>
                    <div>Room</div>
                    <div>Date</div>
                    <div>Price</div>
                    <div>Payment Method</div>
                </Table.Header>

                <>
                    <Table.Body
                        data={currentData}
                        render={(item, i) => <TransactionItem item={item} key={i} count={startIndex + 1 + i} />}
                    />
                    <Table.Footer>
                        <Pagination count={transaction?.length} PAGE_SIZE={PAGE_SIZE} />
                    </Table.Footer>
                </>

            </Table>
        </>
    )
}
