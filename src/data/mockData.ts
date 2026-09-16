import { EmotionOption, StoryItem, GuideProfile, GuideReel, StoryCollection, SoloMatchUser, BadgeItem, ComicJournal, TripPlan } from '../types';

export const EMOTIONS: EmotionOption[] = [
  {
    id: 'Awed',
    label: 'Awed',
    subtext: 'Breathtaking architecture & grand history',
    icon: 'auto_awesome',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80',
    color: '#942e02'
  },
  {
    id: 'Spooked',
    label: 'Spooked',
    subtext: 'Cursed ruins, haunted forts & eerie folklore',
    icon: 'dark_mode',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80',
    color: '#3d2645'
  },
  {
    id: 'Enlightened',
    label: 'Enlightened',
    subtext: 'Ancient rituals, temples & sacred rivers',
    icon: 'self_improvement',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=600&q=80',
    color: '#735c00'
  },
  {
    id: 'Connected',
    label: 'Connected',
    subtext: 'Artisan guilds, village homestays & folk lore',
    icon: 'diversity_3',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=80',
    color: '#b5451b'
  },
  {
    id: 'Adventurous',
    label: 'Adventurous',
    subtext: 'Living root bridges, desert trails & hidden caves',
    icon: 'explore',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80',
    color: '#2e5a44'
  },
  {
    id: 'Nostalgic',
    label: 'Nostalgic',
    subtext: 'Old royal recipes, heritage trains & timeless alleys',
    icon: 'history_edu',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
    color: '#695c51'
  }
];

