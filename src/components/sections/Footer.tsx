import React from "react"
import { Linkedin } from "lucide-react"

interface FooterLinkProps {
  href: string
  children: React.ReactNode
  external?: boolean
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children, external }) => (
  <a
    href={href}
    className="text-gray-400 hover:text-white transition-colors"
    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
  >
    {children}
  </a>
)

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img src="https://cdn.globaleur.com/assets/build/brand.svg" alt="Globaleur" className="h-8 brightness-0 invert" />
            <p className="text-gray-400">
              AI-powered travel planning platform that helps you create the perfect itinerary
            </p>
            <div className="flex space-x-4">
              <FooterLink href="https://www.linkedin.com/company/globaleur/" external>
                <Linkedin className="h-5 w-5" />
              </FooterLink>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Products</h4>
            <ul className="space-y-2">
              <li><FooterLink href="/cities">Destinations</FooterLink></li>
              <li><FooterLink href="/tours">Tours &amp; Activities</FooterLink></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Support</h4>
            <ul className="space-y-2">
              <li><FooterLink href="/faq">FAQ</FooterLink></li>
              <li><FooterLink href="/contact-us">Contact Us</FooterLink></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Company</h4>
            <ul className="space-y-2">
              <li><FooterLink href="https://www.globaleur.com/about-globaleur" external>About Us</FooterLink></li>
              <li><FooterLink href="/terms">Terms &amp; Conditions</FooterLink></li>
              <li><FooterLink href="/privacy">Privacy &amp; Cookies Policy</FooterLink></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Globaleur. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
