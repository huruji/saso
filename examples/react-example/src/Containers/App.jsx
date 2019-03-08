import React from 'react'
import chainGet from 'chain-get'

const URL =
	'//api.tuchong.com/feed-app?os_api=22&device_type=MI&device_platform=android&ssmix=a&manifest_version_code=232&dpi=400&abflag=0&uuid=651384659521356&version_code=232&app_name=tuchong&version_name=2.3.2&openudid=65143269dafd1f3a5&resolution=1280*1000&os_version=5.8.1&ac=wifi&aid=0&page=1&type=refresh'
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
			.then(res => {
				return res.json()
			})
			.then(json => {
				if (json.errno == '0' && chainGet(json, []).data().length) {
					const imgs = []
					json.data.forEach(img =>
						imgs.push({
							url: img.url,
							loaded: false
						})
					)
					this.preloadImg(imgs, this.state.list.length)
					this.setState({
						list: [...this.state.list, ...imgs]
					})
				}
			})
			.catch(e => {
				console.log(e)
			})
	}
	componentDidMount() {
		const width = this.container.current.clientWidth
		const height = width / 1920 * 1200
		this.setState({
			imgHeight: height + 'px',
			imgWidth: width + 'px'
		})
	}

	preloadImg(imgs, base) {
		imgs.forEach((img, i) => {
			const image = new Image()
			image.src = img.url
			image.onload = () => {
				const list = this.state.list
				list[base + i] = {
					url: img.url,
					loaded: true
				}
				debugger
				this.setState(prevState => ({
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
					{' '}
					{list.map((img, i) => (
						<li key={`${img.url}_${i}`} className="img-item">
							{img.loaded ? (
								<img src={img.url} />
							) : (
								<div style={{ width: imgWidth, height: imgHeight, background: '#ccc' }} />
							)}
						</li>
					))}{' '}
				</ul>{' '}
			</div>
		)
	}
}
