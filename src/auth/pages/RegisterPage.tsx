

import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { AuthContext } from '../context/AuthContext';


export const RegisterPage = () => {

  const { register } = useContext( AuthContext );

  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, errors, touched, getFieldProps } = useFormik({
    initialValues: {
        email: '',
        password: '',
        fullName: ''
    },
    onSubmit: async ( {email, password, fullName} ) => {

      setIsLoading(true);

      console.log({email, password, fullName} );


      const resp = await register(fullName, email, password);

      if ( !resp.status ) {
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: `${ resp.message }`
        })
      }

      setIsLoading(false);

    },
    validationSchema: Yup.object({
        email: Yup.string()
          .email('Correo electrónico no válido.')
          .required('El correo electrónico es requerido.'),
        password: Yup.string()
          .min( 6, 'Mínimo 6 carácteres.')
          .required('La contraseña es requerida.'),
        fullName: Yup.string()
          .required('El nombre es requerido.')
    })
  })


  return (
    <div className="p-5">
      
      <div className="mb-4">
        <h5>¡Encantado de conocerte!</h5>
        <p>Registrate para continuar</p>
      </div>

      <div className="mb-4">
        <form noValidate onSubmit={ handleSubmit }>

          <div className="col-12 mb-2">
            <label>Nombre(s)</label>
            <input 
              type="text" 
              className="form-control"
              placeholder="Marianito Olivas" 
              { ...getFieldProps('fullName') }/>
            { touched.fullName && errors.fullName && <span className="text-danger"><small>{ errors.fullName }</small></span> }
          </div>

          <div className="col-12 mb-2">
            <label>Correo electrónico</label>
            <input 
              type="text" 
              className="form-control"
              placeholder="ejemplo@ejemplo.com"
              { ...getFieldProps('email') } />
            { touched.email && errors.email && <span className="text-danger"><small>{ errors.email }</small></span> }
          </div>


          <div className="col-12 mb-2">
            <label>Contraseña</label>
            <input 
              type="password" 
              className="form-control"
              placeholder="*******"
              { ...getFieldProps('password') } />
            { touched.password && errors.password && <span className="text-danger"><small>{ errors.password }</small></span> }
          </div>


          <div className="col-12 mt-4 mb-2">
            <button 
              type='submit' 
              disabled={ isLoading }
              className="btn btn-primary">Registrarme</button>
          </div>

        </form>
      </div>


      <p className="text-center">¿Ya tienes una cuenta? <Link to="/auth/login">¡Inicia sesión ahora!</Link></p>

    </div>
  )
}
