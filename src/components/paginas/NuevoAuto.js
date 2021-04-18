import React from 'react';
import { useFormik } from "formik";
import * as Yup from 'yup';

import { useNavigate } from 'react-router-dom';

import AutoService from "../../services/AutoService";

const NuevoAuto = () => {

    //Hook para redireccionar
    const navigate = useNavigate();

    //validacion y leer los datos del formulario
    const formik = useFormik({
        initialValues:{
            placa: '',
            marca: '',
            modelo: '',
            chasis: '',
        },
        validationSchema: Yup.object({
            placa: Yup.string()
                .min(6, 'El ingreso de la placa debe tener mínimo 6 caracteres')
                .max(7, 'El ingreso de la de placa debe tener máximo menos 7 caracteres')
                .matches(/^([A-Z a-z]){3}([0-9]){3,4}$/, "El ingreso de la placa tiene un formato no válido")
                .required('El ingreso de la placa es obligatorio'),
            marca: Yup.string()
                .min(3, 'El nombre de la marca debe tener mínimo 3 caracteres')
                .required('El nombre de la marca es obligatorio'),
            modelo: Yup.string()
                .min(2, 'El nombre del modelo debe tener mínimo 2 caracteres')
                .required('El nombre del modelo es obligatorio'),
            chasis: Yup.string()
                .min(17, 'El número de chasis es de 17 caracteres')
                .max(17, 'El número de chasis es de 17 caracteres')
                .required('El número de chasis es obligatorio'),

        }),
        onSubmit: auto => {
            try {
                console.log(auto)
                AutoService.create(auto)
                //Redireccionar
                navigate('/');
            } catch (error) {
                console.log(error)
            }
        }
    })

    return ( 
        <>
            <h1 className="text-3xl font-light mb-4">Nuevo Carro</h1>

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
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="marca">Marca <span className="text-red-500">*</span></label>                            
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="marca"
                                type="text"
                                placeholder="Audi"
                                style={{ textTransform: 'initial' }}
                                value={formik.values.marca}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.marca && formik.errors.marca ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p className="font-bold">Campo Obligatorio</p>
                                <p>{formik.errors.marca}</p>
                            </div>
                        ): null}

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="modelo">Modelo <span className="text-red-500">*</span></label>                            
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="modelo"
                                type="text"
                                placeholder="124 Spider"
                                style={{ textTransform: 'initial' }}
                                value={formik.values.modelo}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.modelo && formik.errors.modelo ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p className="font-bold">Campo Obligatorio</p>
                                <p>{formik.errors.modelo}</p>
                            </div>
                        ): null}

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="chasis">Chasis <span className="text-red-500">*</span></label>                            
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="chasis"
                                type="text"
                                style={{ textTransform: 'uppercase' }}
                                placeholder="1HGBH41JXMN109186"
                                value={formik.values.chasis}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.chasis && formik.errors.chasis ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p className="font-bold">Campo Obligatorio</p>
                                <p>{formik.errors.chasis}</p>
                            </div>
                        ): null}
                       
                        

                        <input 
                            type="submit"
                            className="bg-gray-800 hover:bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold"
                            value="Guardar"
                        />

                    </form>
                </div>
            </div>
        </>
     );
}
 
export default NuevoAuto;