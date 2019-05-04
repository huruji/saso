import React from 'react'
import Loading from './Loading'
import Error from './Error'

const Suspense = React.Suspense

const List = React.lazy(
  () => new Promise((resolve, reject) => {
    setTimeout(() => {
      /* eslint-disable */
      import('./List').then(() => {
        reject()
      })
    }, 5000)
  })
)
export default () => (
  <div>
    <div>app</div>
    <Error>
      <Suspense fallback={<Loading />}>
        <List />
      </Suspense>
    </Error>
  </div>
)
