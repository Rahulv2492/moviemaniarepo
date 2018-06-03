import axios from 'axios';

var movie = {
    getMovieList: function (title) {
        return new Promise(function (resolve, reject) {
            axios.get('http://www.omdbapi.com/?apikey=aabca0d&s='+title)
                .then(result => {
                    resolve(result.data.Search);
                }).catch(error => {
                    reject(error.message);
                });
        });
    },
    getMovieListById: function (id) {
        return new Promise(function (resolve, reject) {
            axios.get('http://www.omdbapi.com/?apikey=aabca0d&i='+id)
                .then(result => {
                    resolve(result.data);
                }).catch(error => {
                    reject(error.message);
                });
        });
    }
};
export default movie;

