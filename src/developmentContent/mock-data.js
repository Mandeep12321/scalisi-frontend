import { ReactSVG } from "react-svg";

let aboutUsHeroImage = "/assets/images/app-images/earth-image.png";

let blogCardImg = "/assets/images/cms-images/about-us-leed-section-image.png";
let BlogDetailHero = "/assets/images/dummy-images/blog.png";

let contactSecImage =
  "/assets/images/cms-images/about-us-leed-section-image.png";
let vendorMapImage = "/assets/images/cms-images/vendors-map.png";
let ProductPageHero = "/assets/images/cms-images/hero-section-bg-image.png";

export const ALL_PRODUCT_DATA = [
  {
    image: "/assets/images/dummy-images/product-two.png",
    title: "Artichokes 12ct Premium",
    productId: "200105",
    _id: 1,
    productVariant: [
      { type: "CASE", price: 30, value: "cases" },
      { type: "POUNDS", price: 40, value: "pounds" },
      { type: "GALLONS", price: 20, value: "gallons" },
    ],
  },
  {
    _id: 2,
    image: "/assets/images/dummy-images/product-three.png",
    title: "Avocados 48ct #2 Hass CALAVO",
    productId: "200185",
    productVariant: [
      { type: "CASE", price: 30, value: "cases" },
      { type: "POUNDS", price: 40, value: "pounds" },
      { type: "GALLONS", price: 20, value: "gallons" },
    ],
  },
  {
    _id: 3,
    image: "/assets/images/dummy-images/product-four.png",
    title: "Lettuce Arugula 2/1.5# B&W baby Lorem ipsum dolor si...",
    productId: "300000",
    productVariant: [
      { type: "CASE", price: 30, value: "cases" },
      { type: "POUNDS", price: 40, value: "pounds" },
      { type: "GALLONS", price: 20, value: "gallons" },
    ],
  },
  {
    _id: 4,
    image: "/assets/images/dummy-images/product-one.png",
    title: "Berries Blackberry PREMIUM 12/6oz",
    productId: "100400",
    productVariant: [
      { type: "CASE", price: 30, value: "cases" },
      { type: "POUNDS", price: 40, value: "pounds" },
      { type: "GALLONS", price: 20, value: "gallons" },
    ],
  },
  {
    _id: 5,
    image: "/assets/images/dummy-images/berries.png",
    title: "Berries Blueberry 12/6oz PREMIUM",
    productId: "100406",
    productVariant: [
      { type: "CASE", price: 30, value: "cases" },
      { type: "POUNDS", price: 40, value: "pounds" },
      { type: "GALLONS", price: 20, value: "gallons" },
    ],
  },
  {
    _id: 6,
    image: "/assets/images/dummy-images/lettuce.png",
    title: "Lettuce Arugula 2/1.5# B&W baby Lorem ipsum dolor sit amet",
    productId: "300009",
    productVariant: [
      { type: "CASE", price: 30, value: "cases" },
      { type: "POUNDS", price: 40, value: "pounds" },
      { type: "GALLONS", price: 20, value: "gallons" },
    ],
  },
  {
    _id: 7,
    image: "/assets/images/dummy-images/asparagus.png",
    title: "Asparagus PEACOCK XL/Jumbo CA 11",
    productId: "200151",
    productVariant: [
      { type: "CASE", price: 30, value: "cases" },
      { type: "POUNDS", price: 40, value: "pounds" },
      { type: "GALLONS", price: 20, value: "gallons" },
    ],
  },
  {
    _id: 8,
    image: "/assets/images/dummy-images/raspberry.png",
    title: "Berries Raspberry Driscoll 12/6oz",
    productId: "100425",
    productVariant: [
      { type: "CASE", price: 30, value: "cases" },
      { type: "POUNDS", price: 40, value: "pounds" },
      { type: "GALLONS", price: 20, value: "gallons" },
    ],
  },
];

export const PRODUCTS_PAGE_DATA = {
  heroSection: {
    title: "Browse Our Products",
    description:
      "We have over 400 fresh farm produce that can be delivered to you anytime you need. The finest Jack Scalisi wholesale fruit and produce has made the South Florida residents proud and satisfied over the past 30 years. View these quality products here, pick your brand, check out with it and we will deliver it to your company.",
    image: ProductPageHero,
  },

  announcement1: {
    htmlDescription: "<h3><strong>Visit Help &amp; Support</strong></h3>",
    image: "/assets/images/cms-images/support.png",
  },
  announcement2: {
    htmlDescription: "<h3><strong>Sign Up For Updates!</strong></h3>",
    image: "/assets/images/cms-images/update.png",
  },
};

export const PRODUCT_DETAIL_DATA = {
  productsDetail: {
    image: "/assets/images/dummy-images/product-one.png",
    title: "Artichokes 12ct Premium",
    productId: "200105",
    productVariant: [
      { type: "CASE", price: 30, value: "cases" },
      { type: "POUNDS", price: 40, value: "pounds" },
      { type: "GALLONS", price: 20, value: "gallons" },
    ],
  },

  products: [
    {
      image: "/assets/images/dummy-images/product-one.png",
      title: "Artichokes 12ct Premium",
      productId: "200105",
      productVariant: [
        { type: "Case", price: 30, value: "cases" },
        { type: "Pounds", price: 40, value: "pounds" },
        { type: "Gallons", price: 20, value: "gallons" },
      ],
    },
    {
      image: "/assets/images/dummy-images/product-two.png",
      title: "Avocados 48ct #2 Hass CALAVO",
      productId: "200185",
      productVariant: [
        { type: "Cases", price: 30, value: "cases" },
        { type: "Pounds", price: 40, value: "pounds" },
        { type: "Gallons", price: 20, value: "gallons" },
      ],
    },
    {
      image: "/assets/images/dummy-images/product-three.png",

      title: "Lettuce Arugula 2/1.5# B&W baby Lorem ipsum dolor si...",
      productId: "300000",
      productVariant: [
        { type: "Cases", price: 30, value: "cases" },
        { type: "Pounds", price: 40, value: "pounds" },
        { type: "Gallons", price: 20, value: "gallons" },
      ],
    },
    {
      image: "/assets/images/dummy-images/product-four.png",

      title: "Berries Blackberry PREMIUM 12/6oz",
      productId: "100400",
      productVariant: [
        { type: "Cases", price: 30, value: "cases" },
        { type: "Pounds", price: 40, value: "pounds" },
        { type: "Gallons", price: 20, value: "gallons" },
      ],
    },
    {
      image: "/assets/images/dummy-images/product-one.png",
      title: "Artichokes 12ct Premium",
      productId: "200105",
      productVariant: [
        { type: "Cases", price: 30, value: "cases" },
        { type: "Pounds", price: 40, value: "pounds" },
        { type: "Gallons", price: 20, value: "gallons" },
      ],
    },
    {
      image: "/assets/images/dummy-images/product-two.png",
      title: "Avocados 48ct #2 Hass CALAVO",
      productId: "200185",
      productVariant: [
        { type: "Cases", price: 30, value: "cases" },
        { type: "Pounds", price: 40, value: "pounds" },
        { type: "Gallons", price: 20, value: "gallons" },
      ],
    },
    {
      image: "/assets/images/dummy-images/product-three.png",

      title: "Lettuce Arugula 2/1.5# B&W baby Lorem ipsum dolor si...",
      productId: "300000",
      productVariant: [
        { type: "Cases", price: 30, value: "cases" },
        { type: "Pounds", price: 40, value: "pounds" },
        { type: "Gallons", price: 20, value: "gallons" },
      ],
    },
    {
      image: "/assets/images/dummy-images/product-four.png",

      title: "Berries Blackberry PREMIUM 12/6oz",
      productId: "100400",
      productVariant: [
        { type: "Cases", price: 30, value: "cases" },
        { type: "Pounds", price: 40, value: "pounds" },
        { type: "Gallons", price: 20, value: "gallons" },
      ],
    },
  ],
  announcement1: {
    htmlDescription: "<h3><strong>Visit Help &amp; Support</strong></h3>",
    image: "/assets/images/cms-images/support.png",
  },
  announcement2: {
    htmlDescription: "<h3><strong>Sign Up For Updates!</strong></h3>",
    image: "/assets/images/cms-images/update.png",
  },
};

