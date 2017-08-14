import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import outline,{ Styles } from 'react-outline'
import 'animate.css'

let styles = {
    base : {
      list:{ listStyleType: "none" },
      item:{
        base:{ textShadow: "1px 1px 10px #000", color:"white", cursor:"pointer" },
        ":hover":{ color:"blue" }
      }
    }
}
styles = outline(styles);

const List = styles.list`ul`
const Item = styles.item`li`

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.add = this.add.bind(this);
    this.state = {  data: [],  name:'' };
  }

  render() {
    return (
      <div><Styles/>
       <input placeholder="Type something here" type="text"
              onChange={({target})=>this.setState({name:target.value})}
              value={this.state.name}/>
       <input onClick={this.add} type="button" value="Add" />
       {!!this.state.data.length && <div>click on item to remove</div>}
        <List>

        <ReactCSSTransitionGroup
                      transitionEnterTimeout={600}
                       transitionLeaveTimeout={600}
                       transitionName={{enter       :"animated",
                                       enterActive  :"fadeIn",
                                       leave        :"animated",
                                       leaveActive  :"fadeOut"}}>
        {
          this.list()
        }
        </ReactCSSTransitionGroup>
        </List>

      </div>
    )
  }

  list(){
  return  this.state.data.map((player,i) =>{
       return <Item key={player.id} onClick={()=> this.remove(i) }>{player.name}</Item>
    })
  }

  add(){
    var arr = this.state.data.slice();
    arr.push({'id':(new Date()).getTime(),'name':this.state.name})
    this.setState({data:arr,name:""})
  }

  remove(index){
    const data = this.state.data.slice(0);
    data.splice( index, 1 )
    this.setState({data})
  }
}

export default <Panel/>
