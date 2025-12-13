import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/Loading';
import { cn, formatRelativeTime } from '@/utils';
import { useChat } from '@/hooks';

const ChatAgent: React.FC = () => {
  const { messages, isLoading, error, sendMessage } = useChat();
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const message = inputMessage.trim();
    setInputMessage('');
    await sendMessage(message);
  };

  const quickPrompts = [
    'Probability Fed cuts by 2026-03-31',
    'Find mispriced markets',
    'Current regime status',
    'Energy shock analysis'
  ];

  const handleQuickPrompt = (prompt: string) => {
    setInputMessage(prompt);
  };

  return (
    <Card className="col-span-2" hover>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bot className="h-5 w-5 text-[#FFA500]" />
          <span>Ask MacroCycle AI</span>
        </CardTitle>
        <p className="text-xs text-[#A1A1AA]">
          Get probabilistic analysis for prediction markets
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Messages Container */}
          <div className="h-64 overflow-y-auto space-y-3 pr-2">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={cn(
                    'flex items-start space-x-3',
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.sender === 'ai' && (
                    <div className="flex-shrink-0 w-8 h-8 bg-[#FFA500] rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-[#000000]" />
                    </div>
                  )}
                  
                  <div className={cn(
                    'max-w-[80%] p-3 rounded-2xl text-sm',
                    message.sender === 'user'
                      ? 'bg-[#27272A] text-[#FFFFFF] rounded-tr-sm'
                      : 'bg-[#000000] border border-[#FFA500] text-[#FFFFFF] rounded-tl-sm'
                  )}>
                    <p className="leading-relaxed">{message.content}</p>
                    
                    {/* Trading Metrics for AI messages */}
                    {message.sender === 'ai' && message.metrics && (
                      <div className="mt-3 pt-2 border-t border-[#FFA500]/20">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-[#A1A1AA]">Confidence: </span>
                            <span className="text-[#FFA500] font-medium">
                              {(message.metrics.confidence * 100).toFixed(0)}%
                            </span>
                          </div>
                          <div>
                            <span className="text-[#A1A1AA]">Risk: </span>
                            <span className={cn(
                              'font-medium',
                              message.metrics.risk_level === 'low' ? 'text-[#10B981]' :
                              message.metrics.risk_level === 'medium' ? 'text-[#F59E0B]' : 'text-[#EF4444]'
                            )}>
                              {message.metrics.risk_level.toUpperCase()}
                            </span>
                          </div>
                          {message.metrics.kelly_fraction && (
                            <div>
                              <span className="text-[#A1A1AA]">Kelly: </span>
                              <span className="text-[#FFA500] font-medium">
                                {(message.metrics.kelly_fraction * 100).toFixed(1)}%
                              </span>
                            </div>
                          )}
                          <div>
                            <span className="text-[#A1A1AA]">Uncertainty: </span>
                            <span className="text-[#A1A1AA] font-medium">
                              {(message.metrics.uncertainty_factor * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                        {message.metrics.market_regime && (
                          <div className="mt-1 text-xs">
                            <span className="text-[#A1A1AA]">Regime: </span>
                            <span className="text-[#FFA500] font-medium capitalize">
                              {message.metrics.market_regime.replace('_', ' ')}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <p className={cn(
                      'text-xs mt-2',
                      message.sender === 'user' ? 'text-[#A1A1AA]' : 'text-[#FFA500]'
                    )}>
                      {formatRelativeTime(message.timestamp)}
                    </p>
                  </div>
                  
                  {message.sender === 'user' && (
                    <div className="flex-shrink-0 w-8 h-8 bg-[#3F3F46] rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-[#FFFFFF]" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start space-x-3"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-[#FFA500] rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-[#000000]" />
                </div>
                <div className="bg-[#000000] border border-[#FFA500] p-3 rounded-2xl rounded-tl-sm">
                  <LoadingSpinner size="sm" />
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Error Display */}
          {error && (
            <div className="p-3 bg-[#F43F5E]/20 border border-[#F43F5E] rounded-lg">
              <p className="text-sm text-[#F43F5E]">Error: {error}</p>
            </div>
          )}

          {/* Quick Prompts */}
          {messages.length === 0 && (
            <div className="space-y-2">
              <p className="text-xs text-[#A1A1AA]">Quick prompts:</p>
              <div className="flex flex-wrap gap-2">
                {quickPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuickPrompt(prompt)}
                    className="text-xs h-7"
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <div className="flex-1 relative">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about Fed policy, market probabilities, or trading opportunities..."
                disabled={isLoading}
                className="pr-12"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8"
                disabled={!inputMessage.trim() || isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* System Prompt Reminder */}
          <div className="p-3 bg-[#18181B] rounded-lg border border-[#27272A]">
            <p className="text-xs text-[#52525B] leading-relaxed">
              <strong>MacroCycle AI</strong> provides probabilistic analysis for macro events 
              and prediction markets. Responses include confidence levels and uncertainty factors. 
              Always verify with your own research.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatAgent;