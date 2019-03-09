import { h, render } from 'preact'
import APP from './Containers/App'
import 'primer-base/index.scss'
import './index.styl'

render(<APP />, document.querySelector('#app'))