export const STORIES: StoryItem[] = [
  {
    id: 'chand-baori',
    title: 'The Geometry of Silence: Descent into Chand Baori',
    subtitle: 'A 1,000-year-old subterranean labyrinth designed to trap water, shade, and eternity.',
    location: 'Abhaneri, Rajasthan',
    state: 'Rajasthan',
    category: 'historical',
    emotionTags: ['Awed', 'Spooked'],
    heroImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=85',
    rating: 4.95,
    reviewsCount: 142,
    duration: '3.5 Hours',
    groupSize: 'Max 6 Explorers',
    languages: ['English', 'Hindi', 'Marwari'],
    price: 120,
    authorGuide: {
      name: 'Elias Thorne',
      title: 'Architectural Historian & 15-Yr Heritage Guide',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      badge: 'Master Storyteller',
      rating: 4.98
    },
    dropCapStory: {
      dropLetter: 'B',
      firstParagraph: 'eneath the arid Thar dust in the tiny forgotten village of Abhaneri lies an inverted pyramid of 3,500 narrow steps. Built in the 9th century by King Chanda of the Nikumbha Dynasty, Chand Baori was engineered not merely for survival, but as a temple of water where the air cools by five degrees for every tier you descend.',
      secondParagraph: 'Local folklore whispers that spirits built the steps in a single moonless night so no mortal could retrieve a fallen coin. As shadows shift across the symmetrical stone steps, you realize you are standing at the intersection of celestial mathematics and subterranean devotion.',
      quote: '“To descend here is to shed the noise of the surface world, step by mathematical step.”'
    },
    sights: [
      {
        title: 'The 3,500 Steps',
        description: 'Perfect geometric terraces plunging 13 stories into emerald depths.',
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=500&q=80'
      },
      {
        title: 'Royal Pavilion & Jharokhas',
        description: 'Multi-tiered royal suites carved with sculptures of Ganesha and Mahishasuramardini.',
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=500&q=80'
      },
      {
        title: 'The Dark Waters',
        description: 'The sacred pool reflecting centuries of monsoons and celestial star alignments.',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=500&q=80'
      }
    ],
    timeline: [
      {
        time: '08:30 AM',
        title: 'Arrival at Abhaneri Village Gate',
        description: 'Morning chai with local potters and briefing on 9th-century hydro-engineering.',
        icon: 'local_cafe'
      },
      {
        time: '09:15 AM',
        title: 'The First Glimpse from Above',
        description: 'Deciphering the optical illusions of the step symmetry under early sun rays.',
        icon: 'visibility'
      },
      {
        time: '10:30 AM',
        title: 'The Subterranean Walk',
        description: 'Descending to the mid-tier pavilion to examine sacred stone inscriptions.',
        icon: 'stairs'
      },
      {
        time: '11:45 AM',
        title: 'Harshat Mata Temple & Village Folk Tales',
        description: 'Visiting the adjacent 10th-century ruins with traditional elder oral storytellers.',
        icon: 'temple_hindu'
      }
    ],
    inclusions: [
      'Certified Heritage Historian accompaniment',
      'Exclusive architectural blueprint & magnifying loupe',
      'Artisanal masala chai & organic saffron sweets',
      'All monument entry permissions & conservation permits'
    ],
    audioPreviewUrl: 'https://cdn.freesound.org/previews/518/518428_6142149-lq.mp3'
  },
  {
    id: 'bhangarh-ruins',
    title: 'The Whispers of the Abandoned Palace: Bhangarh',
    subtitle: 'The 16th-century royal capital cursed before sundown, preserved in stony silence.',
    location: 'Alwar, Rajasthan',
    state: 'Rajasthan',
    category: 'haunted',
    emotionTags: ['Spooked', 'Adventurous'],
    heroImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85',
    rating: 4.88,
    reviewsCount: 98,
    duration: '4 Hours',
    groupSize: 'Max 8 Explorers',
    languages: ['English', 'Hindi'],
    price: 95,
    authorGuide: {
      name: 'Maya Lin',
      title: 'Folklore Anthroplogist & Desert Explorer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      badge: 'Verified Explorer',
      rating: 4.95
    },
    dropCapStory: {
      dropLetter: 'S',
      firstParagraph: 'tanding at the foot of the Aravalli hills, the royal city of Bhangarh was founded in 1573. It was once a vibrant metropolis of banyan-shaded bazaars, perfumeries, and seven-tiered palaces until a sorcerer’s unrequited love and royal curse brought its overnight desertion.',
      secondParagraph: 'The Archaeological Survey of India forbids anyone to remain within the fort after sunset. By daylight, however, the ruined havelis whisper forgotten songs through the desert breeze.',
      quote: '“The ruins don’t hold ghosts; they hold memories too grand for modern walls.”'
    },
    sights: [
      {
        title: 'The Johari Bazaar Ruin',
        description: 'Cobblestone streets of ancient gem merchants overgrown with desert banyans.',
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=500&q=80'
      },
      {
        title: 'Gopinath Temple Sanctuary',
        description: 'Exquisite yellow sandstone carvings that survived undisturbed for four centuries.',
        image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=500&q=80'
      },
      {
        title: 'The Sorcerer’s Chhatri',
        description: 'The hill-crest pavilion overlooking the entire abandoned capital.',
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=500&q=80'
      }
    ],
    timeline: [
      {
        time: '02:00 PM',
        title: 'Gates of Bhangarh Entrance',
        description: 'Meeting Maya at the Hanuman temple gate with folklore manuscripts.',
        icon: 'meeting_room'
      },
      {
        time: '03:30 PM',
        title: 'Walking the Lost Street of Perfumers',
        description: 'Reading original court poetry detailing ancient trade routes.',
        icon: 'menu_book'
      },
      {
        time: '05:00 PM',
        title: 'Sunset at Gopinath Temple',
        description: 'Golden hour photography before dusk gates close strictly.',
        icon: 'wb_twilight'
      }
    ],
    inclusions: [
      'Folklore Anthropologist guide',
      'Safety escort with high-lumen torches',
      'Heritage map parchment keepsake',
      'Transportation from Alwar'
    ]
  },
  {
    id: 'jodhpur-blue-city',
    title: 'Secrets of the Blue City: Indigo & Brahmin Guilds',
    subtitle: 'Weaving through the sapphire-painted alleys of Mehrangarh’s medieval foothills.',
    location: 'Jodhpur, Rajasthan',
    state: 'Rajasthan',
    category: 'historical',
    emotionTags: ['Nostalgic', 'Connected', 'Awed'],
    heroImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=85',
    rating: 4.97,
    reviewsCount: 210,
    duration: '3 Hours',
    groupSize: 'Max 6 Explorers',
    languages: ['English', 'Hindi', 'French'],
    price: 85,
    authorGuide: {
      name: 'Rajesh Kumar',
      title: '7th-Gen Blue City Resident & Historian',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      badge: 'Guild Elder',
      rating: 4.96
    },
    dropCapStory: {
      dropLetter: 'I',
      firstParagraph: 'n the shadow of Mehrangarh Fort lies Navchokiya, a maze where every wall is dipped in copper sulfate and limestone blue. The color repels the desert heat, deters mosquitoes, and marks the homes of the royal astrologers.',
      secondParagraph: 'Walking these twisting stepped corridors with Rajesh, you meet 4th-generation tie-and-dye masters and drink saffron-spiced lassi prepared in earthen urns.',
      quote: '“Every blue door opens to a family whose ancestors cooked for the Maharajas.”'
    },
    sights: [
      {
        title: 'Navchokiya Secret Terraces',
        description: 'Rooftop vistas with uninterrupted panoramic views of the colossal fort wall.',
        image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=500&q=80'
      },
      {
        title: 'Toorji Ka Jhalra Stepwell',
        description: 'Vibrant restored 1740s water reservoir filled with local divers.',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=500&q=80'
      },
      {
        title: 'The Spice Merchant Guild',
        description: 'Mathania chili and wild desert cumin grinding stone mills.',
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=500&q=80'
      }
    ],
    timeline: [
      {
        time: '07:30 AM',
        title: 'Clock Tower Gathering',
        description: 'Starting with traditional Mishrilal saffron makhaniya lassi.',
        icon: 'local_cafe'
      },
      {
        time: '08:45 AM',
        title: 'The Indigo Alleys Walk',
        description: 'Discovering hidden stepwells and 200-year-old door carvings.',
        icon: 'directions_walk'
      },
      {
        time: '10:00 AM',
        title: 'Tea on a Brahmin Terrace',
        description: 'Enjoying freshly fried kachoris overlooking the azure cityscape.',
        icon: 'deck'
      }
    ],
    inclusions: [
      'Local 7th-gen guide companionship',
      'Artisanal tasting of 3 royal snacks',
      'Handcrafted miniature blue pottery tile souvenir'
    ]
  },
  {
    id: 'living-root-bridges',
    title: 'Bridges Woven from Roots: The Khasi Living Engineering',
    subtitle: 'Trekking into the rainforests of Meghalaya where trees are trained across gorges.',
    location: 'Cherrapunji, Meghalaya',
    state: 'Meghalaya',
    category: 'nature',
    emotionTags: ['Adventurous', 'Enlightened', 'Awed'],
    heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=85',
    rating: 4.99,
    reviewsCount: 165,
    duration: '6 Hours',
    groupSize: 'Max 4 Explorers',
    languages: ['English', 'Khasi', 'Hindi'],
    price: 145,
    authorGuide: {
      name: 'Maya Lin',
      title: 'Botanist & Rainforest Guide',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      badge: 'Eco Pioneer',
      rating: 5.0
    },
    dropCapStory: {
      dropLetter: 'F',
      firstParagraph: 'or centuries, the indigenous Khasi and Jaintia tribes of Meghalaya have nurtured Ficus elastica roots across roaring monsoon rivers. Unlike stone or concrete, these bridges grow stronger with time, enduring the heaviest rainfall on Earth for over 500 years.',
      secondParagraph: 'Walking across the double-decker root bridge of Nongriat is an initiation into how humanity can build in symbiotic harmony with wild nature.',
      quote: '“We do not construct our bridges; we whisper to the trees for two generations.”'
    },
    sights: [
      {
        title: 'The Double Decker Bridge',
        description: 'Two tiers of live fig tree roots straddling a crystal blue natural lagoon.',
        image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=500&q=80'
      },
      {
        title: 'Rainbow Falls Trail',
        description: 'Trekking through misty betel-nut groves where sunlight forms permanent prisms.',
        image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=500&q=80'
      },
      {
        title: 'Sacred Forest Grove',
        description: 'Centuries-old protected forest where picking a single leaf is forbidden by tribal law.',
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=500&q=80'
      }
    ],
    timeline: [
      {
        time: '06:30 AM',
        title: 'Tyrna Village Descent',
        description: 'Stepping down the 3,000 stone steps into the deep rainforest gorge.',
        icon: 'hiking'
      },
      {
        time: '09:00 AM',
        title: 'Nongriat Living Bridge Sanctuary',
        description: 'Observing the aerial root scaffolding and meeting local elder bridge keepers.',
        icon: 'nature'
      },
      {
        time: '11:30 AM',
        title: 'Natural Spring Swim & Bamboo Meal',
        description: 'Fresh organic rice and mountain greens cooked inside hollow bamboo.',
        icon: 'restaurant'
      }
    ],
    inclusions: [
      'Certified Khasi tribal naturalist guide',
      'Handcrafted bamboo trekking staff',
      'Organic tribal farm luncheon',
      'Forest conservation community levy'
    ]
  },
  {
    id: 'kerala-backwaters',
    title: 'Monsoon Magic in Kerala: Alleppey’s Ancient Waterways',
    subtitle: 'Gliding on wooden kettuvallams through emerald palm canals and spice ports.',
    location: 'Alleppey, Kerala',
    state: 'Kerala',
    category: 'nature',
    emotionTags: ['Nostalgic', 'Enlightened', 'Connected'],
    heroImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=85',
    rating: 4.93,
    reviewsCount: 184,
    duration: '5 Hours',
    groupSize: 'Max 6 Explorers',
    languages: ['English', 'Malayalam', 'Hindi'],
    price: 110,
    authorGuide: {
      name: 'Elias Thorne',
      title: 'Coastal Heritage & Spice Route Historian',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      badge: 'Master Storyteller',
      rating: 4.98
    },
    dropCapStory: {
      dropLetter: 'G',
      firstParagraph: 'entle ripples part as the wooden prow of a cedar-and-coir kettuvallam slips past floating lotus fields. In these labyrinthine canals below sea level, time has kept the rhythm of the tide for Roman, Arab, and Dutch spice traders alike.',
      secondParagraph: 'Hear the songs of the duck herders, learn the culinary alchemy of roasted pepper and fresh coconut milk, and watch kingfishers dive into the backwaters.',
      quote: '“On the backwaters, the river is both your road and your reflection.”'
    },
    sights: [
      {
        title: 'Kettuvallam Woodcraft Guild',
        description: 'Discovering how 100-foot boats are bound entirely by coconut fiber without a single nail.',
        image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=500&q=80'
      },
      {
        title: 'Paddy Fields Below Sea Level',
        description: 'The ancient Kuttanad farming marvel of cultivating rice four to ten feet below the sea.',
        image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=500&q=80'
      },
      {
        title: 'Toddy Tapper Groves',
        description: 'Climbing coconut palms at sunrise to collect fresh sweet palm nectar.',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=500&q=80'
      }
    ],
    timeline: [
      {
        time: '07:00 AM',
        title: 'Boarding the Traditional Cedar Boat',
        description: 'Morning tea with steamed banana cakes as mist lifts from the lagoons.',
        icon: 'sailing'
      },
      {
        time: '09:00 AM',
        title: 'Canal Village Walking Exchange',
        description: 'Visiting coir rope weavers and riverside spice gardens.',
        icon: 'cottage'
      },
      {
        time: '11:30 AM',
        title: 'Banana Leaf Sadhya Feast',
        description: 'Feasting on 14 traditional dishes cooked with river herbs and fresh grated coconut.',
        icon: 'restaurant_menu'
      }
    ],
    inclusions: [
      'Private traditional solar-assisted canoe',
      'Authentic banana leaf feast on board',
      'Fresh tender coconut refreshments',
      'Local backwater community tip fund'
    ]
  },
  {
    id: 'old-delhi-culinary',
    title: 'Street Food Chronicles: 400 Years of Old Delhi Flavors',
    subtitle: 'From Mughal royal kitchens to hidden haveli spice chambers in Chandni Chowk.',
    location: 'Old Delhi, Delhi',
    state: 'Delhi',
    category: 'culinary',
    emotionTags: ['Nostalgic', 'Connected', 'Adventurous'],
    heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=85',
    rating: 4.96,
    reviewsCount: 320,
    duration: '3.5 Hours',
    groupSize: 'Max 8 Explorers',
    languages: ['English', 'Hindi', 'Urdu'],
    price: 75,
    authorGuide: {
      name: 'Rajesh Kumar',
      title: 'Mughal Culinary Chronicler',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      badge: 'Culinary Master',
      rating: 4.96
    },
    dropCapStory: {
      dropLetter: 'W',
      firstParagraph: 'hen Emperor Shah Jahan founded Shahjahanabad in 1648, his daughter Jahanara designed Chandni Chowk with silver canals to reflect the moonlight. Along its winding gallis, the royal chefs perfected recipes that have survived ten generations.',
      secondParagraph: 'Taste the cloud-like Daulat ki Chaat that vanishes on the tongue, slow-simmered Nihari seasoned with 32 botanicals, and crispy jalebis fried in pure desi ghee.',
      quote: '“In Delhi, history isn’t found in museums; it is simmered in brass cauldrons.”'
    },
    sights: [
      {
        title: 'Khari Baoli Spice Rooftop',
        description: 'Asia’s largest wholesale spice market with chili dust clouds and red brick roofs.',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=500&q=80'
      },
      {
        title: 'Paranthe Wali Gali',
        description: 'Historic 1870s lane serving wood-fired stuffed breads with sweet pumpkin dip.',
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=500&q=80'
      },
      {
        title: 'Mirza Ghalib’s Haveli Courtyard',
        description: 'Reading Urdu poetry in the tranquil arched courtyard of Delhi’s greatest romantic poet.',
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=500&q=80'
      }
    ],
    timeline: [
      {
        time: '04:00 PM',
        title: 'Jama Masjid Gate 3 Meet',
        description: 'Starting with warm spiced butter tea and almond naan.',
        icon: 'mosque'
      },
      {
        time: '05:15 PM',
        title: 'Spice Market Rooftop Ascent',
        description: 'Overlooking the bustling streets while tasting raw green cardamom pods.',
        icon: 'landscape'
      },
      {
        time: '06:45 PM',
        title: 'The Royal Deg Cooking Demonstration',
        description: 'Witnessing 50-year master cooks tending copper pots sealed with dough.',
        icon: 'soup_kitchen'
      }
    ],
    inclusions: [
      '8 authentic culinary tasting courses',
      'Heritage cycle-rickshaw rides inside the alleyways',
      'Purified mineral water & herbal digestive paan',
      'Custom recipe booklet handwritten by chef families'
    ]
  }
];

