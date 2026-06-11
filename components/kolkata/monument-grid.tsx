'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SkeletonLoader } from './skeleton-loader';
import { getRiskColor } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const COMING_SOON_INFO = (
  <div className="space-y-6 text-center font-sans text-sm md:text-base text-foreground py-12">
    <h1 className="text-3xl md:text-4xl font-playfair font-bold text-foreground">Expanding Our Heritage Collection</h1>
    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
      We're continuously adding verified information, historical narratives, and cultural insights for monuments, temples, museums, and heritage sites.
    </p>
    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
      This heritage record is currently being curated and will be available soon.
    </p>
  </div>
);

const GLORIOUS_DEAD_INFO = (
  <div className="space-y-4 text-left font-sans text-sm md:text-base text-foreground pb-8">
    <h1 className="text-3xl font-playfair font-bold text-foreground">Glorious Dead Monument</h1>

    <h2 className="text-xl font-bold mt-6 mb-2">Overview</h2>
    <p>The Glorious Dead Monument is one of Kolkata's lesser-known yet historically significant war memorials. Located in the historic Maidan area near several of the city's major colonial landmarks, the monument was erected to honor the soldiers who lost their lives during the First World War (1914–1918). It stands as a solemn reminder of the sacrifices made by thousands of men from undivided India who served in distant battlefields across Europe, Africa, and the Middle East.</p>
    <p>Although often overshadowed by larger monuments such as the Victoria Memorial, the Glorious Dead Monument occupies an important place in Kolkata's historical landscape. It represents courage, sacrifice, and remembrance while highlighting India's contribution to one of the most significant conflicts in world history.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Historical Background</h2>
    <p>When the First World War broke out in 1914, British India became a major source of military manpower for the British Empire. More than a million Indian soldiers and support personnel participated in the war, serving in numerous campaigns across different continents.</p>
    <p>Thousands of these soldiers never returned home. To honor their sacrifice, several memorials were constructed throughout India during the years following the war. The Glorious Dead Monument in Kolkata was one such memorial, dedicated to remembering those who gave their lives in service during the conflict.</p>
    <p>The monument was established during a period when remembrance ceremonies and war memorials were becoming an important part of public life throughout the British Empire. It served as a place where families, officials, soldiers, and citizens could pay tribute to the fallen.</p>
    <p>Today, the monument continues to remind visitors of the human cost of war and the important role played by Indian soldiers during the First World War.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Architecture and Design</h2>
    <p>The Glorious Dead Monument was designed as a memorial rather than a grand public building. Its architecture reflects dignity, solemnity, and respect for those being commemorated.</p>
    <p>The structure features clean lines, classical influences, and carefully crafted inscriptions intended to inspire reflection and remembrance.</p>
    <p>Notable features include:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>Memorial-style architectural design.</li>
      <li>Stone construction emphasizing permanence and dignity.</li>
      <li>Commemorative inscriptions honoring fallen soldiers.</li>
      <li>Symmetrical proportions reflecting classical influences.</li>
      <li>Open surroundings that create a peaceful atmosphere.</li>
    </ul>
    <p>Unlike monuments built to celebrate victories or rulers, the Glorious Dead Monument was created specifically to honor sacrifice and loss, giving it a unique emotional significance.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Connection to World War I</h2>
    <p>The monument is closely associated with India's participation in the First World War.</p>
    <p>Indian soldiers served in:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>France and Belgium on the Western Front.</li>
      <li>Mesopotamia (modern-day Iraq).</li>
      <li>East Africa.</li>
      <li>Egypt and the Middle East.</li>
      <li>Gallipoli and other important campaigns.</li>
    </ul>
    <p>Many soldiers faced harsh conditions, unfamiliar climates, and intense combat. Their bravery earned international recognition, and numerous Indian regiments distinguished themselves in battle.</p>
    <p>The Glorious Dead Monument commemorates these sacrifices and serves as a reminder that India's contribution to the war extended far beyond its borders.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Historical Significance</h2>
    <p>The significance of the monument extends beyond military history.</p>
    <p>It reflects:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>India's role in global events during the early twentieth century.</li>
      <li>The contribution of Indian soldiers to international conflicts.</li>
      <li>The impact of war on families and communities.</li>
      <li>The culture of remembrance that emerged after World War I.</li>
      <li>The historical connection between Kolkata and the British Indian Army.</li>
    </ul>
    <p>For historians, the monument provides valuable insight into how societies choose to remember and honor those who served in times of conflict.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Cultural Importance</h2>
    <p>Over time, the Glorious Dead Monument has become part of Kolkata's broader heritage landscape. It contributes to the city's collection of monuments that document different chapters of history, from colonial administration and trade to religion, education, and military service.</p>
    <p>The memorial also encourages reflection on themes such as duty, sacrifice, and peace. Visitors often view it as a place not only to remember the past but also to appreciate the importance of preserving peace in the present.</p>
    <p>Its location within the historic core of Kolkata further strengthens its connection to the city's rich and diverse heritage.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">The Meaning of "Glorious Dead"</h2>
    <p>The phrase "Glorious Dead" was commonly used on war memorials throughout the British Empire following the First World War. It was intended to honor those who had lost their lives in service and to recognize their courage and sacrifice.</p>
    <p>By using this phrase, the monument places the soldiers' contributions at the center of remembrance, ensuring that their service would not be forgotten by future generations.</p>
    <p>The inscription serves as both a tribute and a reminder of the human stories behind historical events.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Interesting Facts</h2>
    <ul className="list-disc pl-5 space-y-1">
      <li>The monument commemorates soldiers who died during the First World War (1914–1918).</li>
      <li>It honors members of the British Indian Army who served overseas.</li>
      <li>The memorial reflects a tradition of war remembrance found throughout the former British Empire.</li>
      <li>Thousands of Indian soldiers fought in Europe, Africa, and the Middle East during World War I.</li>
      <li>The monument is located within Kolkata's historic heritage district.</li>
      <li>It serves as a reminder of India's global military contributions during the early twentieth century.</li>
      <li>The phrase "Glorious Dead" became a common inscription on war memorials after World War I.</li>
      <li>The monument remains an important site of historical remembrance.</li>
    </ul>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Visitor Experience</h2>
    <p>Visitors to the Glorious Dead Monument often experience a sense of quiet reflection. Unlike bustling tourist attractions, the memorial encourages contemplation about the lives of those who served and the impact of war on society.</p>
    <p>The monument's simple yet dignified design allows visitors to focus on its message rather than elaborate decoration. History enthusiasts, students, and heritage travelers frequently include it in tours of Kolkata's colonial-era landmarks.</p>
    <p>Its proximity to other historic monuments makes it an important stop for those seeking a deeper understanding of the city's multifaceted history.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Legacy</h2>
    <p>More than a century after the end of the First World War, the Glorious Dead Monument continues to preserve the memory of soldiers who made the ultimate sacrifice. It stands as a symbol of courage, duty, and remembrance while highlighting India's important role in global history.</p>
    <p>As generations pass, the monument remains a powerful reminder that behind every historical event are individuals whose lives shaped the course of history. Through its enduring presence, the Glorious Dead Monument ensures that their sacrifices continue to be remembered and honored.</p>
  </div>
);

const TIPU_SULTAN_MOSQUE_INFO = (
  <div className="space-y-4 text-left font-sans text-sm md:text-base text-foreground pb-8">
    <h1 className="text-3xl font-playfair font-bold text-foreground">Tipu Sultan Shahi Mosque</h1>

    <h2 className="text-xl font-bold mt-6 mb-2">Overview</h2>
    <p>Tipu Sultan Shahi Mosque is one of Kolkata's most prominent and historically significant mosques. Located on the bustling Esplanade area in the heart of the city, the mosque stands as an important symbol of Islamic heritage, architectural beauty, and religious harmony. Known for its striking white façade, elegant domes, and towering minarets, the mosque attracts worshippers, historians, and visitors throughout the year.</p>
    <p>Despite its name, the mosque was not built by the famous ruler Tipu Sultan of Mysore. Instead, it was commissioned by Prince Ghulam Mohammed, one of Tipu Sultan's sons, who settled in Kolkata after the fall of the Kingdom of Mysore. Today, the mosque remains one of the most recognizable religious landmarks in Kolkata and an important part of the city's multicultural identity.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Historical Background</h2>
    <p>The origins of Tipu Sultan Shahi Mosque date back to the early nineteenth century. After the defeat of Tipu Sultan in 1799, several members of his family were relocated by the British East India Company. Among them was Prince Ghulam Mohammed, who later became an influential figure in Kolkata.</p>
    <p>Determined to preserve the cultural and religious traditions of his family, Ghulam Mohammed commissioned the construction of a grand mosque in central Kolkata. The mosque was completed in 1842 and soon became an important place of worship for the city's Muslim community.</p>
    <p>Over the years, the mosque witnessed significant developments in Kolkata's history, including the colonial period, India's struggle for independence, and the city's transformation into a modern metropolitan center. Throughout these changes, it continued to serve as a center of faith, community, and cultural continuity.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Architecture and Design</h2>
    <p>Tipu Sultan Shahi Mosque is admired for its elegant Indo-Islamic architectural style. The structure combines traditional Islamic design elements with influences from Mughal architecture, resulting in a visually striking monument.</p>
    <p>The mosque's most distinctive features include its multiple domes and slender minarets that rise prominently above the surrounding urban landscape.</p>
    <p>Notable architectural features include:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>A grand central prayer hall.</li>
      <li>Multiple white domes crowning the structure.</li>
      <li>Tall and graceful minarets.</li>
      <li>Decorative arches and intricate detailing.</li>
      <li>Spacious courtyard areas.</li>
      <li>Symmetrical design emphasizing balance and harmony.</li>
    </ul>
    <p>The bright white exterior gives the mosque a sense of purity and elegance, making it one of Kolkata's most recognizable religious buildings.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Religious Importance</h2>
    <p>For nearly two centuries, Tipu Sultan Shahi Mosque has served as an important center of Islamic worship in Kolkata. Thousands of worshippers visit the mosque daily to offer prayers and participate in religious activities.</p>
    <p>The mosque is especially significant during:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>Friday congregational prayers.</li>
      <li>Ramadan observances.</li>
      <li>Eid celebrations.</li>
      <li>Religious lectures and community gatherings.</li>
    </ul>
    <p>Its central location makes it easily accessible to worshippers from different parts of the city, contributing to its continued importance within Kolkata's Muslim community.</p>
    <p>The mosque also promotes values of faith, compassion, and community service, which remain central to its mission.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Cultural Significance</h2>
    <p>Beyond its religious role, Tipu Sultan Shahi Mosque represents Kolkata's long tradition of cultural diversity and coexistence. The city has historically been home to communities of various faiths, languages, and backgrounds, and the mosque stands as a symbol of this multicultural heritage.</p>
    <p>Its presence in the heart of Kolkata reflects the contributions of the Muslim community to the city's social, cultural, and historical development.</p>
    <p>The mosque is frequently included in heritage walks and cultural tours that explore Kolkata's rich architectural and religious landscape.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Connection to Tipu Sultan's Legacy</h2>
    <p>One of the most fascinating aspects of the mosque is its connection to the family of Tipu Sultan, the legendary ruler of Mysore known for resisting British expansion in southern India.</p>
    <p>Although Tipu Sultan himself never visited Kolkata, the mosque preserves the memory of his family and their continued influence after the fall of Mysore. Through Prince Ghulam Mohammed's efforts, the mosque became a lasting symbol of the family's cultural and religious legacy.</p>
    <p>This connection adds an important historical dimension to the site, linking Kolkata with one of the most celebrated figures in Indian history.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Community and Social Contributions</h2>
    <p>Throughout its history, the mosque has served not only as a place of worship but also as a center for community engagement and social welfare.</p>
    <p>Various initiatives associated with the mosque have supported:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>Religious education.</li>
      <li>Charitable activities.</li>
      <li>Community outreach programs.</li>
      <li>Assistance for those in need.</li>
      <li>Cultural and educational events.</li>
    </ul>
    <p>These activities have strengthened the mosque's role as an important institution within the broader community.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Interesting Facts</h2>
    <ul className="list-disc pl-5 space-y-1">
      <li>Tipu Sultan Shahi Mosque was completed in 1842.</li>
      <li>It was commissioned by Prince Ghulam Mohammed, son of Tipu Sultan.</li>
      <li>The mosque is located in Kolkata's Esplanade area.</li>
      <li>It is one of the largest and most prominent mosques in the city.</li>
      <li>The structure features multiple domes and elegant minarets.</li>
      <li>Despite its name, Tipu Sultan himself never lived in Kolkata.</li>
      <li>The mosque remains an active center of worship and community life.</li>
      <li>It is considered one of Kolkata's most important Islamic heritage landmarks.</li>
    </ul>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Visitor Experience</h2>
    <p>Visitors to Tipu Sultan Shahi Mosque are often impressed by its architectural elegance and spiritual atmosphere. The combination of graceful domes, tall minarets, and intricate detailing creates a sense of beauty and tranquility amidst the busy urban surroundings.</p>
    <p>The mosque offers an opportunity to learn about Kolkata's Islamic heritage while appreciating the city's tradition of religious diversity. Visitors can admire the architecture, observe daily life around the mosque, and gain insight into the historical connections between Kolkata and the family of Tipu Sultan.</p>
    <p>Its location near several major landmarks also makes it a popular stop for those exploring the city's heritage districts.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Legacy</h2>
    <p>More than 180 years after its construction, Tipu Sultan Shahi Mosque remains an enduring symbol of faith, heritage, and cultural continuity. It reflects the resilience of a community, the legacy of a historic family, and the rich diversity that has shaped Kolkata for centuries.</p>
    <p>As both a place of worship and a heritage landmark, the mosque continues to connect people with the city's past while serving the needs of the present. Its architectural beauty, historical significance, and spiritual importance ensure that it remains one of Kolkata's most cherished landmarks.</p>
  </div>
);

