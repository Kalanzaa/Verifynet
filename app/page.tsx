import Link from 'next/link';

export default function Home() {
  return (
    <div className="container card">
      <h1>Welcome to VerifiNet Crisis Hub</h1>
      <p>Select a feature to get started:</p>
      <ul>
        <li><Link className="tab-btn" href="/portal/verify">Fact Checker</Link></li>
        <li><Link className="tab-btn" href="/portal/tip-submission">Submit a Tip</Link></li>
        <li><Link className="tab-btn" href="/portal/crisis-map">Crisis Map</Link></li>
      </ul>
    </div>
  );
} 