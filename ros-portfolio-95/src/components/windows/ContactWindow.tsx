import { useState } from 'react';
import { contact } from '../../data/portfolioData';
import './ContactWindow.css';

const ContactWindow: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('https://formspree.io/f/xkgwodjr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="contact-window">
      <div className="contact-header">
        <h2>Get In Touch</h2>
        <p>Let's connect and collaborate</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <fieldset>
            <legend>📍 Contact Information</legend>
            <div className="info-item">
              <strong>Name:</strong> {contact.name}
            </div>
            <div className="info-item">
              <strong>Title:</strong> {contact.title}
            </div>
            <div className="info-item">
              <strong>Location:</strong> {contact.location}
            </div>
            <div className="info-item">
              <strong>Phone:</strong> {contact.phone}
            </div>
            <div className="info-item">
              <strong>Email:</strong> {contact.email}
            </div>
          </fieldset>

          <fieldset>
            <legend>🔗 Social Links</legend>
            <div className="social-links">
              <a href={contact.social.twitter} target="_blank" rel="noopener noreferrer" className="social-link">
                Twitter/X
              </a>
              <a href={contact.social.github} target="_blank" rel="noopener noreferrer" className="social-link">
                GitHub
              </a>
              <a href={contact.social.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                LinkedIn
              </a>
            </div>
          </fieldset>
        </div>

        <div className="contact-form-container">
          <fieldset>
            <legend>✉️ Send Message</legend>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              {status === 'success' && (
                <div className="status-message success">Message sent successfully!</div>
              )}
              {status === 'error' && (
                <div className="status-message error">Failed to send message. Please try again.</div>
              )}
            </form>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default ContactWindow;
