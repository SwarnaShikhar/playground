import React, { useState, useEffect } from 'react';

const Button = () => {
    const initialStyles = {
        backgroundColor: '#0f5bd6',
        borderRadius: 10,
        margin: 8,
        paddingX: 8,
        paddingY: 8,
        text: 'Click Me',
        fontSize: 26,
        fontColor: '#ffffff',
        fontFamily: 'Arial'
    };

    const fontOptions = ['Arial', 'Verdana', 'Georgia', 'Times New Roman', 'Courier New'];

    const [buttonStyles, setButtonStyles] = useState(() => {
        const savedStyles = localStorage.getItem('buttonStyles');
        return savedStyles ? JSON.parse(savedStyles) : initialStyles;
    });

    const [selectedFont, setSelectedFont] = useState(buttonStyles.fontFamily);
    const [codeCopied, setCodeCopied] = useState(false);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const newValue = type === 'checkbox' ? e.target.checked : value;
        const updatedStyles = { ...buttonStyles, [name]: newValue };
        setButtonStyles(updatedStyles);
        localStorage.setItem('buttonStyles', JSON.stringify(updatedStyles));
    };

    const handleReset = () => {
        setButtonStyles(initialStyles);
        setSelectedFont(initialStyles.fontFamily);
        localStorage.setItem('buttonStyles', JSON.stringify(initialStyles));
    };

    useEffect(() => {
        const handleStorageChange = () => {
            const savedStyles = localStorage.getItem('buttonStyles');
            if (savedStyles) {
                setButtonStyles(JSON.parse(savedStyles));
                setSelectedFont(JSON.parse(savedStyles).fontFamily);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleFontChange = (e) => {
        const selectedFont = e.target.value;
        setSelectedFont(selectedFont);
        handleChange({ target: { name: 'fontFamily', value: selectedFont, type: 'text' } });
    };

    const copyToClipboard = () => {
        const cssCode = `
            background-color: ${buttonStyles.backgroundColor};
            border-radius: ${buttonStyles.borderRadius}px;
            margin: ${buttonStyles.margin}px;
            padding: ${buttonStyles.paddingY}px ${buttonStyles.paddingX}px;
            font-size: ${buttonStyles.fontSize}px;
            color: ${buttonStyles.fontColor};
            font-family: ${buttonStyles.fontFamily};
        `;

        navigator.clipboard.writeText(cssCode);
        setCodeCopied(true);
        setTimeout(() => setCodeCopied(false), 3000); // Reset copied state after 3 seconds
    };

    return (
        <div className='flex justify-center gap-48 pt-3'>
            <div className="w-full max-w-xl bg-gray-500 p-5 rounded-sm">
                <h1 className='flex justify-center font-bold pb-5 text-3xl'>Playground</h1>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Background Color
                        </label>
                        <div className="flex items-center">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                name='backgroundColor'
                                value={buttonStyles.backgroundColor}
                                onChange={handleChange}
                                placeholder="Enter color name or code"
                            />
                            <input
                                className="ml-2"
                                type="color"
                                name='backgroundColor'
                                value={buttonStyles.backgroundColor}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Button Text
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type='text'
                                name='text'
                                value={buttonStyles.text}
                                onChange={handleChange}
                                placeholder='Enter button text'
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Font Size
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type='number'
                                name='fontSize'
                                value={buttonStyles.fontSize}
                                onChange={handleChange}
                                placeholder='Enter font size'
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Font Family
                        </label>
                        <div className="relative">
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name='fontFamily'
                                value={selectedFont}
                                onChange={handleFontChange}
                            >
                                {fontOptions.map((font, index) => (
                                    <option key={index} value={font}>
                                        {font}
                                    </option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg
                                    className="fill-current h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M6.293 8.293a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className='flex gap-2'>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Border Radius
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type='number'
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
                                name='margin'
                                value={buttonStyles.margin}
                                onChange={handleChange}
                                placeholder='Enter margin'
                            />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Padding X
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type='number'
                                name='paddingX'
                                value={buttonStyles.paddingX}
                                onChange={handleChange}
                                placeholder='Enter padding X'
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Padding Y
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type='number'
                                name='paddingY'
                                value={buttonStyles.paddingY}
                                onChange={handleChange}
                                placeholder='Enter padding Y'
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Font Color
                        </label>
                        <div className="flex items-center">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type='text'
                                name='fontColor'
                                value={buttonStyles.fontColor}
                                onChange={handleChange}
                                placeholder="Enter color name or code"
                            />
                            <input
                                className="ml-2"
                                type='color'
                                name='fontColor'
                                value={buttonStyles.fontColor}
                                onChange={handleChange}
                            />
                        </div>
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
            <div className='w-full max-w-xl bg-gray-500 rounded-sm p-5'>
                <h1 className='flex justify-center font-bold p-5 text-3xl'>Rendered Button</h1>
                <div className='flex justify-center'>
                    <button
                        style={{
                            backgroundColor: buttonStyles.backgroundColor,
                            borderRadius: `${buttonStyles.borderRadius}px`,
                            margin: `${buttonStyles.margin}px`,
                            padding: `${buttonStyles.paddingY}px ${buttonStyles.paddingX}px`,
                            fontSize: `${buttonStyles.fontSize}px`,
                            color: buttonStyles.fontColor,
                            fontFamily: buttonStyles.fontFamily
                        }}
                    >
                        {buttonStyles.text}
                    </button>
                </div>
                <div className="bg-white rounded-sm p-3 mt-5 relative">
                    <pre className="text-sm font-mono whitespace-pre-wrap">
                        {`
                            background-color: ${buttonStyles.backgroundColor};
                            border-radius: ${buttonStyles.borderRadius}px;
                            margin: ${buttonStyles.margin}px;
                            padding: ${buttonStyles.paddingY}px ${buttonStyles.paddingX}px;
                            font-size: ${buttonStyles.fontSize}px;
                            color: ${buttonStyles.fontColor};
                            font-family: ${buttonStyles.fontFamily};
                        `}
                    </pre>
                    {/* Copy button */}
                    <button
                        onClick={copyToClipboard}
                        className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded"
                    >
                        {codeCopied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Button;
