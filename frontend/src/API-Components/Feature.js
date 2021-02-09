import React from 'react'
import {Link} from 'react-router-dom'

class Feature extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            prereqsReady: false
        }
    }

    renderName(name){
        return(
            <tr key={'fet-name'}>
                <td>Name:</td>
                <td>{name}</td>
            </tr>
        )
    }

    renderLevel(level){
        return(
            <tr key={'fet-level'}>
                <td>Level:</td>
                <td>{level}</td>
            </tr>
        )
    }

    renderClass(_class){
        return(
            <tr key={'fet-class'}>
                <td>Class:</td>
                <td>
                    <Link to={_class.url}>{_class.name}</Link>
                </td>
            </tr>
        )
    }

    renderSubclass(subclass){
        return(
            <tr key={'fet-subclass'}>
                <td>Subclass:</td>
                <td>
                    <Link to={subclass.url}>{subclass.name}</Link>
                </td>
            </tr>
        )
    }

    renderGroup(group){
        return(
            <tr key={'fet-group'}>
                <td>Group:</td>
                <td>{group}</td>
            </tr>
        )
    }



    renderDescription(desc){
        return(
            Object.keys(desc).map((i) => {
                const d = desc[i]
                return(
                    <tr key={'fet-desc-'+i}>
                        <td>Description Part {i}:</td>
                        <td>{d}</td>
                    </tr>						
                )	
            })
        )
    }

    renderChoices(choices){
        return([
            <tr><td>Choose {choices.choose} from:</td></tr>,
            Object.keys(choices.from).map((i) => {
                const choice = choices.from[i]
                return(
                    <tr>
                        <td>Choice {i}:</td>
                        <td>
                            <Link to={choice.url}>{choice.name}</Link>
                        </td>
                    </tr>
                )
            })
        ])
    }

    renderPrerequisites(prerequisites){
        //const prerequisites = this.state.prereqs

        return(
            Object.keys(prerequisites).map((i) => {
                const p = prerequisites[i]
                console.log(p)
                return(
                    <tr key={'fet-prereq-'+i}>
                        <td>Prereq {i}:</td>
                        <td>
                            {p.type === 'level' ? p.type + ' ' + p.level : null}
                            {p.type === 'proficiency' ? 
                                <Link to={p.proficiency.replace('api','apibrowser')}>
                                    Proficiency in  {p.proficiency}
                                </Link>
                            : null}
                        </td>
                    </tr>						
                )	
            })
        )
    }

    // async getPrereqs(prereqs){
    //     const l = []
    //     for(let k of prereqs){
    //         let res = await fetch(config.dndAPI + k.proficiency)
    //         res = await res.json()
    //         res.type = k.type
    //         l.push(res)
    //     }

    //     this.setState({
    //         prereqs: l,
    //         prereqsReady: true
    //     })
    // }

    // componentDidMount(){
    //     const feature = this.props.feature

    //     if(feature.prerequisites){
    //         this.getPrereqs(feature.prerequisites)
    //     }
    // }

    render(){
        const feature = this.props.feature

        return(
            <table>
                <tbody>
                    {this.renderName(feature.name)}
                    {this.renderClass(feature.class)}
                    {feature.subclass ? this.renderSubclass(feature.subclass) : null}
                    {feature.group ? this.renderGroup(feature.group) : null}
                    {feature.level ? this.renderLevel(feature.level) : null}
                    {this.renderDescription(feature.desc)}
                    {feature.prerequisites ? this.renderPrerequisites(feature.prerequisites) : null}
                    {feature.choice ? this.renderChoices(feature.choice) : null}
                </tbody>
            </table>
            )
    }
}

export default Feature