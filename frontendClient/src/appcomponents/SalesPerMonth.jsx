import {useEffect, useState} from "react";
import {BASE_URL, CONFIG} from "../service/Api-Call";
import axios from "axios";
import Swal from "sweetalert2";

export const SalesPerMonth = () => {
    document.getElementById("page-description").innerText = "Sales per month";
    document.getElementById("createBtn").style.display = "none";
    const [salesPerMonth, setSalesPerMonth] = useState([]);
    useEffect(() => {
        axios.get(`${BASE_URL}/v-sales-per-month-alls`, CONFIG).then((response) => {
            console.log(response.data.data)
            setSalesPerMonth(response.data.data.elements)
        }).catch((error) => {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Désolé...',
                text: error.response.data.code + ': ' + error.response.data.message,
            })
        })

    }, []);

    function convertToText(month) {
        let result=["January","February","March","April","May","June","July","August","September","October","November","December"]
        return result[month-1]
    }

    const pdf = () => {
      axios.get(`${BASE_URL}/v-sales-per-month-alls/pdf`, CONFIG).then((response) => {
            console.log(response.data.data)
        }).catch((error) => {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Désolé...',
                text: error.response.data.code + ': ' + error.response.data.message,
            })
        })
    }

    return (
        <>
            {/*pdf red button on top right*/}
            <div className="d-flex justify-content-end">
                <button className="btn btn-danger btn-sm" onClick={() => {
                    pdf()
                }
                }>PDF
                </button>
            </div>
            <br/>
            <table className="table table-sm table-nowrap">
                <thead>
                <tr>
                    <th scope="col">Month</th>
                    <th scope="col">Sales</th>
                </tr>
                </thead>
                <tbody>
                {
                    salesPerMonth.map((salePerMonth, index) => {
                        return (
                            <tr key={index}>
                                <td>{convertToText(salePerMonth.month)}</td>
                                <td>{salePerMonth.total} Ar</td>
                            </tr>
                        )
                    }
                    )
                }
                </tbody>
            </table>
        </>
    );
}