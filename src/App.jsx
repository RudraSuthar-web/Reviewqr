import React, { useState, useEffect } from 'react';
import { RefreshCcw, Star, Copy, ExternalLink, Check } from 'lucide-react';

const MOCK_DATA = {
  "cafe-1": {
    name: "The Roasted Bean",
    location: "Downtown, New York",
    logo: "☕",
    googleLink: "https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID",
    reviews: [
      "The latte was perfectly balanced and the staff made me feel right at home. Best spot for morning coffee!",
      "Incredible atmosphere for getting work done. The WiFi is fast and the croissants are flaky and fresh.",
      "A true neighborhood gem. I love the minimalist decor and the espresso is consistently high quality.",
      "Fast service even during the morning rush. Highly recommend their seasonal blends!",
      "Lovely place with great music. The staff is attentive and the coffee quality is unmatched."
    ]
  }
};

export default function App() {
  const [place, setPlace] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id') || "cafe-1";
    setPlace(MOCK_DATA[id]);
  }, []);

  const handleAction = async () => {
    if (!selectedReview) return;
    await navigator.clipboard.writeText(selectedReview);
    setIsCopied(true);
    setTimeout(() => {
      window.open(place.googleLink, "_blank");
      setIsCopied(false);
    }, 1000);
  };

  if (!place) return <div className="h-screen flex items-center justify-center bg-zinc-50 font-sans italic text-zinc-400">Loading experience...</div>;

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 flex flex-col">
      
      {/* 1. Header & Hero (Top) */}
      <header className="w-full pt-12 pb-8 px-6 text-center bg-zinc-50">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center text-white text-2xl shadow-xl">
            {place.logo}
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-2">
          Help us to grow.
        </h1>
        <p className="text-zinc-400 text-lg font-medium mb-2">Your review has value to us.</p>
        <p className="text-zinc-500 text-sm italic">Pick a review you like and share on Google.</p>
      </header>

      {/* 2. Review Selection (Center) */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-6 pb-40">
        <div className="flex items-center justify-between mb-6 px-2">
          <div className="flex items-center gap-2">
            {/* <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> */}
            <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Select an option</h4>
          </div>
          <button className="text-zinc-400 hover:text-zinc-900 transition-colors">
            <RefreshCcw size={18} />
          </button>
        </div>

        <div className="space-y-4">
          {place.reviews.map((rev, i) => (
            <div
              key={i}
              onClick={() => setSelectedReview(rev)}
              className={`p-6 rounded-[1.5rem] border-2 transition-all duration-300 cursor-pointer bg-white
                ${selectedReview === rev 
                  ? 'border-zinc-900 shadow-xl scale-[1.01]' 
                  : 'border-zinc-100 hover:border-zinc-200'
                }`}
            >
              <p className={`leading-relaxed ${selectedReview === rev ? 'text-zinc-900 font-medium' : 'text-zinc-600'}`}>
                "{rev}"
              </p>
              {selectedReview === rev && (
                <div className="mt-3 flex justify-end">
                  <span className="text-[10px] font-black text-zinc-900 uppercase tracking-widest flex items-center gap-1">
                    <Check size={12} /> Selected
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* 3. Dynamic Action Button (Bottom) */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-zinc-50 via-zinc-50 to-transparent pt-10">
        <div className="max-w-2xl mx-auto">
          <button
            disabled={!selectedReview}
            onClick={handleAction}
            className={`w-full py-5 rounded-2xl font-bold text-lg shadow-2xl flex items-center justify-center gap-3 transition-all active:scale-95
              ${selectedReview 
                ? 'bg-zinc-900 text-white hover:bg-black' 
                : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
              }`}
          >
            {/* Logic for Dynamic Button Text */}
            {!selectedReview ? (
              "Select your review"
            ) : isCopied ? (
              "Opening Google Maps..."
            ) : (
              <>
                <span>Post your review</span>
                <ExternalLink size={20} />
              </>
            )}
          </button>
          
          <p className="text-center text-[10px] text-zinc-400 font-bold uppercase tracking-[0.2em] mt-4">
            {place.name} • {place.location}
          </p>
        </div>
      </div>
    </div>
  );
}