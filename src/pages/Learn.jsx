import React from 'react';
import { BookOpen, Car, Zap, Utensils, Recycle, TreePine } from 'lucide-react';

const Learn = () => {
    return (
        <div className="page-container fade-in">
            <header className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <BookOpen size={32} style={{ color: 'var(--clr-primary)' }} />
                    <h1 style={{ marginBottom: 0 }}><span style={{ fontSize: '0.7em' }}>ಲರ್ನ್ ಟು ರೆಡ್ಯೂಸ್</span> (Learn to Reduce)</h1>
                </div>
                <p className="subtitle"><span style={{ fontSize: '0.85em' }}>ಅಂಡರ್‌ಸ್ಟ್ಯಾಂಡ್ ಹೌ ಟು ಎಫೆಕ್ಟಿವ್ಲಿ ಲೋವರ್ ಯುವರ್ ಕಾರ್ಬನ್ ಫುಟ್‌ಪ್ರಿಂಟ್.</span> (Understand how to effectively lower your carbon footprint.)</p>
            </header>

            <div className="card" style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--clr-primary-dark)' }}>Why Does It Matter?</h2>
                <p style={{ color: 'var(--clr-text-light)', marginBottom: '1rem' }}>
                    Carbon emissions trap heat in the atmosphere, leading to global warming and climate change. By making small, conscious changes to your daily habits, you can significantly reduce the amount of CO₂ you contribute to the environment. Collective action is the key to preserving our planet for future generations.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {/* Commute */}
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ backgroundColor: 'var(--clr-primary-50)', padding: '0.5rem', borderRadius: '50%', color: 'var(--clr-primary)' }}>
                            <Car size={24} />
                        </div>
                        <h3 style={{ fontSize: '1.1rem' }}>Commute Smarter</h3>
                    </div>
                    <ul style={{ paddingLeft: '1.5rem', color: 'var(--clr-text-light)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <li><strong>Carpool:</strong> Sharing a ride with just one other person cuts your travel emissions in half.</li>
                        <li><strong>Public Transit:</strong> Buses and trains move many people at once, making them vastly more efficient than single-occupancy vehicles.</li>
                        <li><strong>Active Transport:</strong> Walking or biking produces zero emissions and is great for your health.</li>
                        <li><strong>Switch to EVs:</strong> Electric vehicles produce no tailpipe emissions. Their total impact depends on the local power grid, but they are almost always cleaner than gas cars over their lifespan.</li>
                    </ul>
                </div>

                {/* Electricity */}
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ backgroundColor: 'var(--clr-warning-light)', padding: '0.5rem', borderRadius: '50%', color: '#d97706' }}>
                            <Zap size={24} />
                        </div>
                        <h3 style={{ fontSize: '1.1rem' }}>Energy Conservation</h3>
                    </div>
                    <ul style={{ paddingLeft: '1.5rem', color: 'var(--clr-text-light)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <li><strong>Unplug "Vampire" Electronics:</strong> Devices draw power even when turned off but plugged in. Use power strips to easily disconnect them.</li>
                        <li><strong>LED Bulbs:</strong> LED lights use up to 90% less energy and last up to 25 times longer than traditional incandescent bulbs.</li>
                        <li><strong>Adjust the Thermostat:</strong> Lower your thermostat a few degrees in winter and raise it in summer. A 2-degree difference can save up to 10% on energy costs and emissions.</li>
                        <li><strong>Wash in Cold Water:</strong> Heating water accounts for about 90% of the energy your washing machine uses.</li>
                    </ul>
                </div>

                {/* Diet */}
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ backgroundColor: 'var(--clr-primary-50)', padding: '0.5rem', borderRadius: '50%', color: 'var(--clr-success)' }}>
                            <Utensils size={24} />
                        </div>
                        <h3 style={{ fontSize: '1.1rem' }}>Sustainable Diet</h3>
                    </div>
                    <ul style={{ paddingLeft: '1.5rem', color: 'var(--clr-text-light)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <li><strong>Reduce Meat Consumption:</strong> Livestock farming, especially beef and lamb, produces massive amounts of methane (a potent greenhouse gas). "Meatless Mondays" is a great start.</li>
                        <li><strong>Eat Local & Seasonal:</strong> Buying local reduces the emissions required to transport food across the world.</li>
                        <li><strong>Minimize Food Waste:</strong> When food rots in landfills, it produces methane. Plan meals carefully and compost scraps.</li>
                    </ul>
                </div>

                {/* Waste */}
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ backgroundColor: '#e0f2fe', padding: '0.5rem', borderRadius: '50%', color: '#0284c7' }}>
                            <Recycle size={24} />
                        </div>
                        <h3 style={{ fontSize: '1.1rem' }}>Waste Management</h3>
                    </div>
                    <ul style={{ paddingLeft: '1.5rem', color: 'var(--clr-text-light)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <li><strong>The 3 Rs:</strong> Reduce what you buy, Reuse what you can, and Recycle the rest.</li>
                        <li><strong>Avoid Single-Use Plastics:</strong> Plastics are made from fossil fuels and take hundreds of years to decompose. Use a reusable water bottle and bags.</li>
                        <li><strong>Composting:</strong> Composting organic waste prevents it from releasing methane in landfills and creates nutrient-rich soil.</li>
                    </ul>
                </div>
            </div>

            <div className="card" style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', backgroundColor: 'var(--clr-primary-dark)', color: 'white', border: 'none' }}>
                <div style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}>
                    <TreePine size={48} />
                </div>
                <div>
                    <h2 style={{ color: 'white', marginBottom: '0.5rem' }}>Start Small, Dream Big</h2>
                    <p style={{ opacity: 0.9 }}>You don't have to be perfect to make a difference. Pick one or two habits from this page to focus on this week, and slowly build a sustainable lifestyle. Every kg of CO₂ counts!</p>
                </div>
            </div>
        </div>
    );
};

export default Learn;
