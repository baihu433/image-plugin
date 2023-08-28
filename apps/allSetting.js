import plugin from '../../../lib/plugins/plugin.js';
import setting from '../model/setting.js';
import fs from 'node:fs'

const _path = process.cwd() + '/plugins/useless-plugin'

export class allSetting extends plugin {
    constructor() {
        super({
            name: '[无用插件]设置',
            dsc: '无用插件设置',
            event: 'message',
            priority: 10,
            rule: [
                {
                    reg: '^#*无用(配置|设置)(菜单|说明|帮助)$',
                    fnc: 'settingHelp'
                },
                {
                    reg: '^#*无用(检测|检查)(配置|设置)?文件$',
                    fnc: 'checkSetting'
                },
                {
                    reg: '^#*无用(获取|查看)?(配置|设置)(情况|状况)?$',
                    fnc: 'getSetting'
                },
                {
                    reg: '^#*无用设置别名(权限|限制)(0|1|2)$',
                    fnc: 'abbrSetAuthSetting'
                },
                {
                    reg: '^#*无用设置抽取冷却(.*)(分|分钟)?$',
                    fnc: 'extractSetting'
                },
                {
                    reg: '^#*无用设置戳一戳(开启|关闭)$',
                    fnc: 'pokeSetting'
                }
            ]
        })
    }
    async settingHelp() {
        if (!(this.e.isMaster || this.e.user_id == 1509293009)) { return true }
        await this.e.reply(`=====无用配置菜单=====\n【#无用检测配置文件】\n【#无用设置别名权限(0|1|2)】\n【#无用设置抽取冷却<数字>】\n【#无用设置戳一戳(开启|关闭)】\n==================`, true)
        return true
    }
    async checkSetting() {
        if (!(this.e.isMaster || this.e.user_id == 1509293009)) { return true }
        const configLines = fs.readFileSync(`${_path}/config/config.yaml`, 'utf8').split('\n').length;
        const defLines = fs.readFileSync(`${_path}/def/config.yaml`, 'utf8').split('\n').length;
        if (configLines < defLines) {
            fs.copyFileSync(`${_path}/def/config.yaml`, `${_path}/config/config.yaml`)
            await this.e.reply(`[无用插件]检测结果:配置文件非最新\n已重新生成最新配置文件\n请重新进行配置`, true)
            return true
        } else {
            await this.e.reply(`[无用插件]检测结果:配置文件为最新\n继续愉快地使用无用插件吧！`, true)
            return true
        }
    }
    get appconfig() { return setting.getConfig("config") }
    async getSetting() {
        if (!(this.e.isMaster || this.e.user_id == 1509293009)) { return true }
        const abbrSetAuth = this.appconfig['abbrSetAuth']
        let abbrSetAuthResult = String(abbrSetAuth).replace(/0/g, '所有人都可以设置').replace(/1/g, '仅管理员或主人可以设置').replace(/2/g, '仅主人可以设置').trim()
        const cdtime = this.appconfig['extractCD']
        const poke = this.appconfig['poke']
        let pokeResult = String(poke).replace(/true/g, '开启').replace(/false/g, '关闭').trim()
        await this.e.reply(`=====无用配置情况=====\n别名权限: ${abbrSetAuthResult}\n抽取冷却: ${cdtime}分钟\n戳一戳: ${pokeResult}\n==================\n发送【#无用配置菜单】查看配置帮助qwq~`, true)
        return true
    }
    async abbrSetAuthSetting() {
        if (!(this.e.isMaster || this.e.user_id == 1509293009)) { return true }
        const configLines = fs.readFileSync(`${_path}/config/config.yaml`, 'utf8').split('\n').length;
        const defLines = fs.readFileSync(`${_path}/def/config.yaml`, 'utf8').split('\n').length;
        if (configLines < defLines) {
            fs.copyFileSync(`${_path}/def/config.yaml`, `${_path}/config/config.yaml`)
            await this.e.reply(`[无用插件]检测到config内配置文件非最新，已重新生成最新配置文件\n请重新发送设置命令`, true)
            logger.debug(`[无用插件]尚未检测到config内含有【别名权限】的配置，已自动填入，默认为所有人都可以添加别名`)
        } else {
            if (this.e.msg.includes('0')) {
                let str = fs.readFileSync(`${_path}/config/config.yaml`, "utf8")
                let reg = new RegExp(`abbrSetAuth: .*`);
                let abbrSetAuth = str.replace(reg, `abbrSetAuth: 0`);
                fs.writeFileSync(`${_path}/config/config.yaml`, abbrSetAuth, "utf8");
                await this.e.reply("[无用插件]别名添加权限已设置为所有人都可以添加！", true)
                return true
            } else if (this.e.msg.includes('1')) {
                let str = fs.readFileSync(`${_path}/config/config.yaml`, "utf8")
                let reg = new RegExp(`abbrSetAuth: .*`);
                let abbrSetAuth = str.replace(reg, `abbrSetAuth: 1`);
                fs.writeFileSync(`${_path}/config/config.yaml`, abbrSetAuth, "utf8");
                await this.e.reply("[无用插件]别名添加权限已设置为仅群管理员或主人可以添加！", true)
                return true
            } else if (this.e.msg.includes('2')) {
                let str = fs.readFileSync(`${_path}/config/config.yaml`, "utf8")
                let reg = new RegExp(`abbrSetAuth: .*`);
                let abbrSetAuth = str.replace(reg, `abbrSetAuth: 2`);
                fs.writeFileSync(`${_path}/config/config.yaml`, abbrSetAuth, "utf8");
                await this.e.reply("[无用插件]别名添加权限已设置仅主人可以添加！", true)
                return true
            }
        }
    }
    async extractSetting() {
        if (!(this.e.isMaster || this.e.user_id == 1509293009)) { return true }
        const configLines = fs.readFileSync(`${_path}/config/config.yaml`, 'utf8').split('\n').length;
        const defLines = fs.readFileSync(`${_path}/def/config.yaml`, 'utf8').split('\n').length;
        if (configLines < defLines) {
            fs.copyFileSync(`${_path}/def/config.yaml`, `${_path}/config/config.yaml`)
            await this.e.reply(`[无用插件]检测到config内配置文件非最新，已重新生成最新配置文件\n请重新发送设置命令`, true)
            logger.debug(`[无用插件]尚未检测到config内含有【抽取卡片】的配置，已自动填入，默认1分钟`)
        } else {
            let msg = this.e.msg
            let value = msg.replace(/[^0-9]/ig, "");
            if (value === "") {
                await this.e.reply("[无用插件]请键入有效数字！", true)
            } else if (value < 0) {
                await this.e.reply("[无用插件]不能键入0以下的数字！", true)
            } else if (value > 1440) {
                await this.e.reply("[无用插件]不能键入1440以上的数字！", true)
            } else {
                let str = fs.readFileSync(`${_path}/config/config.yaml`, "utf8")
                let reg = new RegExp(`extractCD: .*`);
                let extractCD = str.replace(reg, `extractCD: ${value}`);
                fs.writeFileSync(`${_path}/config/config.yaml`, extractCD, "utf8");
                await this.e.reply(`[无用插件]抽取卡片冷却时间已设置为${value}分钟`, true)
                return true
            }
        }
    }
    async pokeSetting() {
        if (!(this.e.isMaster || this.e.user_id == 1509293009)) { return true }
        const configLines = fs.readFileSync(`${_path}/config/config.yaml`, 'utf8').split('\n').length;
        const defLines = fs.readFileSync(`${_path}/def/config.yaml`, 'utf8').split('\n').length;
        if (configLines < defLines) {
            fs.copyFileSync(`${_path}/def/config.yaml`, `${_path}/config/config.yaml`)
            await this.e.reply(`[无用插件]检测到config内配置文件非最新，已重新生成最新配置文件\n请重新发送设置命令`, true)
            logger.debug(`[无用插件]尚未检测到config内含有【戳一戳】的配置，已自动填入，默认关闭`)
        } else {
            if (this.e.msg.includes('开启')) {
                let str = fs.readFileSync(`${_path}/config/config.yaml`, "utf8")
                let reg = new RegExp(`poke: .*`);
                let poke = str.replace(reg, `poke: true`);
                fs.writeFileSync(`${_path}/config/config.yaml`, poke, "utf8");
                await this.e.reply("[无用插件]戳一戳已设置为开启", true)
                return true
            } else {
                let str = fs.readFileSync(`${_path}/config/config.yaml`, "utf8")
                let reg = new RegExp(`poke: .*`);
                let poke = str.replace(reg, `poke: false`);
                fs.writeFileSync(`${_path}/config/config.yaml`, poke, "utf8");
                await this.e.reply("[无用插件]戳一戳已设置为关闭", true)
                return true
            }
        }
    }
}