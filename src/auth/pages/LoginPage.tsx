import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';


export const LoginPage = () => {

  const { login } = useContext( AuthContext );

  const [isLoading, setIsLoading] = useState(false);


  const { handleSubmit, errors, touched, getFieldProps } = useFormik({
    initialValues: {
        email: localStorage.getItem('email') || '',
        password: '',
        remember: false
    },
    onSubmit: async ( {email, password, remember } ) => {
      
      setIsLoading(true);

      console.log({email, password} );

      remember ? localStorage.setItem('email', email) : localStorage.removeItem('email');

      const status = await login(email, password);

      if ( !status ) {
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Credenciales incorrectas.'
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
        remember: Yup.boolean()
    })
  })


  return (
    <div className="p-5">
      
      <div className="mb-5">
        <h5>¡Qué gusto verte de nuevo!</h5>
        <p>Inicia sesión para continuar</p>
      </div>

      <div className="mb-5">
        <form noValidate onSubmit={ handleSubmit }>

          <div className="col-12 mb-2">
            <label>Correo electrónico</label>
            <input 
              type="text" 
              className="form-control"
              placeholder="ejemplo@ejemplo.com" 
              { ...getFieldProps('email') }
              />
            { touched.email && errors.email && <span className="text-danger"><small>{ errors.email }</small></span> }
          </div>


          <div className="col-12 mb-2">
            <label>Contraseña</label>
            <input 
              type="password" 
              className="form-control"
              placeholder="*******"
              { ...getFieldProps('password') }
              />
            { touched.password && errors.password && <span className="text-danger"><small>{ errors.password }</small></span> }
          </div>


          <div className="col-12 mt-4 mb-2">
            <button 
              className="btn btn-primary" 
              disabled={ isLoading }
              type='submit' >Iniciar sesión</button>
          </div>

        </form>
      </div>


      <p className="text-center">¿Aún no tienes una cuenta? <Link to="/auth/register">¡Registrarte ahora!</Link></p>

    </div>
  )
}
