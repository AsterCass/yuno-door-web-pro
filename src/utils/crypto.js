import CryptoJS from "crypto-js";

export function decrypt(blob) {
    const passphrase = "ASTER_cass_NO_el_mind_auth_company";
    const saltWA = CryptoJS.enc.Hex.parse("0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f");
    const ivWA = CryptoJS.enc.Hex.parse("0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f");
    const iterations = 10000;
    const keyWA = CryptoJS.PBKDF2(passphrase, saltWA, {
        keySize: 256 / 32,
        iterations: iterations,
        hasher: CryptoJS.algo.SHA256
    });

    return new Promise(function (resolve) {
        const reader2 = new FileReader();
        reader2.readAsArrayBuffer(blob);
        reader2.onload = () => {
            const code = CryptoJS.lib.WordArray.create(reader2.result)
            const wordArray = CryptoJS.enc.Base64.stringify(code)
            const decrypted = CryptoJS.AES.decrypt(wordArray, keyWA, {iv: ivWA});
            resolve(decrypted.toString(CryptoJS.enc.Utf8))

        }
    })
}

export function hashPassword(username, password) {
    return CryptoJS.SHA256(password + "_astercasc_" + username).toString();
}

export function hashPasswordNew(account, mail, password) {
    return hashPassword(account, password) + "&" + hashPassword(mail, password)
}