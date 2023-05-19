import axios from "axios";
import {BASE_URL, CONFIG} from "../service/Api-Call";
import Swal from "sweetalert2";
import {Crud} from "../mothercomponents/Crud";
import {useEffect, useRef, useState} from "react";
import {getSession} from "../service/Utilities";

export const SalePointStock = () => {
    const [details, setDetails] = useState([1]);
    const movementDescription = useRef(null);
    const dateAchat = useRef(null);
    const salePoint = useRef(null);
    const reference = useRef(null);

    useEffect(() => {
        axios.get(`${BASE_URL}/laptops`).then((response) => {
                console.log(response.data.data)
                setLaptops(format(response.data.data.elements))
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
        for (let i = 0; i < quantity.length; i++) {
            results[i] = {
                laptop: {
                    id: laptop[i].value
                },
                quantity: quantity[i].value,
                detaildescription: detaildescription[i].value
            }
        }
        const finalObj = {
            description: movementDescription.current.value,
            movementDate: dateAchat.current.value,
            movementDetails: results,
            reference: reference.current.value,
            type: 5,
            sender: {
                id: getSession("entity_id")
            },
            receiver: null,
            parentId: null
        }
        console.log(finalObj)
        return finalObj;
    }

    function control(movementDetails, vSalePointStock) {
        for (let i = 0; i < movementDetails.length; i++) {
            for (let j = 0; j < vSalePointStock.length; j++) {
                if (movementDetails[i].laptop.id == vSalePointStock[j].laptop.id) {
                    if (movementDetails[i].quantity > vSalePointStock[j].quantity) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Désolé...',
                            text: 'La quantité de ' + vSalePointStock[j].laptop.brand + ' ' + vSalePointStock[j].laptop.model + ' est insuffisante',
                        })
                        return false;
                    }
                }
            }
        }
        return true;
    }

    const transferLaptop = () => {
        const values = getFormValues()
        if (control(values.movementDetails, vSalePointStock2)) {
            axios.post(`${BASE_URL}/movements`, values).then((response) => {
                    console.log(response.data.data)
                    Swal.fire({
                        icon: 'success',
                        title: 'Succès',
                        text: 'La vente a été effectué avec succès',
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
    }

    const addDetails = () => {
        setDetails([...details, 1])
    }


    // Separator


    const [vSalePointStock, setVSalePointStock] = useState([]);
    const [vSalePointStock2, setVSalePointStock2] = useState([]);
    const [laptops, setLaptops] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({});
    const [searchQuery, setSearchQuery] = useState("");

    function setToArray(data) {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
            let tempArr = []
            tempArr.push(data[i].id)
            tempArr.push(data[i].laptop.brand.name + " " + data[i].laptop.model)
            tempArr.push(data[i].quantity)
            arr.push(tempArr)
        }
        return arr;
    }


    const getVehicles = (page, searchParameter) => {
        axios.get(`${BASE_URL}/v-stock-by-salepoints?receiver.id=${getSession("entity_id")}&page=${page}${searchParameter !== undefined ? searchParameter : searchQuery}`, CONFIG).then((response) => {
            console.log(response.data.data)
            const arr = setToArray(response.data.data.elements)
            const paginationObj = {
                pageNumber: (response.data.data.count / response.data.data.pageSize),
                currentIndex: response.data.data.page,
                event: getVehicles,
                searchQuery: searchParameter !== undefined ? searchParameter : ""
            }
            setPage(response.data.data.page)
            setPagination(paginationObj)
            setVSalePointStock(arr)
            setVSalePointStock2(response.data.data.elements)
            setSearchQuery(searchParameter !== undefined ? searchParameter : "")
        }).catch((error) => {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Désolé...',
                text: error.response.data.code + ': ' + error.response.data.message,
            })
        })
    }

    function format(elements) {
        let newTab = []
        for (let i = 0; i < elements.length; i++) {
            newTab.push({
                id: elements[i].id,
                name: elements[i].brand.name + " " + elements[i].model,
            })
        }
        return newTab;
    }

    function format2(elements) {
        let newTab = []
        for (let i = 0; i < elements.length; i++) {
            newTab.push({
                id: elements[i].id,
                name: elements[i].lastname,
            })
        }
        return newTab;
    }

    useEffect(() => {
            getVehicles(page)
            axios.get(`${BASE_URL}/laptops`, CONFIG).then((response) => {
                    console.log(response.data.data)
                    setLaptops(format(response.data.data.elements))
                }
            ).catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Désolé...',
                        text: error.response.data.code + ': ' + error.response.data.message,
                    })
                }
            )

        }, []
    )
    const headers = [
        "ID",
        "Laptop",
        "Quantity"
    ]

    const names = [
        "id",
        "name",
        "procsupplierId"
    ]
    const inputTypes = [
        {
            name: "number",
        },
        {
            name: "text"
        },
        {
            name: "select",
            mother: laptops
        }
    ]
    const textValues =
        {
            ajouter: "Add a Movement",
            modifier: "Modify a Movement",
            supprimer: "Delete a Movement",
            btnCreer: "Create",
        }
    const endpoint = "vSalePointStock"
    const searchFormData = [
        {
            type: "select",
            name: "laptop.id",
            data: laptops,
            label: "Laptop"
        }
    ]
    // const seeDetails = (id) => {
    //     window.location.href = "/receipt-details/" + id
    // }
    // const buttons = [
    //     {
    //         value: "See details",
    //         event: seeDetails,
    //         className: "btn btn-primary"
    //     }
    // ]

    return (
        <>
            <>
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-4">
                                <div className="form-floating form-group">
                                    <input ref={reference} type="text" className="form-control"
                                           id="floatingInput"
                                           placeholder="Reference" defaultValue={""}/>
                                    <label htmlFor="floatingInput">Reference</label>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="form-floating form-group">
                                    <input ref={movementDescription} type="text" className="form-control"
                                           id="floatingInput"
                                           placeholder="Description" defaultValue={""}/>
                                    <label htmlFor="floatingInput">Description</label>
                                </div>
                            </div>
                            <div className="col-4">
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
                                                                                    value={laptop.id}>{laptop.name}</option>
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
                                transferLaptop()
                            }} type="button" className="btn btn-primary">
                                Sell
                            </button>
                        </div>
                    </div>
                </div>
            </>

            <Crud tableTitle={"Stock"} headers={headers} names={names} rows={vSalePointStock}
                  textValues={textValues}
                  crud={false} page_description={"Stock in the point of sale"} endpoint={endpoint}
                  inputTypes={inputTypes}
                  pagination={pagination} searchFormData={searchFormData}/>
        </>
    );
}