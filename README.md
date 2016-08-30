# immu-tree (WIP)
Hierarchical data management with Immutable.js

At the moment, immu-tree is at an early work-in-progress stage.  

I'll be doing more in-depth documentation of the API once development is further along, but here's a rundown of what is currently functional:

Currently, the constructor is working similar to the 'stratify' method from d3-hierarchy(parses tree from array with `id` & `parentId` properties.

The constructor uses getters for properties representing collections of nodes including `ancestors`, `parent`, `children`, `descendants`, and `leaves`. Each of those properties returns a `Map` or `OrderedMap` containing instances of the `immuTree` representing each node.

More info and functionality to come!