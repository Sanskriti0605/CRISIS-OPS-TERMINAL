import React, { useState } from 'react';
import { User, Activity, FileText, Bed, MessageSquare, DownloadCloud, Stethoscope, Send, CheckCircle, Clock, Wind, HeartPulse } from 'lucide-react';

export default function PatientDashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const [chatMessages, setChatMessages] = useState([
        { text: "Hello John! I am your AI Health Assistant. How can I help you today?", isBot: true }
    ]);
    const [inputText, setInputText] = useState("");
    const [wardFilter, setWardFilter] = useState("All Wards");
    const [digiDocs, setDigiDocs] = useState([
        { id: 1, name: "Last MRI Scan", date: "Oct 12, 2025", status: "synced" },
        { id: 2, name: "Blood Report - Routine", date: "Sep 05, 2025", status: "synced" }
    ]);
    const [isFetchingDocs, setIsFetchingDocs] = useState(false);

    const beds = [
        { id: 101, type: "General Ward", price: "$50/day", status: "available" },
        { id: 102, type: "Semi-Private", price: "$150/day", status: "available" },
        { id: 201, type: "ICU", price: "$500/day", status: "occupied" },
        { id: 204, type: "Private Suite", price: "$300/day", status: "available" },
    ];

    const filteredBeds = beds.filter(b => wardFilter === 'All Wards' || b.type.includes(wardFilter));

    const fetchDigilockerDocs = () => {
        setIsFetchingDocs(true);
        setTimeout(() => {
            setDigiDocs([
                { id: 3, name: "X-Ray Chest", date: "Today", status: "synced" },
                ...digiDocs
            ]);
            setIsFetchingDocs(false);
            setChatMessages(prev => [...prev, { text: "I have successfully fetched and synced your latest X-Ray report from Digilocker.", isBot: true }]);
        }, 2000);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;
        const userText = inputText;
        setChatMessages(prev => [...prev, { text: userText, isBot: false }]);
        setInputText("");

        setTimeout(() => {
            let botReply = "I understand. I'm recording this information in your health file.";
            const lowerText = userText.toLowerCase();

            if (lowerText.includes('book') || lowerText.includes('bed')) {
                botReply = "You can book a bed right from the 'Book a Bed' tab above. We currently have beds available in General, Semi-Private, and Private Wards.";
                setActiveTab('beds');
            } else if (lowerText.includes('icu')) {
                botReply = "The ICU is currently fully occupied. Please contact the front desk immediately if this is an emergency.";
            } else if (lowerText.includes('fever') || lowerText.includes('pain')) {
                botReply = "I've noted your symptoms. A nurse will check on you shortly. Please use the SOS button if the pain is severe.";
            } else if (lowerText.includes('cost') || lowerText.includes('price')) {
                botReply = "Our General Ward is $50/day, Semi-Private is $150/day, and Private Suites are $300/day.";
            }

            setChatMessages(prev => [...prev, { text: botReply, isBot: true }]);
        }, 1000);
    };

    return (
        <div className="dashboard-layout" style={{ background: 'var(--bg-main)', color: 'var(--text-primary)', height: '100vh', overflowY: 'auto', display: 'block' }}>
            {/* Header */}
            <header className="glass-panel" style={{ padding: '20px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-card)', borderBottom: '1px solid var(--bg-nav)', borderRadius: 0, boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--bg-nav)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
                        <User size={24} />
                    </div>
                    <div>
                        <h1 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--accent-primary)', textTransform: 'capitalize' }}>Welcome back, John Doe</h1>
                        <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Patient ID: HX-99201 | Condition: Stable</div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                    <button onClick={() => setActiveTab('overview')} className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}>Overview</button>
                    <button onClick={() => setActiveTab('beds')} className={`tab-btn ${activeTab === 'beds' ? 'active' : ''}`}>Book a Bed</button>
                    <button onClick={() => setActiveTab('ai')} className={`tab-btn ${activeTab === 'ai' ? 'active' : ''}`}>AI & Documents</button>
                </div>
            </header>

            {/* Main Content */}
            <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: '24px', flex: 1, maxWidth: 1200, margin: '0 auto', width: '100%' }}>

                {activeTab === 'overview' && (
                    <>
                        <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-primary)' }}>Your Current Vitals</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                            {[
                                { label: "Heart Rate", value: "72 bpm", icon: <Activity />, color: "var(--accent-primary)" },
                                { label: "SpO2 Level", value: "98%", icon: <Wind />, color: "var(--accent-hover)" },
                                { label: "Blood Pressure", value: "120/80", icon: <HeartPulse />, color: "var(--accent-primary)" },
                                { label: "Temperature", value: "98.6°F", icon: <Activity />, color: "var(--accent-hover)" }
                            ].map((v, i) => (
                                <div key={i} className="glass-panel" style={{ padding: 24, borderRadius: 12, background: 'var(--bg-card)', border: '1px solid var(--bg-nav)', display: 'flex', alignItems: 'center', gap: 16 }}>
                                    <div style={{ color: v.color }}>{v.icon}</div>
                                    <div>
                                        <div style={{ fontSize: 12, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 1 }}>{v.label}</div>
                                        <div style={{ fontSize: 24, fontWeight: 700, marginTop: 4 }}>{v.value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-primary)', marginTop: 16 }}>Ongoing Treatments</h2>
                        <div className="glass-panel" style={{ background: 'var(--bg-card)', borderRadius: 12, padding: 24, border: '1px solid var(--bg-nav)' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                {[
                                    { name: "Physiotherapy Session", time: "2:00 PM today", status: "upcoming" },
                                    { name: "Antibiotics Administration", time: "6:00 PM today", status: "upcoming" }
                                ].map((t, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'var(--bg-main)', borderRadius: 8 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <Stethoscope size={20} color="var(--accent-primary)" />
                                            <div>
                                                <div style={{ fontWeight: 500 }}>{t.name}</div>
                                                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>{t.time}</div>
                                            </div>
                                        </div>
                                        <button className="btn-outline" style={{ fontSize: 12 }}>Reschedule</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'beds' && (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-primary)' }}>Available Hospital Beds</h2>
                            <div style={{ display: 'flex', gap: 8 }}>
                                <select
                                    className="input-field"
                                    style={{ width: 'auto', padding: '8px 16px', background: 'var(--bg-main)', color: 'var(--text-primary)', border: '1px solid var(--bg-nav)' }}
                                    value={wardFilter}
                                    onChange={(e) => setWardFilter(e.target.value)}
                                >
                                    <option value="All Wards">All Wards</option>
                                    <option value="General">General</option>
                                    <option value="Semi-Private">Semi-Private</option>
                                    <option value="ICU">ICU</option>
                                    <option value="Private Suite">Private Suite</option>
                                </select>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                            {filteredBeds.map((b) => (
                                <div key={b.id} className="glass-panel" style={{ background: 'var(--bg-card)', borderRadius: 12, padding: 24, border: '1px solid var(--bg-nav)', opacity: b.status === 'occupied' ? 0.6 : 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent-primary)' }}><Bed size={20} /> <span style={{ fontWeight: 600 }}>Room {b.id}</span></div>
                                        <span style={{ fontSize: 12, padding: '4px 8px', borderRadius: 4, background: b.status === 'available' ? 'rgba(44, 105, 78, 0.1)' : 'rgba(186, 26, 26, 0.1)', color: b.status === 'available' ? '#2c694e' : 'var(--alert-critical)' }}>
                                            {b.status === 'available' ? 'AVAILABLE' : 'OCCUPIED'}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 4 }}>{b.type}</div>
                                    <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 24 }}>{b.price}</div>
                                    <button className="btn-primary" disabled={b.status === 'occupied'} style={{ width: '100%', opacity: b.status === 'occupied' ? 0.5 : 1 }}>
                                        {b.status === 'available' ? 'Book Now' : 'Currently Full'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {activeTab === 'ai' && (
                    <div style={{ display: 'flex', gap: '24px', height: '65vh' }}>

                        {/* Digilocker Panel */}
                        <div className="glass-panel" style={{ flex: 1, background: 'var(--bg-card)', borderRadius: 12, display: 'flex', flexDirection: 'column', border: '1px solid var(--bg-nav)' }}>
                            <div style={{ padding: 20, borderBottom: '1px solid var(--bg-nav)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600 }}><DownloadCloud color="var(--accent-primary)" /> DigiLocker Sync</div>
                                <button onClick={fetchDigilockerDocs} disabled={isFetchingDocs} className="btn-primary" style={{ padding: '8px 16px', fontSize: 12 }}>
                                    {isFetchingDocs ? 'Syncing...' : 'Sync Latest'}
                                </button>
                            </div>
                            <div style={{ padding: 20, flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {digiDocs.map(doc => (
                                    <div key={doc.id} style={{ padding: 16, background: 'var(--bg-nav)', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <FileText size={20} color="var(--text-secondary)" />
                                            <div>
                                                <div style={{ fontSize: 14, fontWeight: 500 }}>{doc.name}</div>
                                                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>Fetched: {doc.date}</div>
                                            </div>
                                        </div>
                                        <CheckCircle size={16} color="#2c694e" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* AI Assistant Chat */}
                        <div className="glass-panel" style={{ flex: 1, background: 'var(--bg-card)', borderRadius: 12, display: 'flex', flexDirection: 'column', border: '1px solid var(--bg-nav)' }}>
                            <div style={{ padding: 20, borderBottom: '1px solid var(--bg-nav)', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600 }}>
                                <MessageSquare color="var(--accent-primary)" /> Sanctuary Health AI
                            </div>
                            <div style={{ padding: 20, flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
                                {chatMessages.map((m, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: m.isBot ? 'flex-start' : 'flex-end' }}>
                                        <div style={{
                                            background: m.isBot ? 'var(--bg-main)' : 'var(--accent-primary)',
                                            color: m.isBot ? 'var(--text-primary)' : '#fff',
                                            padding: '12px 16px',
                                            borderRadius: m.isBot ? '12px 12px 12px 0' : '12px 12px 0 12px',
                                            maxWidth: '80%',
                                            fontSize: 14,
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                        }}>
                                            {m.text}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ padding: 20, borderTop: '1px solid var(--bg-nav)' }}>
                                <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: 8 }}>
                                    <input
                                        type="text"
                                        className="input-field"
                                        placeholder="Ask about your health, records, or next checkup..."
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        style={{ background: 'var(--bg-main)', border: '1px solid var(--bg-nav)', color: 'var(--text-primary)', flex: 1 }}
                                    />
                                    <button type="submit" className="btn-primary" style={{ padding: '12px' }}><Send size={18} /></button>
                                </form>
                            </div>
                        </div>

                    </div>
                )}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .tab-btn {
                    background: transparent;
                    border: none;
                    color: var(--text-secondary);
                    font-family: var(--font-heading);
                    font-weight: 600;
                    font-size: 14px;
                    padding: 8px 16px;
                    cursor: pointer;
                    border-bottom: 2px solid transparent;
                    transition: all 0.2s;
                }
                .tab-btn.active {
                    color: var(--accent-primary);
                    border-bottom-color: var(--accent-primary);
                }
                .tab-btn:hover {
                    color: var(--accent-primary);
                }
            `}} />
        </div>
    )
}
