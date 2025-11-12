import { Server } from "socket.io";
import { createECDH, createHash, randomUUID, createVerify, createPublicKey } from "node:crypto";
import ecKeyUtils from "eckey-utils";

const io = new Server();

const ecdh = createECDH("secp521r1");

ecdh.setPrivateKey(
    createHash("sha256").update("servidor", "utf8").digest()
)

const ders = ecKeyUtils.generateDer({
    curveName: 'secp521r1',
    privateKey: ecdh.getPrivateKey(),
    publicKey: ecdh.getPublicKey()
})

io.on("connection", (socket) => {
    const publicKey = socket.handshake.auth.publicKey;
    const pluzzeValue = randomUUID()
   
    socket.on("pluzze-resolve", ({signature})=>{
        const verify = createVerify('SHA256')
        verify.update(pluzzeValue)
        verify.end()

        const pubkey = createPublicKey({
            key: publicKey,
            format: 'der',
            type: 'spki',
            encoding: 'hex'
        })

        const result = verify.verify(pubkey, signature, 'hex')
        console.log("signature: "+signature)
        console.log("result: "+result)

        if(result){
            socket.emit("pluzze-success", "Aplicativo passou no teste de autenticação. Liberado acesso as funcionalidades e dados.")
        }else{
            socket.emit("pluzze-error", "Aplicativo não passou no teste de autenticação. E será desconectado.")
            socket.disconnect()
        }
    })

    socket.emit("pluzze", {
        publicKey: ders.publicKey.toString("hex"),
        value: pluzzeValue
    })
});


console.log("servidor conectado na porta 3000");

io.listen(3000);