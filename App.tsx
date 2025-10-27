import React, { useState, useMemo } from 'react';
import MicrophoneButton from './components/MicrophoneButton';
import { ConversationState } from './types';
import { useLiveConversation } from './hooks/useLiveConversation';
import BreathingExercise from './components/BreathingExercise';
import RequestSeatCard from './components/RequestSeatCard';
import RouteMap from './components/RouteMap';
import PlacesList from './components/PlacesList';
import ChatInput from './components/ChatInput';
import { EmergencyContactsCard } from './components/EmergencyContactsCard';
import LiveMap3D from './components/LiveMap3D';

const App: React.FC = () => {
  const [conversationState, setConversationState] = useState<ConversationState>(ConversationState.IDLE);
  const [mapData, setMapData] = useState<{ placeType?: string; location?: any; places?: any[]; autoCall?: string } | null>(null);
  const [inputMode, setInputMode] = useState<'voice' | 'text'>('voice');
  
  const getCurrentMapData = () => mapData;
  const { startConversation, stopConversation, sendTextMessage } = useLiveConversation(
    setConversationState, 
    setMapData,
    getCurrentMapData
  );

  const handleMicClick = () => {
    if (conversationState === ConversationState.IDLE) {
      startConversation();
    } else {
      stopConversation();
    }
  };

  const handleSendMessage = (message: string) => {
    if (conversationState === ConversationState.IDLE) {
      startConversation();
    }
    if (sendTextMessage) {
      sendTextMessage(message);
    }
  };

  const toggleInputMode = () => {
    setInputMode(prev => prev === 'voice' ? 'text' : 'voice');
  };

  const statusText = useMemo(() => {
    switch (conversationState) {
      case ConversationState.IDLE:
        return "Tap the microphone to begin";
      case ConversationState.LISTENING:
        return "Listening...";
      case ConversationState.PROCESSING:
        return "Thinking...";
      case ConversationState.SPEAKING:
        return "Speaking...";
      case ConversationState.BREATHING:
        return "Focus on your breath...";
      case ConversationState.DISPLAYING_CARD:
          return "Show this card to a passenger.";
      case ConversationState.SHOWING_MAP:
          return "Displaying your route map.";
      case ConversationState.SHOWING_PLACES_LIST:
        return "Here are the locations I found.";
      case ConversationState.SHOWING_LIVE_MAP:
        return "Showing locations on map.";
      case ConversationState.SHOWING_EMERGENCY_CONTACTS:
        return "Your emergency contacts.";
      default:
        return "";
    }
  }, [conversationState]);  const suggestionPrompts = [
    { text: "Can I eat sushi?", icon: "🥗", category: "Nutrition" },
    { text: "What's happening at week 20?", icon: "📚", category: "Education" },
    { text: "Help me relax", icon: "🧘", category: "Wellness" },
    { text: "What should I pack in my hospital bag?", icon: "👶", category: "Baby Prep" },
    { text: "Where is the nearest hospital?", icon: "🏥", category: "Health" },
    { text: "Plan a comfortable route", icon: "🚌", category: "Commute" },
  ];

  const mainClasses = useMemo(() => {
    let base = "w-full h-screen flex flex-col items-center justify-between p-4 sm:p-8 font-sans transition-all duration-1000";
    if (conversationState === ConversationState.LISTENING) {
      return `${base} bg-gradient-to-br from-sky-100 to-indigo-200 listening-glow`;
    }
    if (conversationState === ConversationState.BREATHING) {
        return `${base} calm-breathing-bg`;
    }
    return `${base} bg-gradient-to-br from-sky-100 to-indigo-200`;
  }, [conversationState]);
  
  const isMainContentVisible = conversationState !== ConversationState.BREATHING && 
    conversationState !== ConversationState.DISPLAYING_CARD && 
    conversationState !== ConversationState.SHOWING_MAP && 
    conversationState !== ConversationState.SHOWING_PLACES_LIST &&
    conversationState !== ConversationState.SHOWING_EMERGENCY_CONTACTS &&
    conversationState !== ConversationState.SHOWING_LIVE_MAP;

  return (
    <main className={mainClasses}>
      {conversationState === ConversationState.BREATHING && (
        <BreathingExercise onFinish={() => stopConversation()} />
      )}
      {conversationState === ConversationState.DISPLAYING_CARD && (
        <RequestSeatCard onClose={() => stopConversation()} />
      )}
      {conversationState === ConversationState.SHOWING_MAP && (
        <RouteMap onClose={() => stopConversation()} />
      )}
      {conversationState === ConversationState.SHOWING_PLACES_LIST && mapData && mapData.places && (
        <PlacesList 
          places={mapData.places}
          placeType={mapData.placeType || 'places'}
          onClose={() => {
            setConversationState(ConversationState.LISTENING);
            setMapData(null);
          }}
          onShowMap={() => {
            setConversationState(ConversationState.SHOWING_LIVE_MAP);
          }}
        />
      )}
      {conversationState === ConversationState.SHOWING_EMERGENCY_CONTACTS && (
        <EmergencyContactsCard 
          autoCall={mapData?.autoCall}
          onClose={() => {
            setConversationState(ConversationState.LISTENING);
            setMapData(null);
          }}
        />
      )}
      {conversationState === ConversationState.SHOWING_LIVE_MAP && mapData && (
        <LiveMap3D
          location={mapData.location}
          places={mapData.places || []}
          onClose={() => {
            setConversationState(ConversationState.LISTENING);
            setMapData(null);
          }}
        />
      )}

      {isMainContentVisible && (
        <>
          <header className="text-center w-full pt-4 sm:pt-8">
            <div className="inline-flex items-center gap-3 mb-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl sm:text-3xl">🤰</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                Access.ai
              </h1>
            </div>
            <p className="text-base sm:text-lg text-slate-600 font-medium">Your Personal Assistant for Pregnancy</p>
            <div className="flex flex-wrap justify-center gap-2 mt-4 px-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/60 backdrop-blur-sm rounded-full text-xs font-medium text-slate-700 shadow-sm">
                🥗 Nutrition
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/60 backdrop-blur-sm rounded-full text-xs font-medium text-slate-700 shadow-sm">
                🏥 Health
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/60 backdrop-blur-sm rounded-full text-xs font-medium text-slate-700 shadow-sm">
                🧘 Wellness
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/60 backdrop-blur-sm rounded-full text-xs font-medium text-slate-700 shadow-sm">
                👶 Baby Prep
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/60 backdrop-blur-sm rounded-full text-xs font-medium text-slate-700 shadow-sm">
                🚌 Commute
              </span>
            </div>
          </header>
          
          <div className="flex-grow w-full flex flex-col items-center justify-center text-center transition-all duration-500 ease-in-out px-4">
            {/* Suggestions Box */}
            <div 
                className={`transition-all duration-500 ease-in-out w-full max-w-3xl ${conversationState === ConversationState.IDLE ? 'opacity-100 translate-y-0 mb-8' : 'opacity-0 -translate-y-4 h-0 mb-0'}`}
            >
                <div className={conversationState !== ConversationState.IDLE ? 'hidden' : ''}>
                    <h2 className="text-lg sm:text-xl text-slate-700 font-semibold mb-4 animate-slide-up">Try asking me...</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {suggestionPrompts.map((prompt, index) => (
                            <div 
                              key={index} 
                              className="group bg-white/70 backdrop-blur-sm rounded-xl p-4 text-left shadow-sm hover:shadow-xl hover:bg-white/90 transition-all duration-300 cursor-pointer border border-white/50 hover:border-purple-200 transform hover:-translate-y-1 animate-slide-up"
                              style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="flex items-start gap-3">
                                  <span className="text-2xl flex-shrink-0 group-hover:scale-125 transition-transform duration-300">
                                    {prompt.icon}
                                  </span>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-indigo-600 mb-1 group-hover:text-purple-600 transition-colors">{prompt.category}</p>
                                    <p className="text-sm text-slate-700 font-medium leading-snug">"{prompt.text}"</p>
                                  </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {inputMode === 'voice' ? (
              <MicrophoneButton 
                conversationState={conversationState} 
                onClick={handleMicClick} 
              />
            ) : (
              <div className="w-full max-w-2xl">
                <ChatInput 
                  onSendMessage={handleSendMessage}
                  disabled={conversationState === ConversationState.PROCESSING}
                  placeholder="Type your message..."
                />
              </div>
            )}

            {/* Mode Toggle Button */}
            <button
              onClick={toggleInputMode}
              className="mt-6 flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-slate-700 hover:bg-white/80 transition-all shadow-sm text-sm font-medium"
            >
              {inputMode === 'voice' ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                    <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                  </svg>
                  Switch to Text
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
                    <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
                  </svg>
                  Switch to Voice
                </>
              )}
            </button>
          </div>

          <footer className="h-16 sm:h-20 flex items-center justify-center text-center px-4">
            <div className="flex flex-col items-center gap-2">
              <p className="text-slate-700 text-base sm:text-lg font-semibold transition-opacity duration-300">
                {statusText}
              </p>
              {conversationState === ConversationState.IDLE && (
                <p className="text-xs sm:text-sm text-slate-500">
                  Powered by Google Gemini AI
                </p>
              )}
            </div>
          </footer>
        </>
      )}
    </main>
  );
};

export default App;
