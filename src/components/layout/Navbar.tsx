import { Button } from "@/components/ui/button"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { Globe } from "lucide-react"

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center">
            <img src="https://cdn.globaleur.com/assets/build/brand.svg" alt="Globaleur" className="h-8" />
          </a>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink className="text-sm" href="/cities">
                  Destinations
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="text-sm" href="/tours">
                  Tours & Activities
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="text-sm" href="/tour-check-booking">
                  My Bookings
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="gap-2">
            <Globe className="h-4 w-4" />
            USD
          </Button>
          <Button variant="ghost" size="sm">
            EN
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href="/signin">Log in</a>
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700" asChild>
            <a href="/signup">Sign up</a>
          </Button>
        </div>
      </div>
    </nav>
  )
}
