import IndexMap from './src/index';

function test() {
    const Data = [{
        a: 1,
        b: 2,
        c: 3
    }, {
        a: 1,
        b: 3,
        c: 2
    }, {
        a: 3,
        b: 2,
        c: 1
    }];
    const Indexed = new IndexMap(Data, ['a', 'b', 'c']);

    const A1 = Indexed.get('a', 1);
    const B2 = Indexed.get('b', 2);
    const C2 = Indexed.get('c', 2);

    console.log(Data);
    console.log('A1', A1);
    console.log('B2', B2);
    console.log('C2', C2);

    Indexed.add({ a: 4, b: 5, c: 6});
    const A4 = Indexed.get('a', 4);
    console.log('A4', A4);

    Indexed.delete('a', 1);
    console.log('A1', Indexed.get('a', 1));
}

window.test = test;