import React, { useState } from 'react'

const CaculatorSize = () => {
    const [height, setHeight] = useState<number>(0)
    const [weight, setWeight] = useState<number>(0)
    const [size, setSize] = useState<string>("")
    const handleSearchSize = () => {
        if (weight + height < 210) {
            setSize("size S")
        }
    }
    return (
        <div>
            <input onChange={(e) => setHeight(Number(e.target.value))} className='border border-1' type="text" placeholder='Nhập chiều cao' />
            <input onChange={(e) => setWeight(Number(e.target.value))} className='border border-1' type="text" placeholder='Nhập cân nặng' />
            <div>{size}</div>
            <button onClick={() => handleSearchSize()}>check</button>
        </div>
    )
}

export default CaculatorSize
