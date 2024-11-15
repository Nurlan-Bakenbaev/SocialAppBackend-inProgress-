import QueryProviderWrapper from './components/QueryProviderWrapper';
import localFont from 'next/font/local';
import './globals.css';
import NavBar from './components/NavBar';
import Menu from './components/Menu';
import { Toaster } from 'react-hot-toast';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata = {
  title: 'POST APP',
  description: 'My Portfolio app',
};

export default function RootLayout({ children }) {
  return (
    <html data-theme="light" lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <QueryProviderWrapper>
          <NavBar />
          <div className="mb-24 ">{children}</div>
          <Menu />
        </QueryProviderWrapper>
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
