import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Camera, FileCheck2, UserCheck, ShieldCheck, FileHeart } from 'lucide-react';

export default function KYC() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const role = searchParams.get('role') || 'staff';

    const [step, setStep] = useState(1);
    const [photoTaken, setPhotoTaken] = useState(false);

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
        else {
            if (role === 'patient') navigate('/patient-dashboard');
            else navigate('/dashboard');
        }
    }

    const simulatePhoto = () => {
        setPhotoTaken(true);
        setTimeout(() => {
            handleNext();
        }, 1500);
    }

    return (
        <div className="auth-page">
            <div className="glass-panel auth-container">

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
                    <h2 className={role === 'patient' ? 'text-alert' : 'text-accent'}>
                        {role === 'patient' ? 'PATIENT INTAKE & KYC' : 'IDENTITY VERIFICATION'}
                    </h2>
                    <span className="label" style={{ color: 'var(--text-secondary)' }}>STEP {step} OF 3</span>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                    <div style={{ flex: 1, height: '4px', background: step >= 1 ? (role === 'patient' ? 'var(--alert-critical)' : 'var(--accent-primary)') : 'rgba(255,255,255,0.1)', borderRadius: '2px' }}></div>
                    <div style={{ flex: 1, height: '4px', background: step >= 2 ? (role === 'patient' ? 'var(--alert-critical)' : 'var(--accent-primary)') : 'rgba(255,255,255,0.1)', borderRadius: '2px' }}></div>
                    <div style={{ flex: 1, height: '4px', background: step >= 3 ? (role === 'patient' ? 'var(--alert-critical)' : 'var(--accent-primary)') : 'rgba(255,255,255,0.1)', borderRadius: '2px' }}></div>
                </div>

                {step === 1 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <h3 style={{ marginBottom: '8px' }}>{role === 'patient' ? 'INSURANCE / ID UPLOAD' : 'STAFF ID SCAN'}</h3>
                        <div
                            style={{ border: '2px dashed var(--text-secondary)', padding: '40px', borderRadius: '8px', textAlign: 'center', cursor: 'pointer' }}
                            onClick={handleNext}
                        >
                            {role === 'patient' ?
                                <FileHeart size={48} color="var(--alert-critical)" style={{ margin: '0 auto 16px' }} /> :
                                <FileCheck2 size={48} color="var(--text-secondary)" style={{ margin: '0 auto 16px' }} />
                            }
                            <p>
                                {role === 'patient' ? 'Drag & Drop your Government ID or Insurance Card here' : 'Drag & Drop your Medical License or ID Badge here'}
                            </p>
                            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px' }}>(Click to simulate upload)</p>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <h3 style={{ marginBottom: '8px' }}>{role === 'patient' ? 'PATIENT FACE AUTH' : 'LIVE LIVENESS CHECK'}</h3>
                        <div style={{ background: '#000', height: '240px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                            {!photoTaken ? (
                                <div style={{ textAlign: 'center' }}>
                                    <Camera size={32} color="var(--text-secondary)" />
                                    <p style={{ marginTop: '8px', color: 'var(--text-secondary)' }}>Align face in frame</p>
                                </div>
                            ) : (
                                <div style={{ color: role === 'patient' ? 'var(--alert-critical)' : 'var(--accent-primary)', textAlign: 'center' }}>
                                    <UserCheck size={48} />
                                    <p style={{ marginTop: '16px', fontFamily: 'var(--font-heading)' }}>MATCH FOUND</p>
                                </div>
                            )}
                        </div>
                        {!photoTaken && <button className="btn-outline" onClick={simulatePhoto}>CAPTURE & VERIFY</button>}
                    </div>
                )}

                {step === 3 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center', textAlign: 'center', padding: '24px 0' }}>
                        <div style={{ padding: '24px', background: role === 'patient' ? 'rgba(157, 240, 218, 0.1)' : 'rgba(31, 139, 132, 0.1)', borderRadius: '50%', border: `2px solid ${role === 'patient' ? 'var(--alert-critical)' : 'var(--accent-primary)'}` }}>
                            <ShieldCheck size={64} color={role === 'patient' ? 'var(--alert-critical)' : 'var(--accent-primary)'} />
                        </div>
                        <div>
                            <h2 className={role === 'patient' ? "text-alert" : "text-accent"} style={{ fontSize: '24px', marginBottom: '8px' }}>
                                {role === 'patient' ? 'INTAKE COMPLETE' : 'CLEARANCE GRANTED'}
                            </h2>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                {role === 'patient' ? 'Welcome. Redirecting to Public Hospital Portal.' : 'Welcome Dr. Smith. All systems online.'}
                            </p>
                        </div>
                        <button className={role === 'patient' ? "btn-alert" : "btn-primary"} onClick={handleNext} style={{ width: '100%' }}>
                            {role === 'patient' ? 'ENTER PORTAL' : 'INITIALIZE DASHBOARD'}
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}
