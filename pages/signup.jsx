'use client'
import React, { useState } from "react";
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AuthContext } from '../components/AuthContext';
import styles from '../styles/Signup.module.css';

function Signup() {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [acepto, setAcepto] = useState(false);
    const [cuentaCreada, setCuentaCreada] = useState(false);
    const router = useRouter(); 
    const { login } = useContext(AuthContext);

    const manejoNombreUsuario = (event) => setNombreUsuario(event.target.value);
    const manejoContrasenia = (event) => setContrasenia(event.target.value);
    const manejoAcepto = (event) => setAcepto(event.target.checked);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!nombreUsuario || !contrasenia || !acepto) {
            alert('Por favor, complete todos los campos y acepte los términos y condiciones.');
            return;
        }
        localStorage.setItem("usuario", `usuario: ${nombreUsuario}`);
        localStorage.setItem("contrasenia", `contrasenia: ${contrasenia}`);
        localStorage.setItem("aceptoT", acepto ? 'Acepta Términos y Condiciones' : 'No acepta Términos y Condiciones');
        setCuentaCreada(true);
    };

    const manejoVolverHome = () => router.push('/login'); 

    return (
        <div className={styles.crearC}>
            {cuentaCreada ? (
                <div className={styles.mensajeExito}>
                    <h1>¡Cuenta creada exitosamente!</h1>
                    <button onClick={manejoVolverHome}>Volver a la página de inicio</button>
                </div>
            ) : (
                <div className={styles.crearC}>
                    <h1>Crea tu cuenta en TimeBank</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="nombreUsuario">Nombre de usuario</label>
                            <input
                                type="text"
                                id="nombreUsuario"
                                name="nombreUsuario"
                                placeholder="Cree un nombre de usuario"
                                value={nombreUsuario}
                                onChange={manejoNombreUsuario}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="contrasenia">Contraseña</label>
                            <input
                                type="password"
                                id="contrasenia"
                                name="contrasenia"
                                placeholder="Cree una contraseña"
                                value={contrasenia}
                                onChange={manejoContrasenia}
                                required
                            />
                        </div>
                        <div className={styles.acepto}>
                            <label>
                                <input
                                    type="checkbox"
                                    id="acepto"
                                    name="acepto"
                                    checked={acepto}
                                    onChange={manejoAcepto}
                                    required
                                /> <p>Acepto los términos y condiciones</p>
                            </label>
                        </div>
                        <button className={styles.botoncrear}type="submit">Crear cuenta</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Signup;
