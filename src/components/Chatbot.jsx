import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMessageSquare, FiSend, FiX } from 'react-icons/fi';
import { chatbotKnowledge } from '../data/resume.js';

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm MukulBot. Ask me about Mukul's skills, projects, education, or contact info.", sender: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    if (endRef.current) endRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing, open]);

  const getResponse = (question) => {
    const text = question.toLowerCase();

    if (text.includes('hi') || text.includes('hello')) return 'Hello! How can I help you today?';

    const entry = chatbotKnowledge.find((item) => item.triggers.some((trigger) => text.includes(trigger)));
    return entry
      ? entry.response
      : "I’m not sure about that yet. Ask me about Mukul's projects, skills, education, certifications, or contact details.";
  };

  const handleSend = (text = input) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { text, sender: 'user' }]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, { text: getResponse(text), sender: 'bot' }]);
      setTyping(false);
    }, 950 + Math.random() * 280);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setOpen(true)}
        className="chatbot-trigger interactive-target"
        style={{ display: open ? 'none' : 'flex' }}
        aria-label="Open chatbot"
      >
        <FiMessageSquare />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            className="chatbot-panel"
          >
            <div className="chatbot-header">
              <div className="chatbot-header-main">
                <div className="chatbot-avatar">MB</div>
                <div>
                  <strong>MukulBot</strong>
                  <span>Online</span>
                </div>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="chatbot-close-btn interactive-target" aria-label="Close chatbot">
                <FiX />
              </button>
            </div>

            <div className="chatbot-messages">
              {messages.map((message, index) => (
                <motion.div
                  key={`${message.sender}-${index}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`chat-bubble ${message.sender}`}
                >
                  {message.text}
                </motion.div>
              ))}

              {typing && (
                <div className="chat-bubble bot">
                  <motion.span animate={{ opacity: [0.35, 1, 0.35] }} transition={{ repeat: Infinity, duration: 1.2 }}>
                    Typing...
                  </motion.span>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {messages.length < 3 && (
              <div className="chatbot-chips">
                {['Skills', 'Projects', 'Contact'].map((chip) => (
                  <button key={chip} type="button" onClick={() => handleSend(chip)} className="chat-chip interactive-target">
                    {chip}
                  </button>
                ))}
              </div>
            )}

            <div className="chatbot-input-row">
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => event.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
              />
              <button type="button" onClick={() => handleSend()} disabled={!input.trim()} className="interactive-target" aria-label="Send message">
                <FiSend size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
