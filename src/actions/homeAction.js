import { connect } from 'react-redux';

import * as Actions from './homeActionType';
import Home from '../views/home/home';


const mapStateToProps = (state) => ({
    movielist: state.homeReducer.movielist,
    movielistbyid: state.homeReducer.movielistbyid,
    listHide:state.homeReducer.listHide

});

const mapDispatchToProps = (dispatch) => ({
    fetchMovieList: (title) => dispatch({type: Actions.API_MOVIELIST_FETCH,title:title}),
    fetchMovieListByID: (id) => dispatch({type: Actions.API_MOVIELISTBYID_FETCH,id:id}),
    handleListHide: (val) => dispatch({type: Actions.LIST_HIDE,val})
 
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)