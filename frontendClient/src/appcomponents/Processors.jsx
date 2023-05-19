import axios from "axios";
import {BASE_URL, CONFIG} from "../service/Api-Call";
import Swal from "sweetalert2";
import {Crud} from "../mothercomponents/Crud";
import {useEffect, useState} from "react";

export const Processors = () => {
    const [processors, setProcessors] = useState([]);
    const [procSuppliers, setProcSuppliers] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({});
    const [searchQuery, setSearchQuery] = useState("");

    function setToArray(data) {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
            let tempArr = []
            tempArr.push(data[i].id)
            tempArr.push(data[i].name)
            tempArr.push(data[i].procsupplier.name)
            arr.push(tempArr)
        }
        return arr;
    }

    const getVehicles = (page, searchParameter) => {
        axios.get(`${BASE_URL}/processors?page=${page}${searchParameter !== undefined ? searchParameter : searchQuery}`, CONFIG).then((response) => {
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
            setProcessors(arr)
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
            axios.get(`${BASE_URL}/proc-suppliers`, CONFIG).then((response) => {
                    console.log("Proc",response.data.data)
                    setProcSuppliers(response.data.data.elements)
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
        "Name",
        "Supplier"
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
            mother: procSuppliers
        }
    ]
    const textValues =
        {
            ajouter: "Add a laptop",
            modifier: "Modify a laptop",
            supprimer: "Delete a laptop",
            btnCreer: "Create",
        }
    const endpoint = "processors"
    const searchFormData = [
        {
            type: "select",
            name: "procsupplier.id",
            data: procSuppliers,
            label: "Supplier"
        }
    ]
    return (
        <>
            <Crud tableTitle={"Processors"} headers={headers} names={names} rows={processors} textValues={textValues}
              crud={true} page_description={"CRUD of processors"} endpoint={endpoint} inputTypes={inputTypes}
              pagination={pagination} searchFormData={searchFormData}/>
        </>
    );
}