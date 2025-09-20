import React, { useState } from 'react';

function TodoApp() {
    const [tareas, establecerTareas] = useState([]);
    const [nuevaTareaTexto, establecerNuevaTarea] = useState('');
    const [filtroTareas, establecerFiltroTareas] = useState('todos');

    const agregarTarea = () => {
        if (nuevaTareaTexto.trim() === '') return;
        const nuevaTareaObjeto = {
            id: Date.now(),
            texto: nuevaTareaTexto,
            completada: false
        };
        establecerTareas([...tareas, nuevaTareaObjeto]);
        establecerNuevaTarea('');
    };

    const turnarCompletada = (id) => {
        const tareasActualizadas = tareas.map(tarea =>
            tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
        );
        establecerTareas(tareasActualizadas);
    };

    const eliminarTarea = (id) => {
        const tareasActualizadas = tareas.filter(tarea => tarea.id !== id);
        establecerTareas(tareasActualizadas);
    };

    const tareasFiltradas = tareas.filter(tarea => {
        if (filtroTareas === 'completadas') return tarea.completada;
        if (filtroTareas === 'pendientes') return !tarea.completada;
        return true;
    });

return (
    <div>
        <h1>Lista de Pendientes</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}> {}
            <input
                type="text"
                value={nuevaTareaTexto}
                onChange={(e) => establecerNuevaTarea(e.target.value)}
                
            />
            <button onClick={agregarTarea}>Agregar</button>
            <button onClick={() => establecerFiltroTareas('todos')}>Todas</button>
            <button onClick={() => establecerFiltroTareas('completadas')}>Completadas</button>
            <button onClick={() => establecerFiltroTareas('pendientes')}>Pendientes</button>
        </div>
        <ul>
            {tareasFiltradas.map(tarea => (
                <li key={tarea.id}>
                    <input
                        type="checkbox"
                        checked={tarea.completada}
                        onChange={() => turnarCompletada(tarea.id)}
                    />
                    {tarea.texto}
                    <button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
                </li>
            ))}
        </ul>
    </div>
);
}; 

export default TodoApp;