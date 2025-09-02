# Standardized Font Size System

This document outlines the standardized font size system used throughout the LibSpace application.

## Font Size Hierarchy

### Headings
- **Main Header (H1)**: `text-3xl sm:text-4xl` - Used for the main application title
- **Section Header (H2)**: `text-2xl sm:text-3xl` - Used for floor names and major sections
- **Panel Header (H2)**: `text-xl` - Used for panel titles (Statistics, Quick Info, Best Times)
- **Subsection Header (H3)**: `text-base` - Used for subsections like "Occupancy Rate"

### Body Text
- **Primary Text**: `text-base` - Used for main descriptions and large text content
- **Secondary Text**: `text-sm` - Used for form inputs, panel content, and general information
- **Detail Text**: `text-xs` - Used for fine print, timestamps, and small details

### Interactive Elements
- **Button Text**: `text-sm` - Used for navigation buttons and interactive elements
- **Tooltip Text**: `text-xs` - Used for hover tooltips and overlays

### Specialized Elements
- **Statistical Values**: `text-xl` - Used for numbers in stat cards
- **Facility Letters**: `text-base sm:text-lg` - Used for facility markers in floor plans
- **Large Decorative Text**: `text-4xl sm:text-5xl` - Used for large background letters in seating areas

## Implementation Notes

### Responsive Design
- Most font sizes include responsive variants (e.g., `text-sm sm:text-base`)
- Mobile devices use smaller sizes, desktop uses larger sizes
- Breakpoint used: `sm:` (640px and up)

### Consistency Rules
1. All panel headers use `text-xl`
2. All body content uses `text-sm` or `text-base`
3. All detail information uses `text-xs`
4. Statistical numbers use `text-xl`
5. Interactive elements use `text-sm`

### Color Combinations
Font sizes are paired with appropriate text colors:
- Headers: `text-gray-900` (dark)
- Body text: `text-gray-600` or `text-gray-800`
- Detail text: `text-gray-500` (lighter)
- Interactive text: `text-gray-500` with hover states

This system ensures visual hierarchy, accessibility, and consistency across the entire application.
