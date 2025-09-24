function promesaTarea(msg) {
    return new Promise((resolve) => {
      setTimeout(() => { console.log(msg); resolve(); }, 500);
    });
  }
  
  async function ejecutar() {
    await promesaTarea("Tarea 1");
    await promesaTarea("Tarea 2");
    await promesaTarea("Tarea 3");
    console.log("Fin con async/await");
  }
  ejecutar();
  