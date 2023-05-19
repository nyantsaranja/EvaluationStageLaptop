import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {LoginComponent} from "./mothercomponents/LoginComponent";
import {Inter} from "./mothercomponents/Inter";
import {Logout} from "./childcomponents/Logout";
import {Homepage} from "./appcomponents/Homepage";
import {Laptops} from "./appcomponents/Laptops";
import {Brands} from "./appcomponents/Brands";
import {Places} from "./appcomponents/Places";
import {Screens} from "./appcomponents/Screens";
import {Processors} from "./appcomponents/Processors";
import {PointsOfSale} from "./appcomponents/PointsOfSale";
import {Users} from "./appcomponents/Users";
import {AddLaptopToStock} from "./appcomponents/AddLaptopToStock";
import {Stock} from "./appcomponents/Stock";
import {SentLaptopBySalepoints} from "./appcomponents/SentLaptopBySalepoints";
import {Receipts} from "./appcomponents/Receipts";
import {ReceiptDetails} from "./appcomponents/ReceiptDetails";
import {ReturnedLaptops} from "./appcomponents/ReturnedLaptops";
import {SalePointStock} from "./appcomponents/SalePointStock";
import {Error} from "./childcomponents/Error";
import {LaptopReturnedConfirmation} from "./appcomponents/LaptopReturnedConfirmation";
import {SalesPerMonth} from "./appcomponents/SalesPerMonth";
import {SalesPerMonthPerSalePoint} from "./appcomponents/SalesPerMonthPerSalePoint";
import {ProfitPerMonth} from "./appcomponents/ProfitPerMonth";
import {SalesPerSalePoint} from "./appcomponents/SalesPerSalePoint";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/*Everyone*/}
                <Route path="/" element={<Inter/>}></Route>
                <Route path="/login/:role" element={<LoginComponent/>}></Route>
                <Route path="/logout" element={<Logout/>}></Route>
                <Route path="/logout" element={<Inter/>}></Route>
                {/*Admin*/}
                {
                    (
                        sessionStorage.getItem("role") === "sto" &&
                        <>
                            <Route path="/homepage" element={<Homepage/>}></Route>
                            <Route path="/laptops" element={<Laptops/>}></Route>
                            <Route path="/brands" element={<Brands/>}></Route>
                            <Route path="/places" element={<Places/>}></Route>
                            <Route path="/screens" element={<Screens/>}></Route>
                            <Route path="/processors" element={<Processors/>}></Route>
                            <Route path="/points-of-sales" element={<PointsOfSale/>}></Route>
                            <Route path="/users" element={<Users/>}></Route>
                            <Route path="/add-laptop-to-stock" element={<AddLaptopToStock/>}></Route>
                            <Route path="/stock" element={<Stock/>}></Route>
                            <Route path="/sent-laptop-by-salepoints" element={<SentLaptopBySalepoints/>}></Route>
                            <Route path="/returned-laptops" element={<ReturnedLaptops/>}></Route>
                            <Route path="/laptop-returned-confirmation/:movement_id" element={<LaptopReturnedConfirmation/>}></Route>
                            <Route path="/sales-per-month" element={<SalesPerMonth/>}></Route>
                            <Route path="/sales-per-month-per-salepoint" element={<SalesPerMonthPerSalePoint/>}></Route>
                            <Route path="/profit-per-month" element={<ProfitPerMonth/>}></Route>
                        </>
                    )
                }
                {/*Point of sale*/}
                {
                    (
                        sessionStorage.getItem("role") === "pos" &&
                        <>
                            <Route path="/receipts" element={<Receipts/>}></Route>
                            <Route path="/receipt-details/:movement_id" element={<ReceiptDetails/>}></Route>
                            <Route path="/salepoint-stock" element={<SalePointStock/>}></Route>
                            <Route path="/sales-per-sale-point" element={<SalesPerSalePoint/>}></Route>
                        </>
                    )
                }
                {/*Error*/}
                <Route path="*" element={<Error/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
