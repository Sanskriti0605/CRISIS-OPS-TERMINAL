import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fingerprint, ShieldAlert, Cpu } from 'lucide-react';

export default function Login() {
    const navigate = useNavigate();
    const [pin, setPin] = useState('');
    const [scanning, setScanning] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        if (pin === '1234' || pin === 'admin') {
            navigate('/kyc');
        }
    };

    const simulateBiometric = () => {
        setScanning(true);
        setTimeout(() => {
            setScanning(false);
            navigate('/kyc');
        }, 2000);
    };

    return (
        <div className="auth-page">
            <div className="glass-panel auth-container" style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                    <div style={{ padding: '16px', background: 'rgba(31, 139, 132, 0.1)', borderRadius: '50%', border: '1px solid var(--accent-primary)' }}>
                        <Cpu size={48} color="var(--accent-primary)" />
                    </div>
                </div>

                <h1 className="text-gradient" style={{ fontSize: '32px' }}>CRISIS OPS TERMINAL</h1>
                <p style={{ color: 'var(--text-secondary)' }}>AUTORIZED PERSONNEL ONLY</p>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
                    <div>
                        <label className="label" style={{ display: 'block', textAlign: 'left', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                            SECURITY PIN / CLEARANCE CODE
                        </label>
                        <input
                            type="password"
                            className="input-field"
                            placeholder="••••"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            style={{ textAlign: 'center', letterSpacing: '8px', fontSize: '24px' }}
                        />
                    </div>
                    <button type="submit" className="btn-primary" style={{ width: '100%' }}>ACCESS</button>
                </form>

                <div style={{ display: 'flex', alignItems: 'center', margin: '24px 0' }}>
                    <div style={{ flex: 1, height: '1px', background: 'var(--text-secondary)', opacity: 0.2 }}></div>
                    <span style={{ padding: '0 16px', color: 'var(--text-secondary)', fontSize: '12px', fontFamily: 'var(--font-heading)' }}>OR BIOMETRIC OVERRIDE</span>
                    <div style={{ flex: 1, height: '1px', background: 'var(--text-secondary)', opacity: 0.2 }}></div>
                </div>

                <button
                    onClick={simulateBiometric}
                    className="btn-outline"
                    style={{ width: '100%', display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
                >
                    <Fingerprint size={24} className={scanning ? 'text-alert' : ''} />
                    {scanning ? 'SCANNING RETINA/FINGERPRINT...' : 'INITIATE BIOMETRIC SCAN'}
                </button>

                {scanning && (
                    <div style={{ marginTop: '16px', color: 'var(--alert-critical)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <ShieldAlert size={16} /> <span style={{ fontFamily: 'var(--font-heading)' }}>Verifying clearance level...</span>
                    </div>
                )}
            </div>
        </div>
    );
}
