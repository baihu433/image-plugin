import setting from './setting.js'
import _ from 'lodash'

export default new class {
  /**
   * @description: 获取别名
   * @param {string} name 要匹配的名称
   * @return {string|false} 未匹配到别名则返回false
   */
  get (name) {
    const aliasList = { ...defAlias, ...setting.getConfig('alias') }
    // 读取角色文件
    if (name in aliasList) return name
    const roleName = _.findKey(aliasList, alias => alias.includes(name))
    if (roleName) {
      return roleName
    } else {
      logger.error('[无用别名]未找到该人')
      return false
    }
  }
  
  getAllName () {
    // 读取角色文件
    return { ...defAlias, ...setting.getConfig('alias') }
  }
}()
 // 原配置别名,添加新人物请按照文件夹顺序！
const defAlias = {
  cvs: ['c佬', 'C佬', '希尔薇', '希尔薇'],
  DivinationHW: ['d佬', 'D佬', '占卜任', 'dw','DW', 'divin', 'divination'],
  fafa: ['fa佬', 'fafa姐姐', 'Majestic Fafa', 'majestic fafa'],
  JD: ['JD佬', 'JB', 'jb', 'jd', 'jd佬', '坤D'],
  kesally: ['Kesally','枫叶', '凯萨利', '枫叶插件作者', '枫叶作者', '大K', '大k'],
  lynn: ['ly'],
  Pluto: ['p佬', 'P佬', '秋刀鱼'],
  win11: ['Windows11', 'windows11', 'Win11', '古都雨冬寒夜','古都', '雨冬', '寒夜'],
  "🌌": ['时雨星空', '时雨', '星空', '时雨佬', 'TRSS', 'trss', 'TimeRainStarSky', 'timerainstarsky'],
  白狐: ['白狐佬', '白佬', '狐佬'],
  脆脆鲨: ['笨笨鲨', 'jmccs', 'ccs', 'JMCCS'],
  地球生物: ['球佬','地球', '色批球', 'dqsw', '色球'],
  鹤望兰: ['兰姐', '兰佬', '鹤佬', '鹤姐', '兰儿', '小兰姐姐'],
  狐狸: ['湖里'],
  花海: ['华海'],
  西北一枝花: ['花佬', 'Nwflower', 'nwflower', '牛萎花', '一枝花'],
  煌: ['煌佬', '皇佬', '火皇', '煌姐'],
  佳菲猫: ['色批猫', '加菲猫', '芒果猫切片'],
  结网: ['黄球生物', '黄球', '黄物'],
  鲸泽: ['大绒布球', '大rbq', '91鲸泽', '91鲸泽先生', '景泽'],
  刻晴: ['刻晴佬'],
  裤衩子: ['裤衩', '丢裤衩', '苦茶', '苦茶子', '丢苦茶', '丢内裤'],
  乐鸟: ['乐神', '乐佬', '乐鸟君', '乐乐乐', '鸟神'],
  零梦夜: ['灵梦夜'],
  芒果猫: ['芒果', '芒果佬', '芒果猫佬'],
  喵喵: ['喵佬', '猫猫', '猫佬', '喵'],
  墨染希: ['墨染溪', '墨希染', '墨柒希', '小希'],
  娜娜: ['娜佬', '叨叨', 'nana', '兰迪娜'],
  鸟图: ['鸟', '禽类', '禽图'],
  柠檬冲水: ['柠檬佬', '柠檬'],
  千羽: ['千羽酱', 'qianyu'],
  苏苏: ['苏佬', '小绒布球', '酥酥', '簌簌', '苏沫柒', 'CiKeyQi'],
  溪姐: ['溪欣梓', '溪溪相欣', '溪佬'],
  向日葵: ['委屈的向日葵', 'xrk', '向日葵佬', '葵佬'],
  小花花花儿: ['花花', '花儿'],
  小雨: ['大雨', '废雨', '小雨姐姐', 'xiaoyu', 'SHIKEAIXY'],
  曉K: ['曉k', '晓K', '晓k', '小K','小k', 'K', 'k','K佬', 'k佬', '狗k', '狗K','萝莉k', '萝莉K', 'kk小萝莉', 'KK小萝莉', 'llk', 'lolik', 'SunRyK', 'sunryk', ' SmallK111407', 'smallk111407', 'SmallK', 'smallk'],
  椰羊: ['椰奶', '椰佬', '狗椰羊'],
  一生无悔: ['医生误会'],
  伊伊: ['一一', '意义', '依依', '异议', '以一', '一亿', '衣衣', '奕奕', '熠熠', '姨姨', '一役', '意译', '疑义'],
  渔火: ['渔佬', 'yh', '鱼火', '雨火', '火渔', 'Arcadia', 'yhArcadia', 'arcadia', '索引库作者'],
  云雾: ['云舞', '狗云雾'],
  长楠: ['楠佬', '义子', '长佬', '长楠佬', '昌南']
}