const SOUTH_PARK_STREET_CEMETERY_INFO = (
  <div className="space-y-4 text-left font-sans text-sm md:text-base text-foreground pb-8">
    <h1 className="text-3xl font-playfair font-bold text-foreground">South Park Street Cemetery</h1>

    <h2 className="text-xl font-bold mt-6 mb-2">Overview</h2>
    <p>South Park Street Cemetery is one of Kolkata's most fascinating heritage sites and among the oldest non-church cemeteries in the world. Established in 1767, it serves as a remarkable reminder of the city's early colonial history and offers visitors a unique glimpse into life in eighteenth and nineteenth-century Calcutta.</p>
    <p>Unlike a traditional cemetery, South Park Street Cemetery resembles an open-air museum of architecture, history, and art. Spread across several acres, the site contains hundreds of tombs, mausoleums, obelisks, and memorials built in a variety of architectural styles. Overgrown trees, winding pathways, and weathered monuments create an atmosphere that is both peaceful and historically captivating.</p>
    <p>Today, the cemetery is recognized as a protected heritage site and is considered one of Kolkata's most important historical landmarks.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Historical Background</h2>
    <p>South Park Street Cemetery was established in 1767 during a period when Calcutta was rapidly growing as the administrative and commercial center of British India. At the time, European residents required a large burial ground outside the crowded areas of the city, leading to the creation of this cemetery.</p>
    <p>The cemetery remained in active use until around 1830. During these decades, many British administrators, military officers, merchants, scholars, and notable residents of colonial Calcutta were buried here.</p>
    <p>The site reflects the challenges of life in eighteenth-century India. Disease, tropical illnesses, and limited medical knowledge often resulted in high mortality rates, especially among Europeans living far from their homeland. As a result, the cemetery became the final resting place for many individuals who played significant roles in the early history of British India.</p>
    <p>Over time, the cemetery ceased active burials and gradually became a historical monument preserving the memories of a bygone era.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Architecture and Design</h2>
    <p>One of the most remarkable aspects of South Park Street Cemetery is its extraordinary funerary architecture. The tombs found within the cemetery are unlike those typically seen in modern burial grounds.</p>
    <p>Many monuments were designed as miniature temples, pyramids, domes, and classical structures inspired by European, Mughal, and Indo-Saracenic influences.</p>
    <p>Notable architectural features include:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>Massive stone mausoleums.</li>
      <li>Egyptian-inspired pyramidal tombs.</li>
      <li>Classical European columns and arches.</li>
      <li>Decorative domes and cupolas.</li>
      <li>Elaborate carvings and inscriptions.</li>
      <li>Tree-lined pathways creating a garden-like setting.</li>
    </ul>
    <p>The architectural diversity of the cemetery makes it one of the most unique heritage sites in India and an important resource for historians and architects.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Famous Burials</h2>
    <p>The cemetery contains the graves of several notable figures associated with the early development of British India.</p>
    <h3 className="text-lg font-semibold mt-4">Sir William Jones</h3>
    <p>One of the most famous individuals buried here is Sir William Jones, a renowned linguist, scholar, and founder of the Asiatic Society. His pioneering studies of Indian languages, culture, and history contributed significantly to the development of modern Oriental studies.</p>
    <h3 className="text-lg font-semibold mt-4">Henry Louis Vivian Derozio</h3>
    <p>The cemetery is also associated with Henry Derozio, the influential poet, teacher, and leader of the Young Bengal Movement. His ideas inspired generations of students and played a role in the intellectual awakening known as the Bengal Renaissance.</p>
    <h3 className="text-lg font-semibold mt-4">British Administrators and Military Officers</h3>
    <p>Many senior officials, judges, soldiers, merchants, and influential residents of colonial Calcutta are buried within the cemetery, making it an important historical archive in stone.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Historical Significance</h2>
    <p>South Park Street Cemetery provides valuable insights into the social, cultural, and political history of eighteenth-century Kolkata.</p>
    <p>The cemetery reflects:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>The growth of Calcutta as a colonial capital.</li>
      <li>The lives of early European settlers in India.</li>
      <li>The architectural trends of the colonial era.</li>
      <li>The challenges of health and survival during the eighteenth century.</li>
      <li>The development of education, scholarship, and administration in British India.</li>
    </ul>
    <p>Because many prominent historical figures are buried here, the cemetery serves as an important source of information for researchers studying India's colonial past.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Cultural and Literary Importance</h2>
    <p>The cemetery has long inspired writers, historians, artists, and photographers. Its quiet atmosphere, historic monuments, and weathered architecture create a setting unlike any other in Kolkata.</p>
    <p>Many visitors describe the cemetery as one of the city's most atmospheric locations. Its combination of nature and history gives it a unique character that appeals to both heritage enthusiasts and creative minds.</p>
    <p>The site frequently appears in heritage walks, documentaries, books, and academic studies focusing on Kolkata's colonial legacy.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Flora and Environment</h2>
    <p>Over the centuries, nature has become an integral part of the cemetery's identity. Large trees, climbing vines, and dense vegetation surround many of the monuments, creating a striking contrast between architecture and nature.</p>
    <p>This environment provides:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>Natural shade throughout the grounds.</li>
      <li>Habitat for birds and small wildlife.</li>
      <li>Scenic settings for photography.</li>
      <li>A peaceful atmosphere for visitors.</li>
    </ul>
    <p>The interaction between history and nature contributes significantly to the cemetery's unique charm.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Interesting Facts</h2>
    <ul className="list-disc pl-5 space-y-1">
      <li>South Park Street Cemetery was established in 1767.</li>
      <li>It is among the oldest non-church cemeteries in the world.</li>
      <li>The cemetery was active until approximately 1830.</li>
      <li>Sir William Jones, founder of the Asiatic Society, is buried here.</li>
      <li>Many tombs resemble miniature temples, pyramids, and monuments.</li>
      <li>The site contains hundreds of historic graves and memorials.</li>
      <li>It is considered one of the finest examples of colonial funerary architecture in Asia.</li>
      <li>The cemetery is a protected heritage site and a popular destination for heritage tourism.</li>
    </ul>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Visitor Experience</h2>
    <p>A visit to South Park Street Cemetery feels like stepping back in time. Visitors can wander through pathways lined with centuries-old tombs, admire remarkable architectural details, and learn about individuals who shaped the history of Kolkata and British India.</p>
    <p>Unlike many urban attractions, the cemetery offers a peaceful and reflective environment where history can be explored at a slower pace. The quiet surroundings, combined with the beauty of the monuments and greenery, make it one of Kolkata's most distinctive heritage destinations.</p>
    <p>History enthusiasts, architecture lovers, photographers, and researchers often regard it as one of the city's hidden treasures.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Legacy</h2>
    <p>More than 250 years after its establishment, South Park Street Cemetery remains one of Kolkata's most important historical sites. It preserves the stories of people, events, and cultural exchanges that shaped the city during its formative years.</p>
    <p>As a place where architecture, history, and memory come together, the cemetery continues to educate and inspire visitors from around the world. Its unique atmosphere and historical significance ensure that it remains an enduring symbol of Kolkata's rich and layered heritage.</p>
  </div>
);

