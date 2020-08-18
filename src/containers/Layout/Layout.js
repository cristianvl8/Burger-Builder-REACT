import React from 'react'

const layout = ( props ) => (
<>
<div>ToolBar,SideDrawer, Backdrop</div>
<main>
        {props.children}
</main>
</>
)

export default layout