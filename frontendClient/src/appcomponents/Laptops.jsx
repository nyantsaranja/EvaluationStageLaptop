import Swal from "sweetalert2";
import {useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL, CONFIG} from "../service/Api-Call";
import {Crud} from "../mothercomponents/Crud";

export const Laptops = () => {
    const [laptops, setLaptops] = useState([]);
    const [brands, setBrands] = useState([]);
    const [processors, setProcessors] = useState([]);
    const [rams, setRams] = useState([]);
    const [storages, setStorages] = useState([]);
    const [screens, setScreens] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({});
    const [searchQuery, setSearchQuery] = useState("");

    function setToArray(data) {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
            let tempArr = []
            tempArr.push(data[i].id)
            tempArr.push(data[i].brand.name)
            tempArr.push(data[i].model)
            tempArr.push(data[i].processor.name)
            tempArr.push(data[i].ram.name + " Go")
            tempArr.push(data[i].storage.name + " Go")
            tempArr.push(data[i].screen.name + " ''")
            arr.push(tempArr)
        }
        return arr;
    }

    const getVehicles = (page, searchParameter) => {
        axios.get(`${BASE_URL}/laptops?page=${page}${searchParameter !== undefined ? searchParameter : searchQuery}`, CONFIG).then((response) => {
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
            setLaptops(arr)
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

    useEffect(() => {
            getVehicles(page)
            axios.get(`${BASE_URL}/brands`, CONFIG).then((response) => {
                    console.log(response.data.data)
                    setBrands(response.data.data.elements)
                }
            ).catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Désolé...',
                        text: error.response.data.code + ': ' + error.response.data.message,
                    })
                }
            )
            axios.get(`${BASE_URL}/processors`, CONFIG).then((response) => {
                    console.log(response.data.data)
                    setProcessors(response.data.data.elements)
                }
            ).catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Désolé...',
                        text: error.response.data.code + ': ' + error.response.data.message,
                    })
                }
            )
            axios.get(`${BASE_URL}/rams`, CONFIG).then((response) => {
                    console.log(response.data.data)
                    setRams(response.data.data.elements)
                }
            ).catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Désolé...',
                        text: error.response.data.code + ': ' + error.response.data.message,
                    })
                }
            )
            axios.get(`${BASE_URL}/storages`, CONFIG).then((response) => {
                    console.log(response.data.data)
                    setStorages(response.data.data.elements)
                }
            ).catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Désolé...',
                        text: error.response.data.code + ': ' + error.response.data.message,
                    })
                }
            )
            axios.get(`${BASE_URL}/screens`, CONFIG).then((response) => {
                    console.log(response.data.data)
                    setScreens(response.data.data.elements)
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
        "Brand",
        "Model",
        "Processor",
        "Ram",
        "Storage",
        "Screen"
    ]

    const names = [
        "id",
        "brandId",
        "model",
        "processorId",
        "ramId",
        "storageId",
        "screenId"
    ]
    const inputTypes = [
        {
            name: "number",
        },
        {
            name: "select",
            mother: brands
        },
        {
            name: "text",
        },
        {
            name: "select",
            mother: processors
        },
        {
            name: "select",
            mother: rams
        },
        {
            name: "select",
            mother: storages
        },
        {
            name: "select",
            mother: screens
        }
    ]
    const textValues =
        {
            ajouter: "Add a laptop",
            modifier: "Modify a laptop",
            supprimer: "Delete a laptop",
            btnCreer: "Create",
        }
    const endpoint = "laptops"
    const searchFormData = [
        {
            type: "select",
            name: "brand.id",
            data: brands,
            label: "Brand"
        },
        {
            type: "select",
            name: "processor.id",
            data: processors,
            label: "Processor"
        },
        {
            type: "select",
            name: "ram.id",
            data: rams,
            label: "Ram"
        },
        {
            type: "select",
            name: "storage.id",
            data: storages,
            label: "Storage"
        }
    ]
    return (
        <>
            <Crud tableTitle={"Laptops"} headers={headers} names={names} rows={laptops} textValues={textValues}
                  crud={true} page_description={"CRUD of laptops"} endpoint={endpoint} inputTypes={inputTypes}
                  pagination={pagination} searchFormData={searchFormData}/>
        </>
    );
}