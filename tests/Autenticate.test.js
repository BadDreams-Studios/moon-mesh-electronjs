//TODO
// Autenticaar com o moon mesh
// Testar autenticação invalida

description("testes basicos", ()=>{
    test("um aplicativo deve conseguir se autenticar", ()=>{
        const AuthApplication = createAuthApplication()
        const pubkey = 'q9ujd982ujdk-0a3i209dkasd'
        const assignature = 'aisudhaisuhdaiushd'
    
        AuthApplication.setPublic(pubkey);
        AuthApplication.setAssignature(assignature)
    
        expect(AuthApplication.valid()).toBeTruly()
    });
    
    test("um aplicativo não deve conseguir se autenticar", ()=>{
        const AuthApplication = createAuthApplication()
        const pubkey = 'q9ujd982ujdk-0a3i209dkasd'
        const assignature = 'aisudhaisuhdaiushd'
    
        AuthApplication.setPublic(pubkey);
        AuthApplication.setAssignature(assignature)
    
        expect(AuthApplication.valid()).toBeTruly()
    });
})