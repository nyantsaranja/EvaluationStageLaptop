import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../service/Api-Call";
import Swal from "sweetalert2";
import {getSession} from "../service/Utilities";

export const ReceiptDetails = () => {
    const {movement_id} = useParams();
    console.log(movement_id)
    const [details, setDetails] = useState([]);
    useEffect(() => {
        axios.get(`${BASE_URL}/movement-details?movement.id=${movement_id}`).then((response) => {
                console.log(response.data.data)
                setDetails(response.data.data.elements)
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

    // Separator
    const [laptops, setLaptops] = useState([]);
    const [details2, setDetail2] = useState([1]);
    const movementDescription = useRef(null);
    const sendBackDescription = useRef(null);
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

    function control(finalObjReceived, finalObjSendBack) {
        // make sure each finalObjReceived.movementDetails.quantity is not greater than finalObjSendBack.movementDetails.quantity
        for (let i = 0; i < finalObjReceived.movementDetails.length; i++) {
            if (finalObjReceived.movementDetails[i].quantity < finalObjSendBack.movementDetails[i].quantity) {
                return false;
            }
        }
        return true;
    }

    function getFormValues() {
        const laptop = document.getElementsByClassName("laptop");
        const quantityreceived = document.getElementsByClassName("quantityreceived");
        const quantitytosendback = document.getElementsByClassName("quantitytosendback");
        const detaildescription = document.getElementsByClassName("detaildescription");
        const results = []
        const results2 = []
        for (let i = 0; i < laptop.length; i++) {
            results[i] = {
                laptop: {
                    id: laptop[i].value
                },
                quantity: quantityreceived[i].value,
                detaildescription: detaildescription[i].value
            }
            results2[i] = {
                laptop: {
                    id: laptop[i].value
                },
                quantity: quantitytosendback[i].value,
                detaildescription: detaildescription[i].value
            }
        }
        const finalObjReceived = {
            description: movementDescription.current.value,
            movementDate: dateAchat.current.value,
            movementDetails: results,
            type: 2,
            sender: null,
            receiver: {
                id: getSession("entity_id")
            },
            parentId: movement_id
        }

        const finalObjSendBack = {
            description: sendBackDescription.current.value,
            movementDate: dateAchat.current.value,
            movementDetails: results2,
            type: 3,
            sender: {
                id: getSession("entity_id")
            },
            receiver: null,
            parentId: movement_id
        }
        const finalObj = {
            finalObjReceived: finalObjReceived,
            finalObjSendBack: finalObjSendBack,
            movementId: movement_id
        }
        // if (!control(finalObjReceived, finalObjSendBack)) {
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Désolé...',
        //         text: 'La quantité reçue doit être supérieure ou égale à la quantité renvoyée',
        //     })
        //     return false;
        // }else{
        return finalObj;
        // }
    }

    const addStock = () => {
        const values = getFormValues()
        // if (values!==false) {
        axios.post(`${BASE_URL}/movements/receive-and-send-back`, values).then((response) => {
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
        // }
    }

    const addDetails = () => {
        setDetail2([...details2, 1])
    }


    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Laptop Details</h5>
                    {
                        details.map((detail, index) => {
                                return (
                                    <div className="row mb-3" key={index}>
                                        <div className="col-12">
                                            <span
                                                className="badge rounded-pill bg-dark text-light">Laptop Model: {detail.laptop.model}</span>
                                            <span
                                                className="badge rounded-pill bg-secondary text-light">Processor: {detail.laptop.processor.name}</span>
                                            <span
                                                className="badge rounded-pill bg-primary text-light">RAM: {detail.laptop.ram.name}</span>
                                            <span
                                                className="badge rounded-pill bg-danger text-light">Storage: {detail.laptop.storage.name}</span>
                                            <span
                                                className="badge rounded-pill bg-warning text-dark">Brand: {detail.laptop.brand.name}</span>
                                            <span
                                                className="badge rounded-pill bg-info text-dark">Quantity: {detail.quantity}</span>
                                            <br/>
                                            <br/>
                                            <hr/>
                                        </div>
                                    </div>
                                )
                            }
                        )
                    }
                </div>
            </div>
            <>
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-4">
                                <div className="form-floating form-group">
                                    <input ref={movementDescription} type="text" className="form-control"
                                           id="floatingInput"
                                           placeholder="Description" defaultValue={""}/>
                                    <label htmlFor="floatingInput">Description réception</label>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="form-floating form-group">
                                    <input ref={sendBackDescription} type="text" className="form-control"
                                           id="floatingInput"
                                           placeholder="Description" defaultValue={""}/>
                                    <label htmlFor="floatingInput">Description renvoie</label>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="form-floating">
                                    <input ref={dateAchat} type="date" className="form-control" id="floatingPassword"
                                           placeholder="Date d'achat" defaultValue={"2023-05-17"}/>
                                    <label htmlFor="floatingPassword">Date de traitement</label>
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
                                details2.map((laptop, index) => {
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
                                                            <input type="number" className={`form-control quantityreceived`}
                                                                   id="floatingPassword"
                                                                   placeholder="Quantity" defaultValue={1}/>
                                                            <label htmlFor="floatingPassword">Quantity received</label>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <div className="form-floating form-group">
                                                            <input type="number"
                                                                   className={`form-control quantitytosendback`}
                                                                   id="floatingInput"
                                                                   placeholder="Unit price" defaultValue={1}/>
                                                            <label htmlFor="floatingInput">Quantity to send back</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
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
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </>

        </>
    );
}