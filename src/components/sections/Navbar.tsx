import { Button } from '../ui/button'
import { Globe, ChevronDown, Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center">
          <img
            src="/assets/brand.svg"
            alt="Globaleur"
            className="h-8"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="/cities" className="text-gray-600 hover:text-gray-900 transition-colors">
            Destinations
          </a>
          <a href="/tours" className="text-gray-600 hover:text-gray-900 transition-colors">
            Tours {'&'} Activities
          </a>
          <a href="/tour-check-booking" className="text-gray-600 hover:text-gray-900 transition-colors">
            My Bookings
          </a>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-700">
            <Globe className="h-4 w-4 mr-1" />
            USD
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-700">
            EN
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
          <a href="/signin">
            <Button variant="ghost" size="sm" className="text-gray-700 hover:text-gray-900">
              Log in
            </Button>
          </a>
          <a href="/signup">
            <Button size="sm" className="bg-[#4F46E5] text-white hover:bg-[#4338CA]">
              Sign up
            </Button>
          </a>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="hover:bg-gray-100 -mr-2">
              <Menu className="h-6 w-6 text-gray-700" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>
                <img
                  src="/assets/brand.svg"
                  alt="Globaleur"
                  className="h-8"
                />
              </SheetTitle>
            </SheetHeader>
            <div className="mt-8 flex flex-col space-y-4">
              <a href="/cities" className="text-lg text-gray-600 hover:text-gray-900">
                Destinations
              </a>
              <a href="/tours" className="text-lg text-gray-600 hover:text-gray-900">
                Tours {'&'} Activities
              </a>
              <a href="/tour-check-booking" className="text-lg text-gray-600 hover:text-gray-900">
                My Bookings
              </a>
              <hr className="my-4" />
              <Button variant="ghost" size="sm" className="justify-start text-gray-600 hover:text-gray-700">
                <Globe className="h-4 w-4 mr-2" />
                USD
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
              <Button variant="ghost" size="sm" className="justify-start text-gray-600 hover:text-gray-700">
                EN
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
              <hr className="my-4" />
              <a href="/signin">
                <Button variant="ghost" size="lg" className="w-full justify-start text-gray-700 hover:text-gray-900">
                  Log in
                </Button>
              </a>
              <a href="/signup">
                <Button size="lg" className="w-full bg-[#4F46E5] text-white hover:bg-[#4338CA]">
                  Sign up
                </Button>
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
