import React from 'react';
import { MercadoPagoConfig, Payment } from 'mercadopago';

export default function Checkout() {
    // Step 1: Initialize the Mercado Pago client
    const client = new MercadoPagoConfig({ 
        accessToken: 'TEST-3149519071662225-110421-82693ef6f794b3e47af943b37dc39f95-491988103', 
        options: { 
            timeout: 5000, 
            idempotencyKey: 'abc' 
        } 
    });

    // Step 2: Initialize the Payment object
    const payment = new Payment(client);

    // Step 3: Create the request object
    const body = {
        transaction_amount: 12.34,
        description: 'teste api PIX',
        payment_method_id: 'pix',
        payer: {
            email: 'leandrocaardozo@gmail.com'
        },
    };

    return (
        <div>
            <h1>Pagamento</h1>

        </div>
    );
}