export const GUIDES: GuideProfile[] = [
  {
    id: 'elias-thorne',
    name: 'Elias Thorne',
    title: 'Architectural Historian & 15-Yr Heritage Guide',
    location: 'Jaipur & Abhaneri, Rajasthan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    rating: 4.98,
    reviewsCount: 312,
    experienceYears: 15,
    languages: ['English', 'Hindi', 'Marwari', 'German'],
    specialty: 'Medieval Stepwells & Rajput Fort Architecture',
    bio: 'Specialist in 9th to 16th-century subterranean structures and celestial astronomy. Elias has authored two monographs on Rajasthani stepwells and leads immersive, poetic narrative walks.',
    badges: ['Master Storyteller', 'Women Safety Certified', 'Top Rated 2025', 'First Aid Certified'],
    pricePerDay: 150,
    reelCount: 4,
    hasReel: true,
    reels: [
      {
        id: 'reel-1',
        guideId: 'elias-thorne',
        guideName: 'Elias Thorne',
        guideAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        title: 'Why Chand Baori Drops 5 Degrees Every 10 Steps',
        location: 'Abhaneri, Rajasthan',
        quote: '“The ancient architects captured the winter wind and trapped it in stone shadows.”',
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=85',
        likes: 1842,
        tags: ['#Rajasthan', '#Stepwells', '#Architecture', '#Heritage'],
        duration: '0:45'
      },
      {
        id: 'reel-2',
        guideId: 'elias-thorne',
        guideName: 'Elias Thorne',
        guideAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        title: 'Decoding the Jharokha Carvings of Amber Palace',
        location: 'Amer, Jaipur',
        quote: '“Queens watched royal processions through 953 stone lattices without being seen.”',
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=85',
        likes: 2430,
        tags: ['#Jaipur', '#AmberFort', '#Rajputana'],
        duration: '1:10'
      }
    ]
  },
  {
    id: 'maya-lin',
    name: 'Maya Lin',
    title: 'Rainforest Botanist & Eco-Storyteller',
    location: 'Shillong & Cherrapunji, Meghalaya',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    rating: 5.0,
    reviewsCount: 189,
    experienceYears: 8,
    languages: ['English', 'Khasi', 'Hindi', 'Mandarin'],
    specialty: 'Living Root Bridges & Sacred Tribal Groves',
    bio: 'Botanist who lived 5 years with Khasi elders learning the oral botany of bio-engineering root bridges. Maya curates slow, sustainable expeditions through misty cloud forests.',
    badges: ['Eco Pioneer', 'Solo Women Friendly', 'Wilderness Responder'],
    pricePerDay: 135,
    reelCount: 3,
    hasReel: true,
    reels: [
      {
        id: 'reel-3',
        guideId: 'maya-lin',
        guideName: 'Maya Lin',
        guideAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        title: 'How Khasi Elders Guide Roots Across Roaring Rivers',
        location: 'Cherrapunji, Meghalaya',
        quote: '“A living bridge is not made for oneself; it is grown for one’s grandchildren.”',
        image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=85',
        likes: 3120,
        tags: ['#Meghalaya', '#LivingRootBridge', '#Ecology', '#TribalWisdom'],
        duration: '0:58'
      }
    ]
  },
  {
    id: 'rajesh-kumar',
    name: 'Rajesh Kumar',
    title: '7th-Gen Blue City Historian & Certified Guide',
    location: 'Jodhpur & Delhi, Rajasthan/Delhi',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    rating: 4.96,
    reviewsCount: 420,
    experienceYears: 12,
    languages: ['English', 'Hindi', 'Urdu', 'Marwari'],
    specialty: 'Mughal Culinary Arts & Blue City Guilds',
    bio: 'Born in a 250-year-old blue haveli near Mehrangarh Fort. Rajesh unlocks private royal recipe books and hidden artisan workshops that tourists never find on maps.',
    badges: ['Guild Elder', 'Culinary Master', 'Govt Certified'],
    pricePerDay: 120,
    reelCount: 5,
    hasReel: true,
    reels: [
      {
        id: 'reel-4',
        guideId: 'rajesh-kumar',
        guideName: 'Rajesh Kumar',
        guideAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
        title: 'The Real Reason Jodhpur’s Houses are Painted Indigo',
        location: 'Jodhpur, Rajasthan',
        quote: '“It wasn’t just religion—it was chemistry: copper sulfate keeping scorpions away.”',
        image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=85',
        likes: 2780,
        tags: ['#Jodhpur', '#BlueCity', '#HeritageSecrets'],
        duration: '0:50'
      }
    ]
  }
];

