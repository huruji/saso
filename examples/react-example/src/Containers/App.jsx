import React from 'react'
import chainGet from 'chain-get'
import IMG_TYPES from '../CONSTANTS'
import handleUrl from '../util'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.container = React.createRef()
    this.state = {
      list: [],
      imgHeight: 0,
      imgWidth: 0,
      id: 6
    }
  }

  componentWillMount() {
    const { id } = this.state
    this.fetchData(id)
  }

  componentDidMount() {
    const width = this.container.current.clientWidth
    const height = width / 1920 * 1200
    this.setState({
      imgHeight: `${height}px`,
      imgWidth: `${width}px`
    })
  }

  preloadImg(imgs, base) {
    imgs.forEach((img, i) => {
      const image = new Image()
      image.src = img.url
      image.onload = () => {
        const { list } = this.state
        list[base + i] = {
          url: img.url,
          loaded: true
        }
        this.setState(() => ({
          list
        }))
      }
    })
  }

  changeId(id) {
    const { id: cid } = this.state
    if (id == cid) return
    this.setState({ id }, () => {
      this.fetchData()
    })
  }

  fetchData() {
    const { id } = this.state
    fetch(handleUrl(id), {
      method: 'GET',
      mode: 'no-cors'
    })
      .then(res => res.json())
      .then((json) => {
        if (json.errno == '0' && chainGet(json, []).data().length) {
          const imgs = []
          // const { list } = this.state
          json.data.forEach(img => imgs.push({
            url: img.url,
            loaded: false
          }))
          this.setState({
            list: [...imgs]
          })
          this.preloadImg(imgs, 0)
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }

  render() {
    const {
      list, imgWidth, imgHeight, id
    } = this.state
    return (
      <div>
        <div className="type-container">
          <ul>
            {
              IMG_TYPES.map(type => (
                <li onClick={() => this.changeId(type.id)} className={type.id == id ? 'type-item active' : 'type-item'} key={type.id}>{type.name}</li>
              ))
            }
          </ul>
        </div>
        <div className="img-container" ref={this.container}>
          <ul>
            {list.map((img, i) => (
              <li key={`${img.url}_${i}`} className="img-item">
                {img.loaded ? (
                  <img src={img.url} alt={img.url} />
                ) : (
                  <div style={{ width: imgWidth, height: imgHeight, background: '#ccc' }} />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
