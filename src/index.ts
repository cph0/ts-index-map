export default class IndexMap<T, K extends keyof T> {
    private _data: Map<number, T>;
    private _indexes: Map<K, Map<T[K], Set<number>>> = new Map();
    private _spareDataIds: number[] = [];

    get size() {
        return this._data.size;
    }

    get indexes() {
        return this._indexes.size;
    }

    constructor(data?: T[], indexes?: K[]) {
        const dataMap = (data || []).map((m, i) => [i, m] as [number, T]);
        this._data = new Map(dataMap);

        if (indexes)
            this._indexes = new Map(indexes.map(m => [m, new Map()]));

        if (data && indexes) {
            for (const index of indexes)
                this.setIndex(dataMap, index);
        }
    }

    private setIndex(data: [number, T][], field: K) {
        const map = new Map<T[K], Set<number>>();
        const uniqueData = new Set(data.map(m => m[1][field]));

        for (const unique of uniqueData) {
            const dataAtKey = data.filter(f => f[1][field] === unique).map(f => f[0]);
            map.set(unique, new Set(dataAtKey));
        }
        this._indexes.set(field, new Map(map));
    }

    addIndex(field: K) {
        if (!this._indexes.has(field)) {
            const data = Array.from(this._data.entries());
            this.setIndex(data, field);
        }
    }

    removeIndex(field: K) {
        if (this._indexes.has(field))
            this._indexes.delete(field);
    }

    get(field: K, key: T[K]) {
        const map = this._indexes.get(field);

        if (map) {
            const dataIndexes = map.get(key);

            if (dataIndexes) {
                const matches: T[] = [];

                for (const dataIndex of dataIndexes) {
                    const match = this._data.get(dataIndex);
                    if (match)
                        matches.push(match);
                }

                return matches;
            }
        }

        return Array.from(this._data.values()).filter(f => f[field] === key);
    }

    add(...values: T[]) {
        for (const value of values) {
            const spareDataIndex = this._spareDataIds.pop();
            const dataIndex = spareDataIndex ?? this._data.size;
            this._data.set(dataIndex, value);

            for (const index of this._indexes) {
                const set = index[1].get(value[index[0]]);

                if (set)
                    set.add(dataIndex);
                else
                    index[1].set(value[index[0]], new Set([dataIndex]));
            }
        }
    }

    delete(field: K, key: T[K]) {
        const map = this._indexes.get(field);

        if (map) {
            const dataIndexes = map.get(key);

            if (dataIndexes) {

                for (const dataIndex of dataIndexes) {
                    const data = this._data.get(dataIndex);

                    if (data) {
                        for (const index of this._indexes) {
                            const dataAtIndex = data[index[0]];
                            const matches = index[1].get(dataAtIndex);

                            if (matches && matches.has(dataIndex))
                                matches.delete(dataIndex);

                            if (matches && matches.size === 0)
                                index[1].delete(dataAtIndex);
                        }

                        this._data.delete(dataIndex);
                        this._spareDataIds.push(dataIndex);
                    }
                }
            }
        }
    }
}