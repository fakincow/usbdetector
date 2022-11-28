import React from "react";
import { Link } from 'react-router-dom';
import { IDeviceInfo } from "../models/models";

export function DeviceCard({ device }: { device: IDeviceInfo }) {
    return (
        <div className="flex justify-between items-center border py-2 px-2 rounded mb-2 hover:bg-gray-100 transition-all">
            <div className=" w-full">
            <h2 className="text-lg font-bold  w-full bg-blue-100">Vendor:{device.manufacturer}</h2>
                <h2 className="text-lg font-bold  w-full bg-blue-50">Device Name:{device.deviceName}</h2>
                <p className="text-sm">
                    productId: <span className="font-bold mr-2 ">{device.productId}</span>
                </p>
                <p className="text-sm">
                manufacturer: <span className="font-bold">{device.manufacturer}</span>
                </p>
                <p className="text-small font-thin">{device?.serialNumber}</p>
            </div>

        </div>
    )

}
