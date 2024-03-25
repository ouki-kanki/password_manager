import crypto from 'crypto';

const algo = 'aes-256-cbc'

/**
 * createCipheriv needs the buffers
 * @returns 
 */
const getKeyBuffers = (): Buffer[] => {
  const secret_buffer = Buffer.from(process.env.ENCRYPT_KEY as string, 'hex')
  const iv_buffer = Buffer.from(process.env.IV as string, 'hex')

  return [
    secret_buffer,
    iv_buffer
  ]
}

/**
 * encrypt and return the encrypted string
 * @param value 
 * @returns 
 */
export const encrypt = (value: string): string => {
  // TODO: it there is no .env to get the variables there is no feedback for the error
  const [secret_buffer, iv_buffer] = getKeyBuffers()
  const cipher = crypto.createCipheriv(algo, secret_buffer, iv_buffer);
    
  let encrypted = cipher.update(value, 'utf-8', 'hex');
  encrypted += cipher.final('hex')
    
  return encrypted
}
  
/**
 * decrypt and return the decrypted string
 * @param value 
 * @returns 
 */
export const decrypt = (value: string): string => {
  const [secret_buffer, iv_buffer] = getKeyBuffers()

  const decipher = crypto.createDecipheriv(algo, secret_buffer, iv_buffer)

  let decryptedData = decipher.update(value, 'hex', 'utf-8');
  decryptedData += decipher.final('utf-8')

  return decryptedData
}