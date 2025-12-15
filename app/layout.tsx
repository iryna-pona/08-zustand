import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'NoteHub — application for creating, managing and organizing your notes',
  openGraph: {
    title: 'NoteHub',
    description: 'NoteHub — application for creating, managing and organizing your notes',
    url: '/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub',
      },
    ],
  },
};

const roboto = Roboto({
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-roboto', 
  display: 'swap',
});

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ roboto.variable }>
        <TanStackProvider>
          <Header />
          <main>
            {children}
            {modal}
          </main>
          <Footer />
          <div id="modal-root"></div>
        </TanStackProvider>
      </body>
    </html>
  );
}