const ROYAL_INSURANCE_INFO = (
  <div className="space-y-4 text-left font-sans text-sm md:text-base text-foreground pb-8">
    <h1 className="text-3xl font-playfair font-bold text-foreground">Royal Insurance Building</h1>

    <h2 className="text-xl font-bold mt-6 mb-2">Overview</h2>
    <p>The Royal Insurance Building is one of Kolkata's most elegant and architecturally significant heritage structures. Situated in the historic B.B.D. Bagh area, the building is a remarkable example of early twentieth-century commercial architecture and reflects Kolkata's status as a major financial and trading center during the British colonial era.</p>
    <p>Known for its impressive façade, ornate detailing, and distinctive European architectural influences, the Royal Insurance Building stands as a testament to the city's economic prosperity during a period when Kolkata was one of the most important commercial hubs in Asia. Today, it remains a prominent landmark and an important part of Kolkata's rich architectural heritage.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Historical Background</h2>
    <p>The Royal Insurance Building was constructed in the early twentieth century to serve as the regional headquarters of the Royal Insurance Company, a major British insurance firm. During this period, Kolkata was a thriving center for international trade, shipping, banking, and commerce.</p>
    <p>As businesses expanded and financial institutions established their presence in the city, several grand office buildings were constructed around Dalhousie Square, now known as B.B.D. Bagh. The Royal Insurance Building was among these prestigious commercial structures and symbolized the growing influence of global finance and trade in colonial India.</p>
    <p>The building quickly became associated with Kolkata's commercial elite and contributed to the development of the city's financial district. For decades, it played an important role in supporting insurance and business activities throughout eastern India.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Architecture and Design</h2>
    <p>The Royal Insurance Building is celebrated for its striking blend of classical European and Renaissance-inspired architectural styles. Unlike many ordinary office buildings of its time, it was designed to project elegance, authority, and prestige.</p>
    <p>Its exterior is richly decorated with ornamental details that immediately capture attention.</p>
    <p>Notable architectural features include:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>Grand European-style façade.</li>
      <li>Decorative balconies and arched windows.</li>
      <li>Elaborate stone carvings and sculptural elements.</li>
      <li>Symmetrical architectural composition.</li>
      <li>Classical columns and ornamental detailing.</li>
      <li>Impressive corner towers and rooftop features.</li>
    </ul>
    <p>The building's intricate craftsmanship reflects the high standards of architectural design that characterized many of Kolkata's important commercial structures during the colonial period.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">The Famous Sculptures</h2>
    <p>One of the most distinctive aspects of the Royal Insurance Building is the presence of decorative sculptures and artistic embellishments on its exterior.</p>
    <p>The building features beautifully crafted figures, ornamental motifs, and decorative elements inspired by European architectural traditions. These artistic details were intended to symbolize prosperity, security, and confidence—qualities closely associated with the insurance industry.</p>
    <p>Even today, the sculptural decorations remain among the building's most admired features and contribute significantly to its visual appeal.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Role in Kolkata's Commercial History</h2>
    <p>During the late nineteenth and early twentieth centuries, Kolkata was one of the busiest ports and trading centers in the British Empire. Businesses involved in shipping, banking, insurance, and international commerce established offices throughout the city.</p>
    <p>The Royal Insurance Building formed part of this growing financial landscape. It represented the increasing importance of insurance services in supporting trade and economic activity.</p>
    <p>The building's location near major government offices, commercial institutions, and transportation networks made it an ideal headquarters for business operations.</p>
    <p>As Kolkata's economy expanded, structures like the Royal Insurance Building helped shape the city's reputation as a leading commercial center in South Asia.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Architectural Significance</h2>
    <p>Architectural historians regard the Royal Insurance Building as one of the finest examples of commercial heritage architecture in Kolkata.</p>
    <p>Unlike purely administrative structures, the building was designed to impress clients and visitors while demonstrating the strength and stability of the institution it represented.</p>
    <p>Its carefully balanced proportions, decorative façade, and artistic detailing showcase the influence of European architectural movements that were popular during the early twentieth century.</p>
    <p>Today, it remains an important example of how architecture was used to communicate prestige and corporate identity during the colonial era.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Heritage and Preservation</h2>
    <p>As Kolkata modernized, many historic commercial buildings faced challenges from urban development, environmental conditions, and changing business requirements. Recognizing the cultural value of these structures, preservation efforts have focused on protecting important heritage buildings such as the Royal Insurance Building.</p>
    <p>The building continues to be appreciated for its historical and architectural significance. Conservation initiatives help ensure that future generations can continue to admire one of Kolkata's most beautiful examples of colonial-era commercial architecture.</p>
    <p>Its preservation contributes to maintaining the unique character of the B.B.D. Bagh heritage district.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Interesting Facts</h2>
    <ul className="list-disc pl-5 space-y-1">
      <li>The building was constructed during the early twentieth century.</li>
      <li>It originally served as the office of the Royal Insurance Company.</li>
      <li>It is located in Kolkata's historic B.B.D. Bagh district.</li>
      <li>The structure is known for its elaborate European-inspired architectural design.</li>
      <li>Decorative sculptures and ornamental carvings are among its most distinctive features.</li>
      <li>It reflects Kolkata's importance as a major commercial and financial center during the colonial era.</li>
      <li>The building forms part of a larger collection of historic structures surrounding B.B.D. Bagh.</li>
      <li>It is considered one of the city's most attractive heritage office buildings.</li>
    </ul>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Visitor Experience</h2>
    <p>Visitors exploring Kolkata's heritage district often admire the Royal Insurance Building for its architectural beauty and historical atmosphere. The ornate façade, elegant detailing, and impressive proportions make it a favorite subject for photographers, architecture enthusiasts, and heritage walkers.</p>
    <p>Although many visitors first notice the building because of its decorative exterior, its deeper significance lies in its connection to Kolkata's commercial history and economic development.</p>
    <p>The building is particularly impressive when viewed alongside nearby landmarks such as the General Post Office, Writers' Building, Town Hall, and St. John's Church, all of which contribute to the historic character of the area.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Legacy</h2>
    <p>The Royal Insurance Building stands as a lasting reminder of Kolkata's emergence as one of the most important commercial cities of the British Empire. Through its architecture, history, and association with finance and trade, it reflects a period of rapid economic growth and urban development.</p>
    <p>Today, the building continues to enrich Kolkata's architectural landscape and serves as an important symbol of the city's heritage. Its elegant design and historical significance ensure that it remains one of the most admired landmarks in the historic heart of Kolkata.</p>
  </div>
);

const GPO_INFO = (
  <div className="space-y-4 text-left font-sans text-sm md:text-base text-foreground pb-8">
    <h1 className="text-3xl font-playfair font-bold text-foreground">General Post Office (GPO)</h1>

    <h2 className="text-xl font-bold mt-6 mb-2">Overview</h2>
    <p>The General Post Office (GPO) is one of Kolkata's most iconic colonial-era buildings and a major landmark in the city's historic center. Located in the B.B.D. Bagh area, the GPO serves as the headquarters of the postal system in eastern India and is recognized for its magnificent white dome, grand architecture, and historical significance.</p>
    <p>Standing on a site closely connected to the early history of British Calcutta, the building represents both the development of communication networks in India and the growth of Kolkata as a major administrative and commercial center. For more than a century and a half, the GPO has remained an important institution, connecting people, businesses, and communities across the country.</p>
    <p>Today, it is admired not only as a functioning post office but also as one of Kolkata's most treasured heritage landmarks.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Historical Background</h2>
    <p>The present General Post Office was completed in 1868 during the British colonial period. It was designed by architect Walter B. Grenville and constructed at a time when Kolkata was the capital of British India and one of the most important cities in the British Empire.</p>
    <p>The site on which the GPO stands is historically significant because it is believed to be close to the location of the original Fort William, the early British fortress established in Calcutta. This fort played a central role in the city's development and was associated with several important historical events, including the Black Hole of Calcutta incident of 1756.</p>
    <p>As communication became increasingly important for administration, trade, and governance, the British government established the General Post Office as a central hub for postal services. The building soon became the heart of postal operations in eastern India and helped facilitate communication across vast distances during an era when letters were the primary means of long-distance contact.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Architecture and Design</h2>
    <p>The General Post Office is widely regarded as one of the finest examples of neoclassical architecture in Kolkata. Its design combines elegance, symmetry, and grandeur, reflecting the architectural preferences of the nineteenth century.</p>
    <p>The most striking feature of the building is its massive white dome, which dominates the skyline of the surrounding area and can be seen from a considerable distance.</p>
    <p>Key architectural features include:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>A large central dome rising above the structure.</li>
      <li>Classical Corinthian columns supporting the façade.</li>
      <li>Wide verandas and spacious interiors.</li>
      <li>Elegant arches and decorative detailing.</li>
      <li>Symmetrical neoclassical design.</li>
      <li>Grand entrance halls and administrative chambers.</li>
    </ul>
    <p>The combination of its impressive dome and graceful architectural proportions has made the GPO one of the most recognizable buildings in Kolkata.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Role in Communication and Administration</h2>
    <p>For generations, the General Post Office served as the primary center for postal operations in eastern India. Before the arrival of modern telecommunications and digital communication, letters, telegrams, and official documents passed through the GPO on their journey across India and beyond.</p>
    <p>The institution played a crucial role in:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>Delivering personal correspondence.</li>
      <li>Facilitating government communication.</li>
      <li>Supporting commercial and business activities.</li>
      <li>Connecting remote regions with major cities.</li>
      <li>Managing postal services throughout eastern India.</li>
    </ul>
    <p>The GPO became an essential part of daily life, helping maintain social, economic, and administrative connections throughout the country.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Connection to Kolkata's History</h2>
    <p>Few buildings in Kolkata are as closely connected to the city's historical development as the General Post Office.</p>
    <p>The area surrounding the GPO was once the center of British administration in Bengal. Nearby landmarks such as Writers' Building, Town Hall, St. John's Church, and Raj Bhavan collectively tell the story of Kolkata's rise as the capital of British India.</p>
    <p>Because the GPO stands near the site of the original Fort William, it occupies a location that witnessed some of the earliest chapters in the city's colonial history. As a result, the building serves as both a functional institution and a monument to Kolkata's historical evolution.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">The Famous Dome</h2>
    <p>The dome of the General Post Office is one of its most celebrated features. Rising prominently above the structure, it has become a familiar part of Kolkata's skyline.</p>
    <p>Architecturally, the dome symbolizes authority, permanence, and civic importance. It also reflects the influence of European public architecture, where domed structures were often used for important government and administrative buildings.</p>
    <p>Visitors and photographers frequently regard the dome as one of the most beautiful examples of colonial architecture in the city.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Cultural and Heritage Importance</h2>
    <p>Although primarily known as a government institution, the GPO has become an important heritage landmark. It represents a period when communication networks helped unite vast regions of the Indian subcontinent.</p>
    <p>The building also reflects Kolkata's role as a center of administration, commerce, and innovation during the nineteenth century. Its continued operation demonstrates the enduring relevance of institutions that have adapted to changing technologies while preserving their historical identity.</p>
    <p>The GPO remains a source of pride for many residents and an important stop on heritage walks through central Kolkata.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Interesting Facts</h2>
    <ul className="list-disc pl-5 space-y-1">
      <li>The General Post Office was completed in 1868.</li>
      <li>It was designed by architect Walter B. Grenville.</li>
      <li>The building serves as the headquarters of postal operations in eastern India.</li>
      <li>Its massive white dome is one of Kolkata's most recognizable landmarks.</li>
      <li>The GPO stands near the site of the original Fort William.</li>
      <li>For many years, letters and telegrams from across eastern India passed through this building.</li>
      <li>The structure is considered one of the finest examples of neoclassical architecture in Kolkata.</li>
      <li>It continues to function as an active post office while also serving as a heritage monument.</li>
    </ul>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Visitor Experience</h2>
    <p>Visitors to the General Post Office are often impressed by its grandeur and historical atmosphere. The building's elegant façade, towering dome, and prominent location make it one of the most photographed landmarks in the B.B.D. Bagh district.</p>
    <p>Walking around the area offers a glimpse into Kolkata's colonial past, with several historic buildings located nearby. Architecture enthusiasts appreciate the structure's classical design, while history lovers are drawn to its connection with the city's early development.</p>
    <p>The GPO provides a unique opportunity to experience a living heritage building that continues to serve its original purpose while preserving an important chapter of Kolkata's history.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Legacy</h2>
    <p>More than 150 years after its completion, the General Post Office remains one of Kolkata's most important architectural and historical landmarks. It symbolizes the city's role as a center of communication, administration, and commerce during a transformative period in Indian history.</p>
    <p>As both a functioning institution and a preserved heritage structure, the GPO continues to connect the past with the present. Its magnificent dome, rich history, and enduring significance ensure that it remains a cherished part of Kolkata's cultural and architectural landscape for generations to come.</p>
  </div>
);

