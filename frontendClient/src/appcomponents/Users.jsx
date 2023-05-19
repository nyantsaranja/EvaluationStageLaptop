import {useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL, CONFIG} from "../service/Api-Call";
import Swal from "sweetalert2";
import {Crud} from "../mothercomponents/Crud";

export const Users = () => {
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [salePoints, setSalePoints] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({});
    const [searchQuery, setSearchQuery] = useState("");

    function setToArray(data) {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
            let tempArr = []
            tempArr.push(data[i].id)
            tempArr.push(data[i].firstname)
            tempArr.push(data[i].lastname)
            tempArr.push(new Date(data[i].birthdate).toISOString().slice(0, 10))
            tempArr.push(data[i]?.entity?.lastname)
            arr.push(tempArr)
        }
        return arr;
    }

    const getVehicles = (page, searchParameter) => {
        axios.get(`${BASE_URL}/utilisateurs?page=${page}${searchParameter !== undefined ? searchParameter : searchQuery}`, CONFIG).then((response) => {
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
            setUtilisateurs(arr)
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
        }, []
    )
    const headers = [
        "ID",
        "Firstname",
        "Lastname",
        "Birthdate",
        "Sale point"
    ]

    const names = [
        "id",
        "firstname",
        "lastname",
        "birthdate",
        "entityId"
    ]
    const inputTypes = [
        {
            name: "number",
        },
        {
            name: "text"
        },
        {
            name: "text"
        },
        {
            name: "date"
        },
        {
            name: "select",
            mother: salePoints
        }
    ]
    const textValues =
        {
            ajouter: "Add a user",
            modifier: "Modify a user",
            supprimer: "Delete a user",
            btnCreer: "Create",
        }
    const endpoint = "utilisateurs"
    const searchFormData = [
        {
            type: "select",
            name: "entity.id",
            data: salePoints,
            label: "Sale point"
        }
    ]
    return (
        <>
            <Crud tableTitle={"Utilisateurs"} headers={headers} names={names} rows={utilisateurs} textValues={textValues}
              crud={true} page_description={"CRUD of utilisateurs"} endpoint={endpoint} inputTypes={inputTypes}
              pagination={pagination} searchFormData={searchFormData}/>
        </>
    );
}