export const MY_ORDERS_CMS_DATA = {
  announcement1: {
    htmlDescription: "<h3><strong>Visit Help &amp; Support</strong></h3>",
    image: "/assets/images/cms-images/support.png",
  },
  announcement2: {
    htmlDescription: "<h3><strong>Sign Up For Updates!</strong></h3>",
    image: "/assets/images/cms-images/update.png",
  },
  heroSection: {
    title: "My Order",
    description: "Review your current order.",
  },
};
export const MY_ORDER_PAGE_DATA = {
  date: "11/10/2024",
  subTotal: "$66.50",
  quantity: 15,
  totalAmount: 30,
  productData: [
    {
      id: 1,
      title: "Lettuce Arugula 2/1.5# B&W baby Lorem ipsum dolor sit amet",
      variant: "Case",
      image: "/assets/images/app-images/blogCard.png",
      productId: 300000,
      price: 22.2,
    },
    {
      id: 1,
      title: "Lettuce Arugula 2/1.5# B&W baby Lorem ipsum dolor sit amet",
      variant: "Case",
      image: "/assets/images/app-images/blogCard.png",
      productId: 300000,
      price: 22.2,
    },
    {
      id: 1,
      title: "Lettuce Arugula 2/1.5# B&W baby Lorem ipsum dolor sit amet",
      variant: "Case",
      image: "/assets/images/app-images/blogCard.png",
      productId: 300000,
      price: 22.2,
    },
    {
      id: 1,
      title: "Lettuce Arugula 2/1.5# B&W baby Lorem ipsum dolor sit amet",
      variant: "Case",
      image: "/assets/images/app-images/blogCard.png",
      productId: 300000,
      price: 22.2,
    },
    {
      id: 1,
      title: "Lettuce Arugula 2/1.5# B&W baby Lorem ipsum dolor sit amet",
      variant: "Case",
      image: "/assets/images/app-images/blogCard.png",
      productId: 300000,
      price: 22.2,
    },
  ],
};

export const HOME_PAGE_DATA = {
  heroSection: [
    {
      title: "Let's celebrate Mom!",
      description:
        "Browse our Mother's day collection, including exotic produce and a wide array of flowers!",
      image: "/assets/images/app-images/homebg.png",
      Label: "Browse Collection",
    },
    {
      title: "Let's celebrate Mom!",
      description:
        "Browse our Mother's day collection, including exotic produce and a wide array of flowers!",
      image: "/assets/images/app-images/homebg.png",
      Label: "Browse Collection",
    },
    {
      title: "Let's celebrate Mom!",
      description:
        "Browse our Mother's day collection, including exotic produce and a wide array of flowers!",
      image: "/assets/images/app-images/homebg.png",
      Label: "Browse Collection",
    },
  ],
  homeCards: [
    {
      title: "Produce Catalog",
      image: "/assets/images/dummy-images/img1.png",
    },
    {
      title: "Order Guide",
      image: "/assets/images/dummy-images/img2.png",
    },
    {
      title: "News & Updates",
      image: "/assets/images/dummy-images/img3.png",
    },
  ],
  products: [
    {
      image: "/assets/images/dummy-images/product-one.png",
      title: "Artichokes 12ct Premium",
      productId: "200105",
      productVariant: [
        { type: "Cases", price: 30 },
        { type: "Pounds", price: 40 },
        { type: "Gallons", price: 20 },
      ],
    },
    {
      image: "/assets/images/dummy-images/product-two.png",
      title: "Avocados 48ct #2 Hass CALAVO",
      productId: "200185",
      productVariant: [
        { case: "Hass", price: 30 },
        { case: "Fuerte", price: 30 },
      ],
    },
    {
      image: "/assets/images/dummy-images/product-three.png",

      title: "Lettuce Arugula 2/1.5# B&W baby Lorem ipsum dolor si...",
      productId: "300000",
      productVariant: [
        { case: "Wild Arugula", price: 30 },
        { case: "Fuerte", price: 30 },
      ],
    },
    {
      image: "/assets/images/dummy-images/product-four.png",

      title: "Berries Blackberry PREMIUM 12/6oz",
      productId: "100400",
      productVariant: [
        { case: "Hass", price: 30 },
        { case: "Fuerte", price: 30 },
      ],
    },
    {
      image: "/assets/images/dummy-images/product-one.png",
      title: "Artichokes 12ct Premium",
      productId: "200105",
      productVariant: [
        { type: "Cases", price: 30 },
        { type: "Pounds", price: 40 },
        { type: "Gallons", price: 20 },
      ],
    },
    {
      image: "/assets/images/dummy-images/product-two.png",
      title: "Avocados 48ct #2 Hass CALAVO",
      productId: "200185",
      productVariant: [
        { case: "Hass", price: 30 },
        { case: "Fuerte", price: 30 },
      ],
    },
    {
      image: "/assets/images/dummy-images/product-three.png",

      title: "Lettuce Arugula 2/1.5# B&W baby Lorem ipsum dolor si...",
      productId: "300000",
      productVariant: [
        { case: "Wild Arugula", price: 30 },
        { case: "Fuerte", price: 30 },
      ],
    },
    {
      image: "/assets/images/dummy-images/product-four.png",

      title: "Berries Blackberry PREMIUM 12/6oz",
      productId: "100400",
      productVariant: [
        { case: "Hass", price: 30 },
        { case: "Fuerte", price: 30 },
      ],
    },
  ],
  announcement1: {
    htmlDescription: "<h3><strong>Visit Help &amp; Support</strong></h3>",
    image: "/assets/images/cms-images/support.png",
  },
  announcement2: {
    htmlDescription: "<h3><strong>Sign Up For Updates!</strong></h3>",
    image: "/assets/images/cms-images/update.png",
  },
};

