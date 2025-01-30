import { rabbtimq } from "./rabbitmqService";

import { OrderDetail } from '../interfaces/orderDetailInterface';

enum API {
    "API-LIBRARY"
}


export const validateItems = async (api: string, items: OrderDetail[]) => {
    // const queue: string = api
    const queue: string = "API-LIBRARY"
    const response = await rabbtimq(queue, items)
    return response
}

/**
 * 
 * 
 * 
// Función para validar productos con personalización
export const validateProducts = async (productIds: OrderDetail[]): Promise<void> => {
    const message = { 
        type: 'product_validation', 
        productIds,
        // Otros campos específicos si es necesario
    };
    await sendMessage('library_validate', message);
};

// Función para obtener información del producto con personalización
export const getProductInfo = async (productId: string): Promise<void> => {
    const message = { 
        type: 'product_info', 
        productId,
        // Otros campos específicos si es necesario
    };
    await sendMessage('library_product_info', message);
};

*/