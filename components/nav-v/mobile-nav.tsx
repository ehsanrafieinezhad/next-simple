"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

// ✅ Define the correct type
interface MenuItem {
  title: string
  href: string
  subItems?: MenuItem[]
}

interface MobileNavProps {
  items: MenuItem[]
  setIsMobileMenuOpen: (isOpen: boolean) => void
}

export function MobileNav({ items, setIsMobileMenuOpen }: MobileNavProps) {
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null)
  const [language, setLanguage] = useState<"en" | "ar">("en")

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
  }, [language])

  return (
    <div className="px-2 pt-2 pb-3 space-y-1">
      <div className="flex justify-end px-3">
        <button
          onClick={() => setLanguage(language === "en" ? "ar" : "en")}
          className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
        >
          {language === "en" ? "🇦🇪 العربية" : "🇬🇧 English"}
        </button>
      </div>
      {items.map((item) => (
        <MobileNavItem
          key={item.title}
          item={item}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          openSubMenu={openSubMenu}
          setOpenSubMenu={setOpenSubMenu}
        />
      ))}
    </div>
  )
}

function MobileNavItem({
  item,
  setIsMobileMenuOpen,
  openSubMenu,
  setOpenSubMenu,
}: {
  item: MenuItem
  setIsMobileMenuOpen: (isOpen: boolean) => void
  openSubMenu: string | null
  setOpenSubMenu: (title: string | null) => void
}) {
  const isSubMenuOpen = openSubMenu === item.title

  if (!item.subItems) {
    return (
      <Link
        href={item.href}
        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {item.title}
      </Link>
    )
  }

  return (
    <div>
      <button
        className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
        onClick={() => setOpenSubMenu(isSubMenuOpen ? null : item.title)}
      >
        {item.title}
        <svg
          className={`ml-2 h-5 w-5 inline transition-transform ${isSubMenuOpen ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isSubMenuOpen && (
        <div className="ml-4 mt-2">
          {item.subItems.map((subItem) => (
            <MobileSubNavItem key={subItem.title} item={subItem} setIsMobileMenuOpen={setIsMobileMenuOpen} />
          ))}
        </div>
      )}
    </div>
  )
}

function MobileSubNavItem({ item, setIsMobileMenuOpen }: { item: MenuItem; setIsMobileMenuOpen: (isOpen: boolean) => void }) {
  const [isNestedSubMenuOpen, setIsNestedSubMenuOpen] = useState(false)

  if (!item.subItems) {
    return (
      <Link
        href={item.href}
        className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {item.title}
      </Link>
    )
  }

  return (
    <div>
      <button
        className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
        onClick={() => setIsNestedSubMenuOpen(!isNestedSubMenuOpen)}
      >
        {item.title}
        <svg
          className={`ml-2 h-5 w-5 inline transition-transform ${isNestedSubMenuOpen ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isNestedSubMenuOpen && (
        <div className="ml-4 mt-2">
          {item.subItems.map((nestedItem) => (
            <Link
              key={nestedItem.title}
              href={nestedItem.href}
              className="block px-3 py-2 rounded-md text-sm font-medium text-gray-400 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {nestedItem.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
