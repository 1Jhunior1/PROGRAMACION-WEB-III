function promesa() {
    return Promise.resolve("Hecho");
  }
  function usarComoCallback(cb) {
    promesa().then((res) => cb(res));
  }
  usarComoCallback((r) => console.log(r));
  