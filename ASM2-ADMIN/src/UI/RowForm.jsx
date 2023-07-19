import React from 'react'

export const RowForm = ({ children, outline = "row mb-4" }) => {
    return (
        <div className={outline}>
            {children}
        </div>
    )
}
export const ColForm = ({ children, tit }) => {
    return (
        <div className="col">
            <div className="form-outline">
                <label className="form-label" htmlFor="form6Example1">{tit}</label>
                {children}
            </div>
        </div>
    )
}
export const InputForm = (props) => {
    return (
        <input className="form-control" {...props} />
    )
}