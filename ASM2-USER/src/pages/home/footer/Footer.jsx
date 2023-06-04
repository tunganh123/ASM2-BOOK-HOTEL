import React from 'react';
import "./Footer.css"
import FooterItem from './FooterItem';
let datafooter = [
    {
        "col_number": 1,
        "col_values": [
            "Countries",
            "Regions",
            "Cities",
            "Districts",
            "Airports",
            "Hotels"
        ]
    },
    {
        "col_number": 2,
        "col_values": [
            "Homes",
            "Apartments",
            "Resorts",
            "Villas",
            "Hostels",
            "Guest houses"
        ]
    },
    {
        "col_number": 3,
        "col_values": [
            "Unique places to stay",
            "Reviews",
            "Unpacked: Travel articles",
            "Travel communities",
            "Seasonal and holiday deals"
        ]
    },
    {
        "col_number": 4,
        "col_values": [
            "Car rental",
            "Flight Finder",
            "Restaurant reservations",
            "Travel Agents"
        ]
    },
    {
        "col_number": 5,
        "col_values": [
            "Curtomer Service",
            "Partner Help",
            "Careers",
            "Sustainability",
            "Press center",
            "Safety Resource Center",
            "Investor relations",
            "Terms & conditions"
        ]
    }
]
let datalength = datafooter.length;

export default function Footer() {
    return (
        <>
            <div className='divFooter'  >
                <div className='Footer'>
                    {
                        // Duyệt mảng data trả về danh sách componend FooterItem
                        datafooter.map((data, i) => <FooterItem key={i} col_values={data.col_values} />)
                    }
                </div>

            </div>
        </>
    );
}
