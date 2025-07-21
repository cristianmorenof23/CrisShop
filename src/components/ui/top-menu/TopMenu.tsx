"use client"
import { titleFont } from "@/app/config/fonts";
import { useCartStore } from "@/store/cart/cart-store";
import { useUIStore } from "@/ui/ui-store";
import Link from "next/link";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";
import { useEffect, useState } from 'react';



export default function TopMenu() {

  const openMenu = useUIStore(state => state.openSideMenu)
  const { getTotalItem } = useCartStore()

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <nav className="flex px-5 justify-between items-center w-full mt-4">
      {/* Logo       */}
      <div>
        <Link
          href="/"
        >
          <span className={` ${titleFont.className}  antialiased font-bold`}>Cris</span>
        </Link>
        <span>  Shop</span>
      </div>

      {/* Center Menu   */}

      <div className=" hidden sm:block">

        <Link
          href="/gender/men" className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">
          Hombres
        </Link>

        <Link
          href="/gender/women" className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">
          Mujeres
        </Link>

        <Link
          href="/gender/kid" className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">
          Niños
        </Link>
      </div>

      {/* Search, Card, Menu */}
      <div className="flex items-center">
        <Link
          className="mx-2"
          href="/search"
        >
          <IoSearchOutline className="w-5 h-5" />
        </Link>

        <Link
          className="mx-2"
          href={
            ((getTotalItem() === 0) && loaded) ? "/empty" : "/cart"
          }
        >
          <div className="relative">
            {
              (loaded && getTotalItem() > 0) && (
                <span className="fade-in jump absolute text-xs rounded-full px-1 font-bold -top-2 bg-blue-700 text-white -right-2">
                  {getTotalItem()}
                </span>
              ) 
            }

            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>

        <button className="m-2 p-2 rounded transition-all hover:bg-gray-100 hover:cursor-pointer" onClick={openMenu}>
          Menu
        </button>
      </div>

    </nav>
  )
}
