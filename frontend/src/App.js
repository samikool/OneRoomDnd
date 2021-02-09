import React from 'react'
import SharedItems from './SharedItems'
import {Link} from 'react-router-dom'

class App extends React.Component{
    render(){
        return(
            <div>
                <Link to={'/apibrowser'}>Api Browser</Link>
                <SharedItems />
            </div>
            
        )
    }
}

export default App