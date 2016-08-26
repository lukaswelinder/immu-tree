import { Record, Map, fromJS } from 'immutable'

const NodeRecord = Record({
  id: null,
  parentId: null,

  children: Map(),

  data: Map(),

  height: 0,
  depth: 0
});

class Node extends NodeRecord {
  constructor(data) {
    if(data.id == null && !(data.id + ''))
      throw 'Node must have a valid id property...';

    super({
      id: data.id,
      parentId: data.parentId,
      data: fromJS(data)
    })
  }
}

export default Node