import "./globals.css";

export const metadata = {
  title: "Photo Scheduler",
  description: "Real Estate Photography Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
