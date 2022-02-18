import React from 'react';

const Button = ({text, onClick, color = 'gray'}) => {
    return (
        <button className={`text-white rounded-lg bg-${color}-400 hover:bg-${color}-500 px-5 py-1 mr-1 duration-300`}>
        </button>
    )
}

export default Button;