import React, { Component } from 'react';

class Box extends Component{

    state={
        delimiter:`,`,
        lineFilter:2,
        linecnt:this.props.linecnt,
        lineError:''
    }

    handleChange = e => {
        const name=e.target.name;
        const value=e.target.value;
        this.setState({[name]:value});  
        this.props.boxData({[name]:value});
    }
   
    render(){
        const {delimiter,lineFilter,linecnt}=this.state;
     
        return <div className="mb-3">
            <div className="d-flex mt-3 filter-container">
                <div className="input-container"> 
                    <label htmlFor="delimiter" >Delimiter:</label>
                    <input id="delimiter" name="delimiter" type="text" 
                    onChange={this.handleChange} 
                    className={`form-control ${delimiter=='' ? "border-danger" : ""}`}
                    value={delimiter} onChange={this.handleChange}/>
                    {delimiter==''  ? <span className="text-danger">Delimiter is required.</span> : ''}
                </div>
                <div className="input-container">
                    <label htmlFor="lineFilter" >Lines:</label>
                    <input id="lineFilter" name="lineFilter" type="text" 
                        onChange={this.handleChange} 
                        className={`form-control ${lineFilter>linecnt && linecnt!==-1 ? "border-danger" : ""}`} 
                        value={lineFilter} 
                        onChange={this.handleChange}/>
                {lineFilter>linecnt && linecnt!==-1  ? <span className="text-danger">There are only {linecnt} records in the file.</span> : ''}
                </div>    
            </div>
        </div>
    }
}

export default Box;