import ImmuTree from '../components/ImmuTree.js'
import Node from '../components/Node.js'


export default function stratify(data_set) {

  let parsed = data_set.reduce(function(curr, val) {

    let id = val.id,
        parentId = val.parentId,
        data = val,
        children = [],
        depth = 0,
        height = 0;

    if(!id && id !== 0)
      throw 'Missing node id value...';

    // implement error handing to catch multiple roots
    if(!parentId && parentId !== 0)
      curr.root = id, parentId = null;
    else
      curr.index[parentId][1].children.push = id;

    // hmm problematic for numeric keys...
    curr.index[id] = [id, { id, parentId, data, children, depth, height }];

    return curr;

  }, { index: [], root: null });

  if(!parsed.root && parsed.root !== 0)
    throw 'No root node in data...';

  let depth = 0,
      depthMap = {},
      generation = parsed.index[parsed.root];

}

// let rootId = null,
//   index = Map().asMutable();
//
// data_set.forEach((data) => {
//
//   let node = new Node(data).asMutable();
//
//   if(!data.parentId && data.parentId !== 0)
//     rootId = node.id, node.data.parentId = null;
//   else
//     index.setIn([node.parentId,'children', node.id], node.id);
//
//   index.setIn([node.id], node);
//
// });
//
//
// let depth = 0,
//   depthMap = OrderedMap().asMutable(),
//   gen = index.getIn([rootId, 'children']);
//
// depthMap.setIn([depth++, rootId], rootId);
// depthMap.mergeDeepIn([depth++], index.getIn([rootId, 'children']));
//
// while(gen && gen.size) {
//
//   gen.forEach((key) => {
//     let children = index.getIn([key, 'children']);
//     if(children.size)
//       depthMap.mergeDeepIn([depth], children);
//   });
//
//   gen = depthMap.get(depth++);
//
// }
//
//
// depthMap.reverse().forEach((group, depth) => {
//   group.forEach((key) => {
//     let node = index.getIn([key]);
//     index.setIn([key, 'depth'], depth);
//     index.setIn([node.parentId, 'height'], node.height + 1);
//     index.setIn([node.id], node.asImmutable())
//   })
// });
//
// let __index = index.asImmutable();
// let __active = __index.get(rootId);
//
// super({ __index, __active });
//
// return this;