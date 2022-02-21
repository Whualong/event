const EventEmitter = require("../src/index.js");
describe( "EventEmitter",  () => {
    let em = new EventEmitter()
    test( 'on', () => {
        let flag = false;
        em.on( 'click', ( a, b ) => {
            expect( a ).toBe( 'a' )
            expect( b ).toBe( 'b' )
            flag = true
        }, false )
        em.on( 'click', () => {
            expect( flag ).toBeTruthy()
        })
        em.emit( 'click', 'a', 'b' ) 
    })
    test( 'once', () =>{
        let flag ;
        em.once( 'one', ( val ) => {
           flag = val
        })
        em.emit( 'one', 1 )
        expect( flag ).toBe( 1 )
        em.emit( 'one', 2 )
        expect( flag ).toBe( 1 )
    })
    test( 'getAllListenerType', () => {
        const types = [ 'click','enter' ]
        em.removeAllListener()
        em.on( 'click', () => {} )
        em.on( 'enter', () => {} )
        expect( em.getAllListenerType() ).toEqual( types )
    })
    test( 'removeListener', () => {
        em.removeAllListener()
        let flag = 1
        function lis_1(){
            flag = 2
        }
        function lis_2(){
            flag = 3
        }
        em.on( 'lis', lis_1 )
        em.on( 'lis', lis_2 )
        em.removeListener( 'lis', lis_2 )
        em.emit( 'lis' )
        expect( flag ).toBe( 2 )
    })
    test( 'getAllListenerFunc', () => {
        em.removeAllListener()
        const FuncArr = [ lis_1, lis_2 ]
        function lis_1(){
            flag = 2
        }
        function lis_2(){
            flag = 3
        }
        em.on( 'click', lis_1 )
        em.on( 'click', lis_2 )
        expect( em.getAllListenerFunc( 'click' ) ).toEqual( FuncArr)
    })
    test( 'maxDefaultListeners', () => {
        em.setMaxListeners( 100 )
        expect( EventEmitter.defaultMaxListeners ).toBe( 100 )
    })
})