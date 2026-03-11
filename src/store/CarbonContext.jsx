import React, { createContext, useContext, useState, useEffect } from 'react';

const CarbonContext = createContext();

export const useCarbon = () => useContext(CarbonContext);

// National averages (weekly, tailored for a student in India based on ~1.9t/year)
export const NATIONAL_AVERAGE = {
    commute: 10, // kg CO2
    electricity: 10, // kg CO2
    diet: 12, // kg CO2
    waste: 4, // kg CO2
    total: 36 // kg CO2
};

export const CarbonProvider = ({ children }) => {
    const [footprint, setFootprint] = useState(() => {
        const saved = localStorage.getItem('carbonFootprint');
        return saved ? JSON.parse(saved) : {
            commute: 0,
            electricity: 0,
            diet: 0,
            waste: 0,
            total: 0
        };
    });

    const [inputs, setInputs] = useState(() => {
        const saved = localStorage.getItem('carbonInputs');
        if (saved) {
            const parsed = JSON.parse(saved);
            if (!parsed.heavyWasteTypes) {
                parsed.heavyWasteTypes = { plastic: false, electronic: false, organic: false };
            }
            if (parsed.commuteMode === 'car') {
                parsed.commuteMode = 'car_petrol';
            }

            // Migrate old diet data
            if (parsed.dietType === 'omnivore') parsed.dietType = 'omni';
            if (parsed.dietType === 'pescatarian') parsed.dietType = 'nonveg';
            if (parsed.dietType === 'vegan' || parsed.dietType === 'vegetarian') parsed.dietType = 'veg';

            return parsed;
        }
        return {
            commuteMode: 'car_petrol',
            commuteDistance: 0,
            electricityUsage: 0, // kWh
            dietType: 'omni',
            recyclingHabits: 'none',
            heavyWasteTypes: {
                plastic: false,
                electronic: false,
                organic: false
            }
        };
    });

    const [history, setHistory] = useState(() => {
        const saved = localStorage.getItem('carbonHistory');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('carbonFootprint', JSON.stringify(footprint));
        localStorage.setItem('carbonInputs', JSON.stringify(inputs));
        localStorage.setItem('carbonHistory', JSON.stringify(history));
    }, [footprint, inputs, history]);

    const calculateFootprint = (newInputs) => {
        let commute = 0;
        // IPCC based factors: kg CO2 per km
        const commuteDistanceWeekly = newInputs.commuteDistance * 5; // 5 days a week

        switch (newInputs.commuteMode) {
            case 'car_petrol':
            case 'car':
                commute = commuteDistanceWeekly * 0.17;
                break;
            case 'car_ev':
                // Factor represents typical grid carbon intensity to charge the EV
                commute = commuteDistanceWeekly * 0.05;
                break;
            case 'motorbike':
                commute = commuteDistanceWeekly * 0.11;
                break;
            case 'bus':
                commute = commuteDistanceWeekly * 0.08;
                break;
            case 'train':
                commute = commuteDistanceWeekly * 0.04;
                break;
            case 'bike':
            default:
                commute = 0;
                break;
        }

        // Electric: MoEF/CEA 2023 grid emission factor for India is ~0.727 kg CO2/kWh
        let electricity = (newInputs.electricityUsage || 0) * 0.727;

        // Diet weekly approx (IPCC based ranges)
        let diet = 25; // default omni
        if (newInputs.dietType === 'veg') diet = 12;
        if (newInputs.dietType === 'nonveg') diet = 40;

        // Waste weekly approx
        let waste = 20;
        if (newInputs.recyclingHabits === 'all') waste = 5;
        if (newInputs.recyclingHabits === 'most') waste = 10;
        if (newInputs.recyclingHabits === 'some') waste = 15;

        // Add penalties for heavy specific waste types
        if (newInputs.heavyWasteTypes?.plastic) waste += 10;
        if (newInputs.heavyWasteTypes?.electronic) waste += 15;
        if (newInputs.heavyWasteTypes?.organic) waste += 5;

        const total = commute + electricity + diet + waste;
        const newFootprint = { commute, electricity, diet, waste, total };

        setInputs(newInputs);
        setFootprint(newFootprint);

        // Add to history
        setHistory(prev => {
            const now = new Date();
            const dateStr = now.toLocaleDateString();
            // Prevent multiple entries per day to simulate weekly/daily tracking better
            // Or just append. We'll add a timestamp.
            const newEntry = {
                date: dateStr,
                timestamp: now.getTime(),
                footprint: newFootprint
            };
            return [...prev, newEntry];
        });
    };

    return (
        <CarbonContext.Provider value={{ footprint, inputs, history, calculateFootprint, NATIONAL_AVERAGE }}>
            {children}
        </CarbonContext.Provider>
    );
};
