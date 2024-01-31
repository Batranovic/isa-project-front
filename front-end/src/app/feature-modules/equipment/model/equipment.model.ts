export interface Equipment {
    id: number,
    name: string,
    equipmentType: string,
    description: string,
    quantity: number,
    reservedQuantity: number,
    isAdded?: boolean,
    price: number
}