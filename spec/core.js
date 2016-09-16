const tape = require('tape'),
      generate = require('./data/generate'),
      ImmuTree = require('../dist/bundle.umd.js'),
      hierarchy = require('d3-hierarchy'),
      stratify = hierarchy.stratify();

tape('generate', function(test) {

  // is function
  test.ok(typeof generate === 'function', 'is a function');

  // returns random array
  let data1 = generate();
  let data2 = generate();
  test.ok(Array.isArray(data1) && Array.isArray(data2), 'is an array');
  test.notDeepEqual(data1, data2, 'is random');

  // single root (stratify prereq.)
  let hasSingleRoot = false;
  for(let i = 0; i < data1.length; i++) {
    if(hasSingleRoot && data1[i].parentId == null) {
      hasSingleRoot = false;
    } else if(data1[i].parentId == null) {
      hasSingleRoot = true;
      break;
    }
  }
  test.ok(hasSingleRoot, 'has single root');

  // can be stratified (using d3-hierarchy)
  test.ok(stratify(data1), 'is stratifiable');



  test.end();

});

tape('ImmuTree', function(test) {

  test.ok(typeof ImmuTree === "function", "is a function");

  // test for required root node ?? design decision to be made
  // test.ok(new ImmuTree(), 'does not require \"new\" keyword');

  test.end();

});


