import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface SiteConfig {
  title: string
  description: string
  serverIp: string
  logoText: string
  logoImage: string
}

export interface HeroConfig {
  badge: string
  titleLine1: string
  titleHighlight: string
  subtitle: string
  features: string[]
  bgImage: string
}

export interface SpecItem {
  title: string
  desc: string
  value: string
  icon: string
}

export interface SpecsConfig {
  title: string
  subtitle: string
  bgImage: string
  items: SpecItem[]
}

export interface Step {
  number: string
  title: string
  desc: string
  action?: string
  actionText?: string
  highlight?: string
}

export interface HelpConfig {
  title: string
  subtitle: string
  bgImage: string
  steps: Step[]
}

export interface Feature {
  title: string
  desc: string
  icon: string
}

export interface FeaturesConfig {
  title: string
  subtitle: string
  bgImage: string
  items: Feature[]
}

export interface GalleryItem {
  src: string
  caption: string
}

export interface GalleryConfig {
  title: string
  subtitle: string
  bgImage: string
  items: GalleryItem[]
}

export interface TeamMember {
  name: string
  role: string
  desc: string
  avatar: string
}

export interface TeamConfig {
  title: string
  subtitle: string
  bgImage: string
  members: TeamMember[]
}

export interface CommunityConfig {
  title: string
  subtitle: string
  bgImage: string
  qq: {
    text: string
    desc: string
    link: string
  }
  wechat: {
    text: string
    desc: string
    link: string
  }
}

export interface FriendLink {
  name: string
  url: string
}

export interface FooterConfig {
  desc: string
  copyright: string
  friendLinks: FriendLink[]
}

// Load from localStorage or use defaults
const loadFromStorage = <T>(key: string, defaults: T): T => {
  try {
    const stored = localStorage.getItem(key)
    return stored ? { ...defaults, ...JSON.parse(stored) } : defaults
  } catch {
    return defaults
  }
}

