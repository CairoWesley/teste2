import React, { useRef } from "react";
import Select from 'react-select'
import { useState } from 'react';
import makeAnimated from "react-select/animated"
import { programas_consultoras, programas_nutris, vendedor_tipo, programas_personais } from '../../programas'
import "./index.css"
import CreatableSelect from 'react-select/creatable';
import { CSVLink } from 'react-csv';
import axios from "axios";



const animatedComponents = makeAnimated()
export const Multiselect = () => {

    const [Tipo_vendedor, setTipo_vendedor] = useState({ "value": "", "label": "" })
    const [programas, setProgramas] = useState([])
    const [disabledlist, setdisabledlist] = useState(true)
    const [SelectedPrograms, setSelectedPrograms] = useState([])
    const [labelVendedor, setLabelVendedor] = useState(`Primeiro escolha o Tipo de Vendedor`)
    const [StatusLabelVendedor, setStatusLabelVendedor] = useState(true)
    const [selectedsdr, setselectedsdr] = useState([])
    const [linksCriados, setLinksCriados] = useState([])
    const [ExportButtonVisible, setExportButtonVisible] = useState(true)
    const [disabledButton, setdisabledButton] = useState(false)
    const [statusLink, setstatusLink] = useState(true)
    const [lockButton, setlockButton] = useState(false)
    const [statusTutorial, setStatusTutorial] = useState(true)


    let selectedRefProgramas = null;

    let selectedRefConsultoras = null

    let clearValue = () => {
        selectedRefProgramas.clearValue();

    };
    const HandleChange = (item) => {
        if (item.value === "Consultor(a)" || item.value === "Atendente" || item.value === "Médico" ||item.value === "Secretária" ) {
            clearValue()
            setTipo_vendedor(item)
            setProgramas(programas_consultoras)
            setdisabledlist(false)
            setStatusLabelVendedor(false)
            setLabelVendedor(`Agora informe o Nome da ${item.value} e aperte Enter`)
        }
        if (item.value === "Personal") {
            clearValue()
            setTipo_vendedor(item)
            setProgramas(programas_personais)
            setdisabledlist(false)
            setStatusLabelVendedor(false)
            setLabelVendedor(`Agora informe o Nome da ${item.value} e aperte Enter`)
        }
        if (item.value === "Nutricionista") {
            clearValue()
            setTipo_vendedor(item)
            setProgramas(programas_nutris)
            setdisabledlist(false)
            setStatusLabelVendedor(false)
            setLabelVendedor(`Agora informe o Nome da ${item.value} e aperte Enter`)
        }
    }

    const Console = async () => {
        setExportButtonVisible(true)
        setdisabledButton(true)
        setstatusLink(false)
        setlockButton(true)

        const body = { "itens": SelectedPrograms, "consultoras": selectedsdr, "tipo": Tipo_vendedor.value }
        console.log(body)

        const cliente = await axios.post("http://drtigretech.com.br:8080/links", body).then(
            (element) => {
                console.log(element)
                console.log(element.data)
                setLinksCriados(element.data)
                setExportButtonVisible(false)
                setstatusLink(true)
                setlockButton(false)
                setStatusTutorial(false)
            }
        )


    }



    return (
        <>
            <div className="wrapper">


                <div className="bloco">
                    <a>Criação de Links - Programas Dr Tigre</a>

                    <Select options={vendedor_tipo} className="select" onChange={(item) => HandleChange(item)} placeholder="Informe o tipo do vendedor" />
                    <CreatableSelect
                        isClearable className="select"
                        placeholder={labelVendedor}
                        isDisabled={StatusLabelVendedor}
                        isMulti
                        isSearchable={true}
                        closeMenuOnSelect={false}
                        onChange={(item) => setselectedsdr(item)}
                        backspaceRemovesValue={true} />

                    <Select className="select"
                        options={programas}
                        placeholder="Escolha os programas"
                        components={animatedComponents}
                        isMulti
                        isClearable={true}
                        isSearchable={true}
                        closeMenuOnSelect={false}
                        isDisabled={disabledlist}
                        tabSelectsValue={true}
                        backspaceRemovesValue={true}
                        onChange={(item) => setSelectedPrograms(item)}
                        ref={ref => {
                            selectedRefProgramas = ref;

                        }}

                    />
                    <button onClick={Console} label="teste" className="button" disabled={lockButton}> Criar Links</button>
                    <label hidden={statusLink}>
                        Aguarde... Estamos gerando os links de pagamento</label>
                    <label hidden={ExportButtonVisible}>
                        Clique abaixo para exportar os Links em Excel</label>
                    <CSVLink hidden={ExportButtonVisible} data={linksCriados} filename="RegisterUserData" className="btn btn-success mb-3" disabled={disabledButton}>Exportar Links para excel</CSVLink>
                    <label hidden={statusTutorial} className="tutorial">Segue o Passo a Passo de Como Fazer a importação do Arquivo com os Links Criados para uma Planilha no Google Planilhas</label>
                    <label hidden={statusTutorial} className="tutorial">Abra uma planilha nova ou que já tenha informação no seu google Sheets e clique em "Arquivo"</label>
                    <img src={require("./imgs/sheets.png")} alt="logo" hidden={statusTutorial} className="tutorial"/>
                    <label hidden={statusTutorial} className="tutorial">Após isso clique em Importar</label>
                    <img src={require("./imgs/importar.png")} alt="logo" hidden={statusTutorial} className="tutorial"/>
                    <label hidden={statusTutorial} className="tutorial">Vai aparecer uma caixa para você escolher o arquivo, clique em fazer upload</label>
                    <img src={require("./imgs/fazerupload.png")} alt="logo" hidden={statusTutorial} className="tutorial"/>
                    <label hidden={statusTutorial} className="tutorial">Escolha o Arquivo que você acabou de baixar</label>
                    <img src={require("./imgs/pasta.png")} alt="logo" hidden={statusTutorial} className="tutorial"/>
                    <label hidden={statusTutorial} className="tutorial">Mude as opções "Importar local" para "Inserir novas Paginas" como a imagem abaixo mostra</label>
                    <img src={require("./imgs/importardados.png")} alt="logo" hidden={statusTutorial} className="tutorial" />
                    <label hidden={statusTutorial} className="tutorial">Tudo deve estar já pronto para você vender!</label>
                    <img src={require("./imgs/importado.png")} alt="logo" hidden={statusTutorial} className="tutorial"/>
                </div>

            </div>

        </>
    )

}
