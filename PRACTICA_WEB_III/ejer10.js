setTimeout(() => {
    console.log("Ejemplo de callback");
  }, 1000);
  
  new Promise((resolve) => {
    resolve("Ejemplo de promesa");
  }).then((msg) => console.log(msg));
  