import React from 'react'
import SharedItems from './SharedItems'
import {Link} from 'react-router-dom'

class App extends React.Component{
    render(){
        return(
            <div>
                <span>
                    <Link to={'/apibrowser'}>Api Browser</Link>
                    <Link to={'/classviewer'}>Class Viewer</Link> 
                </span>
                <SharedItems />
            </div>
            
        )
    }
}

export default App