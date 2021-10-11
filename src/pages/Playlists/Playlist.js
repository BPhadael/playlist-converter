import React from 'react';
// import Checkbox from 'react-simple-checkbox';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
// import { updateToken, fetchSpotifyPlaylists, prepareSpotifyDataToBeTransfered } from '../../modules/actions/spotify-actions'
import PlaylistCard from '../../components/PlaylistCard/playlistcard'
import ScaleLoader from "react-spinners/ScaleLoader"
import queryString from 'query-string';
import spotify_default from '../../svg/Spotify-liked-track.png'
import './style.scss'

var fakedata = [
    {
        name: 'test',
        no_of_songs: 0,
        playlist_owner: 'Brett',
        image: spotify_default,
        id: 'allthelikedsongsid',
        isChecked: false
    },
    {
        name: 'test',
        no_of_songs: 0,
        playlist_owner: 'Brett',
        image: spotify_default,
        id: 'allthelikedsongsid',
        isChecked: false
    },
    {
        name: 'test',
        no_of_songs: 0,
        playlist_owner: 'Brett',
        image: spotify_default,
        id: 'allthelikedsongsid',
        isChecked: false
    }
]

class Playlist extends React.Component {

    constructor(){
        super()
        this.state = {
            parsedJsonData: fakedata,
            spotifyAccessTokenJson: '',
            loading: false,
        }
    }

    componentDidMount(){
        // let parsed = queryString.parse(window.location.search);
        // this.props.updateToken(parsed.access_token)
        // this.setState({ spotifyAccessTokenJson: parsed })
        // this.props.fetchSpotifyPlaylists(parsed)
        this.selectedPlaylists = new Set();
    }

    handleCheckChildElement = (event) => {
        let json_data = this.state.parsedJsonData
        json_data.forEach(data => {
            if (data.isChecked){
                data.isChecked = false;
                this.selectedPlaylists.delete(event.target.id);
            }
            else{
                data.isChecked = true;
                this.selectedPlaylists.add(event.target.id);
            }
        })
    }

    spinnerCss (){
        return (`height: 50vh;
        display: block;
        margin: 0 auto;
        margin-top: 100px;`)
    }

    transferToApple = () => {
        this.setState({
            loading: true,
        })
        this.props.prepareSpotifyDataToBeTransfered(this.selectedPlaylists, this.state.spotifyAccessTokenJson)
    }
    
    render(){
        return(
            <div className="playlist">
                <div className="button-wrapper">
                    <button onClick={this.transferToApple}>Transfer Selected Playlist to Apple Music</button>
                </div>
                {(this.state.loading ? <ScaleLoader css={this.spinnerCss()} size={150} color={"#123abc"} /> : ' ')}
                {this.state.loading ? '' :
                    this.state.parsedJsonData.map((data) => {
                        return (<PlaylistCard
                            key={data.id}
                            name={data.name}
                            no_of_songs={data.no_of_songs}
                            playlist_owner={data.playlist_owner}
                            image={data.image}
                            uid={data.id}
                            handleCheckboxChange={this.handleCheckChildElement}
                            isSelected={data.isChecked}
                            />)
                    })
                }
            </div>
            
        )
    }
}

export default Playlist;