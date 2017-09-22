
const pubsub = new function(){

  const vals = {};
  const subscribers = [];

  this.publish = function(key,value){

    vals[key] = value;
    subscribers.forEach( subscriber => subscriber(vals) )
  }

  this.subscribe = (subscriber) =>  subscribers.push(subscriber);
  this.get = () => vals;
  this.clear = ()=> {
    for(const className of Object.getOwnPropertyNames(vals)){
      delete vals[className]
    }
  }
}()

export default pubsub
