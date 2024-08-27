import React from "react";

export default function Data(props) {
    const { type, data, datas } = props;
    const [editMode, setEditMode] = React.useState(false);
    const [items, setItems] = React.useState(datas || []);
    console.log(items)
    // Handle updates for data type "preise"
    function updateData() {
        if (type === "preise") {
            const url = `http://192.168.6.26:8081/preis/updatePrice?rohstoff=${data?.rohstoff}&ankaufer=${data?.ankaufer}&preis=${document.getElementById("input3").value}`;
            fetch(url, {
                method: "PUT",
                cache: "no-store"
            }).then((r) => console.log(r)).catch((error) => console.error('Error fetching data:', error));
        }
    }

    function deleteData() {
        if (type === "preise") {
            const url = `http://192.168.6.26:8081/preis/deletePrice?id=${data?._id}`;
            fetch(url, {
                method: "DELETE",
                cache: "no-store"
            }).then((r) => console.log(r)).catch((error) => console.error('Error fetching data:', error));
        } else if (type === "sells") {
            const url = `http://192.168.6.26:8081/sell/deleteSell?id=${data?._id}`;
            fetch(url, {
                method: "DELETE",
                cache: "no-store"
            }).then((r) => console.log(r)).catch((error) => console.error('Error fetching data:', error));
        } else if (type === "rohstoffe") {
            const url = `http://192.168.6.26:8081/rohstoff/deleteRohstoff?id=${data?._id}`;
            fetch(url, {
                method: "DELETE",
                cache: "no-store"
            }).then((r) => console.log(r)).catch((error) => console.error('Error fetching data:', error));
        } else if (type === "ankaufer") {
            const url = `http://192.168.6.26:8081/ankaeufer/deleteAnkaeufer?id=${data?._id}`;
            fetch(url, {
                method: "DELETE",
                cache: "no-store"
            }).then((r) => console.log(r)).catch((error) => console.error('Error fetching data:', error));
        }
        window.location.reload();
    }

    // Render component in edit mode
    if (editMode) {
        return (
            <div className="w-full bg-gunmetal-100 p-3 h-auto rounded">
                <div className="p-2 border-argentina border rounded">
                    <div className="flex flex-row">
                        <p className="w-1/4">
                            {type === "preise" ? data?.rohstoff :
                                type === "rohstoffe" ? data?.bezeichnung :
                                    type === "ankaufer" ? data?.bezeichnung : null}
                        </p>
                        <p className="w-1/4">
                            {type === "preise" ? data?.ankaufer : null}
                        </p>
                        <input className="w-1/4 bg-gunmetal-200" id="input3" defaultValue={data?.preis || ''} placeholder={type === "preise" ? data?.preis : null} />
                        <div className="w-1/4 flex flex-row-reverse">
                            <span className="material-symbols-rounded text-2xl hover:cursor-pointer"
                                  onClick={() => setEditMode(!editMode)}>close</span>
                            <span className="material-symbols-rounded text-2xl hover:cursor-pointer"
                                  onClick={() => {
                                      setEditMode(!editMode);
                                      updateData();
                                  }}>check</span>
                            <span className="material-symbols-rounded text-2xl hover:cursor-pointer" onClick={() => deleteData()}>delete</span>
                        </div>
                    </div>
                    {type === "sells" && items.map((item, index) => (
                        <div key={index} className="flex flex-row">
                            <input className="w-1/4" value={item.rohstoff}  placeholder="Rohstoff" />
                            <input className="w-1/4" type="number" value={item.preis}  placeholder="Preis" />
                            <input className="w-1/4" type="number" value={item.menge}  placeholder="Menge" />
                            <p className="w-1/4">{item.preis * item.menge}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    } else {
        return (
            <div className="w-full bg-gunmetal-200 p-3 h-auto rounded">
                <div className="p-2 border-argentina border rounded">
                    <div className="flex flex-row">
                        <p className="w-1/4">
                            {type === "sells" ? data?.ankaufer :
                                type === "preise" ? data?.rohstoff :
                                    type === "rohstoffe" ? data?.bezeichnung :
                                        type === "ankaufer" ? data?.bezeichnung : null}
                        </p>
                        <p className="w-1/4">
                            {type === "preise" ? data?.ankaufer : null}
                        </p>
                        <p className="w-1/4">
                            {type === "preise" ? data?.preis :
                                type === "rohstoffe" ? (data?.isLegal ? "Legal" : "Illegal") : null}
                        </p>
                        <div className="w-1/4">
                            {type === "preise" &&
                                <span className="material-symbols-rounded text-2xl hover:cursor-pointer"
                                      onClick={() => setEditMode(!editMode)}>edit</span>
                            }
                            <span className="material-symbols-rounded text-2xl hover:cursor-pointer" onClick={() => deleteData()}>delete</span>
                        </div>
                    </div>
                    {type === "sells" && items.map((item, index) => (
                        <div key={index} className="flex flex-row">
                            <p className="w-1/4">{item.rohstoff}</p>
                            <p className="w-1/4">{item.preis}</p>
                            <p className="w-1/4">{item.menge}</p>
                            <p className="w-1/4">{item.preis * item.menge}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
