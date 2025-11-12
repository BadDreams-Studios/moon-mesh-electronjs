import { io } from "socket.io-client";
import { createECDH, createHash, createSign, getHashes, getCurves, createPrivateKey, KeyObject } from "node:crypto";
import ecKeyUtils from "eckey-utils";

const ecdh = createECDH("secp521r1");
let secret

//console.log(getHashes())
//console.log(getCurves())

ecdh.setPrivateKey(
    createHash("sha256").update("cliente", "utf8").digest()
)

const ders = ecKeyUtils.generateDer({
    curveName: 'secp521r1',
    privateKey: ecdh.getPrivateKey(),
    publicKey: ecdh.getPublicKey()
})

console.log(ders.publicKey.toString('base64'));

const socket = io("ws://localhost:3000", {
    auth:{
        publicKey: ders.publicKey.toString('hex')
    }
})

socket.on("connect", ()=>{
    console.log("connectado: ")
})

socket.on("error", (err)=>{
    console.log(err)
})

socket.on("pluzze", ({value})=>{
    const signer = createSign('SHA256')
    signer.write(value)
    signer.end()

    const privateKey = createPrivateKey({
        key: ders.privateKey.toString('hex'),
        type: 'sec1',
        format: 'der',
        encoding: 'hex'
    })

    const signature = signer.sign(privateKey, 'hex')
    
    socket.emit("pluzze-resolve", {signature})
})

socket.on('pluzze-success', (msg)=>console.log(msg))
socket.on('pluzze-error', (msg)=>console.log(msg))