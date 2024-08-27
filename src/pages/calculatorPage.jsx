import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";

export default function CalculatorPage() {
    const [rohstoffe, setRohstoffe] = useState([]);
    const [ankaufer, setAnkaufer] = useState([]);
    const [selections, setSelections] = useState([]);
    const [selectedRohstoff, setSelectedRohstoff] = useState("");
    const [selectedAnkaufer, setSelectedAnkaufer] = useState("");
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        let url = "http://192.168.6.26:8081";
        fetch(`${url}/rohstoff/getRohstoffe`, {
            method: "GET",
            cache: "no-store"
        }).then((r) => r.json()).then((r) => {
            setRohstoffe(r);
        }).catch((error) => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        let url = "http://192.168.6.26:8081";
        fetch(`${url}/ankaeufer/getAnkaeufers`, {
            method: "GET",
            cache: "no-store"
        }).then((r) => r.json()).then((r) => {
            setAnkaufer(r);
        }).catch((error) => console.error('Error fetching data:', error));
    }, []);

    const addSelection = () => {
        if (selectedRohstoff && selectedAnkaufer && quantity > 0) {
            let url = "http://192.168.6.26:8081";
            fetch(`${url}/preis/getprice?rohstoff=${selectedRohstoff}&ankaufer=${selectedAnkaufer}`, {
                method: "GET",
                cache: "no-store"
            }).then((r) => r.json()).then((r) => {
                const preis = Math.round(r.preis * quantity);
                const newSelection = { rohstoff: selectedRohstoff, ankaufer: selectedAnkaufer, preis, quantity };
                setSelections([...selections, newSelection]);
                // Reset the fields
                setSelectedRohstoff("");
                setSelectedAnkaufer("");
                setQuantity(0);
            }).catch((error) => console.error('Error fetching data:', error));
        }
    };

    const total = selections.reduce((acc, curr) => acc + curr.preis, 0);

    return (
        <div className="bg-gunmetal-100 text-white flex flex-row w-full">
            <Sidebar />
            <div className="p-2 w-full flex flex-col items-end">
                <h2>Rechner</h2>
                <div className="text-argentina border-b-argentina border-r-0 border-l-0 border-t-0 rounded border w-full text-center pb-2">
                    Rechner
                </div>
                <div className="flex flex-row justify-end mb-4 w-full">
                    <select
                        name="Rohstoff"
                        id="input1"
                        className="w-1/3 bg-gunmetal-100 p-2 mb-2 mr-2"
                        value={selectedRohstoff}
                        onChange={(e) => setSelectedRohstoff(e.target.value)}
                    >
                        <option value="">Rohstoff wählen</option>
                        {rohstoffe.map((rohstoff) => (
                            <option key={rohstoff.id} value={rohstoff.bezeichnung}>
                                {rohstoff.bezeichnung}
                            </option>
                        ))}
                    </select>
                    <select
                        name="Ankäufer"
                        id="input2"
                        className="w-1/3 bg-gunmetal-100 p-2 mb-2 mr-2"
                        value={selectedAnkaufer}
                        onChange={(e) => setSelectedAnkaufer(e.target.value)}
                    >
                        <option value="">Ankäufer wählen</option>
                        {ankaufer.map((ankaeufer) => (
                            <option key={ankaeufer.id} value={ankaeufer.bezeichnung}>
                                {ankaeufer.bezeichnung}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        id="quantityInput"
                        className="w-1/3 bg-gunmetal-100 p-2 mb-2 mr-2"
                        placeholder="Menge"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                    />
                </div>
                <button onClick={addSelection} className="bg-argentina p-2 mb-2">Hinzufügen</button>
                <div className="flex flex-col items-end w-full">
                    <h3 className="mb-2 text-right w-full">Auswahl</h3>
                    <div className="w-full text-right">
                        <div className="grid grid-cols-4 gap-2 font-bold">
                            <div>Rohstoff</div>
                            <div>Ankäufer</div>
                            <div>Menge</div>
                            <div>Preis ($)</div>
                        </div>
                        {selections.map((selection, index) => (
                            <div key={index} className="grid grid-cols-4 gap-2">
                                <div>{selection.rohstoff}</div>
                                <div>{selection.ankaufer}</div>
                                <div>{selection.quantity}</div>
                                <div>{selection.preis}</div>
                            </div>
                        ))}
                    </div>
                    <div className="font-bold mt-4 text-right w-full">Gesamt: ${total}</div>
                </div>
            </div>
        </div>
    );
}