const TOWN_HALL_INFO = (
  <div className="space-y-4 text-left font-sans text-sm md:text-base text-foreground pb-8">
    <h1 className="text-3xl font-playfair font-bold text-foreground">Town Hall</h1>

    <h2 className="text-xl font-bold mt-6 mb-2">Overview</h2>
    <p>Town Hall is one of Kolkata's most significant colonial-era landmarks and a symbol of the city's rich historical and civic heritage. Located in the heart of Kolkata near B.B.D. Bagh, the building has witnessed some of the most important political, social, and cultural events in the city's history. Known for its grand classical architecture and majestic columns, Town Hall stands as a reminder of Kolkata's role as the capital of British India and a center of intellectual and public life.</p>
    <p>Today, the building serves as a heritage museum and cultural venue, preserving valuable records, exhibitions, and stories related to Kolkata's development over the centuries.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Historical Background</h2>
    <p>Town Hall was constructed between 1807 and 1813 during the administration of Governor-General Lord Minto. At the beginning of the nineteenth century, Kolkata was rapidly growing as the administrative and commercial center of British India. The city lacked a large public building where important meetings, social gatherings, official receptions, and cultural events could be held.</p>
    <p>To address this need, British residents funded the construction of Town Hall through public contributions. The building soon became one of the most prestigious venues in Calcutta and served as the social and political heart of the city.</p>
    <p>Throughout the nineteenth and early twentieth centuries, Town Hall hosted numerous public meetings, official ceremonies, debates, exhibitions, and receptions attended by influential figures from both British and Indian society.</p>
    <p>As India's freedom movement gained momentum, the building also became associated with important discussions concerning social reform, governance, and national identity.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Architecture and Design</h2>
    <p>Town Hall is considered one of the finest examples of neoclassical architecture in India. The building was designed to reflect the grandeur and elegance of classical Greek and Roman structures.</p>
    <p>Its most striking feature is the impressive row of massive Doric columns that dominate the front façade. These columns support a grand portico, creating an appearance of strength, balance, and authority.</p>
    <p>Notable architectural features include:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>Neoclassical architectural style.</li>
      <li>Large Doric columns at the entrance.</li>
      <li>Grand staircase leading to the main hall.</li>
      <li>High ceilings and spacious interiors.</li>
      <li>Symmetrical design and elegant proportions.</li>
      <li>Large windows that allow natural light into the building.</li>
    </ul>
    <p>The architectural beauty of Town Hall reflects the ambition of early nineteenth-century Calcutta and remains one of the city's most admired heritage structures.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">A Center of Public Life</h2>
    <p>For many decades, Town Hall served as Kolkata's principal gathering place for public events. Before the emergence of modern convention centers and auditoriums, it was the preferred venue for important civic and cultural functions.</p>
    <p>The hall hosted:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>Official government receptions.</li>
      <li>Public lectures and debates.</li>
      <li>Cultural performances.</li>
      <li>Educational exhibitions.</li>
      <li>Social gatherings and celebrations.</li>
      <li>Meetings involving prominent political and community leaders.</li>
    </ul>
    <p>Many important discussions concerning education, governance, social reform, and public policy took place within its walls, making the building an important part of Kolkata's intellectual history.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Role in Kolkata's Historical Development</h2>
    <p>As Kolkata evolved into one of Asia's most influential cities, Town Hall played a central role in documenting and reflecting that transformation.</p>
    <p>The building witnessed:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>The growth of British administration in India.</li>
      <li>The rise of educational and cultural institutions.</li>
      <li>The Bengal Renaissance and social reform movements.</li>
      <li>The development of nationalist ideas during the freedom struggle.</li>
      <li>The transition from colonial rule to independent India.</li>
    </ul>
    <p>Because of its long association with public affairs, Town Hall offers valuable insights into the political and social evolution of Kolkata.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Restoration and Preservation</h2>
    <p>By the late twentieth century, Town Hall had suffered from age, neglect, and environmental wear. Recognizing its historical importance, authorities initiated major restoration efforts to preserve the building.</p>
    <p>These conservation projects carefully restored the structure's original architectural features while adapting the space for modern use. Today, the building houses exhibitions and museum galleries that showcase Kolkata's history and heritage.</p>
    <p>The successful restoration of Town Hall is considered an important achievement in the preservation of the city's architectural legacy.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Kolkata Panorama Museum</h2>
    <p>One of the most important attractions within Town Hall today is the Kolkata Panorama exhibition.</p>
    <p>This museum presents the story of Kolkata's development from a small trading settlement to one of India's most influential cities. Through historical displays, photographs, maps, and visual exhibits, visitors can explore key events that shaped the city's identity.</p>
    <p>The exhibition helps visitors understand how Kolkata grew into a center of commerce, culture, education, and political activity.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Interesting Facts</h2>
    <ul className="list-disc pl-5 space-y-1">
      <li>Town Hall was completed in 1813.</li>
      <li>The building was funded through public contributions from British residents.</li>
      <li>It is one of the finest examples of neoclassical architecture in India.</li>
      <li>Massive Doric columns are among its most recognizable features.</li>
      <li>The hall hosted important political, social, and cultural gatherings for over a century.</li>
      <li>It played a role during both the colonial period and India's freedom movement.</li>
      <li>The building now houses heritage exhibitions and historical displays.</li>
      <li>Town Hall remains one of Kolkata's most important preserved colonial landmarks.</li>
    </ul>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Visitor Experience</h2>
    <p>Visitors to Town Hall are greeted by its impressive architecture and rich historical atmosphere. The grand columns, spacious interiors, and museum exhibits provide an opportunity to explore Kolkata's past in a meaningful and engaging way.</p>
    <p>History enthusiasts can learn about the city's transformation over two centuries, while architecture lovers can admire one of the finest surviving examples of neoclassical design in India.</p>
    <p>Its central location near several other historic landmarks makes Town Hall an essential stop for anyone interested in understanding Kolkata's heritage.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Legacy</h2>
    <p>More than two hundred years after its construction, Town Hall continues to stand as a symbol of Kolkata's civic, cultural, and historical importance. The building represents a period when the city emerged as one of the leading centers of administration, education, and intellectual life in Asia.</p>
    <p>Today, it serves not only as a preserved heritage structure but also as a living link between Kolkata's past and present. Through its architecture, exhibitions, and historical significance, Town Hall continues to educate, inspire, and connect visitors with the remarkable story of the City of Joy.</p>
  </div>
);

const ST_PAULS_CATHEDRAL_INFO = (
  <div className="space-y-4 text-left font-sans text-sm md:text-base text-foreground pb-8">
    <h1 className="text-3xl font-playfair font-bold text-foreground">St. Paul's Cathedral</h1>

    <h2 className="text-xl font-bold mt-6 mb-2">Overview</h2>
    <p>St. Paul's Cathedral is one of Kolkata's most magnificent religious landmarks and among the most important churches in India. Located near the Victoria Memorial and the Maidan, the cathedral is renowned for its grand architecture, peaceful atmosphere, and historical significance. As the seat of the Anglican Diocese of Calcutta, it has served as a major center of Christian worship for over a century and a half.</p>
    <p>With its towering structure, beautiful stained-glass windows, and impressive interiors, St. Paul's Cathedral is not only a place of prayer but also a celebrated heritage monument that attracts visitors from across India and around the world. The cathedral stands as a symbol of Kolkata's diverse cultural and architectural legacy.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Historical Background</h2>
    <p>During the early nineteenth century, Kolkata was the capital of British India and home to a growing European population. Existing churches were no longer sufficient to accommodate the city's expanding Christian community. As a result, plans were made to construct a grand cathedral that would reflect the importance of Calcutta within the British Empire.</p>
    <p>The foundation stone of St. Paul's Cathedral was laid in 1839, and after several years of construction, the cathedral was officially consecrated in 1847. It became the first Anglican cathedral built in the British Empire outside the United Kingdom and quickly emerged as one of the city's most important religious institutions.</p>
    <p>Over the years, the cathedral witnessed major historical events, including the colonial era, India's independence movement, and the transformation of Kolkata into a modern metropolis. Despite natural disasters and changing times, it has remained an enduring symbol of faith and resilience.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Architecture and Design</h2>
    <p>St. Paul's Cathedral is widely regarded as one of the finest examples of Gothic Revival architecture in Asia. The architects adapted traditional Gothic design elements to suit India's climate, creating a unique architectural style often referred to as Indo-Gothic.</p>
    <p>The cathedral's exterior features pointed arches, tall windows, decorative towers, and elegant stonework. Its spacious interior was designed to provide a cool and comfortable environment despite Kolkata's tropical weather.</p>
    <p>Key architectural features include:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>Gothic Revival architectural style.</li>
      <li>Large nave with high vaulted ceilings.</li>
      <li>Beautiful stained-glass windows.</li>
      <li>Decorative stone carvings and memorial plaques.</li>
      <li>Elegant arches and intricate detailing.</li>
      <li>A prominent central tower inspired by English cathedral architecture.</li>
    </ul>
    <p>The cathedral's design successfully combines European architectural traditions with practical adaptations for Indian conditions, making it a unique landmark in the country's architectural history.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Earthquakes and Reconstruction</h2>
    <p>Throughout its history, St. Paul's Cathedral has survived several natural disasters, including major earthquakes.</p>
    <p>The original tower suffered damage during the devastating earthquake of 1897. After repairs were completed, another severe earthquake in 1934 caused additional structural damage. Following this event, parts of the cathedral were reconstructed.</p>
    <p>The tower seen today was redesigned based on the famous Bell Harry Tower of Canterbury Cathedral in England. The successful restoration ensured that the cathedral retained its grandeur while improving its structural stability.</p>
    <p>These reconstruction efforts demonstrate the importance placed on preserving one of Kolkata's most treasured heritage sites.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Interior and Artistic Treasures</h2>
    <p>The interior of St. Paul's Cathedral is as impressive as its exterior. Visitors are welcomed into a vast prayer hall filled with natural light, elegant arches, and finely crafted details.</p>
    <p>Among its most admired features are:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>Magnificent stained-glass windows depicting biblical scenes.</li>
      <li>Memorial tablets dedicated to notable historical figures.</li>
      <li>Beautiful wooden furnishings and decorative carvings.</li>
      <li>Historic paintings and religious artworks.</li>
      <li>A serene altar area designed for worship and reflection.</li>
    </ul>
    <p>The cathedral's artistic elements reflect both religious devotion and exceptional craftsmanship, making it a destination for art lovers as well as pilgrims.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Religious and Cultural Importance</h2>
    <p>For generations, St. Paul's Cathedral has been one of the most important Christian institutions in eastern India. It continues to host regular worship services, religious ceremonies, and special celebrations throughout the year.</p>
    <p>The cathedral is particularly famous during Christmas, when thousands of visitors gather to admire its festive decorations and participate in celebrations. The beautifully illuminated building becomes one of Kolkata's most visited attractions during the holiday season.</p>
    <p>Beyond its religious role, the cathedral represents the city's multicultural character and its long history of embracing diverse communities and traditions.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Interesting Facts</h2>
    <ul className="list-disc pl-5 space-y-1">
      <li>St. Paul's Cathedral was completed in 1847.</li>
      <li>It was the first Anglican cathedral built in the British Empire outside the United Kingdom.</li>
      <li>The cathedral is designed in the Gothic Revival style with adaptations for Indian weather conditions.</li>
      <li>The structure survived major earthquakes in 1897 and 1934.</li>
      <li>Its current tower was inspired by Canterbury Cathedral in England.</li>
      <li>The cathedral is famous for its stained-glass windows and memorial plaques.</li>
      <li>It is one of Kolkata's most visited heritage landmarks.</li>
      <li>During Christmas, thousands of visitors come to see the cathedral's decorations and celebrations.</li>
    </ul>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Visitor Experience</h2>
    <p>A visit to St. Paul's Cathedral offers a peaceful escape from the bustle of Kolkata. The cathedral's spacious interiors, beautiful architecture, and tranquil surroundings create an atmosphere of calm and reflection.</p>
    <p>Visitors can admire the stained-glass windows, explore the historic memorials, and appreciate the craftsmanship that has been preserved for generations. The cathedral's location near other major attractions such as Victoria Memorial and the Maidan makes it a popular stop on heritage tours of the city.</p>
    <p>Whether visiting for religious, historical, or architectural reasons, guests often leave with a deep appreciation for the beauty and significance of this remarkable landmark.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Legacy</h2>
    <p>More than 175 years after its inauguration, St. Paul's Cathedral continues to stand as one of Kolkata's most treasured monuments. It represents a unique blend of faith, architecture, history, and cultural heritage.</p>
    <p>As a symbol of resilience, spiritual devotion, and architectural excellence, the cathedral remains an enduring part of Kolkata's identity. Its majestic presence, rich history, and continuing role in community life ensure that it will remain one of the city's most cherished landmarks for generations to come.</p>
  </div>
);

