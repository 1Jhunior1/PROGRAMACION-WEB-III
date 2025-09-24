function miFuncion(cadena) {
    let invertida = cadena.split("").reverse().join("");
    return cadena === invertida;
  }
  let band1 = miFuncion("oruro");
  let band2 = miFuncion("hola");
  console.log(band1, band2);
  