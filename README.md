# Ordenes de servicios

# Pendientes

Crud
Estados de orden
Cliente - Orden
Orden - Pago

### Agregar detalles

// Puedes agregar más propiedades dependiendo de las necesidades del sistema

total?: number; // Total de la orden, puede ser calculado o proporcionado explícitamente
metodoPago?: string; // Método de pago (por ejemplo, "tarjeta", "efectivo", etc.)
direccionEnvio?: string; // Dirección de envío, si aplica
fechaEnvio?: string; // Fecha estimada o real de envío
productos?: Array<{ // Lista de productos o ítems en la orden
productoId: number; // Identificador del producto
cantidad: number; // Cantidad del producto
precioUnitario: number; // Precio unitario del producto
}>;

## init

npm init -y
npm install express cors dotenv
npm install typescript ts-node-dev @types/node @types/express @types/cors --save-dev

## Endpoints

- CreateOrder
- GetOrders
- GetOrder
- GetUserOrders

```json
[
   { "productId": 1, "name": "Laptop", "price": 1000, "quantity": 2 },
   { "productId": 2, "name": "Mouse", "price": 50, "quantity": 1 }
]
{ "id": 123, "name": "John Doe", "email": "john.doe@example.com" }
{
   "message": "Order created successfully",
   "order": {
     "id": 456,
     "address": "123 Main St",
     "phoneNumber": "123456789",
     "userId": 123,
     "clientName": "John Doe",
     "clientEmail": "john.doe@example.com",
     "amount": 2100
   },
   "client": { "id": 123, "name": "John Doe", "email": "john.doe@example.com" }
 }
```
