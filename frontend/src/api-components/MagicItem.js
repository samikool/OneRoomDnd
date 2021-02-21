import React from 'react'
const Link = require('react-router-dom').Link

class MagicItem extends React.Component{

    renderName(item){
        return(
            <tr>
                <td>Name:</td>
                <td>{item.name}</td>
            </tr>
        )
    }

    renderCategory(label, category){
        let catName = category.name
        let catURL = category.url

        return(
            <tr>
                <td>{label}:</td>
                <td><Link to={catURL}>{catName}</Link></td>
            </tr>
        )
    }

    renderDesc(desc){
        return(
            Object.keys(desc).map((i) => {
                const d = desc[i]
                return(
                    <tr key={'item-desc-'+i}>
                        <td>Description Part {i}:</td>
                        <td>{d}</td>
                    </tr>						
                )	
            })
        )
    }

    render(){
        let item = this.props.equipment

        return(
            <table>
                <tbody>
                    {item.name ? this.renderName(item) : null}
                    {item.category ? this.renderCategory('Equipment Category', item.equipment_category) : null}
                    {item.desc ? this.renderDesc(item.desc) : null}
                </tbody>
            </table>
        )
    }
}

export default MagicItem