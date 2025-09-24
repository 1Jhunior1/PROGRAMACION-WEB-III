async function flujo() {
    let m1 = await Promise.resolve("Inicio");
    console.log(m1);
    let m2 = await Promise.resolve("Paso 1");
    console.log(m2);
    let m3 = await Promise.resolve("Paso 2");
    console.log(m3);
  }
  flujo();
  