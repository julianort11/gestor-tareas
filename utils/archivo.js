import { readFile, writeFile } from "fs/promises";

const RUTA = "./data/tareas.json";

export async function leerArchivos() {
  try {
    const data = await readFile(RUTA, "utf-8");
    const tareas = JSON.parse(data);
    return Array.isArray(tareas) ? tareas : [];
  } catch (error) {
    return [];
  }
}

export async function guardarTareas(tareas) {
  if (!Array.isArray(tareas)) {
    console.log("Error: las tareas deben ser un array");
    return;
  }

  try {
    await writeFile(RUTA, JSON.stringify(tareas, null, 2));
  } catch (error) {
    console.log("Error al guardar:", error);
  }
}
