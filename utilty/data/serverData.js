import booking from '../../src/assets/imgs/bookings/booking.webp'
import booking1 from '../../src/assets/imgs/bookings/booking1.jpg'
import booking2 from '../../src/assets/imgs/bookings/booking2.jpg'
import booking3 from '../../src/assets/imgs/bookings/booking3.webp'





export const PRODUCTS = [
  {
    id: 'curl-cream',
    name: 'Curl Enhancing Cream',
    type: 'hair',
    forHairType: ['curly'],
    tags: ['moisturizing', 'styling'],
    description: 'Defines curls and reduces frizz.',
  },
  {
    id: 'scalp-serum',
    name: 'Hydrating Scalp Serum',
    type: 'hair',
    forScalp: ['dry'],
    tags: ['treatment', 'hydrating'],
    description: 'Soothes dry scalp and reduces itching.',
  },
  {
    id: 'rose-toner',
    name: 'Rose Water Toner',
    type: 'skin',
    forSkinTone: ['medium', 'light'],
    tags: ['hydrating', 'floral'],
    description: 'Refreshes and tones the skin with a floral scent.',
  },
  // Add more real products here
];



export const SERVICES = [
        {
            bgImage:booking,
            title:'Hair Styling Services',
            minServices:[
                {
                    name:'Blowout',
                    price:'From 20 to 80 £'
                },
                {
                    name:'Haircut and Trim',
                    price:'From 20 to 80 £'
                },
                {
                    name:'Updo Styling',
                    price:'From 20 to 80 £'
                },
                {
                    name:'Braiding Services',
                    price:'From 20 to 80 £'
                },
                {
                    name:'Flat Iron',
                    price:'From 20 to 80 £'
                }
            ]
        },{
            bgImage:booking1,
            title:'Make-up Services',
            minServices:[
                {
                    name:'Bridal Make-up,Event/Party Make-up',
                    price:'From 20 to 80 £'
                },
                {
                    name:'Natural/Day Make-up',
                    price:'From 20 to 80 £'
                },
                {
                    name:'Editorial/Photoshoot Make-up',
                    price:'From 20 to 80 £'
                },
                {
                    name:'Make-up Lessons',
                    price:'From 20 to 80 £'
                }
            ]
        },{
            bgImage:booking2,
            title:'Cosmetics Services',
            minServices:[
                {
                    name:'Facials',
                    price:'From 20 to 80 £'
                },
                {
                    name:'Chemical Peels',
                    price:'From 20 to 80 £'
                },
                {
                    name:'Microdermabrasion',
                    price:'From 20 to 80 £'
                },
                {
                    name:'Eyebrow Shaping & Tinting',
                    price:'From 20 to 80 £'
                },
                {
                    name:'Eyelash Extensions',
                    price:'From 20 to 80 £'
                }
            ]
        },{
            bgImage:booking3,
            title:'Luxury Self-Care Services',
            minServices:[
                {
                    name:'Skin Rejuvenation Treatments',
                    price:'From 20 to 80 £'
                },
                {
                    name:'Teeth Whitening',
                    price:'From 20 to 80 £'
                },
                {
                    name:'Makeup Lessons',
                    price:'From 20 to 80 £'
                },
                {
                    name:'Scalp Treatments',
                    price:'From 20 to 80 £'
                },
                {
                    name:'Anti-Aging Facials',
                    price:'From 20 to 80 £'
                }
            ]
        }
    ]