import React from 'react';
import { useCarbon } from '../store/CarbonContext';
import { Lightbulb, ArrowRight } from 'lucide-react';

const Tips = () => {
    const { footprint, inputs } = useCarbon();

    const getTips = () => {
        let suggestions = [];

        // Commute logic
        if (footprint.commute > 15) {
            if (inputs.commuteMode === 'car_petrol') {
                suggestions.push({
                    category: 'Commute',
                    title: 'Try Carpooling or Transit (or an EV!)',
                    desc: 'Your car commute makes up a large part of your footprint. Try taking the bus, train, or carpooling just twice a week. If you drive often, consider an Electric Vehicle.'
                });
            } else if (inputs.commuteMode === 'motorbike') {
                suggestions.push({
                    category: 'Commute',
                    title: 'Optimize Your Ride',
                    desc: 'Motorbikes are better than cars, but still emit CO₂. Keep your tires inflated to improve fuel efficiency, or consider switching to an e-scooter for short trips.'
                });
            }
        }

        // Electricity logic
        if (footprint.electricity > 12) {
            suggestions.push({
                category: 'Energy',
                title: 'Unplug Devices & LED Bulbs',
                desc: 'Unplug your laptop charger when not in use. Campus dorms often allow you to swap to LED bulbs to save energy.'
            });
        }

        // Diet logic
        if (inputs.dietType === 'omni' || inputs.dietType === 'nonveg') {
            suggestions.push({
                category: 'Diet',
                title: 'Meatless Mondays',
                desc: 'Cutting out meat just one day a week can significantly reduce your water and carbon footprint.'
            });
        }

        // Waste logic
        if (inputs.recyclingHabits === 'none') {
            suggestions.push({
                category: 'Waste',
                title: 'Start Small with Recycling',
                desc: 'Grab a separate bin just for aluminum cans and paper. Most campuses have easy drop-off points.'
            });
        } else if (inputs.recyclingHabits === 'some') {
            suggestions.push({
                category: 'Waste',
                title: 'Level Up Your Recycling',
                desc: "You're off to a good start! Try adding plastics and glass to your recycling routine to reduce your footprint further."
            });
        }

        // Heavy Waste Type logic
        if (inputs.heavyWasteTypes?.plastic) {
            suggestions.push({
                category: 'Waste',
                title: 'Cut Down Single-Use Plastics',
                desc: 'Try buying items with minimal packaging or swapping to a reusable water bottle and shopping bags.'
            });
        }

        if (inputs.heavyWasteTypes?.electronic) {
            suggestions.push({
                category: 'Waste',
                title: 'E-Waste Requires Special Care',
                desc: 'Electronic waste leaks toxic chemicals. Look up a certified campus or local e-waste drop-off site instead of throwing items in the trash.'
            });
        }

        if (inputs.heavyWasteTypes?.organic) {
            suggestions.push({
                category: 'Waste',
                title: 'Start Composting',
                desc: 'Organic waste creates high levels of methane in landfills. Check if your campus has a composting program or consider a small indoor compost bin.'
            });
        }

        // Default if doing well
        if (suggestions.length === 0) {
            suggestions.push({
                category: 'General',
                title: 'Keep it up!',
                desc: 'You are doing great! Share your eco-friendly habits with your friends to multiply your impact.'
            });
        }

        return suggestions;
    };

    const tips = getTips();

    return (
        <div className="page-container fade-in">
            <header className="page-header">
                <h1><span style={{ fontSize: '0.7em' }}>ಪರ್ಸನಲೈಸ್ಡ್ ಟಿಪ್ಸ್</span> (Personalized Tips)</h1>
                <p className="subtitle"><span style={{ fontSize: '0.85em' }}>ಆಕ್ಷನೇಬಲ್ ಅಡ್ವೈಸ್ ಬೇಸ್ಡ್ ಆನ್ ಯುವರ್ ಕರೆಂಟ್ ಹ್ಯಾಬಿಟ್ಸ್.</span> (Actionable advice based on your current habits.)</p>
            </header>

            <div className="tips-list">
                {tips.map((tip, index) => (
                    <div key={index} className="card tip-card hover-lift">
                        <div className="tip-icon">
                            <Lightbulb size={24} />
                        </div>
                        <div className="tip-content">
                            <div className="tip-meta">{tip.category}</div>
                            <h3>{tip.title}</h3>
                            <p>{tip.desc}</p>
                        </div>
                        <div className="tip-action">
                            <ArrowRight size={20} className="action-icon" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tips;
