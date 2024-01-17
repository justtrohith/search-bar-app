import React, { useState } from 'react';
import './chipInput.css';

const USERS = [
    {
        name: "Aman",
        email: "aman@gmail.com",
        profile: "https://ui-avatars.com/api/?background=834E20&color=fff&name=Rohith%20Kumar&size=128"
    },
    // Add more dummy data here
    {
        name: "John",
        email: "john@example.com",
        profile: "https://ui-avatars.com/api/?background=834E20&color=fff&name=Rohith%20Kumar&size=128"
    },
    {
        name: "Sarah",
        email: "sarah@example.com",
        profile: "https://ui-avatars.com/api/?background=834E20&color=fff&name=Rohith%20Kumar&size=128"
    },
    // Add more dummy data as needed
];

const ChipInput = () => {
    const [chips, setChips] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [backspaceCount, setBackspaceCount] = useState(0);
    const inputRef = React.useRef(null);
    const initialItems = USERS.map(user => user.email); // Initialize with email addresses
    const [items, setItems] = useState(initialItems);
    const [focus, setFocus] = useState(false);
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        const filteredEmails = USERS.filter(user =>
            user.email.toLowerCase().includes(e.target.value.toLowerCase())
        ).map(user => user.email);
        setItems(filteredEmails);
    };
   const isHighlighed = backspaceCount === 1;
    const addChip = (chip) => {
        const user = USERS.find(user => user.email === chip);
        if (user && !chips.includes(user.name)) {
            setChips([...chips, user.name]);
            setItems(items.filter(item => item !== chip));
        }
        setInputValue('');
        inputRef.current.focus();
    };

    const removeChip = (chipIndex) => {
        const chipToRemove = chips[chipIndex];
        const user = USERS.find(user => user.name === chipToRemove);
        if (user) {
            const newChips = chips.filter((_, index) => index !== chipIndex);
            setChips(newChips);
            setItems([...items, user.email]);
        }
    };

    const filteredItems = items.filter(item => !chips.includes(USERS.find(user => user.email === item)?.name));
    console.log('aman', focus)
    return (
        <div className="chip-input"

        style={{
            borderBottom: focus ? '1px solid #000' : '1px solid #007bff'
        }}
        >
            <div
            className="input-container">
                {chips.map((chip, index) => (
                    <div key={index} className="chip" style={{
                        backgroundColor: isHighlighed ? '#007bff' : '#fff',
                        color: isHighlighed ? '#fff' : '#000'
                    }}
                    >
                        <img className='user_img' src={USERS.find(user => user.name === chip)?.profile} alt="profile" />
                        {chip}
                        <span onClick={() => removeChip(index)}>&times;</span>
                    </div>
                ))}
                <input
                    type="text"
                    ref={inputRef}
                    class='input_2'
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Backspace' && inputValue === '' && chips.length > 0) {
                            setBackspaceCount(backspaceCount + 1);
                            // removeChip(chips.length - 1);
                        }
                        if (e.key === 'Backspace' && backspaceCount >= 1) {
                            removeChip(chips.length - 1);
                            setBackspaceCount(0);
                        }
                    }}
                    onFocus={() => {
                        setFocus(true);
                    }}
                    onBlur={() => {
                        setFocus(false);
                    }}  
                    placeholder={chips.length === 0 ? "Search here ......." : ""}
                />
                {inputValue && (
                    <div className="dropdown">
                        {filteredItems.map((item, index) => (
                            <div key={index} onClick={() => addChip(item)}>
                                {USERS.find(user => user.email === item)?.email || item}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChipInput;
