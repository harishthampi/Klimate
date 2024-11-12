
import { useTheme } from "@/context/theme-provider";
import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom"


const Header = () => {
    const {theme,setTheme} =  useTheme();
    const isDark = theme === 'dark';
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:background/60">
      <div className="flex justify-between items-center mx-auto container">
        <Link to='/'>
        <img src={isDark ? "/logo1.png" : "/logo2.png"} alt="logo" className="h-12" />
        </Link>
        <div>
            {/* {Search} */}
            <div onClick={()=>{
                setTheme(isDark ? 'light' : 'dark')
            }} 
            className={`flex items-center cursor-pointer transition-transform duration-500
                ${isDark ? 'transform rotate-180' : 'transform rotate-0'}
                `}
            >
                {isDark ?
                (<Sun className="h-6 w-6 text-yellow-500 rotate-0 transition-all" />)
                :
                (<Moon className="h-6 w-6 text-blue-500 rotate-0 transition-all" />)
                }
            </div>
        </div>
      </div>
    </header>
  )
}

export default Header
