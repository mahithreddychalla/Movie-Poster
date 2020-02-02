import React,{Component} from 'react'
import 'axios'
import Axios from 'axios'
import './Posters.css';



class Posters extends Component{
    constructor(props){
        super(props)
        this.state={jokes:[],input:"",prevInput:"",isLoading:false}
        this.handleScroll=this.handleScroll.bind(this)
        this.getJokes=this.getJokes.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
        
    };
    componentDidMount(){
        
        window.addEventListener("scroll", this.handleScroll);
    }
      
       
       
     componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
      }

  async getJokes(){
     
     let images=[];
   try{  const url =`http://www.omdbapi.com/?apikey=2898d980&s=${this.state.prevInput}`;
     //console.log(url)
     let res = await Axios.get(url)
        
        //console.log(res.data);
  let img = res.data.Search.map((im,i)=> <span key={i} className="card shadow m-lg-5 m-3 bg-dark"><img className="card-body" key={i}src={im.Poster} alt={im.Title}/></span>)
   // console.log(img)    
  images.push(img)
    
   // }
  this.setState({jokes:[...this.state.jokes, ...images]})
  
    
  }
     catch(err){
      alert("Error")
      this.setState({jokes:[],input:"",prevInput:""})
  }
 }
 handleScroll() {
    
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight && this.state.jokes.length<3) {
    
    this.getJokes();
    }
    
  }
  handleChange(evt){
      this.setState({input:evt.target.value,prevInput:evt.target.value})
  }
  handleSubmit(evt){
      if(this.state.input!==""){
      evt.preventDefault();
      this.setState({jokes:[],input:""})
      this.getJokes();}
      else{
        this.setState({jokes:[],input:"",prevInput:""})  
      }
  }
  
render(){
  
  
    

    return(
        <div>
        <nav className=" d-flex justify-content-between navbar navbar-expand-lg navbar-dark bg-dark "> 
        <span className="navbar-brand">MoviePosters</span>
         <form onSubmit={this.handleSubmit}>
         <input
         type="text"
         onChange={this.handleChange}
         value={this.state.input}
         /> 
         <button className="btn bg-dark" >Search</button>
         </form>  
          
       </nav>
        <div className="container ">
            <div >
        <div className=" spinner d-flex justify-content-center flex-wrap m-5">
            
            {this.state.jokes.map(j=> j)
            }
          </div>      
           
        </div>
        </div>
        </div>
    )
}

}

export default Posters;