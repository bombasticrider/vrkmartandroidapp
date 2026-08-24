// MOCKED PhonePe payment integration

export async function initPayment(amount: number, merchantOrderId: string): Promise<{ qrCode: string; paymentUrl: string; transactionId: string }> {
  // In a real implementation, you would:
  // 1. Create a payload with amount, redirectUrl, callbackUrl, merchantId, transactionId
  // 2. Base64 encode the payload
  // 3. Generate X-VERIFY checksum: sha256(base64Payload + "/pg/v1/pay" + saltKey) + "###" + saltIndex
  // 4. Make a POST request to PhonePe's /pg/v1/pay API
  
  const transactionId = `TXN-${merchantOrderId}-${Date.now()}`;
  
  console.log(`[MOCK PHONEPE] Init payment for ${amount} INR, order: ${merchantOrderId}`);
  
  return {
    qrCode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=", // 1x1 mock transparent pixel
    paymentUrl: `https://mock-phonepe.example.com/pay/${transactionId}`,
    transactionId
  };
}

export async function checkPaymentStatus(transactionId: string): Promise<{ status: 'PENDING' | 'SUCCESS' | 'FAILED' }> {
  // In a real implementation, you would:
  // 1. Generate X-VERIFY checksum: sha256("/pg/v1/status/" + merchantId + "/" + transactionId + saltKey) + "###" + saltIndex
  // 2. Make a GET request to PhonePe's /pg/v1/status API
  
  console.log(`[MOCK PHONEPE] Check status for ${transactionId}`);
  
  // For mock purposes, we return PENDING. 
  // In a robust test environment, you could simulate success/failure based on the transactionId or request it to be provided.
  return { status: 'PENDING' };
}
