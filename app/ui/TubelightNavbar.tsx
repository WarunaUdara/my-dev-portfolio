"use client"

import React, { useEffect, useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { LucideIcon, ChevronDown, Link as LinkIcon, Image as ImageIcon, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isMobile, setIsMobile] = useState(false)
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const [showMobileModal, setShowMobileModal] = useState(false)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Check if we're on a "More" menu page
  const moreMenuPages = ['/uses', '/bucket-list', '/links', '/under-construction']
  const isOnMorePage = moreMenuPages.some(page => pathname.startsWith(page))

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Set active tab based on current route
  useEffect(() => {
    if (pathname === '/' || pathname.startsWith('/#')) {
      const hash = pathname.split('#')[1]
      if (hash) {
        const item = items.find(i => i.url === `#${hash}`)
        if (item) setActiveTab(item.name)
      } else {
        setActiveTab(items[0].name)
      }
    } else if (isOnMorePage) {
      setActiveTab('More')
    }
  }, [pathname, items, isOnMorePage])

  // Handle body scroll lock when mobile modal is open
  useEffect(() => {
    if (showMobileModal && isMobile) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [showMobileModal, isMobile])

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node
      if (menuRef.current && !menuRef.current.contains(target)) {
        setShowMobileModal(false)
      }
    }

    if (showMobileModal && isMobile) {
      document.addEventListener("mousedown", handleClickOutside as EventListener)
      document.addEventListener("touchstart", handleClickOutside as EventListener)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside as EventListener)
      document.removeEventListener("touchstart", handleClickOutside as EventListener)
    }
  }, [showMobileModal, isMobile])

  // Handle hover with delay to prevent glitching
  const handleMouseEnter = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    setShowMoreMenu(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    // Add delay before closing to allow mouse movement to dropdown
    hoverTimeoutRef.current = setTimeout(() => {
      setShowMoreMenu(false)
    }, 100) // 100ms delay
  }, [])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    setActiveTab(item.name)

    // Handle "More" menu click
    if (item.name === 'More') {
      e.preventDefault()
      if (isMobile) {
        // Open modal on mobile
        setShowMobileModal(true)
      }
      // Desktop uses hover, so do nothing
      return
    }

    // Only prevent default and scroll if URL is a hash (section link)
    if (item.url.startsWith('#') && item.url.length > 1) {
      e.preventDefault()
      const targetId = item.url.substring(1)
      const targetElement = document.getElementById(targetId)
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    }
    // For regular URLs (like /under-construction), let Next.js handle navigation normally
  }

  const handleMenuItemClick = () => {
    setShowMobileModal(false)
    setShowMoreMenu(false)
  }

  return (
    <>
      {/* Mobile Modal Backdrop */}
      <AnimatePresence>
        {showMobileModal && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9998]"
            onClick={() => setShowMobileModal(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Modal Content */}
      <AnimatePresence>
        {showMobileModal && isMobile && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 bottom-24 z-[9999] max-h-[70vh] overflow-y-auto"
          >
            <div className="bg-black/95 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-white text-xl font-semibold">More</h2>
                <button
                  onClick={() => setShowMobileModal(false)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <X size={18} className="text-white" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-4 space-y-3">
                {/* Guestbook Card */}
                <Link
                  href="/under-construction"
                  onClick={handleMenuItemClick}
                  className="group relative block rounded-2xl overflow-hidden h-40"
                >
                  <Image
                    src="/guestbook.png"
                    alt="Guestbook"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white font-serif text-xl font-bold mb-1">Guestbook</h3>
                    <p className="text-white/70 text-sm">Let me know you were here</p>
                  </div>
                </Link>

                {/* Bucket List Card */}
                <Link
                  href="/bucket-list"
                  onClick={handleMenuItemClick}
                  className="group relative block rounded-2xl overflow-hidden h-40"
                >
                  <Image
                    src="/bucket-list.png"
                    alt="Bucket List"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white font-serif text-xl font-bold mb-1">Bucket List</h3>
                    <p className="text-white/70 text-sm">Things to do at least once in my life</p>
                  </div>
                </Link>

                {/* Links Card */}
                <Link
                  href="/links"
                  onClick={handleMenuItemClick}
                  className="group relative block rounded-2xl bg-zinc-900/80 border border-white/10 p-5 hover:border-white/30 hover:bg-zinc-800/80 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <LinkIcon size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-base mb-1">Links</h4>
                      <p className="text-white/60 text-sm">All my links are here</p>
                    </div>
                  </div>
                </Link>

                {/* Uses Card */}
                <Link
                  href="/uses"
                  onClick={handleMenuItemClick}
                  className="group relative block rounded-2xl bg-zinc-900/80 border border-white/10 p-5 hover:border-white/30 hover:bg-zinc-800/80 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <ImageIcon size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-base mb-1">Uses</h4>
                      <p className="text-white/60 text-sm">A peek into my digital workspace</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <div
        className={cn(
          "fixed bottom-6 sm:top-6 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none",
          className,
        )}
      >
        <div className="flex items-center gap-3 bg-background/5 border border-border backdrop-blur-lg py-1.5 px-1.5 rounded-full shadow-lg pointer-events-auto">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name
            const isMoreMenu = item.name === 'More'

            return (
              <div 
                key={item.name}
                className="relative"
                onMouseEnter={() => !isMobile && isMoreMenu && handleMouseEnter()}
                onMouseLeave={() => !isMobile && isMoreMenu && handleMouseLeave()}
              >
                <Link
                  href={item.url}
                  onClick={(e) => handleNavClick(e, item)}
                  className={cn(
                    "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors flex items-center gap-1",
                    "text-foreground/80 hover:text-primary",
                    isActive && "bg-muted text-primary",
                  )}
                >
                  <span className="hidden md:inline relative z-10">{item.name}</span>
                  <span className="md:hidden relative z-10">
                    <Icon size={18} strokeWidth={2.5} />
                  </span>
                  {isMoreMenu && (
                    <ChevronDown size={16} className="hidden md:inline" />
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="lamp"
                      className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                        <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                        <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                        <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                      </div>
                    </motion.div>
                  )}
                </Link>

                {/* Dropdown Menu for More (Desktop Only) */}
                {isMoreMenu && !isMobile && (
                  <AnimatePresence>
                    {showMoreMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-[780px] bg-black/95 backdrop-blur-xl rounded-3xl border border-white/10 p-4 shadow-2xl"
                      >
                        <div className="grid grid-cols-3 gap-3">
                          {/* Column 1 - Guestbook */}
                          <Link
                            href="/under-construction"
                            onClick={handleMenuItemClick}
                            className="group relative block rounded-2xl overflow-hidden h-52 hover:scale-[1.02] transition-transform"
                          >
                            <Image
                              src="/guestbook.png"
                              alt="Guestbook"
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                            <div className="absolute bottom-6 left-6">
                              <h3 className="text-white font-serif text-2xl font-bold mb-2">Guestbook</h3>
                              <p className="text-white/70 text-sm">Let me know you were here</p>
                            </div>
                          </Link>

                          {/* Column 2 - Bucket List */}
                          <Link
                            href="/bucket-list"
                            onClick={handleMenuItemClick}
                            className="group relative block rounded-2xl overflow-hidden h-52 hover:scale-[1.02] transition-transform"
                          >
                            <Image
                              src="/bucket-list.png"
                              alt="Bucket List"
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                            <div className="absolute bottom-6 left-6">
                              <h3 className="text-white font-serif text-2xl font-bold mb-2">Bucket List</h3>
                              <p className="text-white/70 text-sm">Things to do at least once in my life</p>
                            </div>
                          </Link>

                          {/* Column 3 - Links and Uses stacked */}
                          <div className="space-y-3">
                            {/* Links Card */}
                            <Link
                              href="/links"
                              onClick={handleMenuItemClick}
                              className="group relative block rounded-2xl bg-zinc-900/80 border border-white/10 p-5 hover:border-white/30 hover:bg-zinc-800/80 transition-all"
                            >
                              <div className="flex items-start gap-4">
                                <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                                  <LinkIcon size={22} className="text-white" />
                                </div>
                                <div>
                                  <h4 className="text-white font-semibold text-base mb-1.5">Links</h4>
                                  <p className="text-white/60 text-xs leading-relaxed">All my links are here</p>
                                </div>
                              </div>
                            </Link>

                            {/* Uses Card */}
                            <Link
                              href="/uses"
                              onClick={handleMenuItemClick}
                              className="group relative block rounded-2xl bg-zinc-900/80 border border-white/10 p-5 hover:border-white/30 hover:bg-zinc-800/80 transition-all"
                            >
                              <div className="flex items-start gap-4">
                                <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                                  <ImageIcon size={22} className="text-white" />
                                </div>
                                <div>
                                  <h4 className="text-white font-semibold text-base mb-1.5">Uses</h4>
                                  <p className="text-white/60 text-xs leading-relaxed">A peek into my digital workspace</p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