export const CATALOG_DATA = {
  heroSection: {
    title: "Browse Our Catalogs",
    description:
      "Produce catalogs that are relevant right now in the produce market.",
    image: "/assets/images/cms-images/hero-section-catalog-bg.png",
  },

  catalogCards: [
    {
      title: "Catalog N°1 ",
      image: "/assets/images/dummy-images/catalog-one.png",
    },
    {
      title: "Catalog N°1 ",
      image: "/assets/images/dummy-images/catalog-two.png",
    },
    {
      title: "Catalog N°1 ",

      image: "/assets/images/dummy-images/catalog-three.png",
    },
    {
      title: "Catalog N°1 ",
      image: "/assets/images/dummy-images/catalog-three.png",
    },
    {
      title: "Catalog N°1 ",
      image: "/assets/images/dummy-images/catalog-one.png",
    },
    {
      title: "Catalog N°1 ",

      image: "/assets/images/dummy-images/catalog-two.png",
    },
  ],

  announcement1: {
    htmlDescription: "<h3><strong>Visit Help &amp; Support</strong></h3>",
    image: "/assets/images/cms-images/support.png",
  },
  announcement2: {
    htmlDescription: "<h3><strong>Sign Up For Updates!</strong></h3>",
    image: "/assets/images/cms-images/update.png",
  },
};

export const ABOUT_US_PAGE_DATA = {
  heroSection: {
    title: "About Us",
    description:
      "Our relationships with both national and international vendor partners ensures delivery of the finest quality produce and products.",
    heading: `<p>Jack Scalisi Wholesale Fruit &amp; Produce distributes <strong style="color: #BB090D;">over 400 fresh produce items</strong><strong> </strong>from all over the world <strong style="color: #BB090D;">every day.</strong></p>`,
    image: aboutUsHeroImage,
  },
  companyHistory: {
    title: "Company History",
    imageTop: "/assets/images/cms-images/about-us-image-one.png",
    imageCenter: "/assets/images/cms-images/about-us-image-two.png",
    imageBottom: "/assets/images/cms-images/about-us-image-three.png",
    descriptionOne: `<p><strong>In 1926, Jack Scalisi immigrated to Detroit Michigan from Termini, Sicily to work with his family in the produce industry. The family business quickly flourished and Jack began to live the American dream by marrying and then raising his family. </strong></p><p><br></p><p><strong>Jack’s son, Anthony, grew up in the produce business where he began working full-time shortly after high school.</strong></p>`,
    descriptionTwo: ` <h4>Anthony Scalisi was an ambitious young man whose early exposure to the produce business brought him experience well beyond his years. He ventured out on his own and began the successful Scalisi Produce Company based in Warren Michigan. By 1964, Anthony married the love of his life, Judy Dodak . Mr. and Mrs. Scalisi worked together at Scalisi Produce while raising their two sons who are also named Jack and Anthony. By 1978, the Scalisi family sold the business in Michigan and moved to South Florida.</h4><h4><br></h4><h4>After a brief retirement and a stint in the restaurant business, Mr. and Mrs. Scalisi and other family members began the Scalisi Produce Company in Florida. The business was operated successfully for approximately eight years until it was sold to the Albert Fisher Company in 1987. By this time, the new generation of Scalisi boys was ready to begin anew. Jack Scalisi, along with his Father and Mother, began Jack Scalisi Wholesale Fruit and Produce. </h4><h4><br></h4><h4><strong>Today, 96 years later, Jack Scalisi and his boys Jack &amp; Anthony are ready to take their journey into the next chapter of the family produce business.</strong></h4>`,
  },
  ourLeedCertifies: {
    title: "Our LEED Certified Facility",
    heading:
      "The Jack Scalisi Wholesale Fruit & Produce Distribution Facility is State of the Art, Green, and Leed",
    tagline: "Architecture and Design by Studio Schiff",
    descriptionOne:
      "LEED, an acronym for Leadership in Energy and Environmental Design, is a rating system for the design, construction, operation, and maintenance of green building, homes and neighborhoods.",
    descriptionTwo: `<h4>Developed by the U.S. Green Building Council (USGBC), LEED is intended to help building owners and operators find and implement ways to be environmentally responsible and resource-efficient. Started in 1998, LEED standards have been applied to more than 7,000 projects in the United States and 30 countries, covering more than 1.501 billion square feet (140 km²) of development area. </h4><h4><br></h4><h4>Points are distributed across major credit categories such as Sustainable Sites, Water Efficiency, Energy and Atmosphere, Materials and Resources, and Indoor Environmental Quality. LEED certified buildings are intended to use resources more efficiently when compared to conventional buildings. They often provide healthier work and living environments, which contributes to higher productivity and improved employee health and comfort. The US Green Building Council has compiled a long list of benefits of implementing a LEED strategy, which ranges from improving air and water quality to reducing solid waste, benefiting owners, occupiers, and society as a whole. </h4><h4><br></h4><h4>Scalisi Produce is currently LEED registered and has a LEED Gold rating of 79 points. The Scalisi Produce facility was constructed utilizing recycled building materials, recycled furniture and fixtures, solar energy and lighting, and recaptured water. We will continue to reduce the impact on the environment by consistently recycling consumables, supplying livestock and farm animals with unusable vegetation, and continually monitoring our impact on the environment through our ongoing commitment to leave a lighter carbon footprint for future generations.</h4>`,
    scalisiProduceImage:
      "/assets/images/cms-images/emergency-operating-image.png",
  },

  photoGallery: [
    {
      image: "/assets/images/dummy-images/photo-gallery-image.png",
      description:
        "Groundbreaking For New Scalisi Produce Distribution Facility. 963 Stinson Way. West Palm Beach. FL 33411",
    },
    {
      image: "/assets/images/dummy-images/photo-gallery-image.png",
      description:
        "Groundbreaking For New Scalisi Produce Distribution Facility. 963 Stinson Way. West Palm Beach. FL 33411",
    },
    {
      image: "/assets/images/dummy-images/photo-gallery-image.png",
      description:
        "Groundbreaking For New Scalisi Produce Distribution Facility. 963 Stinson Way. West Palm Beach. FL 33411",
    },
    {
      image: "/assets/images/dummy-images/photo-gallery-image.png",
      description:
        "Groundbreaking For New Scalisi Produce Distribution Facility. 963 Stinson Way. West Palm Beach. FL 33411",
    },
    {
      image: "/assets/images/dummy-images/photo-gallery-image.png",
      description:
        "Groundbreaking For New Scalisi Produce Distribution Facility. 963 Stinson Way. West Palm Beach. FL 33411",
    },
    {
      image: "/assets/images/dummy-images/photo-gallery-image.png",
      description:
        "Groundbreaking For New Scalisi Produce Distribution Facility. 963 Stinson Way. West Palm Beach. FL 33411",
    },
    {
      image: "/assets/images/dummy-images/photo-gallery-image.png",
      description:
        "Groundbreaking For New Scalisi Produce Distribution Facility. 963 Stinson Way. West Palm Beach. FL 33411",
    },
    {
      image: "/assets/images/dummy-images/photo-gallery-image.png",
      description:
        "Groundbreaking For New Scalisi Produce Distribution Facility. 963 Stinson Way. West Palm Beach. FL 33411",
    },
  ],
  announcement1: {
    htmlDescription: "<h3><strong>Visit Help &amp; Support</strong></h3>",
    image: "/assets/images/cms-images/support.png",
  },
  announcement2: {
    htmlDescription: "<h3><strong>Sign Up For Updates!</strong></h3>",
    image: "/assets/images/cms-images/update.png",
  },
};

