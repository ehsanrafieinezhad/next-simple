"use client"

import { useState } from "react"
import { NavItem  } from "./nav-item"
import { MobileNav } from "./mobile-nav"

const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Products",
    href: "/products",
    subItems: [
      {
        title: "Category A",
        href: "/products/category-a",
        subItems: [
          { title: "Sub-category 1", href: "/products/category-a/sub-1" },
          { title: "Sub-category 2", href: "/products/category-a/sub-2" },
        ],
      },
      {
        title: "Category B",
        href: "/products/category-b",
      },
    ],
  },
  {
    title: "About",
    href: "/about",
    subItems: [
      { title: "Our Story", href: "/about/our-story" },
      { title: "Team", href: "/about/team" ,
        subItems: [
            { title: "Sub-Team 1", href: "/products/category-a/sub-1" },
            { title: "Sub-Team 2", href: "/products/category-a/sub-2" },
          ],
      },
    ],
  },
  {
    title: "Contact",
    href: "/contact",
  },
]

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-gray-900">Logo</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <NavItem key={item.title} item={item} />
              ))}
            </div>
          </div>
          <div className="sm:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className={`${isMobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`${isMobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMobileMenuOpen ? "block" : "hidden"} sm:hidden`}>
        <MobileNav items={navItems} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      </div>
    </nav>
  )
}