const ST_JOHNS_CHURCH_INFO = (
  <div className="space-y-4 text-left font-sans text-sm md:text-base text-foreground pb-8">
    <h1 className="text-3xl font-playfair font-bold text-foreground">St. John's Church</h1>

    <h2 className="text-xl font-bold mt-6 mb-2">Overview</h2>
    <p>St. John's Church is one of the oldest and most historically significant churches in Kolkata. Located in the heart of the city near B.B.D. Bagh, the church stands as a remarkable reminder of Kolkata's early colonial history and the growth of British influence in India. Built in the late eighteenth century, it is often referred to as the "Stone Church" because of its distinctive stone construction.</p>
    <p>Beyond its religious importance, St. John's Church is a treasure house of history. Its grounds contain several monuments, memorials, tombs, and historical artifacts connected to important events and personalities from the colonial era. For historians, architecture enthusiasts, and visitors interested in Kolkata's past, St. John's Church remains one of the city's most valuable heritage sites.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Historical Background</h2>
    <p>The construction of St. John's Church began in 1784 and was completed in 1787. The project was initiated under the leadership of Warren Hastings, the first Governor-General of British India, who recognized the need for a major Anglican church in Calcutta.</p>
    <p>Before the church was built, British residents largely worshipped in smaller chapels and temporary religious structures. As Calcutta grew into the capital of British India, the need for a larger and more permanent church became increasingly important.</p>
    <p>St. John's Church soon became one of the most prominent places of worship for the British community. For many years, it served as the principal Anglican church in the city before the construction of larger cathedrals such as St. Paul's Cathedral.</p>
    <p>Over the centuries, the church witnessed many significant moments in Kolkata's history and became closely associated with the development of the city during the colonial period.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Architecture and Design</h2>
    <p>St. John's Church is an excellent example of neoclassical architecture. Its design was inspired by St. Martin-in-the-Fields Church in London, one of England's most famous churches.</p>
    <p>The building features elegant proportions, tall columns, large windows, and a prominent spire that rises above the surrounding landscape. The use of stone in its construction contributed to its nickname, "The Stone Church."</p>
    <p>Notable architectural features include:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>Neoclassical architectural style.</li>
      <li>Tall entrance portico supported by classical columns.</li>
      <li>Elegant central spire.</li>
      <li>Spacious prayer hall with high ceilings.</li>
      <li>Beautiful stained-glass windows.</li>
      <li>Historic marble memorials and plaques.</li>
    </ul>
    <p>The church's simple yet graceful design reflects the architectural tastes of the late eighteenth century and remains one of Kolkata's finest examples of colonial-era religious architecture.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">The Famous Painting</h2>
    <p>One of the church's greatest treasures is the renowned painting <strong>"The Last Supper"</strong> by artist Johann Zoffany.</p>
    <p>Unlike traditional depictions of the biblical scene, Zoffany's version includes faces modeled after prominent residents of colonial Calcutta. This unique interpretation makes the artwork both a religious masterpiece and an important historical record of eighteenth-century society.</p>
    <p>The painting remains one of the most admired attractions within the church and continues to draw art lovers and historians from around the world.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Historic Monuments and Memorials</h2>
    <p>The grounds of St. John's Church contain several important monuments that provide insight into Kolkata's colonial history.</p>
    <p>Among the most notable are:</p>
    <h3 className="text-lg font-semibold mt-4">Black Hole Monument</h3>
    <p>The memorial commemorating the Black Hole of Calcutta incident was relocated to the church grounds in the twentieth century. It remains one of the most discussed historical monuments in the city.</p>
    <h3 className="text-lg font-semibold mt-4">Mausoleum of Job Charnock</h3>
    <p>The church grounds contain the mausoleum of Job Charnock, a British administrator often regarded as one of the founders of Kolkata. Built from stone brought from Gaur, the structure is among the oldest surviving monuments in the city.</p>
    <h3 className="text-lg font-semibold mt-4">Colonial Graves and Memorials</h3>
    <p>Numerous British officials, soldiers, and notable residents of colonial Calcutta are buried within the church compound. Their memorials provide valuable information about the city's early history.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Cultural and Historical Importance</h2>
    <p>St. John's Church occupies a unique position in Kolkata's heritage because it connects religion, art, architecture, and history within a single site.</p>
    <p>The church serves as a reminder of Kolkata's transformation from a trading settlement into one of the most important cities of the British Empire. Through its monuments, memorials, and historical records, visitors gain a deeper understanding of the people and events that shaped the city.</p>
    <p>The church also highlights the multicultural nature of Kolkata's past, where European, Indian, and other influences interacted to create a distinctive urban culture.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Interesting Facts</h2>
    <ul className="list-disc pl-5 space-y-1">
      <li>St. John's Church was completed in 1787.</li>
      <li>It is among the oldest churches in Kolkata.</li>
      <li>The church is often called the "Stone Church."</li>
      <li>Warren Hastings played a major role in its establishment.</li>
      <li>The famous painting "The Last Supper" by Johann Zoffany is displayed inside.</li>
      <li>The mausoleum of Job Charnock is located within the church compound.</li>
      <li>The Black Hole Monument was relocated to the church grounds.</li>
      <li>The church contains numerous colonial-era memorials and graves.</li>
    </ul>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Visitor Experience</h2>
    <p>A visit to St. John's Church offers a fascinating journey through Kolkata's early history. Visitors can admire the church's architecture, explore its peaceful gardens, view historic monuments, and study the remarkable artworks housed within the building.</p>
    <p>Unlike many crowded tourist attractions, the church provides a calm and reflective atmosphere, allowing visitors to appreciate both its spiritual significance and historical importance.</p>
    <p>The combination of religious heritage, colonial architecture, famous artwork, and historical monuments makes St. John's Church one of Kolkata's most rewarding heritage destinations.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Legacy</h2>
    <p>More than two centuries after its construction, St. John's Church remains a symbol of Kolkata's rich and layered history. It preserves stories of faith, art, architecture, and colonial transformation while continuing to serve as an active place of worship.</p>
    <p>As one of the city's oldest surviving landmarks, the church stands as a living connection between Kolkata's past and present, offering future generations an opportunity to explore and understand the remarkable history of the City of Joy.</p>
  </div>
);

const METCALFE_HALL_INFO = (
  <div className="space-y-4 text-left font-sans text-sm md:text-base text-foreground pb-8">
    <h1 className="text-3xl font-playfair font-bold text-foreground">Metcalfe Hall</h1>

    <h2 className="text-xl font-bold mt-6 mb-2">Overview</h2>
    <p>Metcalfe Hall is one of Kolkata's most elegant colonial-era buildings and an important symbol of the city's intellectual and cultural heritage. Located along the banks of the Hooghly River, the structure is renowned for its grand classical architecture, towering columns, and historical significance. Inspired by ancient Greek temples, Metcalfe Hall stands as a reminder of Kolkata's role as a major center of education, administration, and culture during the nineteenth century.</p>
    <p>Today, the building is recognized as a heritage landmark and continues to attract visitors interested in architecture, history, and Kolkata's colonial past.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Historical Background</h2>
    <p>Metcalfe Hall was built between 1840 and 1844 in memory of Lord Charles Metcalfe, who served as the Governor-General of India. Lord Metcalfe is remembered for his support of press freedom and his efforts to encourage intellectual and educational development during British rule.</p>
    <p>The construction of the hall reflected the growing importance of Calcutta (now Kolkata) as the capital of British India and one of the most influential cities in Asia. The building was intended to serve as a public institution dedicated to learning and knowledge.</p>
    <p>For many years, Metcalfe Hall housed important libraries and collections that supported education and research. Scholars, students, and administrators frequently visited the hall, making it an important center of intellectual activity in the city.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Architecture and Design</h2>
    <p>Metcalfe Hall is widely admired for its striking neoclassical architecture. The design was inspired by ancient Greek temples, particularly the Temple of the Winds in Athens, and reflects the British fascination with classical European styles during the nineteenth century.</p>
    <p>The building's most distinctive feature is its impressive row of massive Corinthian columns that dominate the front façade. These columns support a grand pediment, giving the structure a monumental appearance.</p>
    <p>Key architectural features include:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>Neoclassical Greek-inspired design.</li>
      <li>Large Corinthian columns on both the front and rear sides.</li>
      <li>Symmetrical layout and proportions.</li>
      <li>Grand staircase leading to the main entrance.</li>
      <li>Spacious halls designed for public use.</li>
      <li>Elevated location overlooking the Hooghly River.</li>
    </ul>
    <p>The white exterior and classical detailing make Metcalfe Hall one of the finest examples of neoclassical architecture in India.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Educational and Cultural Importance</h2>
    <p>Throughout its history, Metcalfe Hall played a significant role in promoting education and knowledge. The building became associated with libraries, archives, and literary institutions that contributed to Kolkata's reputation as the intellectual capital of British India.</p>
    <p>The hall supported scholars, researchers, and students by providing access to books and educational resources. During a period when Kolkata was experiencing a cultural and intellectual renaissance, institutions like Metcalfe Hall helped encourage learning and public discourse.</p>
    <p>Its connection to literature, education, and scholarship remains an important part of its legacy.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Connection to Kolkata's Heritage</h2>
    <p>Metcalfe Hall reflects a period when Kolkata was one of the most important cities in the British Empire. During the nineteenth century, the city emerged as a center of administration, commerce, education, and culture.</p>
    <p>The hall stands alongside other prominent colonial landmarks that shaped the city's architectural identity. Together, these structures tell the story of Kolkata's transformation into a global urban center.</p>
    <p>The building also serves as a reminder of the city's role in the Bengal Renaissance, a period marked by significant developments in literature, science, education, and social reform.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Restoration and Preservation</h2>
    <p>Like many historic buildings, Metcalfe Hall faced challenges due to aging and environmental conditions. Over the years, restoration efforts have been undertaken to preserve its architectural beauty and historical value.</p>
    <p>Conservation projects have focused on maintaining the structure's original design while ensuring its long-term stability. These efforts help protect one of Kolkata's most important heritage buildings for future generations.</p>
    <p>Today, Metcalfe Hall remains a valuable example of heritage preservation within a rapidly modernizing city.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Interesting Facts</h2>
    <ul className="list-disc pl-5 space-y-1">
      <li>Metcalfe Hall was completed in 1844.</li>
      <li>The building was named after Lord Charles Metcalfe, a supporter of press freedom.</li>
      <li>Its design was inspired by ancient Greek architecture.</li>
      <li>The hall is considered one of the finest examples of neoclassical architecture in India.</li>
      <li>Massive Corinthian columns are among its most recognizable features.</li>
      <li>It was once associated with important libraries and educational institutions.</li>
      <li>The building overlooks the Hooghly River, adding to its scenic appeal.</li>
      <li>Metcalfe Hall is an important landmark of Kolkata's colonial and intellectual history.</li>
    </ul>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Visitor Experience</h2>
    <p>Visitors to Metcalfe Hall are immediately struck by its grand architecture and historical atmosphere. The impressive columns, elegant proportions, and riverside location create a sense of timelessness that transports visitors back to nineteenth-century Kolkata.</p>
    <p>The building offers an opportunity to appreciate the city's architectural heritage while learning about its educational and cultural development. History enthusiasts, architecture lovers, and students often find Metcalfe Hall particularly fascinating because of its connection to both colonial history and intellectual progress.</p>
    <p>Its location near several other historic landmarks also makes it a valuable stop on any heritage tour of Kolkata.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Legacy</h2>
    <p>Metcalfe Hall remains one of Kolkata's most distinguished heritage structures. More than just a colonial-era building, it represents the city's long-standing commitment to education, culture, and intellectual growth.</p>
    <p>Through its architecture, history, and cultural significance, the hall continues to tell the story of a city that played a crucial role in shaping modern India. As a preserved monument of the past, Metcalfe Hall stands as a lasting symbol of Kolkata's rich and diverse heritage.</p>
  </div>
);

