import axios from "axios";
import {BASE_URL, CONFIG} from "../service/Api-Call";
import Swal from "sweetalert2";
import {Crud} from "../mothercomponents/Crud";
import {useEffect, useState} from "react";

export const PointsOfSale = () => {
    const [pointOfSales, setPointOfSales] = useState([]);
    const [places, setPlaces] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({});
    const [searchQuery, setSearchQuery] = useState("");

    function setToArray(data) {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
            let tempArr = []
            tempArr.push(data[i].id)
            tempArr.push(data[i].name)
            tempArr.push(data[i].email)
            tempArr.push(data[i].place.name)
            tempArr.push(new Date(data[i].birthdate).toISOString().slice(0, 10))
            arr.push(tempArr)
        }
        return arr;
    }

    const getVehicles = (page, searchParameter) => {
        axios.get(`${BASE_URL}/stores?permission=0&page=${page}${searchParameter !== undefined ? searchParameter : searchQuery}`, CONFIG).then((response) => {
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
            setPointOfSales(arr)
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
            axios.get(`${BASE_URL}/places`, CONFIG).then((response) => {
                    console.log(response.data.data)
                    setPlaces(response.data.data.elements)
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
        "Email",
        "Place",
        "Creation date"
    ]

    const names = [
        "id",
        "name",
        "email",
        "placeId",
        "birthdate"
    ]
    const inputTypes = [
        {
            name: "number",
        },
        {
            name: "text"
        },
        {
            name: "email"
        }
        ,
        {
            name: "select",
            mother: places
        },
        {
            name: "date"
        }
    ]
    const textValues =
        {
            ajouter: "Add a point of sale",
            modifier: "Modify a point of sale",
            supprimer: "Delete a point of sale",
            btnCreer: "Create",
        }
    const endpoint = "stores"
    const searchFormData = [
        {
            type: "select",
            name: "place.id",
            data: places,
            label: "Place"
        }
    ]
    const customEvent = {
        create: (data) => {
            console.log(data)
            data.password = "123456"
            data.permission = 0
            axios.post(`${BASE_URL}/stores`, data, CONFIG).then((response) => {
                    console.log(response.data.data)
                    Swal.fire({
                        icon: 'success',
                        title: 'Point of sale created',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                            window.location.reload()
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
        },
        update: (data, id) => {
            console.log(data)
            data.password = "123456"
            data.permission = 0
            axios.put(`${BASE_URL}/stores/${id}`, data, CONFIG).then((response) => {
                    console.log(response.data.data)
                    Swal.fire({
                        icon: 'success',
                        title: 'Point of sale updated',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                            window.location.reload()
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
    return (
        <>
            <Crud tableTitle={"Point of sales"} headers={headers} names={names} rows={pointOfSales}
                  textValues={textValues}
                  crud={true} page_description={"CRUD of point of sales"} endpoint={endpoint} inputTypes={inputTypes}
                  pagination={pagination} searchFormData={searchFormData} customEvent={customEvent}/>
        </>
    );
}