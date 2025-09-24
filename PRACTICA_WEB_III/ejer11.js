function paso1() { return Promise.resolve("Paso 1"); }
function paso2() { return Promise.resolve("Paso 2"); }
function paso3() { return Promise.resolve("Paso 3"); }

paso1()
  .then((res) => { console.log(res); return paso2(); })
  .then((res) => { console.log(res); return paso3(); })
  .then((res) => console.log(res));
