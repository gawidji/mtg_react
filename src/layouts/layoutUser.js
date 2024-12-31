import React from 'react'
import Header from '../components/header'
import NavbarUser from '../navigation/navbarUser'
import { Outlet } from "react-router-dom"

const LayoutUser = function ()
{
    return (
        <>
        <Header child={<NavbarUser/>} />
        <main>
        <Outlet/>
        </main>
        </>
    )
}
    // On ajoute un élément Outlet qui nous servira plus tard pour le rooter

export default LayoutUser