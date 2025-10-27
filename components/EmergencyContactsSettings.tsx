import React, { useState, useEffect } from 'react';
import { getEmergencyContacts, updateEmergencyContact, type EmergencyContact } from '../services/emergencyContacts';

interface EmergencyContactsSettingsProps {
  onClose: () => void;
}

export const EmergencyContactsSettings: React.FC<EmergencyContactsSettingsProps> = ({ onClose }) => {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', phoneNumber: '', relationship: '' });

  useEffect(() => {
    setContacts(getEmergencyContacts());
  }, []);

  const handleEdit = (contact: EmergencyContact) => {
    setEditingId(contact.id);
    setFormData({
      name: contact.name,
      phoneNumber: contact.phoneNumber,
      relationship: contact.relationship,
    });
  };

  const handleSave = () => {
    if (!editingId) return;
    
    const contact = contacts.find(c => c.id === editingId);
    if (!contact) return;

    const updatedContact: EmergencyContact = {
      ...contact,
      ...formData,
    };

    updateEmergencyContact(updatedContact);
    setContacts(getEmergencyContacts());
    setEditingId(null);
    setFormData({ name: '', phoneNumber: '', relationship: '' });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name: '', phoneNumber: '', relationship: '' });
  };

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
      zIndex: 1001,
      padding: '20px',
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '30px',
        maxWidth: '600px',
        width: '100%',
        maxHeight: '80vh',
        overflow: 'auto',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}>
          <h2 style={{
            margin: 0,
            color: '#1e293b',
            fontSize: '24px',
            fontWeight: '700',
          }}>
            ⚙️ Emergency Contacts Settings
          </h2>
          <button
            onClick={onClose}
            style={{
              background: '#f1f5f9',
              border: 'none',
              color: '#64748b',
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
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {contacts.map((contact) => (
            <div
              key={contact.id}
              style={{
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                padding: '16px',
                background: editingId === contact.id ? '#f8fafc' : 'white',
              }}
            >
              {editingId === contact.id ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      padding: '10px',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      fontSize: '14px',
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Relationship"
                    value={formData.relationship}
                    onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                    style={{
                      padding: '10px',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      fontSize: '14px',
                    }}
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    style={{
                      padding: '10px',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      fontSize: '14px',
                    }}
                  />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={handleSave}
                      style={{
                        flex: 1,
                        padding: '10px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: '600',
                        cursor: 'pointer',
                      }}
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      style={{
                        flex: 1,
                        padding: '10px',
                        background: '#e2e8f0',
                        color: '#475569',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: '600',
                        cursor: 'pointer',
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>
                      {contact.name || <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>Not set</span>}
                      {contact.isPrimary && (
                        <span style={{
                          marginLeft: '8px',
                          fontSize: '11px',
                          background: '#ddd6fe',
                          color: '#6d28d9',
                          padding: '2px 8px',
                          borderRadius: '10px',
                          fontWeight: '600',
                        }}>
                          PRIMARY
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '2px' }}>
                      {contact.relationship}
                    </div>
                    <div style={{ fontSize: '13px', color: '#94a3b8', fontFamily: 'monospace' }}>
                      {contact.phoneNumber || 'No phone number'}
                    </div>
                  </div>
                  <button
                    onClick={() => handleEdit(contact)}
                    style={{
                      padding: '8px 16px',
                      background: '#f1f5f9',
                      color: '#475569',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '20px',
          padding: '16px',
          background: '#fef3c7',
          borderRadius: '8px',
          fontSize: '13px',
          color: '#92400e',
          lineHeight: '1.5',
        }}>
          💡 <strong>Tip:</strong> Set up your emergency contacts now so they're ready when you need them. 
          You can ask me to "call my partner" or "show emergency contacts" anytime.
        </div>
      </div>
    </div>
  );
};
