(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.index = factory());
}(this, (function () { 'use strict';

    class Event{
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
            if( this._events.get( type ).length >= Event.defaultMaxListeners ){
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
            Event.defaultMaxListeners = max;
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
        removeAllListener( type ){
            if( this._events.has( type ) ){
               let _lis = this._events.get( type );
               _lis.forEach( (cb) => {
               });
               _lis = null;
               this._events.delete( type );
            }
            return this
        }
    }

    return Event;

})));
