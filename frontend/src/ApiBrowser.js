import React from 'react'
import{
  Link,
} from "react-router-dom"
import Leaf from './API-Components/Leaf'
import {getFromDndAPI} from './adapters/get'

const JSONPretty  = require('react-json-pretty')


class ApiBrowser extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        list: [],
        lastGet: {},
    }

    this.goBack = this.goBack.bind(this)
  }

  //renders an edge case
  renderLeaf(get){
    const path = this.props.location.pathname.split('/')
    const category = path[path.length-2]
    return(<Leaf data={get} category={category} />)
  }

  //renders the list of indexes user can nav too
  renderInternal(get){
    const list = get.results ?  get.results :  get.subsections

    return(
        <ul>
        {Object.keys(list).map( (i) => {
          let item = list[i]
          let name = item.name ? item.name : item.class
          let url = item.url
        return(
          <li key={i}>
            <Link to={url}>{name}</Link>
          </li>
        )})
      }
      </ul>
    )
  }


  renderRoot(list){
    if(list.results) return null

    return(
        <ul>{
          Object.keys(list).map( (name) => {
            let url = list[name]
            return(
              <li key={name}>
                <Link to={url}>{name}</Link>              
              </li>)
          })
        }</ul>
      )
  }

  renderLastGet(get){
    if(!get) return null

    if(get.results || get.subsections) return this.renderInternal(get)
    else if(get.index) return this.renderLeaf(get)
    return this.renderRoot(get)
  }

  //renders the last get request results for easy debugging
  renderGet(){
    return(
      <JSONPretty id="lastGet" data={this.state.lastGet}></JSONPretty>
    )
  }

  locationDidChange(prevProps){
    let prevPath = prevProps.location.pathname
    let curPath = this.props.location.pathname
    return curPath !== prevPath
  }

  goBack(){
    this.props.history.goBack()
  }

  async componentDidMount(){    
    const path = this.props.location.pathname.replace('/apibrowser','')
    const res = await getFromDndAPI(path)

    if(!res.ok) console.error('error fetching data')
      else{
        delete res.ok
        this.setState({lastGet: res})
      }
  }

  async componentDidUpdate(prevProps, prevState, snapshot){   

    if(this.locationDidChange(prevProps)){
      const path = this.props.location.pathname.replace('/apibrowser','')
      const res = await getFromDndAPI(path)

      if(!res.ok) console.error('error fetching data')
      else{
        delete res.ok
        this.setState({lastGet: res})
      }
      
    }
  }

  handleHome(event){
    window.location.href = window.location.origin
  }

  render(){
    return (

        <div>
          <div>
            <button onClick={this.handleHome}>Home</button>  
          </div>      
          <div><span> {this.props.location.pathname.replace('/apibrowser','')}</span></div>
          <Link to='..'>..</Link>
        
          {this.renderLastGet(this.state.lastGet)}

          <div>
            {this.renderGet()}
          </div>
        </div>
    );
  } 
}

export default ApiBrowser