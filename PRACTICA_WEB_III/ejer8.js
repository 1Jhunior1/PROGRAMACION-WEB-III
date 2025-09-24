function miFuncion(callback) {
    setTimeout(callback, 2000);
  }
  miFuncion(() => {
    console.log("Ejecutado después de 2 segundos");
  });
  