import React from 'react';
import { useCarbon } from '../store/CarbonContext';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from 'recharts';
import { TrendingDown, TrendingUp } from 'lucide-react';

const History = () => {
    const { history, NATIONAL_AVERAGE } = useCarbon();

    // Map history array for chart
    const data = history.map((entry, index) => ({
        name: entry.date,
        total: Math.round(entry.footprint.total),
        calculationId: index + 1
    }));

    // Generate trend summary
    const hasEnoughData = data.length >= 2;
    let trendMessage = "Keep calculating your weekly footprint to see your trend!";
    let isImproving = false;

    if (hasEnoughData) {
        const first = data[0].total;
        const last = data[data.length - 1].total;
        const diff = last - first;

        if (diff < 0) {
            isImproving = true;
            trendMessage = `Great job! Your footprint has decreased by ${Math.abs(diff)} kg since your first calculation.`;
        } else if (diff > 0) {
            trendMessage = `Your footprint has increased by ${diff} kg since your first calculation. Check the tips page for advice!`;
        } else {
            trendMessage = "Your footprint has remained stable overall.";
        }
    }

    return (
        <div className="page-container fade-in">
            <header className="page-header">
                <h1><span style={{ fontSize: '0.7em' }}>ಫುಟ್‌ಪ್ರಿಂಟ್ ಹಿಸ್ಟರಿ</span> (Footprint History)</h1>
                <p className="subtitle"><span style={{ fontSize: '0.85em' }}>ಟ್ರ್ಯಾಕ್ ಯುವರ್ ವೀಕ್ಲಿ ಇಂಪ್ರೂವ್‌ಮೆಂಟ್ಸ್ ಓವರ್ ಟೈಮ್.</span> (Track your weekly improvements over time.)</p>
            </header>

            {history.length === 0 ? (
                <div className="card text-center" style={{ padding: '3rem 1.5rem' }}>
                    <h2 style={{ color: 'var(--clr-text-light)', marginBottom: '1rem' }}>No history yet</h2>
                    <p>Go to the Calculator and save your first footprint to start tracking!</p>
                </div>
            ) : (
                <>
                    <div className={`card stat-card status-card ${isImproving ? 'success' : hasEnoughData ? 'warning' : ''}`}>
                        <div className="stat-icon">
                            {isImproving ? <TrendingDown size={32} /> : hasEnoughData ? <TrendingUp size={32} /> : <TrendingDown size={32} />}
                        </div>
                        <div className="stat-info">
                            <div className="stat-label">Overall Trend</div>
                            <div className="stat-desc" style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--clr-text)' }}>
                                {trendMessage}
                            </div>
                        </div>
                    </div>

                    <div className="card chart-card">
                        <h2><span style={{ fontSize: '0.7em' }}>ಯುವರ್ ಎನ್ವಿರಾನ್‌ಮೆಂಟಲ್ ಇಂಪ್ಯಾಕ್ಟ್ ಓವರ್ ಟೈಮ್</span> (Your Environmental Impact Over Time)</h2>
                        <div className="chart-wrapper">
                            <ResponsiveContainer width="100%" height={400}>
                                <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis
                                        dataKey="name"
                                        tick={{ fill: 'var(--clr-text-light)' }}
                                        tickMargin={10}
                                    />
                                    <YAxis
                                        tick={{ fill: 'var(--clr-text-light)' }}
                                        tickFormatter={(val) => `${val} kg`}
                                    />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }}
                                        formatter={(value) => [`${value} kg`, 'Total Footprint']}
                                    />
                                    <ReferenceLine
                                        y={NATIONAL_AVERAGE.total}
                                        label={{ position: 'top', value: 'Avg', fill: 'var(--clr-text-light)', fontSize: 12 }}
                                        stroke="var(--clr-warning)"
                                        strokeDasharray="3 3"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="total"
                                        stroke="var(--clr-primary)"
                                        strokeWidth={4}
                                        dot={{ fill: 'var(--clr-primary-dark)', strokeWidth: 2, r: 4 }}
                                        activeDot={{ r: 8, strokeWidth: 0 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default History;
