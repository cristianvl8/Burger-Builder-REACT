import React from 'react'
import './Layout.css'
import SideDrawer from '../Navigation//SideDrawer/SideDrawer'
import Toolbar from '../Navigation/Toolbar/Toolbar'

const layout = ( props ) => (
    <>
        <Toolbar />
        <SideDrawer/>
        <main className='Content'>
            {props.children}
        </main>
    </>
)

export default layout