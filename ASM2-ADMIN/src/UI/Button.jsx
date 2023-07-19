import React from 'react'

export const Button = ({ children, onClick, sty, className }) => {
    return (
        <button onClick={onClick} style={{ fontWeight: "700", padding: "0.6rem 1rem ", color: "white", ...sty }} className={className}>{children}</button>
    )
}
