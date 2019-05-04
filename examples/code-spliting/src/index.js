import(/* webpackChunkName: "foo" */ './foo').then(({ foo }) => {
  console.log(foo)
})
import(/* webpackChunkName: "bar" */ './bar').then((bar, { bar1 }) => {
  console.log(bar(), bar1())
})
