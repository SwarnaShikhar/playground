import React, { useState, useEffect } from 'react';

const Button = () => {
    const initialStyles = {
        backgroundColor: '#0f5bd6',
        borderRadius: 10,
        margin: 8,
        paddingX: 8,
        paddingY: 8,
        text: 'Change Me',
        fontSize: 26,
        fontColor: '#ffffff'
    };

    const [buttonStyles, setButtonStyles] = useState(() => {
        const savedStyles = localStorage.getItem('buttonStyles');
        return savedStyles ? JSON.parse(savedStyles) : initialStyles;
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const newValue = type === 'checkbox' ? e.target.checked : value;
        const updatedStyles = { ...buttonStyles, [name]: newValue };
        setButtonStyles(updatedStyles);
        localStorage.setItem('buttonStyles', JSON.stringify(updatedStyles));
    };

    const handleReset = () => {
        setButtonStyles(initialStyles);
        localStorage.setItem('buttonStyles', JSON.stringify(initialStyles));
    };

    useEffect(() => {
        const handleStorageChange = () => {
            const savedStyles = localStorage.getItem('buttonStyles');
            if (savedStyles) {
                setButtonStyles(JSON.parse(savedStyles));
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <div className='flex justify-center gap-80 pt-3'>
            <div className="w-full max-w-xs bg-gray-500 p-5 rounded-sm">
                <h1 className='flex justify-center font-bold pb-5 text-3xl'>Playground</h1>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Background Color
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id='buttonBgColor'
                            type="color"
                            name='backgroundColor'
                            value={buttonStyles.backgroundColor}
                            onChange={handleChange}
                            placeholder="Button"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Button Text
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type='text'
                            id='text'
                            name='text'
                            value={buttonStyles.text}
                            onChange={handleChange}
                            placeholder='Enter button text'
                        />
                    </div>
                    <div className='flex gap-2'>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Border Radius
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type='number'
                                id='borderRadius'
                                name='borderRadius'
                                value={buttonStyles.borderRadius}
                                onChange={handleChange}
                                placeholder='Enter border radius'
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Margin
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type='number'
                                id='margin'
                                name='margin'
                                value={buttonStyles.margin}
                                onChange={handleChange}
                                placeholder='Enter margin'
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Padding X
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type='number'
                            id='paddingX'
                            name='paddingX'
                            value={buttonStyles.paddingX}
                            onChange={handleChange}
                            placeholder='Enter padding X'
                        />
                    </div>
                    <div className='flex gap-2'>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Padding Y
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type='number'
                                id='paddingY'
                                name='paddingY'
                                value={buttonStyles.paddingY}
                                onChange={handleChange}
                                placeholder='Enter padding Y'
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Font Size
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type='number'
                                id='fontSize'
                                name='fontSize'
                                value={buttonStyles.fontSize}
                                onChange={handleChange}
                                placeholder='Enter font size'
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Font Color
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type='color'
                            id='fontColor'
                            name='fontColor'
                            value={buttonStyles.fontColor}
                            onChange={handleChange}
                        />
                    </div>
                </form>
                <div
                    className='flex justify-center'>
                    <button
                        onClick={handleReset}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Reset Styles
                    </button>
                </div>
            </div>
            <div className='w-full max-w-xs bg-gray-500 rounded-sm'>
                <h1 className='flex justify-center font-bold p-5 text-3xl'>Rendered Button</h1>
                <div className='flex justify-center'>
                    <button
                        style={{
                            backgroundColor: buttonStyles.backgroundColor,
                            borderRadius: `${buttonStyles.borderRadius}px`,
                            margin: `${buttonStyles.margin}px`,
                            padding: `${buttonStyles.paddingY}px ${buttonStyles.paddingX}px`,
                            fontSize: `${buttonStyles.fontSize}px`,
                            color: buttonStyles.fontColor
                        }}
                    >
                        {buttonStyles.text}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Button;
