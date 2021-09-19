import React,{Component} from 'react';
import "./pathfind.css";
import Pathfind1 from './pathtemp';
import Pathfind2 from './pathtemp2';
import Pathfind3 from './pathfind3';
class Pathfind extends Component{

    state={
        WhichComponent:'pathfind1'
    }
    
    render(){
        if(this.state.WhichComponent==='pathfind1'){
            return(
            <div>
                <div className="heading">
                    <h1>Path Visualizer</h1>
                </div>
            <div className="butdiv">
                <button className="buttons" onClick={()=>{
                      this.setState({
                        WhichComponent:'pathfind1'})
                }}>Simple Grid</button>

                <button className="buttons" onClick={()=>{
                      this.setState({
                        WhichComponent:'pathfind2'
                })}}>Wall Grid</button>


                <button className="buttons" onClick={()=>{
                      this.setState({
                        WhichComponent:'pathfind3'})
                }}>Maze Grid</button>

            </div>
            <div>
                <Pathfind1/>
            </div>
            </div>
            )
        }
        else if(this.state.WhichComponent==='pathfind2'){
            return(
                <div>
                <div className="heading">
                    <h1>Path Visualizer</h1>
                </div>
                <div className="butdiv">
                    <button className="buttons" onClick={()=>{
                        this.setState({
                                WhichComponent:'pathfind1'})
                    }}>Simple Grid</button>

                    <button className="buttons" onClick={()=>{
                          this.setState({
                            WhichComponent:'pathfind2'})
                    }}>Wall Grid</button>

                    <button className="buttons" onClick={()=>{
                          this.setState({
                            WhichComponent:'pathfind3'})
                    }}>Maze Grid</button>
                </div>
                <div>
                    <Pathfind2/>
                </div>
                </div>
            )
        }
        else if(this.state.WhichComponent==='pathfind3'){
            return(
                <div>
                <div className="heading">
                    <h1>Path Visualizer</h1>
                </div>
                <div className="butdiv">
                    <button className="buttons" onClick={()=>{
                        this.setState({
                                WhichComponent:'pathfind1'})
                    }}>Simple Grid</button>
                    <button className="buttons" onClick={()=>{
                          this.setState({
                            WhichComponent:'pathfind2'})
                    }}>Wall Grid</button>
                    <button className="buttons" onClick={()=>{
                          this.setState({
                            WhichComponent:'pathfind3'})
                    }}>Maze Grid</button>
                </div>
                <div>
                    <Pathfind3/>
                </div>
                </div>
            )
        }
        return null;   
        }
}

export default Pathfind