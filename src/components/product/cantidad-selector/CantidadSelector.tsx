"use client"
import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"

interface Props {
  cantidad: number
}


export default function CantidadSelector({ cantidad }: Props) {

  const [count, setCount] = useState(cantidad);

  const handleIncrement = (value: number) => {
    if (count + value < 1) {
      return;
    }
    setCount(count + value);
  }


  return (
    <div className="flex">
      <button
        onClick={() => handleIncrement(- 1)}
      ><IoRemoveCircleOutline size={30} className="hover:cursor-pointer hover:scale-125 transition-all" /></button>
      <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded">{count}</span>

      <button
        onClick={() => handleIncrement(+ 1)}
      ><IoAddCircleOutline size={30} className="hover:cursor-pointer hover:scale-125 transition-all" /></button>


    </div>
  )
}
