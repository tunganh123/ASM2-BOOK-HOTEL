import React from 'react'

export const Button = ({ children, onClick, sty, className }) => {
    return (
        <button onClick={onClick} style={{ padding: "0.5rem", fontWeight: "700", backgroundColor: "rgb(91, 177, 235)", color: "white", ...sty }} className="btn">{children}</button>
    )
}
