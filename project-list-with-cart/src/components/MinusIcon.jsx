import React from 'react'

const MinusIcon = ({ className, onClick }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="2"
        viewBox="0 0 10 2"
        className={className}
        onClick={onClick} 
    >
        <path
            d="M0 .375h10v1.25H0V.375Z"
            fill="#fff"
        />
    </svg>
)

export default MinusIcon