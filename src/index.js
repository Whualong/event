export default class {
    constructor(){
        this.callbackMap=new Map();
    }

    regist(event,handler){
        let handlers = this.callbackMap.get( evt );
        if(!handlers){
            handlers=new Set();
            handlers.set(event,handlers);
        }
        handlers.add(handler);
        return this;
    }

    emit(event,...args){
        const handlers = this.callbackMap.get( event );
        if( !handlers ) return false;
        handlers.forEach( handler => handler.call( this, ...args ) );
    }
   
    once(event,handler){
        const _handler = ( ...args ) => {
            handler.apply( this, args );
            this.removeListener( event, _handler );
        };
        return this.regist( event, _handler );
    }

    removeListener(event,listener){
        const handlers = this.callbackMap.get( event );
        handlers && handlers.delete( listener );
        return this;
    }

    removeAllListeners(event){
        const listener=this.callbackMap.get(event);
        if(listener){
            listener.clear();
            this.callbackMap.delete(event);
        }

    }
}