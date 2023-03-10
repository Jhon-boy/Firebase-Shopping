import React ,{ useContext}from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-hot-toast';
import { AppContext } from '../App';

const auth = getAuth();

const Register = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { setRoute, setUser} = useContext(AppContext);

    const creaUsuario = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
                console.log(user)
                toast(`Usuario ${email} creado  correctamente`);
                setUser(user);
                setRoute('Home');

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });

    }
    const handleSubmit = e =>{
        e.preventDefault();
        creaUsuario()
    }
    return (
        <div className='flex flex-col gap-4 items-center'>
            <h1 className='text-sky-700 font-semibold text-center'>Registrate en la Aplicación</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-2 max-w-sm'>
                <input className='border border-gray-400 rounded py-1 px-2 outline-none' type='email' onChange={e => setEmail(e.target.value)}/>
                <input className='border border-gray-400 rounded py-1 px-2 outline-none' type='text' onChange={e => setPassword(e.target.value)}/>
                <button className='bg-sky-700 py-1 rounded shadow text-white'>Registrate</button>
            </form>

        </div>
    );
}

export default Register;
