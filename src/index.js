import Node from './components/Node.js'
import { Record, Map, OrderedMap } from 'immutable'


const ImmuTreeRecord = Record({ __index: Map(), __active: null, __root: null });


export default class ImmuTree extends ImmuTreeRecord {

  constructor(data_set) {

    if(!(this instanceof ImmuTree))
      return new ImmuTree(data_set);

    let rootId = null,
        index = Map().asMutable();

    data_set.forEach((data) => {

      let node = new Node(data).asMutable();

      if(!data.parentId && data.parentId !== 0)
        rootId = node.id, node.data.parentId = null;
      else
        index.setIn([node.parentId,'children', node.id], node.id);
      
      index.setIn([node.id], node);

    });


    let depth = 0,
        depthMap = OrderedMap().asMutable(),
        gen = index.getIn([rootId, 'children']);

    depthMap.setIn([depth++, rootId], rootId);
    depthMap.mergeDeepIn([depth++], index.getIn([rootId, 'children']));

    while(gen && gen.size) {

      gen.forEach((key) => {
        let children = index.getIn([key, 'children']);
        if(children.size)
          depthMap.mergeDeepIn([depth], children);
      });

      gen = depthMap.get(depth++);

    }


    depthMap.reverse().forEach((group, depth) => {
      group.forEach((key) => {
        let node = index.getIn([key]);
        index.setIn([key, 'depth'], depth);
        index.setIn([node.parentId, 'height'], node.height + 1);
        index.setIn([node.id], node.asImmutable())
      })
    });

    let __index = index.asImmutable();
    let __active = __index.get(rootId);

    super({ __index, __active });

    return this;

  }

  get id() {
    return this.getIn(['__active', 'id']);
  }

  get parentId() {
    return this.getIn(['__active', 'parentId']);
  }

  get depth() {
    return this.getIn(['__active', 'depth']);
  }

  get height() {
    return this.getIn(['__active', 'height']);
  }

  get data() {
    return this.getIn(['__active', 'data']);
  }

  get parent() {
    let parentId = this.getIn(['__active', 'parentId']);
    if(!parentId && parentId !== 0)
      return null;
    return this.setIn(['__active'], this.getIn(['__index', parentId]));
  }

  get ancestors() {

    let ret = OrderedMap().asMutable(),
        parent = this.parent;

    ret.set(this.id, this);

    while(parent) {
      ret.set(parent.id, parent);
      parent = parent.parent;
    }

    return ret.asImmutable();

  }

  get children() {

    return Map().withMutations((mutableMap) => {

      this.getIn(['__active','children']).forEach((childId) =>
        mutableMap.set(childId, this.setIn(['__active'], this.getIn(['__index', childId]))));

    });

  }
  
  get descendants() {

    let ret = OrderedMap().asMutable(),
        gen = Map().asMutable(),
        children = this.children;

    ret.set(this.id, this);

    while(children.size) {

      children.forEach((child, key) => {
        ret.set(key, child);
        let children = child.children;
        if(children.size)
          gen.mergeDeep(children);
      });

      children = gen;
      gen = Map().asMutable();

    }

    return ret.asImmutable();

  }

  get leaves() {

    let ret = Map().asMutable(),
        gen = Map().asMutable(),
        children = this.children;

    while(children.size) {

      children.forEach((child, key) => {
        let children = child.children;
        if(children.size)
          gen.mergeDeep(children);
        else
          ret.set(key, child);
      });

      children = gen;
      gen = Map().asMutable();

    }

    return ret.asImmutable();

  }

  set(key, val) {

    switch(key) {

      case 'data':
        return this.setData(val);

      case 'parent':
        return this.setParent(val);

      case 'children':
        return this.setChildren(val);

      default:
        return super.set(key, val);

    }

  }

  setIn(keyPath, val) {

    switch(keyPath[0]) {

      case '__index':
        return super.setIn(keyPath, val);

      case '__active':
        return super.setIn(keyPath, val);

      case 'data':
        keyPath.unshift('__active');
        return super.setIn(keyPath, val);

      case 'parent': // :TODO: needs own method
        keyPath.unshift('__active');
        return super.setIn(keyPath, val);

      case 'children': // :TODO: needs own method
        keyPath.unshift('__active');
        return super.setIn(keyPath, val);

      default:
        return;

    }

  }

  each(fn) {

    fn(this, this.id, this);

    let gen = Map().asMutable(),
        children = this.children;

    while(children.size) {

      children.forEach((child, key) => {
        fn(child, key, this);
        let children = child.children;
        if(children.size)
          gen.mergeDeep(children);
      });

      children = gen;
      gen = Map().asMutable();

    }

    return this;

  }

/* * > Creates and (attempts to) inserts new node to tree.
 *
 * setNode(data<Object>);
 *
 *   - This will attempt to convert 'data' to immutable using 'fromJS'.
 *   - Argument 'data' must have a valid 'id' property.
 *   - If 'parentId' property is 'null', will insert as root.
 *
 * returns - <ImmuTree>
 *
 * */
  setNode(data) {
    // experimental WIP
  }

/* * > Sets data of active node.
 *
 * setData(data<Object>);
 *
 *   - This will attempt to convert 'data' to immutable using 'fromJS'.
 *
 * returns - <ImmuTree>
 *
 * */
  setData(data) {
    // experimental WIP
  }

/* * > Creates and inserts parent node (of active node) from argument 'data'.
 *
 * setParent(data<Object || Immutable>);
 *
 *   - This will attempt to convert 'data' to immutable using 'fromJS'.
 *   - Argument 'data' must have a valid 'id' property.
 *   - The 'parentId' property of 'data' may be ignored and interpolated.
 *
 * returns - <ImmuTree>
 *
 * */
  setParent(data) {
    // experimental WIP
  }

/* * > Creates & inserts child node (of active node) from argument 'data'.
 *
 * setChild(data<Object || Immutable>);
 *
 *   - This will attempt to convert 'data' to immutable using 'fromJS'.
 *   - Argument's 'parentId' property will be interpolated.
 *
 * returns - <ImmuTree>
 *
 * */
  setChild(data) {
    // experimental WIP
  }

/* * > Sets 'children' of active node, overwriting current 'children'.
 *
 * setChildren(data<Array || Iterable>);
 *
 *   - This will attempt to convert 'data' to immutable using 'fromJS'.
 *   - Data set object's 'parentId' property will be interpolated.
 *
 * returns - <ImmuTree>
 *
 * */
  setChildren(data_set) {
    // experimental WIP
  }
  

}
