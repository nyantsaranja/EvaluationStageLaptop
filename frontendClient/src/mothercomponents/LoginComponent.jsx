import {AuthentificationForm} from "../childcomponents/AuthentificationForm";
import axios from "axios";
import {BASE_URL} from "../service/Api-Call";
import Swal from "sweetalert2";
import {useParams} from "react-router-dom";

export const LoginComponent = () => {
    const {role} = useParams();
    console.log(role)
    const loginUrl = BASE_URL + "/entity/login";
    const connection = (email, password) => {
        console.log(email, password)
        const obj = {
            email: email,
            password: password
        }
        axios.post(loginUrl, obj).then((response) => {
                console.log(response.data)
                sessionStorage.setItem("entity_id", response.data.data.entity.id)
                localStorage.setItem("token", response.data.data.token)
                if (response.data.data.entity.permission === 0) {
                    window.location.href="homepage"
                }else{
                    window.location.href="homepage"
                }
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
    const parameters = {
        title: "Connexion",
        subtitle: "Se connecter comme un " + (role === "admin" ? "Magasin" : "Point de vente"),
        button: {
            value: "Se connecter"
        },
        event: connection,
        signupUrl: "/signup",
        imageUrl: "assets/img/covers/auction-bg1.jpg"
    }
    const inputs = [
        {
            label: "Email",
            type: "email",
            placeholder: "Entrez votre email",
            name: "email",
            className: "form-control myform",
            value: "ranja@gmail.com"
        },
        {
            label: "Mot de passe",
            type: "password",
            placeholder: "Entrez votre mot de passe",
            name: "password",
            className: "form-control myform",
            value: "ranja"
        }
    ]

    return (
        <AuthentificationForm parameters={parameters} inputs={inputs}/>
    )
}