### Event

#### node中发布订阅模式的实现

- on( type, callback, flag )
- once( type, callback, flag )
- emit( type, args )
- removeListener( type, callback )
- removeAllListener( type )
- getAllListenerType()
- getAllListenerFunc( type )
- setMaxListeners( number )

#### 使用

```js

let em = new Event()
em.on( 'click', ( a, b ) => {
}, false )
em.emit( 'click', 'a', 'b' ) 

let flag
em.once( 'one', ( val ) => {
  flag = val
})
em.emit( 'one', 1 )

let flag = 1
function lis_1(){
  flag = 2
}
function lis_2(){
  flag = 3
}
em.on( 'lis', lis_1 )
em.on( 'lis', lis_2 )
em.getAllListenerType() === [ 'click', 'one', 'lis' ]
em.getAllListenerFunc( 'lis' ) === [ lis_1, lis_2 ]
em.removeListener( 'lis', lis_2 )
em.getAllListenerFunc( 'lis' ) === [ lis_1 ]
em.removeAllListener( 'lis' )
em.getAllListenerType() === [ 'click', 'one' ]


```

