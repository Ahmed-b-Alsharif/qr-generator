# Changeable QR (GitHub Pages version)

QR codes that point to a short redirect page on your GitHub Pages site. Where each code goes is stored in `links.json`, so you can change the destination anytime without reprinting.

- `index.html` - admin page (sign in with your GitHub token)
- `r.html` - the page every QR points to; it looks up the code and redirects
- `links.json` - your saved codes (name, link). The admin page edits this file for you.

The repo must be **public** and GitHub Pages must be turned on (Settings > Pages > Deploy from a branch > main / root).
