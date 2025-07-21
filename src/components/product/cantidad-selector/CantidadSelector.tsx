"use client"
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  cantidad: number

  onCantidadChange : (cantidad : number) => void
}


export default function CantidadSelector({ cantidad, onCantidadChange }: Props) {


  const handleIncrement = (value: number) => {
    if (cantidad + value < 1) {
      return;
    }
    onCantidadChange(cantidad + value);
  }


  return (
    <div className="flex">
      <button
        onClick={() => handleIncrement(- 1)}
      ><IoRemoveCircleOutline size={30} className="hover:cursor-pointer hover:scale-125 transition-all" /></button>
      <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded">{cantidad}</span>

      <button
        onClick={() => handleIncrement(+ 1)}
      ><IoAddCircleOutline size={30} className="hover:cursor-pointer hover:scale-125 transition-all" /></button>


    </div>
  )
}
