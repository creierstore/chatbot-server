
const axios = require('axios');
const { getClienteByTelephone } = require('../../src/services/cliente.service');

jest.mock('axios'); // Mockear axios para simular solicitudes HTTP


describe('getClienteByTelephone', () => {
    it('debería retornar los datos del cliente si la solicitud es exitosa', async () => {
      const mockResponse = 
      {
        "id": 5,
        "name": "Isaac",
        "telephone": "595975174920",
        "createdAt": "2023-10-19T18:48:43.526Z",
        "updatedAt": "2023-10-19T18:48:43.526Z"
    }
  
      axios.get.mockResolvedValue(mockResponse);
  
      const result = await getClienteByTelephone('595975174920');

      console.log({result});
  
      expect(result).toEqual(mockResponse.data);
    });
  
    // it('debería retornar null si el cliente no se encuentra (estatus 404)', async () => {
    //   const mockResponse = {
    //     status: 404,
    //   };
  
    //   axios.get.mockResolvedValue(mockResponse);
  
    //   const result = await getClienteByTelephone('número de teléfono');
  
    //   expect(result).toBeNull();
    // });
  
    // it('debería lanzar un error si la solicitud no es exitosa', async () => {
    //   const mockResponse = {
    //     status: 500, // Por ejemplo, un error interno del servidor
    //     data: 'Mensaje de error',
    //   };
  
    //   axios.get.mockRejectedValue(mockResponse);
  
    //   try {
    //     await getClienteByTelephone('número de teléfono');
    //   } catch (error) {
    //     expect(error).toEqual(new Error('Error 3 al buscar el cliente'));
    //   }
    // });
  
    // it('debería manejar errores de red', async () => {
    //   axios.get.mockRejectedValue(new Error('Error de red'));
  
    //   try {
    //     await getClienteByTelephone('número de teléfono');
    //   } catch (error) {
    //     expect(error).toEqual(new Error('Error 2 al buscar el cliente: Error de red'));
    //   }
    // });
  });