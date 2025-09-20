import React, { useState } from 'react';

interface Tarea {
id: number;
texto: string;
completada: boolean;
}

const TodoApp: React.FC = () => {
const [tareas, establecerTareas] = useState<Tarea[]>([]);
const [nuevaTareaTexto, establecerNuevaTarea] = useState<string>('');
const [filtroTareas, establecerFiltroTareas] = useState<'todos' | 'completadas' | 'pendientes'>('todos');

const agregarTarea = (): void => {
    if (nuevaTareaTexto.trim() === '') return;
    const nuevaTareaObjeto: Tarea = {
    id: Date.now(),
    texto: nuevaTareaTexto,
    completada: false,
    };
    establecerTareas([...tareas, nuevaTareaObjeto]);
    establecerNuevaTarea('');
};

const turnarCompletada = (id: number): void => {
    const tareasActualizadas: Tarea[] = tareas.map((tarea) =>
    tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
    );
    establecerTareas(tareasActualizadas);
};

const eliminarTarea = (id: number): void => {
    const tareasActualizadas: Tarea[] = tareas.filter((tarea) => tarea.id !== id);
    establecerTareas(tareasActualizadas);
};

const tareasFiltradas: Tarea[] = tareas.filter((tarea) => {
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
        {tareasFiltradas.map((tarea) => (
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