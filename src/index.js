import Greeting from './test.js'

let greet = new Greeting({message: 'hello'});
greet.readMessage();

export const Hello = Greeting({ message: 'hello' })