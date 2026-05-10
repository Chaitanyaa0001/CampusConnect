"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Wrapper component for select functionality
interface SelectRootProps {
  value: string
  onValueChange: (value: string) => void
  children: React.ReactNode
}

const SelectRoot = ({ value, onValueChange, children }: SelectRootProps) => {
  return (
    <div data-select-root="">
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { value, onValueChange } as any)
          : child
      )}
    </div>
  )
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  onValueChange?: (value: string) => void
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, onValueChange, onChange, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      onChange={(e) => {
        onValueChange?.(e.target.value)
        onChange?.(e)
      }}
      {...props}
    />
  )
)
Select.displayName = "Select"

interface SelectTriggerProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  onValueChange?: (value: string) => void
}

const SelectTrigger = React.forwardRef<HTMLSelectElement, SelectTriggerProps>(
  ({ className, onValueChange, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      onChange={(e) => onValueChange?.(e.target.value)}
      {...props}
    />
  )
)
SelectTrigger.displayName = "SelectTrigger"

interface SelectValueProps {
  placeholder?: string
}

const SelectValue = ({ placeholder }: SelectValueProps) => (
  <span>{placeholder || "Select an option"}</span>
)
SelectValue.displayName = "SelectValue"

interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  (props, ref) => <div ref={ref} {...props} />
)
SelectContent.displayName = "SelectContent"

interface SelectItemProps extends React.OptionHTMLAttributes<HTMLOptionElement> {}

const SelectItem = React.forwardRef<HTMLOptionElement, SelectItemProps>(
  (props, ref) => <option ref={ref} {...props} />
)
SelectItem.displayName = "SelectItem"

export {
  SelectRoot,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
}
