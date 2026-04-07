import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fingerprint, ShieldAlert, Cpu, HeartPulse } from 'lucide-react';

export default function Login() {
    const navigate = useNavigate();
    const [pin, setPin] = useState('');
    const [scanning, setScanning] = useState(false);
    const [loginMode, setLoginMode] = useState('patient'); // 'patient' or 'staff'
    const [errorMsg, setErrorMsg] = useState('');

    const handleStaffLogin = (e) => {
        e.preventDefault();
        if (pin === '1234' || pin === 'admin') {
            navigate('/kyc?role=staff');
        } else {
            setErrorMsg('INVALID CLEARANCE CODE. ACCESS DENIED.');
        }
    };

    const handlePatientLogin = (e) => {
        e.preventDefault();
        // Simulate patient access using a generic user ID or SSN
        if (pin.length > 0) {
            navigate('/kyc?role=patient');
        } else {
            setErrorMsg('PLEASE ENTER YOUR PATIENT OR INSURANCE ID.');
        }
    };

    const simulateBiometric = () => {
        setScanning(true);
        setErrorMsg('');
        setTimeout(() => {
            setScanning(false);
            navigate(`/kyc?role=${loginMode}`);
        }, 2000);
    };

    return (
        <div className="auth-page">
            <div className="glass-panel auth-container" style={{ textAlign: 'center' }}>

                {/* Toggle Login Mode */}
                <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '24px' }}>
                    <button
                        onClick={() => { setLoginMode('patient'); setErrorMsg(''); setPin(''); }}
                        style={{ flex: 1, padding: '12px', background: 'transparent', border: 'none', color: loginMode === 'patient' ? 'var(--accent-primary)' : 'var(--text-secondary)', borderBottom: loginMode === 'patient' ? '2px solid var(--accent-primary)' : 'none', cursor: 'pointer', fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 'bold' }}>
                        PUBLIC / PATIENT
                    </button>
                    <button
                        onClick={() => { setLoginMode('staff'); setErrorMsg(''); setPin(''); }}
                        style={{ flex: 1, padding: '12px', background: 'transparent', border: 'none', color: loginMode === 'staff' ? 'var(--accent-primary)' : 'var(--text-secondary)', borderBottom: loginMode === 'staff' ? '2px solid var(--accent-primary)' : 'none', cursor: 'pointer', fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 'bold' }}>
                        MEDICAL STAFF
                    </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                    <div style={{ padding: '16px', background: loginMode === 'staff' ? 'rgba(31, 139, 132, 0.1)' : 'rgba(157, 240, 218, 0.05)', borderRadius: '50%', border: `1px solid ${loginMode === 'staff' ? 'var(--accent-primary)' : 'var(--alert-critical)'}` }}>
                        {loginMode === 'staff' ? <Cpu size={48} color="var(--accent-primary)" /> : <HeartPulse size={48} color="var(--alert-critical)" />}
                    </div>
                </div>

                <h1 className="text-gradient" style={{ fontSize: '32px' }}>
                    {loginMode === 'staff' ? 'CRISIS OPS TERMINAL' : 'HOSPITAL PUBLIC PORTAL'}
                </h1>
                <p style={{ color: 'var(--text-secondary)' }}>
                    {loginMode === 'staff' ? 'AUTHORIZED PERSONNEL ONLY' : 'CHECK REAL-TIME ER STATUS'}
                </p>

                {errorMsg && (
                    <div style={{ padding: '12px', background: 'rgba(255,0,0,0.1)', border: '1px solid var(--alert-critical)', color: 'var(--alert-critical)', marginTop: '16px', borderRadius: '4px', fontSize: '12px', fontFamily: 'var(--font-heading)' }}>
                        ⚠ {errorMsg}
                    </div>
                )}

                <form onSubmit={loginMode === 'staff' ? handleStaffLogin : handlePatientLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
                    <div>
                        <label className="label" style={{ display: 'block', textAlign: 'left', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                            {loginMode === 'staff' ? 'SECURITY PIN / CLEARANCE CODE' : 'PATIENT ID / SSN'}
                        </label>
                        <input
                            type={loginMode === 'staff' ? "password" : "text"}
                            className="input-field"
                            placeholder={loginMode === 'staff' ? "•••• (Try 1234)" : "Any ID to continue..."}
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            style={{ textAlign: 'center', letterSpacing: loginMode === 'staff' ? '8px' : '2px', fontSize: '20px' }}
                        />
                    </div>
                    <button type="submit" className={loginMode === 'staff' ? "btn-primary" : "btn-alert"} style={{ width: '100%' }}>ACCESS</button>
                </form>

                <div style={{ display: 'flex', alignItems: 'center', margin: '24px 0' }}>
                    <div style={{ flex: 1, height: '1px', background: 'var(--text-secondary)', opacity: 0.2 }}></div>
                    <span style={{ padding: '0 16px', color: 'var(--text-secondary)', fontSize: '12px', fontFamily: 'var(--font-heading)' }}>
                        {loginMode === 'staff' ? 'OR BIOMETRIC OVERRIDE' : 'OR QUICK FACE ID CHECK-IN'}
                    </span>
                    <div style={{ flex: 1, height: '1px', background: 'var(--text-secondary)', opacity: 0.2 }}></div>
                </div>

                <button
                    onClick={simulateBiometric}
                    className="btn-outline"
                    style={{ width: '100%', display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'center', padding: '16px', borderColor: loginMode === 'patient' ? 'var(--alert-critical)' : '', color: loginMode === 'patient' ? 'var(--alert-critical)' : '' }}
                >
                    <Fingerprint size={24} className={scanning && loginMode === 'staff' ? 'text-alert' : ''} />
                    {scanning ? 'SCANNING...' : `INITIATE ${loginMode === 'staff' ? 'BIOMETRIC SCAN' : 'FACE LOGIN'}`}
                </button>

                {scanning && (
                    <div style={{ marginTop: '16px', color: 'var(--alert-critical)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <ShieldAlert size={16} /> <span style={{ fontFamily: 'var(--font-heading)' }}>Verifying identity...</span>
                    </div>
                )}
            </div>
        </div>
    );
}
