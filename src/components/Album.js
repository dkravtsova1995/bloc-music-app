import React, { Component } from 'react';
import AlbumData from '../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
     super(props);

const album = AlbumData.find( album => {
  return album.slug === this.props.match.params.slug
});

  this.state = {
    album: album,
    currentSong: album.songs[0],
    currentTime: 0,
    duration: album.songs[0].duration,
    volume: 0.5,
    isPlaying: false,
    hovered: '',

  };

  this.audioElement = document.createElement('audio');
  this.audioElement.src = album.songs[0].audioSrc;
}

  play() {
     this.audioElement.play();
     this.setState({ isPlaying: true });
   }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  componentDidMount() {
    this.eventListeners = {
       timeupdate: e => {
         this.setState({ currentTime: this.audioElement.currentTime });
       },
       durationchange: e => {
         this.setState({ duration: this.audioElement.duration });
       }
     };
     this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
     this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
   }

   componentWillUnmount() {
      this.audioElement.src = null;
      this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
      this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    }

  setSong(song) {
     this.audioElement.src = song.audioSrc;
     this.setState({ currentSong: song });
   }

   handleSongClick(song) {
     const isSameSong = this.state.currentSong === song;
     if (this.state.isPlaying && isSameSong) {
       this.pause();
     } else {
       if (!isSameSong) { this.setSong(song); }
       this.play();
     }
   }

   handlePrevClick() {
     const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
     const newIndex = Math.max(0, currentIndex - 1);
     const newSong = this.state.album.songs[newIndex];
     this.setSong(newSong);
     this.play();
   }

   handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = currentIndex + 1

    if (newIndex < this.state.album.songs.length) {
      const newSong = this.state.album.songs[newIndex];
      this.setSong(newSong);
      this.play(newSong);
    } else {
      this.play(this.state.currentSong);
    }
  }

   handleTimeChange(e) {
      const newTime = this.audioElement.duration * e.target.value;
      this.audioElement.currentTime = newTime;
      this.setState({ currentTime: newTime });
    }

    handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({ volume: newVolume });
  }

  handleVolumeUpClick(e) {
    if (this.state.volume < 1) {
      const newVolume = this.state.volume + 0.1;
      this.audioElement.volume = Math.min(newVolume, 1);
      this.setState({ volume: newVolume });
    } else this.setState({ volume: 1 });
  }

  handleVolumeDownClick(e) {
    if (this.state.volume > 0) {
      const newVolume = this.state.volume - 0.1;
      this.audioElement.volume = Math.max(0, newVolume);
      this.setState({ volume: newVolume });
    } else this.setState({ volume: 0 });
  }

    getPlayIcon(index, song) {
      if (this.state.isPlaying && this.state.currentSong === song ) {
        return <span className="ion-pause"></span>;
      }

      if (this.state.hovered === index) {
        return <span className="ion-play"></span>;
      }

      return <span className="song-number">{index+1}</span>;
    }

    handleOnMouseEnter(index) {
      this.setState({
        hovered: index,
      })
    }

    formatTime(timeParam){
      if (isNaN(timeParam))
        return "-:--";

      var minutes = Math.floor(timeParam / 60);
      var seconds = (Math.floor(timeParam) % 60);

      if (minutes < 10) {minutes = "0" + minutes;}
      if (seconds < 10) {seconds = "0" + seconds;}
      var time = minutes + ":" + seconds;
      return time;
  }



render() {
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <div className="song-list-container">
        <table id="song-list">
           <colgroup>
             <col id="song-number-column" />
             <col id="song-title-column" />
             <col id="song-duration-column" />
           </colgroup>
           <tbody>
             {this.state.album.songs.map( (song, index) =>
                 <tr className="song" key={index} onClick={() => this.handleSongClick(song)} >
                   <td className="song-actions">
                     <button onMouseEnter={() => this.handleOnMouseEnter(index)}>
                      {this.getPlayIcon(index, song)}
                     </button>
                   </td>
                   <td className="song-title">{song.title}</td>
                   <td className="song-duration">{this.formatTime(song.duration)}</td>
                 </tr>
               )}
           </tbody>
         </table>
         </div>
         <PlayerBar
             isPlaying={this.state.isPlaying}
             currentSong={this.state.currentSong}
             currentTime={this.audioElement.currentTime}
             currentVolume={this.audioElement.currentVolume}
             duration={this.audioElement.duration}
             handleSongClick={() => this.handleSongClick(this.state.currentSong)}
             handlePrevClick={() => this.handlePrevClick()}
             handleNextClick={() => this.handleNextClick()}
             handleTimeChange={(e) => this.handleTimeChange(e)}
             handleVolumeChange={(e) => this.handleVolumeChange(e)}
             formatTime={(e) => this.formatTime(e)}
           />
    </section>
    );
  }
}

export default Album;
