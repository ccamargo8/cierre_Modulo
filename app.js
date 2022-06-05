let autos = require('./autos');

let concesionaria = {
  /* completar */
  autos: autos,

  buscarAuto: function (patente) {
    const data = autos.find((valor) => {
      return valor.patente == patente;
    });
    if (data != undefined) {
      return data;
    } else {
      return null;
    }
  },

  //Alternativa. Pero no devuelve null
  // buscarAuto2(patente) {
  //   const i = autos.filter((valor) => {
  //     return valor.patente == patente;
  //   });
  //   if (i != []) {
  //     return i;
  //   } else {
  //     return null;
  //   }
  // },

  venderAuto(patente) {
    let prueba = this.buscarAuto(patente);
    if (prueba != undefined) {
      prueba.vendido = true;
    }
  },

  autosParaLaVenta() {
    const result = this.autos.filter((item) => item.vendido == false);
    return result;
  },

  autosNuevos() {
    let disponibles = this.autosParaLaVenta();
    let kDisponibles = disponibles.filter((km) => km.km < 100);
    return kDisponibles;
  },
  listaDeVentas() {
    let lista = [];
    let resultado = this.autos.filter((item) => item.vendido == true);
    resultado.forEach(function (a) {
      lista.push(a.precio);
    });
    return lista;
  },

  totalDeVentas() {
    let ventas = this.listaDeVentas();
    let sum = ventas.reduce(function (acum, num) {
      return acum + num;
    }, 0);
    return sum;
  },

  puedeComprar: function (auto, persona) {
    return (
      auto.precio <= persona.capacidadDePagoTotal &&
      auto.precio / auto.cuotas <= persona.capacidadDePagoEnCuotas
    );
  },

  autosQuePuedeComprar(persona) {
    let disponibles = this.autosParaLaVenta();
    let lista = [];
    for (let i = 0; i < disponibles.length; i++) {
      if (this.puedeComprar(disponibles[i], persona) == true) {
        lista.push(disponibles[i]);
      }
    }
    return lista;
  },
};

const juan = {
  nombre: 'Juan',
  capacidadDePagoEnCuotas: 3000000,
  capacidadDePagoTotal: 100000000,
};

// const auto = {
//   marca: 'Ford Fiesta',
//   modelo: 2019,
//   color: 'Azul',
//   anio: 2019,
//   km: 200,
//   precio: 150000,
//   cuotas: 12,
//   patente: 'APL123',
//   vendido: false,
// };

console.log(concesionaria.autosQuePuedeComprar(juan));

// console.log(concesionaria.autosNuevos());
