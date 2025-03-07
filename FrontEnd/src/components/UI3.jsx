import React, { useState } from 'react';

export default function OutfitGenerator() {
  const [availableClothes, setAvailableClothes] = useState('jeans, white shirt, black jacket');
  const [occasion, setOccasion] = useState('wedding');
  const [weather, setWeather] = useState('cold');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateOutfitSuggestions = () => {
    setLoading(true);
    setSuggestions([]);

    const clothesList = availableClothes.split(',').map((item) => item.trim().toLowerCase());
    const lowerCaseOccasion = occasion.trim().toLowerCase();
    const lowerCaseWeather = weather.trim().toLowerCase();

    const newSuggestions = [];

    if (lowerCaseOccasion === 'wedding') {
      if (lowerCaseWeather === 'cold') {
        if (clothesList.includes('black jacket') && clothesList.includes('white shirt')) {
          newSuggestions.push({
            id: 1,
            description: 'White shirt with the black jacket.',
            reasoning: 'A classic combination suitable for a wedding, with the jacket providing warmth.',
          });
        }
      }
    } else {
      newSuggestions.push({
        id: 1,
        description: 'Please specify the occasion for better suggestions.',
        reasoning: 'Outfit choices vary greatly depending on the event.',
      });
    }

    setTimeout(() => {
      setSuggestions(newSuggestions);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="text-center mb-4">Outfit Generator</h1>
          <div className="card p-4 shadow">
            <div className="mb-3">
              <label className="form-label">Available Clothes (comma-separated)</label>
              <input className="form-control" type="text" value={availableClothes} onChange={(e) => setAvailableClothes(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Occasion</label>
              <input className="form-control" type="text" value={occasion} onChange={(e) => setOccasion(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Weather</label>
              <input className="form-control" type="text" value={weather} onChange={(e) => setWeather(e.target.value)} />
            </div>
            <div className="text-center">
              <button className="btn btn-primary" onClick={generateOutfitSuggestions} disabled={loading}>
                {loading ? 'Generating...' : 'Generate Outfits'}
              </button>
            </div>
          </div>
          {suggestions.length > 0 && (
            <div className="mt-4">
              <h2 className="text-center">Outfit Suggestions</h2>
              <div className="row">
                {suggestions.map((suggestion) => (
                  <div key={suggestion.id} className="col-md-6">
                    <div className="card p-3 shadow-sm border mb-3">
                      <h5 className="text-primary">Suggestion {suggestion.id}</h5>
                      <p>{suggestion.description}</p>
                      <small className="text-muted">{suggestion.reasoning}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
