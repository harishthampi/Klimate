import { PropsWithChildren } from 'react'
import Header from './Header'

const Layout = ({children}:PropsWithChildren) => {
  return (
    <div className='bg-gradient-to-br from-background to-muted'>
        <Header />
        <main className='min-h-screen mx-auto container py-8 px-4'>
        {children}
        </main>
        <footer className='border-t backdrop-blur py-12
        supports-[backdrop-filter]:bg-background/60'>
            <div className='mx-auto container px-4 text-center text-gray-500'>
                <p>Made by Harish Thampi</p>
            </div>
        </footer>
    </div>

  )
}

export default Layout
