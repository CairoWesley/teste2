import React from "react";
import "./index.css"
import { useParams } from "react-router";




export const Checkout = () => {
    const teste = useParams()
    console.log(teste)

    return (
        <>

            <div className="container">

                <div className="wrapper-checkout">

                    <div className="bloco-checkout">





                    </div>

                </div>

            </div>


        </>

    )

}