const HOWRAH_BRIDGE_INFO = (
  <div className="space-y-4 text-left font-sans text-sm md:text-base text-foreground pb-8">
    <h1 className="text-3xl font-playfair font-bold text-foreground">Howrah Bridge (Rabindra Setu)</h1>

    <h2 className="text-xl font-bold mt-6 mb-2">Overview</h2>
    <p>Howrah Bridge is one of the most recognizable landmarks of Kolkata and one of the greatest engineering achievements in India. Spanning the Hooghly River, the bridge connects Kolkata with the city of Howrah and serves as a vital transportation link for millions of people. Officially known as Rabindra Setu since 1965, it remains popularly known as Howrah Bridge and has become a symbol of Kolkata's identity.</p>
    <p>For decades, the bridge has played a crucial role in the daily life of the city, carrying vehicles, pedestrians, and goods across the river. Its distinctive steel structure, impressive size, and historical significance have made it one of the most photographed and celebrated landmarks in India.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Historical Background</h2>
    <p>Before the construction of Howrah Bridge, transportation between Kolkata and Howrah largely depended on ferries and a temporary floating bridge. As trade, population, and industrial activity increased during the late nineteenth and early twentieth centuries, the need for a permanent crossing became increasingly important.</p>
    <p>Plans for a new bridge were developed to provide a stronger and more reliable connection across the Hooghly River. Construction began in the late 1930s, and despite challenges caused by World War II, the bridge was successfully completed.</p>
    <p>The bridge officially opened to traffic in February 1943. At the time, it was one of the largest cantilever bridges in the world and represented a remarkable feat of engineering.</p>
    <p>Over the years, Howrah Bridge became an essential part of eastern India's transportation network and contributed significantly to the economic growth of the region.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Engineering and Architecture</h2>
    <p>Howrah Bridge is famous for its unique cantilever design. Unlike many bridges that rely on support pillars placed within the river, Howrah Bridge spans the Hooghly River without any piers in the water.</p>
    <p>This design was particularly important because the Hooghly River experiences strong currents and heavy river traffic.</p>
    <p>Some of the bridge's most impressive engineering features include:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>Total length of approximately 705 meters.</li>
      <li>Main span of about 457 meters.</li>
      <li>Constructed using thousands of tons of high-tensile steel.</li>
      <li>Built without traditional nuts and bolts in many major joints, using riveted connections instead.</li>
      <li>Designed to withstand heavy traffic loads and challenging weather conditions.</li>
    </ul>
    <p>The massive steel framework creates the bridge's iconic silhouette, making it instantly recognizable from a distance.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Role in Kolkata's Development</h2>
    <p>The completion of Howrah Bridge transformed transportation in eastern India. It provided a permanent and efficient connection between Kolkata and Howrah, facilitating the movement of people, goods, and services.</p>
    <p>The bridge became particularly important because Howrah Station, one of India's busiest railway terminals, is located just across the river. Every day, thousands of passengers arriving by train use the bridge to enter Kolkata.</p>
    <p>The bridge also supported commercial activity by enabling faster movement of goods between industrial areas, markets, and transportation hubs. Its contribution to regional trade and economic growth has been immense.</p>
    <p>Today, it continues to serve as one of the busiest bridges in the country.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Cultural Significance</h2>
    <p>Howrah Bridge is much more than an engineering structure; it is a cultural icon of Kolkata. For generations, it has represented the spirit, resilience, and energy of the city.</p>
    <p>The bridge has appeared in countless films, documentaries, novels, paintings, and photographs. It is often used as a visual symbol whenever Kolkata is represented in media.</p>
    <p>For residents, the bridge is closely tied to daily life and personal memories. Millions of people have crossed it on their way to work, school, markets, festivals, and important life events.</p>
    <p>Its presence in Bengali culture and popular imagination has made it one of the most beloved landmarks in the city.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Interesting Facts</h2>
    <ul className="list-disc pl-5 space-y-1">
      <li>Howrah Bridge officially opened in 1943.</li>
      <li>It was renamed Rabindra Setu in 1965 in honor of Nobel laureate Rabindranath Tagore.</li>
      <li>The bridge spans the Hooghly River without any supporting pillars in the water.</li>
      <li>It was once among the largest cantilever bridges in the world.</li>
      <li>Millions of pedestrians and vehicles use the bridge every month.</li>
      <li>The bridge is illuminated at night, creating a spectacular view along the riverfront.</li>
      <li>It has featured in numerous Bollywood and Bengali films.</li>
      <li>The bridge is considered one of the defining symbols of Kolkata.</li>
    </ul>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">The Bridge at Night</h2>
    <p>One of the most memorable experiences for visitors is seeing Howrah Bridge after sunset. Modern lighting systems illuminate the steel structure, creating a striking reflection on the waters of the Hooghly River.</p>
    <p>The bridge's nighttime appearance has become a favorite subject for photographers and tourists. Nearby locations such as riverfront promenades and ghats offer excellent views of the illuminated structure.</p>
    <p>The combination of lights, river traffic, and the city's skyline creates one of Kolkata's most iconic scenes.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Tourism and Visitor Experience</h2>
    <p>Visitors often begin their exploration of Kolkata with a visit to Howrah Bridge due to its historical and cultural importance. The area around the bridge is filled with activity, including markets, ferries, railway stations, and riverside attractions.</p>
    <p>Walking near the bridge provides a glimpse into the everyday rhythm of Kolkata. The constant flow of people, vehicles, and boats reflects the city's vibrant character and economic vitality.</p>
    <p>Many visitors combine their trip to Howrah Bridge with visits to nearby heritage sites, riverfront locations, and traditional markets, making it an essential stop for anyone exploring Kolkata.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Legacy</h2>
    <p>More than eighty years after its inauguration, Howrah Bridge remains one of India's most celebrated engineering landmarks. It stands as a testament to innovation, resilience, and urban development.</p>
    <p>The bridge continues to connect communities, support economic activity, and symbolize the enduring spirit of Kolkata. Whether viewed as an engineering marvel, a transportation lifeline, or a cultural icon, Howrah Bridge occupies a unique place in the history and identity of the city.</p>
  </div>
);

const BLACK_HOLE_INFO = (
  <div className="space-y-4 text-left font-sans text-sm md:text-base text-foreground pb-8">
    <h1 className="text-3xl font-playfair font-bold text-foreground">Black Hole Monument</h1>

    <h2 className="text-xl font-bold mt-6 mb-2">Overview</h2>
    <p>The Black Hole Monument is a historical memorial associated with one of the most debated and controversial events of British colonial history in India. The monument commemorates the incident known as the "Black Hole of Calcutta," which allegedly took place on the night of 20 June 1756 at Fort William in Kolkata (then Calcutta).</p>
    <p>According to British accounts, a large number of British prisoners were confined overnight in a small guardroom after the capture of Fort William by the forces of Nawab Siraj-ud-Daulah. Many reportedly died due to overcrowding, heat, and lack of ventilation. The incident became widely known in Britain and was later used to justify the expansion of British power in India.</p>
    <p>Today, the Black Hole Monument serves as a reminder of a significant historical event that shaped colonial narratives and influenced the course of Indian history.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Historical Background</h2>
    <p>In the mid-eighteenth century, the British East India Company had established Fort William in Calcutta as an important trading and military center. Tensions grew between the Company and Siraj-ud-Daulah, the Nawab of Bengal, who opposed the British strengthening their fortifications without permission.</p>
    <p>In June 1756, Siraj-ud-Daulah's army attacked and captured Fort William. Following the capture, a number of British soldiers, officials, and civilians were reportedly imprisoned overnight in a small room within the fort.</p>
    <p>The story of the event became famous through the writings of John Zephaniah Holwell, a survivor who later published an account claiming that many prisoners died from suffocation and exhaustion. His narrative gained significant attention in Britain and became one of the most widely discussed colonial-era incidents.</p>
    <p>However, modern historians have debated the accuracy of Holwell's account. Questions remain regarding the number of prisoners involved, the number of deaths, and whether certain details were exaggerated. As a result, the Black Hole incident continues to be studied and discussed by historians today.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">The Original Monument</h2>
    <p>To commemorate the victims, John Zephaniah Holwell erected a memorial in the eighteenth century near the site where the incident allegedly occurred. The original monument stood for several decades before disappearing as Calcutta expanded and developed.</p>
    <p>The memorial became an important symbol for British residents in the city, representing what they viewed as a tragic event in the history of British India.</p>
    <p>Over time, the original structure was lost, and its exact location became difficult to identify due to urban development.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Reconstruction and Relocation</h2>
    <p>During the early twentieth century, British authorities decided to reconstruct the memorial. A new Black Hole Monument was erected in Kolkata to preserve the memory of the incident.</p>
    <p>The monument later became politically controversial during India's freedom movement. Many Indian nationalists argued that the memorial promoted a one-sided colonial interpretation of history and ignored the broader context of British expansion in India.</p>
    <p>In 1940, following public debate and political pressure, the monument was relocated from its original public setting to the grounds of St. John's Church, where it remains today.</p>
    <p>This relocation marked an important shift in how colonial monuments were viewed during the final years of British rule.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Architectural Features</h2>
    <p>The present monument is relatively simple compared to many of Kolkata's grand colonial structures. It was designed primarily as a memorial rather than an elaborate architectural landmark.</p>
    <p>Key features include:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>Tall stone obelisk-style design.</li>
      <li>Memorial inscriptions commemorating the event.</li>
      <li>Classical colonial-era aesthetics.</li>
      <li>Historical plaques providing context.</li>
      <li>Location within the historic grounds of St. John's Church.</li>
    </ul>
    <p>Although modest in appearance, the monument carries considerable historical significance due to the debates and events associated with it.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Historical Significance</h2>
    <p>The Black Hole incident played a major role in shaping British public opinion during the eighteenth century. News of the tragedy spread throughout Britain and generated strong support for military action against the Nawab of Bengal.</p>
    <p>Within a year of the incident, the British East India Company achieved a decisive victory at the Battle of Plassey in 1757. This victory marked the beginning of British political dominance in India and eventually led to nearly two centuries of colonial rule.</p>
    <p>As a result, the Black Hole Monument is connected not only to the events of 1756 but also to the broader story of British expansion in South Asia.</p>
    <p>The monument serves as a reminder of how historical narratives can influence politics, public opinion, and national identity.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Cultural and Educational Importance</h2>
    <p>Today, the Black Hole Monument attracts historians, students, researchers, and visitors interested in Kolkata's colonial past. It provides an opportunity to explore both the historical event itself and the differing interpretations that have emerged over time.</p>
    <p>The monument is particularly valuable as an educational site because it encourages visitors to examine historical sources critically and understand how perspectives can change across generations.</p>
    <p>It highlights Kolkata's role as one of the most important cities in the history of British India.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Interesting Facts</h2>
    <ul className="list-disc pl-5 space-y-1">
      <li>The event is believed to have occurred on 20 June 1756.</li>
      <li>The incident took place after the capture of Fort William by Siraj-ud-Daulah.</li>
      <li>Much of what is known about the event comes from the writings of survivor John Zephaniah Holwell.</li>
      <li>Historians continue to debate the accuracy of the reported death toll.</li>
      <li>The original memorial was erected by Holwell himself.</li>
      <li>The current monument stands within the grounds of St. John's Church in Kolkata.</li>
      <li>The controversy surrounding the monument reflects changing attitudes toward colonial history.</li>
      <li>The incident indirectly influenced events leading to the Battle of Plassey in 1757.</li>
    </ul>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Visitor Experience</h2>
    <p>Visitors to the Black Hole Monument encounter a site that is both historically important and intellectually thought-provoking. Unlike many monuments that celebrate architecture or artistic achievement, this memorial encourages reflection on historical memory, colonial narratives, and the complexities of the past.</p>
    <p>Located within the peaceful surroundings of St. John's Church, the monument provides an opportunity to explore one of Kolkata's lesser-known yet historically significant landmarks and gain a deeper understanding of the events that helped shape modern Indian history.</p>
  </div>
);

