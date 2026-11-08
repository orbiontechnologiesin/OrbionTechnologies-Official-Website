"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useReducedMotion, type MotionValue } from "framer-motion"
import { cn } from "@/lib/utils"

interface MagneticDockProps {
    /** Array of dock items */
    items: DockItemData[]
    /** Size of icons in pixels (for icon mode) */
    iconSize?: number
    /** Maximum scale on hover */
    maxScale?: number
    /** Distance of magnetic effect in pixels */
    magneticDistance?: number
    /** Show labels on hover */
    showLabels?: boolean
    /** Dock position */
    position?: "bottom" | "top" | "left" | "right"
    /** Background style */
    variant?: "glass" | "solid" | "transparent" | "text"
    /** Custom class name */
    className?: string
    /** Enable text-based navigation mode (no buttons, no icon boxes) */
    textMode?: boolean
}

interface DockItemData {
    /** Unique identifier */
    id: string
    /** Display label */
    label: string
    /** Icon component or image URL (optional in textMode) */
    icon?: React.ReactNode
    /** Target navigation link (optional) */
    href?: string
    /** Click handler */
    onClick?: () => void
    /** Whether item is active */
    isActive?: boolean
    /** Badge count */
    badge?: number
}

interface DockItemProps {
    item: DockItemData
    mouseX: MotionValue<number>
    iconSize: number
    maxScale: number
    magneticDistance: number
    showLabels: boolean
    isVertical: boolean
    reducedMotion: boolean
    textMode?: boolean
}

