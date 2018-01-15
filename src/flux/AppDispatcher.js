//import { Dispatcher } from 'flux';

function Dispatcher (){
  this._ID = 0;
  this._callbacks = {};
}

Dispatcher.prototype.register = function(callback){
  var id = 'ID' + this._ID++;
  this._callbacks[id] = callback;
  return id;
};

Dispatcher.prototype.dispatch = function(action){
  for(let id in this._callbacks){
    if(this._callbacks.hasOwnProperty(id)){
      this._callbacks[id](action);
    }
  }
};

// Create dispatcher instance
var AppDispatcher = new Dispatcher();

// Convenience method to handle dispatch requests
AppDispatcher.handleAction = function(action) {
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
};

export default AppDispatcher;