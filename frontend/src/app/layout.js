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
  title: 'Post App - Share and Connect',
  description:
    'Discover, create, and share amazing posts on the Post App. Connect with others and express your ideas!',
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Post App - Share and Connect',
    description:
      'Discover, create, and share amazing posts on the Post App. Connect with others and express your ideas!',
    url: 'https://your-app-url.com',
    // Replace with your app's URL

    images: [
      {
        url: '/meta-banner.jpg',
        alt: 'Post App - Share and Connect',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html data-theme="light" lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
