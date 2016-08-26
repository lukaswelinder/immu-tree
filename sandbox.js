'use strict';

const generate = require('./spec/data/generate.js');
const ImmuTree = require('./dist/bundle.umd.js');

let print = (d) => JSON.stringify(d, null, 3);

let data_set = generate({ treeHeight: 10, childCount: 2 });




let start = new Date().getTime();
let immuTree = ImmuTree.ImmuTree(data_set);
let descendants = immuTree.descendants.toArray();
let leaf = descendants.pop();
let ancestors = leaf.ancestors.toArray().map(d => d instanceof ImmuTree.ImmuTree);
let end = new Date().getTime();

console.log('immutree desc', print(ancestors), end - start + ' ms', data_set.length);