import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';


class Searchmovilelist extends Component {
        constructor(props) {
                super(props);
                console.log(props)
                this.handlemovie=this.handlemovie.bind(this);
        }

        handlemovie=(id)=>{
                console.log('dd',this.props)
                this.props.movieByid(id)
        }
        render() {
                console.log(this.props.movielist)
                if (this.props.movielist) {
                        return (
                                Object.values(this.props.movielist).map((rowData, index)=>
                                        (

                                                <a onClick={()=>this.handlemovie(rowData.imdbID)}>
                                                <ListGroupItem key={index}>
                                                        <img src={rowData.Poster} />
                                                        <span>{rowData.Title}</span>
                                                        <p>{rowData.Year}</p>

                                                </ListGroupItem >
                                                </a>

                                        )

                                

                                )
                        )

                }
                else {
                        console.log('xxx')
                        return null;
                }

        }

}

export default Searchmovilelist;
