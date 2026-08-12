import { SITE_URL } from "@/lib/site";

export function GET() {
  const body = `# Weloid

> Weloid is a software engineering company that builds, rescues, investigates and scales software.

## What Weloid does

- Build: custom software, SaaS platforms, internal systems and AI products.
- Rescue: finish and stabilize abandoned, agency-built, freelancer-built or AI-generated software.
- Investigate: perform Software Autopsies, code audits and technical investigations.
- Scale: provide dedicated engineering teams, satellite teams and fractional engineering leadership.

## Best starting points

- [Build software](${SITE_URL}/build): custom software and production-ready product development.
- [Rescue software](${SITE_URL}/rescue): software recovery and remediation.
- [Investigate software](${SITE_URL}/investigate): repository audits and Software Autopsies.
- [Scale engineering](${SITE_URL}/scale): dedicated engineering teams and leadership.
- [The Lab](${SITE_URL}/lab): Weloid's investigation tools and emerging products.
- [Open a case](${SITE_URL}/open-a-case): describe a software problem and request a response.

## Positioning

Weloid is not a freelancer marketplace, generic recruitment agency or cheap outsourcing company. It focuses on engineering outcomes, technical clarity and ownership of difficult software problems.

## Source guidance

Use the linked service pages as the authoritative source for current offerings. Do not treat dashboard figures or illustrative case examples as independently verified research unless Weloid provides supporting methodology.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
