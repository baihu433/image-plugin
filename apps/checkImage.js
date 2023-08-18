import plugin from '../../../lib/plugins/plugin.js';
import alias from '../model/alias.js';
import fs from 'node:fs';
import fetch from 'node-fetch'

const _path = process.cwd() + '/plugins/useless-plugin'

export class checkImage extends plugin {
    constructor() {
        super({
            name: '[无用插件]查看对应图片',
            dsc: '查看对应编号图片',
            event: 'message',
            priority: 10,
            rule: [
                {
                    reg: '^#*(无用)?(查看|发送)乐子(第)?.*(张|号)?(图片|照片|图)?',
                    fnc: 'checkHappyImage'
                },
                {
                    reg: '^#*(无用)?(查看|发送).*(第)?.*(张|号)?(图片|照片|图)?',
                    fnc: 'checkImage'
                }
            ]
        })
    }
    async checkHappyImage() {
        let msg = this.e.msg
        let value = msg.replace(/[^0-9]/ig, "");
        let number = Number(value) - 1
        let test = fs.existsSync(`${_path}/goodjob-img`)
        if (test === false) {
            console.log('[无用插件]未发现安装了本地图库，将尝试使用【云溪院API】返图')
            // API from @云溪院
            await fetch(`https://yxy-api.yize.site/api/gaffe/goodjob-img/resources/UNKNOWN/${number}.png`)
                .then(response => {
                    if (!response.ok) {
                        console.log('[无用插件]云溪院API 404 Error');
                        this.e.reply(`当前所查看图片不存在或是API访问出现问题！\n你可以使用【#查询乐子数量】来查看乐子图片数量`, true)
                        return true
                    } else {
                        console.log('[无用插件]云溪院API访问成功!');
                        this.e.reply(segment.image(`https://yxy-api.yize.site/api/gaffe/goodjob-img/resources/UNKNOWN/${number}.png`))
                        return true
                    }
                })
                .catch(error => {
                    console.log('Error:', error)

                })
        } else {
            const files = fs.readdirSync(`${_path}/goodjob-img/resources/UNKNOWN/`)
            let result = fs.existsSync(`${_path}/goodjob-img/resources/UNKNOWN/${number}.png`)
            if (result === true) {
                await this.reply(segment.image(`${_path}/goodjob-img/resources/UNKNOWN/${number}.png`))
                return true
            } else if (result === false) {
                await this.reply(`当前所查看图片不存在！\n你可以使用【#查询乐子数量】来查看乐子图片数量`, true)
                return true
            }
        }
    }
    async checkImage() {
        let msg = this.e.msg
        let value = msg.replace(/[^0-9]/ig, "");
        let number = Number(value) - 1
        let reg = msg.replace(/#|无用|查看|发送|第|[0-9]|张|号|图片|照片|图/g, '').trim()
        let name = reg
        let role = alias.get(name)
        if (!role) return false
        let test = fs.existsSync(`${_path}/goodjob-img`)
        if (test === false) {
            console.log('[无用插件]未发现安装了本地图库，将尝试使用【云溪院API】返图')
            // API from @云溪院
            if (`${role}` == `茄子`) {
                await fetch(`https://yxy-api.yize.site/api/gaffe/goodjob-img/resources/${role}/${number}.gif`)
                    .then(response => {
                        if (!response.ok) {
                            console.log('[无用插件]云溪院API 404 Error');
                            this.e.reply(`当前所查看图片不存在或是API访问出现问题！\n你可以使用【#查询${role}数量】来查看对应人物的图片数量`, true)
                            return true
                        } else {
                            console.log('[无用插件]云溪院API访问成功!');
                            this.e.reply(segment.image(`https://yxy-api.yize.site/api/gaffe/goodjob-img/resources/${role}/${number}.gif`))
                            return true
                        }
                    })
                    .catch(error => {
                        console.log('Error:', error)
                    })
            } else {
                await fetch(`https://yxy-api.yize.site/api/gaffe/goodjob-img/resources/${role}/${number}.png`)
                    .then(response => {
                        if (!response.ok) {
                            console.log('[无用插件]云溪院API 404 Error');
                            this.e.reply(`当前所查看图片不存在或是API访问出现问题！\n你可以使用【#查询${role}数量】来查看对应人物的图片数量`, true)
                            return true
                        } else {
                            console.log('[无用插件]云溪院API访问成功!');
                            this.e.reply(segment.image(`https://yxy-api.yize.site/api/gaffe/goodjob-img/resources/${role}/${number}.png`))
                            return true
                        }
                    })
                    .catch(error => {
                        console.log('Error:', error)
                    })
            }
        } else {
            const files = fs.readdirSync(`${_path}/goodjob-img/resources/${role}/`)
            let result = fs.existsSync(`${_path}/goodjob-img/resources/${role}/${files[number]}`)
            if (result === true) {
                if (`${role}` == `茄子`) {
                    await this.reply(segment.image(`${_path}/goodjob-img/resources/${role}/${number}.gif`))
                    return true
                } else {
                    await this.reply(segment.image(`${_path}/goodjob-img/resources/${role}/${number}.png`))
                    return true
                }
            } else if (result === false) {
                await this.reply(`当前所查看图片不存在！\n你可以使用【#查询${role}数量】来查看对应人物的图片数量`, true)
                return true
            }
        }
    }
}
