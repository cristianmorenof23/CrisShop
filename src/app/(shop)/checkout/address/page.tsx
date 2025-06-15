import Link from "next/link";
import Title from "@/components/ui/title/Title";

export default function AdressPage() {
  return (
    <>
      <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0 bg-white shadow-lg rounded-lg">



        <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">

          <Title title="Dirección" subtitle="Dirección de entrega" />

          <div className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">


            <div className="flex flex-col mb-2">
              <label htmlFor="nombres" >Nombres</label>
              <input
                id="nombres"
                type="text"
                className="p-2 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
              />
            </div>

            <div className="flex flex-col mb-2">
              <label htmlFor="apellidos">Apellidos</label>
              <input
                id="apellidos"
                type="text"
                className="p-2 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
              />
            </div>

            <div className="flex flex-col mb-2">
              <label htmlFor="direccion">Dirección</label>
              <input
                id="direccion"
                type="text"
                className="p-2 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
              />
            </div>

            <div className="flex flex-col mb-2">
              <label htmlFor="direcciondos">Dirección 2 (opcional)</label>
              <input
                id="direcciondos"
                type="text"
                className="p-2 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
              />
            </div>


            <div className="flex flex-col mb-2">
              <label htmlFor="codigopostal">Código postal</label>
              <input
                id="codigopostal"
                type="text"
                className="p-2 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
              />
            </div>

            <div className="flex flex-col mb-2">
              <label htmlFor="ciudad">Ciudad</label>
              <input
                id="ciudad"
                type="text"
                className="p-2 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
              />
            </div>

            <div className="flex flex-col mb-2">
              <label htmlFor="pais">País</label>
              <select
                id="pais"
                className="p-2 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
              >
                <option value="">[ Seleccione ]</option>
                <option value="CRI">Costa Rica</option>
                <option value="CRI">Argntina</option>
              </select>
            </div>

            <div className="flex flex-col mb-2">
              <label htmlFor="telefono">Teléfono</label>
              <input
                id="telefono"
                type="text"
                className="p-2 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
              />
            </div>



            <div className="flex flex-col mb-2 sm:mt-10">
              <Link
                href='/checkout'
                className="btn-primary flex w-full sm:w-1/2 justify-center ">
                Siguiente
              </Link>
            </div>


          </div>

        </div>




      </div>
    </>
  )
}
