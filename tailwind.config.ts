// tailwind.config.js
const { fontFamily } = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
    default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
module.exports = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./styles/**/*.{css,scss}", // Include styles folder if needed
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            transitionDelay: {
                "custom-delay": "var(--delay)",
            },
            transitionDuration: {
                "custom-duration": "var(--duration)",
            },
            transitionTimingFunction: {
                "custom-ease": "var(--easing)",
            },
            colors: {
                warning: "hsl(var(--warning))",
                "warning-foreground":
                    "hsl(var(--warning-foreground))",
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground:
                        "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground:
                        "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground:
                        "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground:
                        "hsl(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground:
                        "hsl(var(--destructive-foreground))",
                },
                sidebar: {
                    DEFAULT:
                        "hsl(var(--sidebar-background))",
                    foreground:
                        "hsl(var(--sidebar-foreground))",
                    primary: "hsl(var(--sidebar-primary))",
                    "primary-foreground":
                        "hsl(var(--sidebar-primary-foreground))",
                    accent: "hsl(var(--sidebar-accent))",
                    "accent-foreground":
                        "hsl(var(--sidebar-accent-foreground))",
                    border: "hsl(var(--sidebar-border))",
                    ring: "hsl(var(--sidebar-ring))",
                },
            },
            fontFamily: {
                sans: [
                    "var(--font-sans)",
                    ...fontFamily.sans,
                    "var(--font-iran-sans)",
                ],
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: {
                        height: "var(--radix-accordion-content-height)",
                    },
                },
                "accordion-up": {
                    from: {
                        height: "var(--radix-accordion-content-height)",
                    },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down":
                    "accordion-down 0.2s ease-out",
                "accordion-up":
                    "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [
        addVariablesForColors,
        require("@tailwindcss/typography"),
        require("tailwindcss-animate"),
    ],
};
function addVariablesForColors({ addBase, theme }: any) {
    let allColors = flattenColorPalette(theme("colors"));
    let newVars = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [
            `--${key}`,
            val,
        ])
    );

    addBase({
        ":root": newVars,
    });
}
