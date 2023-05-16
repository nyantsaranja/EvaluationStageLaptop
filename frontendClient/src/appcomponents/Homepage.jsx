export const Homepage = () => {
    return (
        <>
            <div className="card" style={{width: "18rem"}}>
                <img src="/assets/img/avatars/products/product-1.jpg" className="card-img-top"
                     style={{objectFit: "cover", height: "300px"}} alt="Laptop Image"/>
                <div className="card-body">
                    <h5 className="card-title">Laptop Model</h5>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <strong>Spec 1:</strong> <span className="badge bg-primary rounded-pill">Value</span>
                        </li>
                        <li className="list-group-item">
                            <strong>Spec 2:</strong> <span className="badge bg-secondary rounded-pill">Value</span>
                        </li>
                        <li className="list-group-item">
                            <strong>Spec 3:</strong> <span className="badge bg-success rounded-pill">Value</span>
                        </li>
                    </ul>
                </div>
            </div>


        </>
    );
}