export const FORGOT_PAGE_CMS = {
  announcement1: {
    htmlDescription: "<h3><strong>Visit Help &amp; Support</strong></h3>",
    image: "/assets/images/cms-images/support.png",
  },
  announcement2: {
    htmlDescription: "<h3><strong>Sign Up For Updates!</strong></h3>",
    image: "/assets/images/cms-images/update.png",
  },
};

export const DISTRIBUTION_PAGE_DATA = {
  title: "Distribution Map",
  subtitle:
    "Jack Scalisi Wholesale Fruit & Produce has proudly provided South Florida with the finest produce for more than thirty years.",
  description:
    "Our commitment to excellence can be recognized daily in the quality of our products.",

  locations: [
    {
      id: 1,
      name: "Palm Beach County",
      pointer: {
        x: 479,
        y: 225.015625,
        pageScrollX: 0,
        pageScrollY: 0,
        width: 508.796875,
        height: 350.546875,
      },
    },
    {
      id: 2,
      name: "Dade County",
      pointer: {
        x: 480,
        y: 284.015625,
        pageScrollX: 0,
        pageScrollY: 0,
        width: 508.796875,
        height: 350.546875,
      },
    },
    {
      id: 3,
      name: "Broward County",
      pointer: {
        x: 480,
        y: 255.015625,
        pageScrollX: 0,
        pageScrollY: 0,
        width: 508.796875,
        height: 350.546875,
      },
    },
    {
      id: 4,
      name: "Lee County",
      pointer: {
        x: 393,
        y: 235.015625,
        pageScrollX: 0,
        pageScrollY: 0,
        width: 508.796875,
        height: 350.546875,
      },
    },
    {
      id: 5,
      name: "Collier Country",
      pointer: {
        x: 426,
        y: 263.015625,
        pageScrollX: 0,
        pageScrollY: 0,
        width: 508.796875,
        height: 350.546875,
      },
    },
    {
      id: 6,
      name: "Martin County",
      pointer: {
        x: 475,
        y: 200.015625,
        pageScrollX: 0,
        pageScrollY: 0,
        width: 508.796875,
        height: 350.546875,
      },
    },
    {
      id: 7,
      name: "St. Lucie County",
      pointer: {
        x: 470,
        y: 180,
        pageScrollX: 0,
        pageScrollY: 0,
        width: 508.796875,
        height: 350.546875,
      },
    },
    {
      id: 8,
      name: "Miami ",
      pointer: {
        x: 505,
        y: 268,
        pageScrollX: 0,
        pageScrollY: 0,
        width: 508.796875,
        height: 350.546875,
      },
    },
    {
      id: 9,
      name: "West Palm Beach",
      pointer: {
        x: 500,
        y: 220,
        pageScrollX: 0,
        pageScrollY: 0,
        width: 508.796875,
        height: 350.546875,
      },
    },
    {
      id: 10,
      name: "Fort Myers ",
      pointer: {
        x: 380,
        y: 234,
        pageScrollX: 0,
        pageScrollY: 0,
        width: 508.796875,
        height: 350.546875,
      },
    },
    {
      id: 11,
      name: "Naples",
      pointer: {
        x: 400,
        y: 255,
        pageScrollX: 0,
        pageScrollY: 0,
        width: 508.796875,
        height: 350.546875,
      },
    },
    {
      id: 12,
      name: "Indian River County",
      pointer: {
        x: 455,
        y: 165,
        pageScrollX: 0,
        pageScrollY: 0,
        width: 508.796875,
        height: 350.546875,
      },
      isHovered: true,
    },
  ],

  mapImage: "/assets/images/app-images/mapImage.png",
  mapBg: "/assets/images/app-images/distributionCircleBg.png",

  announcement1: {
    htmlDescription: "<h3><strong>Visit Help &amp; Support</strong></h3>",
    image: "/assets/images/cms-images/support.png",
  },
  announcement2: {
    htmlDescription: "<h3><strong>Sign Up For Updates!</strong></h3>",
    image: "/assets/images/cms-images/update.png",
  },
};

