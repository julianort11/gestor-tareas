import inquirer from 'inquirer';
import lodash from 'lodash';
import { leerArchivos, guardarTareas } from "../utils/archivo.js";

export async function agregarTarea() {
  const { descripcion } = await inquirer.prompt([
    {
      type: 'input',
      name: 'descripcion',
      message: 'Descripción de la tarea:'
    }
  ]);

   const desc = descripcion.trim();

  if (lodash.isEmpty(descripcion.trim())) {
    console.log("La descripción no puede estar vacía.");
    return;
  }

  const tareas = await leerArchivos();

  const yaExiste = tareas.some(t => t.descripcion.toLowerCase() === desc.toLowerCase());

  if (yaExiste) {
    console.log("⚠️ Ya existe una tarea con esa descripción.");
    return;
  }

  const nueva = {
    id: Date.now(),
    descripcion: descripcion.trim(),
    completada: false
  };

  const tareasActualizadas = lodash.uniqBy([...tareas, nueva], "descripcion");
  await guardarTareas(tareasActualizadas);
  console.log('✅ Tarea agregada.');
}

export async function listarTareas() {
  const tareas = await leerArchivos();

  if (tareas.length === 0) {
    console.log('📭 No hay tareas registradas.');
    return;
  }

  const ordenadas = lodash.orderBy(tareas, ["completada", "descripcion"], ["asc", "asc"]);

  console.log('\n📋 Lista de tareas:');
  ordenadas.forEach((tarea, i) => {
    const estado = tarea.completada ? '✅' : '❌';
    console.log(`${i + 1}. [${estado}] ${tarea.descripcion}`);
  });
}

export async function editarTarea() {
  const tareas = await leerArchivos();

  if (tareas.length === 0) return console.log('⚠️ No hay tareas para editar.');

  const { indice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'indice',
      message: 'Selecciona una tarea para editar:',
      choices: tareas.map((t, i) => ({
        name: t.descripcion,
        value: i
      }))
    }
  ]);

  const { nuevaDescripcion } = await inquirer.prompt([
    {
      type: 'input',
      name: 'nuevaDescripcion',
      message: 'Nueva descripción:'
    }
  ]);

  if (lodash.isEmpty(nuevaDescripcion.trim())) {
    console.log("La nueva descripción no puede estar vacía.");
    return;
  }

  tareas[indice].descripcion = nuevaDescripcion.trim();
  await guardarTareas(tareas);
  console.log('✏️ Tarea actualizada.');
}

export async function eliminarTarea() {
  const tareas = await leerArchivos();

  if (tareas.length === 0) return console.log('⚠️ No hay tareas para eliminar.');

  const { indice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'indice',
      message: 'Selecciona una tarea para eliminar:',
      choices: tareas.map((t, i) => ({
        name: t.descripcion,
        value: i
      }))
    }
  ]);

  const { confirmar } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirmar",
      message: "¿Estás seguro de eliminar esta tarea?",
      default: false
    }
  ]);

  if (!confirmar) return console.log("Eliminación cancelada.");

  tareas.splice(indice, 1);
  await guardarTareas(tareas);
  console.log('🗑️ Tarea eliminada.');
}

export async function completarTarea() {
  const tareas = await leerArchivos();

  if (tareas.length === 0) return console.log('No hay tareas para marcar como completadas.');

  const { indice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'indice',
      message: 'Selecciona una tarea para cambiar su estado:',
      choices: tareas.map((t, i) => ({
        name: `${t.descripcion} [${t.completada ? '✅' : '❌'}]`,
        value: i
      }))
    }
  ]);

  tareas[indice].completada = !tareas[indice].completada;
  await guardarTareas(tareas);

  console.log(`Estado cambiado: ${tareas[indice].descripcion} ahora está ${tareas[indice].completada ? '✅ completada' : '❌ pendiente'}`);
}