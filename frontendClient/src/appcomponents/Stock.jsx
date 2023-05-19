import axios from "axios";
import {BASE_URL, CONFIG} from "../service/Api-Call";
import Swal from "sweetalert2";
import {Crud} from "../mothercomponents/Crud";
import {useEffect, useRef, useState} from "react";
import {getSession} from "../service/Utilities";

export const Stock = () => {
    const [details, setDetails] = useState([1]);
    const [salePoints, setSalePoints] = useState([]);
    const movementDescription = useRef(null);
    const dateAchat = useRef(null);
    const salePoint = useRef(null);
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

        axios.get(`${BASE_URL}/stores?permission=0`, CONFIG).then((response) => {
                console.log(response.data.data)
                setSalePoints(response.data.data.elements)
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
        console.log(laptop)
        // get the selected option value for each laptop
        for (let i = 0; i < laptop.length; i++) {
            let selectElement = laptop[i];
            let selectedOption = selectElement.options[selectElement.selectedIndex];
            let selectedValue = selectedOption.value;
            results[i] = {
                laptop: {
                    id: selectedValue
                },
                quantity: quantity[i].value,
                detaildescription: detaildescription[i].value
            }
        }
        const finalObj = {
            description: movementDescription.current.value,
            movementDate: dateAchat.current.value,
            movementDetails: results,
            type: 1,
            sender: {
                id: getSession("entity_id")
            },
            receiver: {
                id: salePoint.current.value
            },
            parent: {
                id: null
            }
        }
        console.log(finalObj)
        return finalObj;
    }

    function control(movementDetails, vStocks) {
        console.log(movementDetails,vStocks)
        // control if the quantity is available
        for (let i = 0; i < movementDetails.length; i++) {
            for (let j = 0; j < vStocks.length; j++) {
                if (movementDetails[i].laptop.id == vStocks[j].laptop.id) {
                    if (movementDetails[i].quantity > vStocks[j].quantity) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Désolé...',
                            text: 'La quantité de ' + vStocks[j].laptop.brand.name + " " + vStocks[j].laptop.model + ' est insuffisante',
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
        if (control(values.movementDetails, vStocksV2)) {
            axios.post(`${BASE_URL}/movements`, values).then((response) => {
                    console.log(response.data.data)
                    Swal.fire({
                        icon: 'success',
                        title: 'Succès',
                        text: 'Le transfert a été effectué avec succès',
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


    const [vStocks, setVStocks] = useState([]);
    const [vStocksV2, setVStocksV2] = useState([]);
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
        axios.get(`${BASE_URL}/v-stocks?sender.id=${getSession("entity_id")}&page=${page}${searchParameter !== undefined ? searchParameter : searchQuery}`, CONFIG).then((response) => {
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
            setVStocks(arr)
            setVStocksV2(response.data.data.elements)
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
            ajouter: "Add a stock",
            modifier: "Modify a stock",
            supprimer: "Delete a stock",
            btnCreer: "Create",
        }
    const endpoint = "vStocks"
    const searchFormData = [
        {
            type: "select",
            name: "laptop.id",
            data: laptops,
            label: "Laptop"
        }
    ]
    return (
        <>
            <>
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12">
                                <div className="form-floating form-group">
                                    <select ref={salePoint} className={`form-select mb-3`} data-choices>
                                        {
                                            salePoints.map((salePoint) => {
                                                return (
                                                    <option key={salePoint.id}
                                                            value={salePoint.id}>{salePoint.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <label htmlFor="floatingInput">Sale point</label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-floating form-group">
                                    <input ref={movementDescription} type="text" className="form-control"
                                           id="floatingInput"
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
                                Transfer
                            </button>
                        </div>
                    </div>
                </div>
            </>


            <Crud tableTitle={"Stock"} headers={headers} names={names} rows={vStocks} textValues={textValues}
                  crud={false} page_description={"Laptops in stock"} endpoint={endpoint} inputTypes={inputTypes}
                  pagination={pagination} searchFormData={searchFormData}/>
        </>
    );
}