export const BLOGS_DATA = {
  heroSection: {
    title: "News & Updates",
    description:
      "Important information that is relevant right now in the produce market and Scalisi Produce.",
    image: BlogDetailHero,
  },
  blogDetailCards: {
    title: "Lorem ipsum dolor sit amet adispicing elit.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis bibendum odio, id malesuada eros. Ut gravida, nisi quis blandit ultrices, justo diam gravida sem, cursus dapibus est risus id orci. Phasellus quis posuere dui. Suspendisse congue lacinia ipsum non egestas. Pellentesque suscipit orci lorem, id maximus elit rutrum vel. Nam laoreet risus orci, ut tempor nisi.",
    date: "November 10th, 2024",
    image: blogCardImg,
  },

  blogCards: [
    {
      title: "Lorem ipsum dolor sit amet adispicing elit.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis bibendum odio, id malesuada eros. Ut gravida, nisi quis blandit ultrices, justo diam gravida sem, cursus dapibus est risus id orci. Phasellus quis posuere dui. Suspendisse congue lacinia ipsum non egestas. Pellentesque suscipit orci lorem, id maximus elit rutrum vel. Nam laoreet risus orci, ut tempor nisi.",
      date: "November 10th, 2024",
      image: blogCardImg,
    },
    {
      title: "Lorem ipsum dolor sit amet adispicing elit.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis bibendum odio, id malesuada eros. Ut gravida, nisi quis blandit ultrices, justo diam gravida sem, cursus dapibus est risus id orci. Phasellus quis posuere dui. Suspendisse congue lacinia ipsum non egestas. Pellentesque suscipit orci lorem, id maximus elit rutrum vel. Nam laoreet risus orci, ut tempor nisi.",
      date: "November 10th, 2024",
      image: blogCardImg,
    },
    {
      title: "Lorem ipsum dolor sit amet adispicing elit.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis bibendum odio, id malesuada eros. Ut gravida, nisi quis blandit ultrices, justo diam gravida sem, cursus dapibus est risus id orci. Phasellus quis posuere dui. Suspendisse congue lacinia ipsum non egestas. Pellentesque suscipit orci lorem, id maximus elit rutrum vel. Nam laoreet risus orci, ut tempor nisi.",
      date: "November 10th, 2024",
      image: blogCardImg,
    },
    {
      title: "Lorem ipsum dolor sit amet adispicing elit.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis bibendum odio, id malesuada eros. Ut gravida, nisi quis blandit ultrices, justo diam gravida sem, cursus dapibus est risus id orci. Phasellus quis posuere dui. Suspendisse congue lacinia ipsum non egestas. Pellentesque suscipit orci lorem, id maximus elit rutrum vel. Nam laoreet risus orci, ut tempor nisi.",
      date: "November 10th, 2024",
      image: blogCardImg,
    },
    {
      title: "Lorem ipsum dolor sit amet adispicing elit.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis bibendum odio, id malesuada eros. Ut gravida, nisi quis blandit ultrices, justo diam gravida sem, cursus dapibus est risus id orci. Phasellus quis posuere dui. Suspendisse congue lacinia ipsum non egestas. Pellentesque suscipit orci lorem, id maximus elit rutrum vel. Nam laoreet risus orci, ut tempor nisi.",
      date: "November 10th, 2024",
      image: blogCardImg,
    },
    {
      title: "Lorem ipsum dolor sit amet adispicing elit.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis bibendum odio, id malesuada eros. Ut gravida, nisi quis blandit ultrices, justo diam gravida sem, cursus dapibus est risus id orci. Phasellus quis posuere dui. Suspendisse congue lacinia ipsum non egestas. Pellentesque suscipit orci lorem, id maximus elit rutrum vel. Nam laoreet risus orci, ut tempor nisi.",
      date: "November 10th, 2024",
      image: blogCardImg,
    },
    {
      title: "Lorem ipsum dolor sit amet adispicing elit.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis bibendum odio, id malesuada eros. Ut gravida, nisi quis blandit ultrices, justo diam gravida sem, cursus dapibus est risus id orci. Phasellus quis posuere dui. Suspendisse congue lacinia ipsum non egestas. Pellentesque suscipit orci lorem, id maximus elit rutrum vel. Nam laoreet risus orci, ut tempor nisi.",
      date: "November 10th, 2024",
      image: blogCardImg,
    },
    {
      title: "Lorem ipsum dolor sit amet adispicing elit.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis bibendum odio, id malesuada eros. Ut gravida, nisi quis blandit ultrices, justo diam gravida sem, cursus dapibus est risus id orci. Phasellus quis posuere dui. Suspendisse congue lacinia ipsum non egestas. Pellentesque suscipit orci lorem, id maximus elit rutrum vel. Nam laoreet risus orci, ut tempor nisi.",
      date: "November 10th, 2024",
      image: blogCardImg,
    },
    {
      title: "Lorem ipsum dolor sit amet adispicing elit.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis bibendum odio, id malesuada eros. Ut gravida, nisi quis blandit ultrices, justo diam gravida sem, cursus dapibus est risus id orci. Phasellus quis posuere dui. Suspendisse congue lacinia ipsum non egestas. Pellentesque suscipit orci lorem, id maximus elit rutrum vel. Nam laoreet risus orci, ut tempor nisi.",
      date: "November 10th, 2024",
      image: blogCardImg,
    },
  ],

  announcement1: {
    htmlDescription: "<h3><strong>Visit Help &amp; Support</strong></h3>",
    image: "/assets/images/cms-images/support.png",
  },
  announcement2: {
    htmlDescription: "<h3><strong>Sign Up For Updates!</strong></h3>",
    image: "/assets/images/cms-images/update.png",
  },
};

export const BLOGS_DETAIL_DATA = {
  heroSection: {
    title: "Lorem ipsum dolor sit amet adispicing elit.",
    date: "November 10th, 2024",
    image: BlogDetailHero,
  },
  blogDetails: {
    detailData: `<h3 style="color: rgb(15, 154, 8);"><strong>Lorem ipsum dolor sit amet adispicing elit.</strong></h3><p><br></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis bibendum odio, id malesuada eros. Ut gravida, nisi quis blandit ultrices, justo diam gravida sem, cursus dapibus est risus id orci. Phasellus quis posuere dui. Suspendisse congue lacinia ipsum non egestas. Pellentesque suscipit orci lorem, id maximus elit rutrum vel. Nam laoreet risus orci, ut tempor nisi tempor vitae. Aenean at quam sem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer aliquam semper justo non consequat. </p><p><br></p><h3 style="color: rgb(15, 154, 8);"><strong>Lorem ipsum dolor sit amet adispicing elit.</strong></h3><p><br></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis bibendum odio, id malesuada eros. Ut gravida, nisi quis blandit ultrices, justo diam gravida sem, cursus dapibus est risus id orci. Phasellus quis posuere dui. Suspendisse congue lacinia ipsum non egestas. Pellentesque suscipit orci lorem, id maximus elit rutrum vel. Nam laoreet risus orci, ut tempor nisi tempor vitae. Aenean at quam sem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer aliquam semper justo non consequat. </p><p><br></p><h3 style="color: rgb(15, 154, 8);"><strong>Lorem ipsum dolor sit amet adispicing elit.</strong></h3><p><br></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis bibendum odio, id malesuada eros. Ut gravida, nisi quis blandit ultrices, justo diam gravida sem, cursus dapibus est risus id orci. Phasellus quis posuere dui. Suspendisse congue lacinia ipsum non egestas. Pellentesque suscipit orci lorem, id maximus elit rutrum vel. Nam laoreet risus orci, ut tempor nisi tempor vitae. Aenean at quam sem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer aliquam semper justo non consequat. </p>`,
    // image: BlogDetailHero,
  },

  blogCards: [
    {
      title: "Lorem ipsum dolor sit amet adispicing elit.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis bibendum odio, id malesuada eros. Ut gravida, nisi quis blandit ultrices, justo diam gravida sem, cursus dapibus est risus id orci. Phasellus quis posuere dui. Suspendisse congue lacinia ipsum non egestas. Pellentesque suscipit orci lorem, id maximus elit rutrum vel. Nam laoreet risus orci, ut tempor nisi.",
      date: "November 10th, 2024",
      image: blogCardImg,
    },
    {
      title: "Lorem ipsum dolor sit amet adispicing elit.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis bibendum odio, id malesuada eros. Ut gravida, nisi quis blandit ultrices, justo diam gravida sem, cursus dapibus est risus id orci. Phasellus quis posuere dui. Suspendisse congue lacinia ipsum non egestas. Pellentesque suscipit orci lorem, id maximus elit rutrum vel. Nam laoreet risus orci, ut tempor nisi.",
      date: "November 10th, 2024",
      image: blogCardImg,
    },
    {
      title: "Lorem ipsum dolor sit amet adispicing elit.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis bibendum odio, id malesuada eros. Ut gravida, nisi quis blandit ultrices, justo diam gravida sem, cursus dapibus est risus id orci. Phasellus quis posuere dui. Suspendisse congue lacinia ipsum non egestas. Pellentesque suscipit orci lorem, id maximus elit rutrum vel. Nam laoreet risus orci, ut tempor nisi.",
      date: "November 10th, 2024",
      image: blogCardImg,
    },
  ],

  announcement1: {
    htmlDescription: "<h3><strong>Visit Help &amp; Support</strong></h3>",
    image: "/assets/images/cms-images/support.png",
  },
  announcement2: {
    htmlDescription: "<h3><strong>Sign Up For Updates!</strong></h3>",
    image: "/assets/images/cms-images/update.png",
  },
};

