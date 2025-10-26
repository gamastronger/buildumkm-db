import { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  Loader2, 
  Bot,
  User,
  Minimize2,
  Sparkles
} from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Halo! Saya BumiBot, asisten AI BuildUMKM. Saya siap membantu Anda dengan konsultasi website, paket hosting, dan fitur yang Anda butuhkan. Ada yang bisa saya bantu?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

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
          messages: [
            {
              role: 'system',
              content: `Kamu adalah BumiBot, asisten AI untuk BuildUMKM - platform yang menghubungkan UMKM dengan developer lokal untuk pembuatan website. 

Tugas kamu:
1. Membantu UMKM konsultasi kebutuhan website mereka
2. Menyarankan fitur-fitur yang cocok untuk bisnis mereka
3. Menjelaskan paket hosting dan harga
4. Memberikan estimasi waktu pengerjaan
5. Menjawab pertanyaan tentang proses pembuatan website

Informasi penting:
- Paket Basic: Rp 500.000 (5 halaman, hosting 1 tahun, domain gratis)
- Paket Pro: Rp 1.500.000 (10 halaman, hosting 1 tahun, domain gratis, SEO basic)
- Paket Premium: Rp 3.000.000 (Unlimited halaman, hosting 1 tahun, domain gratis, SEO advanced, maintenance)
- Waktu pengerjaan: 3-7 hari kerja
- Fitur: Landing page, katalog produk, kontak form, WhatsApp integration, Google Maps, admin panel

PENTING: Berikan jawaban dalam format teks biasa tanpa menggunakan formatting markdown seperti:
- JANGAN gunakan tanda bintang (*) atau garis bawah (_) untuk bold/italic
- JANGAN gunakan tanda pagar (#) untuk heading
- JANGAN gunakan backtick (\`) untuk code
- JANGAN gunakan dash (-) atau angka untuk list
- Gunakan HANYA teks biasa dengan paragraf dan kalimat yang jelas
- Pisahkan informasi dengan baris baru untuk keterbacaan
- Gunakan huruf kapital HANYA untuk penekanan kata penting

Berikan jawaban yang ramah, profesional, dan mudah dipahami oleh UMKM. Gunakan bahasa Indonesia yang sederhana dengan format teks biasa saja.`
            },
            ...messages.map(msg => ({
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

      const data = await response.json();
      const aiMessage = {
        role: 'assistant',
        content: data.choices[0].message.content,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi tim support kami.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
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

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-full shadow-lg hover:shadow-2xl transition-all z-50 flex items-center justify-center group hover:scale-110 active:scale-90"
          >
            <MessageCircle className="w-7 h-7" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></span>
            
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Chat dengan BumiBot
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-900"></div>
            </div>
          </button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden transition-all duration-300"
            style={{ 
              maxHeight: '90vh',
              height: isMinimized ? 'auto' : '600px'
            }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    {import.meta.env.VITE_CHATBOT_NAME || 'BumiBot'}
                    <Sparkles className="w-4 h-4" />
                  </h3>
                  <p className="text-purple-100 text-xs">Asisten AI BuildUMKM</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                    >
                      <div className={`flex gap-2 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.role === 'user' 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-white text-purple-600 border-2 border-purple-200'
                        }`}>
                          {message.role === 'user' ? (
                            <User className="w-4 h-4" />
                          ) : (
                            <Bot className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <div className={`rounded-2xl px-4 py-2 ${
                            message.role === 'user'
                              ? 'bg-purple-600 text-white rounded-tr-none'
                              : 'bg-white text-gray-800 rounded-tl-none shadow-sm'
                          }`}>
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          </div>
                          <p className={`text-xs text-gray-500 mt-1 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div
                      className="flex justify-start animate-fade-in"
                    >
                      <div className="flex gap-2 max-w-[80%]">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-white text-purple-600 border-2 border-purple-200">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t border-gray-200">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ketik pesan..."
                      disabled={isLoading}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-purple-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!inputMessage.trim() || isLoading}
                      className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Powered by DeepSeek AI via OpenRouter
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
