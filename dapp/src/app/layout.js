
import "./globals.css";


export const metadata = {
  title: "BetCandidate Crypto",
  description: "Sua plataforma de aposta crypto",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        {children}
      </body>
    </html>
  );
}
