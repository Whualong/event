### EventEmitter

#### 发布订阅模式的实现

- on
- once
- emit
- removeListener
- removeAllListener
- getAllListenerType
- getAllListenerFunc
- setMaxListeners

#### 使用

```js

let em = new EventEmitter()
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
em.removeListener( 'lis', lis_2 )
em.removeAllListener()

```

