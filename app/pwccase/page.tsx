'use client';

import { useState, useEffect } from 'react';
import { X, Sparkles, Calendar, Clock, TrendingUp, Zap, ChevronDown, Plus, Check } from 'lucide-react';

interface TimeEntry {
  id: string;
  wbsCode: string;
  clientName: string;
  hours: number;
  description: string;
}

export default function PWCCasePrototype() {
  const [sessionTime, setSessionTime] = useState(0);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState({ wbsCode: '', clientName: '', hours: '', description: '' });
  const [aiSuggestions, setAiSuggestions] = useState<any[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Mock data for AI suggestions
  const mockCalendarEvents = [
    { time: '9:00 AM - 11:30 AM', title: 'Coca-Cola Q1 Strategy Review', wbs: 'WBS-4892-CC', hours: 2.5 },
    { time: '1:00 PM - 3:30 PM', title: 'Google Cloud Migration Planning', wbs: 'WBS-5124-GG', hours: 2.5 },
    { time: '3:30 PM - 5:00 PM', title: 'Internal: Team Sync', wbs: 'WBS-INT-001', hours: 1.5 },
  ];

  const recentWBSCodes = [
    { code: 'WBS-4892-CC', client: 'Coca-Cola', lastUsed: 'Yesterday' },
    { code: 'WBS-5124-GG', client: 'Google', lastUsed: '2 days ago' },
    { code: 'WBS-3301-AM', client: 'Amazon', lastUsed: 'Last week' },
  ];

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime((prev) => {
        const newTime = prev + 1;
        // Trigger AI assistant at 30 seconds for demo (in real app: 15 minutes = 900 seconds)
        if (newTime === 30 && !showAIAssistant) {
          setShowAIAssistant(true);
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showAIAssistant]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const addEntry = () => {
    if (currentEntry.wbsCode && currentEntry.hours) {
      setEntries([...entries, {
        id: Date.now().toString(),
        wbsCode: currentEntry.wbsCode,
        clientName: currentEntry.clientName,
        hours: parseFloat(currentEntry.hours),
        description: currentEntry.description
      }]);
      setCurrentEntry({ wbsCode: '', clientName: '', hours: '', description: '' });
    }
  };

  const applyAISuggestion = (event: any) => {
    setCurrentEntry({
      wbsCode: event.wbs,
      clientName: event.title.split(':')[0] || '',
      hours: event.hours.toString(),
      description: event.title
    });
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 2000);
  };

  const applyAllSuggestions = () => {
    const newEntries = mockCalendarEvents.map((event, index) => ({
      id: `ai-${Date.now()}-${index}`,
      wbsCode: event.wbs,
      clientName: event.title.split(':')[0] || '',
      hours: event.hours,
      description: event.title
    }));
    setEntries([...entries, ...newEntries]);
    setShowAIAssistant(false);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const totalHours = entries.reduce((sum, entry) => sum + entry.hours, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Astro</h1>
                  <p className="text-xs text-gray-500">Time Entry System</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Session: {formatTime(sessionTime)}</span>
              </div>
              <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Help
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-20 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-fade-in">
          <Check className="w-5 h-5" />
          <span>AI suggestion applied!</span>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Case Study Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-900 mb-2">PWC Case Study: Option A - Enhance Astro with AI</h2>
              <p className="text-gray-700 mb-3">
                <strong>Target Segment:</strong> Complex Users (18%) - 6+ WBS codes, 30+ minutes daily
              </p>
              <p className="text-gray-600 text-sm">
                This prototype demonstrates AI-powered assistance for complex time entry scenarios. The AI assistant will automatically appear after 15 minutes of activity (simulated at 30 seconds for demo).
              </p>
              <button
                onClick={() => setShowAIAssistant(!showAIAssistant)}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                {showAIAssistant ? 'Hide' : 'Show'} AI Assistant (Demo)
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Time Entry Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Entries */}
            {entries.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Today's Entries</h3>
                  <div className="text-sm text-gray-600">Total: <span className="font-bold text-blue-600">{totalHours.toFixed(1)} hrs</span></div>
                </div>
                <div className="space-y-3">
                  {entries.map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">{entry.wbsCode}</span>
                          <span className="font-medium text-gray-900">{entry.clientName}</span>
                        </div>
                        {entry.description && (
                          <p className="text-sm text-gray-600">{entry.description}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">{entry.hours} hrs</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New Entry Form */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Time Entry</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">WBS Code *</label>
                  <input
                    type="text"
                    value={currentEntry.wbsCode}
                    onChange={(e) => setCurrentEntry({ ...currentEntry, wbsCode: e.target.value })}
                    placeholder="e.g., WBS-4892-CC"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Client/Project Name</label>
                  <input
                    type="text"
                    value={currentEntry.clientName}
                    onChange={(e) => setCurrentEntry({ ...currentEntry, clientName: e.target.value })}
                    placeholder="e.g., Coca-Cola"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hours *</label>
                  <input
                    type="number"
                    step="0.5"
                    value={currentEntry.hours}
                    onChange={(e) => setCurrentEntry({ ...currentEntry, hours: e.target.value })}
                    placeholder="e.g., 2.5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={currentEntry.description}
                    onChange={(e) => setCurrentEntry({ ...currentEntry, description: e.target.value })}
                    placeholder="Optional: Brief description of work"
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={addEntry}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add Entry
                </button>
              </div>
            </div>

            {/* Submit All */}
            {entries.length > 0 && (
              <button className="w-full px-6 py-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-lg">
                Submit All Entries ({entries.length})
              </button>
            )}
          </div>

          {/* Sidebar - Quick Access */}
          <div className="space-y-6">
            {/* Recent WBS Codes */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Recent WBS Codes
              </h3>
              <div className="space-y-2">
                {recentWBSCodes.map((wbs) => (
                  <button
                    key={wbs.code}
                    onClick={() => setCurrentEntry({ ...currentEntry, wbsCode: wbs.code, clientName: wbs.client })}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-colors"
                  >
                    <div className="font-medium text-sm text-gray-900">{wbs.code}</div>
                    <div className="text-xs text-gray-500">{wbs.client} • {wbs.lastUsed}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Today's Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Entries</span>
                  <span className="font-bold text-gray-900">{entries.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Hours</span>
                  <span className="font-bold text-blue-600">{totalHours.toFixed(1)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Target</span>
                  <span className="font-bold text-gray-900">8.0</span>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((totalHours / 8) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant Modal */}
      {showAIAssistant && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">AI Assistant Detected Complex Entry</h2>
                    <p className="text-blue-100">You've been entering time for {formatTime(sessionTime)}. Let me help streamline this process.</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAIAssistant(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              {/* Calendar-Based Suggestions */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Calendar-Based Suggestions</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">High Confidence</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">Based on your calendar events today, I found these time entries:</p>
                <div className="space-y-3">
                  {mockCalendarEvents.map((event, index) => (
                    <div key={index} className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:border-blue-400 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{event.time}</span>
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-1">{event.title}</h4>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 bg-blue-600 text-white rounded text-xs font-medium">{event.wbs}</span>
                            <span className="text-sm text-gray-600">{event.hours} hours</span>
                          </div>
                        </div>
                        <button
                          onClick={() => applyAISuggestion(event)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Features */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    <h4 className="font-semibold text-gray-900">Pattern Detection</h4>
                  </div>
                  <p className="text-sm text-gray-600">You typically work on Coca-Cola projects on Mondays. Would you like me to pre-fill similar entries?</p>
                </div>
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-orange-600" />
                    <h4 className="font-semibold text-gray-900">Bulk Entry Mode</h4>
                  </div>
                  <p className="text-sm text-gray-600">Switch to bulk mode to enter multiple similar WBS codes faster with keyboard shortcuts.</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={applyAllSuggestions}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Apply All Suggestions
                </button>
                <button
                  onClick={() => setShowAIAssistant(false)}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
