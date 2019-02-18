import Vue from 'vue'
import vueRouter from 'vue-router'
// import Zero from '../components/rightBar/zero'

Vue.use(vueRouter)

const Zero = (resolve) => {
    import('../components/rightBar/zero').then(module =>{
        resolve(module)
    })
}

const One = (resolve) => {
    import('../components/rightBar/one').then(module =>{
        resolve(module)
    })
}
const Two = (resolve) => {
    import('../components/rightBar/two').then(module =>{
        resolve(module)
    })
}
const Three = (resolve) => {
    import('../components/rightBar/three').then(module =>{
        resolve(module)
    })
}
const Four = (resolve) => {
    import('../components/rightBar/four').then(module =>{
        resolve(module)
    })
}
const Five = (resolve) => {
    import('../components/rightBar/five').then(module =>{
        resolve(module)
    })
}
const Six = (resolve) => {
    import('../components/rightBar/six').then(module =>{
        resolve(module)
    })
}
const Seven = (resolve) => {
    import('../components/rightBar/seven').then(module =>{
        resolve(module)
    })
}
const Eight = (resolve) => {
    import('../components/rightBar/eight').then(module =>{
        resolve(module)
    })
}
const Nine = (resolve) => {
    import('../components/rightBar/nine').then(module =>{
        resolve(module)
    })
}
const Ten = (resolve) => {
    import('../components/rightBar/ten').then(module =>{
        resolve(module)
    })
}
const Eleven = (resolve) => {
    import('../components/rightBar/eleven').then(module =>{
        resolve(module)
    })
}
const Twelve = (resolve) => {
    import('../components/rightBar/twelve').then(module =>{
        resolve(module)
    })
}
const Thirteen = (resolve) => {
    import('../components/rightBar/thirteen').then(module =>{
        resolve(module)
    })
}
const Fourteen = (resolve) => {
    import('../components/rightBar/fourteen').then(module =>{
        resolve(module)
    })
}
const Fifteen = (resolve) => {
    import('../components/rightBar/fifteen').then(module =>{
        resolve(module)
    })
}
const Sixteen = (resolve) => {
    import('../components/rightBar/sixteen').then(module =>{
        resolve(module)
    })
}
const Seventeen = (resolve) => {
    import('../components/rightBar/seventeen').then(module =>{
        resolve(module)
    })
}
const Eighteen = (resolve) => {
    import('../components/rightBar/eighteen').then(module =>{
        resolve(module)
    })
}
const Nineteen = (resolve) => {
    import('../components/rightBar/nineteen').then(module =>{
        resolve(module)
    })
}
const Twenty = (resolve) => {
    import('../components/rightBar/twenty').then(module =>{
        resolve(module)
    })
}

const TwentyOne = (resolve) => {
    import('../components/rightBar/twentyOne').then(module =>{
        resolve(module)
    })
}
const TwentyTwo = (resolve) => {
    import('../components/rightBar/twentyTwo').then(module =>{
        resolve(module)
    })
}
const TwentyThree = (resolve) => {
    import('../components/rightBar/twentyThree').then(module =>{
        resolve(module)
    })
}
const TwentyFour = (resolve) => {
    import('../components/rightBar/twentyFour').then(module =>{
        resolve(module)
    })
}
const TwentyFive = (resolve) => {
    import('../components/rightBar/twentyFive').then(module =>{
        resolve(module)
    })
}
const TwentySix = (resolve) => {
    import('../components/rightBar/twentySix').then(module =>{
        resolve(module)
    })
}
const TwentySeven = (resolve) => {
    import('../components/rightBar/twentySeven').then(module =>{
        resolve(module)
    })
}
const TwentyEight = (resolve) => {
    import('../components/rightBar/twentyEight').then(module =>{
        resolve(module)
    })
}
const TwentyNine = (resolve) => {
    import('../components/rightBar/twentyNine').then(module =>{
        resolve(module)
    })
}

const scrollBehavior = (to, from, savedPosition) => {
   if (savedPosition) {
     // savedPosition is only available for popstate navigations.
     return savedPosition
   } else {
     const position = {}
     // new navigation.
     // scroll to anchor by returning the selector
     if (to.hash) {
       position.selector = to.hash
     }
     // check if any matched route config has meta that requires scrolling to top
     if (to.matched.some(m => m.meta.scrollToTop)) {
       // cords will be used if no selector is provided,
       // or if the selector didn't match any element.
       position.x = 0
       position.y = 0
     }
     // if the returned position is falsy or an empty object,
     // will retain current scroll position.
     return position
   }
 }
export default new vueRouter({
    mode: 'history',
    scrollBehavior,
    routes:[
        {
            path: '/',
            redirect: '/zero'
        },{
            path: '/zero',
            component: Zero
        },{
            path:'/one',
            component: One,
            meta: { scrollToTop: true }
        },{
            path:'/two',
            component: Two,
            meta: { scrollToTop: true }
        },{
            path:'/three',
            component: Three,
            meta: { scrollToTop: true }
        },{
            path:'/four',
            component: Four,
            meta: { scrollToTop: true }
        },{
            path:'/five',
            component: Five,
            meta: { scrollToTop: true }
        },{
            path:'/six',
            component: Six,
            meta: { scrollToTop: true }
        },{
            path:'/seven',
            component: Seven,
            meta: { scrollToTop: true }
        },{
            path:'/eight',
            component: Eight,
            meta: { scrollToTop: true }
        },{
            path:'/nine',
            component: Nine,
            meta: { scrollToTop: true }
        },{
            path:'/ten',
            component: Ten,
            meta: { scrollToTop: true }
        },{
            path:'/eleven',
            component: Eleven,
            meta: { scrollToTop: true }
        },{
            path:'/twelve',
            component: Twelve,
            meta: { scrollToTop: true }
        },{
            path:'/thirteen',
            component: Thirteen,
            meta: { scrollToTop: true }
        },{
            path:'/fourteen',
            component: Fourteen,
            meta: { scrollToTop: true }
        },{
            path:'/fifteen',
            component: Fifteen,
            meta: { scrollToTop: true }
        },{
            path:'/sixteen',
            component: Sixteen,
            meta: { scrollToTop: true }
        },{
            path:'/seventeen',
            component: Seventeen,
            meta: { scrollToTop: true }
        },{
            path:'/eighteen',
            component: Eighteen,
            meta: { scrollToTop: true }
        },{
            path:'/nineteen',
            component: Nineteen,
            meta: { scrollToTop: true }
        },{
            path:'/twenty',
            component: Twenty,
            meta: { scrollToTop: true }
        },{
            path:'/twentyOne',
            component: TwentyOne,
            meta: { scrollToTop: true }
        },{
            path:'/twentyTwo',
            component: TwentyTwo,
            meta: { scrollToTop: true }
        },{
            path:'/twentyThree',
            component: TwentyThree,
            meta: { scrollToTop: true }
        },{
            path:'/twentyFour',
            component: TwentyFour,
            meta: { scrollToTop: true }
        },{
            path:'/twentyFive',
            component: TwentyFive,
            meta: { scrollToTop: true }
        },{
            path:'/twentySix',
            component: TwentySix,
            meta: { scrollToTop: true }
        },{
            path:'/twentySeven',
            component: TwentySeven,
            meta: { scrollToTop: true }
        },{
            path:'/twentyEight',
            component: TwentyEight,
            meta: { scrollToTop: true }
        },{
            path:'/twentyNine',
            component: TwentyNine,
            meta: { scrollToTop: true }
        }
    ]
})