function DockItem({
    item,
    mouseX,
    iconSize,
    maxScale,
    magneticDistance,
    showLabels,
    isVertical,
    reducedMotion,
    textMode = false,
}: DockItemProps) {
    const buttonRef = React.useRef<HTMLButtonElement>(null)
    const anchorRef = React.useRef<HTMLAnchorElement>(null)
    const activeRef = item.href ? anchorRef : buttonRef

    const [isHovered, setIsHovered] = React.useState(false)
    const [isFocused, setIsFocused] = React.useState(false)
    const showLabel = showLabels && (isHovered || isFocused)

    // Calculate distance from mouse to center of item
    const distance = useTransform(mouseX, (val: number) => {
        if (!activeRef.current || val === Infinity) return magneticDistance + 1
        const rect = activeRef.current.getBoundingClientRect()
        const center = isVertical
            ? rect.top + rect.height / 2
            : rect.left + rect.width / 2
        return val - center
    })

    // Scale based on distance - closer = larger
    const scale = useTransform(distance, [-magneticDistance, 0, magneticDistance], [1, maxScale, 1])

    // Apply spring physics for smooth animation
    const springConfig = { damping: 22, stiffness: 320, mass: 0.4 }
    const smoothScale = useSpring(scale, springConfig)

    // Floating effect (subtle upward float)
    const y = useTransform(smoothScale, (s) => (s - 1) * -6)
    const smoothY = useSpring(y, springConfig)

    // Calculate size for icon-based dock (unconditional hook)
    const size = useTransform(smoothScale, (s) => s * iconSize)

    // If textMode is active, render purely elegant typography with magnetic scale and float
    if (textMode) {
        const textMotionProps = {
            onMouseEnter: () => setIsHovered(true),
            onMouseLeave: () => setIsHovered(false),
            onFocus: () => setIsFocused(true),
            onBlur: () => setIsFocused(false),
            className: cn(
                "relative inline-flex items-center justify-center px-3.5 py-1.5 text-sm font-medium",
                "text-graphite/80 hover:text-petrol focus:outline-none focus-visible:ring-2 focus-visible:ring-petrol/40",
                "transition-colors duration-150 select-none cursor-pointer whitespace-nowrap",
                item.isActive && "text-petrol font-semibold"
            ),
            style: {
                scale: reducedMotion ? 1 : smoothScale,
                y: reducedMotion || isVertical ? 0 : smoothY,
                x: reducedMotion || !isVertical ? 0 : smoothY,
                transformOrigin: "center center",
            },
        }

        if (item.href) {
            return (
                <motion.a
                    ref={anchorRef}
                    href={item.href}
                    aria-label={item.label}
                    aria-current={item.isActive ? "page" : undefined}
                    onClick={item.onClick}
                    {...textMotionProps}
                >
                    <span className="relative z-10">{item.label}</span>
                    {item.isActive && (
                        <motion.span
                            layoutId="active-nav-dot"
                            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-copper"
                        />
                    )}
                </motion.a>
            )
        }

        return (
            <motion.button
                ref={buttonRef}
                type="button"
                aria-label={item.label}
                aria-current={item.isActive ? "page" : undefined}
                onClick={item.onClick}
                {...textMotionProps}
            >
                <span className="relative z-10">{item.label}</span>
                {item.isActive && (
                    <motion.span
                        layoutId="active-nav-dot"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-copper"
                    />
                )}
            </motion.button>
        )
    }

    // Default icon-based dock item
    return (
        <motion.button
            ref={buttonRef}
            type="button"
            tabIndex={0}
            aria-label={item.label}
            aria-current={item.isActive ? "page" : undefined}
            onClick={item.onClick}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={cn(
                "relative flex items-center justify-center",
                "rounded-2xl transition-colors duration-200",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-white/50",
                item.isActive && "bg-neutral-200/50 dark:bg-white/10"
            )}
            style={{
                width: reducedMotion ? iconSize : size,
                height: reducedMotion ? iconSize : size,
                y: reducedMotion || isVertical ? 0 : smoothY,
                x: reducedMotion || !isVertical ? 0 : smoothY,
            }}
            whileTap={reducedMotion ? undefined : { scale: 0.9 }}
        >
            {/* Icon Container */}
            <motion.div
                className={cn(
                    "relative w-full h-full rounded-2xl overflow-hidden",
                    "bg-gradient-to-b from-neutral-100 to-neutral-50",
                    "dark:from-neutral-800 dark:to-neutral-900",
                    "backdrop-blur-sm",
                    "border border-neutral-300 dark:border-neutral-700",
                    "shadow-lg shadow-black/10 dark:shadow-black/30",
                    "flex items-center justify-center",
                    "transition-colors duration-200"
                )}
                style={{
                    boxShadow: isHovered
                        ? "0 8px 32px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.5)"
                        : "0 4px 12px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.3)",
                }}
            >
                {/* Icon */}
                <div aria-hidden="true" className="w-[60%] h-[60%] flex items-center justify-center text-neutral-700 dark:text-white">
                    {item.icon}
                </div>

                {/* Shine effect */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 50%, transparent 100%)",
                        opacity: isHovered ? 0.9 : 0.5,
                    }}
                />
            </motion.div>

            {/* Badge */}
            <AnimatePresence initial={false}>
                {item.badge !== undefined && item.badge > 0 && (
                    <motion.div
                        initial={reducedMotion ? false : { scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={reducedMotion ? { opacity: 0 } : { scale: 0, opacity: 0 }}
                        className={cn(
                            "absolute -top-1 -right-1",
                            "min-w-[20px] h-5 px-1.5",
                            "rounded-full",
                            "bg-red-500",
                            "text-white text-xs font-semibold",
                            "flex items-center justify-center",
                            "border-2 border-white dark:border-neutral-950",
                            "shadow-lg"
                        )}
                    >
                        {item.badge > 99 ? "99+" : item.badge}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Active Indicator */}
            <AnimatePresence initial={false}>
                {item.isActive && (
                    <motion.div
                        initial={reducedMotion ? false : { scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={reducedMotion ? { opacity: 0 } : { scale: 0, opacity: 0 }}
                        className={cn(
                            "absolute -bottom-2",
                            "w-1.5 h-1.5 rounded-full",
                            "bg-neutral-600 dark:bg-white/80"
                        )}
                    />
                )}
            </AnimatePresence>

            {/* Tooltip */}
            <AnimatePresence initial={false}>
                {showLabel && (
                    <motion.div
                        aria-hidden="true"
                        initial={reducedMotion ? false : { opacity: 0, y: 8, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={reducedMotion ? { opacity: 0 } : { scale: 0, opacity: 0 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className={cn(
                            "absolute -top-10 left-1/2 -translate-x-1/2",
                            "px-3 py-1.5 rounded-lg",
                            "bg-white dark:bg-neutral-900/95",
                            "backdrop-blur-sm",
                            "text-neutral-800 dark:text-white text-sm font-medium whitespace-nowrap",
                            "border border-neutral-200 dark:border-white/10",
                            "shadow-xl shadow-black/10 dark:shadow-black/20",
                            "pointer-events-none z-50"
                        )}
                    >
                        {item.label}
                        <div
                            className={cn(
                                "absolute left-1/2 -translate-x-1/2 -bottom-1",
                                "w-2 h-2 rotate-45",
                                "bg-white dark:bg-neutral-900/95",
                                "border-r border-b border-neutral-200 dark:border-white/10"
                            )}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hover glow */}
            <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                animate={{
                    boxShadow: isHovered
                        ? "0 0 30px rgba(255,255,255,0.15)"
                        : "0 0 0px rgba(255,255,255,0)",
                }}
                transition={{ duration: 0.3 }}
            />
        </motion.button>
    )
}

function MagneticDock({
    items,
    iconSize = 56,
    maxScale = 1.18,
    magneticDistance = 120,
    showLabels = true,
    position = "bottom",
    variant = "transparent",
    className,
    textMode = false,
}: MagneticDockProps) {
    const mousePosition = useMotionValue(Infinity)
    const reducedMotion = useReducedMotion() ?? false
    const isVertical = position === "left" || position === "right"

    const handleMouseMove = React.useCallback(
        (e: React.MouseEvent) => {
            if (isVertical) {
                mousePosition.set(e.clientY)
            } else {
                mousePosition.set(e.clientX)
            }
        },
        [mousePosition, isVertical]
    )

    const handleMouseLeave = () => {
        mousePosition.set(Infinity)
    }

    const variantStyles = {
        glass: cn(
            "bg-white/80 dark:bg-neutral-900/80",
            "backdrop-blur-xl backdrop-saturate-150",
            "border border-neutral-200 dark:border-neutral-700"
        ),
        solid: cn(
            "bg-neutral-100 dark:bg-neutral-900",
            "border border-neutral-300 dark:border-neutral-700"
        ),
        transparent: "bg-transparent border-0 shadow-none",
        text: "bg-transparent border-0 shadow-none p-0",
    }

    const positionStyles = {
        bottom: "flex-row",
        top: "flex-row",
        left: "flex-col",
        right: "flex-col",
    }

    return (
        <motion.nav
            aria-label="Magnetic Navigation"
            onMouseMove={reducedMotion ? undefined : handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "inline-flex items-center",
                textMode ? "gap-1 lg:gap-2.5 p-0" : "gap-2 p-3 rounded-3xl shadow-xl shadow-black/10 dark:shadow-black/30",
                variantStyles[variant],
                positionStyles[position],
                className
            )}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            {items.map((item) => (
                <DockItem
                    key={item.id}
                    item={item}
                    mouseX={mousePosition}
                    iconSize={iconSize}
                    maxScale={maxScale}
                    magneticDistance={magneticDistance}
                    showLabels={showLabels}
                    isVertical={isVertical}
                    reducedMotion={reducedMotion}
                    textMode={textMode}
                />
            ))}
        </motion.nav>
    )
}

export {
    MagneticDock,
    type MagneticDockProps,
    type DockItemData,
}