export const REELS: GuideReel[] = GUIDES.flatMap(g => g.reels);

export const COLLECTIONS: StoryCollection[] = [
  {
    id: 'monsoon-magic',
    title: 'Monsoon Magic in Kerala',
    subtitle: 'Rain-soaked backwaters, spice plantations & Ayurvedic rituals',
    tagline: 'When the Arabian Sea clouds bathe the Western Ghats in emerald silence.',
    coverImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=85',
    storyCount: 6,
    tags: ['Nature', 'Ayurveda', 'Slow Travel'],
    stories: ['kerala-backwaters', 'chand-baori']
  },
  {
    id: 'street-food-chronicles',
    title: 'Street Food Chronicles',
    subtitle: 'From Mughal royal kitchens to hidden street hawkers',
    tagline: '400 years of secret family recipes that outlived dynasties.',
    coverImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=85',
    storyCount: 8,
    tags: ['Culinary', 'Heritage', 'Midnight Walks'],
    stories: ['old-delhi-culinary', 'jodhpur-blue-city']
  },
  {
    id: 'echoes-of-the-valley',
    title: 'Echoes of the Valley',
    subtitle: 'Himalayan monasteries, pinewood trails & folklore',
    tagline: 'Chanted mantras and ancient wooden pagoda shrines above the clouds.',
    coverImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=85',
    storyCount: 5,
    tags: ['Spiritual', 'Trekking', 'Himalayas'],
    stories: ['living-root-bridges', 'bhangarh-ruins']
  }
];

