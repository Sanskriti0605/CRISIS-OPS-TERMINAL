import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Cpu, HeartPulse, UserCircle } from 'lucide-react';

export default function Login() {
    const navigate = useNavigate();

    const handleLogin = (role) => {
        // Just directly launch them into the KYC and then the correct dashboard
        navigate(`/kyc?role=${role}`);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '24px', background: 'var(--bg-main)', color: 'var(--text-primary)' }}>

            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <h1 style={{ fontSize: '32px', color: 'var(--accent-primary)', marginBottom: '8px' }}>Welcome to Ether Health</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Please select your portal to continue.</p>
            </div>

            <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', justifyContent: 'center' }}>

                {/* Patient Portal Card */}
                <div
                    onClick={() => handleLogin('patient')}
                    style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--bg-nav)',
                        padding: '40px',
                        borderRadius: '16px',
                        width: '350px',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--bg-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', color: '#00629e' }}>
                        <UserCircle size={40} />
                    </div>
                    <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '12px' }}>Patient Portal</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '14px', lineHeight: 1.5 }}>Access your health records, book hospital beds, check live ER statuses, and communicate with your AI Assistant.</p>
                    <button className="btn-primary" style={{ width: '100%' }}>Login as Patient</button>
                </div>

                {/* Doctor/Staff Portal Card */}
                <div
                    onClick={() => handleLogin('staff')}
                    style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--bg-nav)',
                        padding: '40px',
                        borderRadius: '16px',
                        width: '350px',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--bg-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', color: '#00629e' }}>
                        <Cpu size={40} />
                    </div>
                    <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '12px' }}>Staff Terminal</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '14px', lineHeight: 1.5 }}>Secure access for doctors, nurses, and crisis operators. View real-time hospital triage and patient overviews.</p>
                    <button className="btn-primary" style={{ width: '100%' }}>Login as Staff</button>
                </div>

            </div>

            <div style={{ marginTop: '48px', color: 'var(--text-secondary)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldAlert size={16} /> Secure Authentication System
            </div>

        </div>
    );
}
