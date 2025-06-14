import {
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoFacebook,
  IoLogoYoutube,
} from 'react-icons/io5'

export const footer = {
  widgets: [
    {
      id: 1,
      widgetTitle: 'widget-title-social',
      lists: [
        {
          id: 1,
          title: 'link-instagram',
          path: 'https://www.instagram.com/nätbutiken/',
          icon: <IoLogoInstagram />,
        },
        {
          id: 2,
          title: 'link-facebook',
          path: 'https://www.facebook.com/nätbutiken/',
          icon: <IoLogoFacebook />,
        },
        {
          id: 3,
          title: 'link-youtube',
          path: 'https://www.youtube.com/channel/UCjld1tyVHRNy_pe3ROLiLhw',
          icon: <IoLogoYoutube />,
        },
      ],
    },
    {
      id: 2,
      widgetTitle: 'widget-title-contact',
      lists: [
        {
          id: 1,
          title: 'link-contact-us',
          path: '/contact-us',
        },
        {
          id: 2,
          title: 'link-about-us',
          path: '/om-oss',
        },
        {
          id: 3,
          title: 'link-email',
          path: '/',
        },
        {
          id: 4,
          title: 'link-phone',
          path: '/',
        },
      ],
    },
    {
      id: 3,
      widgetTitle: 'widget-title-customer-care',
      lists: [

        {
          id: 1,
          title: 'link-customer-support',
          path: '/support',
        },

        {
          id: 2,
          title: 'link-faq',
          path: '/faq',
        },
        {
          id: 3,
          title: 'link-shipping',
          path: '/',
        },
        {
          id: 4,
          title: 'link-exchanges',
          path: '/return',
        },
      ],
    },
    {
      id: 4,
      widgetTitle: 'widget-title-top-categories',
      lists: [
        {
          id: 1,
          title: 'link-kranar',
          path: '/search?q=kranar',
        },
        {
          id: 2,
          title: 'link-pizza',
          path: '/search?q=pizza-ugn',
        },
        {
          id: 3,
          title: 'link-braskamin',
          path: '/hushall/braskaminer',
        },
        {
          id: 4,
          title: 'link-sports-wear',
          path: '/search',
        },
      ],
    },
    {
      id: 5,
      widgetTitle: 'widget-title-our-information',
      lists: [
        {
          id: 1,
          title: 'link-privacy',
          path: '/privacy',
        },
        {
          id: 2,
          title: 'link-terms',
          path: '/terms',
        },
        {
          id: 3,
          title: 'link-site-map',
          path: '/',
        },
      ],
    },

  ],
  payment: [
    {
      id: 1,
      path: '/',
      image: '/assets/images/payment/mastercard.svg',
      name: 'payment-master-card',
      width: 34,
      height: 20,
    },
    {
      id: 2,
      path: '/',
      image: '/assets/images/payment/visa.svg',
      name: 'payment-visa',
      width: 50,
      height: 20,
    },
    {
      id: 3,
      path: '/',
      image: '/assets/images/payment/paypal.svg',
      name: 'payment-paypal',
      width: 76,
      height: 20,
    },
    {
      id: 5,
      path: '/',
      image: '/assets/images/payment/skrill.svg',
      name: 'klarna',
      width: 39,
      height: 20,
    },
  ],
}


