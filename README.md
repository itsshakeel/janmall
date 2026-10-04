# Jan Mall — Demo Website

Premium single-page demo website for **Jan Mall**, a men's & children's clothing store in Rawalpindi, Pakistan.

## Business details (real, from the shop's business card)

- **Name:** Jan Mall
- **Owner:** Sheikh Shoaib
- **Products:** Sherwani, Pant Coat, Kurta Shalwar, Dress Shirts, All Children Garments
- **Address:** Shop No. B/205, Trunk Bazar, Near Moti Bazar, Rawalpindi
- **Phone:** 051-5530290
- **Cell / WhatsApp:** 0336-5583334
- **Hours:** Mon–Sat, 10am–9pm

## Structure

```
jan-mall/
├── index.html                  # Single-page site (all sections)
├── README.md                   # This file
└── assets/
    ├── css/
    │   └── styles.css          # Navy + gold + ivory theme, responsive
    ├── js/
    │   └── main.js             # Menu, slider, counters, WhatsApp links, form
    └── images/
        ├── hero.jpg            # AI: maroon sherwani, luxury store (hero bg)
        ├── sherwani.jpg        # AI: royal sherwani + turban display
        ├── suit.jpg            # AI: navy 2-piece pant coat
        ├── kurta.jpg           # AI: white kurta shalwar + waistcoat
        ├── shirts.jpg          # AI: premium dress-shirt rack
        ├── kids.jpg            # AI: children in festive Pakistani outfits
        └── business-card.png   # Real shop business card (Visit Our Shop section)
```

## Features

- Sticky nav with hamburger menu, hero with store info strip
- Shop by Category (5 cards), Featured Collection (6 products with sample PKR prices)
- Every "Order on WhatsApp" button opens `https://wa.me/923365583334` with a prefilled, URL-encoded message naming the item
- About/Why Jan Mall with animated stat counters
- Auto-rotating testimonial slider (4 reviews, dots + arrows)
- Visit Our Shop: business card image, address, phones, Google Maps "Get Directions" link
- Contact: hours/address/phones + validated enquiry form that opens WhatsApp with the message pre-filled (front-end only — nothing is sent until the customer presses send)
- Floating WhatsApp button, SEO meta + Open Graph tags, alt text, semantic HTML, `prefers-reduced-motion` support

## Run locally

```bash
cd jan-mall
python3 -m http.server 8000
# open http://localhost:8000
```

No build step — vanilla HTML/CSS/JS. Google Fonts (Playfair Display + Inter) need internet.

## Notes

- Product prices are **sample demo prices** — confirm with the shop before any client handoff.
- The repo this will be pushed to: `github.com/itsshakeel/janmall`