// export const SOCIAL_ICONS = [
//   { id: 1, Icon: FaLinkedin, color: "var(--white-color)", size: 20 },
//   { id: 2, Icon: FaSquareFacebook, color: "var(--white-color)", size: 20 },
//   { id: 3, Icon: IoLogoWhatsapp, color: "var(--white-color)", size: 20 },
//   { id: 4, Icon: FaEnvelope, color: "var(--white-color)", size: 20 },
//   { id: 5, Icon: FaPrint, color: "var(--white-color)", size: 20 },
// ];

export const CONTACT_PAGE_DATA = {
  heroSection: {
    title: "Contact Us",
    heading: `<p>If you are interested in <strong style="color: #BB090D;">ordering online </strong> or if you have any <strong style="color: #BB090D;">questions regarding your account</strong> please contact your sales representative or any of the customer service agents listed below. </p>`,
    image: aboutUsHeroImage,
    calToAction: [
      {
        // icon: <FaMapMarkerAlt size={13} />,
        TheImage: <ReactSVG src={"/assets/images/svg/locationIcon.svg"} />,
        text: "Jack Scalisi Wholesale Fruit & Produce 963 Stinson Way • West Palm Beach, FL 33411",
      },
      {
        // icon: <MdLocalPhone size={16} />,
        TheImage: <ReactSVG src={"/assets/images/svg/phoneIcon.svg"} />,
        text: "561-471-0848 / 1-888-886-8885",
      },
      {
        // icon: <FaEnvelope size={13} />,
        TheImage: <ReactSVG src={"/assets/images/svg/messageIcon.svg"} />,
        text: "orders@scalisiproduce.com",
      },
    ],
  },

  tableData: [
    {
      title: "Jack Scalisi",
      designation: "President / CEO",
      expNum: "Ext. 303",
      email: "jack@scalisiproduce.com",
    },
    {
      title: "Bill Hoover",
      designation: "Director Of Operations",
      expNum: "Ext. 309",
      email: "bill@scalisiproduce.com",
    },
    {
      title: "Lauren Gavagni",
      designation: "Controller",
      expNum: "Ext.305",
      email: "lauren@scalisiproduce.com",
    },
    {
      title: "Anthony Scalisi",
      designation: "Sales Director",
      expNum: "Ext.306",
      email: "anthonyc@scalisiproduce.com",
    },
    {
      title: "Shannon Tedesco",
      designation: "Customer Service Manager",
      expNum: "Ext.332",
      email: "shannon@scalisiproduce.com",
    },
    {
      title: "Michele Becker",
      designation: "Purchasing",
      expNum: "Ext.304",
      email: "michele@scalisiproduce.com",
    },

    {
      title: "Cheryl Miller",
      designation: "Accounts Receivable",
      expNum: "Ext.307",
      email: "cheryl@scalisiproduce.com",
    },
    {
      title: "Carol Altman",
      designation: "Accounts Payable",
      expNum: "Ext.316",
      email: "bill@scalisiproduce.com",
    },
    {
      title: "Christina Owens",
      designation: "Marketing/Social Media",
      expNum: "Ext.300",
      email: "christina@scalisiproduce.com",
    },
  ],

  image: contactSecImage,

  announcement1: {
    htmlDescription: "<h3><strong>Visit Help &amp; Support</strong></h3>",
    image: "/assets/images/cms-images/support.png",
  },
  announcement2: {
    htmlDescription: "<h3><strong>Sign Up For Updates!</strong></h3>",
    image: "/assets/images/cms-images/update.png",
  },
};

export const NOTIFICATION_DATA = {
  heroSection: {
    title: "Notifications",
  },
  emailNotification: {
    title: "Email Notifications",
    description:
      "<p>We'll use the email <strong>info.jackscalisi@reallylongaddressdomain.co.uk</strong> from your profile information for notifications.</p>",
    notificationsList: [
      { id: 1, label: "New Features and Company Related News", value: true },
      { id: 2, label: "New Features and Company Related News", value: false },
      { id: 3, label: "New Features and Company Related News", value: false },
      { id: 4, label: "New Features and Company Related News", value: true },
    ],
    essentialTitle: "Essential Emails Notifications",
    essentialDesc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non lacus sit amet risus ullamcorper auctors.",
  },

  announcement1: {
    htmlDescription: "<h3><strong>Visit Help &amp; Support</strong></h3>",
    image: "/assets/images/cms-images/support.png",
  },
  announcement2: {
    htmlDescription: "<h3><strong>Sign Up For Updates!</strong></h3>",
    image: "/assets/images/cms-images/update.png",
  },
};

