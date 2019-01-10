/* @flow */
const webpack = require(`webpack`)
const webpackConfig = require(`../utils/webpack.config`)

console.log(process.env.MODERN)
module.exports = async program => {
  const { directory } = program

  // const compilerConfig = await webpackConfig(
  //   program,
  //   directory,
  //   `build-javascript`
  // )
  // process.env.MODERN = true
  const compilerConfigModern = await webpackConfig(
    program,
    directory,
    `build-javascript`,
    { modern: true }
  )

  return new Promise((resolve, reject) => {
    webpack(compilerConfigModern).run((err, stats) => {
      // process.env.MODERN = false
      if (err) {
        reject(err)
        return
      }

      const jsonStats = stats.toJson()
      if (jsonStats.errors && jsonStats.errors.length > 0) {
        reject(jsonStats.errors)
        return
      }

      resolve()
    })
  })
}
