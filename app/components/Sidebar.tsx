import Link from 'next/link';

const navItems = [
  { href: '/portal/verify', icon: 'fa-brain', label: 'Verify Claim' },
  { href: '/portal/tip-submission', icon: 'fa-envelope', label: 'Submit Tip' },
  { href: '/portal/crisis-map', icon: 'fa-map-marked-alt', label: 'Crisis Map' },
  { href: '#', icon: 'fa-history', label: 'History' },
  { href: '#', icon: 'fa-chart-bar', label: 'Analytics' },
  { href: '#', icon: 'fa-users', label: 'Journalists' },
  { href: '#', icon: 'fa-cog', label: 'Settings' },
];

export default function Sidebar() {
  return (
    <nav className="bg-white border-r border-gray-200 h-screen sticky top-0 flex flex-col w-60">
      <div className="px-6 pb-6 pt-4 border-b border-gray-200">
        <Link href="/" className="flex items-center font-bold text-xl text-blue-600">
          <i className="fas fa-shield-alt mr-3 text-2xl" />
          VerifiNet
        </Link>
      </div>
      <ul className="flex-1 py-6 space-y-1">
        {navItems.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="flex items-center px-6 py-3 text-gray-800 font-medium hover:bg-blue-50 hover:text-blue-700 transition border-l-4 border-transparent hover:border-blue-600"
            >
              <i className={`fas ${item.icon} w-6 text-center mr-3`} />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
} 