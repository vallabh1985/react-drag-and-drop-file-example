import React,{Component} from 'react';
import Dropzone from './dropzone/Dropzone';
import Box from './box/Box';
import "./App.css";


class App extends Component{
    state={
        filedata:null,
        perChunk:process.env.REACT_APP_FIXED_COLUMN,
        delimiter:`,`,
        lineFilter:2,
        linecnt:-1,
        fileError: '',
        lineError:''
    }
    
    //this will display the rows of table
    displayRow = (line) =>{
        for (let i = 0; i < this.state.lineFilter; i++) {
            let datacolumn = line.split(this.state.delimiter);
            let str=[];
            for(let j=0; j<this.state.perChunk; j++){
                str.push(<td>{datacolumn[j]}</td>);
            }
            return str;
        } 
    }

    //it will handle data of child box component
    handleBox = data =>{
        let key = Object.keys(data)[0];
        let value = data[key];
        this.setState({[key]:value});
    }
   
    handleReadFile = e =>{
        const content=e.target.result;
        this.setState({filedata:content.split('\n'),linecnt:content.split('\n').length});
    }

    //this will read the file and update the state
    handlefile = myfile => {
       if(myfile!=="error"){
            let myFileReader = new FileReader();
            myFileReader.onload = this.handleReadFile;
            myFileReader.readAsText(myfile);   
       }else{
        this.setState({filedata:null});
       }
             
    }

    render(){
        const displayData=this.state.filedata;
        const {delimiter,lineFilter,linecnt}=this.state;

        return <div className="container mt-3">

            <Dropzone onFilesAdded={this.handlefile} />
            
            <Box boxData={this.handleBox} linecnt={linecnt} key={linecnt}/>

            {this.state.filedata && delimiter!=''
                ? 
                <div className="mt-5 data-container">
                    <table className="table table-bordered">
                    <tbody>
                    {displayData.slice(0,lineFilter).map((line, index)=> 
                       <tr key={index}>
                          { this.displayRow(line) }
                       </tr>
                    )}
                    </tbody>
                    </table>
                </div>
                : <div className="mt-5 data-container"><h2>Upload file to display data</h2></div>
            }

            </div>;
    }

}

export default App;