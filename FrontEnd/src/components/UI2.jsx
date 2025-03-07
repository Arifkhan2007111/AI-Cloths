import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ClothSelector = () => {
  const [previousChats, setPreviousChats] = useState([]);
  const [currentChat, setCurrentChat] = useState([]);
  const [clothesInput, setClothesInput] = useState('');
  const [occasionInput, setOccasionInput] = useState('');
  const [weatherInput, setWeatherInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeChatId, setActiveChatId] = useState(null);
  const chatContainerRef = useRef(null);

  const getAIResponse = async (clothes, occasion, weather) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          message: `Considering your clothes (${clothes}), the occasion (${occasion}), and the weather (${weather}), here are some outfit ideas:`,
          suggestions: [
            `Outfit 1: Jeans with a T-shirt and Sneakers`,
            `Outfit 2: Dress pants with a Blouse and Flats`,
          ],
        });
      }, 1500);
    });
  };

  const handleSendMessage = async () => {
    if (!clothesInput.trim() || !occasionInput.trim() || !weatherInput.trim()) return;
    
    setCurrentChat([...currentChat, { sender: 'user', message: `Clothes: ${clothesInput}\nOccasion: ${occasionInput}\nWeather: ${weatherInput}` }]);
    setLoading(true);
    
    const aiResponse = await getAIResponse(clothesInput, occasionInput, weatherInput);
    setCurrentChat(prevChat => [...prevChat, { sender: 'ai', message: aiResponse.message, suggestions: aiResponse.suggestions }]);
    setLoading(false);
    setClothesInput('');
    setOccasionInput('');
    setWeatherInput('');
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [currentChat, loading]);

  return (
    <div className="container-fluid vh-100 d-flex">
      {/* Sidebar */}
      <div className="col-3 bg-light border-end p-3">
        <button className="btn btn-primary w-100 mb-3" onClick={() => setCurrentChat([])}>+ New Chat</button>
        <ul className="list-group">
          {previousChats.map((chat) => (
            <li key={chat.id} className="list-group-item list-group-item-action" onClick={() => setActiveChatId(chat.id)}>
              <strong>{chat.title}</strong>
              <br /><small>{chat.date}</small>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Chat Area */}
      <div className="col-9 d-flex flex-column">
        <div className="p-3 border-bottom bg-white">
          <h4>Cloth Selector AI</h4>
        </div>
        <div className="flex-grow-1 p-3 overflow-auto" ref={chatContainerRef}>
          {currentChat.map((msg, index) => (
            <div key={index} className={`d-flex ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}> 
              <div className={`alert ${msg.sender === 'user' ? 'alert-primary' : 'alert-secondary'} w-50`}>
                <p className="m-0">{msg.message}</p>
                {msg.suggestions && (
                  <ul className="mt-2">
                    {msg.suggestions.map((suggestion, i) => <li key={i}>{suggestion}</li>)}
                  </ul>
                )}
              </div>
            </div>
          ))}
          {loading && <div className="text-muted">Generating outfit suggestions...</div>}
        </div>

        {/* Input Area */}
        <div className="p-3 border-top bg-light">
          <div className="row g-2">
            <div className="col-md-12">
              <input type="text" className="form-control" placeholder="Describe your available clothes..." value={clothesInput} onChange={(e) => setClothesInput(e.target.value)} />
            </div>
            <div className="col-md-6">
              <input type="text" className="form-control" placeholder="Occasion?" value={occasionInput} onChange={(e) => setOccasionInput(e.target.value)} />
            </div>
            <div className="col-md-6">
              <input type="text" className="form-control" placeholder="Weather?" value={weatherInput} onChange={(e) => setWeatherInput(e.target.value)} />
            </div>
            <div className="col-md-12">
              <button className="btn btn-primary w-100" onClick={handleSendMessage} disabled={loading || !clothesInput || !occasionInput || !weatherInput}>
                {loading ? 'Generating...' : 'Get Outfit Suggestions'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClothSelector;
