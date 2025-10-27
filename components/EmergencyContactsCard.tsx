import React, { useState, useEffect } from 'react';
import { getEmergencyContacts, makeCall, formatPhoneNumber, type EmergencyContact } from '../services/emergencyContacts';

interface EmergencyContactsCardProps {
  onClose?: () => void;
  autoCall?: string; // Auto-call a specific relationship (e.g., "partner", "doctor")
}

export const EmergencyContactsCard: React.FC<EmergencyContactsCardProps> = ({ onClose, autoCall }) => {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [calling, setCalling] = useState<string | null>(null);

  useEffect(() => {
    const loadedContacts = getEmergencyContacts();
    setContacts(loadedContacts);

    // Auto-call if specified
    if (autoCall) {
      console.log('🔍 Auto-call requested for:', autoCall);
      console.log('📋 Available contacts:', loadedContacts.map(c => ({ id: c.id, relationship: c.relationship })));
      
      // First try exact ID match
      let contact = loadedContacts.find(c => 
        c.id.toLowerCase() === autoCall.toLowerCase()
      );
      
      // If no exact match, try relationship includes (but be specific)
      if (!contact) {
        contact = loadedContacts.find(c => {
          const rel = c.relationship.toLowerCase();
          const search = autoCall.toLowerCase();
          
          // Exact matches first
          if (rel === search) return true;
          
          // Specific keyword matches (avoid false positives)
          if (search === 'partner' && (rel.includes('partner') || rel.includes('spouse') || rel.includes('husband') || rel.includes('wife'))) return true;
          if (search === 'doctor' && (rel.includes('doctor') || rel.includes('ob') || rel.includes('gyn'))) return true;
          if (search === 'emergency' && rel === 'emergency') return true;
          if (search === 'family' && rel.includes('family')) return true;
          
          return false;
        });
      }
      
      console.log('✅ Matched contact:', contact ? { id: contact.id, name: contact.name, relationship: contact.relationship } : 'None');
      
      if (contact && contact.phoneNumber) {
        handleCall(contact);
      } else if (contact && !contact.phoneNumber) {
        console.warn('⚠️ Contact found but no phone number set:', contact.name);
      } else {
        console.warn('⚠️ No contact found for:', autoCall);
      }
    }
  }, [autoCall]);

  const handleCall = (contact: EmergencyContact) => {
    if (!contact.phoneNumber) {
      alert(`No phone number set for ${contact.name}`);
      return;
    }

    setCalling(contact.id);
    
    try {
      makeCall(contact.phoneNumber);
      
      // Show confirmation
      setTimeout(() => {
        setCalling(null);
      }, 2000);
    } catch (error) {
      console.error('Error making call:', error);
      alert('Unable to make call. Please dial manually: ' + contact.phoneNumber);
      setCalling(null);
    }
  };

  const availableContacts = contacts.filter(c => c.phoneNumber);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.85)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '20px',
        padding: '30px',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
        animation: 'slideUp 0.3s ease-out',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}>
          <h2 style={{
            margin: 0,
            color: 'white',
            fontSize: '24px',
            fontWeight: '700',
          }}>
            🚨 Emergency Contacts
          </h2>
          {onClose && (
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                color: 'white',
                fontSize: '24px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ×
            </button>
          )}
        </div>

        {availableContacts.length === 0 ? (
          <div style={{
            background: 'rgba(255, 255, 255, 0.15)',
            padding: '20px',
            borderRadius: '12px',
            color: 'white',
            textAlign: 'center',
          }}>
            <p style={{ margin: 0, marginBottom: '10px' }}>
              No emergency contacts configured yet.
            </p>
            <p style={{ margin: 0, fontSize: '14px', opacity: 0.8 }}>
              Please set up your emergency contacts in Settings.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {availableContacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => handleCall(contact)}
                disabled={calling === contact.id}
                style={{
                  background: calling === contact.id 
                    ? 'rgba(255, 255, 255, 0.3)'
                    : 'rgba(255, 255, 255, 0.15)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '12px',
                  padding: '16px',
                  cursor: calling === contact.id ? 'default' : 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  color: 'white',
                }}
                onMouseEnter={(e) => {
                  if (calling !== contact.id) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (calling !== contact.id) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    marginBottom: '4px',
                  }}>
                    {contact.name}
                    {contact.isPrimary && (
                      <span style={{
                        marginLeft: '8px',
                        fontSize: '12px',
                        background: 'rgba(255, 255, 255, 0.3)',
                        padding: '2px 8px',
                        borderRadius: '10px',
                      }}>
                        PRIMARY
                      </span>
                    )}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    opacity: 0.9,
                    marginBottom: '2px',
                  }}>
                    {contact.relationship}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    opacity: 0.7,
                    fontFamily: 'monospace',
                  }}>
                    {formatPhoneNumber(contact.phoneNumber)}
                  </div>
                </div>
                <div style={{
                  fontSize: '28px',
                  opacity: 0.9,
                }}>
                  {calling === contact.id ? '📞' : '📱'}
                </div>
              </button>
            ))}
          </div>
        )}

        <div style={{
          marginTop: '20px',
          padding: '12px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          fontSize: '12px',
          color: 'rgba(255, 255, 255, 0.8)',
          textAlign: 'center',
        }}>
          💡 Tap any contact to initiate a call
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
