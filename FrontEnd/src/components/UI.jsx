import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  const [chats, setChats] = useState([
    {
      id: '1',
      title: 'Initial Chat',
      messages: [
        {
          type: 'ai',
          suggestions: ['Welcome to Cloth Selector! Tell me about your clothes, the occasion, and the weather.'],
        },
      ],
    },
  ]);
  const [currentChatId, setCurrentChatId] = useState('1');
  const [clothesInput, setClothesInput] = useState('');
  const [occasionInput, setOccasionInput] = useState('');
  const [weatherInput, setWeatherInput] = useState('');
  const [loading, setLoading] = useState(false);

  const generateOutfitSuggestions = (clothes, occasion, weather) => {
    if (occasion.toLowerCase().includes('party') && weather.toLowerCase().includes('cold')) {
      return ['Elegant Dress with a warm jacket', 'Dark jeans, stylish sweater, and boots'];
    } else if (occasion.toLowerCase().includes('work') && weather.toLowerCase().includes('sunny')) {
      return ['Light blouse with tailored pants', 'Skirt with a formal shirt and blazer'];
    } else {
      return ['Casual T-shirt and comfortable jeans', 'Shorts and a light top'];
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!clothesInput || !occasionInput || !weatherInput) return;
    
    const userMessage = { type: 'user', clothes: clothesInput, occasion: occasionInput, weather: weatherInput };
    setChats((prevChats) => prevChats.map(chat => chat.id === currentChatId ? { ...chat, messages: [...chat.messages, userMessage] } : chat));
    setLoading(true);
    setTimeout(() => {
      const suggestions = generateOutfitSuggestions(clothesInput, occasionInput, weatherInput);
      const aiMessage = { type: 'ai', suggestions };
      setChats((prevChats) => prevChats.map(chat => chat.id === currentChatId ? { ...chat, messages: [...chat.messages, aiMessage] } : chat));
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="d-flex vh-100">
      <div className="bg-dark text-light p-3" style={{ width: '250px' }}>
        <h4>Cloth Selector</h4>
        <button className="btn btn-primary w-100 mb-3">+ New Chat</button>
        <ul className="list-group">
          {chats.map(chat => (
            <li key={chat.id} className={`list-group-item ${currentChatId === chat.id ? 'active' : ''}`} onClick={() => setCurrentChatId(chat.id)}>
              {chat.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-grow-1 p-4">
        <h5>{chats.find(chat => chat.id === currentChatId)?.title || 'Select a chat'}</h5>
        <div className="border p-3 mb-3" style={{ height: '60vh', overflowY: 'auto' }}>
          {chats.find(chat => chat.id === currentChatId)?.messages.map((msg, index) => (
            <div key={index} className={`mb-2 p-2 ${msg.type === 'user' ? 'text-end' : ''}`}> 
              {msg.type === 'user' ? (
                <div className="bg-primary text-white p-2 rounded d-inline-block">
                  <p><strong>Clothes:</strong> {msg.clothes}</p>
                  <p><strong>Occasion:</strong> {msg.occasion}</p>
                  <p><strong>Weather:</strong> {msg.weather}</p>
                </div>
              ) : (
                <div className="bg-light p-2 rounded d-inline-block">
                  <p><strong>Outfit Suggestions:</strong></p>
                  <ul>
                    {msg.suggestions.map((suggestion, i) => <li key={i}>{suggestion}</li>)}
                  </ul>
                </div>
              )}
            </div>
          ))}
          {loading && <div className="text-muted">Generating outfits...</div>}
        </div>
        <form onSubmit={handleSubmit} className="mb-3">
          <div className="mb-2">
            <label>Available Clothes</label>
            <input type="text" className="form-control" value={clothesInput} onChange={(e) => setClothesInput(e.target.value)} placeholder="e.g., Jeans, T-shirts..." />
          </div>
          <div className="mb-2">
            <label>Occasion</label>
            <input type="text" className="form-control" value={occasionInput} onChange={(e) => setOccasionInput(e.target.value)} placeholder="e.g., Party, Work..." />
          </div>
          <div className="mb-2">
            <label>Weather</label>
            <input type="text" className="form-control" value={weatherInput} onChange={(e) => setWeatherInput(e.target.value)} placeholder="e.g., Sunny, Cold..." />
          </div>
          <button type="submit" className="btn btn-success w-100" disabled={loading}>{loading ? 'Generating...' : 'Get Suggestions'}</button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;