import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({
    title,
    description,
    keywords,
    image = "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1758999063/MAIN_rns2jm.jpg",
    url = "https://thepainteddream.in",
    type = "website",
    pageType = "General",
    productData = null
}) => {
    const siteTitle = title && title !== "Home" ? `${title} | The Painted Dream` : "The Painted Dream";
    const metaDescription = description || "Discover exquisite handcrafted gifts, mandala art, scented candles, and custom frames meticulously created in Hyderabad, India.";
    const metaKeywords = keywords || "handcrafted gifts, mandala art, scented candles, custom frames, art Hyderabad, The Painted Dream, local artists Hyderabad";

    // Base Website Schema
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "The Painted Dream",
        "url": "https://thepainteddream.in/",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://thepainteddream.in/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    // LocalBusiness GEO Schema (Targeting Hyderabad)
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "The Painted Dream",
        "image": "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1758999063/MAIN_rns2jm.jpg",
        "url": "https://thepainteddream.in",
        "telephone": "+919603655683",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Hyderabad",
            "addressRegion": "Telangana",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 17.3850,
            "longitude": 78.4867
        },
        "priceRange": "₹₹",
        "currenciesAccepted": "INR",
        "description": "Premium handcrafted gifts, art, and custom frames created locally in Hyderabad."
    };

    const schemas = [websiteSchema, localBusinessSchema];

    if (productData) {
        const productSchema = {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": productData.name,
            "image": Array.isArray(productData.images) ? productData.images : [productData.image],
            "description": productData.details,
            "brand": {
                "@type": "Brand",
                "name": "The Painted Dream"
            },
            "offers": {
                "@type": "Offer",
                "url": url,
                "priceCurrency": "INR",
                "price": productData.price === "N/A" || productData.price === "  N/A" ? "" : productData.price.replace(/[^0-9.]/g, ""),
                "availability": "https://schema.org/InStock"
            }
        };
        schemas.push(productSchema);
    }

    return (
        <Helmet>
            {/* Standard Meta Tags */}
            <title>{siteTitle}</title>
            <link rel="icon" type="image/png" href="/logo.png" />
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />

            {/* Open Graph / Facebook / WhatsApp / Instagram */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta property="og:site_name" content="The Painted Dream" />
            <meta property="og:locale" content="en_IN" />

            {/* Twitter Cards */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={image} />

            {/* JSON-LD Schema Data */}
            <script type="application/ld+json">
                {JSON.stringify(schemas)}
            </script>
        </Helmet>
    );
};

export default SEO;
