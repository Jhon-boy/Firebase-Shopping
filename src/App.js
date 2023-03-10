
import React , { useState, createContext} from 'react';
import Header from './componente/header';
import { app } from './firebase';
import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import { Toaster} from 'react-hot-toast'
import Shopping from './routes/Shopping';
import Footer from './componente/Footer';
import TaskList from './componente/TaskList';

export const AppContext = createContext(null); 

function App() {
  const [route, setRoute] = useState("Login");
  const [user, setUser] = useState(null);

    return (
      //Con este es posible gestionar desde cualquier parte del programa 
      <AppContext.Provider value={{route, setRoute, user, setUser}}>
      <Toaster />
      <Header />
      <main className="p-6">
      { route ==='Home' && <Home />}
     { route ==='Login' &&  <Login />  } 
     { route ==='Register' &&  <Register />  } 
     { route ==='Shopping' &&  <Shopping/>  } 
     { route ==='TaskList' &&  <TaskList/>  } 
     { user && <p>Usuario: {user.email}</p>}
      </main>
      <Footer />
    </AppContext.Provider>

  );
}

export default App;

    