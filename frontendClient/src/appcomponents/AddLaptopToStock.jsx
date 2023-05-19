import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../service/Api-Call";
import Swal from "sweetalert2";
import {getSession} from "../service/Utilities";

export const AddLaptopToStock = () => {
    const [laptops, setLaptops] = useState([]);
    const [details, setDetails] = useState([1]);
    const movementDescription = useRef(null);
    const dateAchat = useRef(null);
    useEffect(() => {
        axios.get(`${BASE_URL}/laptops`).then((response) => {
                console.log(response.data.data)
                setLaptops(response.data.data.elements)
            }
        ).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Désolé...',
                    text: error.response.data.code + ': ' + error.response.data.message,
                })
            }
        )
    }, []);

    function getFormValues() {
        const laptop = document.getElementsByClassName("laptop");
        const quantity = document.getElementsByClassName("quantity");
        const detaildescription = document.getElementsByClassName("detaildescription");
        const results = []
        for (let i = 0; i < laptop.length; i++) {
            results[i] = {
                laptop: {
                    id: laptop[i].value
                },
                quantity: quantity[i].value,
                description: detaildescription[i].value
            }
        }
        const finalObj = {
            description: movementDescription.current.value,
            movementDate: dateAchat.current.value,
            movementDetails: results,
            type: 0,
            sender: {
                id: getSession("entity_id")
            },
            receiver: {
                id: getSession("entity_id")
            },
            parent: {
                id: null
            }
        }
        console.log(finalObj)
        return finalObj;
    }

    const addStock = () => {
        const values = getFormValues()
        axios.post(`${BASE_URL}/movements`, values).then((response) => {
                console.log(response.data.data)
                Swal.fire({
                    icon: 'success',
                    title: 'Succès',
                    text: 'Stock ajouté avec succès',
                }).then((result) => {
                        window.location.reload();
                    }
                ).catch((error) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Désolé...',
                            text: error.response.data.code + ': ' + error.response.data.message,
                        })
                    }
                )
            }
        ).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Désolé...',
                    text: error.response.data.code + ': ' + error.response.data.message,
                })
            }
        )
    }

    const addDetails = () => {
        setDetails([...details, 1])
    }

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-6">
                            <div className="form-floating form-group">
                                <input ref={movementDescription} type="text" className="form-control" id="floatingInput"
                                       placeholder="Description" defaultValue={""}/>
                                <label htmlFor="floatingInput">Description</label>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-floating">
                                <input ref={dateAchat} type="date" className="form-control" id="floatingPassword"
                                       placeholder="Date d'achat" defaultValue={"2023-05-17"}/>
                                <label htmlFor="floatingPassword">Date d'achat</label>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <hr/>
                    <br/>
                    <h3>
                        Details
                    </h3>
                    <div className="container">
                        {
                            details.map((laptop, index) => {
                                    return (
                                        <>
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="form-floating form-group">
                                                        <select className={`form-select mb-3 laptop`} data-choices>
                                                            {
                                                                laptops.map((laptop) => {
                                                                    return (
                                                                        <option key={laptop.id}
                                                                                value={laptop.id}>{laptop.brand.name + " " + laptop.model}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                        <label htmlFor="floatingInput">Laptop</label>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-floating">
                                                        <input type="number" className={`form-control quantity`}
                                                               id="floatingPassword"
                                                               placeholder="Quantity" defaultValue={1}/>
                                                        <label htmlFor="floatingPassword">Quantity</label>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="form-floating">
                                                        <input type="text"
                                                               className={`form-control detaildescription`}
                                                               id="floatingPassword"
                                                               placeholder="Description" defaultValue={""}/>
                                                        <label htmlFor="floatingPassword">Detail description</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <br/>
                                            <hr/>
                                        </>
                                    )
                                }
                            )
                        }
                        <button onClick={() => {
                            addDetails()
                        }} type="button" className="btn btn-dark w-100">
                            +
                        </button>
                        <br/>
                        <br/>
                        <button onClick={() => {
                            addStock()
                        }} type="button" className="btn btn-primary">
                            Buy
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}