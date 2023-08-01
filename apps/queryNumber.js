import plugin from '../../../lib/plugins/plugin.js';
import alias from '../model/alias.js';
import fs from 'node:fs';
import fetch from 'node-fetch'


const _path = process.cwd() + '/plugins/useless-plugin'

export class queryNumber extends plugin {
    constructor() {
        super({
            name: '[无用插件]查询图片数量',
            dsc: '查询图片数量',
            event: 'message',
            priority: 10,
            rule: [
                {
                    reg: '^#*(无用)?(查询|查看|检查)乐子(图片|图)?(数量|张数|数)',
                    fnc: 'queryHappyNumber'
                },
                {
                    reg: '^#*(无用)?(查询|查看|检查)(全部|所有)(图片|图)?(数量|张数|数)',
                    fnc: 'queryAll'
                },
                {
                    reg: '^#*(无用)?(查询|查看|检查).*(图片|图)?(数量|张数|数)',
                    fnc: 'queryNumber'
                }
            ]
        })
    }

    async queryHappyNumber() {
        let result = fs.existsSync(`${_path}/goodjob-img`)
        if (result === true) {
            const files = fs.readdirSync(`${_path}/goodjob-img/resources/UNKNOWN/`)
            let number = Math.floor(files.length)
            await this.reply(`当前所查询「乐子」\n目前总共已收录${number}张图片`, true)
            return true
        } else {
            console.log('[无用插件]未发现安装了本地图库，将尝试使用【云溪院API】查询')
            // API from @云溪院
            let url = `https://yxy-api.yize.site/api/gaffe/index.php?list=UNKNOWN&type=num`
            await fetch(url).catch((err) => logger.error(err))
                .then(response =>
                    response.json())
                .then(data => {
                    const imageCount = data.image_count;
                    console.log(data.image_count);
                    this.e.reply(`当前所查询「乐子」\n目前总共已收录${imageCount}张图片`, true)
                })
            return true
        }
    }
    async queryAll() {
        let result = fs.existsSync(`${_path}/goodjob-img`)
        if (result === true) {
            let count = 0;
            function countImages(folder) {
                const files = fs.readdirSync(folder);
                for (const file of files) {
                    const path = folder + '/' + file;
                    if (fs.statSync(path).isDirectory()) {
                        countImages(path);
                    } else if (/\.(jpe?g|png|gif)$/i.test(file)) {
                        count++;
                    }
                }
            }
            countImages(`${_path}/goodjob-img`)
            this.e.reply(`目前本图库总共已收录${count}张图片`, true)
            return true
        } else {
            // API from @云溪院
            //let url = `https://yxy-api.yize.site/api/gaffe/index.php?`
            this.e.reply(`请安装无用图库，否则无法查询全部图片数量，或等待后续API适配`, true)
            return true
        }
    }
    async queryNumber() {
        let msg = this.e.msg
        let reg = msg.replace(/#|无用|查询|查看|图片|图|数量|张数|数/g, '').trim()
        let name = reg
        let role = alias.get(name)
        if (!role) return false
        let result = fs.existsSync(`${_path}/goodjob-img`)
        if (result === true) {
            const files = fs.readdirSync(`${_path}/goodjob-img/resources/${role}/`)
            let number = Math.floor(files.length)
            await this.reply(`当前所查询人物「${role}」\n目前总共已收录${number}张图片`, true)
            return true
        } else {
            console.log('[无用插件]未发现安装了本地图库，将尝试使用【云溪院API】查询')
            // API from @云溪院
            let url = `https://yxy-api.yize.site/api/gaffe/index.php?list=${role}&type=num`
            await fetch(url).catch((err) => logger.error(err))
                .then(response =>
                    response.json())
                .then(data => {
                    const imageCount = data.image_count;
                    console.log(data.image_count);
                    this.e.reply(`当前所查询人物「${role}」\n目前总共已收录${imageCount}张图片`, true)
                })
            return true
        }
    }
}