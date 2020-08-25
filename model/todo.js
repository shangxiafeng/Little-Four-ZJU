const AV = require('../libs/av-core-min.js')
class Todo extends AV.Object {
    get content(){return this.get('content')}
    set content(value){return this.set('content',value)}
    get done(){return this.get('done')}
    set done(value){return this.set('done',value)}
}
class Test1 extends AV.Object {
  get userName(){return this.get('userName')}
  set userName(value){return this.set('userName',value)}
  get userPassword(){return this.get('userPassword')}
  set userPassword(value){return this.set('userPassword',value)}
  get userID(){return this.get('userID')}
  set useID(value){return this.set('userID',value)}
}
AV.Object.register(Todo);
module.exports = Todo;
module.exports = Test1;