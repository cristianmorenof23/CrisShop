import { Size } from "@/interfaces/product.interface"
import clsx from "clsx"

interface Props {
  selectedSize?: Size
  availabeSizes: Size[]

  onSizeChanged: (size: Size) => void
}


export default function SideSelector({ selectedSize, availabeSizes, onSizeChanged }: Props) {



  return (
    <>
      <div className="my-5">
        <h3 className="font-bold mb-4">Tallas Disponibles</h3>


        <div className="flex">

          {
            availabeSizes.map(size => (
              <button onClick={() => onSizeChanged(size)} className={clsx("mx-2 hover:underline text-lg hover:cursor-pointer", { 'underline': size === selectedSize })} key={size}> {size} </button>
            ))
          }

        </div>



      </div>
    </>
  )
}
