package com.javagas.api.utils;

/**
 * Represents various industry sectors a company might operate within.
 *
 * @since 0.2
 */
public enum Industry {
    /**
     * Technology Industry
     * <p>
     * Companies involved in software development, hardware manufacturing,
     * IT services, internet services, and telecommunications.
     * Examples: Google, Microsoft, Apple.
     * </p>
     *
     * @since 0.2
     */
    TECHNOLOGY,

    /**
     * Financial Industry.
     * <p>
     * Businesses providing financial services, including banking,
     * investment management, insurance, and real estate financing.
     * Examples: JPMorgan Chase, Berkshire Hathaway, Allianz.
     * </p>
     *
     * @since 0.2
     */
    FINANCE,

    /**
     * Healthcare Industry
     * <p>
     * Organizations involved in medical services, pharmaceuticals,
     * biotechnology, medical devices, and healthcare providers.
     * Examples: Johnson &#38; Johnson, Pfizer, UnitedHealth Group.
     * </p>
     *
     * @since 0.2
     */
    HEALTHCARE,

    /**
     * Manufacturing Industry
     * <p>
     * Companies that produce goods through industrial processes,including
     * automotive, electronics, heavy machinery, and consumer goods
     * production.
     * Examples: Toyota, Siemens, Samsung.
     * </p>
     *
     * @since 0.2
     */
    MANUFACTURING,

    /**
     * Retail Industry:
     * <p>
     * Businesses that sell goods directly to consumers, including
     * e-commerce, department stores, supermarkets, and specialty shops.
     * Examples: Amazon, Walmart, Zara.
     * </p>
     *
     * @since 0.2
     */
    RETAIL,

    /**
     * Energy Industry
     * <p>
     * Companies involved in the exploration, production, refining,
     * and distribution of energy resources (oil, gas, renewable energy).
     * Examples: ExxonMobil, Shell, NextEra Energy.
     * </p>
     *
     * @since 0.2
     */
    ENERGY,

    /**
     * Agriculture Industry
     * <p>
     * Businesses engaged in farming, livestock, crop production,
     * forestry, and fishing.
     * Examples: Archer Daniels Midland, Monsanto (now Bayer Crop Science).
     * </p>
     *
     * @since 0.2
     */
    AGRICULTURE,

    /**
     * Education Industry
     * <p>
     * Institutions and companies providing educational services,
     * including schools, universities, online learning platforms,
     * and educational publishing.
     * Examples: Pearson, Chegg, various universities.
     * </p>
     *
     * @since 0.2
     */
    EDUCATION,

    /**
     * Hospitality Industry
     * <p>
     * Businesses in the service industry focused on leisure and guest services,
     * including hotels, restaurants, tourism, and entertainment venues.
     * Examples: Marriott, McDonald's, Disney (Parks &#38; Resorts).
     * </p>
     *
     * @since 0.2
     */
    HOSPITALITY,

    /**
     * Transportation
     * <p>
     * Companies providing services for moving people or goods,
     * including airlines, shipping, logistics, and public transit.
     * Examples: FedEx, Delta Air Lines, Maersk.
     * </p>
     *
     * @since 0.2
     */
    TRANSPORTATION,

    /**
     * Construction
     * <p>
     * Businesses involved in building, infrastructure development,
     * engineering, and residential/commercial property development.
     * Examples: Bechtel, Vinci, Lennar.
     * </p>
     */
    CONSTRUCTION,

    /**
     * MediaAndEntertainment
     * <p>
     * Companies producing and distributing content,
     * including film, television, music, publishing, gaming, and broadcasting.
     * Examples: Netflix, Sony Music, The Walt Disney Company (Entertainment).
     * </p>
     */
    MEDIA_AND_ENTERTAINMENT,

    /**
     * GovernmentAndPublicSector
     * <p>
     * Governmental bodies and public services, including defense, public
     * administration, and non-profit organizations focused on public welfare.
     * Examples: Various government agencies, UNICEF, Red Cross.
     * </p>
     */
    GOVERNMENT_AND_PUBLIC_SECTOR,

    /**
     * Utilities
     * <p>
     * Companies providing essential public services like electricity,
     * gas, water, and waste management.
     * Examples: Duke Energy, Veolia, American Water Works Company.
     * </p>
     */
    UTILITIES,

    /**
     * Consulting
     * <p>
     * Firms offering expert advice and services to businesses
     * across various domains like management, IT, strategy, and HR.
     * Examples: McKinsey &#38; Company, Accenture, Deloitte.
     * </p>
     */
    CONSULTING,

    /**
     * RealEstate
     * <p>
     * Companies involved in the buying, selling, renting, and managing of
     * properties, including residential, commercial, and industrial.
     * Examples: CBRE, Prologis, Simon Property Group.
     * </p>
     */
    REAL_ESTATE;

    /**
     * Search in enum values to exactly occurrence.
     *
     * @param value A String to search in the Enum.
     * @return If Value Is in the Enum.
     */
    public static boolean exists(final String value) {
        try {
            Industry.valueOf(value.toUpperCase());
            return true;
        } catch (final IllegalArgumentException e) {
            return false;
        }
    }
}
