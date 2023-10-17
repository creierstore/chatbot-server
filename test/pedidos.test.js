// Importa la función que deseas probar y cualquier otra dependencia necesaria
const { createPedido } = require('../src/controllers/pedidos.controller');

// Describe el conjunto de pruebas (test suite) usando describe
describe('Pruebas para la función crearPedido', () => {
  // Prueba 1: Verifica que se cree un pedido correctamente
  it('Debe crear un pedido con éxito', async () => {
    // Define los datos del cliente y del pedido
    // const clienteData = { name: 'Juan Vazquez', telephone: '32453464356' };
    const clienteData = { id: 5 };
    const pedidoData = { direccionEnvio: 'Km8', estado: 'Pendiente', clienteId: clienteData.id };
    const detallesData = [
      { cantidad: 3, precioUnitario: 15000, precioTotal: 45000 },
    ];

    // Llama a la función crearPedido y verifica que retorne un objeto de pedido válido
    const pedidoCreado = await createPedido(clienteData, pedidoData, detallesData);

    expect(pedidoCreado).toBeDefined(); // Asegura que se haya creado un pedido
    // expect(pedidoCreado.id).toBeDefined(); // Asegura que el pedido tenga un ID válido
    // expect(pedidoCreado.cliente).toEqual(clienteData.id); // Asegura que los datos del cliente sean correctos
    // expect(pedidoCreado.detalles).toEqual(detallesData.id); // Asegura que los detalles sean correctos
  });

  // // Prueba 2: Verifica que se maneje un error al crear un pedido con datos inválidos
  // it('Debe manejar un error al crear un pedido con datos inválidos', async () => {
  //   // Define datos inválidos para provocar un error
  //   const clienteData = { name: 'Nombre del Cliente' }; // Faltan datos necesarios para el pedido

  //   // Intenta crear un pedido con datos inválidos y verifica que se lance un error
  //   await expect(createPedido(clienteData, {}, [])).rejects.toThrow();
  // });
});
