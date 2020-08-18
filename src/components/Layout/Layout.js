import React from 'react'
import './Layout.css'

const layout = ( props ) => (
    <>
        <div>ToolBar,SideDrawer, Backdrop</div>
        <main className='Content'>
            {props.children}
        </main>
    </>
)

export default layout