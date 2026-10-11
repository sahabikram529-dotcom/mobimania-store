# Mobi Mania — Second-hand Mobile Shop Website

A responsive static website made with HTML, CSS and JavaScript for GitHub Pages.

## Files
- `index.html` — website layout, styles, product data and interactions.
- `README.md` — setup notes.
- `assets/` — create this folder in your repository for your shop logo, phone photos and offer video.

## Publish with GitHub Pages
1. Upload `index.html` and `README.md` to the root of your GitHub repository.
2. Upload your image/video assets while preserving the paths used in `index.html`.
3. Open **Settings → Pages**.
4. Choose **Deploy from a branch**, select `main` and `/(root)`, then save.

## Set your shop logo
At the top of the JavaScript section in `index.html`, find:

```js
const SHOP_LOGO_PATH = 'assets/mobi-mania-logo.png';
```

Upload your logo to `assets/mobi-mania-logo.png`, or change the path to your own filename, for example `assets/logo.png`. The same logo is used in the header and footer. If the image path is missing, the built-in fallback logo remains visible.

## Set your shop location
Find this line in `index.html`:

```js
const SHOP_LOCATION_QUERY = 'MOBI MANIA, Sodepur Rd, Basunagar, Madhyamgram, Kolkata, West Bengal 700129 (Google Maps: https://maps.app.goo.gl/tF7FSJTJzyTsZ6V59)';
```

Replace the text with your exact shop address, area, or a Google Maps place URL. The embedded map and **Open in Google Maps** button use this setting. The current value is only a placeholder, not your verified shop location.

## Add phone photos and video
- Put phone images in `assets/phones/` and use their relative paths in the product objects inside `starterProducts` (for example `image: 'assets/phones/iphone-13.jpg'`).
- Put your offer video in `assets/` and update the video source logic / source in `index.html` to point to it.
- This site intentionally has no customer-facing admin upload form. Manage the files and product listings through GitHub.

## Phone login and OTP
The login/create-account interface now asks for a phone number and OTP only; email and password fields have been removed. **Actual SMS OTP is not enabled in a plain static HTML site.** To send and verify real OTPs, configure Firebase Authentication → Phone provider, add your GitHub Pages domain as an authorised domain, and connect the Firebase verification flow in `index.html`. Until that integration is added, the UI explains that OTP sending/verification is not active; it does not pretend to verify users.

## Important notes
- Product cards currently include sample listings and sample discounts. Replace them with your real stock before publishing.
- Cart and some preferences are stored in the visitor's browser; there is no shared database or admin backend in this static version.
- Advance booking and exchange enquiries open WhatsApp for **62905 20530**. Confirm availability and terms with the customer before taking any advance.


### Latest updates
- Shop location button points to the Google Maps link shared by Mobi Mania.
- Search mode shows matching phone cards only; other homepage sections and catalogue filters are hidden while searching.
- Exchange brand options include Nothing, Motorola, Tecno, Infinix and Redmi.
- Realme brand tile uses a yellow-and-black realme wordmark instead of a broken external logo image.
