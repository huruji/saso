import(/* webpackChunkName: "foo" */ './foo').then(({ foo }) => {
  console.log(foo)
})
import(/* webpackChunkName: "bar" */ './bar').then((module) => {
  console.log(module.default(), module.bar1())
})
