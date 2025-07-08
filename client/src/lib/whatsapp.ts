interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export function formatWhatsAppMessage(cart: CartItem[], storeName: string, total: number): string {
  let message = `*Novo Pedido - ${storeName}*\n\n`;
  
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    message += `${item.quantity}x ${item.name} - R$ ${itemTotal.toFixed(2).replace('.', ',')}\n`;
  });
  
  message += `\n*Total: R$ ${total.toFixed(2).replace('.', ',')}*\n\n`;
  message += 'Endereço para entrega:\n';
  message += '_Digite seu endereço aqui_\n\n';
  message += 'Forma de pagamento:\n';
  message += '_Selecione: PIX, Dinheiro ou Cartão_';
  
  return message;
}

export function formatPixMessage(pixKey: string, amount: number, storeName: string): string {
  return `Chave PIX para pagamento:\n\n*${pixKey}*\n\nValor: R$ ${amount.toFixed(2).replace('.', ',')}\n\n${storeName}`;
}

export function validateWhatsAppNumber(phone: string): boolean {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Check if it's a valid Brazilian phone number
  return cleaned.length >= 10 && cleaned.length <= 13;
}

export function formatWhatsAppNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  
  // Add country code if not present
  if (cleaned.length === 10 || cleaned.length === 11) {
    return `55${cleaned}`;
  }
  
  return cleaned;
}
