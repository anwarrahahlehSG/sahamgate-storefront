import { cn } from "cn";
import Link from "next/link";

import { MenuLink } from "@/components/nav/menu-link";
import { Container } from "@/components/ui/container";
import { Sections } from "@/components/ui/sections";
import { shopConfig } from "@/lib/config";
import { formatPhoneNumber, getEmailUrl, getPhoneUrl, getWhatsAppUrl } from "@/lib/contact";
import type { MenuItem } from "@/lib/menu/types";
import { getShopPolicies } from "@/lib/policies/server";

import { SocialLinks } from "./social-links";
import type { SocialLink } from "./social-links";

export async function Footer() {
  const whatsappUrl = getWhatsAppUrl();
  const socialLinks = [
    ...Object.entries(shopConfig.brand.social).flatMap(([platform, url]) =>
      url ? [{ platform, url } as SocialLink] : [],
    ),
    ...(whatsappUrl ? [{ platform: "whatsapp", url: whatsappUrl } as const] : []),
  ];
  const items: MenuItem[] = [];
  const policies = await getShopPolicies({}).catch(() => []);
  return (
    <footer>
      {/* Bottom padding clears the fixed agent ActionBar pill and WhatsApp button when they render */}
      <Container
        className={cn(
          "pt-20 pb-10",
          shopConfig.agent.isEnabled && "pb-22",
          shopConfig.brand.whatsapp && "pb-24",
          shopConfig.brand.whatsapp && shopConfig.agent.isEnabled && "pb-38",
        )}
      >
        <Sections className="gap-10">
          {items.length > 0 && <FooterMenu items={items} />}
          <FooterContact />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:justify-start">
              <p className="text-sm text-muted-foreground leading-5">
                {`© ${shopConfig.site.name}. All rights reserved.`}
              </p>
              {policies.map((policy) => (
                <Link
                  key={policy.handle}
                  href={`/policies/${policy.handle}`}
                  className="cursor-pointer text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {policy.title}
                </Link>
              ))}
            </div>
            {socialLinks.length > 0 && <SocialLinks links={socialLinks} />}
          </div>
        </Sections>
      </Container>
    </footer>
  );
}

function FooterContact() {
  const { phone, supportEmail, whatsapp } = shopConfig.brand;
  const links = [
    whatsapp && { href: getWhatsAppUrl(), label: "WhatsApp", value: formatPhoneNumber(whatsapp) },
    phone && { href: getPhoneUrl(), label: "Call", value: formatPhoneNumber(phone) },
    supportEmail && { href: getEmailUrl(), label: "Email", value: supportEmail },
  ].filter((link) => !!link && !!link.href) as Array<{
    href: string;
    label: string;
    value: string;
  }>;

  if (links.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold">Contact us</h3>
      <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-8">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              {...(link.href.startsWith("https:")
                ? { rel: "noopener noreferrer", target: "_blank" }
                : {})}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="font-medium text-foreground">{link.label}</span>{" "}
              <span dir="ltr">{link.value}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterMenu({ items }: { items: MenuItem[] }) {
  const columns = items.slice(0, 5);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10">
      {columns.map((column) => (
        <div key={column.id} className="space-y-3">
          {column.url ? (
            <MenuLink
              url={column.url}
              className="block text-sm font-semibold hover:opacity-70 transition-opacity"
            >
              {column.title}
            </MenuLink>
          ) : (
            <h3 className="text-sm font-semibold">{column.title}</h3>
          )}
          {column.items.length > 0 && (
            <ul className="space-y-2">
              {column.items.map((leaf) => (
                <li key={leaf.id}>
                  <MenuLink
                    url={leaf.url}
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {leaf.title}
                  </MenuLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
