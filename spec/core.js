const tape = require('tape'),
      generate = require('./data/generate'),
      ImmuTree = require('../dist/bundle.umd.js');

tape('generate', function(test) {
  test.ok(typeof generate === 'function', 'is a function');

  test.end();
});

tape('- - - return value', function(test) {
  let data1 = generate();
  let data2 = generate();
  test.ok(Array.isArray(data1) && Array.isArray(data2), 'is an array');
  test.notDeepEqual(data1, data2, 'is random');

  let hasSingleRoot = false;
  for(let i = 0; i < data1.length; i++) {
    if(hasSingleRoot && data1[i].parentId == null) {
      hasSingleRoot = false;
    } else if(data1[i].parentId == null) {
      hasSingleRoot = true;
      break;
    }

  }

  test.ok(hasSingleRoot, 'has single root')

  test.end();
});


