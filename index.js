import inquirer from 'inquirer';
import chalk from 'chalk';

import {
  agregarTarea,
  listarTareas,
  editarTarea,
  eliminarTarea,
  completarTarea
} from './controllers/tareasController.js';

async function menu() {
  let salir = false;

  console.clear();
  console.log(chalk.bgMagenta.bold.white('\n=== GESTOR DE TAREAS ===\n'));

  while (!salir) {
    const { opcion } = await inquirer.prompt([
      {
        type: 'list',
        name: 'opcion',
        message: chalk.cyanBright('Selecciona una opción:'),
        choices: [
          { name: chalk.green('1. Agregar tarea'), value: 'agregar' },
          { name: chalk.blue('2. Listar tareas'), value: 'listar' },
          { name: chalk.yellow('3. Editar tarea'), value: 'editar' },
          { name: chalk.red('4. Eliminar tarea'), value: 'eliminar' },
          { name: chalk.magenta('5. Cambiar estado de tarea'), value: 'cambiarEstado' },
          { name: chalk.gray('0. Salir'), value: 'salir' }
        ]
      }
    ]);

    console.log();

    switch (opcion) {
      case 'agregar':
        await agregarTarea();
        break;
      case 'listar':
        await listarTareas();
        break;
      case 'editar':
        await editarTarea();
        break;
      case 'eliminar':
        await eliminarTarea();
        break;
      case 'cambiarEstado':
        await completarTarea();
        break;
      case 'salir':
        salir = true;
        console.log(chalk.bgCyan.black('\n👋 Hasta luego!\n'));
        break;
    }

    if (!salir) {
      console.log(chalk.gray('\nPresiona ENTER para continuar...'));
      await inquirer.prompt([{ name: 'pause', message: '', type: 'input' }]);
      console.clear();
      console.log(chalk.bgMagenta.bold.white('\n=== GESTOR DE TAREAS ===\n'));
    }
  }
}

menu();
