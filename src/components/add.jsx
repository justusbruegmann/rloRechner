import React, {useState, useEffect} from 'react';

export default function Add(props) {
    const type = props.type
    const [rohstoffe, setRohstoffe] = useState([]);
    const [ankaeufer, setAnkaeufer] = useState([]);
    const [preis, setPreis] = useState({});
    const [index, setIndex] = useState(0);
    const [newItems, setNewItems] = useState([{rohstoff: "", ankaufer: "", preis: 0, menge: 0}]);


    // Fetch rohstoffe and ankaeufers on component mount
    useEffect(() => {
        async function fetchRohstoffe() {
            try {
                const response = await fetch('http://192.168.6.26:8081/rohstoff/getRohstoffe', {
                    method: "GET",
                    cache: "no-store"
                });
                const data = await response.json();
                setRohstoffe(data);
            } catch (error) {
                console.error('Error fetching rohstoffe:', error);
            }
        }

        async function fetchAnkaeufer() {
            try {
                const response = await fetch('http://192.168.6.26:8081/ankaeufer/getAnkaeufers', {
                    method: "GET",
                    cache: "no-store"
                });
                const data = await response.json();
                setAnkaeufer(data);
            } catch (error) {
                console.error('Error fetching ankaeufer:', error);
            }
        }

        fetchRohstoffe();
        fetchAnkaeufer();
    }, []);

    // Fetch preis when rohstoff or ankaufer changes
    useEffect(() => {
        async function fetchPreis(item, index) {
            if (item.rohstoff && item.ankaufer) {
                try {
                    const response = await fetch(`http://192.168.6.26:8081/preis/getprice?rohstoff=${item.rohstoff}&ankaufer=${item.ankaufer}`, {
                        method: "GET",
                        cache: "no-store",
                        headers: {

                        },
                    });
                    const data = await response.json();
                    const updatedItems = [...newItems];
                    updatedItems[index].preis = data.preis;
                    setNewItems(updatedItems);
                } catch (error) {
                    console.error('Error fetching preis:', error);
                }
            }
        }

        newItems.forEach((item, index) => {
            if (item.rohstoff && item.ankaufer) {
                setIndex(index + 1)
                fetchPreis(item, index);
            }
        });
    }, [newItems[index]?.rohstoff, newItems[index]?.ankaufer]);

    function handleItemChange(index, field, value) {
        const updatedItems = [...newItems];
        updatedItems[index][field] = field === 'menge' ? parseInt(value, 10) : value;

        if (field === 'rohstoff' || field === 'ankaufer') {
            // Clear price if rohstoff or ankaufer changes
            updatedItems[index].preis = 0;
            setPreis({}); // Reset price state
        }

        setNewItems(updatedItems);
    }

    function handleAddItem() {
        console.log(preis);
        setNewItems([...newItems, {
            rohstoff: document.getElementById("rohstoff").value,
            preis: preis,
            menge: Number(document.getElementById("menge").value)
        }]);
    }

    function handleSubmit() {
        const url = `http://192.168.6.26:8081/sell/setSell?ankaufer=${document.getElementById("ankaufer").value}`;
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newItems)
        })
            .then(response => response.json())
            .then(data => {
                window.location.reload()
            })
            .catch(error => window.location.reload());
    }

    function sendRequest() {
        if (type === "preise") {
            const url = `http://192.168.6.26:8081/preis/setPrice?rohstoff=${document.getElementById("rohstoff-preis").value}&ankaufer=${document.getElementById("ankaufer-preis").value}&preis=${document.getElementById("preisanzahl").value}`;
            fetch(url, {method: "POST", cache: "no-store"})
                .then((r) => console.log(r))
        } else if (type === "rohstoffe") {
            const url = `http://192.168.6.26:8081/rohstoff/setRohstoff?rohstoff=${document.getElementById("rohstoff-name").value}&isLegal=${document.getElementById("legal").value}`;
            fetch(url, {method: "POST", cache: "no-store"})
                .then((r) => console.log(r))
        } else if (type === "ankaufer") {
            const url = `http://192.168.6.26:8081/ankaeufer/setAnkaeufer?ankaeufer=${document.getElementById("ankaufer-name").value}`;
            fetch(url, {method: "POST", cache: "no-store"})
                .then((r) => console.log(r))
        }
        window.location.reload()
    }

    if (type === "sells") {
        return (
            <div className="w-full bg-gunmetal-100 p-3 h-auto rounded">
                <div className="p-2 border-argentina border rounded">
                    {newItems.map((item, index) => (
                        <div key={index} className="flex flex-row mb-2">
                            <select
                                className="w-1/4 bg-gunmetal-100 p-2 rounded"
                                value={item.rohstoff}
                                onChange={(e) => handleItemChange(index, 'rohstoff', e.target.value)}
                                id="rohstoff"
                            >
                                <option value="">Select Rohstoff</option>
                                {rohstoffe.map((rohstoff) => (
                                    <option key={rohstoff._id} value={rohstoff.bezeichnung}>
                                        {rohstoff.bezeichnung}
                                    </option>
                                ))}
                            </select>
                            <select
                                className="w-1/4 bg-gunmetal-100 p-2 rounded"
                                value={item.ankaufer}
                                onChange={(e) => handleItemChange(index, 'ankaufer', e.target.value)}
                                id="ankaufer"
                            >
                                <option value="">Select Ankaufer</option>
                                {ankaeufer.map((ankaufer) => (
                                    <option key={ankaufer._id} value={ankaufer.bezeichnung}>
                                        {ankaufer.bezeichnung}
                                    </option>
                                ))}
                            </select>
                            <input
                                className="w-1/4 bg-gunmetal-100 p-2 rounded"
                                type="number"
                                defaultValue="0"
                                placeholder="Menge"
                                id="menge"
                                onChange={(e) => handleItemChange(index, 'menge', Number(e.target.value))}
                            />
                            <p className="w-1/4">{item.preis * item.menge}</p>
                        </div>
                    ))}
                    <button onClick={() => handleAddItem()} className="mt-2 p-2 bg-blue-500 text-white rounded">
                        Add Another Item
                    </button>
                    <button onClick={() => {
                        handleSubmit();
                    }} className="mt-2 p-2 bg-green-500 text-white rounded">
                        Submit Items
                    </button>
                </div>
            </div>
        );
    } else if (type === "preise") {
        return (
            <div className="w-full bg-gunmetal-100 p-3 h-auto rounded">
                <div className="p-2 border-argentina border rounded">
                    <div className="flex flex-row">
                        <select
                            className="w-1/3 bg-gunmetal-100 p-2 rounded"
                            id="rohstoff-preis"
                        >
                            <option value="">Select Rohstoff</option>
                            {rohstoffe.map((rohstoff) => (
                                <option key={rohstoff._id} value={rohstoff.bezeichnung}>
                                    {rohstoff.bezeichnung}
                                </option>
                            ))}
                        </select>
                        <select
                            className="w-1/3 bg-gunmetal-100 p-2 rounded"
                            id="ankaufer-preis"
                        >
                            <option value="">Select Ankaufer</option>
                            {ankaeufer.map((ankaufer) => (
                                <option key={ankaufer._id} value={ankaufer.bezeichnung}>
                                    {ankaufer.bezeichnung}
                                </option>
                            ))}
                        </select>

                        <input type="number" className="w-1/3 bg-gunmetal-100 p-2 rounded" id="preisanzahl"
                               defaultValue="0" placeholder="0"/>
                    </div>
                    <button className="mt-2 p-2 bg-green-500 text-white rounded" onClick={() => sendRequest()}>Submit</button>
                </div>
            </div>
        )
    } else if (type === "rohstoffe") {
        return (
            <div className="w-full bg-gunmetal-100 p-3 h-auto rounded">
                <div className="p-2 border-argentina border rounded">
                    <div className="flex flex-row">
                        <input type="text" className="w-1/2 bg-gunmetal-100 p-2 rounded" id="rohstoff-name"
                               placeholder="Rohstoff Name"/>
                        <select name="isLegas" id="legal" className="w-1/2 bg-gunmetal-100 p-2 rounded">
                            <option value="true">Legal</option>
                            <option value="false">Illegal</option>
                        </select>
                    </div>
                    <button className="mt-2 p-2 bg-green-500 text-white rounded" onClick={() => sendRequest()}>Submit</button>
                </div>
            </div>
        )
    } else if (type === "ankaufer") {
        return (
            <div className="w-full bg-gunmetal-100 p-3 h-auto rounded">
                <div className="p-2 border-argentina border rounded">
                    <div className="flex flex-row">
                        <input type="text" className="w-1/2 bg-gunmetal-100 p-2 rounded" id="ankaufer-name"
                               placeholder="Ankaufer Name"/>
                    </div>
                    <button className="mt-2 p-2 bg-green-500 text-white rounded" onClick={() =>sendRequest()}>Submit</button>
                </div>
            </div>
        )
    }
}