const VICTORIA_INFO = (
  <div className="space-y-4 text-left font-sans text-sm md:text-base text-foreground pb-8">
    <h1 className="text-3xl font-playfair font-bold text-foreground">Victoria Memorial</h1>
    
    <h2 className="text-xl font-bold mt-6 mb-2">Overview</h2>
    <p>Victoria Memorial is one of Kolkata's most iconic landmarks and a symbol of the city's colonial heritage. Located in the heart of Kolkata, this magnificent white marble monument was built in memory of Queen Victoria, who ruled the British Empire from 1837 to 1901. Surrounded by lush gardens and reflecting pools, the memorial attracts millions of visitors every year and serves as both a historical monument and a museum.</p>
    <p>The structure stands as a reminder of Kolkata's importance during the British era when the city served as the capital of British India until 1911. Today, Victoria Memorial is not only a popular tourist attraction but also an important center for preserving historical artifacts, artworks, manuscripts, and records related to India's past.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Historical Background</h2>
    <p>Following the death of Queen Victoria in 1901, Lord Curzon, the then Viceroy of India, proposed the construction of a grand memorial to honor her legacy. The idea was to create a building that would symbolize the strength and influence of the British Empire in India while also serving as a cultural and historical institution.</p>
    <p>Construction of the memorial began in 1906 and continued for several years before being officially opened to the public in 1921. The project was funded through contributions from British officials, Indian princes, and members of the public. The completed monument became one of the largest and most impressive memorials built during the colonial period.</p>
    <p>Over time, the meaning of the memorial evolved. While originally intended to commemorate Queen Victoria, it now serves as a museum that documents the history of Kolkata, the British Raj, and India's journey through the colonial era.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Architecture and Design</h2>
    <p>Victoria Memorial is renowned for its stunning architecture, which blends classical European styles with Mughal influences. This architectural approach, known as the Indo-Saracenic style, was commonly used in important public buildings during the British period.</p>
    <p>The monument is constructed entirely from white Makrana marble, the same marble used in the construction of the Taj Mahal. Its grand central dome dominates the skyline and can be seen from various parts of the city.</p>
    <p>Some of the most notable architectural features include:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>A massive central dome crowned by the Angel of Victory statue.</li>
      <li>Beautiful marble staircases and galleries.</li>
      <li>Decorative sculptures representing justice, charity, motherhood, and learning.</li>
      <li>Large gardens spread across more than sixty acres.</li>
      <li>Reflecting pools and pathways that enhance the monument's grandeur.</li>
    </ul>
    <p>The Angel of Victory placed on top of the dome is one of the most recognizable elements of the structure. Designed to rotate with the wind, it symbolizes triumph and progress.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Museum and Collections</h2>
    <p>Today, Victoria Memorial functions as one of India's most important museums. Inside the building are numerous galleries displaying artifacts that provide insights into the history of British India and Kolkata.</p>
    <p>Visitors can explore:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>Historical paintings depicting important events.</li>
      <li>Portraits of British officials and Indian rulers.</li>
      <li>Rare books and manuscripts.</li>
      <li>Maps and archival documents.</li>
      <li>Weapons, medals, and personal belongings from the colonial period.</li>
      <li>Exhibitions showcasing Kolkata's development over the centuries.</li>
    </ul>
    <p>The museum's collections help visitors understand how Kolkata evolved into one of the most influential cities in South Asia.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Cultural Significance</h2>
    <p>Victoria Memorial holds a unique place in Kolkata's cultural identity. For many residents, it is more than just a historical building—it is a landmark associated with memories, celebrations, photography, and leisure activities.</p>
    <p>The gardens surrounding the memorial are popular gathering places for families, students, tourists, and photographers. Cultural events, exhibitions, and educational programs are regularly organized within the premises, helping connect younger generations with the city's history.</p>
    <p>The monument has also appeared in numerous films, documentaries, books, and travel publications, further strengthening its status as a symbol of Kolkata.</p>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Interesting Facts</h2>
    <ul className="list-disc pl-5 space-y-1">
      <li>Victoria Memorial was officially opened in 1921.</li>
      <li>The monument was built using white Makrana marble from Rajasthan.</li>
      <li>The structure combines British and Mughal architectural styles.</li>
      <li>The Angel of Victory statue on top of the dome rotates according to wind direction.</li>
      <li>The memorial houses dozens of galleries and thousands of historical artifacts.</li>
      <li>It is one of the most visited heritage attractions in eastern India.</li>
      <li>The surrounding gardens cover more than sixty acres of land.</li>
      <li>Victoria Memorial is often referred to as the "Pride of Kolkata" because of its historical and architectural importance.</li>
    </ul>
    <hr className="my-4 border-border" />

    <h2 className="text-xl font-bold mt-6 mb-2">Visitor Experience</h2>
    <p>A visit to Victoria Memorial offers a combination of history, architecture, art, and nature. During the day, visitors can explore the museum galleries and learn about the city's colonial past. In the evening, the illuminated marble structure creates a spectacular sight, attracting photographers and tourists alike.</p>
    <p>The beautifully maintained gardens, peaceful atmosphere, and rich historical collections make Victoria Memorial one of the most memorable destinations in Kolkata and an essential stop for anyone interested in understanding the city's heritage.</p>
  </div>
);

type Monument = {
  id: string;
  name: string;
  location: string;
  built_year: number;
  risk_level: string;
  image_url: string;
  description: string;
  city: string;
};

