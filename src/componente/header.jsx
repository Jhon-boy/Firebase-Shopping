import React, { useContext } from 'react';
import { BsFire } from 'react-icons/bs'
import { AppContext } from '../App';
import { getAuth, signOut } from "firebase/auth";
import { toast } from 'react-hot-toast';

 

const Header = () => {
    const auth = getAuth();
    const { setRoute, user, setUser} = useContext(AppContext);
    
    const   HazLogOut = () =>{
        signOut(auth)
        .then(() => {
            setRoute('Login');
            setUser(null);
            toast('Sesion finalizado');
          }).catch((error) => {
            console.log(error);
          });
    }
    return (
        <header className="h-20 w-full bg-gray-100 shadow-lg flex items-center justify-between px-8">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setRoute('Home')}>
                <BsFire className="text-2xl font-semibold text-pink-600" />
                <span className='text-3xl  font-bold text-sky-800'>John's Team</span>
            </div>
            <div className='flex gap-2'>
                {user ? (
                   <button onClick={HazLogOut}>Salir</button>
                ) :
                    <>
                        <button className="bg-sky-500 text-white py-1 px-3 rounded-full hover:bg-sky-800 transition"
                            onClick={() => setRoute("Login")}
                        >Login</button>
                        <button onClick={() => setRoute('Register')}>..o Registrate</button>

                    </>
                } </div>

        </header>
    );
}

export default Header;
