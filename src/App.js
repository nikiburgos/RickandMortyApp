import './App.css'
import React from 'react'
import Cards from './components/Cards/Cards.jsx'
import styles from './components/Home/Title.module.css'
import Nav from './components/Nav/Nav'
import style from './components/Home/Bienvenido.module.css'
import {useState, useEffect} from 'react'
import {Routes, Route} from 'react-router-dom'
import About from './components/About/About'
import Detail from './components/Detail/Detail'
import {useLocation, useNavigate} from 'react-router-dom'
import Form from './components/Form/Form';
import Favorites from './components/Favorites/Favorites'



function App () {
  const [characters,setCharacters] = useState([])
  const location= useLocation();
  const navigate = useNavigate();
  const [access, setAccess] = useState(false);


  const username= "nburgosvega@gmail.com";
  const password= "123asd";

  const login =(userData)  => {
    if(userData.username === username && userData.password === password){
      setAccess(true)
      navigate("/home");
    }
}

useEffect(() => {
!access && navigate('/')
}, [access])



//   function onSearch(character) {
//     fetch(`https://localhosto:3001/rickandmorty/character/${character}`)
//        .then((response) => response.json())
//        .then((data) => {
//           if (data.name) {
//              const alreadyExists = characters.some(char => char.id === data.id);
//              if (!alreadyExists) {
//                 setCharacters((oldChars) => [...oldChars, data]);
//              } else {
//                 window.alert(`El personaje "${data.name}" ya ha sido agregado`);
//              }
//           } else {
//              window.alert('No hay personajes con ese ID');
//           }
//        });
//  }

function onSearch(character) {
   fetch(`http://localhost:3001/rickandmorty/character/${character}`)
     .then((response) => response.json())
     .then((data) => {
       
         const alreadyExists = characters.some((char) => char.id === data.id);
         if (!alreadyExists) {
           setCharacters((oldChars) => [...oldChars, data]);
         } else {
           window.alert(`El personaje ${data.name} ya ha sido agregado.`);
         }
       
     })
     .catch((error) => {
       console.error(error);
       window.alert("Hubo un error al buscar el personaje.");
     });
 }

 function onClose (id) {
  setCharacters (characters.filter(personaje => personaje.id !== id))
  }

  return (
   <div className={style.Bienvenido}>
      <h1 className={styles.title}>RICK & MORTY</h1>
      {location.pathname === '/' ? <Form login={login}/> : <Nav onSearch={onSearch}/>}
      
      <Routes>
         <Route path= "/home" element={<Cards characters={characters} onClose={onClose}/>}/>
         <Route path= "/about" element={<About />}/>
         <Route path= "/detail/:id" element={<Detail/>}/>
         <Route path= "/favorites" element={<Favorites/>}/>
      </Routes>
    </div>
  )
}

export default App;
