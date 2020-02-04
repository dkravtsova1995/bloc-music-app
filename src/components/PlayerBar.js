import React, { Component } from 'react';

class PlayerBar extends Component {
  render() {
    return (
      <section className="player-bar">
        <div className="player-bar-controls">
        <section id="buttons">
          <button id="previous" onClick={this.props.handlePrevClick}>
            <span className="player-icon ion-skip-backward"></span>
          </button>
          <button id="play-pause" onClick={this.props.handleSongClick} >
            <span className={'play-icon ' + (this.props.isPlaying ? 'ion-ios-pause' : 'ion-ios-play')}></span>
          </button>
          <button id="next" onClick={this.props.handleNextClick}>
            <span className="player-icon ion-skip-forward"></span>
          </button>
        </section>
        <section id="time-control">
           <div className="current-time">{this.props.formatTime(this.props.currentTime)}</div>
           <input
             type="range"
             className="seek-bar"
             value={(this.props.currentTime / this.props.duration) || 0}
             max="1"
             min="0"
             step="0.01"
           />
           <div className="time-left">{this.props.formatTime(this.props.duration)}</div>
         </section>
        <section id="volume-control">
  					<span className="volume-icon ion-volume-low" onClick={this.props.handleVolumeDownClick} />
  					<input
  						type="range"
  						className="volume-bar"
  						value={this.props.volume}
  						max="1"
  						min="0"
  						step="0.01"
  						onChange={this.props.handleVolumeChange}
  					/>
  					<span className="volume-icon ion-volume-high" onClick={this.props.handleVolumeUpClick} />
  				</section>
          </div>
      </section>
    );
  }
}

export default PlayerBar;
