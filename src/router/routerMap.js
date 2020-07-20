export default [
    {
        path: '/',
        name: 'Home',
        component: resolve => require(['@/components/Home'], resolve)
    },
    {
        path: '/edit/:id/:action',
        name: 'Edit',
        component: resolve => require(['@/components/Edit'], resolve)
    }
]