export function MonumentGrid() {
  const [monuments, setMonuments] = useState<Monument[]>([]);
  const [filteredMonuments, setFilteredMonuments] = useState<Monument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [selectedMonument, setSelectedMonument] = useState<Monument | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 1) {
          sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          sliderRef.current.scrollBy({ left: 350, behavior: 'smooth' });
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchMonuments() {
      try {
        setLoading(true);
        const response = await fetch('/api/monuments?city=Kolkata');
        if (!response.ok) throw new Error('Failed to fetch monuments');
        let data: Monument[] = await response.json();
        
        // Inject Victoria Memorial and Black Hole Monument if not present
        let newMonuments = [...data];
        
        if (!newMonuments.some(m => m.name === 'Victoria Memorial')) {
          newMonuments.unshift({
            id: 'victoria-memorial',
            name: 'Victoria Memorial',
            location: 'Queen\'s Way, Kolkata',
            built_year: 1921,
            risk_level: 'low',
            image_url: '/images/Victoria Memorial.jpg',
            description: 'A large marble building in Kolkata, West Bengal, India, which was built between 1906 and 1921.',
            city: 'Kolkata'
          });
        }
        
        if (!newMonuments.some(m => m.name === 'Black Hole Monument')) {
          newMonuments.push({
            id: 'black-hole-monument',
            name: 'Black Hole Monument',
            location: 'St. John\'s Church, Kolkata',
            built_year: 1901,
            risk_level: 'medium',
            image_url: '/images/Black Hole Monument.jpg',
            description: 'A monument commemorating the controversial "Black Hole of Calcutta" incident of 1756.',
            city: 'Kolkata'
          });
        }
        
        if (!newMonuments.some(m => m.name === 'Howrah Bridge')) {
          newMonuments.push({
            id: 'howrah-bridge',
            name: 'Howrah Bridge',
            location: 'Hooghly River, Kolkata',
            built_year: 1943,
            risk_level: 'low',
            image_url: '/images/howrah_bridge.jpg',
            description: 'An iconic cantilever bridge spanning the Hooghly River, connecting Kolkata and Howrah.',
            city: 'Kolkata'
          });
        }
        
        if (!newMonuments.some(m => m.name === 'Metcalfe Hall')) {
          newMonuments.push({
            id: 'metcalfe-hall',
            name: 'Metcalfe Hall',
            location: 'Strand Road, Kolkata',
            built_year: 1844,
            risk_level: 'low',
            image_url: '/images/Metcalfe Hall.jpg',
            description: 'A neoclassical building known for its Greek-inspired Corinthian columns and historical significance.',
            city: 'Kolkata'
          });
        }
        
        if (!newMonuments.some(m => m.name === 'St. John\'s Church')) {
          newMonuments.push({
            id: 'st-johns-church',
            name: 'St. John\'s Church',
            location: 'B.B.D. Bagh, Kolkata',
            built_year: 1787,
            risk_level: 'low',
            image_url: '/images/St. John’s Church.jpg',
            description: 'One of the oldest churches in Kolkata, renowned for its neoclassical architecture and historical monuments.',
            city: 'Kolkata'
          });
        }

        if (!newMonuments.some(m => m.name === 'St. Paul\'s Cathedral')) {
          newMonuments.push({
            id: 'st-pauls-cathedral',
            name: 'St. Paul\'s Cathedral',
            location: 'Maidan, Kolkata',
            built_year: 1847,
            risk_level: 'low',
            image_url: '/images/St. Paul’s Cathedral.jpg',
            description: 'A magnificent Indo-Gothic cathedral and one of Kolkata\'s most significant heritage landmarks.',
            city: 'Kolkata'
          });
        }
        
        if (!newMonuments.some(m => m.name === 'Town Hall')) {
          newMonuments.push({
            id: 'town-hall',
            name: 'Town Hall',
            location: 'B.B.D. Bagh, Kolkata',
            built_year: 1813,
            risk_level: 'low',
            image_url: '/images/town_hall.jpg',
            description: 'A grand neoclassical building that served as the center of Kolkata\'s civic and cultural life.',
            city: 'Kolkata'
          });
        }
        
        if (!newMonuments.some(m => m.name === 'General Post Office')) {
          newMonuments.push({
            id: 'gpo',
            name: 'General Post Office',
            location: 'B.B.D. Bagh, Kolkata',
            built_year: 1868,
            risk_level: 'low',
            image_url: '/images/General Post Office.jpg',
            description: 'Kolkata\'s iconic postal headquarters, known for its magnificent white dome and neoclassical architecture.',
            city: 'Kolkata'
          });
        }
        
        if (!newMonuments.some(m => m.name === 'Royal Insurance Building')) {
          newMonuments.push({
            id: 'royal-insurance',
            name: 'Royal Insurance Building',
            location: 'B.B.D. Bagh, Kolkata',
            built_year: 1905,
            risk_level: 'low',
            image_url: '/images/Royal Insurance Building.jpg',
            description: 'A striking blend of classical European and Renaissance-inspired commercial architecture.',
            city: 'Kolkata'
          });
        }
        
        if (!newMonuments.some(m => m.name === 'South Park Street Cemetery')) {
          newMonuments.push({
            id: 'south-park-cemetery',
            name: 'South Park Street Cemetery',
            location: 'Park Street, Kolkata',
            built_year: 1767,
            risk_level: 'low',
            image_url: '/images/South Park Street Cemetery.jpg',
            description: 'One of the oldest non-church cemeteries in the world, resembling an open-air museum of funerary architecture.',
            city: 'Kolkata'
          });
        }
        
        if (!newMonuments.some(m => m.name === 'Tipu Sultan Shahi Mosque')) {
          newMonuments.push({
            id: 'tipu-sultan-mosque',
            name: 'Tipu Sultan Shahi Mosque',
            location: 'Esplanade, Kolkata',
            built_year: 1842,
            risk_level: 'low',
            image_url: '/images/Tipu Sultan Shahi Mosque.jpg',
            description: 'An elegant Indo-Islamic mosque known for its striking white façade and multiple domes.',
            city: 'Kolkata'
          });
        }
        
        if (!newMonuments.some(m => m.name === 'Glorious Dead Monument')) {
          newMonuments.push({
            id: 'glorious-dead',
            name: 'Glorious Dead Monument',
            location: 'Maidan, Kolkata',
            built_year: 1924,
            risk_level: 'low',
            image_url: '/images/Glorious Dead Monument.jpg',
            description: 'A solemn war memorial honoring the Indian soldiers who sacrificed their lives in the First World War.',
            city: 'Kolkata'
          });
        }
        
        if (!newMonuments.some(m => m.name === 'Expanding Our Heritage Collection')) {
          newMonuments.push({
            id: 'coming-soon',
            name: 'Expanding Our Heritage Collection',
            location: 'Coming Soon',
            built_year: new Date().getFullYear(),
            risk_level: 'low',
            image_url: '',
            description: "We're continuously adding verified information, historical narratives, and cultural insights for monuments, temples, museums, and heritage sites. This heritage record is currently being curated and will be available soon.",
            city: 'Kolkata'
          });
        }

        setMonuments(newMonuments);
        setFilteredMonuments(newMonuments);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }
    fetchMonuments();
  }, []);

  useEffect(() => {
    let filtered = monuments;

    if (riskFilter !== 'all') {
      filtered = filtered.filter((m) => m.risk_level.toLowerCase() === riskFilter.toLowerCase());
    }

    if (search) {
      filtered = filtered.filter(
        (m) =>
          m.name.toLowerCase().includes(search.toLowerCase()) ||
          m.location.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredMonuments(filtered);
  }, [search, riskFilter, monuments]);

  if (error) {
    return (
      <section id="monuments" className="py-16 px-4 md:px-8 lg:px-12 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center p-8 bg-card rounded-lg border-2 border-destructive">
            <p className="text-destructive font-semibold">Error: {error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="monuments" className="py-16 px-4 md:px-8 lg:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header and Slider Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground">
              Kolkata&apos;s Living Heritage
            </h2>
          </motion.div>
          
          <div className="flex gap-4">
            <button
              onClick={slideLeft}
              className="p-3 rounded-full bg-card hover:bg-muted border border-border shadow-sm transition-colors text-foreground"
              aria-label="Slide left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={slideRight}
              className="p-3 rounded-full bg-card hover:bg-muted border border-border shadow-sm transition-colors text-foreground"
              aria-label="Slide right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-8 space-y-4"
        >
          <Input
            type="text"
            placeholder="Search monuments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-card border-border"
          />
          <div className="flex flex-wrap gap-2">
            <Button
              variant={riskFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setRiskFilter('all')}
              className={riskFilter === 'all' ? 'bg-primary' : ''}
            >
              All
            </Button>
            <Button
              variant={riskFilter === 'low' ? 'default' : 'outline'}
              onClick={() => setRiskFilter('low')}
              className={riskFilter === 'low' ? 'bg-primary' : ''}
            >
              Safe
            </Button>
            <Button
              variant={riskFilter === 'medium' ? 'default' : 'outline'}
              onClick={() => setRiskFilter('medium')}
              className={riskFilter === 'medium' ? 'bg-primary' : ''}
            >
              Medium Risk
            </Button>
            <Button
              variant={riskFilter === 'high' ? 'default' : 'outline'}
              onClick={() => setRiskFilter('high')}
              className={riskFilter === 'high' ? 'bg-primary' : ''}
            >
              High Risk
            </Button>
          </div>
        </motion.div>

        {/* Monument Slider */}
        {loading ? (
          <SkeletonLoader />
        ) : (
          <motion.div
            ref={sliderRef}
            className="grid grid-rows-2 grid-flow-col overflow-x-auto gap-6 pb-8 snap-x snap-mandatory auto-cols-[300px] md:auto-cols-[350px]"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.08, delayChildren: 0.2 },
              },
            }}
          >
            {filteredMonuments.map((monument) => (
              <div key={monument.id} className="snap-center h-full">
                <MonumentCard 
                  monument={monument} 
                  onClick={() => setSelectedMonument(monument)}
                />
              </div>
            ))}
          </motion.div>
        )}

        {/* Info Modal */}
        <AnimatePresence>
          {selectedMonument && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-background w-full max-w-4xl max-h-[90vh] rounded-xl shadow-2xl overflow-hidden flex flex-col border border-border"
              >
                {/* Header */}
                <div className="p-4 border-b border-border flex justify-between items-center sticky top-0 bg-background z-10">
                  <h3 className="font-playfair text-xl font-bold">{selectedMonument.name}</h3>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedMonument(null)} className="rounded-full">
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                
                {/* Content */}
                <div className="overflow-y-auto p-6 md:p-8">
                  {/* Image */}
                  <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-8">
                    <Image
                      src={selectedMonument.image_url || '/images/monument-placeholder.jpg'}
                      alt={selectedMonument.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {selectedMonument.name === 'Victoria Memorial' ? (
                    VICTORIA_INFO
                  ) : selectedMonument.name === 'Black Hole Monument' ? (
                    BLACK_HOLE_INFO
                  ) : selectedMonument.name === 'Howrah Bridge' ? (
                    HOWRAH_BRIDGE_INFO
                  ) : selectedMonument.name === 'Metcalfe Hall' ? (
                    METCALFE_HALL_INFO
                  ) : selectedMonument.name === 'St. John\'s Church' ? (
                    ST_JOHNS_CHURCH_INFO
                  ) : selectedMonument.name === 'St. Paul\'s Cathedral' ? (
                    ST_PAULS_CATHEDRAL_INFO
                  ) : selectedMonument.name === 'Town Hall' ? (
                    TOWN_HALL_INFO
                  ) : selectedMonument.name === 'General Post Office' ? (
                    GPO_INFO
                  ) : selectedMonument.name === 'Royal Insurance Building' ? (
                    ROYAL_INSURANCE_INFO
                  ) : selectedMonument.name === 'South Park Street Cemetery' ? (
                    SOUTH_PARK_STREET_CEMETERY_INFO
                  ) : selectedMonument.name === 'Tipu Sultan Shahi Mosque' ? (
                    TIPU_SULTAN_MOSQUE_INFO
                  ) : selectedMonument.name === 'Glorious Dead Monument' ? (
                    GLORIOUS_DEAD_INFO
                  ) : selectedMonument.name === 'Expanding Our Heritage Collection' ? (
                    COMING_SOON_INFO
                  ) : (
                    <div className="text-left font-sans text-foreground">
                      <p>{selectedMonument.description}</p>
                      <p className="mt-4 font-semibold">Location: {selectedMonument.location}</p>
                      <p className="font-semibold">Built Year: {selectedMonument.built_year}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {!loading && filteredMonuments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No monuments found matching your filters.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function MonumentCard({ monument, onClick }: { monument: Monument, onClick: () => void }) {
  if (monument.id === 'coming-soon') {
    return (
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
        whileHover={{ y: -6 }}
        className="group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-border flex items-center justify-center h-full min-h-[350px]"
      >
        <div className="p-6 text-center space-y-4">
          <h3 className="font-playfair text-2xl font-bold text-foreground leading-snug">
            Expanding Our Heritage Collection
          </h3>
          <p className="text-sm text-muted-foreground">
            We're continuously adding verified information, historical narratives, and cultural insights for monuments, temples, museums, and heritage sites.
          </p>
          <p className="text-sm text-muted-foreground italic">
            This heritage record is currently being curated and will be available soon.
          </p>
        </div>
      </motion.div>
    );
  }

  const riskColor = getRiskColor(monument.risk_level);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
      whileHover={{ y: -6 }}
      onClick={onClick}
      className="group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-border"
    >
      {/* Image Area */}
      <div className="relative h-48 bg-muted overflow-hidden">
        <Image
          src={monument.image_url || '/images/monument-placeholder.jpg'}
          alt={monument.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Risk Badge */}
        <div
          className="absolute top-3 right-3 px-3 py-1 rounded-full text-white text-xs font-bold"
          style={{ backgroundColor: riskColor }}
        >
          {monument.risk_level.charAt(0).toUpperCase() + monument.risk_level.slice(1)} Risk
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-playfair text-lg font-bold text-foreground mb-1 line-clamp-2">
          {monument.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
          {monument.location} • {monument.built_year}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded">
            {monument.city}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button size="sm" className="bg-[#E8651A] hover:bg-[#c85015] text-white flex-1">
            Explore in 3D
          </Button>
          <button className="p-2 rounded hover:bg-muted transition-colors">
            <svg
              className="w-5 h-5 text-foreground"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </button>
        </div>
      </div>

    </motion.div>
  );
}