export const VENDORS_DATA = {
  heroSection: {
    title: "Get To Know Our Vendors",
    description:
      "Our relationships with both national and international vendor partners ensures delivery of the finest quality produce and products.",
  },

  localVendors: [
    {
      label: "Duda Farm Fresh Foods",
      image: "/assets/images/cms-images/company-image-one.png",
    },
    {
      label: "Pero Family Farms",
      image: "/assets/images/cms-images/company-image-two.png",
    },
    {
      label: "Tomato Thyme",
      image: "/assets/images/cms-images/company-image-three.png",
    },
    {
      label: "Marjon Specialty Foods",
      image: "/assets/images/cms-images/morjor-image.png",
    },
    {
      label: "Santa Sweets",
      image: "/assets/images/cms-images/santa.png",
    },
  ],

  localVendorMap: {
    title: "Local Vendors Map",
    description:
      "Proudly partnering with our local farmers. (November – April)",
    image: vendorMapImage,

    locations: [
      { id: 1, locationName: "BELLE GLADE", locationDesc: "Duda Farms Duda" },
      { id: 2, locationName: "BOCA RATON", locationDesc: "Duda Farms Duda" },
      {
        id: 3,
        locationName: "BOYNTON BEACH",
        locationDesc: "Pontano Farms Boynton Alderman Farms Yee Farms",
      },
      { id: 4, locationName: "DADE CITY", locationDesc: "EggIand’s Best" },
      { id: 5, locationName: "DELRAY BEACH", locationDesc: "Pero Farms" },
      { id: 6, locationName: "DOVER", locationDesc: "Driscoll Farms Bova" },
      { id: 7, locationName: "HOBE SOUND", locationDesc: "Buzzen Bee" },
      {
        id: 8,
        locationName: "HOMESTEAD",
        locationDesc: "Exotic Fruit Farms Leyenda Fresh FarmsRedlands Farms",
      },
      { id: 9, locationName: "IMMOKOLEE", locationDesc: "Oakes Farms" },
      {
        id: 10,
        locationName: "LOXAHATCHEE",
        locationDesc: "Vicki’s Starfruit Grove",
      },
      {
        id: 11,
        locationName: "PLANT CITY",
        locationDesc: " Marjon Spec. Foods Mack Farms Santa Sweet",
      },
      {
        id: 12,
        locationName: "CLEWISTON",
        locationDesc: " C&B Herbs & Produce",
      },
      {
        id: 13,
        locationName: "WIMAUMA",
        locationDesc: "Red Diamond/Tomato Thyme",
      },
    ],
  },

  nationalVendors: [
    {
      label: "Altar",
      image: "/assets/images/cms-images/altar.png",
    },
    {
      label: "Andy Boy",
      image: "/assets/images/cms-images/andyboy.png",
    },
    {
      label: "Basciani Mushroom Farms",
      image: "/assets/images/cms-images/basciani.png",
    },

    {
      label: "Cal-Organic Farms",
      image: "/assets/images/cms-images/cal-organic.png",
    },
    {
      label: "Calavo",
      image: "/assets/images/cms-images/calavo.png",
    },
    {
      label: "Rainier Fruit",
      image: "/assets/images/cms-images/rainier.png",
    },
    {
      label: "Chiquita",
      image: "/assets/images/cms-images/chiquita.png",
    },
    {
      label: "Christopher Ranch",
      image: "/assets/images/cms-images/christopher.png",
    },
    {
      label: "Red Sun Farms",
      image: "/assets/images/cms-images/redsunfarms.png",
    },
    {
      label: "Del Monte",
      image: "/assets/images/cms-images/delmonte.png",
    },
    {
      label: "Dole",
      image: "/assets/images/cms-images/dole.png",
    },
    {
      label: "Driscoll's Berries",
      image: "/assets/images/cms-images/driscolls.png",
    },
    {
      label: "Wonderful Citrus TM",
      image: "/assets/images/cms-images/wonderful.png",
    },
    {
      label: "Green Gate Fresh",
      image: "/assets/images/cms-images/greengate.png",
    },
    {
      label: "Harvest Sensations",
      image: "/assets/images/cms-images/harvest.png",
    },
    {
      label: "Grimmway Farms",
      image: "/assets/images/cms-images/grimWay-image.png",
    },
    {
      label: "Muzzi Family Farms",
      image: "/assets/images/cms-images/muzzi.png",
    },
    {
      label: "Limoneira",
      image: "/assets/images/cms-images/limoneria.png",
    },
    {
      label: "Legend Produce",
      image: "/assets/images/cms-images/legend.png",
    },
    {
      label: "Hillendale Farms",
      image: "/assets/images/cms-images/hillandale.png",
    },
    {
      label: "Classic Fruit Company",
      image: "/assets/images/cms-images/classic.png",
    },
    {
      label: "Turlock Fruit Company",
      image: "/assets/images/cms-images/turlock.png",
    },
    {
      label: "Ocean Mist Farms",
      image: "/assets/images/cms-images/oceanmist.png",
    },
    {
      label: "Prime Time Produce",
      image: "/assets/images/cms-images/primetime.png",
    },
    {
      label: "Salad Savoy",
      image: "/assets/images/cms-images/salad.png",
    },
    {
      label: "Santa Sweets",
      image: "/assets/images/cms-images/santa.png",
    },
    {
      label: "Sunbelle",
      image: "/assets/images/cms-images/sunbelle.png",
    },
    {
      label: "Sunkist",
      image: "/assets/images/cms-images/sunkist.png",
    },
    {
      label: "Tanimura & Antle",
      image: "/assets/images/cms-images/tanimura.png",
    },
    {
      label: "1. Produce Exchange",
      image: "/assets/images/cms-images/produceExchange.png",
    },
  ],

  affiliations: [
    {
      label: "Fresh From Florida",
      image: "/assets/images/cms-images/affliations-image.png",
    },
    {
      label: "Club Mgmt. Association of Florida",
      image: "/assets/images/cms-images/florida-image.png",
    },
    {
      label: "A. C. Federation",
      image: "/assets/images/cms-images/ac-federation.png",
    },
    {
      label: "Red Book Credit Services",
      image: "/assets/images/cms-images/red-book-image.png",
    },
    {
      label: "Blue Book Services",
      image: "/assets/images/cms-images/blue-book-services.png",
    },
  ],

  announcement1: {
    htmlDescription: "<h3><strong>Visit Help &amp; Support</strong></h3>",
    image: "/assets/images/cms-images/support.png",
  },
  announcement2: {
    htmlDescription: "<h3><strong>Sign Up For Updates!</strong></h3>",
    image: "/assets/images/cms-images/update.png",
  },
};

export const REGISTER_BANNER = {
  heroSection: {
    title: "Become a Customer of Scalisi Produce",
    description:
      "Please fill out the form below to become our customer. Our team will reach out to you as soon as we've reviewed your submission.",
  },

  announcement1: {
    htmlDescription: "<h3><strong>Visit Help &amp; Support</strong></h3>",
    image: "/assets/images/cms-images/support.png",
  },
  announcement2: {
    htmlDescription: "<h3><strong>Sign Up For Updates!</strong></h3>",
    image: "/assets/images/cms-images/update.png",
  },
};

