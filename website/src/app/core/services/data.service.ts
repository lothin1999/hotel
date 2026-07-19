import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LanguageService } from './language.service';

export interface HeroStat {
  num: string;
  label: string;
}

export interface HeroAwardCard {
  stars: number;
  title: string;
  source: string;
  badge: string;
}

export interface HeroData {
  overline: string;
  titlePart1: string;
  titlePart2: string;
  titleGold: string;
  titlePart3: string;
  description: string;
  bgImage: string;
  stats: HeroStat[];
  awardCard: HeroAwardCard;
}

export interface PillarItem {
  icon: string;
  name: string;
  desc: string;
}

export interface SpaCard {
  icon: string;
  name: string;
  duration: string;
  desc: string;
  price: number;
}

export interface WellnessStat {
  num: string;
  label: string;
}

export interface WellnessData {
  chipText: string;
  title: string;
  desc: string;
  treatments: SpaCard[];
  stats: WellnessStat[];
}

export interface AboutData {
  chipText: string;
  title: string;
  body1: string;
  body2: string;
  mainImage: string;
  secondaryImage: string;
  establishedYear: string;
  yearsExperience: number;
  pillars: PillarItem[];
}

export interface SuiteItem {
  no: string;
  name: string;
  size: string;
  price: number;
  image: string;
  badge?: string;
  tags: string[];
  detail?: string;
}

export interface MotorCategory {
  id: string;
  label: string;
}

export interface BikeItem {
  name: string;
  category: 'adventure' | 'scrambler' | 'naked' | 'sport' | 'touring' | string;
  engine: string;
  power: string;
  price: number;
  image: string;
  badge?: string;
  detail?: string;
}

export interface RouteItem {
  no: string;
  name: string;
  size: string;
  desc: string;
  badge?: string;
}

export interface ExperienceItem {
  tag: string;
  name: string;
  desc: string;
  image: string;
  alt: string;
}

export interface ExperiencesData {
  chipText: string;
  title: string;
  items: ExperienceItem[];
}

export interface ChefInfo {
  name: string;
  title: string;
  quote: string;
  avatar: string;
}

export interface DiningOffer {
  name: string;
  details: string;
  price?: number;
}

export interface MichelinBadge {
  stars: string;
  label: string;
  sub: string;
}

export interface DiningData {
  chipText: string;
  title: string;
  body1: string;
  body2: string;
  chef: ChefInfo;
  offers: DiningOffer[];
  mainImage: string;
  dishOverlayImage: string;
  michelinBadge: MichelinBadge;
}

export interface GalleryItem {
  label: string;
  image: string;
  alt: string;
}

export interface GalleryData {
  chipText: string;
  title: string;
  description: string;
  items: GalleryItem[];
}

