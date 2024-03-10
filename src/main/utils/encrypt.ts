import crypto from 'crypto';

const algo = 'aes-256-cbc'

const getKeyBuffers = () => {
  const secret_buffer = Buffer.from(process.env.ENCRYPT_KEY as string, 'hex')
  const iv_buffer = Buffer.from(process.env.IV as string, 'hex')

  return [
    secret_buffer,
    iv_buffer
  ]
}

export const encrypt = (value: string): void => {
  const [secret_buffer, iv_buffer] = getKeyBuffers()  
  const cipher = crypto.createCipheriv(algo, 
    secret_buffer, iv_buffer);
    
    let encrypted = cipher.update(value, 'utf-8', 'hex');
    encrypted += cipher.final('hex')
    
    console.log("the encrypted", encrypted)

    const decString = decrypt(encrypted)
    console.log("the decrypted string", decString)
  }
  
  export const decrypt = (value: string): string => {
    const [secret_buffer, iv_buffer] = getKeyBuffers()

    const decipher = crypto.createDecipheriv(algo, secret_buffer, iv_buffer)

    let decryptedData = decipher.update(value, 'hex', 'utf-8');
    decryptedData += decipher.final('utf-8')

    return decryptedData
}