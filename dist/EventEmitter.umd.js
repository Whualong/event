(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}((function () { 'use strict';

    class EventEmitter{
        static defaultMaxListeners = 10
        constructor(){
            this._events = new Map();
        }
        on( type, cb, flag ){
            if( this._events.has( type ) ){
                let cbs = this._events.get( type );
                flag ? cbs.unshift( cb ) : cbs.push( cb ); 
            }else {
                this._events.set( type, [ cb ] );
            }
            if( this._events.get( type ).length >= EventEmitter.defaultMaxListeners ){
                console.warn( '超出最大监听数量' );
            }  
            return this       
        }
        once( type, cb, flag ){
            let _once = ( ...args ) => {
                cb.apply( this, args );
                this.removeListener( type, _once );
            };
            return this.on( type, _once, flag)
        }
        emit( type ){
            let args = Array.prototype.slice.call( arguments, 1 );
            if( this._events.has( type ) ){
                this._events.get( type ).forEach( ( cb ) => {
                    cb.apply( this, args );
                });
            }
        }
        setMaxListeners( max ){
            EventEmitter.defaultMaxListeners = max;
        }
        getAllListenerType(){
            return [ ...this._events.keys() ]
        }
        getAllListenerFunc( type ){
            if( this._events.has( type ) ){
                return this._events.get( type )
            }
            return []
        }
        removeListener( type, cb ){
            if( this._events.has( type ) ){
                let cbs  = this._events.get( type );
                cbs = cbs.filter( ( listen ) => cb !== listen );
                this._events.set( type ,cbs );
            }
            return this
        }
        removeAllListener(){
            this._events.clear();
            return this
        }
    }
    module.exports = EventEmitter;

})));
