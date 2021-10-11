import React from 'react';
import screenShot from '../svg/transfer_image.png'

class Home extends React.Component {
    


    showForm = () => {
        window.location.replace('http://localhost:8888/login')
    }

    render() {
        return (
            <section className="landing-page" >
                <div className="main-container">
                    <div className="landing-inner">
                    <p>Transfer playlists from Spotify to Apple Music.</p>
                        <p><strong>Both a Spotify and Apple Music account are required for this app to work.</strong></p>

                        <button className="btn" onClick={this.showForm}>Transfer To Apple Music</button>
                        <img className="landingPageImage" src={screenShot} alt="Spotify to Apple music and Apple music to spotify"></img>
                    </div>
                </div>
            </section>
        )
    }
}

export default Home;