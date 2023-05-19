import axios from "axios";
import {BASE_URL, CONFIG} from "../service/Api-Call";
import Swal from "sweetalert2";
import {Crud} from "../mothercomponents/Crud";
import {useEffect, useState} from "react";

export const Brands = () => {
    const [laptops, setLaptops] = useState([]);
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

    const getBrands = (page, searchParameter) => {
        axios.get(`${BASE_URL}/brands?page=${page}${searchParameter !== undefined ? searchParameter : searchQuery}`, CONFIG).then((response) => {
            console.log(response.data.data)
            const arr = setToArray(response.data.data.elements)
            const paginationObj = {
                pageNumber: (response.data.data.count / response.data.data.pageSize),
                currentIndex: response.data.data.page,
                event: getBrands,
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
            getBrands(page)
        }, []
    )
    const headers = [
        "ID",
        "Brand"
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
            name: "text"
        }
    ]
    const textValues =
        {
            ajouter: "Add a brand",
            modifier: "Modify a brand",
            supprimer: "Delete a brand",
            btnCreer: "Create",
        }
    const endpoint = "brands"
    const searchFormData = [
        {
            type: "text",
            name: "name",
            label: "Brand",
            like:true
        }
    ]
    return (
        <>
            <Crud tableTitle={"Brands"} headers={headers} names={names} rows={laptops} textValues={textValues}
              crud={true} page_description={"CRUD of Brand"} endpoint={endpoint} inputTypes={inputTypes}
              pagination={pagination} searchFormData={searchFormData}/>
        </>
    );
}