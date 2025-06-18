import { useState } from 'react';

export default function FactCheckerCard() {
  const [claim, setClaim] = useState('');
  const [source, setSource] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<null | { score: number; status: 'success' | 'warning' | 'error'; title: string; details: string; icon: string }>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claim.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const score = Math.floor(Math.random() * 100) + 1;
      let status: 'success' | 'warning' | 'error', icon, title, details;
      if (score > 75) {
        status = 'success';
        icon = 'fa-check-circle';
        title = `Credibility Score: ${score}% ✅`;
        details = 'Source strength: High | No credibility warnings detected';
      } else if (score > 50) {
        status = 'warning';
        icon = 'fa-exclamation-triangle';
        title = `Credibility Score: ${score}% ⚠️`;
        details = 'Source strength: Medium | Warning: Inconclusive evidence found';
      } else {
        status = 'error';
        icon = 'fa-times-circle';
        title = `Credibility Score: ${score}% ❌`;
        details = 'Source strength: Low | Warning: Unreliable claims detected';
      }
      setResult({ score, status, icon, title, details });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="card bg-white rounded-2xl shadow p-8 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Fact-Checker</h2>
        <div className="flex gap-2">
          <button className="card-action bg-blue-100 text-blue-600 w-9 h-9 rounded-lg flex items-center justify-center"><i className="fas fa-history" /></button>
          <button className="card-action bg-blue-100 text-blue-600 w-9 h-9 rounded-lg flex items-center justify-center"><i className="fas fa-question-circle" /></button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Enter claim or paste article</label>
          <textarea
            className="w-full border border-gray-200 rounded-lg p-3 min-h-[120px] focus:ring-2 focus:ring-blue-200"
            value={claim}
            onChange={e => setClaim(e.target.value)}
            placeholder="Paste article, social media post, or claim text here..."
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Source Type</label>
          <select
            className="w-full border border-gray-200 rounded-lg p-3"
            value={source}
            onChange={e => setSource(e.target.value)}
          >
            <option value="">Select source type</option>
            <option>Social Media</option>
            <option>News Article</option>
            <option>Official Statement</option>
            <option>Eyewitness Report</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Attach Evidence (Optional)</label>
          <input
            type="file"
            className="w-full border border-gray-200 rounded-lg p-3"
            onChange={e => setFile(e.target.files?.[0] || null)}
          />
        </div>
        <button type="submit" className="btn bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-800 transition">
          <i className="fas fa-search" />
          Verify Claim
        </button>
      </form>
      {loading && (
        <div className="result-card flex items-center gap-4 mt-6 bg-blue-50 text-blue-700 p-4 rounded-lg animate-pulse">
          <i className="fas fa-spinner fa-spin text-2xl" />
          <div>
            <div className="font-bold">Analyzing Content</div>
            <div className="text-sm">Verifying claim against trusted sources...</div>
          </div>
        </div>
      )}
      {result && !loading && (
        <div className={`result-card flex items-center gap-4 mt-6 p-4 rounded-lg ${
          result.status === 'success' ? 'bg-green-50 text-green-700 border-l-4 border-green-500' :
          result.status === 'warning' ? 'bg-yellow-50 text-yellow-700 border-l-4 border-yellow-500' :
          'bg-red-50 text-red-700 border-l-4 border-red-500'
        }`}>
          <i className={`fas ${result.icon} text-2xl`} />
          <div>
            <div className="font-bold">{result.title}</div>
            <div className="text-sm">{result.details}</div>
          </div>
        </div>
      )}
    </div>
  );
} 