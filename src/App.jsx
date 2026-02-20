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
      "Fast service even during the morning rush. Highly recommend their seasonal blends!"
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

  if (!place) return <div className="h-screen flex items-center justify-center bg-zinc-50">Loading...</div>;

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      
      {/* Header */}
      <nav className="w-full bg-white border-b border-zinc-200 py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-zinc-900 rounded-lg flex items-center justify-center text-white text-xl">
            {place.logo}
          </div>
          <div>
            <h2 className="font-bold text-lg leading-none">{place.name}</h2>
            <p className="text-xs text-zinc-500 mt-1">{place.location}</p>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        
        {/* Simplified Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-4 leading-[1.1]">
            Help us to grow. <br />
            <span className="text-zinc-400">Your review has value to us.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Side: Dynamic Instruction/Action Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 h-fit">
            <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm text-center">
              <div className="mb-6 flex justify-center">
                 <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${selectedReview ? 'bg-green-100 text-green-600' : 'bg-zinc-100 text-zinc-400'}`}>
                    {selectedReview ? <Check size={32} /> : <Star size={32} />}
                 </div>
              </div>
              
              <h3 className="font-bold text-xl mb-2">
                {selectedReview ? "Ready to post!" : "Pick a review"}
              </h3>
              <p className="text-sm text-zinc-500 mb-8">
                {selectedReview 
                  ? "We've copied your selection. Click below to paste it on our Google profile." 
                  : "Tap on one of the AI-generated suggestions on the right to get started."}
              </p>

              <button
                disabled={!selectedReview}
                onClick={handleAction}
                className={`w-full py-5 rounded-2xl font-bold text-lg shadow-xl flex items-center justify-center gap-3 transition-all transform
                  ${selectedReview 
                    ? 'bg-zinc-900 text-white hover:scale-[1.02] active:scale-95' 
                    : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                  }`}
              >
                {isCopied ? "Opening Google..." : "Copy & Post Review"}
                {selectedReview && !isCopied && <ExternalLink size={18} />}
              </button>
            </div>
          </div>

          {/* Right Side: Review Cards */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between px-2 mb-4">
              <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Select your experience</h4>
              <button className="text-zinc-400 hover:text-black transition-colors"><RefreshCcw size={16} /></button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {place.reviews.map((rev, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedReview(rev)}
                  className={`p-6 rounded-3xl border-2 transition-all cursor-pointer bg-white
                    ${selectedReview === rev 
                      ? 'border-zinc-900 ring-4 ring-zinc-900/5 shadow-md' 
                      : 'border-zinc-100 hover:border-zinc-300'
                    }`}
                >
                  <p className="text-zinc-700 leading-relaxed text-sm">{rev}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}