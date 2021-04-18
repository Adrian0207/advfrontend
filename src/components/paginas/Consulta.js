import React, {useState} from 'react';
import { useFormik } from "formik";
import * as Yup from 'yup';


import AutoService from "../../services/AutoService";
import ModalAviso from "../ui/ModalAviso";
import ModalRegistro from "../ui/ModalRegistro";

const Consulta = () => {

    const [ showModalAviso, setShowModalAviso] = useState(false);
    const [ showModalRegistro, setShowModalRegistro] = useState(false);


    const [auto, setAuto] = useState(null);
    const [fechaElejida, setFechaElejida] = useState(new Date())

    const today = new Date()
    const yesterday = new Date(today)

    
    function ModalChosse(){
        if(showModalAviso){
            return <ModalAviso showModal={showModalAviso} setShowModal={setShowModalAviso} auto={auto} dia={fechaElejida}/>
        }
        else if(showModalRegistro){
            return <ModalRegistro showModal={showModalRegistro} setShowModal={setShowModalRegistro}/>
        }
    }

    //validacion y leer los datos del formulario
    const formik = useFormik({
        initialValues:{
            placa: '',
            fecha: today.toISOString().split('T')[0],
            yesterday: yesterday.setDate(yesterday.getDate() - 1)
        },
        validationSchema: Yup.object({
            placa: Yup.string()
                .min(6, 'El ingreso de la placa debe tener mínimo 6 caracteres')
                .max(7, 'El ingreso de la placa debe tener máximo menos 7 caracteres')
                .matches(/^([A-Z a-z]){3}([0-9]){3,4}$/, "El ingreso de la placa tiene un formato no válido")
                .required('El ingreso de la placa es obligatorio'),
            fecha: Yup.date()
                .min(yesterday, 'La fecha no puede ser menor a la actual')
                .required('La fecha es obligatorio'),
        }),
        onSubmit: consulta => {
            try {
                setFechaElejida(consulta.fecha)
                AutoService.findByPlaca(consulta.placa)
                .then(response => {
                    if(!response.data || response.data.label === 0){
                        setShowModalRegistro(true)
                        setAuto(null)
                    }
                    else{
                        setAuto(response.data)
                        setShowModalAviso(true)
                    }  
                })
                formik.handleReset()
            } catch (error) {
                console.log(error)
            }
        },
        onReset:() =>{
            formik.initialValues.placa = ""
            formik.initialValues.fecha = today.toISOString().split('T')[0]
            formik.initialValues.yesterday = yesterday.setDate(yesterday.getDate() - 1)
        }
    })

    return ( 
        <>
            <h1 className="text-3xl font-light mb-4">Consulta</h1>
            <div className=" flex justify-center mt-10">
                <div className="w-full max-w-3xl">
                    <form
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="mb-4">

                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="placa">Placa <span className="text-red-500">*</span></label>                            
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="placa"
                                type="text"
                                style={{ textTransform: 'uppercase' }}
                                placeholder="AAA0001"
                                value={formik.values.placa}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.placa && formik.errors.placa ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p className="font-bold">Campo Obligatorio</p>
                                <p>{formik.errors.placa}</p>
                            </div>
                        ): null}                    

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha">Fecha <span className="text-red-500">*</span></label>                            
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="fecha"
                                type="date"
                                placeholder="Audi"
                                value={formik.values.fecha}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.fecha && formik.errors.fecha ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p className="font-bold">Campo Obligatorio</p>
                                <p>{formik.errors.fecha}</p>
                            </div>
                        ): null}   

                        <input 
                            type="submit"
                            className="bg-gray-800 hover:bg-gray-500 w-full mt-5 p-2 text-white uppercase font-bold"
                            value="Consultar"
                        />
                    </form>
                    {ModalChosse()}
                </div>                                      
            </div>
            
        </>
     );
}
 
export default Consulta;