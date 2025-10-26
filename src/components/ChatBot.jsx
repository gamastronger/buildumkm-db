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
  Sparkles,
  RotateCcw
} from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  // State animasi streaming
  const [_streamAnimKey, setStreamAnimKey] = useState(0);

  // Load messages from localStorage atau use default
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

  // Save messages to localStorage whenever they change
  useEffect(() => {
    // Filter out streaming messages before saving
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

    // Create placeholder message for streaming
    const placeholderMessage = {
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isStreaming: true
    };
    setMessages(prev => [...prev, placeholderMessage]);

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
          stream: true, // Enable streaming
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

      // Turn off loading indicator as streaming starts
      setIsLoading(false);

      // Process streaming response
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
                // Trigger fade-in animation for streaming
                setStreamAnimKey(prev => prev + 1);
                // Update the last message with streaming content
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
              // Skip invalid JSON
              continue;
            }
          }
        }
      }

      // Finalize the message
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
      
      // Remove placeholder and add error message
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
            className="fixed bottom-6 right-6 w-[420px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden transition-all duration-300"
            style={{ 
              maxHeight: '90vh',
              height: isMinimized ? 'auto' : '650px'
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
                  onClick={resetChat}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                  title="Mulai percakapan baru"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
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
                            {/* Streaming bot message: show word-by-word with smooth fade-in */}
                            {message.isStreaming ? (
                              <span className="text-sm whitespace-pre-wrap">
                                {message.content.split(/(\s+)/).map((word, idx) => (
                                  word.trim() === ''
                                    ? word
                                    : <span key={idx} className="animate-fade-in">{word}</span>
                                ))}
                                <span className="inline-block w-1.5 h-4 bg-purple-600 ml-1 align-middle" style={{ animation: 'blink 1s infinite' }}></span>
                              </span>
                            ) : (
                              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            )}
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