export const SOLO_MATCHES: SoloMatchUser[] = [
  {
    id: 'solo-1',
    name: 'Aanya Sharma',
    age: 27,
    location: 'Mumbai, India',
    currentCity: 'Jaipur (Near Stepwell)',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    isVerified: true,
    isWomenSafetyVerified: true,
    mutualStories: ['The Geometry of Silence', 'Secrets of the Blue City'],
    interests: ['Heritage Architecture', 'Film Photography', 'Local Chai'],
    travelStyle: 'Slow Explorer • Sketcher',
    matchScore: 96,
    distanceKm: 0.8
  },
  {
    id: 'solo-2',
    name: 'Chloe Laurent',
    age: 29,
    location: 'Lyon, France',
    currentCity: 'Jaipur (C-Scheme)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    isVerified: true,
    isWomenSafetyVerified: true,
    mutualStories: ['Monsoon Magic in Kerala', 'Bridges Woven from Roots'],
    interests: ['Botanical Sketches', 'Street Markets', 'Pottery'],
    travelStyle: 'Solo Female Backpacker',
    matchScore: 91,
    distanceKm: 1.4
  },
  {
    id: 'solo-3',
    name: 'Vikram Joshi',
    age: 31,
    location: 'Bengaluru, India',
    currentCity: 'Amer, Jaipur',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    isVerified: true,
    isWomenSafetyVerified: false,
    mutualStories: ['Whispers of Bhangarh', 'Street Food Chronicles'],
    interests: ['Night Astrophotography', 'Mythology', 'Trekking'],
    travelStyle: 'History Buff',
    matchScore: 84,
    distanceKm: 3.2
  }
];

