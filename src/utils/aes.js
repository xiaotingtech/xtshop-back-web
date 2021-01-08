import CryptoJS from 'crypto-js/crypto-js'
// 默认的 KEY 与 iv ，可以和后端商议好，只要统一的给16位字符串即可
const KEY = CryptoJS.enc.Utf8.parse("shop20209086user");
const IV = CryptoJS.enc.Utf8.parse('sunnier202098866');
// AES加密
export function Encrypt(word) {
  var encrypted = '';
  if (typeof(word) == 'string' || typeof(word)== 'number') {
    let srcs = CryptoJS.enc.Utf8.parse(word);
    encrypted = CryptoJS.AES.encrypt(srcs, KEY, { iv: IV,mode:CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7});
  } else if (typeof(word) == 'object') {//对象格式的转成json字符串
    let data = JSON.stringify(word);
    let srcs = CryptoJS.enc.Utf8.parse(data)
    encrypted = CryptoJS.AES.encrypt(srcs, KEY, { iv: IV,mode:CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7})
  }
  return encrypted.ciphertext.toString();
}

// AES 解密
export function Decrypt(word) {
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, KEY, { iv: IV,mode:CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7});
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedStr);
}
