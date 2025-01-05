import { ILFlag } from '@components/icons/ILFlag';
import { SAFlag } from '@components/icons/SAFlag';
import { CNFlag } from '@components/icons/CNFlag';
import { USFlag } from '@components/icons/USFlag';
import { DEFlag } from '@components/icons/DEFlag';
import { ESFlag } from '@components/icons/ESFlag';
import { SEFlag } from '@components/icons/SEFlag';
import { AXFlag } from '@components/icons/AXFlag';
import menuData from './menu'; // Import the data



import { ThunderIcon } from '@components/icons/thunder-icon';


const { menu, mobileData } = menuData

console.log(mobileData)

export const siteSettings = {
  name: 'Nätbutiken',
  description: 'Välkommen till Ålands Nätbutik – din kompletta destination för att upptäcka och handla produkter',
  author: {
    name: 'Nätbutiken',
    websiteUrl: 'https://www.nätbutiken.ax',
    address: '',
  },
  logo: {
    url: '/assets/images/Natbutiken.axLogo.png',
    alt: 'Nätbutiken',
    href: '/',
    width: 280,
    height: 60,
  },
  defaultLanguage: 'se',
  currencyCode: 'EUR',
  site_header: {

    menu: menu/* [
      {
        id: 1,
        path: '/search?q=hus',
        label: 'hus',
        columns: [
          {
            id: 1,
            columnItems: [
              {
                id: 1,
                path: '/search?q=kok',
                label: 'kok',
                columnItemItems: [
                  {
                    id: 1,
                    path: '/search?q=kranar',
                    label: 'kranar',
                    subMenu: [
                      {
                        id: 1,
                        path: '/search?q=kranar',
                        label: 'kranar',
                      }]
                  },
                  {
                    id: 2,
                    path: '/search?q=casual-shirts',
                    label: 'menu-casual-shirts',
                  },
                  {
                    id: 4,
                    path: '/search?q=blazwers-coats',
                    label: 'menu-blazwers-coats',
                  },
                  {
                    id: 5,
                    path: '/search?q=suits',
                    label: 'menu-suits',
                  },
                  {
                    id: 6,
                    path: '/search?q=suits',
                    label: 'menu-suits',
                  },
                  ,
                  {
                    id: 7,
                    path: '/search?q=suits',
                    label: 'menu-suits',
                  }
                ],
              },
              {
                id: 2,
                path: '/search?q=pizza-ugn',
                label: 'pizza-ugn',
                columnItemItems: [
                  {
                    id: 1,
                    path: '/search?q=portabel',
                    label: 'portabel',
                  },
                  {
                    id: 2,
                    path: '/search?q=casual-shirts',
                    label: 'menu-casual-shirts',
                  }
                ],
              },

            ],
          },
          {
            id: 2,
            columnItems: [
              {
                id: 1,
                path: '/search?q=varme-kyla',
                label: 'varme-kyla',
                columnItemItems: [
                  {
                    id: 1,
                    path: '/search?q=braskamin',
                    label: 'braskamin',
                  },
                  {
                    id: 2,
                    path: '/search?q=varmepump',
                    label: 'varmepump',
                  },
                  {
                    id: 3,
                    path: '/search?q=golvvarme',
                    label: 'golvvarme',
                  },
                  {
                    id: 4,
                    path: '/search?q=air-condition',
                    label: 'air-condition',
                  }
                ],
              },
              {
                id: 2,
                path: '/search?q=vitvaror',
                label: 'vitvaror',
                columnItemItems: [
                  {
                    id: 1,
                    path: '/search?q=kyl',
                    label: 'kyl',
                  },
                  {
                    id: 2,
                    path: '/search?q=frys',
                    label: 'frys',
                  },
                  {
                    id: 3,
                    path: '/search?q=vin-kyl',
                    label: 'vin-kyl',
                  },
                ],
              }
            ],
          },
          {
            id: 3,
            columnItems: [
              {
                id: 1,
                path: '/search?q=energi',
                label: 'energi',
                columnItemItems: [
                  {
                    id: 1,
                    path: '/search?q=solceller',
                    label: 'solceller',
                  },
                  {
                    id: 2,
                    path: '/search?q=batterier',
                    label: 'batterier',
                  },
                  {
                    id: 3,
                    path: '/search?q=el-bils-laddare',
                    label: 'el-bils-laddare',
                  },
                  {
                    id: 4,
                    path: '/search?q=solfangare',
                    label: 'solfangare',
                  },
                ],
              },
              {
                id: 2,
                path: '/search?q=koksapparater',
                label: 'koksapparater',
                columnItemItems: [
                  {
                    id: 1,
                    path: '/search?q=kaffe-maskiner',
                    label: 'kaffe-maskiner',
                  }
                ],
              },
            ],
          },
          {
            id: 4,
            columnItems: [
              {
                id: 1,
                path: '/search?q=mobler-inredning',
                label: 'mobler-inredning',
                columnItemItems: [
                  {
                    id: 1,
                    path: '/search?q=soffor',
                    label: 'soffor',
                  },
                  {
                    id: 2,
                    path: '/search?q=bord',
                    label: 'bord',
                  },
                  {
                    id: 3,
                    path: '/search?q=stolar',
                    label: 'stolar',
                  },
                  ,
                  {
                    id: 4,
                    path: '/search?q=tv-mobler',
                    label: 'tv-mobler',
                  },
                  ,
                  {
                    id: 5,
                    path: '/search?q=speglar',
                    label: 'speglar',
                  },
                ],
              }
            ],
          },
          {
            id: 5,
            columnItems: [
              {
                id: 1,
                path: '/search?q=smart-hem',
                label: 'smart-hem',
                columnItemItems: [
                  {
                    id: 1,
                    path: '/search?q=temperatur-givare',
                    label: 'temperatur-givare',
                  },
                  {
                    id: 2,
                    path: '/search?q=larm',
                    label: 'larm',
                  },
                ],
              },
              {
                id: 2,
                path: '/search?q=verktyg-maskiner',
                label: 'verktyg-maskiner',
                columnItemItems: [
                  {
                    id: 1,
                    path: '/search?q=skruvdragare',
                    label: 'skruvdragare',
                  },
                  {
                    id: 2,
                    path: '/search?q=damsugare',
                    label: 'damsugare',
                  },
                  {
                    id: 3,
                    path: '/search?q=maleri',
                    label: 'maleri',
                  },
                ],
              }
            ],
          },
        ],
      },
      {
        id: 2,
        path: '/search?q=fritid',
        label: 'menu-fritid-main',
        columns: [
          {
            id: 1,
            columnItems: [
              {
                id: 1,
                path: '/search?q=gadgets',
                label: 'menu-gadgets',
                columnItemItems: [
                  {
                    id: 1,
                    path: '/search?q=smart-wearables',
                    label: 'menu-smart-wearables',
                  },
                  {
                    id: 2,
                    path: '/search?q=headphones',
                    label: 'menu-headphones',
                  },
                ],
              },
              {
                id: 2,
                path: '/search?q=jewellers',
                label: 'menu-jewellers',
                columnItemItems: [
                  {
                    id: 1,
                    path: '/search?q=fashion-jewellers',
                    label: 'menu-fashion-jewellers',
                  },
                  {
                    id: 2,
                    path: '/search?q=fine-jewellers',
                    label: 'menu-fine-jewellers',
                  },
                ],
              },
              {
                id: 3,
                path: '/search?q=backpacks',
                label: 'menu-backpacks',
              },
              {
                id: 4,
                path: '/search?q=handbags-wallets',
                label: 'menu-handbags-wallets',
              },
            ],
          },
          {
            id: 2,
            columnItems: [
              {
                id: 1,
                path: '/search?q=top-wear',
                label: 'menu-top-wear',
                columnItemItems: [
                  {
                    id: 1,
                    path: '/search?q=t-shirt',
                    label: 'menu-t-shirt',
                  },
                  {
                    id: 2,
                    path: '/search?q=casual-shirts',
                    label: 'menu-casual-shirts',
                  },
                  {
                    id: 4,
                    path: '/search?q=blazwers-coats',
                    label: 'menu-blazwers-coats',
                  },
                  {
                    id: 5,
                    path: '/search?q=suits',
                    label: 'menu-suits',
                  },
                  {
                    id: 6,
                    path: '/search?q=jackets',
                    label: 'menu-jackets',
                  },
                ],
              },
              {
                id: 2,
                path: '/search?q=pizza-ugn',
                label: 'pizza-ugn',
              },
              {
                id: 3,
                path: '/search?q=watches-wearables',
                label: 'menu-watches-wearables',
              },
            ],
          },
          {
            id: 3,
            columnItems: [
              {
                id: 1,
                path: '/search?q=footwear',
                label: 'menu-footwear',
                columnItemItems: [
                  {
                    id: 1,
                    path: '/search?q=flats',
                    label: 'menu-flats',
                  },
                  {
                    id: 2,
                    path: '/search?q=casual-shoes',
                    label: 'menu-casual-shoes',
                  },
                  {
                    id: 3,
                    path: '/search?q=heels',
                    label: 'menu-heels',
                  },
                  {
                    id: 4,
                    path: '/search?q=boots',
                    label: 'menu-boots',
                  },
                ],
              },
              {
                id: 2,
                path: '/search?q=sports-active-wear',
                label: 'menu-sports-active-wear',
                columnItemItems: [
                  {
                    id: 1,
                    path: '/search?q=clothing',
                    label: 'menu-clothing',
                  },
                  {
                    id: 2,
                    path: '/search?q=footwear',
                    label: 'menu-footwear',
                  },
                  {
                    id: 3,
                    path: '/search?q=sports-accessories',
                    label: 'menu-sports-accessories',
                  },
                ],
              },
            ],
          },
          {
            id: 4,
            columnItems: [
              {
                id: 1,
                path: '/search?q=western-wear',
                label: 'menu-western-wear',
                columnItemItems: [
                  {
                    id: 1,
                    path: '/search?q=dresses',
                    label: 'menu-dresses',
                  },
                  {
                    id: 2,
                    path: '/search?q=jumpsuits',
                    label: 'menu-jumpsuits',
                  },
                  {
                    id: 3,
                    path: '/search?q=tops-t-shirt',
                    label: 'menu-tops-shirts',
                  },
                  {
                    id: 4,
                    path: '/search?q=shorts-skirts',
                    label: 'menu-shorts-skirts',
                  },
                  {
                    id: 5,
                    path: '/search?q=shurgs',
                    label: 'menu-shurgs',
                  },
                  {
                    id: 6,
                    path: '/search?q=blazers',
                    label: 'menu-blazers',
                  },
                ],
              },
              {
                id: 2,
                path: '/search?q=plus-size',
                label: 'menu-plus-size',
              },
              {
                id: 3,
                path: '/search?q=sunglasses-frames',
                label: 'menu-sunglasses-frames',
              },
            ],
          },
          {
            id: 5,
            columnItems: [
              {
                id: 1,
                path: '/search?q=lingerie-sleepwear',
                label: 'menu-lingerie-sleepwear',
                columnItemItems: [
                  {
                    id: 1,
                    path: '/search?q=bra',
                    label: 'menu-bra',
                  },
                  {
                    id: 2,
                    path: '/search?q=briefs',
                    label: 'menu-briefs',
                  },
                  {
                    id: 3,
                    path: '/search?q=sleepwear',
                    label: 'menu-sleepwear',
                  },
                ],
              },
              {
                id: 2,
                path: '/search?q=belt-scarves',
                label: 'menu-belt-scarves',
                columnItemItems: [
                  {
                    id: 1,
                    path: '/search?q=makeup',
                    label: 'menu-makeup',
                  },
                  {
                    id: 2,
                    path: '/search?q=skincare',
                    label: 'menu-skincare',
                  },
                  {
                    id: 3,
                    path: '/search?q=premium-beauty',
                    label: 'menu-premium-beauty',
                  },
                  {
                    id: 4,
                    path: '/search?q=lipsticks',
                    label: 'menu-lipsticks',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 3,
        path: '/search?q=tradgard',
        label: 'menu-tradgard-main',
        columns: [
          {
            id: 1,
            columnItems: [
              {
                id: 1,
                path: '/search?q=kok',
                label: 'kok',
                columnItemItems: [
                  {
                    id: 1,
                    path: '/search?q=smart-wearables',
                    label: 'menu-smart-wearables',
                  },
                  {
                    id: 2,
                    path: '/search?q=headphones',
                    label: 'menu-headphones',
                  },
                ],
              },
              {
                id: 2,
                path: '/search?q=jewellers',
                label: 'menu-jewellers',
                columnItemItems: [
                  {
                    id: 1,
                    path: '/search?q=fashion-jewellers',
                    label: 'menu-fashion-jewellers',
                  },
                  {
                    id: 2,
                    path: '/search?q=fine-jewellers',
                    label: 'menu-fine-jewellers',
                  },
                ],
              },
              {
                id: 3,
                path: '/search?q=backpacks',
                label: 'menu-backpacks',
              },
              {
                id: 4,
                path: '/search?q=handbags-wallets',
                label: 'menu-handbags-wallets',
              },
            ],
          },
          {
            id: 2,
            columnItems: [
              {
                id: 1,
                path: '/search?q=top-wear',
                label: 'menu-top-wear',
                columnItemItems: [
                  {
                    id: 1,
                    path: '/search?q=t-shirt',
                    label: 'menu-t-shirt',
                  },
                  {
                    id: 2,
                    path: '/search?q=casual-shirts',
                    label: 'menu-casual-shirts',
                  },
                  {
                    id: 3,
                    path: '/search?q=formal-shirts',
                    label: 'menu-formal-shirts',
                  },
                  {
                    id: 4,
                    path: '/search?q=blazwers-coats',
                    label: 'menu-blazwers-coats',
                  },
                  {
                    id: 5,
                    path: '/search?q=suits',
                    label: 'menu-suits',
                  },
                  {
                    id: 6,
                    path: '/search?q=jackets',
                    label: 'menu-jackets',
                  },
                ],
              },
              {
                id: 2,
                path: '/search?q=belt-scarves',
                label: 'menu-belt-scarves',
              },
              {
                id: 3,
                path: '/search?q=watches-wearables',
                label: 'menu-watches-wearables',
              },
            ],
          },
          {
            id: 3,
            columnItems: [
              {
                id: 1,
                path: '/search?q=footwear',
                label: 'menu-footwear',
                columnItemItems: [
                  {
                    id: 1,
                    path: '/search?q=flats',
                    label: 'menu-flats',
                  },
                  {
                    id: 2,
                    path: '/search?q=casual-shoes',
                    label: 'menu-casual-shoes',
                  },
                  {
                    id: 3,
                    path: '/search?q=heels',
                    label: 'menu-heels',
                  },
                  {
                    id: 4,
                    path: '/search?q=boots',
                    label: 'menu-boots',
                  },
                ],
              },
              {
                id: 2,
                path: '/search?q=sports-active-wear',
                label: 'menu-sports-active-wear',
                columnItemItems: [
                  {
                    id: 1,
                    path: '/search?q=clothing',
                    label: 'menu-clothing',
                  },
                  {
                    id: 2,
                    path: '/search?q=footwear',
                    label: 'menu-footwear',
                  },
                  {
                    id: 3,
                    path: '/search?q=sports-accessories',
                    label: 'menu-sports-accessories',
                  },
                ],
              },
            ],
          },
          {
            id: 4,
            columnItems: [
              {
                id: 1,
                path: '/search?q=western-wear',
                label: 'menu-western-wear',
                columnItemItems: [
                  {
                    id: 1,
                    path: '/search?q=dresses',
                    label: 'menu-dresses',
                  },
                  {
                    id: 2,
                    path: '/search?q=jumpsuits',
                    label: 'menu-jumpsuits',
                  },
                  {
                    id: 3,
                    path: '/search?q=tops-t-shirt',
                    label: 'menu-tops-shirts',
                  },
                  {
                    id: 4,
                    path: '/search?q=shorts-skirts',
                    label: 'menu-shorts-skirts',
                  },
                  {
                    id: 5,
                    path: '/search?q=shurgs',
                    label: 'menu-shurgs',
                  },
                  {
                    id: 6,
                    path: '/search?q=blazers',
                    label: 'menu-blazers',
                  },
                ],
              },
              {
                id: 2,
                path: '/search?q=plus-size',
                label: 'menu-plus-size',
              },
              {
                id: 3,
                path: '/search?q=sunglasses-frames',
                label: 'menu-sunglasses-frames',
              },
            ],
          },
          {
            id: 5,
            columnItems: [
              {
                id: 1,
                path: '/search?q=lingerie-sleepwear',
                label: 'menu-lingerie-sleepwear',
                columnItemItems: [
                  {
                    id: 1,
                    path: '/search?q=bra',
                    label: 'menu-bra',
                  },
                  {
                    id: 2,
                    path: '/search?q=briefs',
                    label: 'menu-briefs',
                  },
                  {
                    id: 3,
                    path: '/search?q=sleepwear',
                    label: 'menu-sleepwear',
                  },
                ],
              },
              {
                id: 2,
                path: '/search?q=belt-scarves',
                label: 'menu-belt-scarves',
                columnItemItems: [
                  {
                    id: 1,
                    path: '/search?q=makeup',
                    label: 'menu-makeup',
                  },
                  {
                    id: 2,
                    path: '/search?q=skincare',
                    label: 'menu-skincare',
                  },
                  {
                    id: 3,
                    path: '/search?q=premium-beauty',
                    label: 'menu-premium-beauty',
                  },
                  {
                    id: 4,
                    path: '/search?q=lipsticks',
                    label: 'menu-lipsticks',
                  },
                ],
              },
            ],
          },
        ],
      },
      ,
      {
        id: 3,
        path: '/search?q=tradgard',
        label: 'menu-tradgard-main',
        columns: [
          {
            id: 1,
            columnItems: [
              {
                id: 1,
                path: '/search?q=kok',
                label: 'kok',
                columnItemItems: [
                  {
                    id: 1,
                    path: '/search?q=smart-wearables',
                    label: 'menu-smart-wearables',
                  },
                  {
                    id: 2,
                    path: '/search?q=headphones',
                    label: 'menu-headphones',
                  },
                ],
              },
              {
                id: 2,
                path: '/search?q=jewellers',
                label: 'menu-jewellers',
                columnItemItems: [
                  {
                    id: 1,
                    path: '/search?q=fashion-jewellers',
                    label: 'menu-fashion-jewellers',
                  },
                  {
                    id: 2,
                    path: '/search?q=fine-jewellers',
                    label: 'menu-fine-jewellers',
                  },
                ],
              },
              {
                id: 3,
                path: '/search?q=backpacks',
                label: 'menu-backpacks',
              },
              {
                id: 4,
                path: '/search?q=handbags-wallets',
                label: 'menu-handbags-wallets',
              },
            ],
          },
          {
            id: 2,
            columnItems: [
              {
                id: 1,
                path: '/search?q=top-wear',
                label: 'menu-top-wear',
                columnItemItems: [
                  {
                    id: 1,
                    path: '/search?q=t-shirt',
                    label: 'menu-t-shirt',
                  },
                  {
                    id: 2,
                    path: '/search?q=casual-shirts',
                    label: 'menu-casual-shirts',
                  },
                  {
                    id: 3,
                    path: '/search?q=formal-shirts',
                    label: 'menu-formal-shirts',
                  },
                  {
                    id: 4,
                    path: '/search?q=blazwers-coats',
                    label: 'menu-blazwers-coats',
                  },
                  {
                    id: 5,
                    path: '/search?q=suits',
                    label: 'menu-suits',
                  },
                  {
                    id: 6,
                    path: '/search?q=jackets',
                    label: 'menu-jackets',
                  },
                ],
              },
              {
                id: 2,
                path: '/search?q=belt-scarves',
                label: 'menu-belt-scarves',
              },
              {
                id: 3,
                path: '/search?q=watches-wearables',
                label: 'menu-watches-wearables',
              },
            ],
          },
          {
            id: 3,
            columnItems: [
              {
                id: 1,
                path: '/search?q=footwear',
                label: 'menu-footwear',
                columnItemItems: [
                  {
                    id: 1,
                    path: '/search?q=flats',
                    label: 'menu-flats',
                  },
                  {
                    id: 2,
                    path: '/search?q=casual-shoes',
                    label: 'menu-casual-shoes',
                  },
                  {
                    id: 3,
                    path: '/search?q=heels',
                    label: 'menu-heels',
                  },
                  {
                    id: 4,
                    path: '/search?q=boots',
                    label: 'menu-boots',
                  },
                ],
              },
              {
                id: 2,
                path: '/search?q=sports-active-wear',
                label: 'menu-sports-active-wear',
                columnItemItems: [
                  {
                    id: 1,
                    path: '/search?q=clothing',
                    label: 'menu-clothing',
                  },
                  {
                    id: 2,
                    path: '/search?q=footwear',
                    label: 'menu-footwear',
                  },
                  {
                    id: 3,
                    path: '/search?q=sports-accessories',
                    label: 'menu-sports-accessories',
                  },
                ],
              },
            ],
          },
          {
            id: 4,
            columnItems: [
              {
                id: 1,
                path: '/search?q=western-wear',
                label: 'menu-western-wear',
                columnItemItems: [
                  {
                    id: 1,
                    path: '/search?q=dresses',
                    label: 'menu-dresses',
                  },
                  {
                    id: 2,
                    path: '/search?q=jumpsuits',
                    label: 'menu-jumpsuits',
                  },
                  {
                    id: 3,
                    path: '/search?q=tops-t-shirt',
                    label: 'menu-tops-shirts',
                  },
                  {
                    id: 4,
                    path: '/search?q=shorts-skirts',
                    label: 'menu-shorts-skirts',
                  },
                  {
                    id: 5,
                    path: '/search?q=shurgs',
                    label: 'menu-shurgs',
                  },
                  {
                    id: 6,
                    path: '/search?q=blazers',
                    label: 'menu-blazers',
                  },
                ],
              },
              {
                id: 2,
                path: '/search?q=plus-size',
                label: 'menu-plus-size',
              },
              {
                id: 3,
                path: '/search?q=sunglasses-frames',
                label: 'menu-sunglasses-frames',
              },
            ],
          },
          {
            id: 5,
            columnItems: [
              {
                id: 1,
                path: '/search?q=lingerie-sleepwear',
                label: 'menu-lingerie-sleepwear',
                columnItemItems: [
                  {
                    id: 1,
                    path: '/search?q=bra',
                    label: 'menu-bra',
                  },
                  {
                    id: 2,
                    path: '/search?q=briefs',
                    label: 'menu-briefs',
                  },
                  {
                    id: 3,
                    path: '/search?q=sleepwear',
                    label: 'menu-sleepwear',
                  },
                ],
              },
              {
                id: 2,
                path: '/search?q=belt-scarves',
                label: 'menu-belt-scarves',
                columnItemItems: [
                  {
                    id: 1,
                    path: '/search?q=makeup',
                    label: 'menu-makeup',
                  },
                  {
                    id: 2,
                    path: '/search?q=skincare',
                    label: 'menu-skincare',
                  },
                  {
                    id: 3,
                    path: '/search?q=premium-beauty',
                    label: 'menu-premium-beauty',
                  },
                  {
                    id: 4,
                    path: '/search?q=lipsticks',
                    label: 'menu-lipsticks',
                  },
                ],
              },
            ],
          },
        ],
      }
    ] */,
    mobileMenu: mobileData/* [
      {
        id: 1,
        path: '/search?q=hushall',
        label: 'hus',
        subMenu: [
          {
            id: 1,
            path: '/search?q=kok',
            label: 'kok',
            subMenu: [
              {
                id: 1,
                path: '/search?q=kranar',
                label: 'kranar',
              },
              {
                id: 2,
                path: '/search?q=casual-shirts',
                label: 'menu-casual-shirts',
              },
              {
                id: 3,
                path: '/search?q=formal-shirts',
                label: 'menu-formal-shirts',
              },
              {
                id: 4,
                path: '/search?q=blazwers-coats',
                label: 'menu-blazwers-coats',
              },
              {
                id: 5,
                path: '/search?q=suits',
                label: 'menu-suits',
              },
              {
                id: 6,
                path: '/search?q=jackets',
                label: 'menu-jackets',
              },
            ],
          },
          {
            id: 2,
            path: '/search?q=pizza-ugn',
            label: 'pizzaugn',
          },
          {
            id: 3,
            path: '/search?q=watches-wearables',
            label: 'menu-watches-wearables',
          },
          {
            id: 4,
            path: '/search?q=western-wear',
            label: 'menu-western-wear',
            subMenu: [
              {
                id: 1,
                path: '/search?q=dresses',
                label: 'menu-dresses',
              },
              {
                id: 2,
                path: '/search?q=jumpsuits',
                label: 'menu-jumpsuits',
              },
              {
                id: 3,
                path: '/search?q=tops-t-shirt',
                label: 'menu-tops-shirts',
              },
              {
                id: 4,
                path: '/search?q=shorts-skirts',
                label: 'menu-shorts-skirts',
              },
              {
                id: 5,
                path: '/search?q=shurgs',
                label: 'menu-shurgs',
              },
              {
                id: 6,
                path: '/search?q=blazers',
                label: 'menu-blazers',
              },
            ],
          },
          {
            id: 5,
            path: '/search?q=plus-size',
            label: 'menu-plus-size',
          },
          {
            id: 6,
            path: '/search?q=sunglasses-frames',
            label: 'menu-sunglasses-frames',
          },
          {
            id: 7,
            path: '/search?q=footwear',
            label: 'menu-footwear',
            subMenu: [
              {
                id: 1,
                path: '/search?q=flats',
                label: 'menu-flats',
              },
              {
                id: 2,
                path: '/search?q=casual-shoes',
                label: 'menu-casual-shoes',
              },
              {
                id: 3,
                path: '/search?q=heels',
                label: 'menu-heels',
              },
              {
                id: 4,
                path: '/search?q=boots',
                label: 'menu-boots',
              },
            ],
          },
          {
            id: 8,
            path: '/search?q=sports-active-wear',
            label: 'menu-sports-active-wear',
            subMenu: [
              {
                id: 1,
                path: '/search?q=clothing',
                label: 'menu-clothing',
              },
              {
                id: 2,
                path: '/search?q=footwear',
                label: 'menu-footwear',
              },
              {
                id: 3,
                path: '/search?q=sports-accessories',
                label: 'menu-sports-accessories',
              },
            ],
          },
          {
            id: 9,
            path: '/search?q=lingerie-sleepwear',
            label: 'menu-lingerie-sleepwear',
            subMenu: [
              {
                id: 1,
                path: '/search?q=bra',
                label: 'menu-bra',
              },
              {
                id: 2,
                path: '/search?q=briefs',
                label: 'menu-briefs',
              },
              {
                id: 3,
                path: '/search?q=sleepwear',
                label: 'menu-sleepwear',
              },
            ],
          },
          {
            id: 10,
            path: '/search?q=belt-scarves',
            label: 'menu-belt-scarves',
            subMenu: [
              {
                id: 1,
                path: '/search?q=makeup',
                label: 'menu-makeup',
              },
              {
                id: 2,
                path: '/search?q=skincare',
                label: 'menu-skincare',
              },
              {
                id: 3,
                path: '/search?q=premium-beauty',
                label: 'menu-premium-beauty',
              },
              {
                id: 4,
                path: '/search?q=lipsticks',
                label: 'menu-lipsticks',
              },
            ],
          },
          {
            id: 11,
            path: '/search?q=gadgets',
            label: 'menu-gadgets',
            subMenu: [
              {
                id: 1,
                path: '/search?q=smart-wearables',
                label: 'menu-smart-wearables',
              },
              {
                id: 2,
                path: '/search?q=headphones',
                label: 'menu-headphones',
              },
            ],
          },
          {
            id: 12,
            path: '/search?q=jewellers',
            label: 'menu-jewellers',
            subMenu: [
              {
                id: 1,
                path: '/search?q=fashion-jewellers',
                label: 'menu-fashion-jewellers',
              },
              {
                id: 2,
                path: '/search?q=fine-jewellers',
                label: 'menu-fine-jewellers',
              },
            ],
          },
          {
            id: 13,
            path: '/search?q=backpacks',
            label: 'menu-backpacks',
          },
          {
            id: 14,
            path: '/search?q=handbags-wallets',
            label: 'menu-handbags-wallets',
          },
        ],
      },
      {
        id: 5,
        path: '/contact-us',
        label: 'menu-contact-us',
      }
    ], */,
    currencyMenu: [
      {
        id: 'se',
        name: 'Sverige',
        value: 'se',
        currency: 'SEK',
        icon: <SEFlag width="20px" height="15px" />,
      },
      {
        id: 'ax',
        name: 'Åland',
        value: 'ax',
        currency: '€',
        icon: <AXFlag width="20px" height="15px" />,
      }
    ],
    languageMenu: [

      {
        id: 'en',
        name: 'English - EN',
        value: 'en',
        icon: <USFlag width="20px" height="15px" />,
      },

      {
        id: 'se',
        name: 'Svenska - SE',
        value: 'se',
        icon: <SEFlag width="20px" height="15px" />,
      }/* ,
      {
        id: 'de',
        name: 'Deutsch - DE',
        value: 'de',
        icon: <DEFlag width="20px" height="15px" />,
      },
      {
        id: 'he',
        name: 'rעברית - HE',
        value: 'he',
        icon: <ILFlag width="20px" height="15px" />,
      },
      {
        id: 'es',
        name: 'Español - ES',
        value: 'es',
        icon: <ESFlag width="20px" height="15px" />,
      },
      {
        id: 'ar',
        name: 'عربى - AR',
        value: 'ar',
        icon: <SAFlag width="20px" height="15px" />,
      },
      {
        id: 'zh',
        name: '中国人 - ZH',
        value: 'zh',
        icon: <CNFlag width="20px" height="15px" />,
      } */
    ],
    /*   categoryMenu: [
        {
          id: 1,
          path: '/',
          label: 'menu-womens-fashion',
          icon: <WomenIcon />,
          columns: [
            {
              id: 1,
              columnItems: [
                {
                  id: 1,
                  path: '/search?q=top-wear',
                  label: 'menu-top-wear',
                  columnItemItems: [
                    {
                      id: 1,
                      path: '/search?q=t-shirt',
                      label: 'menu-kranar',
                    },
                    {
                      id: 2,
                      path: '/search?q=casual-shirts',
                      label: 'menu-casual-shirts',
                    },
                    {
                      id: 3,
                      path: '/search?q=formal-shirts',
                      label: 'menu-formal-shirts',
                    },
                    {
                      id: 4,
                      path: '/search?q=blazwers-coats',
                      label: 'menu-blazwers-coats',
                    },
                    {
                      id: 5,
                      path: '/search?q=suits',
                      label: 'menu-suits',
                    },
                    {
                      id: 6,
                      path: '/search?q=jackets',
                      label: 'menu-jackets',
                    },
                  ],
                },
                {
                  id: 2,
                  path: '/search?q=belt-scarves',
                  label: 'menu-belt-scarves',
                },
                {
                  id: 3,
                  path: '/search?q=watches-wearables',
                  label: 'menu-watches-wearables',
                },
              ],
            },
            {
              id: 2,
              columnItems: [
                {
                  id: 1,
                  path: '/search?q=western-wear',
                  label: 'menu-western-wear',
                  columnItemItems: [
                    {
                      id: 1,
                      path: '/search?q=dresses',
                      label: 'menu-dresses',
                    },
                    {
                      id: 2,
                      path: '/search?q=jumpsuits',
                      label: 'menu-jumpsuits',
                    },
                    {
                      id: 3,
                      path: '/search?q=tops-t-shirt',
                      label: 'menu-tops-shirts',
                    },
                    {
                      id: 4,
                      path: '/search?q=shorts-skirts',
                      label: 'menu-shorts-skirts',
                    },
                    {
                      id: 5,
                      path: '/search?q=shurgs',
                      label: 'menu-shurgs',
                    },
                    {
                      id: 6,
                      path: '/search?q=blazers',
                      label: 'menu-blazers',
                    },
                  ],
                },
                {
                  id: 2,
                  path: '/search?q=plus-size',
                  label: 'menu-plus-size',
                },
                {
                  id: 3,
                  path: '/search?q=sunglasses-frames',
                  label: 'menu-sunglasses-frames',
                },
              ],
            },
            {
              id: 3,
              columnItems: [
                {
                  id: 1,
                  path: '/search?q=footwear',
                  label: 'menu-footwear',
                  columnItemItems: [
                    {
                      id: 1,
                      path: '/search?q=flats',
                      label: 'menu-flats',
                    },
                    {
                      id: 2,
                      path: '/search?q=casual-shoes',
                      label: 'menu-casual-shoes',
                    },
                    {
                      id: 3,
                      path: '/search?q=heels',
                      label: 'menu-heels',
                    },
                    {
                      id: 4,
                      path: '/search?q=boots',
                      label: 'menu-boots',
                    },
                  ],
                },
                {
                  id: 2,
                  path: '/search?q=sports-active-wear',
                  label: 'menu-sports-active-wear',
                  columnItemItems: [
                    {
                      id: 1,
                      path: '/search?q=clothing',
                      label: 'menu-clothing',
                    },
                    {
                      id: 2,
                      path: '/search?q=footwear',
                      label: 'menu-footwear',
                    },
                    {
                      id: 3,
                      path: '/search?q=sports-accessories',
                      label: 'menu-sports-accessories',
                    },
                  ],
                },
              ],
            },
          ],
          brands: [
            {
              id: 1,
              path: '/search?q=nike',
              label: 'nike',
              icon: Nike,
            },
            {
              id: 2,
              path: '/search?q=dior',
              label: 'dior',
              icon: Dior,
            },
            {
              id: 3,
              path: '/search?q=gucci',
              label: 'gucci',
              icon: Gucci,
            },
            {
              id: 4,
              path: '/search?q=gucci1',
              label: 'gucci1',
              icon: Gucci1,
            },
            {
              id: 5,
              path: '/search?q=puma',
              label: 'puma',
              icon: Puma,
            },
            {
              id: 6,
              path: '/search?q=levis',
              label: 'levis',
              icon: Levis,
            },
          ],
          banners: [
            {
              id: 1,
              path: '/search?q=winter',
              label: 'winter',
              image: Banner1,
            },
            {
              id: 2,
              path: '/search?q=summer',
              label: 'summer',
              image: Banner2,
            },
          ],
        },
        {
          id: 2,
          path: '/',
          label: 'menu-mens-fashion',
          icon: <MenIcon />,
          columns: [
            {
              id: 1,
              columnItems: [
                {
                  id: 1,
                  path: '/search?q=top-wear',
                  label: 'menu-top-wear',
                  columnItemItems: [
                    {
                      id: 1,
                      path: '/search?q=t-shirt',
                      label: 'menu-t-shirt',
                    },
                    {
                      id: 2,
                      path: '/search?q=casual-shirts',
                      label: 'menu-casual-shirts',
                    },
                    {
                      id: 3,
                      path: '/search?q=formal-shirts',
                      label: 'menu-formal-shirts',
                    },
                    {
                      id: 4,
                      path: '/search?q=blazwers-coats',
                      label: 'menu-blazwers-coats',
                    },
                    {
                      id: 5,
                      path: '/search?q=suits',
                      label: 'menu-suits',
                    },
                    {
                      id: 6,
                      path: '/search?q=jackets',
                      label: 'menu-jackets',
                    },
                  ],
                },
                {
                  id: 2,
                  path: '/search?q=belt-scarves',
                  label: 'menu-belt-scarves',
                },
                {
                  id: 3,
                  path: '/search?q=watches-wearables',
                  label: 'menu-watches-wearables',
                },
              ],
            },
            {
              id: 2,
              columnItems: [
                {
                  id: 1,
                  path: '/search?q=western-wear',
                  label: 'menu-western-wear',
                  columnItemItems: [
                    {
                      id: 1,
                      path: '/search?q=dresses',
                      label: 'menu-dresses',
                    },
                    {
                      id: 2,
                      path: '/search?q=jumpsuits',
                      label: 'menu-jumpsuits',
                    },
                    {
                      id: 3,
                      path: '/search?q=tops-t-shirt',
                      label: 'menu-tops-shirts',
                    },
                    {
                      id: 4,
                      path: '/search?q=shorts-skirts',
                      label: 'menu-shorts-skirts',
                    },
                    {
                      id: 5,
                      path: '/search?q=shurgs',
                      label: 'menu-shurgs',
                    },
                    {
                      id: 6,
                      path: '/search?q=blazers',
                      label: 'menu-blazers',
                    },
                  ],
                },
                {
                  id: 2,
                  path: '/search?q=plus-size',
                  label: 'menu-plus-size',
                },
                {
                  id: 3,
                  path: '/search?q=sunglasses-frames',
                  label: 'menu-sunglasses-frames',
                },
              ],
            },
            {
              id: 3,
              columnItems: [
                {
                  id: 1,
                  path: '/search?q=footwear',
                  label: 'menu-footwear',
                  columnItemItems: [
                    {
                      id: 1,
                      path: '/search?q=flats',
                      label: 'menu-flats',
                    },
                    {
                      id: 2,
                      path: '/search?q=casual-shoes',
                      label: 'menu-casual-shoes',
                    },
                    {
                      id: 3,
                      path: '/search?q=heels',
                      label: 'menu-heels',
                    },
                    {
                      id: 4,
                      path: '/search?q=boots',
                      label: 'menu-boots',
                    },
                  ],
                },
                {
                  id: 2,
                  path: '/search?q=sports-active-wear',
                  label: 'menu-sports-active-wear',
                  columnItemItems: [
                    {
                      id: 1,
                      path: '/search?q=clothing',
                      label: 'menu-clothing',
                    },
                    {
                      id: 2,
                      path: '/search?q=footwear',
                      label: 'menu-footwear',
                    },
                    {
                      id: 3,
                      path: '/search?q=sports-accessories',
                      label: 'menu-sports-accessories',
                    },
                  ],
                },
              ],
            },
          ],
          brands: [
            {
              id: 1,
              path: '/search?q=nike',
              label: 'nike',
              icon: Nike,
            },
            {
              id: 2,
              path: '/search?q=dior',
              label: 'dior',
              icon: Dior,
            },
            {
              id: 3,
              path: '/search?q=gucci',
              label: 'gucci',
              icon: Gucci,
            },
            {
              id: 4,
              path: '/search?q=gucci1',
              label: 'gucci1',
              icon: Gucci1,
            },
            {
              id: 5,
              path: '/search?q=puma',
              label: 'puma',
              icon: Puma,
            },
            {
              id: 6,
              path: '/search?q=levis',
              label: 'levis',
              icon: Levis,
            },
          ],
          banners: [
            {
              id: 1,
              path: '/search?q=winter',
              label: 'winter',
              image: Banner1,
            },
            {
              id: 2,
              path: '/search?q=summer',
              label: 'summer',
              image: Banner2,
            },
          ],
        },
        {
          id: 3,
          path: '/',
          label: 'menu-watches',
          icon: <WatchIcon />,
          columns: [
            {
              id: 1,
              columnItems: [
                {
                  id: 1,
                  path: '/search?q=top-wear',
                  label: 'menu-top-wear',
                  columnItemItems: [
                    {
                      id: 1,
                      path: '/search?q=t-shirt',
                      label: 'menu-t-shirt',
                    },
                    {
                      id: 2,
                      path: '/search?q=casual-shirts',
                      label: 'menu-casual-shirts',
                    },
                    {
                      id: 3,
                      path: '/search?q=formal-shirts',
                      label: 'menu-formal-shirts',
                    },
                    {
                      id: 4,
                      path: '/search?q=blazwers-coats',
                      label: 'menu-blazwers-coats',
                    },
                    {
                      id: 5,
                      path: '/search?q=suits',
                      label: 'menu-suits',
                    },
                    {
                      id: 6,
                      path: '/search?q=jackets',
                      label: 'menu-jackets',
                    },
                  ],
                },
                {
                  id: 2,
                  path: '/search?q=belt-scarves',
                  label: 'menu-belt-scarves',
                },
                {
                  id: 3,
                  path: '/search?q=watches-wearables',
                  label: 'menu-watches-wearables',
                },
              ],
            },
            {
              id: 2,
              columnItems: [
                {
                  id: 1,
                  path: '/search?q=western-wear',
                  label: 'menu-western-wear',
                  columnItemItems: [
                    {
                      id: 1,
                      path: '/search?q=dresses',
                      label: 'menu-dresses',
                    },
                    {
                      id: 2,
                      path: '/search?q=jumpsuits',
                      label: 'menu-jumpsuits',
                    },
                    {
                      id: 3,
                      path: '/search?q=tops-t-shirt',
                      label: 'menu-tops-shirts',
                    },
                    {
                      id: 4,
                      path: '/search?q=shorts-skirts',
                      label: 'menu-shorts-skirts',
                    },
                    {
                      id: 5,
                      path: '/search?q=shurgs',
                      label: 'menu-shurgs',
                    },
                    {
                      id: 6,
                      path: '/search?q=blazers',
                      label: 'menu-blazers',
                    },
                  ],
                },
                {
                  id: 2,
                  path: '/search?q=plus-size',
                  label: 'menu-plus-size',
                },
                {
                  id: 3,
                  path: '/search?q=sunglasses-frames',
                  label: 'menu-sunglasses-frames',
                },
              ],
            },
            {
              id: 3,
              columnItems: [
                {
                  id: 1,
                  path: '/search?q=footwear',
                  label: 'menu-footwear',
                  columnItemItems: [
                    {
                      id: 1,
                      path: '/search?q=flats',
                      label: 'menu-flats',
                    },
                    {
                      id: 2,
                      path: '/search?q=casual-shoes',
                      label: 'menu-casual-shoes',
                    },
                    {
                      id: 3,
                      path: '/search?q=heels',
                      label: 'menu-heels',
                    },
                    {
                      id: 4,
                      path: '/search?q=boots',
                      label: 'menu-boots',
                    },
                  ],
                },
                {
                  id: 2,
                  path: '/search?q=sports-active-wear',
                  label: 'menu-sports-active-wear',
                  columnItemItems: [
                    {
                      id: 1,
                      path: '/search?q=clothing',
                      label: 'menu-clothing',
                    },
                    {
                      id: 2,
                      path: '/search?q=footwear',
                      label: 'menu-footwear',
                    },
                    {
                      id: 3,
                      path: '/search?q=sports-accessories',
                      label: 'menu-sports-accessories',
                    },
                  ],
                },
              ],
            },
          ],
          brands: [
            {
              id: 1,
              path: '/search?q=nike',
              label: 'nike',
              icon: Nike,
            },
            {
              id: 2,
              path: '/search?q=dior',
              label: 'dior',
              icon: Dior,
            },
            {
              id: 3,
              path: '/search?q=gucci',
              label: 'gucci',
              icon: Gucci,
            },
            {
              id: 4,
              path: '/search?q=gucci1',
              label: 'gucci1',
              icon: Gucci1,
            },
            {
              id: 5,
              path: '/search?q=puma',
              label: 'puma',
              icon: Puma,
            },
            {
              id: 6,
              path: '/search?q=levis',
              label: 'levis',
              icon: Levis,
            },
          ],
          banners: [
            {
              id: 1,
              path: '/search?q=winter',
              label: 'winter',
              image: Banner1,
            },
            {
              id: 2,
              path: '/search?q=summer',
              label: 'summer',
              image: Banner2,
            },
          ],
        },
        {
          id: 4,
          path: '/',
          label: 'menu-wallets',
          icon: <WalletIcon />,
          columns: [
            {
              id: 1,
              columnItems: [
                {
                  id: 1,
                  path: '/search?q=top-wear',
                  label: 'menu-top-wear',
                  columnItemItems: [
                    {
                      id: 1,
                      path: '/search?q=t-shirt',
                      label: 'menu-t-shirt',
                    },
                    {
                      id: 2,
                      path: '/search?q=casual-shirts',
                      label: 'menu-casual-shirts',
                    },
                    {
                      id: 3,
                      path: '/search?q=formal-shirts',
                      label: 'menu-formal-shirts',
                    },
                    {
                      id: 4,
                      path: '/search?q=blazwers-coats',
                      label: 'menu-blazwers-coats',
                    },
                    {
                      id: 5,
                      path: '/search?q=suits',
                      label: 'menu-suits',
                    },
                    {
                      id: 6,
                      path: '/search?q=jackets',
                      label: 'menu-jackets',
                    },
                  ],
                },
                {
                  id: 2,
                  path: '/search?q=belt-scarves',
                  label: 'menu-belt-scarves',
                },
                {
                  id: 3,
                  path: '/search?q=watches-wearables',
                  label: 'menu-watches-wearables',
                },
              ],
            },
            {
              id: 2,
              columnItems: [
                {
                  id: 1,
                  path: '/search?q=western-wear',
                  label: 'menu-western-wear',
                  columnItemItems: [
                    {
                      id: 1,
                      path: '/search?q=dresses',
                      label: 'menu-dresses',
                    },
                    {
                      id: 2,
                      path: '/search?q=jumpsuits',
                      label: 'menu-jumpsuits',
                    },
                    {
                      id: 3,
                      path: '/search?q=tops-t-shirt',
                      label: 'menu-tops-shirts',
                    },
                    {
                      id: 4,
                      path: '/search?q=shorts-skirts',
                      label: 'menu-shorts-skirts',
                    },
                    {
                      id: 5,
                      path: '/search?q=shurgs',
                      label: 'menu-shurgs',
                    },
                    {
                      id: 6,
                      path: '/search?q=blazers',
                      label: 'menu-blazers',
                    },
                  ],
                },
                {
                  id: 2,
                  path: '/search?q=plus-size',
                  label: 'menu-plus-size',
                },
                {
                  id: 3,
                  path: '/search?q=sunglasses-frames',
                  label: 'menu-sunglasses-frames',
                },
              ],
            },
            {
              id: 3,
              columnItems: [
                {
                  id: 1,
                  path: '/search?q=footwear',
                  label: 'menu-footwear',
                  columnItemItems: [
                    {
                      id: 1,
                      path: '/search?q=flats',
                      label: 'menu-flats',
                    },
                    {
                      id: 2,
                      path: '/search?q=casual-shoes',
                      label: 'menu-casual-shoes',
                    },
                    {
                      id: 3,
                      path: '/search?q=heels',
                      label: 'menu-heels',
                    },
                    {
                      id: 4,
                      path: '/search?q=boots',
                      label: 'menu-boots',
                    },
                  ],
                },
                {
                  id: 2,
                  path: '/search?q=sports-active-wear',
                  label: 'menu-sports-active-wear',
                  columnItemItems: [
                    {
                      id: 1,
                      path: '/search?q=clothing',
                      label: 'menu-clothing',
                    },
                    {
                      id: 2,
                      path: '/search?q=footwear',
                      label: 'menu-footwear',
                    },
                    {
                      id: 3,
                      path: '/search?q=sports-accessories',
                      label: 'menu-sports-accessories',
                    },
                  ],
                },
              ],
            },
          ],
          brands: [
            {
              id: 1,
              path: '/search?q=nike',
              label: 'nike',
              icon: Nike,
            },
            {
              id: 2,
              path: '/search?q=dior',
              label: 'dior',
              icon: Dior,
            },
            {
              id: 3,
              path: '/search?q=gucci',
              label: 'gucci',
              icon: Gucci,
            },
            {
              id: 4,
              path: '/search?q=gucci1',
              label: 'gucci1',
              icon: Gucci1,
            },
            {
              id: 5,
              path: '/search?q=puma',
              label: 'puma',
              icon: Puma,
            },
            {
              id: 6,
              path: '/search?q=levis',
              label: 'levis',
              icon: Levis,
            },
          ],
          banners: [
            {
              id: 1,
              path: '/search?q=winter',
              label: 'winter',
              image: Banner1,
            },
            {
              id: 2,
              path: '/search?q=summer',
              label: 'summer',
              image: Banner2,
            },
          ],
        },
        {
          id: 5,
          path: '/',
          label: 'menu-bags',
          icon: <BagIcon />,
          columns: [
            {
              id: 1,
              columnItems: [
                {
                  id: 1,
                  path: '/search?q=top-wear',
                  label: 'menu-top-wear',
                  columnItemItems: [
                    {
                      id: 1,
                      path: '/search?q=t-shirt',
                      label: 'menu-t-shirt',
                    },
                    {
                      id: 2,
                      path: '/search?q=casual-shirts',
                      label: 'menu-casual-shirts',
                    },
                    {
                      id: 3,
                      path: '/search?q=formal-shirts',
                      label: 'menu-formal-shirts',
                    },
                    {
                      id: 4,
                      path: '/search?q=blazwers-coats',
                      label: 'menu-blazwers-coats',
                    },
                    {
                      id: 5,
                      path: '/search?q=suits',
                      label: 'menu-suits',
                    },
                    {
                      id: 6,
                      path: '/search?q=jackets',
                      label: 'menu-jackets',
                    },
                  ],
                },
                {
                  id: 2,
                  path: '/search?q=belt-scarves',
                  label: 'menu-belt-scarves',
                },
                {
                  id: 3,
                  path: '/search?q=watches-wearables',
                  label: 'menu-watches-wearables',
                },
              ],
            },
            {
              id: 2,
              columnItems: [
                {
                  id: 1,
                  path: '/search?q=western-wear',
                  label: 'menu-western-wear',
                  columnItemItems: [
                    {
                      id: 1,
                      path: '/search?q=dresses',
                      label: 'menu-dresses',
                    },
                    {
                      id: 2,
                      path: '/search?q=jumpsuits',
                      label: 'menu-jumpsuits',
                    },
                    {
                      id: 3,
                      path: '/search?q=tops-t-shirt',
                      label: 'menu-tops-shirts',
                    },
                    {
                      id: 4,
                      path: '/search?q=shorts-skirts',
                      label: 'menu-shorts-skirts',
                    },
                    {
                      id: 5,
                      path: '/search?q=shurgs',
                      label: 'menu-shurgs',
                    },
                    {
                      id: 6,
                      path: '/search?q=blazers',
                      label: 'menu-blazers',
                    },
                  ],
                },
                {
                  id: 2,
                  path: '/search?q=plus-size',
                  label: 'menu-plus-size',
                },
                {
                  id: 3,
                  path: '/search?q=sunglasses-frames',
                  label: 'menu-sunglasses-frames',
                },
              ],
            },
            {
              id: 3,
              columnItems: [
                {
                  id: 1,
                  path: '/search?q=footwear',
                  label: 'menu-footwear',
                  columnItemItems: [
                    {
                      id: 1,
                      path: '/search?q=flats',
                      label: 'menu-flats',
                    },
                    {
                      id: 2,
                      path: '/search?q=casual-shoes',
                      label: 'menu-casual-shoes',
                    },
                    {
                      id: 3,
                      path: '/search?q=heels',
                      label: 'menu-heels',
                    },
                    {
                      id: 4,
                      path: '/search?q=boots',
                      label: 'menu-boots',
                    },
                  ],
                },
                {
                  id: 2,
                  path: '/search?q=sports-active-wear',
                  label: 'menu-sports-active-wear',
                  columnItemItems: [
                    {
                      id: 1,
                      path: '/search?q=clothing',
                      label: 'menu-clothing',
                    },
                    {
                      id: 2,
                      path: '/search?q=footwear',
                      label: 'menu-footwear',
                    },
                    {
                      id: 3,
                      path: '/search?q=sports-accessories',
                      label: 'menu-sports-accessories',
                    },
                  ],
                },
              ],
            },
          ],
          brands: [
            {
              id: 1,
              path: '/search?q=nike',
              label: 'nike',
              icon: Nike,
            },
            {
              id: 2,
              path: '/search?q=dior',
              label: 'dior',
              icon: Dior,
            },
            {
              id: 3,
              path: '/search?q=gucci',
              label: 'gucci',
              icon: Gucci,
            },
            {
              id: 4,
              path: '/search?q=gucci1',
              label: 'gucci1',
              icon: Gucci1,
            },
            {
              id: 5,
              path: '/search?q=puma',
              label: 'puma',
              icon: Puma,
            },
            {
              id: 6,
              path: '/search?q=levis',
              label: 'levis',
              icon: Levis,
            },
          ],
          banners: [
            {
              id: 1,
              path: '/search?q=winter',
              label: 'winter',
              image: Banner1,
            },
            {
              id: 2,
              path: '/search?q=summer',
              label: 'summer',
              image: Banner2,
            },
          ],
        },
        {
          id: 6,
          path: '/',
          label: 'menu-jewelry',
          icon: <JewelryIcon />,
          columns: [
            {
              id: 1,
              columnItems: [
                {
                  id: 1,
                  path: '/search?q=top-wear',
                  label: 'menu-top-wear',
                  columnItemItems: [
                    {
                      id: 1,
                      path: '/search?q=t-shirt',
                      label: 'menu-t-shirt',
                    },
                    {
                      id: 2,
                      path: '/search?q=casual-shirts',
                      label: 'menu-casual-shirts',
                    },
                    {
                      id: 3,
                      path: '/search?q=formal-shirts',
                      label: 'menu-formal-shirts',
                    },
                    {
                      id: 4,
                      path: '/search?q=blazwers-coats',
                      label: 'menu-blazwers-coats',
                    },
                    {
                      id: 5,
                      path: '/search?q=suits',
                      label: 'menu-suits',
                    },
                    {
                      id: 6,
                      path: '/search?q=jackets',
                      label: 'menu-jackets',
                    },
                  ],
                },
                {
                  id: 2,
                  path: '/search?q=belt-scarves',
                  label: 'menu-belt-scarves',
                },
                {
                  id: 3,
                  path: '/search?q=watches-wearables',
                  label: 'menu-watches-wearables',
                },
              ],
            },
            {
              id: 2,
              columnItems: [
                {
                  id: 1,
                  path: '/search?q=western-wear',
                  label: 'menu-western-wear',
                  columnItemItems: [
                    {
                      id: 1,
                      path: '/search?q=dresses',
                      label: 'menu-dresses',
                    },
                    {
                      id: 2,
                      path: '/search?q=jumpsuits',
                      label: 'menu-jumpsuits',
                    },
                    {
                      id: 3,
                      path: '/search?q=tops-t-shirt',
                      label: 'menu-tops-shirts',
                    },
                    {
                      id: 4,
                      path: '/search?q=shorts-skirts',
                      label: 'menu-shorts-skirts',
                    },
                    {
                      id: 5,
                      path: '/search?q=shurgs',
                      label: 'menu-shurgs',
                    },
                    {
                      id: 6,
                      path: '/search?q=blazers',
                      label: 'menu-blazers',
                    },
                  ],
                },
                {
                  id: 2,
                  path: '/search?q=plus-size',
                  label: 'menu-plus-size',
                },
                {
                  id: 3,
                  path: '/search?q=sunglasses-frames',
                  label: 'menu-sunglasses-frames',
                },
              ],
            },
            {
              id: 3,
              columnItems: [
                {
                  id: 1,
                  path: '/search?q=footwear',
                  label: 'menu-footwear',
                  columnItemItems: [
                    {
                      id: 1,
                      path: '/search?q=flats',
                      label: 'menu-flats',
                    },
                    {
                      id: 2,
                      path: '/search?q=casual-shoes',
                      label: 'menu-casual-shoes',
                    },
                    {
                      id: 3,
                      path: '/search?q=heels',
                      label: 'menu-heels',
                    },
                    {
                      id: 4,
                      path: '/search?q=boots',
                      label: 'menu-boots',
                    },
                  ],
                },
                {
                  id: 2,
                  path: '/search?q=sports-active-wear',
                  label: 'menu-sports-active-wear',
                  columnItemItems: [
                    {
                      id: 1,
                      path: '/search?q=clothing',
                      label: 'menu-clothing',
                    },
                    {
                      id: 2,
                      path: '/search?q=footwear',
                      label: 'menu-footwear',
                    },
                    {
                      id: 3,
                      path: '/search?q=sports-accessories',
                      label: 'menu-sports-accessories',
                    },
                  ],
                },
              ],
            },
          ],
          brands: [
            {
              id: 1,
              path: '/search?q=nike',
              label: 'nike',
              icon: Nike,
            },
            {
              id: 2,
              path: '/search?q=dior',
              label: 'dior',
              icon: Dior,
            },
            {
              id: 3,
              path: '/search?q=gucci',
              label: 'gucci',
              icon: Gucci,
            },
            {
              id: 4,
              path: '/search?q=gucci1',
              label: 'gucci1',
              icon: Gucci1,
            },
            {
              id: 5,
              path: '/search?q=puma',
              label: 'puma',
              icon: Puma,
            },
            {
              id: 6,
              path: '/search?q=levis',
              label: 'levis',
              icon: Levis,
            },
          ],
          banners: [
            {
              id: 1,
              path: '/search?q=winter',
              label: 'winter',
              image: Banner1,
            },
            {
              id: 2,
              path: '/search?q=summer',
              label: 'summer',
              image: Banner2,
            },
          ],
        },
        {
          id: 7,
          path: '/',
          label: 'menu-sunglasses',
          icon: <SunglassIcon />,
          columns: [
            {
              id: 1,
              columnItems: [
                {
                  id: 1,
                  path: '/search?q=top-wear',
                  label: 'menu-top-wear',
                  columnItemItems: [
                    {
                      id: 1,
                      path: '/search?q=t-shirt',
                      label: 'menu-t-shirt',
                    },
                    {
                      id: 2,
                      path: '/search?q=casual-shirts',
                      label: 'menu-casual-shirts',
                    },
                    {
                      id: 3,
                      path: '/search?q=formal-shirts',
                      label: 'menu-formal-shirts',
                    },
                    {
                      id: 4,
                      path: '/search?q=blazwers-coats',
                      label: 'menu-blazwers-coats',
                    },
                    {
                      id: 5,
                      path: '/search?q=suits',
                      label: 'menu-suits',
                    },
                    {
                      id: 6,
                      path: '/search?q=jackets',
                      label: 'menu-jackets',
                    },
                  ],
                },
                {
                  id: 2,
                  path: '/search?q=belt-scarves',
                  label: 'menu-belt-scarves',
                },
                {
                  id: 3,
                  path: '/search?q=watches-wearables',
                  label: 'menu-watches-wearables',
                },
              ],
            },
            {
              id: 2,
              columnItems: [
                {
                  id: 1,
                  path: '/search?q=western-wear',
                  label: 'menu-western-wear',
                  columnItemItems: [
                    {
                      id: 1,
                      path: '/search?q=dresses',
                      label: 'menu-dresses',
                    },
                    {
                      id: 2,
                      path: '/search?q=jumpsuits',
                      label: 'menu-jumpsuits',
                    },
                    {
                      id: 3,
                      path: '/search?q=tops-t-shirt',
                      label: 'menu-tops-shirts',
                    },
                    {
                      id: 4,
                      path: '/search?q=shorts-skirts',
                      label: 'menu-shorts-skirts',
                    },
                    {
                      id: 5,
                      path: '/search?q=shurgs',
                      label: 'menu-shurgs',
                    },
                    {
                      id: 6,
                      path: '/search?q=blazers',
                      label: 'menu-blazers',
                    },
                  ],
                },
                {
                  id: 2,
                  path: '/search?q=plus-size',
                  label: 'menu-plus-size',
                },
                {
                  id: 3,
                  path: '/search?q=sunglasses-frames',
                  label: 'menu-sunglasses-frames',
                },
              ],
            },
            {
              id: 3,
              columnItems: [
                {
                  id: 1,
                  path: '/search?q=footwear',
                  label: 'menu-footwear',
                  columnItemItems: [
                    {
                      id: 1,
                      path: '/search?q=flats',
                      label: 'menu-flats',
                    },
                    {
                      id: 2,
                      path: '/search?q=casual-shoes',
                      label: 'menu-casual-shoes',
                    },
                    {
                      id: 3,
                      path: '/search?q=heels',
                      label: 'menu-heels',
                    },
                    {
                      id: 4,
                      path: '/search?q=boots',
                      label: 'menu-boots',
                    },
                  ],
                },
                {
                  id: 2,
                  path: '/search?q=sports-active-wear',
                  label: 'menu-sports-active-wear',
                  columnItemItems: [
                    {
                      id: 1,
                      path: '/search?q=clothing',
                      label: 'menu-clothing',
                    },
                    {
                      id: 2,
                      path: '/search?q=footwear',
                      label: 'menu-footwear',
                    },
                    {
                      id: 3,
                      path: '/search?q=sports-accessories',
                      label: 'menu-sports-accessories',
                    },
                  ],
                },
              ],
            },
          ],
          brands: [
            {
              id: 1,
              path: '/search?q=nike',
              label: 'nike',
              icon: Nike,
            },
            {
              id: 2,
              path: '/search?q=dior',
              label: 'dior',
              icon: Dior,
            },
            {
              id: 3,
              path: '/search?q=gucci',
              label: 'gucci',
              icon: Gucci,
            },
            {
              id: 4,
              path: '/search?q=gucci1',
              label: 'gucci1',
              icon: Gucci1,
            },
            {
              id: 5,
              path: '/search?q=puma',
              label: 'puma',
              icon: Puma,
            },
            {
              id: 6,
              path: '/search?q=levis',
              label: 'levis',
              icon: Levis,
            },
          ],
          banners: [
            {
              id: 1,
              path: '/search?q=winter',
              label: 'winter',
              image: Banner1,
            },
            {
              id: 2,
              path: '/search?q=summer',
              label: 'summer',
              image: Banner2,
            },
          ],
        },
        {
          id: 8,
          path: '/',
          label: 'menu-sneakers',
          icon: <SneakerIcon />,
          columns: [
            {
              id: 1,
              columnItems: [
                {
                  id: 1,
                  path: '/search?q=top-wear',
                  label: 'menu-top-wear',
                  columnItemItems: [
                    {
                      id: 1,
                      path: '/search?q=t-shirt',
                      label: 'menu-t-shirt',
                    },
                    {
                      id: 2,
                      path: '/search?q=casual-shirts',
                      label: 'menu-casual-shirts',
                    },
                    {
                      id: 3,
                      path: '/search?q=formal-shirts',
                      label: 'menu-formal-shirts',
                    },
                    {
                      id: 4,
                      path: '/search?q=blazwers-coats',
                      label: 'menu-blazwers-coats',
                    },
                    {
                      id: 5,
                      path: '/search?q=suits',
                      label: 'menu-suits',
                    },
                    {
                      id: 6,
                      path: '/search?q=jackets',
                      label: 'menu-jackets',
                    },
                  ],
                },
                {
                  id: 2,
                  path: '/search?q=belt-scarves',
                  label: 'menu-belt-scarves',
                },
                {
                  id: 3,
                  path: '/search?q=watches-wearables',
                  label: 'menu-watches-wearables',
                },
              ],
            },
            {
              id: 2,
              columnItems: [
                {
                  id: 1,
                  path: '/search?q=western-wear',
                  label: 'menu-western-wear',
                  columnItemItems: [
                    {
                      id: 1,
                      path: '/search?q=dresses',
                      label: 'menu-dresses',
                    },
                    {
                      id: 2,
                      path: '/search?q=jumpsuits',
                      label: 'menu-jumpsuits',
                    },
                    {
                      id: 3,
                      path: '/search?q=tops-t-shirt',
                      label: 'menu-tops-shirts',
                    },
                    {
                      id: 4,
                      path: '/search?q=shorts-skirts',
                      label: 'menu-shorts-skirts',
                    },
                    {
                      id: 5,
                      path: '/search?q=shurgs',
                      label: 'menu-shurgs',
                    },
                    {
                      id: 6,
                      path: '/search?q=blazers',
                      label: 'menu-blazers',
                    },
                  ],
                },
                {
                  id: 2,
                  path: '/search?q=plus-size',
                  label: 'menu-plus-size',
                },
                {
                  id: 3,
                  path: '/search?q=sunglasses-frames',
                  label: 'menu-sunglasses-frames',
                },
              ],
            },
            {
              id: 3,
              columnItems: [
                {
                  id: 1,
                  path: '/search?q=footwear',
                  label: 'menu-footwear',
                  columnItemItems: [
                    {
                      id: 1,
                      path: '/search?q=flats',
                      label: 'menu-flats',
                    },
                    {
                      id: 2,
                      path: '/search?q=casual-shoes',
                      label: 'menu-casual-shoes',
                    },
                    {
                      id: 3,
                      path: '/search?q=heels',
                      label: 'menu-heels',
                    },
                    {
                      id: 4,
                      path: '/search?q=boots',
                      label: 'menu-boots',
                    },
                  ],
                },
                {
                  id: 2,
                  path: '/search?q=sports-active-wear',
                  label: 'menu-sports-active-wear',
                  columnItemItems: [
                    {
                      id: 1,
                      path: '/search?q=clothing',
                      label: 'menu-clothing',
                    },
                    {
                      id: 2,
                      path: '/search?q=footwear',
                      label: 'menu-footwear',
                    },
                    {
                      id: 3,
                      path: '/search?q=sports-accessories',
                      label: 'menu-sports-accessories',
                    },
                  ],
                },
              ],
            },
          ],
          brands: [
            {
              id: 1,
              path: '/search?q=nike',
              label: 'nike',
              icon: Nike,
            },
            {
              id: 2,
              path: '/search?q=dior',
              label: 'dior',
              icon: Dior,
            },
            {
              id: 3,
              path: '/search?q=gucci',
              label: 'gucci',
              icon: Gucci,
            },
            {
              id: 4,
              path: '/search?q=gucci1',
              label: 'gucci1',
              icon: Gucci1,
            },
            {
              id: 5,
              path: '/search?q=puma',
              label: 'puma',
              icon: Puma,
            },
            {
              id: 6,
              path: '/search?q=levis',
              label: 'levis',
              icon: Levis,
            },
          ],
          banners: [
            {
              id: 1,
              path: '/search?q=winter',
              label: 'winter',
              image: Banner1,
            },
            {
              id: 2,
              path: '/search?q=summer',
              label: 'summer',
              image: Banner2,
            },
          ],
        },
      ], */
    pagesMenu: [
      {
        id: 1,
        path: '/search',
        label: 'menu-deals-today',
        icon: <ThunderIcon className="w-3 h-auto" />,
      },
      {
        id: 2,
        path: '/',
        label: 'menu-offers',
      },
      {
        id: 3,
        path: '/faq',
        label: 'menu-faq',
      },
      {
        id: 4,
        path: '/contact-us',
        label: 'menu-contact',
      },
    ],
  },

};
