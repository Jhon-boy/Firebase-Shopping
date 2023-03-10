import React, { useState, useContext } from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-hot-toast';
import { AppContext } from '../App';




const provider = new GoogleAuthProvider();
const auth = getAuth();

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { setRoute, setUser} = useContext(AppContext);
    const hazLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                console.log('Token: ', token);
                console.log('user', user);
                toast('Bienvenido:' ,email)
                setUser(user);
                setRoute('Home');
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }
    const hazLoginconEmail = e => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
                toast('Bienvenido:' ,email)
                setUser(user);
                setRoute('Home');
            })
            .catch((error) => {
            console.log(error);
            });
    }
    return (
        <div>
            <h1 className='text-xl font-semibold text-sky-700 mb-8 '>Este es el Login </h1>
            <div className='flex flex-col items-center'>
                <form onSubmit={hazLoginconEmail} className='flex flex-col gap-2 max-w-sm'>
                    <input className='border border-gray-400 rounded py-1 px-2 outline-none' type='email' onChange={e => setEmail(e.target.value)} />
                    <input className='border border-gray-400 rounded py-1 px-2 outline-none' type='text' onChange={e => setPassword(e.target.value)} />
                    <button className='bg-sky-700 py-1 rounded shadow text-white'>Inicia Sesion</button>

                </form>
                <button onClick={hazLogin}>Inicia con Google</button>
            </div>

        </div>
    );
}

export default Login;
