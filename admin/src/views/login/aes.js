import CryptoJS from 'crypto-js/crypto-js';

const aesKey = 'ctsecurities2023';

const encrypt = (encryptData)=> {
  const data = CryptoJS.enc.Utf8.parse(JSON.stringify(encryptData));
  const key = CryptoJS.enc.Utf8.parse(aesKey);
  const iv = CryptoJS.enc.Utf8.parse(aesKey);
  const encrypted = CryptoJS.AES.encrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC
  });

  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
};

const decrypt = (decryptStr)=> {
  const key = CryptoJS.enc.Utf8.parse(aesKey);
  const iv = CryptoJS.enc.Utf8.parse(aesKey);
  const decrypted = CryptoJS.AES.decrypt(decryptStr, key,{
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
};

export {
  encrypt,
  decrypt
}