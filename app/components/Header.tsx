
import React from 'react'
import { HeaderProps } from '../types/Props';

const Header: React.FC<HeaderProps> = ({types, onClickType}) => {
    
    return (
        <div className='flex items-center mx-4 my-4'>
            <div className='mr-2 my-4 font-bold self-start'>
                Types:
            </div>
            <div>
            {
                types.map((item, index) => (
                    <button 
                        key={index} 
                        className={`px-2 py-2 mx-2 my-2 border-red-900 border-2 
                            rounded-md font-bold ${item.selected ? 'text-white bg-red-900' : 'text-red-900'}`}
                        onClick={() => onClickType(index)}
                    >
                        {item.name}
                    </button>
                ))
            }
            </div>
        </div>
    )
}

export default Header;