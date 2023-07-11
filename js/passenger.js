export function isDestiny(country, passenger, selectPort) {
  const matchDestination = passenger.destino_pais == country;
  const matchPort =
    selectPort === "all" || passenger.porto_embarque === selectPort;

  return matchDestination && matchPort;
}
