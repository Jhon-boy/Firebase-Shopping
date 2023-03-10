// en este fichero crearemos todos los la logica de base de datos para las tas

import { db } from './index'
import { addDoc, collection , getDocs, setDoc, doc, deleteDoc } from "firebase/firestore";

// que es CRUD: create - Read - Update - Delete

export const addNewTask = async task =>{
    try {
        //Nombre de la base de datos + el objeto 
        await addDoc(collection(db, 'task'), task)
      } catch (e) {
        console.error("Error adding document: ", e);
      }

}
export const getTask = async () => {
    const querySnapshot = await getDocs(collection(db, 'task'));
    // console.log(querySnapshot);
    // querySnapshot.forEach(doc => {
    //     console.log(doc.id, ' => ', doc.data())
    // })

    const tasks = querySnapshot.docs.map(doc => {
        return { ...doc.data(), id: doc.id }
    })
    // console.log(tasks);
    return tasks;
}

export const updateTask= async (task) =>{
  await setDoc(doc(db, 'task', task.id) ,{
    title: task.title,
    description: task.description
  })
}

export const deleteTask = async (id) => {
  await deleteDoc(doc(db, 'task', id));
}