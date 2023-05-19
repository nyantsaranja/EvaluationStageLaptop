import axios from "axios";
import {BASE_URL, CONFIG} from "../service/Api-Call";
import Swal from "sweetalert2";
import {Crud} from "../mothercomponents/Crud";
import {useEffect, useState} from "react";

export const Screens = () => {
    const [screens, setScreens] = useState([]);
    const [screensAll, setScreensAll] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({});
    const [searchQuery, setSearchQuery] = useState("");

    function setToArray(data) {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
            let tempArr = []
            tempArr.push(data[i].id)
            tempArr.push(data[i].name)
            arr.push(tempArr)
        }
        return arr;
    }

    const getScreens = (page, searchParameter) => {
        axios.get(`${BASE_URL}/screens?page=${page}${searchParameter !== undefined ? searchParameter : searchQuery}`, CONFIG).then((response) => {
            console.log(response.data.data)
            const arr = setToArray(response.data.data.elements)
            const paginationObj = {
                pageNumber: (response.data.data.count / response.data.data.pageSize),
                currentIndex: response.data.data.page,
                event: getScreens,
                searchQuery: searchParameter !== undefined ? searchParameter : ""
            }
            setPage(response.data.data.page)
            setPagination(paginationObj)
            setScreens(arr)
            setSearchQuery(searchParameter !== undefined ? searchParameter : "")
        }).catch((error) => {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Désolé...',
                text: error.response.data.code + ': ' + error.response.data.message,
            })
        })
        axios.get(`${BASE_URL}/screens`, CONFIG).then((response) => {
                console.log(response.data.data)
                setScreensAll(response.data.data.elements)
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

    useEffect(() => {
            getScreens(page)
        }, []
    )
    const headers = [
        "ID",
        "Screen('')"
    ]

    const names = [
        "id",
        "name"
    ]
    const inputTypes = [
        {
            name: "number"
        },
        {
            name: "number",
            step: 0.01
        }
    ]
    const textValues =
        {
            ajouter: "Add a screen",
            modifier: "Modify a screen",
            supprimer: "Delete a screen",
            btnCreer: "Create",
        }
    const endpoint = "screens"
    const searchFormData = [
        {
            type: "select",
            name: "id",
            label: "Screen",
            data: screensAll,
            like:false
        }
    ]
    return (
        <>
            <Crud tableTitle={"Screens"} headers={headers} names={names} rows={screens} textValues={textValues}
                  crud={true} page_description={"CRUD of screen"} endpoint={endpoint} inputTypes={inputTypes}
                  pagination={pagination} searchFormData={searchFormData}/>
        </>
    );
}