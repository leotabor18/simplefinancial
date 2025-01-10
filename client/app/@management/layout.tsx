export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <div className='m-0 w-full overflow-y-auto p-12 pt-10 relative'>
      { children }
    </div>
  );
}