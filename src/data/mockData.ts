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
    languages: ['Hindi', 'English', 'Marwari'],
    price: 2400,
    authorGuide: {
      id: 'rudra-pratap',
      name: 'Rudra Pratap Singh Shekhawat',
      title: 'Architectural Historian & 15-Yr ASI Heritage Guide',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=400&q=80',
      badge: 'Master Storyteller',
      rating: 4.98,
      bio: 'Specialist in 9th-century subterranean hydro-engineering and Rajput celestial astronomy. Rudra Pratap has authored two research monographs on Rajasthani stepwells.'
    },
    dropCapStory: {
      dropLetter: 'B',
      firstParagraph: 'eneath the arid Thar dust in the tiny village of Abhaneri lies an inverted pyramid of 3,500 hand-carved stone steps. Commissioned in the 9th century by King Chanda of the Nikumbha Dynasty, Chand Baori was engineered not merely for water harvesting, but as a cool subterranean palace where the air temperature drops by five degrees for every tier you descend.',
      secondParagraph: 'Local folklore whispers that spirits carved the steps in a single moonless night so no mortal could retrieve a fallen coin. As shadows shift across the symmetrical stone steps under morning sun, you realize you stand at the sacred intersection of Vedic geometry and desert devotion.',
      quote: '“To descend here is to shed the noise of the surface world, step by mathematical step.”'
    },
    sights: [
      {
        title: 'The 3,500 Steps',
        description: 'Terraced triangular flights plunging 13 stories into emerald depths.',
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=500&q=80'
      },
      {
        title: 'Royal Pavilion & Jharokhas',
        description: 'Multi-tiered royal suites carved with sculptures of Ganesha and Mahishasuramardini.',
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=500&q=80'
      },
      {
        title: 'The Sacred Stepwell Basin',
        description: 'The cool natural aquifer reflecting centuries of monsoon rains and desert starlight.',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=500&q=80'
      }
    ],
    timeline: [
      {
        time: '08:30 AM',
        title: 'Arrival at Abhaneri Village Gate',
        description: 'Morning masala chai in terracotta kulhads with local potters and briefing on 9th-century hydrology.',
        icon: 'local_cafe'
      },
      {
        time: '09:15 AM',
        title: 'The First Descent from Above',
        description: 'Deciphering the optical illusions of the step symmetry under early sun rays with Rudra Pratap.',
        icon: 'visibility'
      },
      {
        time: '10:30 AM',
        title: 'The Subterranean Walk',
        description: 'Descending to the royal mid-tier pavilion to examine sacred sandstone inscriptions.',
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
      'Certified ASI Heritage Historian accompaniment',
      'Exclusive architectural blueprint & magnifying loupe',
      'Artisanal masala chai & organic saffron sweets',
      'All monument entry permissions & conservation permits'
    ],
    audioPreviewUrl: 'https://cdn.freesound.org/previews/518/518428_6142149-lq.mp3'
  },
  {
    id: 'bhangarh-ruins',
    title: 'The Whispers of the Abandoned Citadel: Bhangarh',
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
    languages: ['Hindi', 'English', 'Rajasthani'],
    price: 1850,
    authorGuide: {
      id: 'rudra-pratap',
      name: 'Rudra Pratap Singh Shekhawat',
      title: 'Folklore Anthropologist & Fort Historian',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=400&q=80',
      badge: 'Verified Explorer',
      rating: 4.95,
      bio: 'Documenting the oral legends of the Aravallis for 15 years, verifying court edicts and folklore with local village elders.'
    },
    dropCapStory: {
      dropLetter: 'S',
      firstParagraph: 'tanding at the foot of the Aravalli hills, the royal fortified town of Bhangarh was founded in 1573 by Bhagwant Das. It was once a vibrant metropolis of banyan-shaded bazaars, perfumeries, and seven-tiered palaces until a court sorcerer’s unrequited obsession brought its legendary desertion.',
      secondParagraph: 'The Archaeological Survey of India strictly forbids entry after sunset. By daylight, however, the ruined havelis whisper forgotten songs through the desert breeze and ancient keekar branches.',
      quote: '“The ruins do not hold ghosts; they hold memories too grand for modern walls.”'
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
        description: 'Meeting Rudra Pratap at the Hanuman temple gate with folklore manuscripts.',
        icon: 'meeting_room'
      },
      {
        time: '03:30 PM',
        title: 'Walking the Lost Street of Perfumers',
        description: 'Reading court chronicles detailing ancient trade routes between Amber and Delhi.',
        icon: 'menu_book'
      },
      {
        time: '05:00 PM',
        title: 'Sunset at Gopinath Temple',
        description: 'Golden hour photography before dusk gates close strictly as per ASI norms.',
        icon: 'wb_twilight'
      }
    ],
    inclusions: [
      'ASI Accredited Heritage Guide',
      'Safety escort with medical support kit',
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
    languages: ['Hindi', 'English', 'Marwari'],
    price: 1650,
    authorGuide: {
      id: 'rajeshwar-sharma',
      name: 'Pandit Rajeshwar Sharma',
      title: '7th-Gen Blue City Resident & Heritage Archivist',
      avatar: 'https://images.unsplash.com/photo-1601288496920-b6154fe3626a?auto=format&fit=crop&w=400&q=80',
      badge: 'Guild Elder',
      rating: 4.96,
      bio: 'Born in a 250-year-old Navchokiya haveli. Pandit Rajeshwar unlocks private royal recipe scrolls and artisan guilds that tourists never find on maps.'
    },
    dropCapStory: {
      dropLetter: 'I',
      firstParagraph: 'n the shadow of Mehrangarh Fort lies Navchokiya, a maze where every lime-plaster wall is washed in copper sulfate and indigo blue. The natural formulation repels desert heat, deters scorpions, and historically marked the dwellings of the royal astrologers.',
      secondParagraph: 'Walking these twisting stepped corridors with Pandit Rajeshwar, you meet 4th-generation tie-and-dye bandhani masters and drink saffron-spiced makhaniya lassi churned in earthen urns.',
      quote: '“Every blue doorway opens to a family whose ancestors cooked for the Maharajas.”'
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
        description: 'Discovering hidden stepwells and 200-year-old door carvings with Pandit Rajeshwar.',
        icon: 'directions_walk'
      },
      {
        time: '10:00 AM',
        title: 'Tea on a Brahmin Terrace',
        description: 'Enjoying freshly fried pyaaz kachoris overlooking the azure cityscape.',
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
    languages: ['Khasi', 'English', 'Hindi'],
    price: 2800,
    authorGuide: {
      id: 'baphilinia-nongkynrih',
      name: 'Dr. Baphilinia Nongkynrih',
      title: 'Ethnobotanist & Khasi Living Architecture Specialist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      badge: 'Eco Pioneer',
      rating: 5.0,
      bio: 'Ethnobotanist who spent 8 years documenting the bio-engineering of Ficus elastica root bridges with Khasi elders. Leads slow, respectful cloud-forest expeditions.'
    },
    dropCapStory: {
      dropLetter: 'F',
      firstParagraph: 'or centuries, the indigenous Khasi and Jaintia clans of Meghalaya have nurtured Ficus elastica roots across roaring monsoon rivers. Unlike timber or concrete bridges that deteriorate in torrential rain, these living structures grow stronger over generations, enduring 500 years of the heaviest downpours on Earth.',
      secondParagraph: 'Walking across the double-decker living root bridge of Nongriat is an initiation into how humanity can build in symbiotic harmony with wild nature.',
      quote: '“We do not construct our bridges; we whisper to the trees for two generations.”'
    },
    sights: [
      {
        title: 'The Double Decker Bridge (Jingkieng Nongriat)',
        description: 'Two tiers of live fig tree roots straddling a crystal blue natural lagoon.',
        image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=500&q=80'
      },
      {
        title: 'Rainbow Falls Trail',
        description: 'Trekking through misty betel-nut groves where sunlight forms permanent prisms.',
        image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=500&q=80'
      },
      {
        title: 'Sacred Forest Grove (Law Kyntang)',
        description: 'Centuries-old protected forest where taking a single twig is forbidden by tribal custom.',
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
        description: 'Observing aerial root scaffolding with Dr. Baphilinia and meeting elder bridge guardians.',
        icon: 'nature'
      },
      {
        time: '11:30 AM',
        title: 'Natural Spring Swim & Bamboo Meal',
        description: 'Fresh organic hill rice and local greens cooked inside hollow bamboo cylinders.',
        icon: 'restaurant'
      }
    ],
    inclusions: [
      'Certified Khasi tribal naturalist & ethnobotanist guide',
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
    languages: ['Malayalam', 'English', 'Hindi'],
    price: 2200,
    authorGuide: {
      id: 'unnikrishnan-nair',
      name: 'K. P. Unnikrishnan Nair',
      title: 'Kuttanad Canal Master & Backwater Oral Historian',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
      badge: 'Maritime Elder',
      rating: 4.98,
      bio: 'Son of a traditional wooden boatbuilder from Kuttanad. Unnikrishnan leads canal voyages tracing ancient spice trade routes and below-sea-level farming.'
    },
    dropCapStory: {
      dropLetter: 'G',
      firstParagraph: 'entle ripples part as the wooden prow of a cedar-and-coir kettuvallam slips past floating lotus fields. In these labyrinthine canals below sea level, time has kept the rhythm of the tide for Roman, Arab, and Dutch spice merchants alike.',
      secondParagraph: 'Hear the songs of the duck herders, learn the culinary alchemy of Malabar black pepper and fresh coconut milk, and watch kingfishers dive into the emerald lagoons.',
      quote: '“On the backwaters, the river is both your road and your reflection.”'
    },
    sights: [
      {
        title: 'Kettuvallam Woodcraft Guild',
        description: 'Discovering how 100-foot boats are bound entirely by coconut fiber without a single iron nail.',
        image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=500&q=80'
      },
      {
        title: 'Paddy Fields Below Sea Level',
        description: 'The ancient Kuttanad farming marvel of cultivating rice four to ten feet below sea level.',
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
        description: 'Morning cardamom tea with steamed banana cakes as mist lifts from the lagoons.',
        icon: 'sailing'
      },
      {
        time: '09:00 AM',
        title: 'Canal Village Walking Exchange',
        description: 'Visiting coir rope weavers and riverside spice gardens with Unnikrishnan.',
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
      'Local backwater community development fund'
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
    languages: ['Hindi', 'Urdu', 'English'],
    price: 1450,
    authorGuide: {
      id: 'rajeshwar-sharma',
      name: 'Pandit Rajeshwar Sharma',
      title: 'Shahjahanabad Culinary Chronicler',
      avatar: 'https://images.unsplash.com/photo-1601288496920-b6154fe3626a?auto=format&fit=crop&w=400&q=80',
      badge: 'Culinary Master',
      rating: 4.96,
      bio: 'Archivist of 400 years of Delhi’s culinary history. Traces secret recipes handed down through nine generations of Khari Baoli spice master families.'
    },
    dropCapStory: {
      dropLetter: 'W',
      firstParagraph: 'hen Emperor Shah Jahan founded Shahjahanabad in 1648, his daughter Jahanara designed Chandni Chowk with silver canals to reflect the moonlight. Along its winding gallis, royal khansamas perfected recipes that have outlasted empires.',
      secondParagraph: 'Taste the cloud-like Daulat ki Chaat that vanishes on the tongue, slow-simmered Nihari infused with 32 hand-ground botanicals, and crispy jalebis fried in pure desi ghee.',
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
        description: 'Reading Urdu couplets in the arched courtyard of Delhi’s greatest romantic poet.',
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=500&q=80'
      }
    ],
    timeline: [
      {
        time: '04:00 PM',
        title: 'Jama Masjid Gate 3 Meet',
        description: 'Starting with warm spiced butter tea and sheermal bread.',
        icon: 'mosque'
      },
      {
        time: '05:15 PM',
        title: 'Spice Market Rooftop Ascent',
        description: 'Overlooking the bustling bazaar while sampling raw green Malabar cardamoms.',
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
      'Purified mineral water & herbal digestive meetha paan',
      'Custom recipe booklet handwritten by chef families'
    ]
  }
];

export const GUIDES: GuideProfile[] = [
  {
    id: 'rudra-pratap',
    name: 'Rudra Pratap Singh Shekhawat',
    title: 'Architectural Historian & 15-Yr ASI Heritage Guide',
    location: 'Jaipur & Abhaneri, Rajasthan',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=400&q=80',
    rating: 4.98,
    reviewsCount: 312,
    experienceYears: 15,
    languages: ['Hindi', 'English', 'Rajasthani (Marwari)', 'German'],
    specialty: 'Medieval Stepwells & Rajput Fort Architecture',
    bio: 'Specialist in 9th to 16th-century subterranean structures and celestial astronomy. Rudra Pratap has authored two research monographs on Shekhawati and Abhaneri stepwells and leads immersive, poetic narrative walks.',
    badges: ['Master Storyteller', 'Women Safety Certified', 'ASI Accredited', 'First Aid Certified'],
    pricePerDay: 3200,
    reelCount: 4,
    hasReel: true,
    reels: [
      {
        id: 'reel-1',
        guideId: 'rudra-pratap',
        guideName: 'Rudra Pratap Singh',
        guideAvatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=400&q=80',
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
        guideId: 'rudra-pratap',
        guideName: 'Rudra Pratap Singh',
        guideAvatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=400&q=80',
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
    id: 'baphilinia-nongkynrih',
    name: 'Dr. Baphilinia Nongkynrih',
    title: 'Ethnobotanist & Khasi Living Architecture Specialist',
    location: 'Shillong & Cherrapunji, Meghalaya',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    rating: 5.0,
    reviewsCount: 189,
    experienceYears: 8,
    languages: ['Khasi', 'English', 'Hindi', 'Pnar'],
    specialty: 'Living Root Bridges & Sacred Tribal Groves',
    bio: 'Ethnobotanist who spent 8 years with Khasi clan elders learning the oral botany of bio-engineering Ficus elastica root bridges. Dr. Baphilinia curates slow, sustainable treks through misty cloud forests.',
    badges: ['Eco Pioneer', 'Solo Women Friendly', 'Wilderness Responder'],
    pricePerDay: 3500,
    reelCount: 3,
    hasReel: true,
    reels: [
      {
        id: 'reel-3',
        guideId: 'baphilinia-nongkynrih',
        guideName: 'Dr. Baphilinia Nongkynrih',
        guideAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
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
    id: 'rajeshwar-sharma',
    name: 'Pandit Rajeshwar Sharma',
    title: '7th-Gen Blue City Historian & Certified Guide',
    location: 'Jodhpur & Delhi, Rajasthan/Delhi',
    avatar: 'https://images.unsplash.com/photo-1601288496920-b6154fe3626a?auto=format&fit=crop&w=400&q=80',
    rating: 4.96,
    reviewsCount: 420,
    experienceYears: 12,
    languages: ['Hindi', 'Urdu', 'English', 'Marwari'],
    specialty: 'Mughal Culinary Arts & Blue City Guilds',
    bio: 'Born in a 250-year-old blue haveli near Mehrangarh Fort. Pandit Rajeshwar unlocks centuries of private royal family recipe scrolls and hidden artisan workshops that tourists never find on maps.',
    badges: ['Guild Elder', 'Culinary Master', 'Govt Certified'],
    pricePerDay: 2800,
    reelCount: 5,
    hasReel: true,
    reels: [
      {
        id: 'reel-4',
        guideId: 'rajeshwar-sharma',
        guideName: 'Pandit Rajeshwar Sharma',
        guideAvatar: 'https://images.unsplash.com/photo-1601288496920-b6154fe3626a?auto=format&fit=crop&w=400&q=80',
        title: 'The Real Reason Jodhpur’s Houses are Painted Indigo',
        location: 'Jodhpur, Rajasthan',
        quote: '“It wasn’t just religion—it was chemistry: copper sulfate keeping scorpions away.”',
        image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=85',
        likes: 2780,
        tags: ['#Jodhpur', '#BlueCity', '#HeritageSecrets'],
        duration: '0:50'
      }
    ]
  },
  {
    id: 'unnikrishnan-nair',
    name: 'K. P. Unnikrishnan Nair',
    title: 'Kuttanad Canal Master & Backwater Oral Historian',
    location: 'Alleppey & Kumarakom, Kerala',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    rating: 4.98,
    reviewsCount: 245,
    experienceYears: 14,
    languages: ['Malayalam', 'English', 'Hindi', 'Tamil'],
    specialty: 'Ancient Spice Routes & Coir Boatcraft Heritage',
    bio: 'Son of a traditional wooden boatbuilder from Kuttanad. Unnikrishnan guides travelers along ancient canal trade routes, sharing maritime folklore and the agro-heritage of farming below sea level.',
    badges: ['Maritime Historian', 'River Eco Guardian', 'Women Safety Certified'],
    pricePerDay: 2600,
    reelCount: 3,
    hasReel: true,
    reels: [
      {
        id: 'reel-5',
        guideId: 'unnikrishnan-nair',
        guideName: 'Unnikrishnan Nair',
        guideAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
        title: 'How 100-Foot Kettuvallams are Built Without Nails',
        location: 'Alleppey, Kerala',
        quote: '“Every plank of anjili wood is bound with hand-spun coir fiber and pure fish oil.”',
        image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=85',
        likes: 2190,
        tags: ['#Kerala', '#Backwaters', '#Boatcraft', '#SlowTravel'],
        duration: '0:52'
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
    location: 'Bandra, Mumbai',
    currentCity: 'Jaipur (Near Stepwell)',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
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
    name: 'Pooja Nair',
    age: 28,
    location: 'Indiranagar, Bengaluru',
    currentCity: 'Jaipur (C-Scheme / MI Road)',
    avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80',
    isVerified: true,
    isWomenSafetyVerified: true,
    mutualStories: ['Monsoon Magic in Kerala', 'Bridges Woven from Roots'],
    interests: ['Dabu Block Printing', 'Handloom Guilds', 'Blue Pottery'],
    travelStyle: 'Solo Female Backpacker • Textile Researcher',
    matchScore: 92,
    distanceKm: 1.4
  },
  {
    id: 'solo-3',
    name: 'Vikram Joshi',
    age: 31,
    location: 'Malleshwaram, Bengaluru',
    currentCity: 'Amer, Jaipur',
    avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80',
    isVerified: true,
    isWomenSafetyVerified: false,
    mutualStories: ['Whispers of Bhangarh', 'Street Food Chronicles'],
    interests: ['Night Astrophotography', 'Rajput Mythology', 'Fort Treks'],
    travelStyle: 'History Enthusiast • Astrophotographer',
    matchScore: 86,
    distanceKm: 3.2
  },
  {
    id: 'solo-4',
    name: 'Kabir Sen',
    age: 30,
    location: 'Salt Lake, Kolkata',
    currentCity: 'Old Delhi (Chandni Chowk)',
    avatar: 'https://images.unsplash.com/photo-1614036417651-efe5912149d8?auto=format&fit=crop&w=400&q=80',
    isVerified: true,
    isWomenSafetyVerified: false,
    mutualStories: ['Street Food Chronicles', 'Secrets of the Blue City'],
    interests: ['Bazaar Audio Soundscapes', 'Urdu Poetry', 'Haveli Architecture'],
    travelStyle: 'Acoustic Chronicler • Cultural Documentarian',
    matchScore: 88,
    distanceKm: 4.1
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
  travelerName: 'Aditi Deshmukh',
  badgesEarned: [BADGES[0], BADGES[1], BADGES[2]],
  guideQuote: '“To descend here is to shed the noise of the surface world, step by mathematical step.” — Rudra Pratap Singh Shekhawat',
  personalNotes: 'The morning sun cast razor-sharp shadows across the 3,500 steps. In the mid-tier royal pavilion, Rudra Pratap explained how the king engineered cool breezes across the stone chambers.',
  panels: [
    {
      panelNumber: 1,
      title: 'Chapter I: The Inverted Mirage',
      caption: 'Abhaneri awoke under a dusty golden haze as we arrived at the ancient stone gateway.',
      dialogue: 'Look down. The labyrinth was made to reflect both the stars and the thirsty soul.',
      speaker: 'Rudra Pratap Singh',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80',
      timeOfDay: '08:45 AM • Sunbreak'
    },
    {
      panelNumber: 2,
      title: 'Chapter II: The 3,500 Steps',
      caption: 'Every step forms a flawless geometric rhyme. The temperature dropped noticeably.',
      dialogue: 'Can you feel the air cooling? Five degrees for every ten steps.',
      speaker: 'Aditi (Traveler)',
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80',
      timeOfDay: '10:15 AM • Subterranean Descent'
    },
    {
      panelNumber: 3,
      title: 'Chapter III: The Royal Jharokhas',
      caption: 'Intricate sculptures of Ganesha and Mahishasuramardini stand sentinel over the quiet water.',
      dialogue: 'Here the queens spent the hottest desert months listening to monsoon songs.',
      speaker: 'Rudra Pratap Singh',
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
      guideName: 'Rudra Pratap Singh',
      guideAvatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=400&q=80',
      price: 1800,
      description: 'Check into Samode Haveli, followed by an evening sunset narrative atop Nahargarh Fort walls with panoramic views of the Pink City.',
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80',
      time: '04:00 PM - 07:30 PM',
      includedActivity: 'Sunset Fort Tea & Rajput History Story'
    },
    {
      dayNumber: 2,
      title: 'Descent into Chand Baori & Abhaneri',
      location: 'Abhaneri Village',
      guideName: 'Rudra Pratap Singh',
      guideAvatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=400&q=80',
      price: 2400,
      description: 'Subterranean geometry exploration of the 9th-century stepwell, Harshat Mata temple carvings, and village potter tea session.',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80',
      time: '08:30 AM - 02:00 PM',
      includedActivity: 'Private Stepwell Descent & Blueprint Study'
    },
    {
      dayNumber: 3,
      title: 'The Indigo Alleys of the Blue City',
      location: 'Jodhpur / Navchokiya',
      guideName: 'Pandit Rajeshwar Sharma',
      guideAvatar: 'https://images.unsplash.com/photo-1601288496920-b6154fe3626a?auto=format&fit=crop&w=400&q=80',
      price: 2200,
      description: 'Morning walk through azure labyrinth, meeting traditional bandhani textile artisans, and rooftop saffron lassi tasting.',
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=80',
      time: '08:00 AM - 12:30 PM',
      includedActivity: 'Brahmin Guild Terrace Tea & Textile Demo'
    },
    {
      dayNumber: 4,
      title: 'Mughal Culinary Degs & Night Bazaar',
      location: 'Old Delhi / Chandni Chowk',
      guideName: 'Pandit Rajeshwar Sharma',
      guideAvatar: 'https://images.unsplash.com/photo-1601288496920-b6154fe3626a?auto=format&fit=crop&w=400&q=80',
      price: 1800,
      description: 'Tasting historic dishes across 400-year-old lanes, visiting Asia’s largest spice market, and sunset Urdu poetry courtyard.',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
      time: '04:00 PM - 08:30 PM',
      includedActivity: 'Spice Rooftop Access & 8 Tasting Courses'
    }
  ],
  pricing: {
    guideFee: 8200,
    heritageStays: 14500,
    storyCab: 5800,
    heritagePasses: 2400,
    taxRate: 0.12,
    total: 30900
  }
};
