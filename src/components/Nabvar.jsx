import { useEffect, useState } from "react"
import { cn } from "../lib/utils"
const navItems= [
    {name: "Home",href:"#hero"},
    {name: "About",href:"#about"},
    {name: "Skills",href:"#skills"},
    {name: "Projects",href:"#projects"},
    {name: "Contact",href:"#contact"}
]
    




export const Navbar = () => {
    const [isScrolled,setIsScrolled]=useState(false)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(()=> {
        const handleScroll=()=>{
            setIsScrolled(window.scrollY>10)
        }

        window.addEventListener("scroll",handleScroll)
        return()=> window.removeEventListener("scroll",handleScroll)
    })
    return <nav className={cn("fixed w-full z-40 transition-all duration-300" , isScrolled ? "py-3 bg-background-blur-md shadow-xs" : "py-5" )}>

        <div className="container flex items-center justify-between">
            <a href="#hero" className="text-xl font-bold text-primary flex items-center">
                <span className="relative z-10">
                    <span className="text-glow text-foreground ">Pranali Pathak</span>{" "}
                    Portfolio
                </span>
            </a>

            {/* desktop nav*/}
            <div className="hidden md:flex space-x-8">
                {navItems.map((item,key)=> (
                    <a key={key} href={item.href} className="text-foreground/80 hover:text-cyan-400 transition-colors duration-300">
                        {item.name}
                    </a>

                )
            )}
            </div>

            {/* Mobile hamburger */}
            <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1"
            >
            <span className="h-0.5 w-6 bg-foreground"></span>
            <span className="h-0.5 w-6 bg-foreground"></span>
            <span className="h-0.5 w-6 bg-foreground"></span>
            </button>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-background/90 backdrop-blur-lg border-t border-border">
                <div className="flex flex-col items-center gap-6 py-8">
                    {navItems.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="text-lg text-foreground/80 hover:text-cyan-400 transition-colors"
                    >
                        {item.name}
                    </a>
                    ))}
                    </div>
                </div>
            )}





            
            

        </div>

    </nav>
}