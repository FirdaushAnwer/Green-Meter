import React from 'react';
import { useCarbon } from '../store/CarbonContext';
import { BarChart, Bar, PieChart, Pie, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingDown, TrendingUp, AlertCircle, CheckCircle2, TreePine, Car as CarIcon, Smartphone, Share2, Trophy, Lightbulb, Bus, Flame, ThermometerSun } from 'lucide-react';

const Dashboard = () => {
    const { footprint, NATIONAL_AVERAGE } = useCarbon();

    const isAboveAverage = footprint.total > NATIONAL_AVERAGE.total;
    const difference = Math.abs(footprint.total - NATIONAL_AVERAGE.total).toFixed(1);

    const data = [
        { name: 'Commute', score: Math.round(footprint.commute || 0) },
        { name: 'Electric', score: Math.round(footprint.electricity || 0) },
        { name: 'Diet', score: Math.round(footprint.diet || 0) },
        { name: 'Waste', score: Math.round(footprint.waste || 0) }
    ];

    const comparisonData = [
        { name: 'You', score: Math.round(footprint.total || 0) },
        { name: 'Average Student', score: Math.round(NATIONAL_AVERAGE.total) }
    ];

    // Equivalency calculations
    const totalWeeklyO2 = footprint.total || 0;
    const treesEquivalent = (totalWeeklyO2 / 60).toFixed(1); // roughly 60kg per tree grown for 10 years
    const milesEquivalent = Math.round(totalWeeklyO2 / 0.4); // roughly 0.4kg per mile driven
    const phonesEquivalent = Math.round(totalWeeklyO2 / 0.008); // roughly 0.008kg per smartphone charge

    // Social Share URLs
    const shareText = `My weekly carbon footprint is ${Math.round(totalWeeklyO2)} kg CO2e! I'm tracking my impact and taking steps to reduce it. 🌱 Join me!`;
    const shareUrl = "https://carbon-tracker-demo.app"; // Placeholder URL

    const encodeURL = (str) => encodeURIComponent(str);
    const twitterShare = `https://twitter.com/intent/tweet?text=${encodeURL(shareText)}&url=${encodeURL(shareUrl)}`;
    const whatsappShare = `https://wa.me/?text=${encodeURL(shareText + " " + shareUrl)}`;
    const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURL(shareUrl)}&summary=${encodeURL(shareText)}`;

    // Dynamic Leaderboard Data
    const baseSavers = [
        { id: 'user-1', name: "Aarav P.", score: 75, badge: "🌿 Forest Guardian" },
        { id: 'user-2', name: "Diya M.", score: 82, badge: "🌱 Green Pioneer" },
        { id: 'user-3', name: "Rohan S.", score: 94, badge: "🍃 Eco Warrior" },
    ];

    const currentUserScore = Math.round(totalWeeklyO2);

    // Combine mock data with the current user's score if they have one
    const combinedLeaderboard = [...baseSavers];

    if (currentUserScore > 0) {
        combinedLeaderboard.push({
            id: 'current-user',
            name: "You (Current)",
            score: currentUserScore,
            badge: "EcoStudent",
            isCurrentUser: true
        });
    }

    // Sort by score ascending (lowest emission wins)
    const sortedLeaderboard = combinedLeaderboard.sort((a, b) => a.score - b.score);
    // Grab the top 3
    const top3Leaderboard = sortedLeaderboard.slice(0, 3);

    // Check if user is outside top 3
    const isUserInTop3 = top3Leaderboard.some(saver => saver.isCurrentUser);

    return (
        <div className="page-container dashboard fade-in">
            <header className="page-header">
                <h1><span style={{ fontSize: '0.7em' }}>ಯುವರ್ ಕಾರ್ಬನ್ ಫುಟ್‌ಪ್ರಿಂಟ್</span> (Your Carbon Footprint)</h1>
                <p className="subtitle"><span style={{ fontSize: '0.85em' }}>ಟ್ರ್ಯಾಕ್ ಯುವರ್ ವೀಕ್ಲಿ ಇಂಪ್ಯಾಕ್ಟ್ ಕಂಪೇರ್ಡ್ ಟು ನ್ಯಾಷನಲ್ ಆವರೇಜಸ್.</span> (Track your weekly impact compared to national averages.)</p>
            </header>

            <div className="summary-cards">
                <div className="card stat-card primary-gradient">
                    <div className="stat-label">Total Weekly CO₂e</div>
                    <div className="stat-value">{footprint.total ? Math.round(footprint.total) : '0'} <small>kg</small></div>
                </div>

                <div className={`card stat-card status-card ${isAboveAverage ? 'warning' : 'success'}`}>
                    <div className="stat-icon">
                        {isAboveAverage ? <AlertCircle size={32} /> : <CheckCircle2 size={32} />}
                    </div>
                    <div className="stat-info">
                        <div className="stat-label">Status</div>
                        <div className="stat-desc">
                            {isAboveAverage
                                ? `${difference} kg higher than avg`
                                : `${difference} kg lower than avg`}
                        </div>
                        <div className="trend-indicator">
                            {isAboveAverage ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                        </div>
                    </div>
                </div>
            </div>

            <div className="charts-grid">
                <div className="card chart-card">
                    <h2><span style={{ fontSize: '0.75em' }}>ಕ್ಯಾಟಗರಿ ಬ್ರೇಕ್‌ಡೌನ್</span> (Category Breakdown)</h2>
                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" />
                                <Tooltip cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill="var(--clr-primary)" />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card chart-card">
                    <h2><span style={{ fontSize: '0.75em' }}>ವಿಎಸ್ ನ್ಯಾಷನಲ್ ಆವರೇಜ್</span> (vs. National Average)</h2>
                    <div className="chart-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={comparisonData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="score"
                                    label={({ name, score }) => `${name}: ${score} kg`}
                                    labelLine={true}
                                >
                                    {comparisonData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 0 ? 'var(--clr-primary-dark)' : '#cbd5e1'} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => `${value} kg`} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="card" style={{ marginTop: '0', backgroundColor: isAboveAverage ? 'var(--clr-warning-light)' : 'var(--clr-primary-50)', borderColor: isAboveAverage ? '#fde68a' : '#a7f3d0' }}>
                <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: isAboveAverage ? '#92400e' : '#065f46' }}>
                    <ThermometerSun size={24} />
                    <span style={{ fontSize: '0.8em' }}>ಕ್ಲೈಮೇಟ್ ಎಫೆಕ್ಟ್</span> (Climate Affect)
                </h2>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                        {isAboveAverage ? (
                            <p style={{ color: '#92400e', fontSize: '1.05rem', fontWeight: 500 }}>
                                Your current emissions are <strong>higher</strong> than the national average. If everyone lived like this, we would rapidly accelerate global warming and sea-level rise. Every small change you make helps cool the earth!
                            </p>
                        ) : (
                            <p style={{ color: '#065f46', fontSize: '1.05rem', fontWeight: 500 }}>
                                Great job! Your emissions are <strong>below</strong> the national average. By sustaining this lifestyle, you are actively helping to slow down climate change and preserve natural habitats. Keep it up!
                            </p>
                        )}
                    </div>
                    <div style={{ fontSize: '3rem' }}>
                        {isAboveAverage ? '🌡️' : '🌍'}
                    </div>
                </div>
            </div>

            <div className="card" style={{ marginTop: '0' }}>
                <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}><span style={{ fontSize: '0.8em' }}>ರಿಯಲ್ ವರ್ಲ್ಡ್ ಇಂಪ್ಯಾಕ್ಟ್</span> (Real World Impact)</h2>
                <p style={{ color: 'var(--clr-text-light)', marginBottom: '1.5rem' }}>Your weekly footprint of <strong>{Math.round(totalWeeklyO2)} kg CO₂e</strong> is equivalent to:</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '1rem', backgroundColor: 'var(--clr-bg)', borderRadius: 'var(--radius-md)' }}>
                        <TreePine size={32} style={{ color: 'var(--clr-primary)', marginBottom: '0.5rem' }} />
                        <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>{treesEquivalent}</span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--clr-text-light)' }}>Tree seedlings grown for 10 years</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '1rem', backgroundColor: 'var(--clr-bg)', borderRadius: 'var(--radius-md)' }}>
                        <CarIcon size={32} style={{ color: 'var(--clr-primary)', marginBottom: '0.5rem' }} />
                        <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>{milesEquivalent}</span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--clr-text-light)' }}>Miles driven in a gas car</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '1rem', backgroundColor: 'var(--clr-bg)', borderRadius: 'var(--radius-md)' }}>
                        <Smartphone size={32} style={{ color: 'var(--clr-primary)', marginBottom: '0.5rem' }} />
                        <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>{phonesEquivalent.toLocaleString()}</span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--clr-text-light)' }}>Smartphones charged</span>
                    </div>
                </div>
            </div>

            <div className="card" style={{ marginTop: '0' }}>
                <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Trophy size={24} style={{ color: 'var(--clr-warning)' }} />
                    <span style={{ fontSize: '0.8em' }}>ಟಾಪ್ ಸೇವರ್ಸ್ ಆಫ್ ದಿ ವೀಕ್</span> (Top Savers of the Week)
                </h2>
                <p style={{ color: 'var(--clr-text-light)', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '0.85em' }}>ಯೂಸರ್ಸ್ ಇನ್ ಅವರ್ ಕಮ್ಯೂನಿಟಿ ವಿತ್ ದಿ ಲೋವೆಸ್ಟ್ ಎಮಿಷನ್ ರೆಕಾರ್ಡ್ಸ್.</span> (Users in our community with the lowest emission records.)
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {top3Leaderboard.map((user, index) => (
                        <div key={user.id} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '1rem',
                            backgroundColor: user.isCurrentUser ? 'var(--clr-primary-50)' : (index === 0 ? 'var(--clr-warning-light)' : 'var(--clr-bg)'),
                            borderRadius: 'var(--radius-md)',
                            border: user.isCurrentUser ? '2px dashed var(--clr-primary)' : (index === 0 ? '1px solid #fde68a' : '1px solid transparent'),
                            boxShadow: user.isCurrentUser ? 'var(--shadow-sm)' : 'none'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    width: '32px', height: '32px', borderRadius: '50%',
                                    backgroundColor: index === 0 ? 'var(--clr-warning)' : (user.isCurrentUser ? 'var(--clr-primary)' : 'var(--clr-primary-light)'),
                                    color: index === 0 || user.isCurrentUser ? 'white' : 'var(--clr-primary-dark)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
                                }}>
                                    {index + 1}
                                </div>
                                <div>
                                    <div style={{ fontWeight: 600, color: user.isCurrentUser ? 'var(--clr-primary-dark)' : 'var(--clr-text)' }}>{user.name}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--clr-text-light)' }}>{user.badge}</div>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontWeight: 700, fontSize: '1.2rem', color: user.isCurrentUser ? 'var(--clr-primary)' : 'var(--clr-primary-dark)' }}>{user.score} <span style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>kg</span></div>
                            </div>
                        </div>
                    ))}

                    {/* Show user at bottom if they are NOT in the Top 3 */}
                    {totalWeeklyO2 > 0 && !isUserInTop3 && (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '1rem',
                            backgroundColor: 'var(--clr-surface)',
                            borderRadius: 'var(--radius-md)',
                            border: '1px dashed var(--clr-text-light)',
                            marginTop: '0.5rem',
                            opacity: 0.8
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    width: '32px', height: '32px', borderRadius: '50%',
                                    backgroundColor: 'var(--clr-bg)',
                                    color: 'var(--clr-text-light)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
                                }}>
                                    -
                                </div>
                                <div style={{ fontWeight: 600, color: 'var(--clr-text)' }}>You (Current)</div>
                            </div>
                            <div style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--clr-text-light)' }}>
                                {currentUserScore} <span style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>kg</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Ways to Reduce Emission Section */}
            <div className="card" style={{ marginTop: '0' }}>
                <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Lightbulb size={24} style={{ color: 'var(--clr-primary)' }} />
                    <span style={{ fontSize: '0.8em' }}>ವೇಸ್ ಟು ರೆಡ್ಯೂಸ್ ಎಮಿಷನ್</span> (Ways to Reduce Emission)
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.5rem', backgroundColor: 'var(--clr-bg)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ backgroundColor: 'var(--clr-primary-50)', padding: '0.75rem', borderRadius: '50%', color: 'var(--clr-primary)' }}>
                            <Bus size={24} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--clr-text)' }}>Opt for Public Transit</h3>
                            <p style={{ color: 'var(--clr-text-light)', fontSize: '0.9rem' }}>Taking the bus or carpooling instead of driving alone can instantly cut your daily commute emissions by over 50%.</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.5rem', backgroundColor: 'var(--clr-bg)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ backgroundColor: 'var(--clr-primary-50)', padding: '0.75rem', borderRadius: '50%', color: 'var(--clr-primary)' }}>
                            <Flame size={24} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--clr-text)' }}>Energy Efficiency</h3>
                            <p style={{ color: 'var(--clr-text-light)', fontSize: '0.9rem' }}>Turn off lights and unplug heavy appliances (like heaters and ACs) when not in use to save both power and money.</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.5rem', backgroundColor: 'var(--clr-bg)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ backgroundColor: 'var(--clr-primary-50)', padding: '0.75rem', borderRadius: '50%', color: 'var(--clr-primary)' }}>
                            <TreePine size={24} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--clr-text)' }}>Plant-Based Meals</h3>
                            <p style={{ color: 'var(--clr-text-light)', fontSize: '0.9rem' }}>Swapping just a few meat-heavy meals a week for plant-based alternatives massively reduces dietary carbon output.</p>
                        </div>
                    </div>

                </div>
            </div>

            <div className="card" style={{ marginTop: '0', textAlign: 'center' }}>
                <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <Share2 size={24} style={{ color: 'var(--clr-primary)' }} />
                    <span style={{ fontSize: '0.8em' }}>ಶೇರ್ ಯುವರ್ ಇಂಪ್ಯಾಕ್ಟ್</span> (Share Your Impact)
                </h2>
                <p style={{ color: 'var(--clr-text-light)', marginBottom: '1.5rem' }}>Inspire others to track and reduce their carbon footprint!</p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <a href={twitterShare} target="_blank" rel="noopener noreferrer" className="btn" style={{ backgroundColor: '#1DA1F2', color: 'white', textDecoration: 'none' }}>
                        Share on X (Twitter)
                    </a>
                    <a href={whatsappShare} target="_blank" rel="noopener noreferrer" className="btn" style={{ backgroundColor: '#25D366', color: 'white', textDecoration: 'none' }}>
                        Share on WhatsApp
                    </a>
                    <a href={linkedinShare} target="_blank" rel="noopener noreferrer" className="btn" style={{ backgroundColor: '#0A66C2', color: 'white', textDecoration: 'none' }}>
                        Share on LinkedIn
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
