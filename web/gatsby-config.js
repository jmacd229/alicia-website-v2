module.exports = {
    flags: { PRESERVE_WEBPACK_CACHE: true },
    siteMetadata: {
        title: `Alicia MacDougall`,
        description: `Naturopathic Medicine for Athletes: Naturopathic Medicine for Athletes: If your health isn’t in check, neither is your performance. Let’s work together to perfect your nutrition, sleep, stress, recovery, hydration, and anything else that you may have going on. Getting the basics down goes a long way, and I am a big believer in preventative health.`,
        author: `Jesse MacDougall`,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        {
            resolve: 'gatsby-plugin-webfonts',
            options: {
                fonts: {
                    google: [{
                        family: 'Source Sans Pro',
                        variants: [200, 300, 400, 700]
                    },
                    { family: 'Material Icons' },
                    { family: 'Dancing Script' },
                    {
                        family: 'Roboto Slab',
                        variants: [100, 200, 400, 900]
                    }
                    ]
                }
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                lang: 'en',
                name: `Alicia MacDougall`,
                description: `This website is for Alicia MacDougalll, a Naturopathic doctor, used to serve her clients with resources, contact information, and booking.`,
                short_name: `Alicia`,
                start_url: `/`,
                background_color: `#ecf0f1`,
                theme_color: `#55b8bb`,
                display: `minimal-ui`,
                icon: `src/images/alicia_logo_icon.svg`,
            },
        },
        {
            resolve: 'gatsby-source-sanity',
            options: {
                projectId: 'qfrilqbt',
                watchMode: true,
                dataset: 'production',
            },
        },
        `gatsby-plugin-sass`,
        { resolve: `gatsby-plugin-mailgo` },
        {
            resolve: `gatsby-plugin-scroll-reveal`
        },
        {
            resolve: `gatsby-plugin-google-gtag`,
            options: {
                trackingIds: ["G-ZZM4BTRZPE", "GTM-N84THGP"],
            }
        },
        `gatsby-plugin-image`,
        `gatsby-plugin-postcss`,
    ],
}