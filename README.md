# FDA Drug Search

A simple drug search application built with React, TypeScript, and Vite.

## Features

- Search for drugs by brand name
- Group results by various fields (brand name, route, manufacturer)
- Sort results by product number
- Display detailed drug information including:
  - Brand name
  - Generic name
  - Administration routes
  - Dosage form
  - Manufacturer information

## API Information

This application uses the FDA's (U.S. Food and Drug Administration) publicly available APIs:

### NDC Directory API
The National Drug Code Directory API provides comprehensive information about FDA-registered drug products.

- Base URL: `https://api.fda.gov/drug/ndc`
- Documentation: [FDA Open API Documentation](https://open.fda.gov/apis/drug/ndc/)
- Rate Limits: 240 requests per minute, per IP address
- No API key required for basic usage

Example endpoint:
```
https://api.fda.gov/drug/ndc.json?search=brand_name:"TYLENOL"&limit=10
```

### Search Parameters
- `search`: Search term with field specification (e.g., brand_name:"TYLENOL")
- `limit`: Number of results to return (default: 25)
- `.exact`: Suffix for exact matches (e.g., brand_name.exact:"TYLENOL")



## React + TypeScript + Vite

To run this locally, download the repository and run
```
npm i
npm run dev
```
