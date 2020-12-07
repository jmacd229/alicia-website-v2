module.exports = {
    siteMetadata: {
        title: `Alicia MacDougall`,
        description: `A website for Alicia MacDougall, Naturopathic doctor.`,
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
            resolve: 'gatsby-plugin-google-fonts',
            options: {
                fonts: [
                    'material icons',
                    'dancing script',
                    'alfa slab one',
                ],
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
        `gatsby-plugin-sass`
    ],
}