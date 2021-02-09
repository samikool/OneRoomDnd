import React from 'react'

class Condition extends React.Component{
    
    renderName(name){
			return(
				<tr key={'condition-name'}>
					<td>Name:</td>
					<td>{name}</td>
				</tr>	
			)
    }

    renderCondition(desc){
			return(
				Object.keys(desc).map((i) => {
					const d = desc[i]
					return(
						<tr key={'condition-desc-'+i}>
							<td>Description Part {i}:</td>
							<td>{d}</td>
						</tr>						
					)	
				})
			)
    }

    render(){
			let condition = this.props.condition

			return(
				<table>
					<tbody>
						{this.renderName(condition.name)}
						{this.renderCondition(condition.desc)}
					</tbody>
				</table>
			)
    }
}

export default Condition