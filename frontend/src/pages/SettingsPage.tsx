import React, { useState } from 'react';
import { Settings, Key, Sliders, Save, Check } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const SettingsPage: React.FC = () => {
  const [apiKey, setApiKey] = useState('AIzaSy_Mock_Gemini_API_Key_0192837465');
  const [temp, setTemp] = useState('0.2');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
          <Settings className="h-6 w-6 text-purple-400" /> Platform Settings & Gemini AI Tokens
        </h1>
        <p className="text-xs text-slate-400">Configure API keys, model parameters, and vector indexing thresholds.</p>
      </div>

      <GlassCard className="p-6 space-y-6">
        <div className="space-y-4">
          <Input
            label="Google Gemini API Key (Encrypted)"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            icon={<Key className="h-4 w-4" />}
          />

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300 flex justify-between">
              <span>Temperature ({temp})</span>
              <span className="text-cyan-400">Precise Code Logic</span>
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={temp}
              onChange={(e) => setTemp(e.target.value)}
              className="w-full accent-cyan-400"
            />
          </div>

          <Button variant="cyan" onClick={handleSave} className="gap-2">
            {saved ? <Check className="h-4 w-4 text-black" /> : <Save className="h-4 w-4" />}
            {saved ? 'Settings Saved' : 'Save Configuration'}
          </Button>
        </div>
      </GlassCard>
    </div>
  );
};
