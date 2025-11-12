//TODO
// Aplicativo enviar mensagem e não receber a propria mensagem envida
// Aplicativo enviar mensagem e receber a propria mensagem enviada
// Aplicativo receber mensagem enviada por outro aplicativo

describe("Comunicação entre aplicaçãoes", ()=>{
    test("Um aplicativo autenticado não deve receber uma mensagem que ele mesmo enviou", ()=>{
        const AuthApplication = createAuthApplication()
        const pubkey = 'q9ujd982ujdk-0a3i209dkasd'
        const assignature = 'aisudhaisuhdaiushd'
    
        AuthApplication.setPublic(pubkey);
        AuthApplication.setAssignature(assignature)

        const MoonMeshServer = createServerApplication(AuthApplication)
        MoonMeshServer.broadcast.send("message", "olá")

        expect(MoonMeshServer).toReceiveMessage("message")
        expect(MoonMeshServer).toHaveReceivedMessages("olá")
        
    })

    test("Um segundo aplicativo autenticado deve receber mensagem e outro aplicativo, mas não de si proprio", ()=>{
        const AuthApplication1 = createAuthApplication()
        const pubkey1 = 'q9ujd982ujdk-0a3i209dkasd'
        const assignature1 = 'aisudhaisuhdaiushd'
        const identifier1 = "aoidaijsdoajsd"
    
        AuthApplication1.setPublic(pubkey1);
        AuthApplication1.setAssignature(assignature1)
        AuthApplication1.serIdentity(identifier1)

        const MoonMeshServer1 = createServerApplication(AuthApplication1)

        const AuthApplication2 = createAuthApplication()
        const pubkey2 = 'asdjoaoidasdas'
        const assignature2 = 'aosijdoiajsdo'
        const identifier2 = 'asdjoaijfokm'
    
        AuthApplication2.setPublic(pubkey2);
        AuthApplication2.setAssignature(assignature2)
        AuthApplication2.serIdentity(identifier2)

        const MoonMeshServer2 = createServerApplication(AuthApplication2)

        MoonMeshServer1.broadcast.send("message", "olá")

        expect(MoonMeshServer2).toReceiveMessage("message")
        expect(MoonMeshServer2).toHaveReceivedMessages("olá")
        
    })
})