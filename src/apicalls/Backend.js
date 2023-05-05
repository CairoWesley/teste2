import axios from "axios";
import { useState } from "react";



export default async function CreatePaymentLink(url, obj) {

    const body = { "itens": obj.itens, "consultoras": obj.consultoras, "tipo": obj.tipo }


    const cliente =
        await fetch("http://localhost:8080/links", {
            method: "POST"
            , body: body
        })
    const client_data = await cliente.json()
    return client_data

}