import Greeting from './test.js'

let greet = new Greeting({message: 5});
greet.readMessage();

export const Hello = Greeting({ message: 'hello' });