export const BADGES: BadgeItem[] = [
  {
    id: 'stepwell-sage',
    name: 'Stepwell Sage',
    category: 'Architecture',
    icon: 'stairs',
    color: '#942e02',
    description: 'Explored 3 subterranean stepwells and mastered geometric water heritage.',
    unlockedAt: 'Unlocked Today • Abhaneri',
    isUnlocked: true,
    rarity: 'Rare'
  },
  {
    id: 'brave-soloist',
    name: 'Brave Soloist',
    category: 'Solo Travel',
    icon: 'verified_user',
    color: '#2e5a44',
    description: 'Completed a verified solo cultural mission with active safety check-ins.',
    unlockedAt: 'Unlocked Today • Jaipur',
    isUnlocked: true,
    rarity: 'Legendary'
  },
  {
    id: 'heritage-hunter',
    name: 'Heritage Hunter',
    category: 'Storyteller',
    icon: 'auto_stories',
    color: '#735c00',
    description: 'Listened to 5 oral folklore accounts directly from local guild elders.',
    unlockedAt: 'Unlocked Yesterday • Navchokiya',
    isUnlocked: true,
    rarity: 'Common'
  },
  {
    id: 'botanist-initiate',
    name: 'Living Root Guardian',
    category: 'Ecology',
    icon: 'park',
    color: '#3d2645',
    description: 'Crossed the 500-year double-decker living root bridge of Nongriat.',
    isUnlocked: false,
    rarity: 'Legendary'
  },
  {
    id: 'spice-chronler',
    name: 'Imperial Taster',
    category: 'Culinary',
    icon: 'soup_kitchen',
    color: '#b5451b',
    description: 'Sampled all 8 historic Mughal recipes across Old Delhi alleys.',
    isUnlocked: false,
    rarity: 'Rare'
  }
];

