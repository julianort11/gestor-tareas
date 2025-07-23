import inquirer from 'inquirer';
import {
  agregarTarea,
  listarTareas,
  editarTarea,
  eliminarTarea,
  completarTarea // 👈 añadimos esta nueva función
} from './controllers/tareasController.js';

async function menu() {
  let salir = false;

  while (!salir) {
    const { opcion } = await inquirer.prompt([
      {
        type: 'list',
        name: 'opcion',
        message: 'Selecciona una opción:',
        choices: [
          { name: '1. Agregar tarea', value: 'agregar' },
          { name: '2. Listar tareas', value: 'listar' },
          { name: '3. Editar tarea', value: 'editar' },
          { name: '4. Eliminar tarea', value: 'eliminar' },
          { name: '5. Cambiar estado de tarea', value: 'cambiarEstado' }, // 👈 nueva opción
          { name: '0. Salir', value: 'salir' }
        ]
      }
    ]);

    switch (opcion) {
      case 'agregar':
        await agregarTarea();
        break;
      case 'listar':
        await listarTareas();
        break;
      case 'cambiarEstado':
        await completarTarea();
        break;
      case 'editar':
        await editarTarea();
        break;
      case 'eliminar':
        await eliminarTarea();
        break;
      case 'salir':
        salir = true;
        console.log('👋 Hasta luego!');
        break;
    }
  }
}

menu();
