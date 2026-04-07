import React, { useState, useEffect } from 'react';
import { Activity, AlertTriangle, UserCheck, Stethoscope, BriefcaseMedical, FlaskConical, TestTube, Users, Syringe, Clock, X, HeartPulse, BrainCircuit, ScanHeart, Database, Radio } from 'lucide-react';

export default function Dashboard() {
    const [timeRemaining, setTimeRemaining] = useState(4 * 3600 + 12 * 60 + 59);
    const [selectedBed, setSelectedBed] = useState(null);

    useEffect(() => {
        const targetDate = Date.now() + timeRemaining * 1000;
        const interval = setInterval(() => {
            const now = Date.now();
            let diff = Math.floor((targetDate - now) / 1000);
            if (diff < 0) diff = 0;
            setTimeRemaining(diff);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (totalSeconds) => {
        const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
        const s = (totalSeconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    const getDoctorName = (i) => {
        const docs = ['Dr. Sarah Chen', 'Dr. Marcus Webb', 'Dr. Elena Rostova', 'Dr. Ali Hassan', 'Dr. James Okoye'];
        return docs[i % docs.length];
    };

    const getDiagnosis = (i) => {
        const diagnoses = ['Respiratory Distress (Viral)', 'Cardiac Arrhythmia', 'Neurological Trauma', 'Post-Op Observation', 'Metabolic Imbalance'];
        return diagnoses[i % diagnoses.length];
    };

    // Generate 48 beds
    const beds = Array.from({ length: 48 }, (_, i) => {
        const isCritical = i % 8 === 0;
        const isStable = i % 3 === 0 && !isCritical;
        const isEmpty = !isCritical && !isStable;
        const isLab = i % 12 === 0; // Just for simulating some extra data if needed
        return {
            id: `BD-${i + 100}`,
            status: isCritical ? 'critical' : isStable ? 'stable' : 'empty',
            patient: isCritical || isStable ? `PT-${Math.floor(1000 + Math.random() * 9000)}` : null,
            patientName: isCritical || isStable ? `Subject ${String.fromCharCode(65 + (i % 26))}${i}` : null,
            hr: isCritical ? Math.floor(120 + Math.random() * 40) : isStable ? Math.floor(60 + Math.random() * 40) : null,
            bp: isCritical ? '85/50' : '120/80',
            o2: isCritical ? Math.floor(75 + Math.random() * 15) : Math.floor(95 + Math.random() * 5),
            doctor: getDoctorName(i),
            diagnosis: getDiagnosis(i),
            aiPrediction: isCritical ? 'Risk of Cardiac Arrest - 88%' : 'Expected Discharge: 48 Hrs'
        };
    });

    return (
        <div className="dashboard-layout">
            {/* 1. Header Row */}
            <header className="glass-panel" style={{ padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Activity color="var(--accent-primary)" size={32} />
                    <div>
                        <h1 className="text-accent" style={{ fontSize: '24px', letterSpacing: '2px' }}>CRISIS OPS CORE</h1>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ display: 'inline-block', width: '8px', height: '8px', background: 'var(--accent-primary)', borderRadius: '50%', boxShadow: '0 0 5px var(--accent-primary)' }}></span>
                            SYSTEMS ONLINE - ENCRYPTED
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                    <div style={{ textAlign: 'right' }}>
                        <span className="label" style={{ color: 'var(--text-secondary)', fontSize: '10px' }}>AI INFLUX (Next 2hr)</span>
                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: '#ffd700', fontWeight: 'bold' }}>+45 PTS</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <span className="label" style={{ color: 'var(--text-secondary)', fontSize: '10px' }}>CODE BLUES</span>
                        <div className="text-alert" style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 'bold' }}>3</div>
                    </div>
                    <div style={{ background: 'rgba(157, 240, 218, 0.1)', border: '1px solid var(--alert-critical)', padding: '4px 20px', borderRadius: '4px', textAlign: 'center', boxShadow: 'inset 0 0 10px rgba(157, 240, 218, 0.2)' }}>
                        <span className="label" style={{ color: 'var(--alert-critical)', fontSize: '10px' }}>TIME-TO-ACTION</span>
                        <div className="text-alert" style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: 'bold', textShadow: '0 0 15px rgba(157, 240, 218, 0.8)' }}>
                            {formatTime(timeRemaining)}
                        </div>
                    </div>
                </div>
            </header>

            {/* 2. Operations / Facility Overview Stats Bar */}
            <div className="glass-panel" style={{ padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(5, 9, 16, 0.8)' }}>
                <div style={{ display: 'flex', gap: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Stethoscope size={20} className="text-accent" />
                        <div>
                            <div style={{ fontSize: '10px', color: 'var(--text-secondary)', fontFamily: 'var(--font-heading)' }}>DOCTORS ON ROUNDS</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>45 / 62 <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>ACTIVE</span></div>
                        </div>
                    </div>
                    <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <UserCheck size={20} className="text-accent" />
                        <div>
                            <div style={{ fontSize: '10px', color: 'var(--text-secondary)', fontFamily: 'var(--font-heading)' }}>FIELD NURSES</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>142 <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>DEPLOYED</span></div>
                        </div>
                    </div>
                    <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <FlaskConical size={20} className="text-accent" />
                        <div>
                            <div style={{ fontSize: '10px', color: 'var(--text-secondary)', fontFamily: 'var(--font-heading)' }}>DIAGNOSTIC LABS</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>7 <span className="text-alert" style={{ fontSize: '12px' }}>IN-USE</span> <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginLeft: '4px' }}>| 3 EMPTY</span></div>
                        </div>
                    </div>
                    <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <BriefcaseMedical size={20} className="text-accent" />
                        <div>
                            <div style={{ fontSize: '10px', color: 'var(--text-secondary)', fontFamily: 'var(--font-heading)' }}>OPEN WARDS</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>12 <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>CAPACITY 84%</span></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Main Split Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 320px) 1fr minmax(280px, 320px)', gap: '16px', flex: 1, overflow: 'hidden' }}>

                {/* Left Col: Doctors Schedule & AI OverWatch */}
                <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>

                    <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(16, 29, 43, 0.9)' }}>
                        <h2 style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}><Users size={16} /> DOCTOR SCHEDULE & SHIFTS</h2>
                    </div>
                    <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '30%', overflowY: 'auto' }}>
                        {/* Out of the box Doctor Scheduler */}
                        {[
                            { name: 'Dr. Sarah Chen', dept: 'Cardiology', status: 'IN SURGERY (OR-2)', time: 'Until 14:00', type: 'critical' },
                            { name: 'Dr. Marcus Webb', dept: 'ER Floor', status: 'ON ROUNDS', time: 'Shift Ends 18:00', type: 'stable' },
                            { name: 'Dr. Elena Rostova', dept: 'Neurology', status: 'AVAILABLE', time: 'In On-Call Room', type: 'ready' },
                            { name: 'Dr. Ali Hassan', dept: 'Trauma', status: 'IN TRANSIT', time: 'ETA 15 Mins', type: 'transit' },
                        ].map((doc, idx) => (
                            <div key={idx} style={{ background: 'rgba(28, 63, 75, 0.2)', padding: '8px 12px', borderRadius: '4px', borderLeft: `3px solid ${doc.type === 'critical' ? 'var(--alert-critical)' : doc.type === 'stable' ? 'var(--accent-primary)' : 'var(--text-secondary)'}` }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{doc.name}</span>
                                    <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{doc.dept}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontFamily: 'var(--font-heading)' }}>
                                    <span className={doc.type === 'critical' ? 'text-alert' : ''}>{doc.status}</span>
                                    <span>{doc.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)', borderTop: '1px solid rgba(255,255,255,0.1)', background: 'rgba(16, 29, 43, 0.9)' }}>
                        <h2 style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}><Radio size={16} /> OVERWATCH AI ALERTS</h2>
                    </div>
                    <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, overflowY: 'auto' }}>
                        <div style={{ background: 'rgba(157, 240, 218, 0.1)', padding: '12px', borderRadius: '4px', borderLeft: '3px solid var(--alert-critical)' }}>
                            <div style={{ fontSize: '12px', color: 'var(--alert-critical)', marginBottom: '4px' }}>CRITICAL EPIDEMIC ALERT</div>
                            <div style={{ fontSize: '12px', marginBottom: '8px' }}>Contamination detected in Ward 3. Initiate Lockdown immediately.</div>
                            <button className="btn-alert" style={{ fontSize: '10px', padding: '4px 8px', width: '100%' }}>EXECUTE LOCKDOWN</button>
                        </div>

                        <div style={{ background: 'rgba(28, 63, 75, 0.3)', padding: '12px', borderRadius: '4px', borderLeft: '3px solid var(--accent-primary)' }}>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>BLOOD BANK OPTIMIZER</div>
                            <div style={{ fontSize: '12px', marginBottom: '8px' }}>Projected deficit of O- blood in 6 hrs based on incoming trauma.</div>
                            <button className="btn-outline" style={{ fontSize: '10px', padding: '4px 8px' }}>REQUEST SUPPLY</button>
                        </div>
                    </div>
                </div>

                {/* Center: Systematic Beds Grid */}
                <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(16, 29, 43, 0.9)' }}>
                        <h2 style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}><Database size={16} /> FLOOR PATIENTS (CLICK TO EXPAND)</h2>
                        <div style={{ display: 'flex', gap: '16px', fontSize: '10px', fontFamily: 'var(--font-heading)' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: 8, height: 8, background: 'var(--alert-critical)' }}></div> CRITICAL (6)</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: 8, height: 8, background: 'var(--accent-primary)' }}></div> STABLE (10)</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: 8, height: 8, border: '1px solid var(--text-secondary)' }}></div> EMPTY (32)</span>
                        </div>
                    </div>

                    <div className="beds-grid">
                        {beds.map((bed, idx) => (
                            <div key={idx} className={`bed-card ${bed.status}`} onClick={() => { if (bed.status !== 'empty') setSelectedBed(bed); }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: bed.status === 'empty' ? 'none' : '1px solid rgba(255,255,255,0.1)', paddingBottom: '6px', marginBottom: bed.status === 'empty' ? '0' : '6px' }}>
                                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 'bold' }}>{bed.id}</span>
                                    {bed.status !== 'empty' && <span className={bed.status === 'critical' ? 'text-alert' : 'text-accent'} style={{ fontSize: '10px', fontFamily: 'var(--font-heading)' }}>{bed.status.toUpperCase()}</span>}
                                </div>
                                {bed.status !== 'empty' ? (
                                    <>
                                        <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginBottom: '4px' }}>{bed.patient}</div>
                                        <div style={{ fontSize: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span><HeartPulse size={12} className={bed.hr > 110 ? 'text-alert' : 'text-accent'} style={{ marginRight: '4px', verticalAlign: 'middle' }} />{bed.hr}</span>
                                            <span>O2: {bed.o2}%</span>
                                        </div>
                                    </>
                                ) : (
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '10px', textAlign: 'center', marginTop: '10px' }}>AVAILABLE</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Logistics & Vital Tracking */}
                <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(16, 29, 43, 0.9)' }}>
                        <h2 style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}><AlertTriangle size={16} className="text-alert" /> ACTION REQUIRED</h2>
                    </div>
                    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>

                        <div style={{ border: '1px solid rgba(157, 240, 218, 0.3)', padding: '12px', borderRadius: '4px', background: 'rgba(5, 9, 16, 0.5)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>
                                <span className="text-alert" style={{ fontSize: '14px' }}>PATIENT #9102 [BD-108]</span>
                                <span className="text-alert" style={{ fontSize: '14px', animation: 'blink 1s infinite' }}>CODE BLUE</span>
                            </div>
                            <div style={{ height: '30px', margin: '8px 0', position: 'relative' }}>
                                <svg viewBox="0 0 100 20" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                                    <polyline points="0,10 40,10 45,2 50,18 55,10 100,10" fill="none" stroke="var(--alert-critical)" strokeWidth="2" strokeDasharray="100, 10" className="pulse-svg" />
                                </svg>
                            </div>
                            <button className="btn-alert" style={{ width: '100%', marginTop: '12px', padding: '8px' }}>DEPLOY TEAM ALPHA</button>
                        </div>

                        <h2 style={{ fontSize: '12px', marginTop: '8px', color: 'var(--text-secondary)' }}>CRITICAL ASSETS (LIVE)</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '4px', fontFamily: 'var(--font-heading)' }}>
                                    <span>MRI SCANNER A</span>
                                    <span className="text-accent">ACTIVE RUNNING</span>
                                </div>
                                <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                                    <div style={{ height: '100%', width: '100%', background: 'var(--accent-primary)' }}></div>
                                </div>
                            </div>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '4px', fontFamily: 'var(--font-heading)' }}>
                                    <span>MRI SCANNER B</span>
                                    <span style={{ color: 'orange' }}>MAINTENANCE T-4H</span>
                                </div>
                                <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                                    <div style={{ height: '100%', width: '0%', background: 'orange' }}></div>
                                </div>
                            </div>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '4px', fontFamily: 'var(--font-heading)' }}>
                                    <span>O.R. STERILIZATION (ROOM 4)</span>
                                    <span>PREPPING (70%)</span>
                                </div>
                                <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                                    <div style={{ height: '100%', width: '70%', background: 'var(--text-secondary)' }}></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Patient Detail Modal Overlay */}
            {selectedBed && (
                <div className="modal-overlay" onClick={() => setSelectedBed(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        {/* Header */}
                        <div style={{ padding: '24px', background: 'rgba(16, 29, 43, 0.95)', borderBottom: `2px solid ${selectedBed.status === 'critical' ? 'var(--alert-critical)' : 'var(--accent-primary)'}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                                <div style={{ width: '80px', height: '80px', background: 'var(--bg-main)', border: `2px solid ${selectedBed.status === 'critical' ? 'var(--alert-critical)' : 'var(--accent-primary)'}`, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <ScanHeart size={40} className={selectedBed.status === 'critical' ? 'text-alert' : 'text-accent'} />
                                </div>
                                <div>
                                    <h2 style={{ fontSize: '32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        {selectedBed.patientName || selectedBed.patient}
                                        <span className="label" style={{ fontSize: '12px', background: selectedBed.status === 'critical' ? 'var(--alert-critical)' : 'var(--accent-primary)', color: 'var(--bg-main)', padding: '4px 12px', borderRadius: '16px' }}>
                                            {selectedBed.status.toUpperCase()}
                                        </span>
                                    </h2>
                                    <div style={{ color: 'var(--text-secondary)', display: 'flex', gap: '16px', marginTop: '8px', fontSize: '14px' }}>
                                        <span><strong>ID:</strong> {selectedBed.patient}</span>
                                        <span><strong>DOB:</strong> 1984-06-12</span>
                                        <span><strong>BLOOD:</strong> O-</span>
                                        <span><strong>LOC:</strong> {selectedBed.id}</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setSelectedBed(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}><X size={32} /></button>
                        </div>

                        {/* Body */}
                        <div style={{ display: 'flex', padding: '24px', gap: '24px', flex: 1, background: 'var(--bg-main)' }}>
                            {/* Left col - Vitals */}
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <h3 className="text-secondary" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>REAL-TIME TELEMETRY</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <div style={{ background: 'rgba(28, 63, 75, 0.4)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(28,63,75,0.8)' }}>
                                        <div className="label" style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>HEART RATE</div>
                                        <div className={selectedBed.status === 'critical' ? 'text-alert' : 'text-accent'} style={{ fontFamily: 'var(--font-heading)', fontSize: '48px', fontWeight: 'bold' }}>{selectedBed.hr} <span style={{ fontSize: '16px' }}>BPM</span></div>
                                    </div>
                                    <div style={{ background: 'rgba(28, 63, 75, 0.4)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(28,63,75,0.8)' }}>
                                        <div className="label" style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>BLOOD PRESSURE</div>
                                        <div className={selectedBed.status === 'critical' ? 'text-alert' : 'text-accent'} style={{ fontFamily: 'var(--font-heading)', fontSize: '48px', fontWeight: 'bold' }}>{selectedBed.bp}</div>
                                    </div>
                                    <div style={{ background: 'rgba(28, 63, 75, 0.4)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(28,63,75,0.8)' }}>
                                        <div className="label" style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>O2 SATURATION</div>
                                        <div className={selectedBed.status === 'critical' ? 'text-alert' : 'text-accent'} style={{ fontFamily: 'var(--font-heading)', fontSize: '48px', fontWeight: 'bold' }}>{selectedBed.o2} <span style={{ fontSize: '16px' }}>%</span></div>
                                    </div>
                                    <div style={{ background: 'rgba(28, 63, 75, 0.4)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(28,63,75,0.8)' }}>
                                        <div className="label" style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>TEMP</div>
                                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '48px', fontWeight: 'bold' }}>99.2 <span style={{ fontSize: '16px' }}>°F</span></div>
                                    </div>
                                </div>
                                <div style={{ background: '#000', height: '80px', borderRadius: '8px', marginTop: '8px', overflow: 'hidden', padding: '16px' }}>
                                    <svg viewBox="0 0 100 20" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                                        <polyline points="0,10 20,10 25,2 30,18 35,10 100,10" fill="none" stroke={selectedBed.status === 'critical' ? 'var(--alert-critical)' : 'var(--accent-primary)'} strokeWidth="1" strokeDasharray="100, 10" className="pulse-svg" />
                                    </svg>
                                </div>
                            </div>

                            {/* Right col - Medical Info */}
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <div>
                                    <h3 className="text-secondary" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px', marginBottom: '16px' }}>CLINICAL PROFILE</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <div style={{ display: 'flex', gap: '16px' }}>
                                            <BrainCircuit className="text-accent" />
                                            <div>
                                                <div className="label" style={{ color: 'var(--text-secondary)', fontSize: '10px' }}>DIAGNOSIS</div>
                                                <div>{selectedBed.diagnosis}</div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '16px' }}>
                                            <Stethoscope className="text-accent" />
                                            <div>
                                                <div className="label" style={{ color: 'var(--text-secondary)', fontSize: '10px' }}>ATTENDING PHYSICIAN</div>
                                                <div>{selectedBed.doctor}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ background: 'rgba(157, 240, 218, 0.05)', border: `1px solid ${selectedBed.status === 'critical' ? 'var(--alert-critical)' : 'var(--accent-primary)'}`, padding: '16px', borderRadius: '8px' }}>
                                    <div className="label" style={{ color: selectedBed.status === 'critical' ? 'var(--alert-critical)' : 'var(--accent-primary)', fontSize: '12px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Activity size={16} /> SENTINEL AI PROGNOSIS
                                    </div>
                                    <p style={{ fontSize: '14px' }}>{selectedBed.aiPrediction}</p>
                                </div>

                                <div>
                                    <h3 className="text-secondary" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px', marginBottom: '16px' }}>LATEST ADMINISTRATION</h3>
                                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><Syringe size={16} /> <span>Epinephrine 1mg IV</span></div>
                                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}><Clock size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />14 Mins ago</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Global CSS for pulsing svg line */}
            <style>{`
        .pulse-svg {
          animation: slide 1.5s linear infinite;
        }
        @keyframes slide {
          from { stroke-dashoffset: 110; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
        </div>
    );
}
