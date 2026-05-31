//エラー表示

import React from 'react'

function ErrorMessage({message}) {
return (
    <div className='text-red-500 text-center'>
        <p>{message}</p>
    </div>
)
}

export default ErrorMessage