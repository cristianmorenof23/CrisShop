"use client"
import { generatePagination } from '@/utils/generatePaginationNumbers'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { IoChevronBack, IoChevronForwardOutline } from 'react-icons/io5'


interface Props {
  totalPages: number
}


export default function Pagination({ totalPages }: Props) {

  const pathName = usePathname()
  const searchParams = useSearchParams()
  const currenPage = Number(searchParams.get('page') ? searchParams.get('page') : 1) || 1

  const allPages = generatePagination(currenPage, totalPages)

  const crearPageUrl = (pageNumber: number | string) => {

    const params = new URLSearchParams(searchParams)

    if (pageNumber === '...') {
      return `${pathName}?${params.toString()}`
    }

    if (+pageNumber <= 0) {
      return `${pathName}`
    }

    if (+pageNumber > totalPages) {
      return `${pathName}?${params.toString()}`
    }

    params.set('page', pageNumber.toString())
    return `${pathName}?${params.toString()}`

  }

  return (
    <>
      <div className="flex text-center mt-10 mb-32 items-center justify-center">
        <nav aria-label="Page navigation example">
          <ul className="flex list-style-none">
            <li className="page-item">
              <Link
                className={`page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded
      ${currenPage <= 1
                    ? "pointer-events-none text-gray-400"
                    : "text-gray-800 hover:text-gray-800 hover:bg-gray-200"
                  }`}
                href={crearPageUrl(currenPage - 1)}
              >
                <IoChevronBack size={30} />
              </Link>
            </li>



            {
              allPages.map((page, index) => (
                <li className="page-item" key={page + '-' + index}>
                  <Link
                    className={clsx(
                      "page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded focus:shadow-none",
                      page === currenPage
                        ? "bg-blue-500 shadow-md text-white hover:bg-blue7400"
                        : "bg-transparent text-gray-800 hover:text-gray-800 hover:bg-gray-200"
                    )}
                    href={crearPageUrl(page)}
                  >
                    {page}
                  </Link>
                </li>

              ))
            }


            <li className="page-item">
              <Link
                className={`page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded
      ${currenPage >= totalPages
                    ? "pointer-events-none text-gray-400"
                    : "text-gray-800 hover:text-gray-800 hover:bg-gray-200"
                  }`}
                href={crearPageUrl(currenPage + 1)}
              >
                <IoChevronForwardOutline size={30} />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}
