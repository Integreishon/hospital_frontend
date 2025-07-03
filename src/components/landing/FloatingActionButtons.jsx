import React, { useState, useRef, useEffect } from 'react';
import { chatbotService } from '../../services/chatbotService';
import toast from 'react-hot-toast';

const FloatingActionButtons = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hola 👋 Soy el asistente virtual de UroVital. ¿En qué puedo ayudarte hoy?'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);
  
  const messageEndRef = useRef(null);
  const chatInputRef = useRef(null);

  // Cargar FAQs cuando se abre el chatbot
  useEffect(() => {
    if (isChatbotOpen && suggestedQuestions.length === 0) {
      loadFAQs();
    }
    
    if (isChatbotOpen) {
      // Enfocar el campo de entrada cuando se abre el chat
      setTimeout(() => {
        chatInputRef.current?.focus();
      }, 300);
    }
  }, [isChatbotOpen]);

  // Cargar el historial de conversaciones
  useEffect(() => {
    if (isChatbotOpen) {
      loadChatHistory();
    }
  }, [isChatbotOpen]);

  // Desplazar la vista hacia el último mensaje
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadChatHistory = async () => {
    try {
      const response = await chatbotService.getConversationHistory();
      
      if (response && response.data && response.data.length > 0) {
        const formattedMessages = response.data.flatMap(conversation => [
          { role: 'user', content: conversation.query },
          { role: 'assistant', content: conversation.response }
        ]);
        
        setMessages([
          {
            role: 'assistant',
            content: 'Hola 👋 Soy el asistente virtual de UroVital. ¿En qué puedo ayudarte hoy?'
          },
          ...formattedMessages
        ]);
      }
    } catch (error) {
      console.error('Error al cargar historial del chat', error);
    }
  };

  const loadFAQs = async () => {
    try {
      const response = await chatbotService.getFAQs(4);
      console.log("FAQs response in component:", JSON.stringify(response, null, 2));
      
      // La API devuelve { success, message, data, timestamp }
      if (response && response.success === true && Array.isArray(response.data)) {
        // Acceso directo al array de FAQs
        console.log("FAQs encontradas:", response.data.length);
        setSuggestedQuestions(
          response.data.map(faq => ({
            id: faq.id,
            text: faq.question
          }))
        );
      } else {
        console.warn("No se encontraron FAQs en la respuesta:", JSON.stringify(response, null, 2));
        // FAQs por defecto si no hay respuesta del API
        setSuggestedQuestions([
          { id: 1, text: '¿Qué especialidades médicas ofrecen?' },
          { id: 2, text: '¿Cómo puedo agendar una cita?' },
          { id: 3, text: '¿Cuáles son los horarios de atención?' },
          { id: 4, text: '¿Trabajan con seguros médicos?' }
        ]);
      }
    } catch (error) {
      console.error('Error al cargar FAQs', error);
      // Usar FAQs por defecto en caso de error
      setSuggestedQuestions([
        { id: 1, text: '¿Qué especialidades médicas ofrecen?' },
        { id: 2, text: '¿Cómo puedo agendar una cita?' },
        { id: 3, text: '¿Cuáles son los horarios de atención?' },
        { id: 4, text: '¿Trabajan con seguros médicos?' }
      ]);
    }
  };

  const handleSuggestedQuestion = (question) => {
    handleSendMessage(question);
  };
  
  const openWhatsapp = () => {
    // Número de WhatsApp con código de país (Perú +51)
    const phoneNumber = '51999999999'; // Reemplazar con el número real
    const message = 'Hola, estoy interesado en más información sobre los servicios de UroVital.';
    
    // URL para abrir WhatsApp con mensaje predefinido
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Abrir en nueva pestaña
    window.open(whatsappURL, '_blank');
  };
  
  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async (questionText) => {
    const message = questionText || inputValue.trim();
    
    if (!message) return;

    // Agregar el mensaje del usuario al chat
    setMessages(prev => [
      ...prev, 
      { role: 'user', content: message }
    ]);
    
    // Limpiar el input
    setInputValue('');
    
    // Mostrar el estado de carga
    setIsLoading(true);

    try {
      const response = await chatbotService.sendQuery(message);
      console.log("Chatbot query response:", JSON.stringify(response, null, 2));
      
      // La API devuelve { success, message, data, timestamp }
      if (response && response.success === true && response.data) {
        const botResponse = response.data;
        console.log("Bot response data:", JSON.stringify(botResponse, null, 2));
        
        // Agregar la respuesta del bot
        setMessages(prev => [
          ...prev,
          { 
            role: 'assistant', 
            content: botResponse.response,
            references: botResponse.references,
            suggestedQuestions: botResponse.suggestedQuestions,
            conversationId: botResponse.conversationId
          }
        ]);

        // Actualizar las preguntas sugeridas si existen
        if (botResponse.suggestedQuestions && botResponse.suggestedQuestions.length > 0) {
          setSuggestedQuestions(
            botResponse.suggestedQuestions.map((q, idx) => ({ id: `sugg-${idx}`, text: q }))
          );
        }
      } else {
        console.warn("Respuesta del chatbot inesperada:", JSON.stringify(response, null, 2));
        // Mensaje de error por defecto si no hay respuesta válida
        setMessages(prev => [
          ...prev,
          { 
            role: 'assistant', 
            content: 'Lo siento, estoy experimentando problemas para procesar tu consulta en este momento. Por favor, intenta de nuevo más tarde o contacta directamente con nuestro equipo de atención.'
          }
        ]);
      }
    } catch (error) {
      console.error('Error en la consulta al chatbot:', error);
      
      // Mensaje de error amigable
      setMessages(prev => [
        ...prev,
        { 
          role: 'assistant', 
          content: 'Lo siento, no pude procesar tu consulta en este momento. Por favor, intenta de nuevo o contacta con nuestro equipo de atención al cliente para recibir ayuda.'
        }
      ]);

      toast.error('Error al comunicarse con el asistente virtual');
    } finally {
      setIsLoading(false);
    }
  };

  const formatMessageContent = (content) => {
    // Reemplazar URLs con enlaces
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const contentWithLinks = content.replace(urlRegex, url => `<a href="${url}" target="_blank" class="text-blue-600 hover:underline">${url}</a>`);
    
    // Reemplazar saltos de línea con <br>
    return contentWithLinks.replace(/\n/g, '<br>');
  };

  const sendFeedback = async (conversationId, rating) => {
    try {
      await chatbotService.sendFeedback(conversationId, rating);
      toast.success('¡Gracias por tu feedback!');
    } catch (error) {
      console.error('Error al enviar feedback:', error);
      toast.error('No se pudo enviar tu calificación');
    }
  };
  
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
      {/* Chatbot modal - Ahora se abre hacia la izquierda */}
      <div className="flex items-end">
        {isChatbotOpen && (
          <div className="bg-white rounded-lg shadow-2xl w-72 sm:w-96 h-[500px] mr-4 border border-gray-200 overflow-hidden flex flex-col animate-slide-in-right">
            <div className="bg-[#043464] text-white p-3 flex justify-between items-center">
              <h3 className="font-semibold font-montserrat text-sm">UroVital Asistente Virtual</h3>
              <button onClick={toggleChatbot} className="text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="flex-1 p-3 overflow-y-auto bg-gray-50 scrollbar-thin">
              {/* Mensajes */}
              {messages.map((message, index) => (
                <div key={index} className={`mb-3 ${message.role === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block rounded-lg p-2.5 text-sm max-w-[85%] ${
                    message.role === 'user' 
                      ? 'bg-[#043464] text-white rounded-br-none' 
                      : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none shadow'
                  }`}>
                    <p 
                      className="text-left" 
                      dangerouslySetInnerHTML={{ __html: formatMessageContent(message.content) }} 
                    />
                    
                    {/* Feedback buttons (sólo para mensajes del asistente) */}
                    {message.role === 'assistant' && message.conversationId && (
                      <div className="mt-1 flex justify-end gap-1 opacity-60 hover:opacity-100">
                        <button 
                          onClick={() => sendFeedback(message.conversationId, 5)}
                          className="p-0.5 hover:text-green-500"
                          title="Me gustó la respuesta"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => sendFeedback(message.conversationId, 1)}
                          className="p-0.5 hover:text-red-500"
                          title="No me gustó la respuesta"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Indicador de carga */}
              {isLoading && (
                <div className="flex items-center space-x-2 mt-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse animation-delay-150"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse animation-delay-300"></div>
                </div>
              )}
              
              {/* Preguntas sugeridas */}
              {!isLoading && suggestedQuestions.length > 0 && (
                <div className="mt-3 space-y-1.5">
                  <p className="text-xs text-gray-500 font-medium">Preguntas sugeridas:</p>
                  {suggestedQuestions.map(question => (
                    <button
                      key={question.id}
                      className="text-xs text-left block w-full bg-white hover:bg-gray-100 px-2.5 py-1.5 rounded border border-gray-200 transition-colors duration-200"
                      onClick={() => handleSuggestedQuestion(question.text)}
                    >
                      {question.text}
                    </button>
                  ))}
                </div>
              )}
              
              <div ref={messageEndRef} />
            </div>
            
            <div className="p-3 border-t border-gray-200 bg-white">
              <div className="flex items-center">
                <textarea 
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  ref={chatInputRef}
                  rows="1"
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 border border-gray-300 rounded-l-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#043464] resize-none overflow-auto max-h-16"
                />
                <button 
                  className={`bg-[#043464] text-white p-2 rounded-r-lg ${isLoading ? 'opacity-70' : 'hover:bg-[#032a52]'}`} 
                  onClick={() => handleSendMessage()}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  )}
                </button>
              </div>
              <p className="text-[10px] text-gray-500 mt-1 text-right">
                Presiona Enter para enviar
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {/* Botón de Chatbot */}
          <button
            onClick={toggleChatbot}
            className="bg-[#043464] hover:bg-[#032a52] w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            aria-label="Abrir chat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
          </button>
          
          {/* Botón de WhatsApp */}
          <button
            onClick={openWhatsapp}
            className="bg-green-500 hover:bg-green-600 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            aria-label="Contactar por WhatsApp"
          >
            <svg className="w-7 h-7 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.304-1.654a11.881 11.881 0 005.7 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingActionButtons; 