'use client'
import Link from "next/link"
import clsx from "clsx"
import { IoCloseOutline, IoLogIn, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5"
import { useSession } from "next-auth/react"

import { usUIStore } from "@/store"
import { logout } from "@/actions"

export const Sidebar = () => {

    const isSideMenuOpen = usUIStore(state => state.isSideMenuOpen);
    const closeSideMenu = usUIStore(state => state.closeSideMenu);


    const { data: session  } = useSession();
    const isAuthenticated = !!session?.user;
    const isAdmin = session?.user?.role === 'admin';
    
    return (
        <div >
            {/* Background black */}
            {
                isSideMenuOpen && (
                    <div
                    className="fixed top-0 left-0 z-10 h-screen w-full bg-black opacity-30"
                    />
                )
            }

            {/* Blur */}
            {
                isSideMenuOpen && (
                    <div
                    onClick={ closeSideMenu }
                    className="fade-in fixed top-0 left-0 z-10 h-screen w-screen backdrop-filter backdrop-blur-sm"
                    />
                )
            }

            {/* Sidemenu */}
            <nav
            className={
                clsx(
                    "fixed p-5 top-0 right-0 z-20 h-screen w-[500px] bg-white shadow-2xl transform transition-all duration-300",
                    {
                        "translate-x-full": !isSideMenuOpen
                    }
                )
            }
            >
                <IoCloseOutline
                    size={50}
                    className="absolute top-5 right-5  cursor-pointer"
                    onClick={() => { closeSideMenu() }}
                />

                {/* Input*/}
                <div className="relative mt-14">
                    <IoSearchOutline size={20} className="absolute top-2 left-2 cursor-pointer" />
                    <input
                    type="text"
                    placeholder="Buscar"
                    id="search"
                    className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
                    />
                </div>
                {/* Menu */}
                {
                    isAuthenticated && (
                      <>
                        <Link
                            href="/profile"
                            onClick={() => { closeSideMenu() }}
                            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all">
                            <IoPersonOutline size={30} />
                            <span className="ml-3 text-xl">Perfil</span>
                        </Link>
                        <Link
                            href="/orders"
                            onClick={() => { closeSideMenu() }}
                            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all">
                            <IoTicketOutline size={30} />
                            <span className="ml-3 text-xl">Ordenes</span>
                        </Link>
                      </>  
                    )
                }

                {
                    isAuthenticated && (
                    <button
                        onClick={ () => {logout(); closeSideMenu();} }
                        className="w-full flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                    >
                        <IoLogOutOutline size={30} />
                        <span className="ml-3 text-xl">Salir</span>
                    </button>
                    )
                }
                {
                    !isAuthenticated && (
                        <Link
                            href="/auth/login"
                            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                            onClick={() => { closeSideMenu() }}>
                            <IoLogInOutline size={30} />
                            <span className="ml-3 text-xl">Ingresar</span>
                        </Link> 
                    )
                }


                {
                    isAdmin && (
                        <>
                            {/* Line Separator */}
                            <div className="w-full h-px bg-gray-200 my-10" 
                            />
                            <Link
                                href="/"
                                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all">
                                <IoShirtOutline size={30} />
                                <span className="ml-3 text-xl">Productos</span>
                            </Link>
                            <Link
                                href="/"
                                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all">
                                <IoTicketOutline size={30} />
                                <span className="ml-3 text-xl">Ordenes</span>
                            </Link>
                            <Link
                                href="/"
                                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all">
                                <IoPeopleOutline size={30} />
                                <span className="ml-3 text-xl">Usuarios</span>
                            </Link>
                        </>
                    )
                }

            </nav>

        </div>
    )
}
