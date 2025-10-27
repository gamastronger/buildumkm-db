import { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Loader2, 
  Bot,
  User,
  Minimize2,
  Sparkles,
  RotateCcw
} from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [_streamAnimKey, setStreamAnimKey] = useState(0);
  const [buttonHover, setButtonHover] = useState(false);

  const getInitialMessages = () => {
    const saved = localStorage.getItem('bumibot-messages');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
      } catch (e) {
        console.error('Error loading messages:', e);
      }
    }
    return [
      {
        role: 'assistant',
        content: 'Halo! Saya BumiBot, asisten AI BuildUMKM.\n\nSaya bisa membantu Anda dengan:\n\nKonsultasi website untuk bisnis Anda\nRekomendasi paket dan fitur yang sesuai\nInformasi harga mulai dari Rp 500rb\nStrategi digital marketing untuk UMKM\n\nAda yang bisa saya bantu?',
        timestamp: new Date()
      }
    ];
  };

  const [messages, setMessages] = useState(getInitialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const messagesToSave = messages.filter(msg => !msg.isStreaming);
    localStorage.setItem('bumibot-messages', JSON.stringify(messagesToSave));
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Don't add placeholder message here, will add it when streaming starts

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': import.meta.env.VITE_APP_NAME || 'BuildUMKM',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: import.meta.env.VITE_OPENROUTER_MODEL || 'deepseek/deepseek-chat',
          temperature: 0.7,
          max_tokens: 1000,
          top_p: 0.9,
          frequency_penalty: 0.3,
          presence_penalty: 0.2,
          stream: true,
          messages: [
            {
              role: 'system',
              content: `Kamu adalah BumiBot, asisten AI profesional untuk BuildUMKM - platform yang menghubungkan UMKM Indonesia dengan developer lokal untuk pembuatan website.

PRINSIP KOMUNIKASI UTAMA:
1. Jawab SESUAI kompleksitas pertanyaan - jika pertanyaan sederhana, jawab singkat dan to the point
2. JANGAN gunakan emoji atau emoticon sama sekali
3. JANGAN gunakan formatting markdown (*, _, #, backtick, dll)
4. Jawab dengan bahasa Indonesia natural dan profesional
5. Hanya berikan detail mendalam jika user meminta atau pertanyaan kompleks

INFORMASI DASAR BUILDUMKM:

Paket Layanan:
BASIC Rp 500.000 - 5 halaman, hosting 1 tahun, domain gratis, desain responsif, SSL, SEO dasar
PRO Rp 1.500.000 - 10 halaman, hosting 1 tahun, domain gratis, SEO optimization, WhatsApp integration, Google Analytics, blog
PREMIUM Rp 3.000.000 - Unlimited halaman, hosting 1 tahun, domain premium, SEO advanced, payment gateway, admin panel custom, maintenance 3 bulan, priority support

Fitur Umum:
Landing page, katalog produk, form kontak, WhatsApp integration, Google Maps, galeri foto, testimoni, blog, social media integration, payment gateway, dashboard admin

Proses Kerja:
Waktu 3-7 hari kerja. Konsultasi dengan BumiBot, pilih template dan paket, developer kerjakan, review dan revisi maksimal 3x, launch dan training.

CARA MENJAWAB:

Untuk Pertanyaan Sederhana (salam, thanks, pertanyaan 1 kalimat):
- Jawab langsung dalam 1-2 kalimat
- Contoh: "Harga mulai dari Rp 500.000 untuk paket Basic."

Untuk Pertanyaan Spesifik (fitur tertentu, paket tertentu):
- Jawab fokus pada yang ditanyakan
- Tambah 1 insight relevan jika perlu
- Maksimal 3-4 kalimat

Untuk Konsultasi Mendalam (cerita bisnis, minta saran lengkap):
- Berikan analisis komprehensif
- Rekomendasi spesifik sesuai konteks bisnis
- Ajukan pertanyaan lanjutan untuk menggali kebutuhan

FORMAT PENULISAN:
- Tulis dalam paragraf natural seperti chat biasa
- Gunakan huruf KAPITAL hanya untuk penekanan sangat penting
- Pisahkan dengan baris baru untuk readability
- TIDAK ADA emoji, simbol, atau formatting apapun
- Langsung ke inti tanpa basa-basi berlebihan

EXPERTISE:
Web development, digital marketing, SEO, strategi bisnis online, transformasi digital UMKM, fitur e-commerce, payment gateway, dan tren digital terkini untuk UMKM Indonesia.

HINDARI:
- Jawaban bertele-tele untuk pertanyaan simpel
- Penggunaan emoji atau emoticon
- Format list dengan bullet atau numbering jika tidak diminta
- Menyebut semua paket jika hanya ditanya 1 paket
- Bahasa terlalu formal atau terlalu casual

TUJUAN:
Membantu UMKM dengan efisien, menjawab tepat sasaran, dan memberikan value maksimal tanpa informasi yang tidak relevan.`
            },
            ...messages.filter(msg => !msg.isStreaming).map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            {
              role: 'user',
              content: userMessage.content
            }
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }

      setIsLoading(false);

      // Add placeholder message when streaming starts
      const placeholderMessage = {
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        isStreaming: true
      };
      setMessages(prev => [...prev, placeholderMessage]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices[0]?.delta?.content;
              
              if (content) {
                accumulatedContent += content;
                setStreamAnimKey(prev => prev + 1);
                setMessages(prev => {
                  const newMessages = [...prev];
                  const lastMessage = newMessages[newMessages.length - 1];
                  if (lastMessage && lastMessage.isStreaming) {
                    lastMessage.content = accumulatedContent;
                  }
                  return newMessages;
                });
              }
            } catch {
              continue;
            }
          }
        }
      }

      setMessages(prev => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage && lastMessage.isStreaming) {
          delete lastMessage.isStreaming;
        }
        return newMessages;
      });

    } catch (error) {
      console.error('Chat error:', error);
      
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isStreaming);
        return [...filtered, {
          role: 'assistant',
          content: 'Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi tim support kami.',
          timestamp: new Date()
        }];
      });
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const resetChat = () => {
    const initialMessage = {
      role: 'assistant',
      content: 'Halo! Saya BumiBot, asisten AI BuildUMKM.\n\nSaya bisa membantu Anda dengan:\n\nKonsultasi website untuk bisnis Anda\nRekomendasi paket dan fitur yang sesuai\nInformasi harga mulai dari Rp 500rb\nStrategi digital marketing untuk UMKM\n\nAda yang bisa saya bantu?',
      timestamp: new Date()
    };
    setMessages([initialMessage]);
    localStorage.setItem('bumibot-messages', JSON.stringify([initialMessage]));
  };

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        
        @keyframes slide-up {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
        
        .pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .slide-up {
          animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .gradient-bg {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          background-size: 200% 200%;
          animation: gradient-shift 4s ease infinite;
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        
        .message-bubble {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .message-bubble:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
        
        .chat-input:focus {
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.12);
        }
        
        .scroll-smooth {
          scroll-behavior: smooth;
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #c4b5fd, #a78bfa);
          border-radius: 10px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #a78bfa, #8b5cf6);
        }
        
        .shimmer-effect {
          position: relative;
          overflow: hidden;
        }
        
        .shimmer-effect::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shimmer 2s infinite;
        }
      `}</style>

      {/* Floating Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
          {/* Pulse rings */}
          <div className="absolute inset-0 w-14 h-14 md:w-16 md:h-16">
            <div className="absolute inset-0 rounded-full bg-purple-400 pulse-ring"></div>
            <div className="absolute inset-0 rounded-full bg-purple-400 pulse-ring" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <button
            onClick={() => setIsOpen(true)}
            onMouseEnter={() => setButtonHover(true)}
            onMouseLeave={() => setButtonHover(false)}
            className="relative w-14 h-14 md:w-16 md:h-16 gradient-bg text-white rounded-full transition-all duration-300 z-10 flex items-center justify-center group hover:scale-110 active:scale-95"
            style={{
              boxShadow: buttonHover 
                ? '0 20px 60px -15px rgba(124, 58, 237, 0.65)' 
                : '0 10px 40px -15px rgba(124, 58, 237, 0.5)'
            }}
          >
            <MessageCircle className="w-7 h-7 float-animation" />
            
            {/* Notification badge */}
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-[10px] font-bold shadow-lg">
              <span className="animate-pulse">1</span>
            </span>
            
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-3 px-4 py-2 glass-effect text-gray-800 text-sm font-medium rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-xl border border-purple-100 transform group-hover:translate-y-0 translate-y-2">
              💬 Chat dengan BumiBot
              <div className="absolute top-full right-6 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white/98"></div>
            </div>
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90vw] max-w-[380px] md:bottom-6 md:right-6 md:left-auto md:translate-x-0 md:w-[420px] rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden slide-up"
          style={{ 
            maxHeight: '90vh',
            height: isMinimized ? 'auto' : '650px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)'
          }}
        >
          {/* Header with gradient */}
          <div className="gradient-bg p-4 md:p-5 flex items-center justify-between relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-12 translate-y-12"></div>
            
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-11 h-11 md:w-12 md:h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg transform transition-all hover:scale-110 hover:rotate-12">
                <Bot className="w-6 h-6 md:w-7 md:h-7 text-purple-600" />
              </div>
              <div>
                <h3 className="text-white font-bold flex items-center gap-2 text-base md:text-lg">
                  {import.meta.env.VITE_CHATBOT_NAME || 'BumiBot'}
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 animate-pulse" />
                </h3>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-sm shadow-green-400"></span>
                  <p className="text-purple-100 text-xs font-medium">Online • Siap membantu</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-1 relative z-10">
              <button
                onClick={resetChat}
                className="text-white hover:bg-white/20 p-2 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95"
                title="Mulai percakapan baru"
              >
                <RotateCcw className="w-4 h-4 md:w-4.5 md:h-4.5" />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20 p-2 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95"
              >
                <Minimize2 className="w-4 h-4 md:w-4.5 md:h-4.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-2 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95"
              >
                <X className="w-4.5 h-4.5 md:w-5 md:h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-3 md:p-5 space-y-4 bg-gradient-to-b from-gray-50 to-white scroll-smooth scrollbar-thin">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  >
                    <div className={`flex gap-2.5 max-w-[85%] md:max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-8 h-8 md:w-9 md:h-9 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform hover:scale-110 ${
                        message.role === 'user' 
                          ? 'bg-gradient-to-br from-purple-600 to-purple-500 text-white shadow-lg' 
                          : 'bg-gradient-to-br from-white to-purple-50 text-purple-600 border-2 border-purple-200 shadow-md'
                      }`}>
                        {message.role === 'user' ? (
                          <User className="w-4 h-4 md:w-4.5 md:h-4.5" />
                        ) : (
                          <Bot className="w-4 h-4 md:w-4.5 md:h-4.5" />
                        )}
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className={`message-bubble rounded-2xl px-4 py-3 shadow-md ${
                          message.role === 'user'
                            ? 'bg-gradient-to-br from-purple-600 to-purple-500 text-white rounded-tr-md'
                            : 'bg-white text-gray-800 rounded-tl-md border border-gray-100'
                        }`}>
                          {message.isStreaming ? (
                            <span className="text-sm md:text-base whitespace-pre-wrap leading-relaxed">
                              {message.content.split(/(\s+)/).map((word, idx) => (
                                word.trim() === ''
                                  ? word
                                  : <span key={idx} className="animate-fade-in">{word}</span>
                              ))}
                              <span className="inline-block w-1 h-4 md:w-1.5 bg-purple-600 ml-1 align-middle" style={{ animation: 'blink 1s infinite' }}></span>
                            </span>
                          ) : (
                            <p className="text-sm md:text-base whitespace-pre-wrap leading-relaxed">{message.content}</p>
                          )}
                        </div>
                        <p className={`text-[10px] md:text-xs text-gray-400 font-medium ${message.role === 'user' ? 'text-right' : 'text-left'} px-1`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="flex gap-2.5 max-w-[80%]">
                      <div className="w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-white to-purple-50 text-purple-600 border-2 border-purple-200 shadow-md">
                        <Bot className="w-4.5 h-4.5" />
                      </div>
                      <div className="bg-white rounded-2xl rounded-tl-md px-5 py-4 shadow-md border border-gray-100">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 md:p-4 bg-white border-t border-gray-100">
                <div className="flex gap-2.5">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ketik pesan Anda..."
                    disabled={isLoading}
                    className="chat-input flex-1 px-4 py-3 md:px-5 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-purple-400 disabled:bg-gray-50 disabled:cursor-not-allowed text-sm md:text-base transition-all duration-200 placeholder:text-gray-400"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="w-11 h-11 md:w-12 md:h-12 bg-gradient-to-br from-purple-600 to-purple-500 text-white rounded-2xl flex items-center justify-center hover:shadow-lg transition-all duration-200 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed hover:scale-105 active:scale-95 shadow-md"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 md:w-5.5 md:h-5.5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5 md:w-5.5 md:h-5.5" />
                    )}
                  </button>
                </div>
                <p className="text-[10px] md:text-xs text-gray-400 mt-2.5 text-center font-medium">
                  ⚡ Powered by DeepSeek AI via OpenRouter
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatBot;