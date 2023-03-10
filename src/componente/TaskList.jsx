import { async } from '@firebase/util';
import React, { useState, useEffect } from 'react';
import { addNewTask, deleteTask, getTask, updateTask} from '../firebase/taskController';

const task = {
    title: 'Esta es la descripcion',
    description: 'Es la descripcion '

}
const TaskList = () => {
    // const [title, setTitle] = useState('');
    // const [descripcion, setDescripcion] = useState('');
    const [task, setTask] = useState({ title: '', description: '' });
    const [tasks, setTasks] = useState([]);
    const [mode, setMode] = useState('add');

    const createNewTask = async () => {
        //Funcion asincrona
        console.log(task);
        await addNewTask(task)
        setTask({ title: '', description: '' });
        initializeTasks();
    }
    const initializeTasks = () => {
        getTask()
            .then((t) => setTasks([...t]))
            .catch((e) => console.log(e));
    }

    const editTask = (id) => {
        setMode('update');
        const taskToEdit  = tasks.find(t => t.id === id);
        setTask({...taskToEdit});
    }

    const remoreTask = async (id) =>{
        await deleteTask(id);
        initializeTasks();
    }
    const updateExistingTask = async () => {
        await updateTask(task);
        setTask({ title: '', description: '' });
        initializeTasks();
        setMode('add');
    }

    useEffect(() => {
        initializeTasks();
    }, []);


    return (
        <div className='items-center px-50'>
            <h1 className='text-sky-700 font-semibold text-lg  '>TASKLIST</h1>
            <div className='flex flex-col gap-4 w-80'>
                <h2>Introduce una nueva tarea</h2>
                <input className='bg-gray-50 border shadow outline-none focus:ring ring-sky-500 rounded
                px-2' type='text'
                    value={task.title}
                    placeholder='Título'
                    onChange={(e) => setTask({ ...task, title: e.target.value })}
                />
                <textarea className='bg-gray-50 border shadow outline-none focus:ring ring-sky-500 rounded
                px-2'
                    type='text'
                    rows={3}
                    value={task.description}
                    placeholder='Descripción'
                    onChange={(e) => setTask({ ...task, description: e.target.value })}
                />
                <button className='bg-sky-500 rounded shadow py-1 hover:bg-sky-800 font-semibold transition'
                    onClick={() => mode ==='add'? addNewTask(): updateExistingTask() }
                > {mode === 'add' ? "Añadir" : "actualizar"}</button>
            </div>
            {/* <button
                onClick={getTask}
            >Obten Traeas</button> */}
            <div className='grid  grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
                {tasks.map((task) => (
                    <div key={task.id}
                        className='rounded-lg border border-sky-400 p-4 flex
                flex-col gap-2'>
                        <h1 className='font-semibold'>{task.title} </h1>
                        <div className='border-t border-sky-300'></div>
                        <p> {task.description}</p>
                        <div className='flex justify-between'>
                            <button className='bg-sky-400 text-white px-2 rounded'
                            onClick={() =>{editTask(task.id)}}
                            >Editar</button>
                            <button className='bg-red-600 text-white px-2 rounded'
                            onClick={() => window.confirm('¿Estas seguro de eliminar esta tarea?') && remoreTask(task.id)}
                            >Eliminar</button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default TaskList;
