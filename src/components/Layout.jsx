import React, { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Calculator, Lightbulb, Leaf, History as HistoryIcon, Palette, BookOpen } from 'lucide-react';

const THEMES = [
    { id: 'default', name: 'Eco Green', color: '#10b981' },
    { id: 'ocean', name: 'Ocean Blue', color: '#0ea5e9' },
    { id: 'sunset', name: 'Sunset Orange', color: '#f97316' },
    { id: 'dark', name: 'Dark Mode', color: '#0f172a' }
];

const Layout = () => {
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('app-theme') || 'default');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('app-theme', currentTheme);
    }, [currentTheme]);

    return (
        <div className="layout">
            <nav className="sidebar">
                <div className="sidebar-brand">
                    <Leaf className="brand-icon" />
                    <span><span style={{ fontSize: '0.85em' }}>ಇಕೋಸ್ಟೂಡೆಂಟ್</span> (EcoStudent)</span>
                </div>
                <ul className="nav-links">
                    <li>
                        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')} end>
                            <LayoutDashboard size={20} />
                            <span><span style={{ fontSize: '0.85em' }}>ಡ್ಯಾಶ್‌ಬೋರ್ಡ್</span> (Dashboard)</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/calculator" className={({ isActive }) => (isActive ? 'active' : '')}>
                            <Calculator size={20} />
                            <span><span style={{ fontSize: '0.85em' }}>ಕ್ಯಾಲ್ಕುಲೇಟರ್</span> (Calculator)</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/history" className={({ isActive }) => (isActive ? 'active' : '')}>
                            <HistoryIcon size={20} />
                            <span><span style={{ fontSize: '0.85em' }}>ಹಿಸ್ಟರಿ</span> (History)</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/tips" className={({ isActive }) => (isActive ? 'active' : '')}>
                            <Lightbulb size={20} />
                            <span><span style={{ fontSize: '0.85em' }}>ಟಿಪ್ಸ್</span> (Tips)</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/learn" className={({ isActive }) => (isActive ? 'active' : '')}>
                            <BookOpen size={20} />
                            <span><span style={{ fontSize: '0.85em' }}>ಲರ್ನ್</span> (Learn)</span>
                        </NavLink>
                    </li>
                </ul>

                <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--clr-text-light)', fontSize: '0.9rem', fontWeight: 500 }}>
                        <Palette size={16} />
                        Themes
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                        {THEMES.map((theme) => (
                            <button
                                key={theme.id}
                                onClick={() => setCurrentTheme(theme.id)}
                                title={theme.name}
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    backgroundColor: theme.color,
                                    border: currentTheme === theme.id ? '2px solid var(--clr-text)' : '2px solid transparent',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    boxShadow: 'var(--shadow-sm)'
                                }}
                            />
                        ))}
                    </div>
                </div>
            </nav>
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
