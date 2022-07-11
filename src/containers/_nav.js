import React from 'react'
import CIcon from '@coreui/icons-react'

const adminNav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // }
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Statistics',
    to: '/mainPage',
    icon: 'cil-pencil',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Admin']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'All Users',
    to: '/users',
    icon: 'cil-pencil',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Charts',
    to: '/charts',
    icon: 'cil-chart-pie'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Courses',
    to: '/viewAllCourses',
    icon: 'cil-pencil',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Create Course',
    to: '/createCourse',
    icon: 'cil-pencil',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Create New User',
    to: '/createUser',
    icon: 'cil-pencil',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Create New Course Path',
    to: '/createCoursePath',
    icon: 'cil-pencil',
  },
]

const studentNav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Student Management',
    to: '/userManagement',
    icon: 'cil-cursor',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Membership',
    to: '/membership',
    icon: 'cil-cursor',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Book 1-1 Class',
    to: '/viewAllTeachers',
    icon: 'cil-cursor',
  },
]

const teacherNav = [
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Teacher']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Classes',
    to: '/teacherClasses',
    icon: 'cil-pencil',
  },
]
const shareNav = (id, role) => [
  {
    _tag: 'CSidebarNavItem',
    name: 'Main Page',
    to: `/mainPage`,
    icon: 'cil-pencil',
  },
  // {
  //   _tag: 'CSidebarNavTitle',
  //   _children: ['User']
  // },
  {
    _tag: 'CSidebarNavItem',
    name: 'User Info',
    to: `/users/${id}/${role}`,
    icon: 'cil-pencil',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'All Teachers',
    to: `/viewAllTeachers`,
    icon: 'cil-pencil',
  },
  // {
  //   _tag: 'CSidebarNavTitle',
  //   _children: ['Teachers']
  // },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'External',
  //   route: '/base',
  //   icon: 'cil-cursor',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Item 1',
  //       to: '/',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Item 2',
  //       to: '/',
  //     },
  //   ],
  // },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Internal',
  //   route: '/',
  //   icon: 'cil-cursor',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Item 1',
  //       to: '/',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Item 2',
  //       to: '/',
  //     },
  //   ],
  // },
  
  {
    _tag: 'CSidebarNavDivider'
  },
  // {
  //   _tag: 'CSidebarNavTitle',
  //   _children: ['Courses'],
  // },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'All Courses',
    route: '/allCourse',
    icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'View Courses',
        to: '/allCourse',
      },
      // {
      //   _tag: 'CSidebarNavItem',
      //   name: 'Add New Course',
      //   to: '/',
      // },
    ],
  },
]
const _nav = (id, role)=> {
  if(role === 'admin'){
    return [
      ...shareNav(id, role),
      ...adminNav
    ]
  } else if (role === 'student'){
    return [
      ...shareNav(id, role),
      ...studentNav
    ]
  } else if (role === 'teacher'){
    return [
      ...shareNav(id, role),
      ...teacherNav
    ]
  }
  
}
// const _nav = (id, role)=> {
//   return [
//     {
//       _tag: 'CSidebarNavItem',
//       name: 'Dashboard',
//       to: '/dashboard',
//       icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
//       // badge: {
//       //   color: 'info',
//       //   text: 'NEW',
//       // }
//     },
//     {
//       _tag: 'CSidebarNavTitle',
//       _children: ['User']
//     },
//     {
//       _tag: 'CSidebarNavItem',
//       name: 'User Info',
//       to: `/users/${id}/${role}`,
//       icon: 'cil-pencil',
//     },
//     {
//       _tag: 'CSidebarNavItem',
//       name: 'Management',
//       to: '/userManagement',
//       icon: 'cil-cursor',
//     },
//     {
//       _tag: 'CSidebarNavTitle',
//       _children: ['Teacher']
//     },
//     {
//       _tag: 'CSidebarNavItem',
//       name: 'Classes',
//       to: '/teacherClasses',
//       icon: 'cil-pencil',
//     },
//     {
//       _tag: 'CSidebarNavTitle',
//       _children: ['Admin']
//     },
//     {
//       _tag: 'CSidebarNavItem',
//       name: 'Statistics',
//       to: '/mainPage',
//       icon: 'cil-pencil',
//     },
//     {
//       _tag: 'CSidebarNavItem',
//       name: 'All Users',
//       to: '/Users',
//       icon: 'cil-pencil',
//     },
//     {
//       _tag: 'CSidebarNavItem',
//       name: 'Courses',
//       to: '/viewAllCourses',
//       icon: 'cil-pencil',
//     },
//     {
//       _tag: 'CSidebarNavTitle',
//       _children: ['Teachers']
//     },
//     {
//       _tag: 'CSidebarNavDropdown',
//       name: 'External',
//       route: '/base',
//       icon: 'cil-cursor',
//       _children: [
//         {
//           _tag: 'CSidebarNavItem',
//           name: 'Item 1',
//           to: '/',
//         },
//         {
//           _tag: 'CSidebarNavItem',
//           name: 'Item 2',
//           to: '/',
//         },
//         // {
//         //   _tag: 'CSidebarNavItem',
//         //   name: 'Carousel',
//         //   to: '/base/carousels',
//         // },
//         // {
//         //   _tag: 'CSidebarNavItem',
//         //   name: 'Collapse',
//         //   to: '/base/collapses',
//         // },
//         // {
//         //   _tag: 'CSidebarNavItem',
//         //   name: 'Forms',
//         //   to: '/base/forms',
//         // },
//         // {
//         //   _tag: 'CSidebarNavItem',
//         //   name: 'Jumbotron',
//         //   to: '/base/jumbotrons',
//         // },
//         // {
//         //   _tag: 'CSidebarNavItem',
//         //   name: 'List group',
//         //   to: '/base/list-groups',
//         // },
//         // {
//         //   _tag: 'CSidebarNavItem',
//         //   name: 'Navs',
//         //   to: '/base/navs',
//         // },
//         // {
//         //   _tag: 'CSidebarNavItem',
//         //   name: 'Navbars',
//         //   to: '/base/navbars',
//         // },
//         // {
//         //   _tag: 'CSidebarNavItem',
//         //   name: 'Pagination',
//         //   to: '/base/paginations',
//         // },
//         // {
//         //   _tag: 'CSidebarNavItem',
//         //   name: 'Popovers',
//         //   to: '/base/popovers',
//         // },
//         // {
//         //   _tag: 'CSidebarNavItem',
//         //   name: 'Progress',
//         //   to: '/base/progress-bar',
//         // },
//         // {
//         //   _tag: 'CSidebarNavItem',
//         //   name: 'Switches',
//         //   to: '/base/switches',
//         // },
//         // {
//         //   _tag: 'CSidebarNavItem',
//         //   name: 'Tables',
//         //   to: '/base/tables',
//         // },
//         // {
//         //   _tag: 'CSidebarNavItem',
//         //   name: 'Tabs',
//         //   to: '/base/tabs',
//         // },
//         // {
//         //   _tag: 'CSidebarNavItem',
//         //   name: 'Tooltips',
//         //   to: '/base/tooltips',
//         // },
//       ],
//     },
//     {
//       _tag: 'CSidebarNavDropdown',
//       name: 'Internal',
//       route: '/',
//       icon: 'cil-cursor',
//       _children: [
//         {
//           _tag: 'CSidebarNavItem',
//           name: 'Item 1',
//           to: '/',
//         },
//         {
//           _tag: 'CSidebarNavItem',
//           name: 'Item 2',
//           to: '/',
//         },
//         // {
//         //   _tag: 'CSidebarNavItem',
//         //   name: 'Buttons groups',
//         //   to: '/buttons/button-groups',
//         // },
//         // {
//         //   _tag: 'CSidebarNavItem',
//         //   name: 'Dropdowns',
//         //   to: '/buttons/button-dropdowns',
//         // }
//       ],
//     },
//     {
//       _tag: 'CSidebarNavItem',
//       name: 'Charts',
//       to: '/charts',
//       icon: 'cil-chart-pie'
//     },
//     // {
//     //   _tag: 'CSidebarNavDropdown',
//     //   name: 'Icons',
//     //   route: '/icons',
//     //   icon: 'cil-star',
//     //   _children: [
//     //     {
//     //       _tag: 'CSidebarNavItem',
//     //       name: 'CoreUI Free',
//     //       to: '/icons/coreui-icons',
//     //       badge: {
//     //         color: 'success',
//     //         text: 'NEW',
//     //       },
//     //     },
//     //     {
//     //       _tag: 'CSidebarNavItem',
//     //       name: 'CoreUI Flags',
//     //       to: '/icons/flags',
//     //     },
//     //     {
//     //       _tag: 'CSidebarNavItem',
//     //       name: 'CoreUI Brands',
//     //       to: '/icons/brands',
//     //     },
//     //   ],
//     // },
//     // {
//     //   _tag: 'CSidebarNavDropdown',
//     //   name: 'Notifications',
//     //   route: '/notifications',
//     //   icon: 'cil-bell',
//     //   _children: [
//     //     {
//     //       _tag: 'CSidebarNavItem',
//     //       name: 'Alerts',
//     //       to: '/notifications/alerts',
//     //     },
//     //     {
//     //       _tag: 'CSidebarNavItem',
//     //       name: 'Badges',
//     //       to: '/notifications/badges',
//     //     },
//     //     {
//     //       _tag: 'CSidebarNavItem',
//     //       name: 'Modal',
//     //       to: '/notifications/modals',
//     //     },
//     //     {
//     //       _tag: 'CSidebarNavItem',
//     //       name: 'Toaster',
//     //       to: '/notifications/toaster'
//     //     }
//     //   ]
//     // },
//     // {
//     //   _tag: 'CSidebarNavItem',
//     //   name: 'Widgets',
//     //   to: '/widgets',
//     //   icon: 'cil-calculator',
//     //   badge: {
//     //     color: 'info',
//     //     text: 'NEW',
//     //   },
//     // },
//     {
//       _tag: 'CSidebarNavDivider'
//     },
//     {
//       _tag: 'CSidebarNavTitle',
//       _children: ['Courses'],
//     },
//     {
//       _tag: 'CSidebarNavDropdown',
//       name: 'All Courses',
//       route: '/pages',
//       icon: 'cil-star',
//       _children: [
//         {
//           _tag: 'CSidebarNavItem',
//           name: 'View Courses',
//           to: '/',
//         },
//         {
//           _tag: 'CSidebarNavItem',
//           name: 'Add New Course',
//           to: '/',
//         },
//         // {
//         //   _tag: 'CSidebarNavItem',
//         //   name: 'Error 404',
//         //   to: '/404',
//         // },
//         // {
//         //   _tag: 'CSidebarNavItem',
//         //   name: 'Error 500',
//         //   to: '/500',
//         // },
//       ],
//     },
//     {
//       _tag: 'CSidebarNavDivider'
//     },
//     {
//       _tag: 'CSidebarNavTitle',
//       _children: ['Extras'],
//     },
//     {
//       _tag: 'CSidebarNavDropdown',
//       name: 'Pages',
//       route: '/pages',
//       icon: 'cil-star',
//       _children: [
//         {
//           _tag: 'CSidebarNavItem',
//           name: 'Login',
//           to: '/login',
//         },
//         {
//           _tag: 'CSidebarNavItem',
//           name: 'Register',
//           to: '/register',
//         },
//         // {
//         //   _tag: 'CSidebarNavItem',
//         //   name: 'Error 404',
//         //   to: '/404',
//         // },
//         // {
//         //   _tag: 'CSidebarNavItem',
//         //   name: 'Error 500',
//         //   to: '/500',
//         // },
//       ],
//     },
//     // {
//     //   _tag: 'CSidebarNavItem',
//     //   name: 'Disabled',
//     //   icon: 'cil-ban',
//     //   badge: {
//     //     color: 'secondary',
//     //     text: 'NEW',
//     //   },
//     //   addLinkClass: 'c-disabled',
//     //   'disabled': true
//     // },
//     // {
//     //   _tag: 'CSidebarNavDivider',
//     //   className: 'm-2'
//     // },
//     // {
//     //   _tag: 'CSidebarNavTitle',
//     //   _children: ['Labels']
//     // },
//     // {
//     //   _tag: 'CSidebarNavItem',
//     //   name: 'Label danger',
//     //   to: '',
//     //   icon: {
//     //     name: 'cil-star',
//     //     className: 'text-danger'
//     //   },
//     //   label: true
//     // },
//     // {
//     //   _tag: 'CSidebarNavItem',
//     //   name: 'Label info',
//     //   to: '',
//     //   icon: {
//     //     name: 'cil-star',
//     //     className: 'text-info'
//     //   },
//     //   label: true
//     // },
//     // {
//     //   _tag: 'CSidebarNavItem',
//     //   name: 'Label warning',
//     //   to: '',
//     //   icon: {
//     //     name: 'cil-star',
//     //     className: 'text-warning'
//     //   },
//     //   label: true
//     // },
//     // {
//     //   _tag: 'CSidebarNavDivider',
//     //   className: 'm-2'
//     // }
//   ]
// }

  

export default _nav
