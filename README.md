# TS Index Map
A data structure that allows indexing by multiple fields
for fast data access.

## Basic Usage

Pass the data and an array of index fields to the constructor.
Get the data with a field and value.

```typescript
import IndexMap from 'ts-index-map';

function Get() {
    const Data = [{a: 1, b: 2, c: 3}, 
    {a: 1, b: 3, c: 2}, {a: 3, b: 2, c: 1}];
    const Indexed = new IndexMap(Data, ['a', 'b']);

    const A1 = Indexed.get('a', 1);
    const B2 = Indexed.get('b', 2);

    //prints [{a: 1, b: 2, c: 3}, {a: 1, b: 3, c: 2}]
    console.log(A1);

    //prints [{a: 1, b: 2, c: 3}, {a: 3, b: 2, c: 1}]
    console.log(B2);
}
```

## API

```typescript
new IndexMap(data, indexes); //data and indexes are optional
size; //the number of data entries
indexes; //the number of indexes
addIndex(field); //indexes the data by another index
removeIndex(field); //removes an index
add(...data); //adds data
get(field, value); //gets the data by field and value
delete(field, value); //removes the data by field and value
```