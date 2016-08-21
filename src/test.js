import { Record } from 'immutable'

console.log(Record);

class Greeting extends Record({ message: 'hi' }) {
  constructor(props) {
    super(props);
  }

  readMessage() {
    console.log(this.get('message'));
  }
}


export default Greeting