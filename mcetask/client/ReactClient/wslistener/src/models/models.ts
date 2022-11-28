export interface IDeviceInfo {
    deviceAddress: number,
    deviceName: string,
    locationId: number,
    manufacturer: string,
    productId: number,
    serialNumber: number
    vendorId: number
}
export interface ITreeCategory {
    treeName: string,
    children: IDeviceInfo[]
}