export const SAMPLE_COMIC_JOURNAL: ComicJournal = {
  id: 'journal-abhaneri-1',
  tripTitle: 'A Story Written in Stone: Chand Baori Descent',
  date: 'October 14, 2025',
  location: 'Abhaneri, Rajasthan',
  travelerName: 'Elena Rostova',
  badgesEarned: [BADGES[0], BADGES[1], BADGES[2]],
  guideQuote: '“To descend here is to shed the noise of the surface world, step by mathematical step.” — Elias Thorne',
  personalNotes: 'The morning light cast razor-sharp shadows across the 3,500 steps. In the mid-tier royal pavilion, Elias shared how the king designed cool breezes across the stone chambers.',
  panels: [
    {
      panelNumber: 1,
      title: 'Chapter I: The Inverted Mirage',
      caption: 'Abhaneri awoke under a dusty golden haze as we arrived at the ancient stone gateway.',
      dialogue: 'Look down. The labyrinth was made to reflect both the stars and the thirsty soul.',
      speaker: 'Elias Thorne',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80',
      timeOfDay: '08:45 AM • Sunbreak'
    },
    {
      panelNumber: 2,
      title: 'Chapter II: The 3,500 Steps',
      caption: 'Every step forms a flawless geometric rhyme. The temperature dropped noticeaby.',
      dialogue: 'Can you feel the air cooling? Five degrees for every ten steps.',
      speaker: 'Elena (Traveler)',
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80',
      timeOfDay: '10:15 AM • Subterranean Descent'
    },
    {
      panelNumber: 3,
      title: 'Chapter III: The Royal Jharokhas',
      caption: 'Intricate sculptures of Ganesha and Mahishasuramardini stand sentinel over the quiet water.',
      dialogue: 'Here the queens spent the hottest desert months listening to monsoon songs.',
      speaker: 'Elias Thorne',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
      timeOfDay: '11:30 AM • Royal Pavilions'
    },
    {
      panelNumber: 4,
      title: 'Chapter IV: Chai & Village Lore',
      caption: 'We ended the walk in the potter’s courtyard, sipping saffron tea from fresh terracotta cups.',
      dialogue: 'A story lived is a memory etched in stone forever.',
      speaker: 'Village Elder',
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=80',
      timeOfDay: '01:00 PM • Courtyard Farewell'
    }
  ]
};

