import React from 'react'
import chainGet from 'chain-get'

const URL =
	'//api.tuchong.com/feed-app?os_api=22&device_type=MI&device_platform=android&ssmix=a&manifest_version_code=232&dpi=400&abflag=0&uuid=651384659521356&version_code=232&app_name=tuchong&version_name=2.3.2&openudid=65143269dafd1f3a5&resolution=1280*1000&os_version=5.8.1&ac=wifi&aid=0&page=1&type=refresh'
export default class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			list: []
		}
	}
	componentWillMount() {
		debugger
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
					json.data.forEach(img => imgs.push({ url: img.url }))
					debugger
					this.setState({
						list: this.state.list.concat(imgs)
					})
				}
			})
			.catch(e => {
				console.log(e)
			})
	}

	render() {
		const { list } = this.state
		return (
			<div>
				<ul>
					{list.map(img => (
						<li key={img.url}>
							<img src={img.url} />
						</li>
					))}
				</ul>
			</div>
		)
	}
}