export const useSiteConfigStore = defineStore('siteConfig', () => {
  // Site config
  const site = ref<SiteConfig>(loadFromStorage('site_config', {
    title: '我的世界小狐狸生存服',
    description: '大型多人在线生存服务器，提供纯净生存、RPG冒险、建筑创造等多种玩法。',
    serverIp: 'play.example.com',
    logoText: '我的世界服务器',
    logoImage: ''
  }))

  // Hero config
  const hero = ref<HeroConfig>(loadFromStorage('hero_config', {
    badge: '现在游玩就送点卷大礼包！',
    titleLine1: '欢迎来到',
    titleHighlight: '小狐狸生存服',
    subtitle: '由专业团队倾力打造的大型多人在线游戏，为您带来高质量的游戏体验',
    features: ['不逼氪', '支持生电', '腐竹女装'],
    bgImage: '/png/c6d2dd6a664242e2e5faa640d28c340b.jpg'
  }))

  // Specs config
  const specs = ref<SpecsConfig>({
    title: '服务器配置',
    subtitle: '为了给您提供最流畅的游戏体验，我们不惜成本选用了顶级的企业级硬件设施',
    bgImage: '/png/89ce487b74da31797c19a3dc4ffc0d79.jpg',
    items: [
      { title: '高频处理器', desc: 'Intel Core i9-14900K 超频至 6.0GHz，单核性能极致释放', value: 'i9-14900K', icon: '/png/CPU.png' },
      { title: '运行内存', desc: '128GB DDR5 6000MHz ECC 纠错内存，告别卡顿与崩溃', value: '128GB DDR5', icon: '/png/RAM.png' },
      { title: '网络带宽', desc: '三线 BGP 优化线路，千兆上下行对等带宽，低延迟畅玩', value: '1Gbps BGP', icon: '/png/network.png' },
      { title: '高速存储', desc: '企业级 NVMe SSD RAID 10 阵列，地图加载瞬间完成', value: 'NVMe RAID 10', icon: '/png/SSD.png' }
    ]
  })

  // Help config
  const help = ref<HelpConfig>({
    title: '如何加入服务器',
    subtitle: '简单三步，即刻开启您在方块世界的奇幻冒险之旅',
    bgImage: '/png/9cca3afcca8c0a79eac6a39aad5d65ec.jpg',
    steps: [
      {
        number: '01',
        title: '下载启动器',
        desc: '我们需要MC启动器才能进入服务器。点击下方按钮下载启动器。',
        action: 'https://hmcl.huangyuhui.net/',
        actionText: '下载启动器 (HMCL)'
      },
      {
        number: '02',
        title: '添加服务器',
        desc: '启动游戏，选择"多人游戏" -> "添加服务器"，输入我们的服务器地址。'
      },
      {
        number: '03',
        title: '进入游戏',
        desc: '双击服务器列表中的图标，即可连接进入服务器，开始您的探索！',
        highlight: '祝您游戏愉快！'
      }
    ]
  })

  // Features config
  const features = ref<FeaturesConfig>({
    title: '游戏特色',
    subtitle: '探索我们精心打造的独特玩法与系统',
    bgImage: '/png/7649e2dbc7044ee71743022dd2d51701.jpg',
    items: [
      { title: '纯净生存', desc: '原汁原味的生存体验，配合精心调整的平衡性，让每一次探索都充满乐趣。', icon: '/egg/002.png' },
      { title: 'RPG系统', desc: '独特的职业与技能系统，挑战强大的副本BOSS，获取传说级装备。', icon: '/egg/003.png' },
      { title: '建筑创造', desc: '超大领地保护，丰富的装饰性方块，让你的建筑才华得到完美展示。', icon: '/egg/001.png' }
    ]
  })

  // Gallery config
  const gallery = ref<GalleryConfig>({
    title: '游戏截图',
    subtitle: '每一帧都是壁纸，记录我们在服务器的点点滴滴',
    bgImage: '/png/f5ea0ca06bf5ac36704b7277536ab53d.jpg',
    items: [
      { src: '/png/f5ea0ca06bf5ac36704b7277536ab53d.jpg', caption: '宏伟的主城大厅' },
      { src: '/png/5e1e1be033cbd911e62327519886379f.jpg', caption: '精美的玩家建筑' },
      { src: '/png/9cca3afcca8c0a79eac6a39aad5d65ec.jpg', caption: '广阔的生存世界' },
      { src: '/egg/img1_bcd004c0.jpg', caption: '热闹的活动现场' },
      { src: '/egg/img2_ab032cdc.jpg', caption: '激情的PVP对战' }
    ]
  })

  // Team config
  const team = ref<TeamConfig>({
    title: '管理团队',
    subtitle: '专业的运营团队，致力于为您提供最好的游戏体验',
    bgImage: '/png/achXdg.jpg',
    members: [
      { name: '服主', role: 'Server Owner', desc: '负责服务器整体规划与运营，确保服务器长期稳定运行。', avatar: '/egg/cat.jpg' },
      { name: '技术管理', role: 'Technical Admin', desc: '负责插件配置、Bug修复及服务器性能优化。', avatar: '/egg/cat2.jpg' },
      { name: '社区巡查', role: 'Moderator', desc: '维护游戏秩序，处理玩家纠纷，营造良好社区氛围。', avatar: '/egg/cat3.jpg' },
      { name: '建筑师', role: 'Builder', desc: '负责主城及公共设施的建筑设计与搭建。', avatar: '/egg/dsb.JPG' },
      { name: '外挂巡查', role: 'Externals', desc: '专门负责巡查玩家是否使用外挂，确保游戏公平性。', avatar: '/egg/dsb2.jpg' }
    ]
  })

  // Community config
  const community = ref<CommunityConfig>({
    title: '加入社区',
    subtitle: '加入我们的玩家交流群，获取最新资讯与福利',
    bgImage: '/png/wj_Narcissa_3.png',
    qq: {
      text: '官方QQ群',
      desc: '与其他玩家实时交流，获取最新公告',
      link: '#'
    },
    wechat: {
      text: '微信交流群',
      desc: '关注微信群，不错过任何活动通知',
      link: '#'
    }
  })

  // Footer config
  const footer = ref<FooterConfig>(loadFromStorage('footer_config', {
    desc: '我们致力于打造最优质的 Minecraft 多人游戏体验，期待您的加入！',
    copyright: '© 2024 FoxMC. All rights reserved.',
    friendLinks: [
      { name: 'Minecraft 官网', url: 'https://www.minecraft.net/' },
      { name: '雨云 IDC', url: 'https://www.rainyun.com/' }
    ]
  }))

  return {
    site,
    hero,
    specs,
    help,
    features,
    gallery,
    team,
    community,
    footer
  }
})
