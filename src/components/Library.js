import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AlbumData from './../data/albums';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: AlbumData };
  }

  render() {
    return (
      <section className='library'>
        {
          this.state.albums.map( (album, index) =>
          <div className="album-link">
            <Link to={`/album/${album.slug}`} key={index}>
            <img src={album.albumCover} alt={album.title} />
              <div className="album-name">{album.title}</div>
              <div className="album-artist">{album.artist}</div>
              <div>{album.songs.length} songs</div>
            </Link>
          </div>
          )
        }
      </section>
     );
   }
 }

export default Library;
