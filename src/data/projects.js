/**
 * Shared project data for home page cards and /projects FlowingMenu
 *
 * HOW TO ADD A NEW MENU ITEM (View all / FlowingMenu)
 * -----------------------------------------------
 * 1. Add a new image to  public/images/  (e.g. my-project-screenshot.jpg)
 * 2. Add a new object below with:
 *    - link:  full URL when the user clicks (e.g. 'https://myproject.com')
 *    - text:  label shown in the menu (e.g. 'My Project')
 *    - image: path from public, always start with /images/ (e.g. '/images/my-project-screenshot.jpg')
 *
 * Example:
 *   {
 *     link: 'https://myproject.com',
 *     text: 'My Project',
 *     image: '/images/my-project-screenshot.jpg'
 *   }
 */
export const projectsForMenu = [
  {
    link: 'https://batinosgarden.shop',
    text: "Batino's Garden",
    image: '/images/batinosgarden-screenshot-1.jpg'
  },
  {
    link: 'https://www.vapershive.store',
    text: "Vapers' Hive",
    image: '/images/vapers-hive-screenshot1.png'
  },
  {
    link: 'https://ambag.online',
    text: 'AMBAG',
    image: '/images/ambag-screenshot-1.jpg'
  },
  {
    link: 'https://www.figma.com/design/aiGD23LFvHC650tmiwVHhB/Batino-s-Garden-prototype?node-id=0-1&t=GNdTCLZYWdQ8mJdb-1',
    text: 'Batino\'s Garden (FIGMA)',
    image: '/images/batinosgardenprototype.png'
  },
  {
    link: 'https://www.figma.com/design/zbWMg2IHItclwiVpThiJYU/HIDE-CAFE-POS?t=swcMS0lHFYGwxEZW-1',
    text: 'HIDE CAFE (FIGMA)',
    image: '/images/hidecafeprototype.png'
  }
];
