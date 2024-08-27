import React from "react";
import Sidebar from "../components/sidebar";
import Data from "../components/data";
import Add from "../components/add";
import {useEffect} from "react";


export default function ListPage() {
    const [selected, setSelected] = React.useState("sells");
    const [datas, setDatas] = React.useState([])
    const [addMode, setAddMode] = React.useState(false);


    useEffect(() => {

        let url = "http://192.168.6.26:8081";
        if (selected === "sells") {
            url = `${url}/sell/getSells`;
        } else if (selected === "preise") {
            url = `${url}/preis/getPrices`;
        } else if (selected === "rohstoffe") {
            url = `${url}/rohstoff/getRohstoffe`;
        } else if (selected === "ankaufer") {
            url = `${url}/ankaeufer/getAnkaeufers`;
        }
        if (selected === "") return;
        fetch(url, {method: "GET", cache: "no-store"})
            .then((r) => r.json())
            .then((r) => {
                setDatas(r);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [selected]); // Add `selected` to the dependency array to re-run the effect when `selected` changes


    return (
        <div className="bg-gunmetal-100 text-white flex flex-row w-full">
            <Sidebar/>
            <div className="p-2 w-full">
                <h2>Listen</h2>
                <div className="flex flex-row justify-stretch w-full p-2 hover:cursor-pointer">
                    <div
                        className=" flex-1 text-argentina border-b-argentina border-r-0 border-l-0 border-t-0 rounded border w-20 text-center"
                        onClick={() => setSelected("sells")}>Sells
                    </div>
                    <div
                        className=" flex-1 text-argentina border-b-argentina border-r-0 border-l-0 border-t-0 rounded border w-20 text-center"
                        onClick={async () => {
                            setSelected("preise")
                        }}>Preise
                    </div>
                    <div
                        className=" flex-1 text-argentina border-b-argentina border-r-0 border-l-0 border-t-0 rounded border w-20 text-center"
                        onClick={() => {
                            setSelected("rohstoffe")
                        }}>Rohstoffe
                    </div>
                    <div
                        className=" flex-1 text-argentina border-b-argentina border-r-0 border-l-0 border-t-0 rounded border w-20 text-center"
                        onClick={() => {
                            setSelected("ankaufer")
                        }}>Ankäufer
                    </div>
                </div>
                <div className="p-3 h-auto">
                    {datas ? datas.map((data) => <Data className="pt-2" type={selected} key={data._id} data={data} datas={data.data}/>) : null}
                </div>
                <div className="ml-[0.75rem]  text-center w-full bg-gunmetal-50 rounded hover:cursor-pointer" >
                    {addMode ? <Add type={selected}/> : <span className="material-symbols-rounded md-48 " onClick={() => setAddMode(!addMode)}>add</span>}
                </div>
            </div>

        </div>
    );
}