export interface TestimonialItem {
  name: string;
  location: string;
  suite: string;
  image: string;
  rating: number;
  text: string;
  stayDuration: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private langService: LanguageService) {}

  private rawHeroData = {
    overline: { en: "The World's Most Private Retreat", kh: "រមណីយដ្ឋាន​ឯកជន​បំផុត​លើ​ពិភពលោក", zh: "全球最私密的隐逸圣地" },
    titlePart1: { en: "Where", kh: "ទីកន្លែង​ដែល", zh: "在安静中" },
    titlePart2: { en: "Silence is", kh: "ភាព​ស្ងប់ស្ងាត់​គឺ​ជា", zh: "重塑" },
    titleGold: { en: "Luxury", kh: "ភាព​ប្រណីត", zh: "奢华" },
    titlePart3: { en: "Reborn", kh: "នៃ​ការ​រស់​ឡើង​វិញ", zh: "新定义" },
    description: { en: "An invitation-only estate nestled above a private coastline — where 48 curated suites and 16 motorcycles await those who seek perfection without compromise.", kh: "វិមាន​ឯកជន​នៅ​លើ​ឆ្នេរ​សមុទ្រ​ស្ងប់ស្ងាត់ — ជាមួយ​នឹង​បន្ទប់​ស្វីត ៤៨ និង​ម៉ូតូ​ប្រណីត ១៦ គ្រឿង រង់ចាំ​ស្វាគមន៍​លោក​អ្នក។", zh: "坐落于私密海岸线上的邀请制庄园 — 48间定制套房与16台顶级重型摩托车等待着追求极致的您。" },
    bgImage: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1920&q=90&auto=format&fit=crop',
    stats: [
      { num: '48', label: { en: 'Private Suites', kh: 'វិមានរមណីយដ្ឋាន', zh: '奢华套房' } },
      { num: '16', label: { en: 'Motorcycles', kh: 'ក្បួនម៉ូតូ', zh: '重型车队' } },
      { num: '5★', label: { en: 'Forbes Rated', kh: 'វាយតម្លៃដោយ Forbes', zh: '福布斯评级' } },
      { num: '15', label: { en: 'Years of Excellence', kh: 'ឆ្នាំនៃឧត្តមភាព', zh: '载卓越历程' } }
    ],
    awardCard: {
      stars: 5,
      title: { en: '"A destination that\ntranscends hospitality"', kh: '"គោលដៅ​ដែល​លើស​ពី\nការ​បដិសណ្ឋារកិច្ច"', zh: '"超越款待的独特旅程"' },
      source: 'Condé Nast Traveller · 2024',
      badge: { en: "World's Best Resort", kh: "រមណីយដ្ឋាន​ល្អ​បំផុត​ក្នុង​លោក", zh: "世界最佳度假村" }
    }
  };

  private rawAboutData = {
    chipText: { en: 'The Ankor Book Story', kh: 'ប្រវត្តិនៃ អង្គរ ប៊ុក', zh: '安可庄园传奇' },
    title: { en: 'A Sanctuary Built for the Discerning Few', kh: 'ជម្រកស្នាក់នៅសម្រាប់ភ្ញៀវដ៏ឧត្តុង្គឧត្តម', zh: '为极少数人打造的避世圣地' },
    body1: { en: 'Born from the belief that true luxury is not decoration but sensation — Ankor Book was conceived on 18 acres of volcanic coastline as a sanctuary for those who have experienced everything, yet seek something more profound.', kh: 'បង្កើតឡើងដោយជំនឿថា ភាពប្រណីតពិតប្រាកដមិនមែនជាការតុបតែងទេ ប៉ុន្តែជាអារម្មណ៍ — អង្គរ ប៊ុក ត្រូវបានកសាងឡើងនៅលើផ្ទៃដី ១៨ ហិកតា ជាប់ឆ្នេរសមុទ្រឯកជន។', zh: '源于对“真正的奢华非关装饰，而在乎感受”的执念，安可庄园在18英亩的火山海岸上破土而建，为阅历丰富却仍渴望触动心灵的宾客筑起一处避世居所。' },
    body2: { en: 'Our fleet of 16 hand-selected motorcycles offers a dimension of freedom rarely associated with five-star hospitality. Here, the journey is as curated as the destination.', kh: 'ក្បួនម៉ូតូប្រណីត ១៦ គ្រឿង ផ្តល់ជូននូវសេរីភាពគ្មានដែនកំណត់សម្រាប់ការធ្វើដំណើរផ្សងព្រេងរបស់លោកអ្នក។', zh: '我们精心挑选的16台顶级重型摩托车队，为您解锁奢华度假中罕见的绝对自由。在这里，每一次骑行与目的地一样皆经过精心定制。' },
    mainImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=90&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80&auto=format&fit=crop',
    establishedYear: '2009',
    yearsExperience: 15,
    pillars: [
      { icon: '🌊', name: { en: 'Private Shoreline', kh: 'ឆ្នេរសមុទ្រឯកជន', zh: '专属海岸线' }, desc: { en: '1.2km of exclusive white sand, reserved for guests only.', kh: 'ឆ្នេរខ្សាច់សក្បុសប្រវែង ១.២ គីឡូម៉ែត្រ សម្រាប់តែភ្ញៀវស្នាក់នៅប៉ុណ្ណោះ។', zh: '长达1.2公里的细腻白沙滩，仅供住店宾客独享。' } },
      { icon: '🍾', name: { en: '3-Star Cuisine', kh: 'អាហារលំដាប់ផ្កាយ ៣', zh: '米其林三星美馔' }, desc: { en: "Chef Théodore Blanc's nightly tasting menu.", kh: 'មុខម្ហូបពិសេសជារៀងរាល់យប់ដោយមេចុងភៅ Théodore Blanc។', zh: '行政主厨 Théodore Blanc 亲自打造的每日赏味菜单。' } },
      { icon: '🏍️', name: { en: 'Moto Fleet', kh: 'ក្បួនម៉ូតូធំ', zh: '重型摩托车队' }, desc: { en: '16 premium bikes, guided routes, full gear.', kh: 'ម៉ូតូធំលំដាប់កំពូល ១៦ គ្រឿង ផ្លូវធ្វើដំណើរ និងឧបករណ៍ការពារសុវត្ថិភាពពេញលេញ។', zh: '16辆顶级摩托，专属规划骑行路线及全套安全装备。' } },
      { icon: '💆', name: { en: 'Onsen Sanctuary', kh: 'មណ្ឌលស្ប៉ាអនសេន', zh: '火山温泉理疗' }, desc: { en: 'Volcanic stone villas with private thermal pools.', kh: 'វីឡាថ្មភ្នំភ្លើងជាមួយនឹងអាងទឹកក្តៅធម្មជាតិផ្ទាល់ខ្លួន។', zh: '由天然火山石打造的独立SPA别墅，配备私密温泉泡池。' } }
    ]
  };

  private rawWellnessData = {
    chipText: { en: 'Onsen Sanctuary', kh: 'មណ្ឌលស្ប៉ាអនសេន', zh: '火山温泉理疗' },
    title: { en: 'Thermal <em>Transcendence</em>', kh: 'ការផ្លាស់ប្តូរជីវិតតាមបែប<em>អនសេន</em>', zh: '天然温泉<em>心灵超越</em>' },
    desc: { en: "Our geothermal onsen facility draws from the island's volcanic aquifers — water that has filtered through lava rock for centuries before reaching your body.", kh: "អនសេនកម្តៅក្នុងដីរបស់យើងទាញចេញពីអាងទឹកភ្នំភ្លើងរបស់កោះ — ទឹកដែលបានច្រោះតាមថ្មឡាវារាប់សតវត្ស មុនពេលមកដល់រាងកាយរបស់អ្នក។", zh: "我们的地热温泉水源自海岛深处的火山地下水 — 泉水在抵达您身体前已滤过层层熔岩岩石数百年之久。" },
    treatments: [
      {
        icon: '♨️',
        name: { en: 'Volcanic Stone Ritual', kh: 'ពិធីបូជាថ្មភ្នំភ្លើង', zh: '热能火山石理疗' },
        duration: { en: '90 Minutes', kh: '៩០ នាទី', zh: '90分钟' },
        desc: { en: 'Basalt stones heated to 60°C are placed along the meridians of the body, drawing toxins while restoring deep muscular equilibrium.', kh: 'ថ្មបាសាល់ដែលកំដៅដល់ ៦០°C ត្រូវបានដាក់តាមខ្សែរាងកាយ បន្សាបជាតិពុល និងស្តារលំនឹងសាច់ដុំឡើងវិញ។', zh: '将加热至60摄氏度的天然玄武石敷于身体经络之上，排毒养颜并深层舒缓肌肉压力。' },
        price: 220
      },
      {
        icon: '🌿',
        name: { en: 'Forest Botanical Wrap', kh: 'ការរុំស្ប៉ារុក្ខជាតិព្រៃឈើ', zh: '林间草本裹体养护' },
        duration: { en: '75 Minutes', kh: '៧៥ នាទី', zh: '75分钟' },
        desc: { en: "A full-body envelopment in native botanical extracts sourced from the island's interior forest, followed by a hydration mask application.", kh: "ការរុំខ្លួនទាំងមូលដោយសារធាតុចម្រាញ់ពីរុក្ខជាតិក្នុងព្រៃកោះ បន្ទាប់មកលាបម៉ាសផ្តល់សំណើមដល់ស្បែក។", zh: "选用海岛内部森林特有的原生草本植物提取物进行全身裹体养护，随后进行全身深度补水面膜护理。" },
        price: 180
      },
      {
        icon: '🌊',
        name: { en: 'Thalassotherapy', kh: 'ការព្យាបាលដោយប្រើទឹកសមុទ្រ', zh: '海洋藻盐疗法' },
        duration: { en: '120 Minutes', kh: '១២០ នាទី', zh: '120分钟' },
        desc: { en: 'A marine therapy programme using seaweed, sea salts, and algae extracts drawn fresh from the adjacent private coastline each morning.', kh: 'កម្មវិធីព្យាបាលដោយប្រើសារាយសមុទ្រ អំបិលសមុទ្រ និងសារធាតុចម្រាញ់ពីសារាយដែលប្រមូលបានថ្មីៗពីឆ្នេរឯកជនរៀងរាល់ព្រឹក។', zh: '一项利用清晨从私属海岸新鲜提取的海藻、海盐和藻类提取物进行的专业海洋理疗疗程。' },
        price: 280
      }
    ],
    stats: [
      { num: '8', label: { en: 'Private Villas', kh: 'វីឡាឯកជន', zh: '温泉理疗别庄' } },
      { num: '14', label: { en: 'Treatments', kh: '特色理疗疗程', zh: '特色理疗疗程' } },
      { num: '40°', label: { en: 'Thermal Pools', kh: 'អាងទឹកក្តៅ', zh: '天然恒温温泉' } },
      { num: '∞', label: { en: 'Tranquility', kh: 'ភាពស្ងប់ស្ងាត់', zh: '无限安全幽静' } }
    ]
  };

  private rawSuites = [
    {
      no: '01 / 06',
      name: { en: 'Obsidian Garden', kh: 'បន្ទប់ស្វីតសួនអបស៊ីឌៀន', zh: '黑曜石花园套房' },
      size: { en: '60m² · Garden & Pool View', kh: 'ទំហំ ៦០ ម៉ែត្រការ៉េ · ទេសភាពសួនច្បារ និងអាងហែលទឹក', zh: '60平方米 · 幽静花园与泳池景观' },
      price: 190,
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=85&auto=format&fit=crop',
      tags: [
        { en: 'King Bed', kh: 'គ្រែធំពិសេស', zh: '特大双人床' },
        { en: 'Rain Shower', kh: 'ផ្កាឈូកទឹកភ្លៀង', zh: '热带雨林淋浴' },
        { en: 'Garden View', kh: 'ទេសភាពសួន', zh: '花园景观' },
        { en: 'Butler', kh: 'អ្នកបម្រើផ្ទាល់ខ្លួន', zh: '专属管家' }
      ],
      detail: { en: '60m² · Garden & Pool View', kh: 'ទំហំ ៦០ ម៉ែត្រការ៉េ · ទេសភាពសួនច្បារ និងអាងហែលទឹក', zh: '60平方米 · 幽静花园与泳池景观' }
    },
    {
      no: '02 / 06',
      name: { en: 'Horizon Ocean Villa', kh: 'វីឡាមាត់សមុទ្រហូរីហ្សុន', zh: '地平线海景别墅' },
      size: { en: '110m² · Oceanfront', kh: 'ទំហំ ១១០ ម៉ែត្រការ៉េ · ទេសភាពមាត់សមុទ្រផ្ទាល់', zh: '110平方米 · 绝美一线海景' },
      price: 340,
      badge: { en: 'Most Popular', kh: 'ពេញនិយមបំផុត', zh: '人气首选' },
      tags: [
        { en: 'King Bed', kh: 'គ្រែធំពិសេស', zh: '特大双人床' },
        { en: 'Plunge Pool', kh: 'អាងហែលទឹកផ្ទាល់ខ្លួន', zh: '私家跳水池' },
        { en: 'Ocean View', kh: 'ទេសភាពសមុទ្រ', zh: '海景豪居' },
        { en: 'Private Terrace', kh: 'យ៉រឯកជន', zh: '专属露台' }
      ],
      detail: { en: '110m² · Oceanfront', kh: 'ទំហំ ១១០ ម៉ែត្រការ៉េ · ទេសភាពមាត់សមុទ្រផ្ទាល់', zh: '110平方米 · 绝美一线海景' }
    },
    {
      no: '03 / 06',
      name: { en: 'Clifftop Penthouse', kh: 'បន្ទប់ផេនហោស៍លើកំពូលភ្នំ', zh: '悬崖峭壁顶层套房' },
      size: { en: '200m² · 360° Views', kh: 'ទំហំ ២០០ ម៉ែត្រការ៉េ · ទេសភាពជុំវិញ ៣៦០ ដឺក្រេ', zh: '200平方米 · 360度全景纵览' },
      price: 520,
      tags: [
        { en: '2 Suites', kh: '២ បន្ទប់ស្វីត', zh: '双卧室套间' },
        { en: '360° Terrace', kh: 'យ៉រ ៣៦០ ដឺក្រេ', zh: '全景环绕露台' },
        { en: 'Private Chef', kh: 'មេចុងភៅផ្ទាល់ខ្លួន', zh: '私厨定制' },
        { en: 'Jacuzzi', kh: 'អាងចាគូហ្ស៊ី', zh: '按摩浴缸' }
      ],
      detail: { en: '200m² · 360° Views', kh: 'ទំហំ ២០០ ម៉ែត្រការ៉េ · ទេសភាពជុំវិញ ៣៦០ ដឺក្រេ', zh: '200平方米 · 360度全景纵览' }
    },
    {
      no: '04 / 06',
      name: { en: 'Overwater Lagoon Villa', kh: 'វីឡាលើទឹកបឹងកែវ', zh: '泻湖水上别墅' },
      size: { en: '130m² · Above the Lagoon', kh: 'ទំហំ ១៣០ ម៉ែត្រការ៉េ · វីឡាលើផ្ទៃទឹកបឹងកែវ', zh: '130平方米 · 凌于泻湖之上' },
      price: 440,
      tags: [
        { en: 'Glass Floor', kh: 'ឥដ្ឋកញ្ចក់', zh: '透明玻璃地板' },
        { en: 'Lagoon Access', kh: 'ផ្លូវចុះបឹងផ្ទាល់', zh: '直接下水通道' },
        { en: 'Hammock Deck', kh: 'អង្រឹងលើទឹក', zh: '水上吊网露台' },
        { en: 'Sunset View', kh: 'ទេសភាពថ្ងៃលិច', zh: '唯美日落景观' }
      ],
      detail: { en: '130m² · Above the Lagoon', kh: 'ទំហំ ១៣០ ម៉ែត្រការ៉េ · វីឡាលើផ្ទៃទឹកបឹងកែវ', zh: '130平方米 · 凌于泻湖之上' }
    },
    {
      no: '05 / 06',
      name: { en: 'Canopy Forest Retreat', kh: 'បន្ទប់ព្រៃឈើកាណូពី', zh: '林冠绿野隐秘林苑' },
      size: { en: '80m² · Treetop Level', kh: 'ទំហំ ៨០ ម៉ែត្រការ៉េ · លើកំពូលឈើធម្មជាតិ', zh: '80平方米 · 栖于树冠梢头' },
      price: 260,
      tags: [
        { en: 'King Bed', kh: 'គ្រែធំពិសេស', zh: '特大双人床' },
        { en: 'Open Bath', kh: 'អាងងូតទឹកវាលហាល', zh: '露天森林浴缸' },
        { en: 'Treetop Walk', kh: 'ផ្លូវដើរលើចុងឈើ', zh: '树顶林间通道' },
        { en: 'Forest Sounds', kh: 'សំឡេងធម្មជាតិព្រៃព្រឹក្សា', zh: '聆听自然森之音' }
      ],
      detail: { en: '80m² · Treetop Level', kh: 'ទំហំ ៨០ ម៉ែត្រការ៉េ · លើកំពូលឈើធម្មជាតិ', zh: '80平方米 · 栖于树冠梢头' }
    },
    {
      no: '06 / 06',
      name: { en: 'Imperial Residence', kh: 'វិមានអធិរាជអធិបតី', zh: '皇家至尊海滨府邸' },
      size: { en: '400m² · Private Estate', kh: 'ទំហំ ៤០០ ម៉ែត្រការ៉េ · វិមានឯកជនផ្តាច់មុខ', zh: '400平方米 · 独栋私人府邸' },
      price: 780,
      badge: { en: 'Signature', kh: 'ស្នាដៃឯក', zh: '庄园至尊' },
      tags: [
        { en: '3 Rooms', kh: '៣ បន្ទប់គេង', zh: '奢华三卧室' },
        { en: 'Private Beach', kh: 'ឆ្នេរឯកជនផ្ទាល់ខ្លួន', zh: '专属私家沙滩' },
        { en: 'Full Butler', kh: 'ក្រុមអ្នកបម្រើផ្ទាល់ខ្លួន', zh: '全天候管家团' },
        { en: 'Cinema Room', kh: 'បន្ទប់បញ្ចាំងកុនឯកជន', zh: '私人影音沙龙' }
      ],
      detail: { en: '400m² · Private Estate', kh: 'ទំហំ ៤០០ ម៉ែត្រការ៉េ · វិមានឯកជនផ្តាច់មុខ', zh: '400平方米 · 独栋私人府邸' }
    }
  ];

  private rawBikes = [
    {
      name: 'Ducati Scrambler 800',
      category: 'scrambler',
      engine: '803 cc · L-Twin',
      power: '73 HP',
      price: 150,
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&q=80&auto=format&fit=crop',
      badge: { en: 'Guest Favorite', kh: 'ភ្ញៀវពេញចិត្តបំផុត', zh: '住客最爱' },
      detail: { en: '803cc · Desert Sled', kh: '៨០៣សេសេ · កែច្នៃសម្រាប់វាលខ្សាច់', zh: '803cc · 越野骑行越野版' }
    },
    {
      name: 'Harley-Davidson Pan America',
      category: 'adventure',
      engine: '1252 cc · V-Twin',
      power: '150 HP',
      price: 240,
      image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&q=80&auto=format&fit=crop',
      detail: { en: '1250cc · Adventure Touring', kh: '១២៥០សេសេ · សម្រាប់ដំណើរផ្សងព្រេង', zh: '1250cc · 顶级全地形拉力拉力版' }
    },
    {
      name: 'Honda CB500F',
      category: 'naked',
      engine: '471 cc · Parallel Twin',
      power: '47 HP',
      price: 90,
      image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600&q=80&auto=format&fit=crop',
      detail: { en: '471cc · Urban Roadster', kh: '៤៧១សេសេ · សម្រាប់ជិះក្នុងក្រុង', zh: '471cc · 都市街车越野街跑' }
    },
    {
      name: 'Kawasaki Ninja 400',
      category: 'sport',
      engine: '399 cc · Parallel Twin',
      power: '49 HP',
      price: 110,
      image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&q=80&auto=format&fit=crop',
      badge: { en: 'Track Prep', kh: 'សម្រាប់ទីលានប្រណាំង', zh: '赛道整备' },
      detail: { en: '399cc · Lightweight Sport', kh: '៣៩៩សេសេ · ម៉ូតូស្ព័រធុនស្រាល', zh: '399cc · 轻量化仿赛跑车' }
    },
    {
      name: 'BMW G310GS',
      category: 'adventure',
      engine: '313 cc · Single Cylinder',
      power: '34 HP',
      price: 120,
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&q=80&auto=format&fit=crop',
      detail: { en: '313cc · Light Trail', kh: '៣១៣សេសេ · សម្រាប់ផ្លូវលំស្រាល', zh: '313cc · 轻量化探险拉力版' }
    },
    {
      name: 'Triumph Tiger 1200',
      category: 'touring',
      engine: '1160 cc · Inline 3',
      power: '147 HP',
      price: 280,
      image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&q=80&auto=format&fit=crop',
      badge: { en: 'Ultimate Cruiser', kh: 'ម៉ូតូធំលំដាប់កំពូល', zh: '旗舰巡航' },
      detail: { en: '1160cc · Explorer Edition', kh: '១១៦០សេសេ · ជំនាន់រុករក', zh: '1160cc · 旗舰探险家探险旅行版' }
    }
  ];

  private rawRoutes = [
    {
      no: '01',
      name: { en: 'Pacific Cliff Highway', kh: 'ផ្លូវហាយវ៉េមាត់ជ្រោះមហាសមុទ្រ', zh: '太平洋悬崖公路' },
      size: { en: '85km · 2.5 hrs · Scenic', kh: '៨៥គីឡូម៉ែត្រ · ២.៥ម៉ោង · ទេសភាពស្អាត', zh: '85公里 · 2.5小时 · 观光骑行' },
      desc: { en: 'Climb 400 meters above ocean level through sweeping coastal turns with panoramic views of the western archipelago.', kh: 'ឡើងកម្ពស់ ៤០០ ម៉ែត្រលើនីវ៉ូទឹកសមុទ្រ តាមរយៈផ្លូវបត់បែនតាមឆ្នេរ ជាមួយនឹងទេសភាពជុំវិញនៃប្រជុំកោះភាគខាងលិច។', zh: '攀升至海拔400米高的海岸悬崖上，穿行于 sweeping 盘山沿海弯道，俯瞰西部群岛的全景风光。' },
      badge: { en: '★ Signature', kh: '★ ស្នាដៃឯក', zh: '★ 经典首选' }
    },
    {
      no: '02',
      name: { en: 'Volcanic Ridge Loop', kh: 'ផ្លូវជុំវិញភ្នំភ្លើង', zh: '火山脊线环路' },
      size: { en: '120km · 4.0 hrs · Advanced', kh: '១២០គីឡូម៉ែត្រ · ៤.០ម៉ោង · កម្រិតខ្ពស់', zh: '120公里 · 4.0小时 · 高级探险' },
      desc: { en: 'Technical hairpins surrounding ancient crater lakes and dense cloud forests. Custom riding gear included.', kh: 'ផ្លូវបត់បែនបច្ចេកទេសជុំវិញបឹងភ្នំភ្លើងបុរាណ និងព្រៃពពកក្រាស់។ រួមបញ្ចូលឧបករណ៍ការពារជិះម៉ូតូពិសេស។', zh: '围绕古老火山口湖和浓密云雾森林的极限技术性急弯。提供专业定制防护骑行装备。' }
    },
    {
      no: '03',
      name: { en: 'Sunset Cape Run', kh: 'ផ្លូវឆ្ពោះទៅជ្រោយថ្ងៃលិច', zh: '落日岬角之旅' },
      size: { en: '42km · 1.5 hrs · Leisure', kh: '៤២គីឡូម៉ែត្រ · ១.៥ម៉ោង · កម្សាន្តស្រាល', zh: '42公里 · 1.5小时 · 休闲漫游' },
      desc: { en: 'A gentle coastal cruise leading to our private sunset lighthouse point with champagne reception.', kh: 'ការបើកបរតាមឆ្នេរសមុទ្រយ៉ាងលំហែរ ឆ្ពោះទៅកាន់បង្គោលភ្លើងហ្វារថ្ងៃលិចឯកជនរបស់យើង ជាមួយនឹងការទទួលស្វាគមន៍ដោយស្រាសំប៉ាញ។', zh: '舒缓平坦的沿海骑行路线，带您前往私人落日灯塔，并备有精美香槟招待会。' }
    },
    {
      no: '04',
      name: { en: 'Village & Vineyard Trail', kh: 'ផ្លូវកាត់ភូមិ និងចម្ការទំពាំងបាយជូរ', zh: '村庄与葡萄庄园小径' },
      size: { en: '55km · 3.5 hrs · Intermediate', kh: '៥៥គីឡូម៉ែត្រ · ៣.៥ម៉ោង · កម្រិតមធ្យម', zh: '55公里 · 3.5小时 · 中级探索' },
      desc: { en: 'A cultural journey through three historic villages with a private tasting at Estate Noir winery arranged for all Ankor Book guests.', kh: 'ដំណើរស្វែងយល់វប្បធម៌កាត់តាមភូមិប្រវត្តិសាស្ត្រចំនួនបី ជាមួយនឹងការភ្លក្សស្រាឯកជននៅចម្ការទំពាំងបាយជូរ Estate Noir សម្រាប់ភ្ញៀវទាំងអស់របស់ អង្គរ ប៊ុក។', zh: '穿行于三个历史尤为古老村庄的文化之旅，并可尊享安可庄园特别为所有贵宾安排的 Estate Noir 私人酒庄品酒会。' }
    }
  ];

  private rawExperiencesData = {
    chipText: { en: 'Life at Ankor Book', kh: 'ជីវិតនៅ អង្គរ ប៊ុក', zh: '在安可庄园的生活' },
    title: { en: 'Moments Beyond the Ordinary', kh: 'ខណៈពេលដ៏អស្ចារ្យលើសពីធម្មតា', zh: '超越平凡的非凡时刻' },
    items: [
      {
        tag: { en: 'Wellness', kh: 'សុខភាព', zh: '健康养生' },
        name: { en: 'Suspended Infinity Pool & Thermal Onsen', kh: 'អាងហែលទឹកគ្មានដែនកំណត់ និងស្ប៉ាអនសេនធម្មជាតិ', zh: '空中悬浮无边泳池与火山石温泉' },
        desc: { en: 'Float at the literal edge of the world in our gravity-defying pool, then descend into volcanic stone thermal chambers for transcendent restoration.', kh: 'ហែលទឹកហាក់បីដូចជានៅលើគែមនៃពិភពលោកក្នុងអាងទឹកគ្មានដែនកំណត់ បន្ទាប់មកចុះទៅក្នុងបន្ទប់ទឹកក្តៅភ្នំភ្លើងសម្រាប់ការស្តារថាមពលរាងកាយឡើងវិញ។', zh: '在这座对抗重力的悬浮天际泳池中，体验如漂浮于世界尽头的奇妙快感；随后步入天然火山石温泉浴室，舒缓身心回归纯净自我。' },
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1000&q=90&auto=format&fit=crop',
        alt: 'Infinity Pool'
      },
      {
        tag: { en: 'Gastronomy', kh: 'អាហារប្រណីត', zh: '美馔佳肴' },
        name: { en: 'Three-Star Experience', kh: 'បទពិសោធន៍លំដាប់ផ្កាយ ៣', zh: '米其林三星饕餮盛宴' },
        desc: { en: "Chef Théodore Blanc's seasonal tasting menus, with produce harvested that same morning.", kh: 'មុខម្ហូបពិសេសជម្រើសតាមរដូវកាលរបស់មេចុងភៅ Théodore Blanc ដែលមានគ្រឿងផ្សំស្រស់ៗបេះនៅព្រឹកនោះផ្ទាល់។', zh: '行政主厨 Théodore Blanc 特制时令赏味菜单，食材均为清晨从庄园土地与海洋中新鲜采摘而来。' },
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=85&auto=format&fit=crop',
        alt: 'Dining'
      },
      {
        tag: { en: 'Adventure', kh: 'ផ្សងព្រេង', zh: '探索骑行' },
        name: { en: 'Coastal Moto Freedom', kh: 'សេរីភាពបើកបរលើឆ្នេរសមុទ្រ', zh: '沿海骑行驰骋快感' },
        desc: { en: '16 premium bikes, curated cliff roads, and the horizon as your only constraint.', kh: 'ម៉ូតូធំលំដាប់កំពូល ១៦ គ្រឿង ផ្លូវកោងតាមជ្រលងភ្នំ និងផ្តេកមេឃជាព្រំដែនតែមួយគត់របស់អ្នក។', zh: '16辆顶级巡航重机，绝美峭壁公路，海平线便是您唯一的极限。' },
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=85&auto=format&fit=crop',
        alt: 'Motorcycles'
      }
    ]
  };

  private rawDiningData = {
    chipText: { en: 'Gastronomy', kh: 'អាហារប្រណីត', zh: '精致美食' },
    title: { en: 'Three Stars, One Island', kh: 'ផ្កាយបី លើកោះតែមួយ', zh: '米其林三星，极致一岛' },
    body1: { en: "Chef Théodore Blanc arrived at Ankor Book in 2019, bringing his third Michelin star and an obsessive devotion to the island's native produce. The result is a nightly tasting experience unlike any in the world.", kh: "មេចុងភៅ Théodore Blanc បានមកដល់ អង្គរ ប៊ុក ក្នុងឆ្នាំ ២០១៩ ដោយនាំមកនូវផ្កាយមីឈីលីនទីបីរបស់គាត់ និងការប្តេជ្ញាចិត្តខ្ពស់ចំពោះផលិតផលធម្មជាតិលើកោះនេះ។ លទ្ធផលគឺបទពិសោធន៍ភ្លក្សអាហារប្រចាំយប់ដែលមិនដូចកន្លែងណាទាំងអស់នៅលើពិភពលោក។", zh: "行政主厨 Théodore Blanc 于 2019 年进驻安可庄园，带来了他享誉业界的米其林三星勋章，并投身于对岛上本土时令作物的狂热探索。其呈现出的赏味菜单，可谓举世无双。" },
    body2: { en: 'Every ingredient is sourced within 48 kilometres. Every plate is a conversation between the chef and the coastline. Dining here is not a meal — it is a confrontation with beauty.', kh: 'គ្រឿងផ្សំនីមួយៗត្រូវបានរកប្រភពក្នុងរង្វង់ ៤៨ គីឡូម៉ែត្រ។ មុខម្ហូបនីមួយៗគឺការសន្ទនារវាងមេចុងភៅ និងឆ្នេរសមុទ្រ。 ការទទួលទានអាហារនៅទីនេះមិនមែនគ្រាន់តែជាការហូបចុកទេ — វាគឺជាការជួបជុំជាមួយភាពស្រស់ស្អាតពិតប្រាកដ。', zh: '每一样原料皆在庄园方圆48公里以内捕捞或采摘。每一个盘中珍馐都是主厨与蔚蓝海岸的亲密对话。在这里就餐不仅仅是填饱肚子 — 它是一次与极致美丽的正面交锋。' },
    chef: {
      name: { en: 'Chef Théodore Blanc', kh: 'មេចុងភៅ Théodore Blanc', zh: '主厨 狄奥多·布兰克' },
      title: { en: '★★★ Michelin · Executive Chef', kh: '★★★ មីឈីលីន · ប្រធានមេចុងភៅ', zh: '★★★ 米其林三星 · 行政主厨' },
      quote: { en: '"I cook the sea, the cliff and the forest."', kh: '"ខ្ញុំចម្អិនដោយប្រើរសជាតិសមុទ្រ ជ្រលងភ្នំ និងព្រៃឈើ。"', zh: '"我的料理，融汇了海洋、峭壁与森林的原味。"' },
      avatar: 'https://images.unsplash.com/photo-1583394293214-8bcc2f2d282b?w=200&q=80&auto=format&fit=crop'
    },
    offers: [
      { name: { en: '7-Course Coastal Tasting', kh: 'ការភ្លក្សអាហារ ៧ មុខតាមបែបឆ្នេរសមុទ្រ', zh: '7道沿海创意赏味菜单' }, details: { en: 'Wine pairing included · 3 hrs', kh: 'រួមបញ្ចូលការផ្គូផ្គងជាមួយស្រាក្រហម · រយៈពេល ៣ ម៉ោង', zh: '包含奢华美酒搭配 · 耗时约3小时' }, price: 380 },
      { name: { en: 'Sunrise Breakfast Ritual', kh: 'ពិធីអាហារពេលព្រឹកពេលថ្ងៃរះ', zh: '海上日出早餐仪式' }, details: { en: 'Cliff terrace · Seasonal · Included for suites', kh: 'យ៉រមាត់ជ្រោះ · តាមរដូវកាល · រួមបញ្ចូលសម្រាប់បន្ទប់ស្វីត', zh: '悬崖露台 · 季节限定 · 套房住客免费包含' } },
      { name: { en: 'In-Suite Private Dinner', kh: 'អាហារពេលល្ងាចឯកជននៅក្នុងបន្ទប់', zh: '套房内私密尊享晚宴' }, details: { en: 'Terrace · Personal sommelier · Fully bespoke', kh: 'យ៉រឯកជន · អ្នកជំនាញស្រាផ្ទាល់ខ្លួន · រៀបចំតាមតម្រូវការទាំងស្រុង', zh: '私人天台露台 · 专属侍酒师服务 · 全定制细节' }, price: 250 }
    ],
    mainImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=90&auto=format&fit=crop',
    dishOverlayImage: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=300&q=80&auto=format&fit=crop',
    michelinBadge: {
      stars: '★★★',
      label: { en: 'Michelin Stars', kh: 'ផ្កាយមីឈីលីន', zh: '米其林指南星级' },
      sub: { en: 'Since 2021', kh: 'ចាប់តាំងពីឆ្នាំ ២០២១', zh: '荣膺自 2021 年起' }
    }
  };

  private rawGalleryData = {
    chipText: { en: 'The Estate', kh: 'វិមានរមណីយដ្ឋាន', zh: '至尊府邸' },
    title: { en: 'Every Frame a Memory', kh: 'រាល់ប្លង់រូបភាពគឺជាការចងចាំ', zh: '每一帧皆是永恒记忆' },
    description: { en: 'Ankor Book was designed to be seen, felt, and photographed. Light changes everything here.', kh: 'អង្គរ ប៊ុក ត្រូវបានរចនាឡើងដើម្បីមើល ទទួលអារម្មណ៍ និងថតរូប។ ពន្លឺផ្លាស់ប្តូរគ្រប់យ៉ាងនៅទីនេះ។', zh: '安可庄园的设计初衷是用于观察、感触和摄影记录。在这里，光影的变化将改变您对世界的一切认知。' },
    items: [
      { label: { en: 'The Main Estate', kh: 'វិមានធំ', zh: '主庄园全貌' }, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=900&q=85&auto=format&fit=crop', alt: 'Resort' },
      { label: { en: 'Infinity Pool', kh: 'អាងហែលទឹកគ្មានដែនកំណត់', zh: '悬浮无边泳池' }, image: 'https://images.unsplash.com/photo-1549294413-26f195200c16?w=700&q=85&auto=format&fit=crop', alt: 'Pool' },
      { label: { en: 'Private Beach', kh: 'ឆ្នេរឯកជន', zh: '私人细白沙滩' }, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=85&auto=format&fit=crop', alt: 'Beach' },
      { label: { en: 'Imperial Suite', kh: 'បន្ទប់ស្វីតអធិរាជ', zh: '皇家套房景观' }, image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=700&q=85&auto=format&fit=crop', alt: 'Suite' },
      { label: { en: 'Overwater Villa', kh: 'វីឡាលើទឹក', zh: '水上泻湖别墅' }, image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=85&auto=format&fit=crop', alt: 'Overwater' }
    ]
  };

  private rawTestimonials = [
    {
      name: 'Isabelle Moreau',
      location: { en: 'Paris, France', kh: 'ប៉ារីស, ប្រទេសបារាំង', zh: '法国 巴黎' },
      suite: { en: 'Horizon Ocean Villa', kh: 'វីឡាមាត់សមុទ្រហូរីហ្សុន', zh: '地平线海景别墅' },
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80&auto=format&fit=crop',
      rating: 5,
      text: { en: 'Ankor Book is not merely a hotel — it is a sanctuary for the soul. The silence at dawn in the Horizon Villa, combined with the sheer perfection of private butler service, created an experience we will cherish forever.', kh: 'អង្គរ ប៊ុក មិនមែនគ្រាន់តែជាសណ្ឋាគារទេ — វាគឺជាជម្រកសម្រាប់ព្រលឹង។ ភាពស្ងប់ស្ងាត់នៅពេលព្រឹកព្រលឹមនៅក្នុងវីឡាហូរីហ្សុន រួមផ្សំជាមួយនឹងភាពល្អឥតខ្ចោះនៃសេវាកម្មអ្នកបម្រើផ្ទាល់ខ្លួន បានបង្កើតបទពិសោធន៍ដែលយើងនឹងចងចាំជារៀងរហូត។', zh: '安可庄园绝不仅仅是一家酒店 — 它是洗涤心灵的避风港。清晨在地平线海景别墅中醒来时听到的风声鸟鸣，以及私人管家近乎完美的体贴服务，留下了我们终生难忘的回忆。' },
      stayDuration: { en: '7 Nights', kh: '៧ យប់', zh: '7晚住宿' },
      date: { en: 'March 2025', kh: 'មីនា ២០២៥', zh: '2025年3月' }
    },
    {
      name: 'Lord Alistair Sterling',
      location: { en: 'London, UK', kh: 'ឡុងដ៍, ចក្រភពអង់គ្លេស', zh: '英国 伦敦' },
      suite: { en: 'Clifftop Penthouse', kh: 'បន្ទប់ផេនហោស៍លើកំពូលភ្នំ', zh: '悬崖峭壁顶层套房' },
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80&auto=format&fit=crop',
      rating: 5,
      text: { en: 'Having stayed at luxury properties worldwide, I can state without hesitation that Ankor Book operates at a level unmatched anywhere else. The privacy is absolute, the dining is world-class.', kh: 'បន្ទាប់ពីធ្លាប់បានស្នាក់នៅតាមកន្លែងប្រណីតៗទូទាំងពិភពលោក ខ្ញុំអាចនិយាយបានដោយគ្មានស្ទាក់ស្ទើរថា អង្គរ ប៊ុក ដំណើរការក្នុងកម្រិតមួយដែលគ្មានកន្លែងណាអាចប្រៀបធៀបបានឡើយ។ ភាពឯកជនគឺដាច់ខាត ហើយម្ហូបអាហារគឺលំដាប់ពិភពលោក។', zh: '我曾下榻过全球无数奢华场所，但老实说，安可庄园达到的尊贵水准依然难觅对手。这里有绝对的私密安全，以及世界一流的米其林臻宴。' },
      stayDuration: { en: '4 Nights', kh: '៤ យប់', zh: '4晚住宿' },
      date: { en: 'January 2025', kh: 'មករា ២០២៥', zh: '2025年1月' }
    },
    {
      name: 'Dr. Elena & David Vance',
      location: { en: 'Zurich, Switzerland', kh: 'ហ្សូរីច, ប្រទេសស្វីស', zh: '瑞士 苏黎世' },
      suite: { en: 'Combo Package', kh: 'កញ្ចប់រួមបញ្ចូលគ្នា', zh: '尊享特惠套餐' },
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&q=80&auto=format&fit=crop',
      rating: 5,
      text: { en: 'Renting the Ducati and riding the coastal highway at sunrise on our honeymoon morning was, without any hesitation, the single most alive I have felt in years. Ankor Book somehow made every moment feel personal.', kh: 'ការជួលម៉ូតូ Ducati ហើយបើកបរលើផ្លូវមាត់ឆ្នេរពេលថ្ងៃរះនៅព្រឹកក្រេបទឹកឃ្មុំរបស់យើង គឺគ្មានការសង្ស័យទេ វាគឺជាខណៈពេលដែលខ្ញុំមានអារម្មណ៍ថាមានជីវិតរស់រវើកបំផុតក្នុងរយៈពេលជាច្រើនឆ្នាំមកនេះ។ អង្គរ ប៊ុក បានធ្វើឱ្យរាល់វិនាទីមានអារម្មណ៍ថាផ្ទាល់ខ្លួនជាទីបំផុត។', zh: '租用杜卡迪并在蜜月清晨沿海岸公路迎接第一缕曙光，毫无疑问是这些年来最让我感到热血沸腾的时刻。安可庄园不知怎的，总能让每一刻都如此充满尊贵温情。' },
      stayDuration: { en: '5 Nights', kh: '៥ យប់', zh: '5晚住宿' },
      date: { en: 'February 2025', kh: 'កុម្ភៈ ២០២៥', zh: '2025年2月' }
    },
    {
      name: 'Marcus Olsen',
      location: { en: 'Oslo, Norway', kh: 'អូស្លូ, ប្រទេសន័រវែស', zh: '挪威 奥斯陆' },
      suite: { en: 'Overwater Villa', kh: 'វីឡាលើទឹក', zh: '水上泻湖别墅' },
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80&auto=format&fit=crop',
      rating: 5,
      text: { en: 'Three nights in the overwater villa with a BMW G310GS for island exploration entirely transformed my understanding of what luxury actually is. Ankor Book understands that true luxury is the freedom to feel something.', kh: 'ការស្នាក់នៅបីយប់នៅក្នុងវីឡាលើទឹក ជាមួយម៉ូតូ BMW G310GS សម្រាប់ជិះរុករកជុំវិញកោះ បានផ្លាស់ប្តូរការយល់ឃើញរបស់ខ្ញុំទាំងស្រុងអំពីអត្ថន័យនៃភាពប្រណីតពិតប្រាកដ។ អង្គរ ប៊ុក យល់ថាភាពប្រណីតពិតប្រាកដគឺសេរីភាពក្នុងការស្វែងយល់ពីអារម្មណ៍ខ្លួនឯង។', zh: '在水上别墅连住三晚，并骑着宝马 G310GS 踏上全岛探索之旅，彻底颠覆了我对奢华二字的理解。安可庄园知道，真正的奢华是感悟心灵的绝对自由。' },
      stayDuration: { en: '3 Nights', kh: '៣ យប់', zh: '3晚住宿' },
      date: { en: 'January 2025', kh: 'មករា ២០២៥', zh: '2025年1月' }
    }
  ];

  private rawMotorCategories = [
    { id: 'all', label: { en: 'All Machines', kh: 'ម៉ាស៊ីនទាំងអស់', zh: '全部重机' } },
    { id: 'adventure', label: { en: 'Adventure', kh: 'ម៉ូតូផ្សងព្រេង', zh: '探险拉力' } },
    { id: 'scrambler', label: { en: 'Scrambler', kh: 'ម៉ូតូស្គ្រែមប្លឺ', zh: '复古攀爬者' } },
    { id: 'naked', label: { en: 'Naked', kh: 'ម៉ូតូអាក្រាត', zh: '运动街车' } },
    { id: 'sport', label: { en: 'Sport', kh: 'ម៉ូតូស្ព័រ', zh: '仿赛跑车' } },
    { id: 'touring', label: { en: 'Touring', kh: 'ម៉ូតូធួរីង', zh: '旅行巡航' } }
  ];

  private rawMarqueeItems = [
    { en: 'Private Suites', kh: 'បន្ទប់ស្វីតឯកជន', zh: '私密套房' },
    { en: 'Infinity Cliffs', kh: 'ជ្រោះគ្មានដែនកំណត់', zh: '无边悬崖' },
    { en: 'Moto Rentals', kh: 'ជួលម៉ូតូប្រណីត', zh: '顶级摩托租赁' },
    { en: 'Michelin Dining', kh: 'អាហារលំដាប់មីឈីលីន', zh: '米其林餐饮' },
    { en: 'Onsen Sanctuary', kh: 'ស្ប៉ាអនសេនធម្មជាតិ', zh: '温泉理疗' },
    { en: 'Coastal Routes', kh: 'ផ្លូវឆ្នេរសមុទ្រ', zh: '沿海骑行路线' },
    { en: 'Island Charter', kh: 'ជួលកោះឯកជន', zh: '游艇包岛服务' },
    { en: 'Private Beach', kh: 'ឆ្នេរឯកជនផ្ទាល់ខ្លួន', zh: '私家细白沙滩' },
    { en: 'Butler Service', kh: 'សេវាកម្មអ្នកបម្រើផ្ទាល់ខ្លួន', zh: '管家专属贴心服务' },
    { en: 'Helipad Access', kh: 'ចំណតឧទ្ធម្ភាគចក្រ', zh: '直升机停机坪' }
  ];

  private getTranslatedData<T>(raw: any): T {
    return this.langService.translateObj(raw) as T;
  }

  getHeroData(): Observable<HeroData> {
    return this.langService.currentLang$.pipe(
      map(() => this.getTranslatedData<HeroData>(this.rawHeroData))
    );
  }

  getMarqueeItems(): Observable<string[]> {
    return this.langService.currentLang$.pipe(
      map(() => this.getTranslatedData<string[]>(this.rawMarqueeItems))
    );
  }

  getAboutData(): Observable<AboutData> {
    return this.langService.currentLang$.pipe(
      map(() => this.getTranslatedData<AboutData>(this.rawAboutData))
    );
  }

  getSuites(): Observable<SuiteItem[]> {
    return this.langService.currentLang$.pipe(
      map(() => this.getTranslatedData<SuiteItem[]>(this.rawSuites))
    );
  }

  getBikes(): Observable<BikeItem[]> {
    return this.langService.currentLang$.pipe(
      map(() => this.getTranslatedData<BikeItem[]>(this.rawBikes))
    );
  }

  getMotorCategories(): Observable<MotorCategory[]> {
    return this.langService.currentLang$.pipe(
      map(() => this.getTranslatedData<MotorCategory[]>(this.rawMotorCategories))
    );
  }

  getRoutes(): Observable<RouteItem[]> {
    return this.langService.currentLang$.pipe(
      map(() => this.getTranslatedData<RouteItem[]>(this.rawRoutes))
    );
  }

  getExperiencesData(): Observable<ExperiencesData> {
    return this.langService.currentLang$.pipe(
      map(() => this.getTranslatedData<ExperiencesData>(this.rawExperiencesData))
    );
  }

  getDiningData(): Observable<DiningData> {
    return this.langService.currentLang$.pipe(
      map(() => this.getTranslatedData<DiningData>(this.rawDiningData))
    );
  }

  getGalleryData(): Observable<GalleryData> {
    return this.langService.currentLang$.pipe(
      map(() => this.getTranslatedData<GalleryData>(this.rawGalleryData))
    );
  }

  getTestimonials(): Observable<TestimonialItem[]> {
    return this.langService.currentLang$.pipe(
      map(() => this.getTranslatedData<TestimonialItem[]>(this.rawTestimonials))
    );
  }

  getWellnessData(): Observable<WellnessData> {
    return this.langService.currentLang$.pipe(
      map(() => this.getTranslatedData<WellnessData>(this.rawWellnessData))
    );
  }
}
