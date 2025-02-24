import {NextIntlClientProvider} from 'next-intl';
import {getMessages , getLocale} from 'next-intl/server';
import "./globals.css";
 
export default async function LocaleLayout({
  children
}: {
  children: React.ReactNode;
}) {
 
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  const locale = await getLocale();
 
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}