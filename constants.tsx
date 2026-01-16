
import { Publication, PublicationType, NewsItem, CareerOpportunity, Resource } from './types';

export const MOCK_PUBLICATIONS: Publication[] = [
  {
    id: '1',
    title: 'Geological Evolution of the Nubian Shield in Eritrea',
    author: 'Dr. Teklehaimanot, B.',
    date: '2023-11-15',
    abstract: 'A comprehensive study of the tectonic evolution and mineralization of the Eritrean crustal blocks.',
    keywords: ['Nubian Shield', 'Tectonics', 'Mineralization'],
    type: PublicationType.JOURNAL,
    doi: '10.1000/seesme.2023.01',
    url: '#',
    downloads: 1245
  },
  {
    id: '2',
    title: 'Bisha Mine: Sustainable Tailings Management Report',
    author: 'Mining Engineering Dept.',
    date: '2024-02-10',
    abstract: 'Annual technical report on the environmental mitigation strategies and tailings facility safety.',
    keywords: ['Mining', 'Environment', 'Tailings'],
    type: PublicationType.TECHNICAL_REPORT,
    url: '#',
    downloads: 890
  },
  {
    id: '3',
    title: 'Potential for Geothermal Energy in the Danakil Depression',
    author: 'Dr. Gebrehiwot, K.',
    date: '2021-08-20',
    abstract: 'Exploration of thermal anomalies and potential power generation sites in the Eritrean rift system.',
    keywords: ['Geothermal', 'Energy', 'Rift Valley'],
    type: PublicationType.CONFERENCE,
    url: '#',
    downloads: 3210
  },
  {
    id: '4',
    title: 'Gold Mineralization in the Zara District',
    author: 'Dr. Teklehaimanot, B.',
    date: '2019-05-12',
    abstract: 'Structural controls and geochemistry of gold-bearing quartz veins in northern Eritrea.',
    keywords: ['Gold', 'Geochemistry', 'Zara District'],
    type: PublicationType.JOURNAL,
    url: '#',
    downloads: 567
  },
  {
    id: '5',
    title: 'Sedimentary Basins and Hydrocarbon Potential of the Red Sea',
    author: 'Dr. Idris, M.',
    date: '2020-11-30',
    abstract: 'Seismic interpretation and stratigraphic analysis of the offshore Eritrean margin.',
    keywords: ['Hydrocarbons', 'Red Sea', 'Seismic'],
    type: PublicationType.TECHNICAL_REPORT,
    url: '#',
    downloads: 432
  },
  {
    id: '6',
    title: 'Artisanal Mining Impacts on Groundwater Quality',
    author: 'Dr. Gebrehiwot, K.',
    date: '2022-03-15',
    abstract: 'Assessment of heavy metal contamination in rural water sources near mining sites.',
    keywords: ['Environment', 'Groundwater', 'Artisanal Mining'],
    type: PublicationType.JOURNAL,
    url: '#',
    downloads: 1102
  }
];

export const MOCK_NEWS: NewsItem[] = [
  {
    id: 'n1',
    title: 'SEESME Annual Conference 2025 Announced',
    category: 'Event',
    date: '2024-12-01',
    excerpt: 'The upcoming conference will focus on "Resilient Mining and Climate Adaptation in East Africa".',
    content: 'Long form content about the conference...',
    imageUrl: 'https://picsum.photos/seed/seesme1/800/600'
  },
  {
    id: 'n2',
    title: 'New Partnership with International Mining Union',
    category: 'Achievement',
    date: '2024-11-20',
    excerpt: 'SEESME signs a memorandum of understanding for student exchange programs.',
    content: 'Details on the partnership...',
    imageUrl: 'https://picsum.photos/seed/seesme2/800/600'
  }
];

export const MOCK_CAREERS: CareerOpportunity[] = [
  {
    id: 'c1',
    title: 'Graduate Fellowship in Hydrology',
    type: 'Fellowship',
    deadline: '2025-03-31',
    eligibility: 'BSc in Geology or related field',
    description: 'A 12-month research program focused on groundwater mapping.',
    provider: 'UNESCO-IHP Eritrea'
  },
  {
    id: 'c2',
    title: 'Call for Papers: 2025 Earth Science Review',
    type: 'Call for Papers',
    deadline: '2025-01-15',
    eligibility: 'Researchers and Practitioners',
    description: 'Submit original research for the annual SEESME publication.',
    provider: 'SEESME Editorial Board'
  }
];

export const MOCK_RESOURCES: Resource[] = [
  {
    id: 'r1',
    title: 'Understanding Plate Tectonics (Tigrigna)',
    format: 'Video',
    language: 'Tigrigna',
    description: 'A basic guide to how the Earth moves, explained for students.',
    thumbnailUrl: 'https://picsum.photos/seed/res1/400/300'
  },
  {
    id: 'r2',
    title: 'Mineral Exploration Safety Handbook',
    format: 'PDF',
    language: 'English',
    description: 'Essential safety protocols for field geologists and engineers.',
    thumbnailUrl: 'https://picsum.photos/seed/res2/400/300'
  }
];
