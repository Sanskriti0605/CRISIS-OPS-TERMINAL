import React, { useState } from 'react';
import { User, Activity, FileText, Bed, MessageSquare, DownloadCloud, Stethoscope, Send, CheckCircle, Clock, Wind, HeartPulse } from 'lucide-react';

export default function PatientDashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const [chatMessages, setChatMessages] = useState([
        { text: "Hello John! I am your AI Health Assistant. How can I help you today?", isBot: true, isAction: false }
    ]);
    const [inputText, setInputText] = useState("");
    const [wardFilter, setWardFilter] = useState("All Wards");
    const [digiDocs, setDigiDocs] = useState([
        { id: 1, name: "Last MRI Scan", date: "Oct 12, 2025", status: "synced" },
        { id: 2, name: "Blood Report - Routine", date: "Sep 05, 2025", status: "synced" }
    ]);
    const [isFetchingDocs, setIsFetchingDocs] = useState(false);
    const [isThinking, setIsThinking] = useState(false);
    const [bookingStatus, setBookingStatus] = useState(null); // null | 'processing' | 'success' | 'kyc-required'
    const [hasSyncedDocs, setHasSyncedDocs] = useState(false);
    const [beds, setBeds] = useState([
        { id: 101, type: "General Ward", price: "₹4,000/day", status: "available" },
        { id: 102, type: "Semi-Private", price: "₹12,000/day", status: "available" },
        { id: 201, type: "ICU", price: "₹40,000/day", status: "occupied" },
        { id: 204, type: "Private Suite", price: "₹25,000/day", status: "available" },
    ]);

    const filteredBeds = beds.filter(b => wardFilter === 'All Wards' || b.type.includes(wardFilter));

    const fetchDigilockerDocs = () => {
        setIsFetchingDocs(true);
        setTimeout(() => {
            setDigiDocs(prev => [
                { id: Date.now(), name: "X-Ray Chest", date: "Today", status: "synced" },
                ...prev
            ]);
            setHasSyncedDocs(true);
            setIsFetchingDocs(false);
            if (bookingStatus === 'kyc-required') {
                setBookingStatus(null);
            }
        }, 2000);
    };

    const handleBookBed = async (bedRequest) => {
        if (!hasSyncedDocs) {
            setBookingStatus('kyc-required');
            return;
        }

        setBookingStatus('processing');
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setBeds(currentBeds => currentBeds.map(b => b.id === bedRequest.id ? { ...b, status: "occupied" } : b));
        
        // Save booking to localStorage for Staff Terminal to read
        const newBooking = { bedId: bedRequest.id, type: bedRequest.type, patient: 'John Doe', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
        const savedBookings = JSON.parse(localStorage.getItem('recentBookings') || '[]');
        localStorage.setItem('recentBookings', JSON.stringify([newBooking, ...savedBookings]));

        setBookingStatus('success');
        setTimeout(() => setBookingStatus(null), 3000); // clear notification
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;
        const userText = inputText;
        setChatMessages(prev => [...prev, { text: userText, isBot: false }]);
        setInputText("");
        setIsThinking(true);

        const lowerText = userText.toLowerCase();

        // Simulate agent reasoning delay
        await new Promise(resolve => setTimeout(resolve, 600));

        let botReply = "";

        // Agentic Tool Execution
        if (lowerText.includes('sync') || lowerText.includes('fetch') || lowerText.includes('document') || lowerText.includes('report')) {
            setChatMessages(prev => [...prev, { text: "Thought: User wants to sync documents. Calling `fetchDigilockerDocs` tool...", isBot: true, isAction: true }]);
            await new Promise(resolve => setTimeout(resolve, 800));
            fetchDigilockerDocs();
            botReply = "I have successfully run the tool to sync your latest reports from Digilocker. They will appear in your panel momentarily.";
        } 
        else if (lowerText.includes('book') || lowerText.includes('reserve') || lowerText.includes('need a bed')) {
            let reqType = null;
            if (lowerText.includes('general')) reqType = "General Ward";
            else if (lowerText.includes('semi')) reqType = "Semi-Private";
            else if (lowerText.includes('private')) reqType = "Private Suite";
            else if (lowerText.includes('icu')) reqType = "ICU";

            if (reqType) {
                setChatMessages(prev => [...prev, { text: `Thought: Checking availability using \`checkBeds("${reqType}")\`...`, isBot: true, isAction: true }]);
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                let bookedBed = null;
                const availableBed = beds.find(b => b.type === reqType && b.status === "available");
                
                if (availableBed) {
                    if (!hasSyncedDocs) {
                        botReply = `I found an available ${reqType} bed, but since this is your first booking, I need your documentation first. Please tap the 'Sync DigiLocker' button on your screen to verify your medical identity.`;
                        setBookingStatus('kyc-required');
                    } else {
                        bookedBed = availableBed;
                        setChatMessages(prev => [...prev, { text: `Action: Calling \`bookBed(userId, ${bookedBed.id})\`...`, isBot: true, isAction: true }]);
                        await handleBookBed(bookedBed);
                        botReply = `Success! I have booked a ${reqType} (Room ${bookedBed.id}) for you. You can see it updated in the Beds panel.`;
                    }
                } else {
                    botReply = `I'm sorry, I checked the system and we currently have no available beds in the ${reqType} section.`;
                }
            } else {
                botReply = "I can definitely book a bed for you. Could you please specify if you want a General, Semi-Private, or Private bed?";
            }
        } 
        else if (lowerText.includes('vitals') || lowerText.includes('heart') || lowerText.includes('blood pressure') || lowerText.includes('health')) {
             setChatMessages(prev => [...prev, { text: "Action: Calling `getPatientVitals(userId)`...", isBot: true, isAction: true }]);
             await new Promise(resolve => setTimeout(resolve, 800));
             botReply = "I just pulled your vitals from the monitors: Heart rate is 72 bpm, SpO2 is 98%, and Blood Pressure is 120/80. Everything looks stable.";
        } 
        else if (lowerText.includes('fever') || lowerText.includes('pain') || lowerText.includes('hurt') || lowerText.includes('emergency')) {
             setChatMessages(prev => [...prev, { text: "Thought: Patient is experiencing distress. Action: Calling `alertStaff(userId, priority: HIGH)`...", isBot: true, isAction: true }]);
             await new Promise(resolve => setTimeout(resolve, 800));
             botReply = "I've logged your symptoms and alerted an on-duty nurse. Someone will check on you shortly. Please use the SOS button on your bed if this is critical.";
        }
        else if (lowerText.includes('hi') || lowerText.includes('hello') || lowerText.includes('hey')) {
             botReply = "Hello! How are you feeling today? I'm your AI health assistant. Let me know if you need to view your vitals, fetch documents, or book a bed.";
        }
        else if (lowerText.includes('name') || lowerText.includes('who are you')) {
             botReply = "I am Sanctuary Health AI, your personal hospital assistant. I can help manage your stay seamlessly.";
        }
        else if (lowerText.includes('doctor')) {
             botReply = "Your assigned doctor is currently reviewing other patients on rounds. Would you like me to flag your record so they visit you next?";
        }
        else if (lowerText.includes('food') || lowerText.includes('hungry') || lowerText.includes('eat')) {
             botReply = "Meals are served based on your dietary requirements. Let me notify the cafeteria that you are requesting your next meal early.";
        }
        else if (lowerText.includes('discharge') || lowerText.includes('leave') || lowerText.includes('home')) {
             botReply = "Discharge procedures usually take a couple of hours after the doctor's final approval. Your records indicate you might be eligible soon.";
        }
        else if (lowerText.includes('thank')) {
             botReply = "You're completely welcome! Wishing you a speedy recovery. Let me know if there's anything else you need.";
        }
        else {
            // Dynamic fallback mimicking understanding and logging the user's specific input
            const echoed = userText.replace(/[.,?!]/g, '').trim();
            botReply = `I understand you're bringing up "${echoed}". I have recorded this specific request in your digital medical chart. The care team will review this shortly. Is there anything else you need assistance with?`;
        }

        setChatMessages(prev => [...prev, { text: botReply, isBot: true }]);
        setIsThinking(false);
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
                                    <button 
                                        className="btn-primary" 
                                        onClick={() => handleBookBed(b)}
                                        disabled={b.status === 'occupied' || bookingStatus === 'processing'} 
                                        style={{ width: '100%', opacity: b.status === 'occupied' ? 0.5 : 1 }}
                                    >
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
                                            background: m.isAction ? 'transparent' : (m.isBot ? 'var(--bg-main)' : 'var(--accent-primary)'),
                                            color: m.isAction ? 'var(--text-secondary)' : (m.isBot ? 'var(--text-primary)' : '#fff'),
                                            padding: m.isAction ? '8px 16px' : '12px 16px',
                                            borderRadius: m.isBot ? '12px 12px 12px 0' : '12px 12px 0 12px',
                                            maxWidth: '80%',
                                            fontSize: m.isAction ? 12 : 14,
                                            fontFamily: m.isAction ? 'monospace' : 'inherit',
                                            boxShadow: m.isAction ? 'none' : '0 2px 4px rgba(0,0,0,0.05)',
                                            border: m.isAction ? '1px dashed var(--bg-nav)' : 'none'
                                        }}>
                                            {m.text}
                                        </div>
                                    </div>
                                ))}
                                {isThinking && (
                                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                        <div style={{
                                            background: 'var(--bg-main)',
                                            color: 'var(--text-secondary)',
                                            padding: '12px 16px',
                                            borderRadius: '12px 12px 12px 0',
                                            fontSize: 14,
                                            fontStyle: 'italic',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px'
                                        }}>
                                            <div className="typing-dot" style={{width: 6, height: 6, background: 'var(--text-secondary)', borderRadius: '50%', animation: 'typing 1.4s infinite ease-in-out both', animationDelay: '-0.32s'}} />
                                            <div className="typing-dot" style={{width: 6, height: 6, background: 'var(--text-secondary)', borderRadius: '50%', animation: 'typing 1.4s infinite ease-in-out both', animationDelay: '-0.16s'}} />
                                            <div className="typing-dot" style={{width: 6, height: 6, background: 'var(--text-secondary)', borderRadius: '50%', animation: 'typing 1.4s infinite ease-in-out both'}} />
                                        </div>
                                    </div>
                                )}
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

            {/* Booking Overlay Notification */}
            {bookingStatus && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
                    <div style={{ background: 'var(--bg-main)', padding: '32px 48px', borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, border: '1px solid var(--bg-nav)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', textAlign: 'center', maxWidth: 400 }}>
                        {bookingStatus === 'processing' ? (
                            <>
                                <div style={{ width: 40, height: 40, borderRadius: '50%', border: '4px solid var(--bg-nav)', borderTopColor: 'var(--accent-primary)', animation: 'spin 1s linear infinite' }} />
                                <h3 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-primary)' }}>Processing Booking...</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>Allocating bed and verifying records.</p>
                            </>
                        ) : bookingStatus === 'kyc-required' ? (
                            <>
                                <FileText size={48} color="var(--accent-primary)" />
                                <h3 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-primary)' }}>Documents Required</h3>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>As this is your first booking, we need to verify your medical identification before proceeding to payment.</p>
                                <div style={{ display: 'flex', gap: 12, width: '100%', marginTop: 8 }}>
                                    <button className="btn-outline" style={{ flex: 1 }} onClick={() => setBookingStatus(null)}>Cancel</button>
                                    <button className="btn-primary" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }} onClick={fetchDigilockerDocs} disabled={isFetchingDocs}>
                                        {isFetchingDocs ? 'Syncing...' : <><DownloadCloud size={16} /> Sync DigiLocker</>}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <CheckCircle size={48} color="#2c694e" />
                                <h3 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-primary)' }}>Booking Confirmed!</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>The staff has been notified. We will escort you shortly.</p>
                            </>
                        )}
                    </div>
                </div>
            )}


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
                @keyframes typing {
                    0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
                    40% { transform: scale(1); opacity: 1; }
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}} />
        </div>
    )
}
