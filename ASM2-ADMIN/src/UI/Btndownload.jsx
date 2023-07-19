import React from 'react'
import { useDownloadExcel } from 'react-export-table-to-excel';
import { Button } from './Button';
export const Btndownload = ({ reftable, filename }) => {
    const { onDownload } = useDownloadExcel({
        currentTableRef: reftable,
        filename: `${filename} table`,
        sheet: `${filename}`
    })
    return (
        <Button onClick={onDownload} sty={{ width: "10rem", color: " #00973f", border: "1px solid  #00973f" }}> Export excel </Button>
    )
}
