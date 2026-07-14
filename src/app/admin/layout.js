import './admin.css';

export const metadata = {
  title: 'Admin Portal | Uboontu Foundation',
  description: 'Secure management portal for Uboontu Foundation website.',
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  }
};

export default function AdminLayout({ children }) {
  return (
    <div className="admin-wrapper-root">
      {children}
    </div>
  );
}
