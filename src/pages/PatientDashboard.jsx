import React, { useState } from 'react';
import { Navigation, HeartPulse, Clock, Activity, Map, BedDouble, Stethoscope, Wind, FileHeart, Calendar, CheckCircle } from 'lucide-react';

export default function PatientDashboard() {
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    // Hardcode patient-friendly medical profiles
    const doctors = [
        { name: 'Dr. Sarah Chen', dept: 'Cardiology', study: 'M.D., HMS / Harvard', experience: '14 Years', status: 'IN SURGERY', eta: 'Available 14:00', iconColor: 'var(--text-secondary)' },
        { name: 'Dr. Marcus Webb', dept: 'ER Floor', study: 'D.O., Johns Hopkins', experience: '8 Years', status: 'ON ROUNDS', eta: 'Wait time: 20 Mins', iconColor: 'var(--accent-primary)' },
        { name: 'Dr. Elena Rostova', dept: 'Neurology', study: 'Ph.D, M.D., Oxford Univ.', experience: '22 Years', status: 'IN CONSULTATION', eta: 'Wait time: 45 Mins', iconColor: 'var(--alert-critical)' },
        { name: 'Dr. Ali Hassan', dept: 'Trauma', study: 'M.D., Mayo Clinic', experience: '12 Years', status: 'ARRIVING SHORTLY', eta: 'ETA 15 Mins', iconColor: 'var(--accent-primary)' },
    ];

    return (
        <div className="dashboard-layout" style={{ background: 'var(--bg-main)' }}>
            {/* Client Header */}
            <header className="glass-panel" style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderColor: 'var(--alert-critical)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <HeartPulse color="var(--alert-critical)" size={32} />
                    <div>
                        <h1 className="text-alert" style={{ fontSize: '24px', letterSpacing: '2px' }}>HOSPITAL PUBLIC PORTAL</h1>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>LIVE EMERGENCY PRE-VISIT DASHBOARD</div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '8px 16px', borderRadius: '4px' }}>
                        <span className="label" style={{ color: 'var(--text-secondary)', fontSize: '10px' }}>YOUR REGISTRATION</span>
                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: 'var(--text-primary)' }}>VERIFIED ✓</div>
                    </div>

                    {/* Estimated ER Wait out of the box feature */}
                    <div style={{ background: 'rgba(157, 240, 218, 0.1)', border: '1px solid var(--alert-critical)', padding: '8px 24px', borderRadius: '4px', textAlign: 'center' }}>
                        <span className="label" style={{ color: 'var(--alert-critical)', fontSize: '10px' }}>ER CURRENT WAIT TIME</span>
                        <div className="text-alert" style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: 'bold' }}>
                            18 MINS
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Facilities Overview */}
            <div className="glass-panel" style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', background: 'rgba(5, 9, 16, 0.5)' }}>
                <div style={{ textAlign: 'center' }}>
                    <BedDouble size={28} className="text-accent" style={{ marginBottom: '8px' }} />
                    <div className="label" style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>AVAILABLE / EMPTY BEDS</div>
                    <div style={{ fontSize: '32px', fontFamily: 'var(--font-heading)', fontWeight: 'bold' }}>32</div>
                </div>
                <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.1)' }}></div>

                <div style={{ textAlign: 'center' }}>
                    <Stethoscope size={28} className="text-accent" style={{ marginBottom: '8px' }} />
                    <div className="label" style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>DOCTORS CURRENTLY ON ROUNDS</div>
                    <div style={{ fontSize: '32px', fontFamily: 'var(--font-heading)', fontWeight: 'bold' }}>45</div>
                </div>
                <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.1)' }}></div>

                <div style={{ textAlign: 'center' }}>
                    <Wind size={28} className="text-accent" style={{ marginBottom: '8px' }} />
                    <div className="label" style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>AVAILABLE VENTILATORS</div>
                    <div style={{ fontSize: '32px', fontFamily: 'var(--font-heading)', fontWeight: 'bold' }}>4</div>
                </div>
                <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.1)' }}></div>

                <div style={{ textAlign: 'center' }}>
                    <Activity size={28} color="var(--alert-critical)" style={{ marginBottom: '8px' }} />
                    <div className="label" style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>HOSPITAL ALERT LEVEL</div>
                    <div className="text-alert" style={{ fontSize: '32px', fontFamily: 'var(--font-heading)', fontWeight: 'bold' }}>ELEVATED</div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(400px, 1fr) 350px', gap: '16px', flex: 1, overflow: 'hidden' }}>

                {/* Physician Schedules & Info */}
                <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(16, 29, 43, 0.9)' }}>
                        <h2 style={{ fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><Calendar size={18} /> DOCTOR SCHEDULE / TEAM ARRIVALS</h2>
                    </div>
                    <div style={{ padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {doctors.map((doc, idx) => (
                            <div
                                key={idx}
                                onClick={() => setSelectedDoctor(doc)}
                                style={{
                                    background: 'rgba(28, 63, 75, 0.2)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    padding: '16px',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '16px',
                                    cursor: 'pointer',
                                    borderLeft: `4px solid ${doc.iconColor}`,
                                    transition: 'all 0.2s',
                                }}
                                onMouseOver={(e) => e.currentTarget.style.borderColor = doc.iconColor}
                                onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                            >
                                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(16,29,43,0.8)', border: `2px solid ${doc.iconColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Stethoscope size={24} color={doc.iconColor} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <h3 style={{ fontSize: '18px' }}>{doc.name}</h3>
                                        <span className="label" style={{ color: doc.iconColor, background: 'rgba(0,0,0,0.5)', padding: '2px 8px', borderRadius: '4px' }}>{doc.status}</span>
                                    </div>
                                    <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                                        <strong>{doc.dept}</strong> | Clinical Exp: {doc.experience}
                                    </div>
                                    <div style={{ fontSize: '12px', color: 'var(--text-primary)', display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ opacity: 0.8 }}>{doc.study}</span>
                                        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 'bold' }}><Clock size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> {doc.eta}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pre-Visit Triage & Info */}
                <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(16, 29, 43, 0.9)' }}>
                        <h2 style={{ fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }} className="text-alert"><FileHeart size={18} /> VIRTUAL ASSISTANT & MAP</h2>
                    </div>
                    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

                        {/* Virtual Check-in */}
                        <div style={{ background: 'rgba(157, 240, 218, 0.05)', padding: '16px', borderRadius: '8px', border: '1px solid var(--alert-critical)' }}>
                            <h3 className="text-alert" style={{ fontSize: '14px', marginBottom: '8px' }}>PRE-VISIT FORM FAST-TRACK</h3>
                            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>Complete your triage questionnaire now to jump the queue before arriving.</p>
                            <button className="btn-alert" style={{ width: '100%', fontSize: '12px', padding: '8px' }}>START TRIAGE FORM</button>
                        </div>

                        {/* Out of the box: Navigate */}
                        <div style={{ background: 'rgba(28, 63, 75, 0.3)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <h3 style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}><Map size={16} className="text-accent" /> HOSPITAL CAMPUS MAP</h3>
                            <div style={{ height: '120px', background: '#0a121c', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                                <Navigation size={32} style={{ marginBottom: '8px', color: 'var(--accent-primary)' }} />
                                <span style={{ fontSize: '10px', fontFamily: 'var(--font-heading)' }}>TAP TO OPEN NAVIGATION</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', fontSize: '12px' }}>
                                <CheckCircle size={14} className="text-accent" /> <span>ER Parking Sector C is currently Open</span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}
