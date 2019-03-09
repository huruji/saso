import React from 'react'
import chainGet from 'chain-get'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.container = React.createRef()
    this.state = {
      list: [],
      imgHeight: 0,
      imgWidth: 0
    }
  }

  componentWillMount() {
    fetch('/imgapi?c=WallPaperAndroid&a=getAppsByCategory&cid=9&start=0&count=99', {
      method: 'GET',
      mode: 'no-cors'
    })
      .then(res => res.json())
      .then((json) => {
        if (json.errno == '0' && chainGet(json, []).data().length) {
          const imgs = []
          const { list } = this.state
          json.data.forEach(img => imgs.push({
            url: img.url,
            loaded: false
          }))
          this.preloadImg(imgs, list.length)
          this.setState({
            list: [...list, ...imgs]
          })
        }
      })
      .catch((e) => {
        console.log(e)
      })
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

  render() {
    const { list, imgWidth, imgHeight } = this.state
    return (
      <div className="img-container" ref={this.container}>
        <ul>
          {list.map(img => (
            <li key={`${img.url}`} className="img-item">
              {img.loaded ? (
                <img src={img.url} alt={img.url} />
              ) : (
                <div style={{ width: imgWidth, height: imgHeight, background: '#ccc' }} />
              )}
            </li>
          ))}
        </ul>
        {' '}
        {' '}
      </div>
    )
  }
}
