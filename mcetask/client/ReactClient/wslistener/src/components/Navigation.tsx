import React from "react";
import { Link } from 'react-router-dom';

export function Navigation() {
    return (
        <nav className="flex justify-between items-center h-[50px] px-5 shadow-md bg-gray-500 text-white">
            <h3 className="text-lg font-bold">MCE Systems Device Tree Exercise</h3>
            <span>
                <Link to="/" className="mr-2 font-bold">MAIN VIEW</Link>
            </span>
        </nav>
    )

}
