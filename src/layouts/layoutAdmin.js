import React from 'react'
import Header from '../components/header'
import NavbarAdmin from '../navigation/navbarAdmin'
import Footer from '../components/footer'
import { Outlet } from "react-router-dom"

const LayoutAdmin = function ()
{
    return (
        <>
        <Header child={<NavbarAdmin/>} />
        <main>
        <Outlet/>
        </main>
        <Footer/>
        </>
    )
}
    // On ajoute un élément Outlet qui nous servira plus tard pour le rooter

export default LayoutAdmin