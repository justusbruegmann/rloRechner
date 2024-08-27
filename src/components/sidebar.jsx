import React from "react";
import {useState} from "react";
import '../index.css';
import {Link} from "react-router-dom";

function SidebarFalse({setisMenuOpen}) {
    return (
        <div
            className="bg-gunmetal-200 text-white w-16 h-screen p-2 flex flex-col border border-b-0 border-t-0 border-l-0 rounded border-r-argentina ">
            <span className="material-symbols-rounded md-48 w-10 h-10 hover:cursor-pointer" onClick={() => {
                setisMenuOpen(true)
            }}>menu</span>
            <Link to="/list"><span
                className="material-symbols-rounded md-48 w-10 h-10 pt-6 pb-2hover:cursor-pointer">list</span></Link>
            <Link to="/calculator" className="hover:cursor-pointer">
                <span className="material-symbols-rounded md-48 w-10 h-10 pt-8 hover:cursor-pointer">calculate</span>
            </Link>
            <div className="h-full">

            </div>

            <span className="material-symbols-rounded md-48 w-10 h-10 pb-10 hover:cursor-pointer">add</span>
        </div>
    )
}

function SidebarTrue({setisMenuOpen}) {
    return (
        <div className="bg-gunmetal-200 text-white w-40 h-screen p-2 flex flex-col">
            <div className="flex flex-row hover:cursor-pointer" onClick={() => {
                setisMenuOpen(false)
            }}><span className="material-symbols-rounded md-48 w-10 h-10 ">menu</span> <p
                className="text-xl p-2"> Menu</p></div>
            <div className="flex flex-row hover:cursor-pointer">
                <Link to="/list" className="flex flex-row">
                    <span className="material-symbols-rounded md-48 w-10 h-10 pt-6 pb-2">list</span>
                    <p className="text-xl pt-8 pl-2">Listen</p>
                </Link>
            </div>
            <div className="flex flex-row hover:cursor-pointer">
                <Link to="/calculator" className="flex flex-row">
                    <span className="material-symbols-rounded md-48 w-10 h-10 pt-6 pb-2">calculate</span>
                    <p className="text-xl pt-8 pl-2">Rechner</p>
                </Link>
            </div>
            <div className="h-full">

            </div>
            <div className="flex flex-row hover:cursor-pointer"><span
                className="material-symbols-rounded md-48 w-10 h-10  pb-2">add</span>
                <p className="text-xl p-2">Add</p></div>
        </div>
    )
}


export default function Sidebar() {

    let [isMenuOpen, setisMenuOpen] = useState(false);
    return (
        <>
            {isMenuOpen ? <SidebarTrue setisMenuOpen={setisMenuOpen}/> : <SidebarFalse setisMenuOpen={setisMenuOpen}/>}
        </>

    );
}
