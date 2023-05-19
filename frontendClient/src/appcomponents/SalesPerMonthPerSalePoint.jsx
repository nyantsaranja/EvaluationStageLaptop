import axios from "axios";
import {BASE_URL, CONFIG} from "../service/Api-Call";
import Swal from "sweetalert2";
import {useEffect, useRef, useState} from "react";

export const SalesPerMonthPerSalePoint = () => {
    document.getElementById("page-description").innerText = "Sales per month per sale point";
    document.getElementById("createBtn").style.display = "none";
    const [salesPerMonthPerSalepoint, setSalesPerMonthPerSalepoint] = useState([]);
    const [salePoints, setSalePoints] = useState([]);
    useEffect(() => {
        getStat(1)

        axios.get(`${BASE_URL}/stores?permission=0`, CONFIG).then((response) => {
                console.log(response.data.data)
                setSalePoints(response.data.data.elements)
            }
        ).catch((error) => {
                console.log(error)
                Swal.fire({
                    icon: 'error',
                    title: 'Désolé...',
                    text: error.response.data.code + ': ' + error.response.data.message,
                })
            }
        )

    }, []);
    const salePointsRef = useRef(null);
    const [currentSeller, setCurrentSeller] = useState(null);
    const getStat = (salepointId) => {
        axios.get(`${BASE_URL}/v-sales-per-month-cross-sellers?seller.id=${salepointId}`, CONFIG).then((response) => {
            console.log(response.data.data)
            setSalesPerMonthPerSalepoint(response.data.data.elements)
            setCurrentSeller(salepointId)
        }).catch((error) => {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Désolé...',
                text: error.response.data.code + ': ' + error.response.data.message,
            })
        })
    }

    function convertToText(month) {
        let result = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        return result[month - 1]
    }

    function updateTable() {
        getStat(salePointsRef.current.value)
    }

    const pdf = () => {
      axios.get(`${BASE_URL}/v-sales-per-month-cross-sellers/pdf?seller.id=${currentSeller}`, CONFIG).then((response) => {
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
            <div className="d-flex justify-content-end">
                <button className="btn btn-danger btn-sm" onClick={() => {
                    pdf()
                }
                }>PDF
                </button>
            </div>
            <br/>
            <h5>Choose a sale point</h5>
            <br/>
            <select ref={salePointsRef} onChange={updateTable} className="form-select mb-3" data-choices>
                <option value="">Choose here</option>
                {
                    salePoints.map((salePoint, index) => {
                            return (
                                <option key={index} value={salePoint.id}>{salePoint.name}</option>
                            )
                        }
                    )
                }
                }
            </select>
            <br/>
            <table className="table table-sm table-nowrap">
                <thead>
                <tr>
                    <th scope="col">Month</th>
                    <th scope="col">Sales</th>
                    <th scope="col">Sale point</th>
                </tr>
                </thead>
                <tbody>
                {
                    salesPerMonthPerSalepoint.map((salePerMonth, index) => {
                            return (
                                <tr key={index}>
                                    <td>{convertToText(salePerMonth.month)}</td>
                                    <td>{salePerMonth.total} Ar</td>
                                    <td>{salePerMonth.seller.name}</td>
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