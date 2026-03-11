import React, { useState } from 'react';
import { useCarbon } from '../store/CarbonContext';
import { useNavigate } from 'react-router-dom';
import { Car, Zap, Utensils, Recycle } from 'lucide-react';

const Calculator = () => {
    const { inputs, calculateFootprint } = useCarbon();
    const [localInputs, setLocalInputs] = useState(inputs);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name.startsWith('waste_')) {
            const wasteType = name.replace('waste_', '');
            setLocalInputs(prev => ({
                ...prev,
                heavyWasteTypes: {
                    ...(prev.heavyWasteTypes || {}),
                    [wasteType]: checked
                }
            }));
            return;
        }

        setLocalInputs(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        calculateFootprint(localInputs);
        navigate('/');
    };

    return (
        <div className="page-container fade-in">
            <header className="page-header">
                <h1><span style={{ fontSize: '0.7em' }}>ಕಾರ್ಬನ್ ಕ್ಯಾಲ್ಕುಲೇಟರ್</span> (Carbon Calculator)</h1>
                <p className="subtitle"><span style={{ fontSize: '0.85em' }}>ಎಂಟರ್ ಯುವರ್ ವೀಕ್ಲಿ ಹ್ಯಾಬಿಟ್ಸ್ ಟು ಎಸ್ಟಿಮೇಟ್ ಯುವರ್ ಫುಟ್‌ಪ್ರಿಂಟ್.</span> (Enter your weekly habits to estimate your footprint.)</p>
            </header>

            <form onSubmit={handleSubmit} className="calculator-form card">
                {/* Commute */}
                <section className="form-section">
                    <div className="section-header">
                        <Car className="section-icon" />
                        <h2><span style={{ fontSize: '0.75em' }}>ಕಮ್ಯೂಟ್</span> (Commute)</h2>
                    </div>
                    <div className="input-group">
                        <label>Mode of Transport</label>
                        <select name="commuteMode" value={localInputs.commuteMode} onChange={handleChange}>
                            <optgroup label="Private">
                                <option value="car_petrol">Car (Petrol/Diesel)</option>
                                <option value="car_ev">Electric Vehicle (EV)</option>
                                <option value="motorbike">Motorbike / Scooter</option>
                            </optgroup>
                            <optgroup label="Public">
                                <option value="bus">Bus</option>
                                <option value="train">Train / Metro</option>
                            </optgroup>
                            <optgroup label="Active">
                                <option value="bike">Bicycle / Walk</option>
                            </optgroup>
                        </select>
                    </div>

                    {localInputs.commuteMode !== 'bike' && (
                        <div className="input-group">
                            <label>Average Daily Distance (km, one-way) — calculated for a 5-day week</label>
                            <input
                                type="number"
                                name="commuteDistance"
                                value={localInputs.commuteDistance}
                                onChange={handleChange}
                                min="0"
                                step="0.1"
                            />
                        </div>
                    )}
                </section>

                {/* Electricity */}
                <section className="form-section">
                    <div className="section-header">
                        <Zap className="section-icon" />
                        <h2><span style={{ fontSize: '0.75em' }}>ಎಲೆಕ್ಟ್ರಿಸಿಟಿ</span> (Electricity)</h2>
                    </div>
                    <div className="input-group">
                        <label>Estimated Weekly Electricity Usage (kWh)</label>
                        <input
                            type="number"
                            name="electricityUsage"
                            value={localInputs.electricityUsage || 0}
                            onChange={handleChange}
                            min="0"
                            step="1"
                        />
                        <small className="help-text">Check your electric meter or divide monthly kWh by 4.</small>
                    </div>
                </section>

                {/* Diet */}
                <section className="form-section">
                    <div className="section-header">
                        <Utensils className="section-icon" />
                        <h2><span style={{ fontSize: '0.75em' }}>ಡಯಟ್</span> (Diet)</h2>
                    </div>
                    <div className="input-group">
                        <label>Primary Diet Type</label>
                        <select name="dietType" value={localInputs.dietType} onChange={handleChange}>
                            <option value="omni">Omnivore (Mixed Veg/Meat)</option>
                            <option value="nonveg">Non-Vegetarian (Meat Heavy)</option>
                            <option value="veg">Vegetarian / Vegan</option>
                        </select>
                    </div>
                </section>

                {/* Waste */}
                <section className="form-section">
                    <div className="section-header">
                        <Recycle className="section-icon" />
                        <h2><span style={{ fontSize: '0.75em' }}>ವೇಸ್ಟ್ ಹ್ಯಾಬಿಟ್ಸ್</span> (Waste Habits)</h2>
                    </div>
                    <div className="input-group">
                        <label>Recycling Level</label>
                        <select name="recyclingHabits" value={localInputs.recyclingHabits} onChange={handleChange}>
                            <option value="none">I rarely recycle</option>
                            <option value="some">I recycle some things (paper/cans)</option>
                            <option value="most">I recycle most things (paper/plastics/glass)</option>
                            <option value="all">I recycle everything possible & compost</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label>Did you generate a high amount of these specific waste types this week?</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'normal' }}>
                                <input
                                    type="checkbox"
                                    name="waste_plastic"
                                    checked={localInputs.heavyWasteTypes?.plastic || false}
                                    onChange={handleChange}
                                    style={{ width: 'auto' }}
                                />
                                Heavy Plastic Waste (Bottles, Packaging)
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'normal' }}>
                                <input
                                    type="checkbox"
                                    name="waste_electronic"
                                    checked={localInputs.heavyWasteTypes?.electronic || false}
                                    onChange={handleChange}
                                    style={{ width: 'auto' }}
                                />
                                E-Waste (Batteries, Old Electronics)
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'normal' }}>
                                <input
                                    type="checkbox"
                                    name="waste_organic"
                                    checked={localInputs.heavyWasteTypes?.organic || false}
                                    onChange={handleChange}
                                    style={{ width: 'auto' }}
                                />
                                High Food/Organic Waste (No Composting)
                            </label>
                        </div>
                    </div>
                </section>

                <button type="submit" className="btn btn-primary btn-large">Calculate Footprint</button>
            </form>
        </div>
    );
};

export default Calculator;
