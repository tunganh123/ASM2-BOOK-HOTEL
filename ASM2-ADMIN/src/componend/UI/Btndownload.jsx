import React from 'react'
import { useDownloadExcel } from 'react-export-table-to-excel';
export const Btndownload = ({ reftable, filename }) => {
    const { onDownload } = useDownloadExcel({
        currentTableRef: reftable,
        filename: `${filename} table`,
        sheet: `${filename}`
    })
    return (
        <button onClick={onDownload} style={{ fontWeight: "700", height: "auto", color: " #00973f", border: "1px solid  #00973f" }}> Export excel </button>
    )
}
