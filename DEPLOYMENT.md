# Deployment

The public site is deployed from `main` through `.github/workflows/pages.yml` to GitHub Pages. The Pages artifact deployment and the custom-domain health probe are treated as separate states: a successful artifact deployment is not represented as a healthy custom domain unless `https://menaevidencelab.org` serves the expected homepage and canonical state endpoints.

Canonical deployment checks include the release registry, institutional-state validation, `CNAME`, engagement registry, and homepage evidence statement.
