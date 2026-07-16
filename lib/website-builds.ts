export type WebsiteBuild = {
  name: string
  url: string
  image: string
  description: string
  tags: string[]
}

export const websiteBuilds: WebsiteBuild[] = [
  {
    name: "Mineralife B2B",
    url: "https://mineralife-frontend.vercel.app/",
    image: "/website-builds/mineralife-b2b.jpg",
    description: "Headless WordPress + React rebuild for B2B service repositioning, lead capture, and CRM handoff.",
    tags: ["Next.js", "Headless WP"],
  },
  {
    name: "Domy Nova",
    url: "https://domynova.com/",
    image: "/website-builds/domy-nova.jpg",
    description: "Developer brand umbrella for residential projects near Kraków.",
    tags: ["WordPress", "Real estate"],
  },
  {
    name: "Zemvelo",
    url: "https://zemvelo.com/",
    image: "/website-builds/zemvelo.jpg",
    description: "Ecommerce storefront for liquid vitamins and mineral supplements.",
    tags: ["WooCommerce", "Ecommerce"],
  },
  {
    name: "CAPS Fieldhouse",
    url: "https://capsfieldhouse.com/",
    image: "/website-builds/caps-fieldhouse.jpg",
    description: "Indoor sports facility site — leagues, rentals, schedules, and programs.",
    tags: ["WordPress", "Facility"],
  },
]