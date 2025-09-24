function miFuncion() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Éxito después de 3 segundos");
      }, 3000);
    });
  }
  miFuncion().then((mensaje) => console.log(mensaje));
  