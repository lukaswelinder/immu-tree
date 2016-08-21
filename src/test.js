import { Record } from 'immutable'


class Greeting extends Record({ message: 'hi' }) {
  constructor(props) {
    super(props);
  }

  readMessage() {
    console.log(this.message,this);
  }

  setMessage(msg) {
    return this.set('message', msg);
  }
}


export default Greeting