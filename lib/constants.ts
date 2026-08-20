const appUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://weloid.com").replace(
  /\/+$/,
  ""
);

const CONSTANTS = {
  appUrl,
  appName: "Weloid",
  fullName: "Weloid",
  slogan: "Forensic Software Engineering",
  description:
    "Every broken system has a story. We find it. Then we rewrite the ending. Weloid builds, rescues and investigates software.",
  email: "hello@example.com",
  socials: [
    {
      name: "LinkedIn",
      handle: "/company/weloid",
      url: "https://www.linkedin.com/company/weloid",
    },
    {
      name: "X",
      handle: "@weloid",
      url: "https://x.com/weloid",
    },
    {
      name: "Instagram",
      handle: "@weloid",
      url: "https://www.instagram.com/weloid",
    },
    {
      name: "GitHub",
      handle: "/weloid",
      url: "https://github.com/weloid",
    },
  ],
  navigation: {
    left: [
      { href: "/build", label: "BUILD", page: "build" },
      { href: "/rescue", label: "RESCUE", page: "rescue" },
      { href: "/investigate", label: "INVESTIGATE", page: "investigate" },
    ],
    right: [
      { href: "/scale", label: "SCALE", page: "scale" },
      { href: "/lab", label: "THE LAB", page: "lab" },
      { href: "/contact", label: "CONTACT", page: "contact" },
    ],
  },
} as const;

export default CONSTANTS;
