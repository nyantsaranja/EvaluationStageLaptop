import axios from "axios";
import {BASE_URL, CONFIG} from "../service/Api-Call";
import Swal from "sweetalert2";
import {Crud} from "../mothercomponents/Crud";
import {useEffect, useState} from "react";
import {getSession} from "../service/Utilities";

export const ReturnedLaptops = () => {
    const [vLaptopReturned, setVLaptopReturned] = useState([]);
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
            tempArr.push(data[i].sender.name)
            tempArr.push(data[i].quantity)
            arr.push(tempArr)
        }
        return arr;
    }

    const getVehicles = (page, searchParameter) => {
        axios.get(`${BASE_URL}/v-laptop-returneds?receiver.id=${getSession("entity_id")}&page=${page}${searchParameter !== undefined ? searchParameter : searchQuery}`, CONFIG).then((response) => {
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
            setVLaptopReturned(arr)
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
        "Sender",
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
    const endpoint = "vLaptopReturned"
    const searchFormData = [
        {
            type: "select",
            name: "laptop.id",
            data: laptops,
            label: "Laptop"
        }
    ]
    const seeDetails = (id) => {
        window.location.href = "/laptop-returned-confirmation/" + id
    }
    const buttons = [
        {
            value: "See details",
            event: seeDetails,
            className: "btn btn-primary"
        }
    ]

    return (
        <>
            <Crud tableTitle={"Laptops"} headers={headers} names={names} rows={vLaptopReturned}
                  textValues={textValues}
                  crud={false} page_description={"Returned laptops"} endpoint={endpoint} inputTypes={inputTypes}
                  pagination={pagination} searchFormData={searchFormData} userDefinedButton={buttons}/>
        </>
    );
}