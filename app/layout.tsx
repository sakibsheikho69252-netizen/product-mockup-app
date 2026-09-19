import React from 'react'

export const metadata = {
  title: '3D Product Mockup & Label Studio',
  description: 'Interactive 3D Product Mockup & Label Generator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: '#0a0a0a',
          color: '#ffffff',
          overflow: 'hidden',
        }}
      >
        {children}
      </body>
    </html>
  )
}
