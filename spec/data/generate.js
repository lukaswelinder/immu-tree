'use strict';

const fs = require('fs');
const path = require('path');


/* Expects an object:
 * 
 *   options = {
 *     childCount: number, // Defaults to 2
 *     treeHeight: number, // Defaults to 10
 *   }
 * 
 * */
const generate = function(options) {

  options = options || {};
  
  let count = options.childCount || 2,
      height = options.treeHeight || 10;
  
  let first_names = ['Billy', 'John', 'Sally', 'Lucy', 'Eve', 'Sara', 'Nevin', 'Alyssa', 'Ashley', 'Mike'];
  let last_names = ['Johnson', 'Smith', 'Richards', 'Skywalker', 'Sanders', 'Kelvin', 'Brown'];
  let name = () => `${first_names[Math.floor(Math.random() * first_names.length)]} ${last_names[Math.floor(Math.random() * last_names.length)]}`;
  
  let addChildren = (node, depth, ret) => {

    node = node || { id: 0, parentId: null, name: name() };
    depth = depth || 0;

    ret = ret || [];

    ret.push(node);

    if(depth < height)
      for(let i = 0; i < count; i++)
        addChildren({
            id: ret.length,
            parentId: node.id,
            name: name()
          }, depth + 1, ret);

    return ret;

  };

  return addChildren();

};

module.exports = generate;