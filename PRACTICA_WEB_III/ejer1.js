function miFuncion(texto) {
    let vocales = { a: 0, e: 0, i: 0, o: 0, u: 0 };
    for (let letra of texto.toLowerCase()) {
      if (vocales.hasOwnProperty(letra)) {
        vocales[letra]++;
      }
    }
    return vocales;
  }
  
  // Ejemplo
  let obj1 = miFuncion("euforia");
  console.log(obj1); // { a: 1, e: 1, i: 1, o: 1, u: 1 }
  