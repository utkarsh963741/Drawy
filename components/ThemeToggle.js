import React, { useState, useEffect } from 'react'

function ThemeToggle() {
    const [activeTheme, setActiveTheme] = useState("light");
    const inactiveTheme = activeTheme === "light" ? "dark" : "light";

    useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    savedTheme && setActiveTheme(savedTheme);
    }, []);

    useEffect(() => {
    document.body.dataset.theme = activeTheme;
    window.localStorage.setItem("theme", activeTheme);
    }, [activeTheme]);

    return (
        <>
        <div style={{cursor:'pointer'}} onClick={() => setActiveTheme(inactiveTheme)}>
            <i className={activeTheme=="light"? "fa fa-moon":"fa fa-sun"}></i>
        </div>
        </>
    )
}

export default ThemeToggle