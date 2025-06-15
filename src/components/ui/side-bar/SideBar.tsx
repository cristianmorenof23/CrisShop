"use client"
import { useUIStore } from "@/ui/ui-store";
import clsx from "clsx";
import Link from "next/link";
import { IoCloseOutline, IoLogIn, IoLogOutOutline, IoPeopleOutline, IoPersonAddOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5";



export default function SideBar() {


  const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen)
  const closeMenu = useUIStore(state => state.closeSideMenu)

  return (
    <>
      <div>
        {/* Background black */}
        {
          isSideMenuOpen && (
            <div className="fixed top-0 w-screen left-0 h-screen z-10 bg-black opacity-30" />
          )
        }

        {/* Bluer */}
        {
          isSideMenuOpen && (
            <div
              onClick={() => closeMenu()}
              className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
            />
          )
        }

        {/* Sidemenu */}
        <nav

          className={
            clsx(
              "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
              {
                "translate-x-full": !isSideMenuOpen
              }
            )
          }>

          <IoCloseOutline
            size={30}
            className="absolute top-5 right-5 cursor-pointer hover:scale-125 transition-all"
            onClick={() => closeMenu()}
          />

          {/* Input busqueda */}
          <div className="relative mt-14">
            <IoSearchOutline
              size={30}
              className="absolute top-2 left-2 hover:cursor-pointer"
            />
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500 transition-all hover:border-blue-500 focus:shadow-md"
            />
          </div>

          {/* Menu opciones */}
          <Link
            href="/"
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
          >
            <IoPersonAddOutline size={25} />
            <span className="ml-3 text-xl">Perfil</span>
          </Link>

          <Link
            href="/"
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
          >
            <IoTicketOutline size={25} />
            <span className="ml-3 text-xl">Ordenes</span>
          </Link>

          <Link
            href="/"
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
          >
            <IoLogIn size={25} />
            <span className="ml-3 text-xl">Ingresar</span>
          </Link>

          <Link
            href="/"
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
          >
            <IoLogOutOutline size={25} />
            <span className="ml-3 text-xl">Salir</span>
          </Link>

          {/* Line separator */}
          <div className="w-full h-px  bg-gray-300 my-10" />


          <Link
            href="/"
            className="flex items-center mt-4 p-2 hover:bg-gray-100 rounded transition-all"
          >
            <IoShirtOutline size={25} />
            <span className="ml-3 text-xl">Productos</span>
          </Link>

          <Link
            href="/"
            className="flex items-center mt-4 p-2 hover:bg-gray-100 rounded transition-all"
          >
            <IoTicketOutline size={25} />
            <span className="ml-3 text-xl">Ordenes</span>
          </Link>

          <Link
            href="/"
            className="flex items-center mt-4 p-2 hover:bg-gray-100 rounded transition-all"
          >
            <IoPeopleOutline size={25} />
            <span className="ml-3 text-xl">Usuarios</span>
          </Link>


        </nav>
      </div>
    </>
  )
}
