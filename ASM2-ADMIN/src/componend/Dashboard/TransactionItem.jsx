import React from 'react'
import Table from '../../UI/Table'
export const TransactionItem = ({ item, count }) => {
    let startdate = new Date(item.dataStart)
    let enddate = new Date(item.dataEnd)
    return (
        <Table.Row>
            <div>{count}</div>
            <div>{item.user.userName}</div>
            <div>{item.hotel.name}</div>
            <div>{item.room.room.join(",")}</div>
            <div>{`${startdate.toLocaleDateString()} - ${enddate.toLocaleDateString()}`}</div>
            <div>${item.price}</div>
            <div>{item.payment}</div>
        </Table.Row>
    )
}