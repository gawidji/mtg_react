import React from 'react'
import Header from '../components/header'
import NavbarUser from '../navigation/navbarUser'
import Footer from '../components/footer'
import { Outlet } from "react-router-dom"

const LayoutUser = function ()
{
    return (
        <>
        <Header child={<NavbarUser/>} />
        <main>
        <Outlet/>
        </main>
        <Footer/>
        </>
    )
}
    // On ajoute un élément Outlet qui nous servira plus tard pour le rooter

export default LayoutUser