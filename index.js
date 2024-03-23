// 基本参考 无用插件 感谢各位大佬 
import fs from 'node:fs'
import chalk from 'chalk'

if (!global.segment)
  global.segment = (await import('oicq')).segment

if (!segment.button)
  segment.button = () => ""

let ret = []

logger.info(chalk.rgb(0, 0, 204)(`---------awa---------`))
logger.info(chalk.rgb(0, 0, 204)(`图片插件载入成功 *^O^*`))
logger.info(chalk.rgb(0, 0, 204)(`Created By baihu433`))
logger.info(chalk.rgb(0, 0, 204)(`---------------------`));

const files = fs
  .readdirSync('./plugins/image-plugin/apps')
  .filter((file) => file.endsWith('.js'))

  files.forEach((file) => {
    ret.push(import(`./apps/${file}`))
})

ret = await Promise.allSettled(ret)

let apps = {}
for (let i in files) {
  let name = files[i].replace('.js', '')
  
  if (ret[i].status != 'fulfilled') {
    logger.error(`载入插件错误：${logger.red(name)}`)
    logger.error(ret[i].reason)
    continue
    }
    apps[name] = ret[i].value[Object.keys(ret[i].value)[0]]
}
export { apps }
