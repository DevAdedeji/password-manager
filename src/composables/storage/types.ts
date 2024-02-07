export interface Item {
    [key: string]: any;
}

export interface SaveItemParams {
    name: string;
    item: Item;
}