export const MY_ORDERS_PAGE_DATA = {
  heroSection: {
    title: "My Orders",
  },
  announcement1: {
    htmlDescription: "<h3><strong>Visit Help &amp; Support</strong></h3>",
    image: "/assets/images/cms-images/support.png",
  },
  announcement2: {
    htmlDescription: "<h3><strong>Sign Up For Updates!</strong></h3>",
    image: "/assets/images/cms-images/update.png",
  },
  tableData: [
    {
      _id: 1,
      orderNumber: "ORD001",
      dateOrdered: "2024-01-10",
      dateDelivery: "2024-01-15",
      quantity: 51,
      products:
        "Lettuce Arugula 2/1.5# B&W baby Lorem ipsum dolor sit amet Lettuce Arugula 2/1.5# B&W baby Lorem ipsum dolor sit amet",
      total: "120.00",
      productLists: [
        {
          quantity: 2,
          products:
            "Lettuce Arugula 2/1.5# B&W baby Lorem ipsum dolor sit amet",
          total: "120.00",
        },
        {
          quantity: 2,
          products:
            "Lettuce Arugula 2/1.5# B&W baby Lorem ipsum dolor sit amet",
          total: "120.00",
        },
        {
          quantity: 2,
          products:
            "Lettuce Arugula 2/1.5# B&W baby Lorem ipsum dolor sit amet",
          total: "120.00",
        },
        {
          quantity: 2,
          products:
            "Lettuce Arugula 2/1.5# B&W baby Lorem ipsum dolor sit amet",
          total: "120.00",
        },
      ],
    },
    {
      _id: 2,
      orderNumber: "ORD002",
      dateOrdered: "2024-01-12",
      dateDelivery: "2024-01-18",
      quantity: 1,
      products: "Product C",
      total: "50.00",
      productLists: [
        {
          quantity: 2,
          products:
            "Lettuce Arugula 2/1.5# B&W baby Lorem ipsum dolor sit amet Lettuce Arugula 2/1.5# B&W baby Lorem ipsum dolor sit amet",
          total: "120.00",
        },
        {
          quantity: 2,
          products:
            "Lettuce Arugula 2/1.5# B&W baby Lorem ipsum dolor sit amet Lettuce Arugula 2/1.5# B&W baby Lorem ipsum dolor sit amet",
          total: "120.00",
        },
      ],
    },
    {
      _id: 3,
      orderNumber: "ORD003",
      dateOrdered: "2024-01-15",
      dateDelivery: "2024-01-20",
      quantity: 3,
      products:
        "Lettuce Arugula 2/1.5# B&W baby Lorem ipsum dolor sit amet Lettuce Arugula 2/1.5# B&W baby Lorem ipsum dolor sit amet",
      total: "300.00",
    },
    {
      _id: 4,
      orderNumber: "ORD004",
      dateOrdered: "2024-01-18",
      dateDelivery: "2024-01-23",
      quantity: 4,
      products: "Product G, Product H",
      total: "200.00",
    },
    {
      _id: 4,
      orderNumber: "ORD005",
      dateOrdered: "2024-01-20",
      dateDelivery: "2024-01-25",
      quantity: 2,
      products: "Product I",
      total: "75.00",
    },
    {
      _id: 5,
      orderNumber: "ORD006",
      dateOrdered: "2024-01-22",
      dateDelivery: "2024-01-28",
      quantity: 5,
      products: "Product J, Product K",
      total: "400.00",
    },
    {
      _id: 6,
      orderNumber: "ORD001",
      dateOrdered: "2024-01-10",
      dateDelivery: "2024-01-15",
      quantity: 51,
      products:
        "Lettuce Arugula 2/1.5# B&W baby Lorem ipsum dolor sit amet Lettuce Arugula 2/1.5# B&W baby Lorem ipsum dolor sit amet",
      total: "120.00",
      productLists: [
        {
          quantity: 2,
          products:
            "Lettuce Arugula 2/1.5# B&W baby Lorem ipsum dolor sit amet",
          total: "120.00",
        },
        {
          quantity: 2,
          products:
            "Lettuce Arugula 2/1.5# B&W baby Lorem ipsum dolor sit amet",
          total: "120.00",
        },
        {
          quantity: 2,
          products:
            "Lettuce Arugula 2/1.5# B&W baby Lorem ipsum dolor sit amet",
          total: "120.00",
        },
        {
          quantity: 2,
          products:
            "Lettuce Arugula 2/1.5# B&W baby Lorem ipsum dolor sit amet",
          total: "120.00",
        },
      ],
    },
    {
      _id: 7,
      orderNumber: "ORD002",
      dateOrdered: "2024-01-12",
      dateDelivery: "2024-01-18",
      quantity: 1,
      products: "Product C",
      total: "50.00",
      productLists: [
        {
          quantity: 2,
          products:
            "Lettuce Arugula 2/1.5# B&W baby Lorem ipsum dolor sit amet Lettuce Arugula 2/1.5# B&W baby Lorem ipsum dolor sit amet",
          total: "120.00",
        },
        {
          quantity: 2,
          products:
            "Lettuce Arugula 2/1.5# B&W baby Lorem ipsum dolor sit amet Lettuce Arugula 2/1.5# B&W baby Lorem ipsum dolor sit amet",
          total: "120.00",
        },
      ],
    },
    {
      _id: 8,
      orderNumber: "ORD003",
      dateOrdered: "2024-01-15",
      dateDelivery: "2024-01-20",
      quantity: 3,
      products:
        "Lettuce Arugula 2/1.5# B&W baby Lorem ipsum dolor sit amet Lettuce Arugula 2/1.5# B&W baby Lorem ipsum dolor sit amet",
      total: "300.00",
    },
    {
      _id: 9,
      orderNumber: "ORD004",
      dateOrdered: "2024-01-18",
      dateDelivery: "2024-01-23",
      quantity: 4,
      products: "Product G, Product H",
      total: "200.00",
    },
  ],
};
export const SELECTED_ORDER_DATA = {
  orders: [
    {
      orderNumber: "ORD001",
      dateOrdered: "2024-01-10",
      dateDelivery: "2024-01-15",
      quantity: 2,
      products:
        "Lettuce Arugula 2/1.5# B&W baby Lorem ipsum dolor sit amet Lettuce Arugula 2/1.5# B&W baby Lorem ipsum dolor sit amet",
      total: "120.00",
    },
    {
      orderNumber: "ORD002",
      dateOrdered: "2024-01-12",
      dateDelivery: "2024-01-18",
      quantity: 1,
      products: "Product C",
      total: "50.00",
    },
    {
      orderNumber: "ORD003",
      dateOrdered: "2024-01-15",
      dateDelivery: "2024-01-20",
      quantity: 3,
      products:
        "Lettuce Arugula 2/1.5# B&W baby Lorem ipsum dolor sit amet Lettuce Arugula 2/1.5# B&W baby Lorem ipsum dolor sit amet",
      total: "300.00",
    },
    {
      orderNumber: "ORD004",
      dateOrdered: "2024-01-18",
      dateDelivery: "2024-01-23",
      quantity: 4,
      products: "Product G, Product H",
      total: "200.00",
    },
    {
      orderNumber: "ORD005",
      dateOrdered: "2024-01-20",
      dateDelivery: "2024-01-25",
      quantity: 2,
      products: "Product I",
      total: "75.00",
    },
    {
      orderNumber: "ORD006",
      dateOrdered: "2024-01-22",
      dateDelivery: "2024-01-28",
      quantity: 5,
      products: "Product J, Product K",
      total: "400.00",
    },
  ],
};
export const MY_ACCOUNT_DATA = {
  heroSection: {
    title: "My Account",
  },

  announcement1: {
    htmlDescription: "<h3><strong>Visit Help &amp; Support</strong></h3>",
    image: "/assets/images/cms-images/support.png",
  },
  announcement2: {
    htmlDescription: "<h3><strong>Sign Up For Updates!</strong></h3>",
    image: "/assets/images/cms-images/update.png",
  },
};

export const LogonPageData = {
  heroSection: {
    title: "Log In",
  },
};
