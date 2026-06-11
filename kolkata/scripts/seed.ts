import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { monuments, tramStops, quizQuestions, communityStories } from '../lib/schema';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL not set');
}

const client = postgres(DATABASE_URL);
const db = drizzle(client);

async function seed() {
  console.log('🌱 Seeding Kolkata Heritage database...');

  try {
    // Seed Monuments
    console.log('📍 Seeding 8 Kolkata monuments...');
    const monumentsData = [
      {
        name: 'Victoria Memorial',
        description: 'Iconic marble palace-museum, designed by Sir Aston Webb, symbolizing the British Raj. Built over 16 years with intricate marble work and inlay details.',
        city: 'Kolkata',
        location: 'Maidan, Kolkata',
        builtYear: 1921,
        architect: 'Sir Aston Webb',
        architecturalStyle: 'Indo-Saracenic Revival',
        riskLevel: 'medium',
        latitude: 22.5448,
        longitude: 88.3426,
        imageUrl: '/images/victoria-memorial.jpg',
        historicalImageUrl: '/images/victoria-memorial-historical.jpg',
        presentImageUrl: '/images/victoria-memorial-present.jpg',
        tags: ['Museum', 'British Raj', 'Marble Palace', 'Monument'],
      },
      {
        name: 'Howrah Bridge',
        description: 'Iconic cantilever bridge spanning the Hooghly River, connecting Kolkata to Howrah. One of the busiest bridges in the world, symbol of modern India.',
        city: 'Kolkata',
        location: 'Howrah, Kolkata',
        builtYear: 1943,
        architect: 'Bradford & Horne',
        architecturalStyle: 'Steel Cantilever Engineering',
        riskLevel: 'medium',
        latitude: 22.5949,
        longitude: 88.3631,
        imageUrl: '/images/howrah-bridge.jpg',
        historicalImageUrl: '/images/howrah-bridge-historical.jpg',
        presentImageUrl: '/images/howrah-bridge-present.jpg',
        tags: ['Bridge', 'Engineering Marvel', 'Iconic Structure', 'Transport'],
      },
      {
        name: 'Kalighat Temple',
        description: 'Ancient temple dedicated to Goddess Kali, one of Kolkata\'s oldest and most sacred religious sites. A major pilgrimage destination for Hindu devotees across India.',
        city: 'Kolkata',
        location: 'Kalighat, South Kolkata',
        builtYear: 1809,
        architect: 'Traditional Hindu Architecture',
        architecturalStyle: 'Traditional Hindu Temple',
        riskLevel: 'low',
        latitude: 22.5148,
        longitude: 88.3704,
        imageUrl: '/images/kalighat-temple.jpg',
        tags: ['Temple', 'Religious Site', 'Ancient Architecture', 'Sacred'],
      },
      {
        name: 'College Street',
        description: 'Historic street in North Kolkata lined with vintage bookshops, colleges, and intellectual heritage. Known as the intellectual and literary hub of Bengal.',
        city: 'Kolkata',
        location: 'North Kolkata',
        builtYear: 1819,
        architecturalStyle: 'Colonial Architecture',
        riskLevel: 'low',
        latitude: 22.5617,
        longitude: 88.3633,
        imageUrl: '/images/college-street.jpg',
        tags: ['Street', 'Literary Hub', 'Educational', 'Heritage'],
      },
      {
        name: 'Marble Palace',
        description: 'Grand 19th-century mansion with white and black marble facade, built by a wealthy zamindar. Houses an impressive art collection and is a protected heritage structure.',
        city: 'Kolkata',
        location: 'North Kolkata',
        builtYear: 1835,
        architect: 'Italian Architects',
        architecturalStyle: 'Baroque-Italian Mansion',
        riskLevel: 'high',
        latitude: 22.5665,
        longitude: 88.3511,
        imageUrl: '/images/marble-palace.jpg',
        tags: ['Palace', 'Mansion', 'Art Gallery', 'Colonial'],
      },
      {
        name: 'Belur Math',
        description: 'Headquarters of the Ramakrishna Mission, designed by Swami Vivekananda. Architectural masterpiece blending Hindu, Islamic, and Christian design elements symbolizing spiritual unity.',
        city: 'Kolkata',
        location: 'Howrah, across Hooghly River',
        builtYear: 1899,
        architect: 'Swami Vivekananda (conceptual)',
        architecturalStyle: 'Syncretic Religious Architecture',
        riskLevel: 'low',
        latitude: 22.6419,
        longitude: 88.3318,
        imageUrl: '/images/belur-math.jpg',
        tags: ['Temple', 'Spiritual', 'Architectural Harmony', 'Religious'],
      },
      {
        name: 'Dakshineswar Temple',
        description: 'Ancient temple on the eastern bank of the Hooghly River, known as the place where Sri Ramakrishna Paramahamsa attained spiritual realization. An important pilgrimage site.',
        city: 'Kolkata',
        location: 'Dakshineswar',
        builtYear: 1855,
        architect: 'Rani Rashmani',
        architecturalStyle: 'Traditional Bengali Temple',
        riskLevel: 'low',
        latitude: 22.6709,
        longitude: 88.3794,
        imageUrl: '/images/dakshineswar-temple.jpg',
        tags: ['Temple', 'Spiritual', 'Pilgrimage', 'Religious'],
      },
      {
        name: 'Park Street Cemetery',
        description: 'One of India\'s oldest cemeteries, established in 1767. Houses graves of notable historical figures, preserving centuries of Kolkata\'s colonial and social history.',
        city: 'Kolkata',
        location: 'Park Street, Central Kolkata',
        builtYear: 1767,
        architecturalStyle: 'Colonial Cemetery',
        riskLevel: 'medium',
        latitude: 22.5502,
        longitude: 88.3705,
        imageUrl: '/images/park-street-cemetery.jpg',
        tags: ['Cemetery', 'Historical', 'Colonial Legacy', 'Heritage'],
      },
    ];

    for (const monumentData of monumentsData) {
      await db.insert(monuments).values(monumentData);
    }
    console.log('✅ Monuments seeded');

    // Seed Tram Stops
    console.log('🚊 Seeding 6 tram stops...');
    const tramStopsData = [
      {
        name: 'Esplanade',
        storyYear: 1902,
        storyContent: 'Esplanade tram stop, the heart of Kolkata\'s colonial commerce. Built during the height of the British Raj, this junction served as the meeting point of East and West. The trams here witnessed the birth of modern India\'s independence movement.',
      },
      {
        name: 'Shyambazar',
        storyYear: 1905,
        storyContent: 'Shyambazar, where tradition meets modernity. This ancient marketplace transformed during the tram era, with shopkeepers and poets sharing space. The tram stop became a cultural melting pot where Sanskrit scholars debated with modernists.',
      },
      {
        name: 'College Street',
        storyYear: 1910,
        storyContent: 'The intellectual heart of Kolkata. This tram stop connected students, teachers, and intellectuals. Countless revolutionary ideas were discussed on these trams. From Tagore\'s contemporaries to independence fighters, all traveled these iron rails.',
      },
      {
        name: 'Belgachia',
        storyYear: 1915,
        storyContent: 'Belgachia, a suburban outpost that became urban through trams. Workers commuted daily, carrying dreams and stories. The tram stop became a symbol of connectivity, of bringing distant villages into the modern city.',
      },
      {
        name: 'Girish Park',
        storyYear: 1912,
        storyContent: 'Named after the legendary playwright Girish Chandra Ghosh, this stop has artistic resonance. Theatre troupes, actors, and artists frequented these trams. The smell of greasepaint mixed with coal smoke created a unique cultural atmosphere.',
      },
      {
        name: 'Kalighat',
        storyYear: 1908,
        storyContent: 'The sacred route. Pilgrims boarded trams to reach the ancient temple. Every day brought devout faces, devotional songs, and the scent of flowers. The tram connected the spiritual to the mundane in remarkable ways.',
      },
    ];

    for (const tramData of tramStopsData) {
      await db.insert(tramStops).values(tramData);
    }
    console.log('✅ Tram stops seeded');

    // Get seeded monuments for quiz questions
    const seededMonuments = await db.select().from(monuments);

    // Seed Quiz Questions (15 total - 5 per difficulty)
    console.log('📝 Seeding 15 quiz questions...');
    const quizData = [
      // Tourist Difficulty (5 questions)
      {
        monumentId: seededMonuments[0].id, // Victoria Memorial
        question: 'In which year was Victoria Memorial completed?',
        optionA: '1906',
        optionB: '1921',
        optionC: '1935',
        optionD: '1950',
        correctOption: 'B',
        explanation: 'Victoria Memorial was completed in 1921 after 16 years of construction.',
        difficulty: 'Tourist',
        points: 5,
      },
      {
        monumentId: seededMonuments[1].id, // Howrah Bridge
        question: 'Howrah Bridge is a bridge over which river?',
        optionA: 'Ganges',
        optionB: 'Brahmaputra',
        optionC: 'Hooghly',
        optionD: 'Yamuna',
        correctOption: 'C',
        explanation: 'Howrah Bridge spans the Hooghly River, connecting Kolkata to Howrah.',
        difficulty: 'Tourist',
        points: 5,
      },
      {
        monumentId: seededMonuments[2].id, // Kalighat
        question: 'Kalighat Temple is dedicated to which goddess?',
        optionA: 'Goddess Durga',
        optionB: 'Goddess Kali',
        optionC: 'Goddess Saraswati',
        optionD: 'Goddess Lakshmi',
        correctOption: 'B',
        explanation: 'Kalighat Temple is dedicated to Goddess Kali, one of the most sacred temples in Kolkata.',
        difficulty: 'Tourist',
        points: 5,
      },
      {
        monumentId: seededMonuments[5].id, // Belur Math
        question: 'Belur Math is the headquarters of which organization?',
        optionA: 'Brahmo Samaj',
        optionB: 'Ramakrishna Mission',
        optionC: 'Theosophical Society',
        optionD: 'Arya Samaj',
        correctOption: 'B',
        explanation: 'Belur Math is the headquarters of the Ramakrishna Mission, founded by Swami Vivekananda.',
        difficulty: 'Tourist',
        points: 5,
      },
      {
        monumentId: seededMonuments[7].id, // Park Street Cemetery
        question: 'In which year was Park Street Cemetery established?',
        optionA: '1700',
        optionB: '1745',
        optionC: '1767',
        optionD: '1800',
        correctOption: 'C',
        explanation: 'Park Street Cemetery was established in 1767, making it one of India\'s oldest cemeteries.',
        difficulty: 'Tourist',
        points: 5,
      },
      // Explorer Difficulty (5 questions)
      {
        monumentId: seededMonuments[0].id,
        question: 'Who was the architect of Victoria Memorial?',
        optionA: 'Edwin Lutyens',
        optionB: 'Sir Aston Webb',
        optionC: 'Charles Correa',
        optionD: 'Herbert Baker',
        correctOption: 'B',
        explanation: 'Sir Aston Webb designed the Victoria Memorial in Indo-Saracenic Revival style.',
        difficulty: 'Explorer',
        points: 10,
      },
      {
        monumentId: seededMonuments[1].id,
        question: 'What engineering marvel makes Howrah Bridge unique?',
        optionA: 'Suspension bridge',
        optionB: 'Arch bridge',
        optionC: 'Cantilever bridge',
        optionD: 'Cable-stayed bridge',
        correctOption: 'C',
        explanation: 'Howrah Bridge is a cantilever bridge, one of only three of its kind in the world.',
        difficulty: 'Explorer',
        points: 10,
      },
      {
        monumentId: seededMonuments[3].id,
        question: 'College Street is known for which cultural phenomenon?',
        optionA: 'Film production',
        optionB: 'Literary and intellectual hub',
        optionC: 'Music conservatory',
        optionD: 'Dance academy',
        correctOption: 'B',
        explanation: 'College Street is famous as Kolkata\'s intellectual and literary hub, lined with bookshops and educational institutions.',
        difficulty: 'Explorer',
        points: 10,
      },
      {
        monumentId: seededMonuments[4].id,
        question: 'What is the architectural style of Marble Palace?',
        optionA: 'Gothic',
        optionB: 'Baroque-Italian',
        optionC: 'Mughal',
        optionD: 'Art Deco',
        correctOption: 'B',
        explanation: 'Marble Palace showcases Baroque-Italian architecture with intricate marble work.',
        difficulty: 'Explorer',
        points: 10,
      },
      {
        monumentId: seededMonuments[6].id,
        question: 'Who built Dakshineswar Temple?',
        optionA: 'Rani Rashmani',
        optionB: 'Raja Rammohan Roy',
        optionC: 'Keshab Chandra Sen',
        optionD: 'Rabindranath Tagore',
        correctOption: 'A',
        explanation: 'Rani Rashmani built Dakshineswar Temple in 1855, a major pilgrimage site.',
        difficulty: 'Explorer',
        points: 10,
      },
      // Guardian Difficulty (5 questions)
      {
        monumentId: seededMonuments[0].id,
        question: 'What specific architectural detail makes Victoria Memorial\'s marble inlay work exceptional?',
        optionA: 'Semi-precious stone inlay inspired by Taj Mahal',
        optionB: 'Pure white marble from Italian quarries',
        optionC: 'Hand-carved limestone carvings',
        optionD: 'Bronze relief sculptures',
        correctOption: 'A',
        explanation: 'Victoria Memorial features exquisite semi-precious stone inlay work inspired by Mughal traditions.',
        difficulty: 'Guardian',
        points: 15,
      },
      {
        monumentId: seededMonuments[1].id,
        question: 'How many vehicles cross Howrah Bridge daily, making it one of the world\'s busiest?',
        optionA: 'Approximately 2 million',
        optionB: 'Approximately 5 million',
        optionC: 'Approximately 10 million',
        optionD: 'Approximately 15 million',
        correctOption: 'A',
        explanation: 'Howrah Bridge handles approximately 2 million vehicles daily, making it one of the world\'s busiest structures.',
        difficulty: 'Guardian',
        points: 15,
      },
      {
        monumentId: seededMonuments[5].id,
        question: 'What unique architectural philosophy guided Belur Math\'s design?',
        optionA: 'Hindu supremacy',
        optionB: 'Syncretism blending Hindu, Islamic, and Christian elements',
        optionC: 'Buddhist minimalism',
        optionD: 'Colonial modernism',
        correctOption: 'B',
        explanation: 'Belur Math was designed on syncretistic principles, blending architectural elements from Hinduism, Islam, and Christianity.',
        difficulty: 'Guardian',
        points: 15,
      },
      {
        monumentId: seededMonuments[2].id,
        question: 'Which spiritual leader achieved enlightenment at Dakshineswar Temple?',
        optionA: 'Rammohan Roy',
        optionB: 'Keshab Chandra Sen',
        optionC: 'Sri Ramakrishna Paramahamsa',
        optionD: 'Swami Vivekananda',
        correctOption: 'C',
        explanation: 'Sri Ramakrishna Paramahamsa attained spiritual realization at Dakshineswar Temple.',
        difficulty: 'Guardian',
        points: 15,
      },
      {
        monumentId: seededMonuments[7].id,
        question: 'Which notable independence leader is buried in Park Street Cemetery?',
        optionA: 'Subhas Chandra Bose',
        optionB: 'Keshab Chandra Sen',
        optionC: 'Surendra Nath Banerjee',
        optionD: 'Bankim Chandra Chattopadhyay',
        correctOption: 'B',
        explanation: 'Keshab Chandra Sen, social reformer and independence advocate, is buried in Park Street Cemetery.',
        difficulty: 'Guardian',
        points: 15,
      },
    ];

    for (const q of quizData) {
      await db.insert(quizQuestions).values(q);
    }
    console.log('✅ Quiz questions seeded');

    // Seed Community Stories (5 stories)
    console.log('📖 Seeding 5 community stories...');
    const storiesData = [
      {
        monumentId: seededMonuments[0].id,
        title: 'My Grandmother\'s First Visit to Victoria Memorial',
        storyType: 'Personal Memory',
        content: 'In 1960, my grandmother, dressed in her finest saree, visited Victoria Memorial for the first time after independence. She wept seeing the monument transformed into an Indian museum. She told me she felt the weight of history and the hope of a free nation in that single moment.',
        language: 'English',
        contributorName: 'Ananya Roy',
        contributorCity: 'Kolkata',
        isApproved: true,
        upvotes: 45,
      },
      {
        monumentId: seededMonuments[1].id,
        title: 'The Bridge That Connected Our Love',
        storyType: 'Personal Memory',
        content: 'I proposed to my wife on Howrah Bridge at sunset. We stood watching the river flow beneath our feet, and I realized that like this bridge, our love would connect hearts across all distances.',
        language: 'English',
        contributorName: 'Rajesh Kumar',
        contributorCity: 'Howrah',
        isApproved: true,
        upvotes: 67,
      },
      {
        monumentId: seededMonuments[2].id,
        title: 'Sacred Whispers at Kalighat',
        storyType: 'Folk Tale',
        content: 'They say on full moon nights, if you listen carefully at the ancient temple steps, you can hear the whispers of thousands of devotees from centuries past. Each prayer, each tear, each offering has left an invisible mark.',
        language: 'English',
        contributorName: 'Mehul Desai',
        contributorCity: 'Kolkata',
        isApproved: true,
        upvotes: 89,
      },
      {
        monumentId: seededMonuments[5].id,
        title: 'The Philosophy Within Marble',
        storyType: 'Oral History',
        content: 'My grandfather was a stone mason who worked on Belur Math during its renovation. He said every arch, every column represents a different path to the divine. The building itself is a sermon in marble.',
        language: 'English',
        contributorName: 'Vikram Sharma',
        contributorCity: 'Howrah',
        isApproved: true,
        upvotes: 56,
      },
      {
        monumentId: seededMonuments[3].id,
        title: 'The Last Bookshop on College Street',
        storyType: 'Legend',
        content: 'There\'s a bookshop so old that people say it contains every significant book about Bengal ever printed. Students come seeking inspiration, and many swear they found not just books, but answers to their life\'s questions.',
        language: 'English',
        contributorName: 'Priya Dutta',
        contributorCity: 'Kolkata',
        isApproved: true,
        upvotes: 102,
      },
    ];

    for (const story of storiesData) {
      await db.insert(communityStories).values(story);
    }
    console.log('✅ Community stories seeded');

    console.log('\n✨ Database seeding complete!');
    console.log('📊 Summary:');
    console.log('   - 8 Monuments');
    console.log('   - 6 Tram Stops');
    console.log('   - 15 Quiz Questions');
    console.log('   - 5 Community Stories');
    console.log('\n🎉 Kolkata Heritage database is ready to go!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

seed();
