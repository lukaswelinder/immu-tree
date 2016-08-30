'use strict';

const generate = require('./spec/data/generate.js');
const ImmuTree = require('./dist/bundle.umd.js');
const d3 = require('d3-hierarchy');

let print = (d) => JSON.stringify(d, null, 2);

let data_set = generate({ treeHeight: 10, childCount: 2 });


let start = new Date().getTime();

let immuTree = ImmuTree(data_set);

let leaves = immuTree.leaves.toArray();


let leaf = leaves.shift();
let ancestors = leaf.ancestors.toArray().map(d => `${d.id}: ${d.depth}`);

let end = new Date().getTime();

console.log('immutree leaves depth', print(ancestors), 'in ' + (end - start) + ' ms', data_set.length);