export const INITIAL_TRIP_PLAN: TripPlan = {
  id: 'trip-golden-triangle-stories',
  title: 'The Royal Narrative: A 4-Day Journey through Rajasthan',
  region: 'Jaipur & Abhaneri, Rajasthan',
  durationDays: 4,
  companion: 'solo',
  pace: 'moderate',
  budgetLevel: 'balanced',
  womensSafetyMode: true,
  startDate: 'Nov 12, 2025',
  endDate: 'Nov 15, 2025',
  days: [
    {
      dayNumber: 1,
      title: 'Arrival & Sunset at Nahargarh Fort',
      location: 'Jaipur',
      guideName: 'Elias Thorne',
      guideAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      price: 90,
      description: 'Check into Samode Haveli, followed by an evening sunset narrative atop Nahargarh Fort walls with panoramic views of the Pink City.',
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80',
      time: '04:00 PM - 07:30 PM',
      includedActivity: 'Sunset Fort Tea & Rajput History Story'
    },
    {
      dayNumber: 2,
      title: 'Descent into Chand Baori & Abhaneri',
      location: 'Abhaneri Village',
      guideName: 'Elias Thorne',
      guideAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      price: 150,
      description: 'Subterranean geometry exploration of the 9th-century stepwell, Harshat Mata temple carvings, and village potter tea session.',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80',
      time: '08:30 AM - 02:00 PM',
      includedActivity: 'Private Stepwell Descent & Blueprint Study'
    },
    {
      dayNumber: 3,
      title: 'The Indigo Alleys of the Blue City',
      location: 'Jodhpur / Navchokiya',
      guideName: 'Rajesh Kumar',
      guideAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      price: 120,
      description: 'Morning walk through azure labyrinth, meeting traditional bandhani textile artisans, and rooftop saffron lassi tasting.',
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=80',
      time: '08:00 AM - 12:30 PM',
      includedActivity: 'Brahmin Guild Terrace Tea & Textile Demo'
    },
    {
      dayNumber: 4,
      title: 'Mughal Culinary Degs & Night Bazaar',
      location: 'Old Delhi / Chandni Chowk',
      guideName: 'Rajesh Kumar',
      guideAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      price: 110,
      description: 'Tasting 8 historic dishes across 400-year-old lanes, visiting Asia’s largest spice market, and sunset Urdu poetry courtyard.',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
      time: '04:00 PM - 08:30 PM',
      includedActivity: 'Spice Rooftop Access & 8 Tasting Courses'
    }
  ],
  pricing: {
    guideFee: 150,
    heritageStays: 320,
    storyCab: 85,
    heritagePasses: 40,
    taxRate: 0.12,
    total: 666.40
  }
};
