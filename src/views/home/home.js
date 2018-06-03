import React, { Component } from 'react';
import Searchmovilelist from './searchmovilelist';
import { connect } from 'react-redux';
import * as FontAwesome from 'react-icons/lib/fa'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Input,
  ListGroup, ListGroupItem,
  Row,
  Col,
  Container
} from 'reactstrap';
import movie from './../../config/movie';

class Home extends Component {
  constructor(props) {
    super(props);
    console.log('props', props)
    this.toggle = this.toggle.bind(this);
    this.movieList = this.movieList.bind(this);
    this.handleMoueover=this.handleMoueover.bind(this);
    this.handleMoueleave=this.handleMoueleave.bind(this);
    this.state = {
      isOpen: false,
      watched: [],
      inpuval: '',
      mouseover:'',
      count:0,
      vote:'',
      loader:false
    };
    var data = ['0'];
    localStorage.setItem('watched', data)
  }
  handleWatched = () => {
    console.log('hjh')
    var watched = this.state.watched;
    var flag=true;
    watched.map(rowData=>{
      console.log(rowData.id,this.props.movielistbyid.imdbID)
      if(rowData.id===this.props.movielistbyid.imdbID)
      {
        flag=false;
      }
    })
    if(flag)
    {
      watched.push({id:this.props.movielistbyid.imdbID,img:this.props.movielistbyid.Poster,rating:this.props.movielistbyid.imdbRating,Genre:this.props.movielistbyid.Genre,vote:this.state.vote});
      this.setState({
        watched: watched,
        vote:''
      })
    }else{
      alert("Movie already watched !!");
    }

  }

  handleMoueover(index){
 
    this.setState({
      mouseover:index
    });
  
  }
  handleMoueleave(){
    this.setState({
      mouseover:''
    });
  }
  movieList(event) {
    event.preventDefault();
    this.props.handleListHide(true);
    this.props.fetchMovieList(event.target.value)

    this.setState({
      inpuval: event.target.value
    })
    console.log('mv',this.props.movielist,this.props.movielist!==undefined);

  }
  getMovieByid = (id) => {
    this.props.fetchMovieListByID(id);
    this.setState({
      inpuval: ''
    })

    this.props.handleListHide(false);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  handleWatchedRem(id){
    console.log("handleWatchedRem",id)
    this.getMovieByid(id)
    var watched = this.state.watched;
    const filteredwatched = watched.filter((item) => item.id !== id);
    this.setState({
      watched: filteredwatched

  })
}

handleVote=(val)=>{
  var vote=this.state.vote;
  if(vote===val)
  {
    this.setState({
      vote:'',
    })
  }else{
    this.setState({
      vote:val,
    
    })
  }

}
handleListHideMv=()=>{
  this.setState({
    inpuval: ''
  })

  this.props.handleListHide(false);
}
  render() {
    var data = this.props.movielistbyid
    console.log('movielistbyidff', data)
    return (

      <div onClick={this.handleListHideMv}>
        <Navbar color="Dark" light expand="md">
          <NavbarBrand href="/">Movie Mania</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar className="searchbar">
              <NavItem >
                <div className="inputsearch">
                <input type='text' value={this.state.inpuval} style={{border:'none',outline:'none', width: '80%',float:'left',marginLeft:'8%',marginTop:'2%' }} onChange={this.movieList} placeholder='Search here...' id="search-input"  />  
             
                   {this.props.listHide?<div className="lds-dual-ring"></div>:null}
          
               </div>
              </NavItem>
            </Nav>
            
          </Collapse>
        </Navbar>
        {/*Body*/}
        <div className={this.props.listHide ? 'movielist' : 'listhide'} onm>
          <ListGroup >
            <Searchmovilelist {...this.props} movieByid={this.getMovieByid} />
          </ListGroup>
        </div>
        <Container>
          <Row className='selectedMovie'>
            {data.Title?(
              <Row >
              <Col className="selectedPost" xs="4">
                <a href="#" onClick={this.handleWatched}>
                  <img src={data.Poster} style={{ width: '100%', height: '100%' }} />
                </a>
              </Col>
              <Col style={{ marginTop: '5%' }} xs="6">
              <p className='mtitle'><FontAwesome.FaFilm style={{color:'black'}}/> {data.Title}</p>
                <p  style={{fontSize:20}}><FontAwesome.FaCalendar style={{color:'black'}}/>  {data.Year}</p><br/>
                <p style={{fontSize:20}}><FontAwesome.FaStar style={{color:'black'}}/>  {data.imdbRating}</p><br/>
                <p style={{fontSize:20}}><FontAwesome.FaClockO style={{color:'black'}}/>  {data.Runtime}</p><br/>
                <p style={{fontSize:20}}><FontAwesome.FaSmileO style={{color:'black'}}/>  {data.Genre}</p><br/>
                <FontAwesome.FaThumbsUp onClick={()=>this.handleVote('1',data.Genre)} className={this.state.vote==='1'? 'onvote':'vote'}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<FontAwesome.FaThumbsDown onClick={()=>this.handleVote('0',data.Genre)} className={this.state.vote==='0'? 'onvote':'vote'}/>
              </Col>
            </Row>
            ):null}
          </Row>
          {this.state.watched[0]?(
            <div>
            <Row>
            <p style={{fontSize:25,fontWeight:'bold',color:'#fff'}}>Watched Movies</p>
          </Row>
          <Row style={{border:'1px solid white'}}>
            { 
              this.state.watched.map((rowData,index) => {
                return(
                  <Col  xs="3" style={{padding:'2%'}}  >
                    <a href="#" className="watched" onMouseOver={()=>this.handleMoueover(rowData.id)} onMouseLeave={this.handleMoueleave}>
                  
                      <img src={rowData.img} onClick={()=>this.handleWatchedRem(rowData.id)} style={{ width: '100%', height: '100%' }} />
                    
                      {this.state.mouseover===rowData.id?<div className="onmouseover">

                      <p style={{textAlign:'center'}}>{rowData.vote==='1'?(<FontAwesome.FaThumbsUp className='onvote'  />):null} </p>                                 
                      <p style={{textAlign:'center'}}>{rowData.vote==='0'?(<FontAwesome.FaThumbsDown  className='onvote'  />):null} </p>                                 
                            <p style={{textAlign:'center'}}><FontAwesome.FaStar />  {rowData.rating}</p>
                            <p style={{textAlign:'center'}}>{rowData.Genre}</p>
                        </div>
                      :null}
                    
                    </a>
                  </Col>
                )
            })}
          </Row>
          </div>

          ):null}
          
        </Container>
       

      </div>

    );
  }
}
export default Home
