

const imgOv = new Image()
imgOv.src = '/img/nail.svg'

export const wheelPropsZh = {
    name: 'birth',
    isInteractive: false,
    borderColor: '#333',
    borderWidth: 6,
    overlayImage:imgOv,
    pointerAngle: 90,
    lineWidth: 0,
    radius: 0.96,
    itemLabelFont: 'Roboto Slab, sans-serif',
    itemLabelRadius: 0.93,
    itemLabelRadiusMax: 0.3,
    items: [
        {
            label: '印度',
            weight: 0.1776,
            backgroundColor: '#FF9933',
            labelColor: '#FFFFFF',
            desc: '印度是目前世界人口第一大国，拥有悠久的文明历史与多元文化。作为南亚最大国家，它以宝莱坞电影、咖喱美食、泰姬陵、恒河等闻名。近年来经济高速增长，成为全球IT服务、制药和制造业重要基地，但同时面临人口压力、贫富差距、基础设施挑战和气候变化影响。印度教为主要宗教，语言极为多样，英语和印地语广泛使用。年轻人口占比高，被视为未来几十年全球经济增长重要引擎。'
        }, {
            label: '中国',
            weight: 0.1718,
            backgroundColor: '#DE2910',
            labelColor: '#FFFF00',
            desc: '中国是世界第二人口大国，也是第二大经济体。拥有五千年连续文明史，以长城、故宫、兵马俑、春节等为文化符号。改革开放后经济奇迹般崛起，成为“世界工厂”、高铁与5G技术领先国家。近年来强调高质量发展、科技创新与共同富裕。目前面临人口老龄化、生育率下降、房地产调整、地缘政治摩擦等挑战。中华美食、功夫、书法、传统节日深受全球喜爱。'
        }, {
            label: '美国',
            weight: 0.0421,
            backgroundColor: '#3C3B6E',
            labelColor: '#FFFFFF',
            desc: '美国是全球第三大人口国，也是头号经济体与军事强国。以自由、多元、创新著称，好莱坞、硅谷、NBA、可口可乐、苹果等深刻影响世界文化与科技。移民国家特性明显，拥有纽约、洛杉矶、旧金山等国际化大都市。近年来面临政治极化、枪支问题、种族议题、债务压力与大国竞争。科技创新能力极强，仍是全球顶尖大学与创业中心集中地。'
        }, {
            label: '印尼',
            weight: 0.0347,
            backgroundColor: '#FF0000',
            labelColor: '#FFFFFF',
            desc: '印尼是世界第四人口大国，也是穆斯林人口最多的国家。由上万个岛屿组成，巴厘岛旅游、火山景观、传统蜡染与皮影戏闻名。自然资源丰富（棕榈油、镍、煤炭），是东南亚最大经济体。近年来经济增长稳定，但面临地震海啸频发、宗教多元管理、基础设施落后与青年失业等问题。雅加达为政治经济中心，正推动新首都迁建计划。'
        }, {
            label: '巴基斯坦',
            weight: 0.0310,
            backgroundColor: '#074684',
            labelColor: '#FFFFFF',
            desc: '巴基斯坦人口位居世界第五，伊斯兰共和国，拥有悠久的印度河流域文明。卡拉奇、拉合尔为主要城市，板球是国民运动，美食以烤肉和咖喱著称。地处战略位置（中巴经济走廊），但长期面临恐怖主义、政局不稳、水资源短缺、电力不足与印巴关系紧张等问题。年轻人口众多，纺织业与农业为经济支柱，近年来数字经济与CPEC项目带来新机遇。'
        }, {
            label: '尼日利亚',
            weight: 0.0288,
            backgroundColor: '#008751',
            labelColor: '#FFFFFF',
            desc: '尼日利亚是非洲人口第一大国，也是非洲最大经济体。拉各斯是非洲最大城市之一，诺莱坞电影产量全球领先。石油资源丰富，但依赖单一，腐败、恐怖主义（博科圣地）、部族冲突与基础设施落后长期困扰国家。文化多元，拥有200多个民族，音乐（Afrobeats）、足球极具影响力。年轻人口爆炸式增长，未来潜力巨大但挑战严峻。'
        }, {
            label: '巴西',
            weight: 0.0258,
            backgroundColor: '#009C3B',
            labelColor: '#FFDF00',
            desc: '巴西是南美人口与面积第一大国，里约热内卢狂欢节、足球（五次世界杯冠军）、亚马逊雨林是其标志。咖啡、糖、大豆、铁矿石出口大国，生物多样性全球之最。但面临森林砍伐、贫富悬殊、犯罪率高、政治动荡等问题。桑巴、足球、烧烤文化风靡全球，近年来绿色能源与农业科技发展迅速。'
        }, {
            label: '孟加拉国',
            weight: 0.0213,
            backgroundColor: '#006A4E',
            labelColor: '#F42A41',
            desc: '孟加拉国人口密度极高，是世界第八人口大国。达卡为人口最密集城市之一。成衣制造业全球第二大出口国，极大改善贫困状况。恒河三角洲地势低洼，常受洪水与 cyclones 侵袭。文化受印度教、伊斯兰教双重影响，孟加拉语文学发达（泰戈尔出生于此区域）。近年来经济增速亮眼，但气候变化、人口压力与劳工权益仍是重大挑战。'
        }, {
            label: '俄罗斯',
            weight: 0.0175,
            backgroundColor: '#FFFFFF',
            labelColor: '#DA291C',
            desc: '俄罗斯是世界面积最大国家，人口排第九。横跨欧亚大陆，莫斯科、圣彼得堡文化底蕴深厚，文学（托尔斯泰、陀思妥耶夫斯基）、芭蕾、古典音乐闻名。能源（石油、天然气）出口大国，军事力量强大。近年来受国际制裁与乌克兰冲突影响，经济面临挑战。西伯利亚严寒气候与地广人稀是长期特征。'
        }, {
            label: '埃塞俄比亚',
            weight: 0.0164,
            backgroundColor: '#FDEF02',
            labelColor: '#FF0000',
            desc: '埃塞俄比亚是非洲增长最快的人口大国之一，也是咖啡原产地。拥有古老阿克苏姆文明与独一无二的基督教传统（岩石教堂）。亚的斯亚贝巴为非洲联盟总部所在地。近年来基础设施建设迅猛（大坝、高铁），但也经历内战、饥荒与民族冲突。经济以农业为主，咖啡、鲜花出口重要，年轻人口为未来发展提供潜力。'
        }, {
            label: '墨西哥',
            weight: 0.0160,
            backgroundColor: '#006847',
            labelColor: '#FFFFFF',
            desc: '墨西哥位于北美洲南部，北接美国，南连中美洲，是拉丁美洲重要国家之一，人口约一亿三千万。墨西哥历史悠久，曾孕育奥尔梅克、玛雅、阿兹特克等古代文明，16世纪被西班牙殖民，经济上，墨西哥是新兴工业化国家，制造业、石油、农业和旅游业较为重要，与美国经贸联系紧密。与此同时，墨西哥也面临贫富差距、毒品犯罪和治安等社会问题。总体而言，墨西哥是一个文化多元、历史深厚且充满活力的国家。'
        }, {
            label: '日本',
            weight: 0.0149,
            backgroundColor: '#FFFFFF',
            labelColor: '#BC002D',
            desc: '日本是世界人口排名靠前的发达国家，以高科技、长寿社会与独特文化闻名。东京是全球最大都市圈之一，拥有富士山、京都古都、动漫、寿司、樱花与温泉等标志性元素。经济曾长期位居世界第二，现为第三大经济体，汽车（丰田、本田）、电子（索尼、任天堂）、机器人与精密制造领先全球。但面临严重老龄化、超低生育率、劳动力短缺与债务高企挑战。近年来推动数字化转型与防灾科技，同时文化输出（J-POP、游戏、料理）持续影响世界。地震多发使其建筑与应急系统高度发达。'
        }, {
            label: '埃及',
            weight: 0.0144,
            backgroundColor: '#CE1126',
            labelColor: '#000000',
            desc: '埃及是阿拉伯世界人口大国，尼罗河孕育了古老的法老文明，金字塔、狮身人面像、卢克索神庙是世界文化遗产。开罗是中东与非洲最大城市之一。苏伊士运河为全球贸易命脉，旅游、石油、天然气与农业（棉花）是经济支柱。近年来人口快速增长带来就业与水资源压力，政治经历多次动荡后趋于稳定。伊斯兰文化为主，科普特基督教少数派并存。年轻人口占比高，电影与音乐产业在中东颇具影响力，但贫困与失业仍是挑战。'
        }, {
            label: '菲律宾',
            weight: 0.0142,
            backgroundColor: '#0038A8',
            labelColor: '#FFFF00',
            desc: '菲律宾是东南亚人口大国，由7000多个岛屿组成，马尼拉大都会区人口密集。热带海岛风光、白色沙滩、潜水胜地（如巴拉望）吸引大量游客。海外劳工汇款是经济重要来源，服务业（BPO呼叫中心）与电子产品组装发达。英语为官方语言之一，天主教信仰占主导，节日庆典丰富多彩（如圣婴节）。但面临台风、地震频发、自然灾害多、贫富差距大与南海领土争端等问题。年轻人口活力强，近年来数字经济与旅游业复苏迅速。'
        }, {
            label: '刚果',
            weight: 0.0137,
            backgroundColor: '#007FFF',
            labelColor: '#FFD700',
            desc: '刚果民主共和国（简称刚果（金））是中非面积最大、人口快速增长的国家，拥有刚果盆地广阔热带雨林与丰富矿产（钴、铜、钻石、钽）。金沙萨是非洲人口最多城市之一。但长期内战、武装冲突、腐败与基础设施极度落后导致贫困与饥饿问题严重。矿业出口是经济命脉，却常伴随资源诅咒与童工问题。文化多元，拥有数百个民族与语言，音乐（刚果伦巴）影响整个非洲。国际援助与维和行动持续存在，未来发展潜力大但稳定是最大挑战。'
        }, {
            label: '越南',
            weight: 0.0123,
            backgroundColor: '#DA251D',
            labelColor: '#FFFF00',
            desc: '越南是东南亚人口大国，近年来经济高速增长，被称为“亚洲新虎”。河内与胡志明市为两大中心，下龙湾、会安古镇、岘港海滩是旅游亮点。改革开放（Đổi Mới）后吸引大量外资，成为手机、服装、鞋类与电子产品制造基地。中国邻近带来供应链优势。咖啡、稻米与水产出口全球领先。文化融合儒家、佛教与法国殖民影响，街头美食（河粉、春卷）风靡世界。但面临环境污染、南海争端、老龄化起步与收入差距扩大等问题。年轻、勤奋人口是最大优势。'
        }, {
            label: '伊朗',
            weight: 0.0112,
            backgroundColor: '#239F40',
            labelColor: '#FFFFFF',
            desc: '伊朗是西亚人口大国，波斯文明古国，拥有伊斯法罕清真寺、设拉子古诗与波斯地毯等文化瑰宝。德黑兰为政治经济中心。石油与天然气储量全球前列，是OPEC重要成员。但长期受国际制裁影响，经济面临通胀与货币贬值压力。什叶派伊斯兰为国教，波斯语为主，文学（鲁米、哈菲兹）与电影艺术享誉国际。年轻人口占比高，教育水平较高，但社会限制与妇女权益议题常引发讨论。核问题与地区影响力仍是国际焦点。'
        }, {
            label: '土耳其',
            weight: 0.0106,
            backgroundColor: '#E30A13',
            labelColor: '#FFFFFF',
            desc: '土耳其横跨欧亚大陆，伊斯坦布尔是连接东西方的千年古都，拥有圣索菲亚大教堂、蓝色清真寺与热气球卡帕多奇亚。曾经的奥斯曼帝国中心，现为地区军事与经济强国。纺织、汽车、旅游与农产品出口发达。近年经济经历高通胀与货币危机，但地缘位置战略性强（博斯普鲁斯海峡、北约成员）。文化融合伊斯兰、拜占庭与世俗传统，烤肉（ döner）、土耳其浴与甜点全球知名。埃尔多安长期执政带来政治极化与地震重建挑战。'
        }, {
            label: '德国',
            weight: 0.0102,
            backgroundColor: '#FF0000',
            labelColor: '#FFCC00',
            desc: '德国是欧洲经济最强国，制造业（汽车：奔驰、宝马、大众；机械、化工）全球领先。柏林、慕尼黑、汉堡为主要城市，啤酒节、新天鹅堡与古典音乐（贝多芬、巴赫）是文化符号。欧盟核心成员，欧元区支柱。但面临能源转型（弃核弃煤）、老龄化、劳动力短缺与俄乌冲突后能源危机。严谨、高效与环保意识强，高等教育与职业教育体系世界顶尖。近年来移民增加带来多元文化，同时右翼势力抬头。生活水平高，社会福利完善。'
        }, {
            label: '泰国',
            weight: 0.0087,
            backgroundColor: '#ED1C24',
            labelColor: '#FFFFFF',
            desc: '泰国是东南亚旅游大国，曼谷大皇宫、芭提雅、清迈与普吉岛海滩闻名全球。佛教为国教，微笑之国形象深入人心。农业（稻米、水果）、旅游、汽车组装与电子业是经济支柱。曼谷是区域交通枢纽。近年政治动荡频繁（政变与抗议），但经济韧性强。泰式按摩、泰拳、冬阴功汤与街头美食享誉世界。年轻人口减少，老龄化初现，气候变化与洪水是长期威胁。君主立宪制下，王室地位崇高。'
        }, {
            label: '坦桑尼亚',
            weight: 0.0086,
            backgroundColor: '#00A550',
            labelColor: '#0000FF',
            desc: '坦桑尼亚位于东非，拥有乞力马扎罗山、塞伦盖蒂大草原与桑给巴尔岛，是野生动物迁徙与 safari 旅游天堂。达累斯萨拉姆为经济中心，桑给巴尔有阿拉伯与斯瓦希里文化融合。咖啡、腰果、黄金与天然气是主要出口。人口快速增长，基督教与伊斯兰教并存。近年基础设施（标准轨铁路、港口）投资加大，但贫困率高、教育与医疗资源不足。气候变化影响农业与湖泊水位。政治相对稳定，年轻人口为发展提供动力。'
        }, {
            label: '英国',
            weight: 0.0084,
            backgroundColor: '#00247D',
            labelColor: '#FFFFFF',
            desc: '英国是老牌发达国家，伦敦是全球金融中心之一。拥有大本钟、白金汉宫、莎士比亚故乡与英超联赛等文化符号。工业革命发源地，现以服务业、金融、科技与创意产业（音乐、时尚、影视）为主。脱欧后贸易与移民政策调整，面临经济增长放缓与北爱问题。君主立宪制，英女王/国王象征国家团结。下午茶、鱼薯条、足球与摇滚乐影响全球。高等教育（牛津、剑桥）顶尖，但老龄化与医疗系统压力增大。'
        }, {
            label: '法国',
            weight: 0.0081,
            backgroundColor: '#002395',
            labelColor: '#FFFFFF',
            desc: '法国是欧洲文化与旅游强国，巴黎埃菲尔铁塔、卢浮宫、凡尔赛宫与普罗旺斯薰衣草田举世闻名。时尚（香奈儿、迪奥）、美食（米其林、红酒、鹅肝）、电影与艺术领先全球。核电占比高，空客与高铁技术先进。欧盟创始国之一，外交影响力强。但近年黄马甲运动、通胀与养老金改革引发社会抗议。移民多元带来文化融合，也伴随整合挑战。浪漫、优雅与罢工文化并存，生活品质高。'
        }, {
            label: '南非',
            weight: 0.0079,
            backgroundColor: '#007A4D',
            labelColor: '#FFFFFF',
            desc: '南非位于非洲最南端，拥有桌山、克鲁格国家公园与多元种族文化（祖鲁、科萨、阿非利卡等）。开普敦与约翰内斯堡为主要城市。矿产（黄金、铂金、钻石）丰富，非洲最发达经济体之一。但失业率高、贫富差距极大、电力短缺（load shedding）与犯罪问题是长期顽疾。曼德拉“彩虹之国”理想下种族和解持续推进。葡萄酒、足球（2010世界杯）与音乐（Kwaito）全球知名。气候多样，从地中海到沙漠皆有。'
        }, {
            label: '意大利',
            weight: 0.0072,
            backgroundColor: '#009246',
            labelColor: '#FFFFFF',
            desc: '意大利是文艺复兴发源地，罗马斗兽场、比萨斜塔、威尼斯水城与米兰时尚周闻名。美食（意面、披萨、意式咖啡、帕玛森奶酪）征服世界。汽车（法拉利、兰博基尼）、奢侈品（古驰、普拉达）与机械制造实力强。旅游业极发达。但经济南北差距大，债务高企，老龄化严重，生育率全球最低之一。家族企业众多，生活节奏悠闲，重视家庭与美食。梵蒂冈位于境内，教皇影响力全球。'
        }, {
            label: '肯尼亚',
            weight: 0.0070,
            backgroundColor: '#006600',
            labelColor: '#FF0000',
            desc: '肯尼亚位于东非，是“非洲Safari之都”，马赛马拉国家保护区见证角马大迁徙。内罗毕是区域科技与金融中心（“非洲硅谷”）。茶叶、咖啡、花卉与旅游是主要外汇来源。人口年轻化迅速，移动支付（M-Pesa）全球领先创新。但干旱、饥荒、部落冲突与腐败问题仍存。斯瓦希里语与英语并用，跑步运动（马拉松）世界顶尖。近年“一带一路”项目增多，蒙内铁路改善交通。政治多党竞争活跃。'
        }, {
            label: '缅甸',
            weight: 0.0067,
            backgroundColor: '#FECB00',
            labelColor: '#FF0000',
            desc: '缅甸（Myanmar）位于东南亚，拥有伊洛瓦底江、仰光大金塔与古老蒲甘佛塔群，是佛教文化重镇。人口约5700万，主要民族为缅族。经济以农业（稻米）、天然气、玉石与服装加工为主，但长期受内战、2021年后政局动荡与国际制裁影响，经济增长缓慢，贫困与通胀严重。仰光与曼德勒为主要城市，传统长颈族、傣族水灯节与僧侣文化独特。近年来冲突导致人道危机与难民外流，基础设施落后，旅游潜力大（若稳定可媲美泰国）。年轻人口占比高，但教育与医疗资源匮乏。'
        }, {
            label: '哥伦比亚',
            weight: 0.0065,
            backgroundColor: '#FFCC00',
            labelColor: '#003087',
            desc: '哥伦比亚位于南美西北，拥有安第斯山脉、亚马逊雨林与加勒比海岸。波哥大、麦德林与卡塔赫纳为主要城市。咖啡（世界顶级产地）、鲜花、石油与绿宝石出口重要。曾受毒品暴力与游击队困扰，近年和平进程推进，安全改善，旅游业爆发（咖啡三角区、失落之城）。拉丁文化热情，莎莎舞、cumbia音乐与节日热闹。但仍面临不平等、非法采矿与气候变化（洪水、干旱）挑战。生物多样性全球前列，咖啡文化与街头艺术（波哥大涂鸦）闻名国际。'
        }, {
            label: '韩国',
            weight: 0.0063,
            backgroundColor: '#FFFFFF',
            labelColor: '#CD2E3A',
            desc: '韩国是东亚发达国家，首尔为高科技与流行文化中心。K-POP（BTS、BLACKPINK）、韩剧、韩食（泡菜、石锅拌饭）与美容产业席卷全球，文化软实力极强。半导体（三星）、汽车（现代）、造船与游戏产业领先世界。经济高度外向，但面临老龄化极快、生育率全球最低、房价高企与朝韩紧张问题。教育竞争激烈，大学入学率高。韩屋、济州岛与传统韩服并存现代摩天大楼。近年来“韩流”持续输出，电竞与美妆出口强劲。'
        }, {
            label: '苏丹',
            weight: 0.0063,
            backgroundColor: '#FF0000',
            labelColor: '#FFFFFF',
            desc: '苏丹位于东北非，尼罗河贯穿，拥有麦罗埃金字塔与红海海岸。喀土穆为首都。石油曾是经济支柱，但南苏丹独立后资源锐减。农业（棉花、阿拉伯胶）、黄金与畜牧重要。近年内战与政变频发（2023年后冲突加剧），导致严重饥荒、人道灾难与数百万流离失所。伊斯兰文化为主，努比亚与阿拉伯传统融合。气候炎热干燥，沙漠化严重。年轻人口快速增长，但教育、医疗与基础设施极度落后，国际援助依赖高。'
        }, {
            label: '乌干达',
            weight: 0.0062,
            backgroundColor: '#FF0000',
            labelColor: '#000000',
            desc: '乌干达位于东非，维多利亚湖畔，有“非洲珍珠”之称。坎帕拉为首都。拥有大猩猩保护区（Bwindi）、尼罗河源头与丰富野生动物。咖啡、茶叶与渔业出口为主，近年石油开发启动。人口年轻、增长迅猛，基督教与伊斯兰并存。文化多元，传统鼓乐与舞蹈活跃。但面临贫困、高生育率、腐败与疟疾等健康挑战。基础设施改善中（中国援建公路），旅游与农业潜力大。政治长期由穆塞韦尼主导。'
        }, {
            label: '西班牙',
            weight: 0.0058,
            backgroundColor: '#AA151B',
            labelColor: '#F1BF00',
            desc: '西班牙位于伊比利亚半岛，拥有马德里、巴塞罗那与塞维利亚等历史名城。高迪建筑（圣家堂）、弗拉门戈舞、斗牛与tapas美食闻名全球。旅游业极发达（地中海海岸、岛屿），橄榄油、葡萄酒与火腿出口强劲。欧盟与欧元区成员，经济以服务业、汽车与可再生能源为主。但面临加泰罗尼亚独立争议、高失业（青年尤甚）与老龄化问题。斗牛文化渐受争议，足球（皇马、巴萨）热情高涨。生活方式悠闲，午休传统仍存。'
        }, {
            label: '阿尔及利亚',
            weight: 0.0058,
            backgroundColor: '#006233',
            labelColor: '#FFFFFF',
            desc: '阿尔及利亚是非洲面积最大国家，北部地中海沿岸，南部撒哈拉沙漠。阿尔及尔为首都。石油与天然气出口占经济大头，是欧盟重要能源供应国。阿拉伯-柏柏尔文化融合，传统音乐Raï全球知名。独立战争历史深厚，法语仍广泛使用。近年青年失业高、社会抗议频发（Hirak运动），政治趋保守。旅游潜力大（罗马遗迹、撒哈拉沙漠游），但安全与基础设施限制发展。人口年轻，城市化加速。'
        }, {
            label: '伊拉克',
            weight: 0.0057,
            backgroundColor: '#CE1126',
            labelColor: '#FFFFFF',
            desc: '伊拉克位于中东，两河流域孕育古代美索不达米亚文明（巴比伦、乌尔）。巴格达为历史文化中心。石油储量全球前列，出口依赖能源。什叶派占多数，逊尼派与库尔德族并存。2003年后长期冲突、ISIS肆虐导致重建艰难，腐败与宗派矛盾持续。但近年安全改善，旅游潜力恢复（巴格达、库尔德地区）。阿拉伯美食（烤肉、米饭）、诗歌传统丰富。年轻人口多，但教育与就业压力大，气候干旱加剧水资源危机。'
        }, {
            label: '阿根廷',
            weight: 0.0056,
            backgroundColor: '#74ACDF',
            labelColor: '#FFFFFF',
            desc: '阿根廷位于南美南部，拥有布宜诺斯艾利斯、探戈舞、足球（马拉多纳、梅西）与巴塔哥尼亚冰川。潘帕斯草原牛肉与葡萄酒（马尔贝克）闻名全球。农业（大豆、玉米）与畜牧出口大国。但经济长期不稳，高通胀、债务违约与货币贬值反复出现。近年政治左右摇摆，贫困率波动。文化欧洲移民影响深（意大利、西班牙裔多），文学（博尔赫斯）与电影发达。自然景观多样，从安第斯到伊瓜苏瀑布。'
        }, {
            label: '阿富汗',
            weight: 0.0053,
            backgroundColor: '#000000',
            labelColor: '#FFFFFF',
            desc: '阿富汗位于中亚与南亚交界，喀布尔为首都。兴都库什山脉贯穿，拥有古老佛教遗迹（巴米扬大佛曾存）。普什图、塔吉克等民族多元，伊斯兰文化为主。经济极度依赖农业（石榴、杏仁）、地毯与援助。2021年后塔利班重新掌权，女性教育与工作受限，人道危机严重，饥饿与难民问题突出。矿产（铜、锂）潜力大，但基础设施破坏殆尽。传统风筝节与诗歌文化仍存，年轻人口占比极高。'
        }, {
            label: '也门',
            weight: 0.0051,
            backgroundColor: '#CE1126',
            labelColor: '#FFFFFF',
            desc: '也门位于阿拉伯半岛西南，萨那与亚丁为历史城市。拥有索科特拉岛独特生物多样性与古代香料贸易遗产。咖啡（摩卡）原产地。长期内战（胡塞武装与政府冲突）导致全球最严重人道危机，饥饿、霍乱与基础设施崩溃。石油与天然气曾是经济支柱，现几近停滞。阿拉伯文化浓厚，qat咀嚼习惯普遍。地理位置战略（曼德海峡），但冲突使发展停滞。人口年轻，重建前景遥远。'
        }, {
            label: '加拿大',
            weight: 0.0049,
            backgroundColor: '#FF0000',
            labelColor: '#FFFFFF',
            desc: '加拿大是世界第二大面积国家，多伦多、温哥华与蒙特利尔为多元文化中心。枫叶、国旗象征，枫糖浆、冰球与极光闻名。自然资源丰富（石油、木材、矿产），经济发达，服务业与科技占比高。移民国家，多元文化政策成功。但面临原住民权益、气候变化（北极融化）与房价高企问题。魁北克法语区独特，枫叶之旅与落基山脉吸引游客。生活水平高，医疗与教育福利完善，冬季严寒但户外活动丰富。'
        }, {
            label: '安哥拉',
            weight: 0.0047,
            backgroundColor: '#FF0000',
            labelColor: '#000000',
            desc: '安哥拉位于非洲西南，罗安达为首都。石油与钻石出口占经济绝大部分，曾因内战（至2002年）极度贫困。近年重建加速，基础设施改善。中国投资多（公路、铁路）。葡萄牙语国家，足球与音乐（semba、kizomba）文化活跃。生物多样性丰富（Okavango三角洲部分）。但腐败、贫富差距与油价波动导致经济脆弱。人口年轻，城市化快速，干旱与粮食安全仍是挑战。'
        }, {
            label: '乌克兰',
            weight: 0.0047,
            backgroundColor: '#005BBB',
            labelColor: '#FFD700',
            desc: '乌克兰位于东欧，黑海沿岸，基辅为千年古都（圣索菲亚大教堂）。小麦、玉米与向日葵出口全球前列（“欧洲粮仓”）。工业基础强（钢铁、机械）。2022年后俄乌冲突持续，东部战损严重，经济受重创，数百万难民外流。但国民团结增强，欧盟候选国地位带来希望。文化以东正教、刺绣与文学（舍甫琴科）为特色。切尔诺贝利遗址与喀尔巴阡山脉旅游潜力存。粮食安全对全球影响大。'
        }, {
            label: '摩洛哥',
            weight: 0.0047,
            backgroundColor: '#C1272D',
            labelColor: '#006233',
            desc: '摩洛哥位于北非，卡萨布兰卡、 Marrakech 与非斯为文化重镇。拥有撒哈拉沙漠、阿特拉斯山脉与地中海海岸。旅游业发达（沙漠露营、里亚德客栈），皮革、手工艺与香料市场闻名。磷酸盐出口全球第一，汽车与航空业新兴。君主立宪制，伊斯兰文化与柏柏尔传统融合。近年基础设施进步（高铁），但城乡差距与青年失业仍存。美食（塔吉锅、库斯库斯）与电影节吸引国际关注。'
        }, {
            label: '波兰',
            weight: 0.0046,
            backgroundColor: '#FFFFFF',
            labelColor: '#DC143C',
            desc: '波兰位于中欧，华沙、克拉科夫与格但斯克历史悠久。二战与共产时期后转型成功，现为欧盟经济增速较快国家。制造业（汽车、家电）、IT外包与煤炭仍重要。文化以天主教、肖邦音乐与饺子（pierogi）为代表。近年右翼政府推动保守政策，但司法争议多。乌克兰难民接收量大，显示人道担当。老龄化初现，华沙股市活跃。波罗的海海滩与喀尔巴阡山旅游资源丰富。'
        }, {
            label: '乌兹别克斯坦',
            weight: 0.0045,
            backgroundColor: '#1EB53A',
            labelColor: '#FFFFFF',
            desc: '乌兹别克斯坦位于中亚，撒马尔罕、布哈拉与希瓦为丝绸之路古城，蓝色清真寺与马赛克建筑闻名。塔什干为首都。棉花（世界前列）、黄金、天然气与水果出口重要。近年改革开放，旅游业快速增长（签证简化）。伊斯兰文化为主，传统丝绸与地毯手工艺精美。但水资源短缺（咸海干涸）与威权政治遗留问题仍存。人口年轻，教育水平较高，俄语仍通用。'
        }, {
            label: '马来西亚',
            weight: 0.0044,
            backgroundColor: '#010066',
            labelColor: '#FF0000',
            desc: '马来西亚位于东南亚，吉隆坡双子塔与槟城美食街闻名。多民族（马来、华裔、印度裔），伊斯兰为国教但多元包容。棕榈油、石油、电子与半导体出口全球前列。旅游亮点包括沙巴海岛、婆罗洲雨林与兰卡威。近年政治稳定，经济中等收入向高收入转型。但种族政策与腐败议题偶现。美食天堂（娘惹菜、沙爹、laksa），热带气候，全年适合旅游。'
        }, {
            label: '莫桑比克',
            weight: 0.0043,
            backgroundColor: '#009739',
            labelColor: '#000000',
            desc: '莫桑比克位于非洲东南，拥有印度洋漫长海岸线与马普托湾。马普托为首都。天然气储量巨大（全球前列），近年成为能源出口新兴国。农业（腰果、糖、棉花）与渔业传统重要。葡萄牙语国家，文化融合非洲与欧洲元素，音乐（marrabenta）与舞蹈活跃。但北部长期受伊斯兰极端武装冲突困扰，安全与发展受限。贫困率高，基础设施落后，中国投资的公路、港口与铁路项目显著改善交通。旅游潜力大（巴扎鲁托群岛、Gorongosa国家公园），但自然灾害（ cyclones ）频发。人口年轻，增长迅速。'
        }, {
            label: '加纳',
            weight: 0.0043,
            backgroundColor: '#006B3F',
            labelColor: '#FCD116',
            desc: '加纳位于西非，几内亚湾沿岸，阿克拉为首都。曾是英国殖民地“黄金海岸”，独立后非洲民主典范。黄金、可可、石油与木材出口重要，可可是世界第二大产地。文化丰富，阿散蒂王国传统、Kente布与高life音乐闻名。英语为官方语言，基督教为主。近年经济稳定增长，但腐败、电力不稳与青年失业问题仍存。旅游亮点包括奴隶堡垒（历史遗迹）、莫利国家公园与海滩。政治多党轮替和平，诺贝尔和平奖得主科菲·安南出身于此。人口年轻，创业氛围活跃。'
        }, {
            label: '秘鲁',
            weight: 0.0042,
            backgroundColor: '#D91023',
            labelColor: '#FFFFFF',
            desc: '秘鲁位于南美安第斯山脉，拥有马丘比丘、纳斯卡线与亚马逊雨林，是印加文明核心区。利马为首都与美食之都（ceviche、pisco sour）。铜、黄金、银矿出口全球前列，渔业（秘鲁鳀鱼）发达。文化多元，原住民（克丘亚、艾马拉）与西班牙影响融合。近年经济增长较快，但贫富差距大，安第斯高地与沿海差异明显。政治动荡频发（总统频繁更迭）。旅游业支柱（古迹、自然景观），但非法采矿与森林砍伐威胁环境。生物多样性极高。'
        }, {
            label: '沙特阿拉伯',
            weight: 0.0042,
            backgroundColor: '#006C35',
            labelColor: '#FFFFFF',
            desc: '沙特阿拉伯位于阿拉伯半岛，伊斯兰教两大圣地（麦加、麦地那）所在地，利雅得为首都。石油储量与产量全球前列，长期依赖能源出口。“2030愿景”推动经济多元化，发展旅游、科技与娱乐业（NEOM新城、利雅得季）。文化严格遵循瓦哈比派伊斯兰教规，但近年女性开车、电影院开放等改革显著。沙漠景观、红海潜水与古老遗址吸引游客。君主制，石油财富支撑高福利，但人口年轻化带来就业压力。气候极热，斋月与朝觐是全球焦点。'
        }, {
            label: '马达加斯加',
            weight: 0.0040,
            backgroundColor: '#FC3D32',
            labelColor: '#FFFFFF',
            desc: '马达加斯加是世界第四大岛，位于印度洋东南，拥有独特生物多样性（狐猴、旅行者树、90%特有物种）。塔那那利佛为首都。经济以农业（香草、世界主要产地）、纺织与旅游为主。法语与马达加斯加语并用，文化融合东南亚、非洲与欧洲元素。长期贫困、基础设施落后与政治不稳困扰发展。近年干旱、蝗灾与气候变化加剧粮食危机。旅游亮点包括国家公园、阿瓦隆半岛与海滩，但交通不便。人口年轻，增长快，潜力待挖掘。'
        }, {
            label: '科特迪瓦',
            weight: 0.0040,
            backgroundColor: '#FF8C00',
            labelColor: '#FFFFFF',
            desc: '科特迪瓦位于西非，几内亚湾沿岸，阿比让为经济中心。世界最大可可生产国，可可与咖啡出口支柱。法语国家，经济在西非相对发达，港口与金融业活跃。文化多元，传统面具、音乐（Zouglou）与足球（德罗巴时代）闻名。近年政治稳定后经济增长强劲，但城乡差距、腐败与青年失业问题仍存。曾经历内战与选举冲突，现趋和平。热带气候，滨海旅游潜力大（阿萨西海滩）。人口年轻，城市化加速。'
        }, {
            label: '喀麦隆',
            weight: 0.0036,
            backgroundColor: '#007A5E',
            labelColor: '#FFD700',
            desc: '喀麦隆位于中非与西非交界，有“非洲缩影”之称（热带雨林、萨瓦纳、高原、火山）。雅温得为政治首都，双语国家（法语+英语）。石油、木材、可可、咖啡出口重要。文化极其多元，超过250个民族，传统音乐与舞蹈丰富。但英语区分离主义冲突持续，安全形势严峻。旅游资源丰富（乞拉山、Waza国家公园），但基础设施与腐败问题限制发展。人口年轻，增长迅速，足球（非洲杯冠军）是国民热情所在。'
        }, {
            label: '尼泊尔',
            weight: 0.0036,
            backgroundColor: '#DC143C',
            labelColor: '#003893',
            desc: '尼泊尔位于喜马拉雅山南麓，加德满都为首都。拥有世界最高峰珠穆朗玛峰，登山与徒步旅游（安纳普尔纳、朗塘）全球闻名。印度教与佛教并存，帕坦与博卡拉古迹众多。经济依赖农业、侨汇与旅游，近年水电开发潜力大。但地震频发（2015大震后重建中），贫困、基础设施落后与政治不稳长期存在。文化丰富，节日（排灯节、洒红节）热闹。人口年轻，登山向导与手工艺传统强。'
        }, {
            label: '委内瑞拉',
            weight: 0.0035,
            backgroundColor: '#00247D',
            labelColor: '#FFD700',
            desc: '委内瑞拉位于南美北部，拥有安第斯山、亚马逊雨林与加勒比海滩。加拉加斯为首都。石油储量全球前列，但经济严重依赖能源，近年 hyperinflation、通货膨胀与制裁导致崩溃，数百万难民外流。人道危机严重，食品与药品短缺。文化热情，拉丁音乐、棒球与美女选美传统强。自然景观壮丽（天使瀑布、世界最高瀑布），但安全与政治动荡限制旅游。近年试图经济多元化，但挑战巨大。'
        }, {
            label: '尼日尔',
            weight: 0.0034,
            backgroundColor: '#0E9549',
            labelColor: '#FFFFFF',
            desc: '尼日尔位于西非萨赫勒地带，尼亚美为首都。撒哈拉沙漠占国土大部，气候干旱。铀矿出口重要，畜牧业与小米农业为主。人口增长极快，全球生育率最高之一，贫困与饥荒频发。伊斯兰文化为主，图阿雷格与豪萨族传统丰富。近年极端武装（博科圣地分支）与跨境冲突威胁安全。国际援助依赖高，教育与医疗资源极度匮乏。尼日尔河谷农业潜力存，但气候变化加剧沙漠化。'
        }, {
            label: '澳大利亚',
            weight: 0.0033,
            backgroundColor: '#00008B',
            labelColor: '#FFFFFF',
            desc: '澳大利亚是世界最小大陆，国家面积广大，悉尼歌剧院、墨尔本与大堡礁是标志。经济发达，矿产（铁矿、煤炭、锂）、农业与服务业强劲。移民多元，英语国家，生活水平高。原住民文化（梦幻时代、飞去来器）受重视。自然景观多样，从沙漠到热带雨林，考拉、袋鼠与鸭嘴兽独特。近年面临气候变化（ bushfire、洪水 ）、房价高企与原住民权益议题。体育（澳网、橄榄球）热情高，教育与医疗体系优秀。'
        }, {
            label: '朝鲜',
            weight: 0.0032,
            backgroundColor: '#024FA2',
            labelColor: '#FF0000',
            desc: '朝鲜（北朝鲜）位于朝鲜半岛北部，平壤为首都。实行高度集中的社会主义体制，金氏家族三代领导。经济以重工业、农业与军工为主，但长期受制裁与自然灾害影响，粮食短缺常见。核武器与导弹开发是国际焦点。文化强调主体思想，群众表演（阿里郎）与体操闻名。信息封闭，互联网极有限，旅游严格管控（主要团体游）。人口相对均质，韩语使用，教育与医疗免费但质量受限。近年尝试经济特区与对外有限开放。'
        }, {
            label: '叙利亚',
            weight: 0.0031,
            backgroundColor: '#CE1126',
            labelColor: '#FFFFFF',
            desc: '叙利亚位于中东，拥有大马士革（世界最古老持续居住城市）、阿勒颇古城与帕尔米拉遗迹。内战（2011年起）造成毁灭性破坏，数百万难民外流，基础设施崩溃。经济严重萎缩，依赖农业与石油，曾是中东重要国家。阿拉伯文化为主，美食（鹰嘴豆泥、烤肉）丰富。宗教多元（逊尼、阿拉维、基督教）。近年冲突趋缓，但重建遥遥无期，制裁与分裂持续。历史底蕴深厚，若和平可恢复旅游与文化影响力。'
        }, {
            label: '马里',
            weight: 0.0031,
            backgroundColor: '#009E60',
            labelColor: '#FFD700',
            desc: '马里位于西非萨赫勒，廷巴克图与杰内古城曾是中世纪伊斯兰学术中心。巴马科为首都。棉花与黄金出口重要，尼日尔河灌溉农业。文化以曼丁戈族传统、狗on音乐闻名。近年北部极端武装与图阿雷格叛乱导致安全恶化，政变频发。贫困率高，教育与医疗匮乏，气候干旱与沙漠化严重。人口年轻，增长快。国际维和部队长期存在，粮食安全脆弱。传统手工艺（泥建筑）独特。'
        }, {
            label: '布基纳法索',
            weight: 0.0029,
            backgroundColor: '#009E49',
            labelColor: '#EF2B2D',
            desc: '布基纳法索位于西非内陆，瓦加杜古为首都。“非洲好莱坞”电影节（FESPACO）闻名。棉花出口全球前列，黄金开采增长。法语国家，文化多元，莫西王国传统与面具舞蹈丰富。近年萨赫勒地区极端武装袭击频发，安全恶化，数百万境内流离失所。贫困与饥荒问题严重，气候变化加剧干旱。音乐（balafon）与手工纺织发达。人口年轻，政治不稳（多次政变）。国际援助依赖高。'
        }, {
            label: '斯里兰卡',
            weight: 0.0028,
            backgroundColor: '#006A4E',
            labelColor: '#FF0000',
            desc: '斯里兰卡位于印度洋，科伦坡为商业中心。锡兰红茶、宝石与椰子出口传统强。佛教为主，康提佛牙寺与古城波隆纳鲁沃是世界遗产。海滩（南部）、茶园与野生动物（雅拉国家公园）吸引游客。近年经济危机（2022年破产级债务违约）导致燃料、食品短缺与抗议。旅游与侨汇恢复中。文化融合僧伽罗、泰米尔与穆斯林，咖喱、kottu与节日热闹。政治动荡后趋稳，但债务重组与通胀仍挑战大。'
        }, {
            label: '马拉维',
            weight: 0.0027,
            backgroundColor: '#000000',
            labelColor: '#FF0000',
            desc: '马拉维位于东南非，“温暖之心”国家，马拉维湖（非洲第三大湖）是旅游核心。利隆圭为首都。经济高度依赖农业（烟草、茶叶、糖），贫困率高。人口增长快，年轻化明显。文化以Chewa族传统、Gule Wamkulu舞蹈闻名。近年气候变化导致干旱与洪水，粮食安全脆弱。中国援建的基础设施（公路、议会大楼）显著。政治相对稳定，但腐败与医疗资源不足问题存。湖泊渔业与野生动物观光潜力大。'
        }, {
            label: '赞比亚',
            weight: 0.0027,
            backgroundColor: '#006600',
            labelColor: '#FF0000',
            desc: '赞比亚位于非洲南部，维多利亚瀑布（世界最大瀑布之一）是标志。卢萨卡为首都。铜矿出口全球前列，近年经济多元化尝试。野生动物资源丰富，南卢安瓜国家公园 safari 著名。英语国家，基督教为主。近年电力短缺（水电依赖）与债务压力大。政治和平交接传统好。人口年轻，农业（玉米）与旅游潜力存。但基础设施落后，贫困与艾滋病影响仍重。中国投资的矿业与基建活跃。'
        }, {
            label: '乍得',
            weight: 0.0025,
            backgroundColor: '#002664',
            labelColor: '#FFD700',
            desc: '乍得位于中非，恩贾梅纳为首都。撒哈拉沙漠与乍得湖（严重萎缩）并存。石油出口自2000年代启动，但收益分配不均。伊斯兰与基督教并存，文化多元（萨拉族、阿拉伯族）。长期内战、恐怖主义（博科圣地）与难民危机困扰。贫困率极高，教育与医疗匮乏。气候干旱，饥荒频发。国际维和与援助依赖强。人口年轻，增长迅猛，发展挑战巨大。'
        }, {
            label: '哈萨克斯坦',
            weight: 0.0025,
            backgroundColor: '#00AEEF',
            labelColor: '#000000',
            desc: '哈萨克斯坦是中亚最大国家，阿斯塔纳（现努尔苏丹）与阿拉木图为主要城市。石油、天然气与铀矿出口全球前列。草原辽阔，游牧文化（鹰猎、马奶酒）传统。独立后经济快速增长，“一带一路”重要节点。中国投资多（油气管道、公路）。多民族（哈萨克、俄罗斯、维吾尔等），伊斯兰为主。近年政治改革（纳扎尔巴耶夫后），但威权色彩仍存。冬季严寒，夏季干热，自然资源丰富。'
        }, {
            label: '智利',
            weight: 0.0024,
            backgroundColor: '#0033A0',
            labelColor: '#FFFFFF',
            desc: '智利位于南美西海岸，安第斯山与太平洋之间，圣地亚哥为首都。铜矿产量全球第一，锂资源（盐湖）战略重要。葡萄酒（卡门内尔）、三文鱼与水果出口强。文化欧洲移民影响深，文学（聂鲁达、博尔赫斯影响）发达。自然景观极端多样（阿塔卡马沙漠、巴塔哥尼亚冰川、复活节岛）。近年社会抗议（2019起）推动宪法改革，贫富差距大。地震多发，防灾能力强。生活水平在拉美较高。'
        }, {
            label: '索马里',
            weight: 0.0024,
            backgroundColor: '#4189DD',
            labelColor: '#FFFFFF',
            desc: '索马里位于非洲之角，摩加迪沙为首都。长期内战（1991年后）与海盗问题使国家破碎。氏族社会，伊斯兰教为主。经济依赖畜牧（骆驼、羊）、渔业与侨汇。近年联邦政府重建，但索马里兰与青年党（Al-Shabaab）控制区并存。饥荒与干旱频发，人道危机严重。文化以诗歌、骆驼文化闻名。印度洋海岸线长，渔业潜力大。但安全极不稳定，国际援助与维和持续。人口年轻，增长快。'
        }, {
            label: '塞内加尔',
            weight: 0.0023,
            backgroundColor: '#00853E',
            labelColor: '#FF0000',
            desc: '塞内加尔位于西非最西端，达喀尔为首都。法语国家，文化开放，音乐（Youssou NDour） 与摔跤（ Laamb） 传统强。 花生、 渔业与磷酸盐出口重要。 旅游亮点包括戈雷岛（ 奴隶历史）、 萨卢姆三角洲与沙漠。 政治稳定， 民主交接顺利， 是西非民主标杆。 近年天然气发现带来发展机遇。 但青年失业高， 农村贫困存。 伊斯兰苏菲派影响大， 宗教宽容。 美食（ thieboudienne） 丰富。 '
        }, {
            label: '罗马尼亚',
            weight: 0.0023,
            backgroundColor: '#002B7F',
            labelColor: '#FCD116',
            desc: '罗马尼亚位于东欧，布加勒斯特为首都。喀尔巴阡山脉与特兰西瓦尼亚（德古拉传说）闻名。欧盟与北约成员，经济转型后增长较快，IT外包与汽车制造发达。文化以东正教、民间传说与吸血鬼旅游吸引人。近年腐败治理进步，但农村贫困与人才外流问题存。黑海海滩、布兰城堡与绘彩修道院是旅游亮点。葡萄酒与传统美食（sarmale）受欢迎。人口老龄化初现。'
        }, {
            label: '危地马拉',
            weight: 0.0023,
            backgroundColor: '#4997D0',
            labelColor: '#FFFFFF',
            desc: '危地马拉位于中美洲，拥有玛雅文明遗迹（蒂卡尔）、安蒂瓜古城与火山湖阿蒂特兰。危地马拉城为首都。咖啡、香蕉与糖出口重要。文化多元，原住民（玛雅族）占比高，纺织手工艺精美。近年暴力犯罪与帮派问题严重，但旅游业恢复中。自然灾害（地震、火山）频发。政治腐败与贫富差距大。美食（玉米饼、黑豆）传统。人口年轻，增长较快。'
        }, {
            label: '荷兰',
            weight: 0.0022,
            backgroundColor: '#AE1C28',
            labelColor: '#FFFFFF',
            desc: '荷兰位于西欧，低地国家，阿姆斯特丹运河、风车与郁金香田闻名。经济高度发达，服务业、农业（温室）、港口（鹿特丹欧洲最大）与高科技强。欧盟创始国，开放包容，LGBTQ+权益领先。文化以绘画（伦勃朗、梵高）、奶酪与木鞋传统。近年住房危机、气候变化（海平面上升）与农业氮排放争议大。自行车文化、奶牛与运河生活方式独特。生活品质高，福利完善。'
        }, {
            label: '厄瓜多尔',
            weight: 0.0022,
            backgroundColor: '#FFFF00',
            labelColor: '#0000FF',
            desc: '厄瓜多尔位于南美赤道，基多（世界最高首都）与瓜亚基尔为主要城市。加拉帕戈斯群岛生物多样性全球闻名。石油、香蕉与虾出口重要。文化融合印加、西班牙与非洲元素，音乐与节日热闹。近年美元化经济稳定，但债务与政治动荡（原住民抗议）频发。安第斯高地、亚马逊与太平洋海岸景观多样。旅游潜力大（Quito老城、Otavalo市场）。人口年轻，生物多样性保护压力大。'
        }, {
            label: '柬埔寨',
            weight: 0.0022,
            backgroundColor: '#032EA1',
            labelColor: '#E69B00',
            desc: '柬埔寨位于东南亚，吴哥窟（世界最大宗教建筑群）是标志。金边为首都。经济以旅游、成衣与农业（大米）为主。中国投资活跃（一带一路项目）。高棉文化，佛教为主，传统Apsara舞与美食（amok鱼）闻名。红色高棉历史创伤深重，近年经济快速增长，但贫困与腐败问题存。人口年轻，增长快。西哈努克港与洞里萨湖旅游潜力大。政治长期由洪森家族主导。'
        }, {
            label: '津巴布韦',
            weight: 0.0021,
            backgroundColor: '#006400',
            labelColor: '#FFCE00',
            desc: '津巴布韦位于南部非洲，维多利亚瀑布与大津巴布韦遗迹闻名。哈拉雷为首都。曾是“非洲粮仓”，农业（烟草、玉米）与矿产（铂金、锂）强。但土地改革后经济长期崩溃，hyperinflation历史教训深刻。近年试图恢复，但制裁、腐败与电力短缺仍困扰。野生动物资源丰富（Hwange国家公园）。文化以Shona与Ndebele传统为主。人口年轻，教育水平相对较高。'
        }, {
            label: '几内亚',
            weight: 0.0018,
            backgroundColor: '#CE1126',
            labelColor: '#FCD116',
            desc: '几内亚位于西非，科纳克里为首都。铝土矿储量全球前列，矿业出口主导经济。法语国家，文化多元，音乐（Mandingo）影响西非。近年政变频发（2021后军事执政），政治不稳。贫困率高，埃博拉与疟疾等健康挑战大。水电潜力大（Souapiti大坝）。热带气候，沿海与森林景观。人口年轻，增长快。国际矿业投资活跃，但收益分配不均。'
        }, {
            label: '贝宁',
            weight: 0.0018,
            backgroundColor: '#FCD116',
            labelColor: '#E8112D',
            desc: '贝宁位于西非，波多诺伏为行政首都，科托努为经济中心。沃达教（Voodoo）发源地，影响美洲黑人文化。棉花、腰果与港口转口贸易重要。法语国家，政治相对稳定，民主交接顺利。文化丰富，传统市场与青铜器手工艺。近年旅游尝试（Ouidah奴隶之路）。贫困与青年失业问题存。人口年轻，增长迅速。西非稳定国家之一。'
        }, {
            label: '卢旺达',
            weight: 0.0018,
            backgroundColor: '#20603D',
            labelColor: '#FFD700',
            desc: '卢旺达位于东非，“千丘之国”，基加利为首都。1994年种族大屠杀后重建成功，治安良好，经济增长快。咖啡与茶叶出口，会议旅游与科技中心（“非洲新加坡”愿景）。火山国家公园观山地大猩猩全球闻名。英语、法语与基尼亚卢旺达语并用。女性参政比例高。政治高度集中，发展导向强。但言论自由与邻国关系（刚果）争议存。清洁城市与反腐败形象突出。'
        }, {
            label: '布隆迪',
            weight: 0.0017,
            backgroundColor: '#1EB53A',
            labelColor: '#FFFFFF',
            desc: '布隆迪位于东非，坦噶尼喀湖畔，布琼布拉为首都。人口密度非洲最高，农业（咖啡、茶叶）为主。政治长期动荡，2015年后危机导致难民外流。经济极度贫困，粮食不安全。文化以胡图、图西与特瓦族传统为主，鼓乐闻名。近年试图稳定，但治理挑战大。湖泊渔业与生态旅游潜力存。人口年轻，增长极快，发展压力巨大。'
        }, {
            label: '玻利维亚',
            weight: 0.0015,
            backgroundColor: '#D91023',
            labelColor: '#FFFFFF',
            desc: '玻利维亚位于南美内陆，拉巴斯（世界最高行政首都）与苏克雷并存。乌尤尼盐沼（世界最大盐湖）与的的喀喀湖是自然奇观。矿产（银、锂、锡）与天然气出口重要。原住民（艾马拉、克丘亚）占比高，文化多元。近年左翼政策强调资源国有化。贫困与海拔高（Altiplano）带来健康挑战。旅游潜力大（拉巴斯缆车、亚马逊）。政治极化明显。'
        }, {
            label: '突尼斯',
            weight: 0.0015,
            backgroundColor: '#E7000D',
            labelColor: '#FFFFFF',
            desc: '突尼斯位于北非，地中海沿岸，突尼斯市与迦太基遗迹闻名。阿拉伯-柏柏尔文化，法语广泛。旅游（哈马马特海滩、撒哈拉沙漠）、橄榄油与磷酸盐出口重要。2011年“阿拉伯之春”发源地，民主转型相对成功，但经济停滞、青年失业高。近年政治动荡（2021后总统集权）。美食（couscous、Brik）丰富。气候温和，旅游复苏中。'
        }, {
            label: '南苏丹',
            weight: 0.0015,
            backgroundColor: '#0C8A45',
            labelColor: '#000000',
            desc: '南苏丹是世界最年轻国家（2011独立），朱巴为首都。石油出口为主，但内战与部族冲突持续。基础设施极度落后，饥荒与难民危机严重。人道形势全球最糟之一。基督教与传统信仰为主，文化多元。尼罗河上游，沼泽与野生动物资源丰富。但安全与治理崩溃限制发展。国际援助依赖极高。人口年轻，潜力待和平实现。'
        }, {
            label: '海地',
            weight: 0.0014,
            backgroundColor: '#002B7F',
            labelColor: '#FFFFFF',
            desc: '海地位于加勒比，太子港为首都。首个黑人共和国，克里奥尔文化与伏都教独特。经济极度贫困，农业（咖啡、可可）与侨汇为主。地震（2010）、飓风与政治暴力反复打击。近年帮派控制大片区域，安全崩溃。文化丰富，绘画、音乐（kompa）与美食（griot）。人口年轻，增长快。国际援助长期存在，重建艰难。'
        }, {
            label: '比利时',
            weight: 0.0014,
            backgroundColor: '#000000',
            labelColor: '#FF0000',
            desc: '比利时位于西欧，布鲁塞尔为欧盟与北约总部。佛兰德斯与瓦隆两大语言区，文化多元。巧克力、啤酒（上千种）、华夫饼与薯条闻名全球。经济发达，钻石贸易、制药与港口（安特卫普）强。历史城市（布鲁日、根特）中世纪风貌保存完好。近年政治碎片化，联邦制复杂。生活品质高，福利完善。足球与自行车文化热情。'
        }, {
            label: '约旦',
            weight: 0.0014,
            backgroundColor: '#CE1126',
            labelColor: '#000000',
            desc: '约旦位于中东，安曼为首都。彼得拉古城（玫瑰红城）、死海与瓦迪拉姆沙漠闻名。旅游业支柱，磷酸盐与钾盐出口重要。君主立宪制，哈希姆家族统治。接收大量叙利亚与伊拉克难民，人道负担重。文化阿拉伯传统，热情好客。近年经济压力大，青年失业高。水资源极度短缺。地缘政治中保持相对稳定。'
        }, {
            label: '多米尼加共和国',
            weight: 0.0014,
            backgroundColor: '#002D62',
            labelColor: '#FFFFFF',
            desc: '多米尼加共和国占据伊斯帕尼奥拉岛东半部，圣多明各为美洲最古老欧洲城市。旅游业发达（普拉塔海滩、 Punta Cana ）。雪茄、朗姆酒与咖啡出口闻名。拉丁文化热情，梅伦格与巴恰塔音乐全球流行。近年经济增长快，但贫富差距与飓风风险存。海地邻国，移民议题敏感。棒球是国民运动。'
        }, {
            label: '阿联酋',
            weight: 0.0014,
            backgroundColor: '#00732F',
            labelColor: '#FFFFFF',
            desc: '阿联酋由七酋长国组成，迪拜与阿布扎比为亮点。石油财富转型，迪拜成为全球贸易、旅游与金融中心（哈利法塔、棕榈岛）。阿布扎比文化投资（卢浮宫分馆）。经济高度多元化，免税与零所得税吸引人才。伊斯兰文化与现代奢华并存。外籍人口占多数。气候炎热，空调社会。近年太空计划与绿色能源发展积极。'
        }, {
            label: '洪都拉斯',
            weight: 0.0013,
            backgroundColor: '#0077B6',
            labelColor: '#FFFFFF',
            desc: '洪都拉斯位于中美洲，特古西加尔巴为首都。玛雅遗迹（科潘）与加勒比海滩（罗阿坦岛）旅游亮点。香蕉、咖啡与纺织出口重要。长期受帮派暴力（MS-13）与腐败困扰，安全问题严重。近年移民潮向美国。自然灾害（飓风）频发。文化拉丁热情，足球受欢迎。人口年轻，贫困率高。'
        }, {
            label: '古巴',
            weight: 0.0013,
            backgroundColor: '#002A8F',
            labelColor: '#FFFFFF',
            desc: '古巴位于加勒比，哈瓦那老城与雪茄、朗姆酒、古典汽车闻名。社会主义体制，医疗与教育免费且水平较高。音乐（son、salsa）与舞蹈全球影响。近年经济困难，美元化尝试与旅游开放。但美国制裁与疫情重创旅游。文化丰富，革命历史（切·格瓦拉）符号强。人口老龄化初现。海滩与音乐节吸引游客。'
        }, {
            label: '塔吉克斯坦',
            weight: 0.0013,
            backgroundColor: '#CC0000',
            labelColor: '#F0E68C',
            desc: '塔吉克斯坦位于中亚帕米尔高原，杜尚别为首都。波斯语系国家，文化与伊朗、阿富汗相近。棉花、水电与铝出口重要。山区地形，地震频发。近年中国“一带一路”投资多（公路、隧道）。贫困率高，侨汇依赖强。伊斯兰文化，传统地毯与茶文化。人口年轻，增长快。高山景观（帕米尔公路）旅游潜力大。'
        }, {
            label: '巴布亚新几内亚',
            weight: 0.0013,
            backgroundColor: '#CE1126',
            labelColor: '#000000',
            desc: '巴布亚新几内亚位于大洋洲，拥有800多种语言，文化极其多元。莫尔兹比港为首都。矿产（黄金、铜、液化天然气）出口主导。热带雨林与珊瑚礁生物多样性高。部落传统强， sing-sing 节庆热闹。但部族冲突、犯罪与基础设施落后问题严重。人口年轻，增长快。澳大利亚与中国的投资活跃。'
        }, {
            label: '瑞典',
            weight: 0.0013,
            backgroundColor: '#004B87',
            labelColor: '#FFCD00',
            desc: '瑞典位于北欧，斯德哥尔摩为首都。福利国家典范，创新能力强（Spotify、IKEA、Volvo）。森林覆盖率高，可再生能源领先。文化强调平等、fika（咖啡时光）与极光、仲夏节。近年移民增加带来社会融合挑战。老龄化与高税收并存。设计、音乐（ABBA）与环保意识全球闻名。生活品质极高，冬季漫长。'
        }, {
            label: '捷克',
            weight: 0.0013,
            backgroundColor: '#FFFFFF',
            labelColor: '#11457E',
            desc: '捷克位于中欧，布拉格为欧洲最美首都之一，查理大桥与城堡闻名。啤酒（比尔森、百威）文化深厚。经济转型成功，汽车（斯柯达）、机械与旅游发达。欧盟成员，历史悠久（波希米亚、摩拉维亚）。文化以卡夫卡、德沃夏克为代表。近年政治稳定，但腐败议题偶现。温泉（卡罗维发利）与中世纪小镇旅游资源丰富。'
        }, {
            label: '葡萄牙',
            weight: 0.0013,
            backgroundColor: '#006600',
            labelColor: '#FF0000',
            desc: '葡萄牙位于伊比利亚半岛西端，里斯本与波尔图为主要城市。大航海时代历史，瓷砖建筑与fado音乐闻名。葡萄酒（波特酒）、橄榄油与海鲜美食。旅游业发达（阿尔加维海滩、辛特拉宫殿）。近年经济复苏，黄金签证吸引投资。老龄化严重，青年外流问题。足球（C罗）国民热情。气候温和，生活节奏悠闲。'
        }, {
            label: '阿塞拜疆',
            weight: 0.0013,
            backgroundColor: '#00AEEF',
            labelColor: '#E30A13',
            desc: '阿塞拜疆位于外高加索，巴库为首都，“火焰之国”。石油与天然气出口主导，“一带一路”节点。里海沿岸，现代建筑（火焰塔）与古老火焰庙并存。文化融合突厥、波斯与俄罗斯元素。近年纳卡冲突后领土完整恢复，投资旅游与多元化。伊斯兰为主，但世俗化程度高。巴库老城为世界遗产。人口年轻，经济增长较快。'
        }, {
            label: '希腊',
            weight: 0.0012,
            backgroundColor: '#0C6BCF',
            labelColor: '#FFFFFF',
            desc: '希腊是西方文明发源地，雅典卫城、圣托里尼与米科诺斯岛闻名。旅游业支柱，橄榄油、菲达奶酪与地中海饮食全球影响。债务危机后经济逐步恢复，航运业世界前列。文化遗产丰富（德尔菲、奥林匹亚）。近年移民与难民压力大。老龄化与青年失业问题存。岛屿众多，海滩与历史遗址吸引游客。热情好客，生活方式悠闲。'
        }, {
            label: '多哥',
            weight: 0.0012,
            backgroundColor: '#006A4E',
            labelColor: '#FF0000',
            desc: '多哥位于西非，洛美为首都。港口转口贸易与磷酸盐出口重要。法语国家，文化多元，伏都教与基督教并存。近年基础设施改善（中国援建），经济增长稳定。但贫困与治理问题存。沿海泻湖与北部山区景观。人口年轻，增长快。政治长期由同一家族主导。市场文化活跃，传统纺织与木雕手工艺。'
        }, {
            label: '匈牙利',
            weight: 0.0012,
            backgroundColor: '#477050',
            labelColor: '#FFFFFF',
            desc: '匈牙利位于中欧，布达佩斯（多瑙河明珠）为首都。温泉（盖勒尔特）、鲁比克魔方与匈牙利红酒闻名。经济以汽车制造（奥迪、奔驰工厂）、制药与IT外包为主。欧盟成员，但政治趋保守。文化以民间音乐、辣椒粉与goulash汤为代表。温泉旅游与巴拉顿湖夏季热门。人口老龄化，移民政策严格。历史悠久，民族自豪感强。'
        }, {
            label: '以色列',
            weight: 0.0012,
            backgroundColor: '#0038B8',
            labelColor: '#FFFFFF',
            desc: '以色列位于中东，特拉维夫为经济中心，耶路撒冷宗教圣地。高科技“创业国度”（芯片、网络安全、滴灌技术）。军事实力强，强制兵役。文化融合犹太传统、阿拉伯影响与全球移民。近年经济强劲，但巴以冲突长期未解，安全议题突出。死海、 Masada 与内盖夫沙漠旅游亮点。创新能力全球顶尖，生活成本高。人口年轻，增长稳定。'
        }, {
            label: '奥地利',
            weight: 0.0011,
            backgroundColor: '#EF3E42',
            labelColor: '#FFFFFF',
            desc: '奥地利位于中欧，维也纳为首都，古典音乐（莫扎特、施特劳斯、贝多芬）之都。阿尔卑斯山滑雪胜地（蒂罗尔）。经济发达，旅游、机械与金融强。欧盟成员，中立传统。咖啡馆文化、萨赫蛋糕与华尔兹闻名。近年移民增加，政治右倾趋势。生活品质极高，福利完善。自然景观（湖区、山区）与历史城市并存。'
        }, {
            label: '白俄罗斯',
            weight: 0.0011,
            backgroundColor: '#C81107',
            labelColor: '#009E49',
            desc: '白俄罗斯位于东欧，明斯克为首都。与俄罗斯关系密切，经济依赖能源补贴与制造业（拖拉机、化肥）。农业（马铃薯、乳制品）发达。政治长期由卢卡申科主导，2020年后抗议与国际制裁加剧压力。文化以东正教、斯拉夫传统与马戏团闻名。森林与湖泊覆盖率高，切尔诺贝利辐射影响仍存。人口老龄化，年轻人外流明显。工业基础较强，但创新不足。'
        }
    ],
}


export const wheelPropsEn = {
    name: 'birth',
    isInteractive: false,
    borderColor: '#333',
    borderWidth: 6,
    overlayImage:imgOv,
    pointerAngle: 90,
    lineWidth: 0,
    radius: 0.96,
    itemLabelFont: 'Roboto Slab, sans-serif',
    itemLabelRadius: 0.93,
    itemLabelRadiusMax: 0.3,
    items: [
        {
            label: 'India',
            weight: 0.1776,
            backgroundColor: '#FF9933',
            labelColor: '#FFFFFF',
            desc: 'India is currently the world\'s most populous country, boasting a long history of civilization and diverse culture. As the largest nation in South Asia, it is known for Bollywood cinema, curry cuisine, the Taj Mahal, and the Ganges River. In recent years, its economy has grown rapidly, becoming an important global hub for IT services, pharmaceuticals, and manufacturing. However, it faces challenges including population pressure, wealth disparity, infrastructure limitations, and climate change impacts. Hinduism is the major religion, and the country is linguistically extremely diverse, with English and Hindi widely used. With a high proportion of young people, it is seen as a crucial engine for global economic growth in the coming decades.'
        }, {
            label: 'China',
            weight: 0.1718,
            backgroundColor: '#DE2910',
            labelColor: '#FFFF00',
            desc: 'China is the world\'s second most populous country and the second-largest economy. With five thousand years of continuous civilization, it is symbolized by cultural icons such as the Great Wall, the Forbidden City, the Terracotta Army, and the Spring Festival. After economic reforms and opening up, it achieved a miraculous rise, becoming the "world\'s factory" and a leader in high-speed rail and 5G technology. In recent years, it has emphasized high-quality development, technological innovation, and common prosperity. Currently, it faces challenges including an aging population, declining birth rates, real estate adjustments, and geopolitical frictions. Chinese cuisine, martial arts, calligraphy, and traditional festivals are beloved worldwide.'
        }, {
            label: 'United States',
            weight: 0.0421,
            backgroundColor: '#3C3B6E',
            labelColor: '#FFFFFF',
            desc: 'The United States is the world\'s third most populous country and the leading economic and military power. Known for freedom, diversity, and innovation, its cultural and technological influence is profound through Hollywood, Silicon Valley, the NBA, Coca-Cola, Apple, and more. As an immigrant nation, it boasts global metropolises like New York, Los Angeles, and San Francisco. In recent years, it has faced political polarization, gun issues, racial tensions, debt pressure, and great power competition. Its technological innovation capabilities remain exceptionally strong, and it continues to be a concentration of top-tier universities and entrepreneurial hubs globally.'
        }, {
            label: 'Indonesia',
            weight: 0.0347,
            backgroundColor: '#FF0000',
            labelColor: '#FFFFFF',
            desc: 'Indonesia is the world\'s fourth most populous country and has the largest Muslim population. Comprising thousands of islands, it is famous for Bali tourism, volcanic landscapes, traditional batik, and shadow puppetry. Rich in natural resources (palm oil, nickel, coal), it is the largest economy in Southeast Asia. Its economy has grown steadily in recent years, but challenges include frequent earthquakes and tsunamis, managing religious diversity, inadequate infrastructure, and youth unemployment. Jakarta is the political and economic center, and the government is promoting a plan to relocate the capital.'
        }, {
            label: 'Pakistan',
            weight: 0.0310,
            backgroundColor: '#074684',
            labelColor: '#FFFFFF',
            desc: 'Pakistan is the world\'s fifth most populous country, an Islamic Republic with a long history of Indus Valley civilization. Karachi and Lahore are its major cities; cricket is the national sport, and its cuisine is famous for kebabs and curry. Located in a strategic position (China-Pakistan Economic Corridor), it faces long-term challenges including terrorism, political instability, water scarcity, power shortages, and tense relations with India. With a large young population, textiles and agriculture are economic pillars. Recent opportunities have emerged from the digital economy and CPEC projects.'
        }, {
            label: 'Nigeria',
            weight: 0.0288,
            backgroundColor: '#008751',
            labelColor: '#FFFFFF',
            desc: 'Nigeria is Africa\'s most populous country and its largest economy. Lagos is one of Africa\'s largest cities, and Nollywood leads the world in film production. Rich in oil resources but dependent on this single commodity, the country is plagued by long-standing issues such as corruption, terrorism (Boko Haram), ethnic conflicts, and poor infrastructure. Culturally diverse with over 200 ethnic groups, its music (Afrobeats) and football are highly influential. Its explosive youth population growth holds immense potential but also presents severe challenges.'
        }, {
            label: 'Brazil',
            weight: 0.0258,
            backgroundColor: '#009C3B',
            labelColor: '#FFDF00',
            desc: 'Brazil is the most populous and largest country in South America by area. The Rio Carnival, football (five-time World Cup champion), and the Amazon Rainforest are its icons. It is a major exporter of coffee, sugar, soybeans, and iron ore, boasting the world\'s greatest biodiversity. However, it faces challenges including deforestation, extreme inequality, high crime rates, and political instability. Samba, football, and barbecue culture are globally popular. In recent years, green energy and agricultural technology have developed rapidly.'
        }, {
            label: 'Bangladesh',
            weight: 0.0213,
            backgroundColor: '#006A4E',
            labelColor: '#F42A41',
            desc: 'Bangladesh has an extremely high population density and is the world\'s eighth most populous country. Dhaka is one of the most densely populated cities. It is the world\'s second-largest exporter of ready-made garments, significantly improving poverty conditions. Situated in the low-lying Ganges Delta, it is frequently struck by floods and cyclones. Its culture is influenced by both Hinduism and Islam, and Bengali literature is well-developed (Rabindranath Tagore was born in this region). In recent years, economic growth has been impressive, but climate change, population pressure, and labor rights remain major challenges.'
        }, {
            label: 'Russia',
            weight: 0.0175,
            backgroundColor: '#FFFFFF',
            labelColor: '#DA291C',
            desc: 'Russia is the world\'s largest country by area and ranks ninth in population. Spanning Eurasia, its cities Moscow and St. Petersburg have profound cultural heritage, famous for literature (Tolstoy, Dostoevsky), ballet, and classical music. It is a major energy (oil, gas) exporter and possesses strong military power. In recent years, affected by international sanctions and the conflict in Ukraine, its economy faces challenges. The harsh Siberian climate and vast, sparsely populated territories are long-term characteristics.'
        }, {
            label: 'Ethiopia',
            weight: 0.0164,
            backgroundColor: '#FDEF02',
            labelColor: '#FF0000',
            desc: 'Ethiopia is one of Africa\'s fastest-growing populous nations and the origin of coffee. It possesses the ancient Aksumite civilization and a unique Christian tradition (rock-hewn churches). Addis Ababa hosts the headquarters of the African Union. In recent years, infrastructure development (dams, high-speed rail) has been rapid, but the country has also experienced civil war, famine, and ethnic conflicts. Its economy is primarily agricultural, with coffee and flowers being key exports. Its young population provides potential for future development.'
        }, {
            label: 'Mexico',
            weight: 0.0160,
            backgroundColor: '#006847',
            labelColor: '#FFFFFF',
            desc: 'Mexico is located in southern North America, bordering the United States to the north and Central America to the south. It is an important Latin American country with a population of approximately 130 million. Mexico has a long history, having nurtured ancient civilizations such as the Olmec, Maya, and Aztec, and was colonized by Spain in the 16th century. Economically, Mexico is a newly industrialized country, with significant manufacturing, oil, agriculture, and tourism sectors, closely linked economically and trade-wise with the United States. Meanwhile, Mexico also faces social issues such as wealth disparity, drug-related crime, and security challenges. Overall, Mexico is a culturally diverse, historically rich, and vibrant country.'
        }, {
            label: 'Japan',
            weight: 0.0149,
            backgroundColor: '#FFFFFF',
            labelColor: '#BC002D',
            desc: 'Japan is a developed country with a high world population ranking, renowned for high technology, a long-lived society, and unique culture. Tokyo is one of the world\'s largest metropolitan areas. Iconic elements include Mount Fuji, ancient Kyoto, anime, sushi, cherry blossoms, and hot springs. Its economy was long the world\'s second-largest and is now the third-largest, leading globally in automotive (Toyota, Honda), electronics (Sony, Nintendo), robotics, and precision manufacturing. However, it faces severe challenges: an aging population, extremely low birth rates, labor shortages, and high debt. In recent years, it has promoted digital transformation and disaster prevention technology, while its cultural exports (J-POP, games, cuisine) continue to influence the world. Frequent earthquakes have led to highly developed construction and emergency systems.'
        }, {
            label: 'Egypt',
            weight: 0.0144,
            backgroundColor: '#CE1126',
            labelColor: '#000000',
            desc: 'Egypt is the most populous Arab nation. The Nile River nurtured the ancient Pharaonic civilization, with pyramids, the Sphinx, and Luxor Temple as World Heritage Sites. Cairo is one of the largest cities in the Middle East and Africa. The Suez Canal is a vital global trade artery; tourism, oil, gas, and agriculture (cotton) are economic pillars. In recent years, rapid population growth has brought employment and water resource pressures; after multiple political upheavals, stability has tended. Islamic culture predominates, with a Coptic Christian minority. With a high proportion of young people, its film and music industries are influential in the Middle East, but poverty and unemployment remain challenges.'
        }, {
            label: 'Philippines',
            weight: 0.0142,
            backgroundColor: '#0038A8',
            labelColor: '#FFFF00',
            desc: 'The Philippines is a populous Southeast Asian nation comprising over 7,000 islands; the Metro Manila area is densely populated. Tropical island scenery, white sand beaches, and diving destinations (like Palawan) attract many tourists. Overseas worker remittances are a vital economic source; services (BPO call centers) and electronics assembly are well-developed. English is one of the official languages; Catholicism predominates, and festivals are colorful (e.g., Sinulog Festival). However, it faces frequent typhoons, earthquakes, numerous natural disasters, significant wealth disparity, and territorial disputes in the South China Sea. Its young population is energetic, and the digital economy and tourism have recovered rapidly in recent years.'
        }, {
            label: 'Congo (DRC)',
            weight: 0.0137,
            backgroundColor: '#007FFF',
            labelColor: '#FFD700',
            desc: 'The Democratic Republic of the Congo (DRC) is the largest country in Central Africa by area, with a rapidly growing population. It contains the vast Congo Basin rainforest and rich minerals (cobalt, copper, diamonds, tantalum). Kinshasa is one of Africa\'s most populous cities. However, prolonged civil war, armed conflict, corruption, and extremely poor infrastructure have led to severe poverty and hunger. Mineral exports are the economic lifeline but are often accompanied by the resource curse and child labor issues. Culturally diverse, with hundreds of ethnic groups and languages, its music (Congolese rumba) influences all of Africa. International aid and peacekeeping operations persist; future development potential is great but stability is the biggest challenge.'
        }, {
            label: 'Vietnam',
            weight: 0.0123,
            backgroundColor: '#DA251D',
            labelColor: '#FFFF00',
            desc: 'Vietnam is a populous Southeast Asian country with rapid economic growth in recent years, dubbed the "New Asian Tiger." Hanoi and Ho Chi Minh City are the two main centers; Ha Long Bay, Hoi An Ancient Town, and Da Nang beaches are tourist highlights. After economic reforms (Đổi Mới), it attracted significant foreign investment, becoming a manufacturing base for mobile phones, garments, footwear, and electronics. Proximity to China provides supply chain advantages. It is a leading global exporter of coffee, rice, and aquatic products. Its culture blends Confucianism, Buddhism, and French colonial influences; street food (pho, spring rolls) is globally popular. However, it faces challenges such as environmental pollution, South China Sea disputes, the onset of aging, and widening income inequality. Its young, hardworking population is its greatest asset.'
        }, {
            label: 'Iran',
            weight: 0.0112,
            backgroundColor: '#239F40',
            labelColor: '#FFFFFF',
            desc: 'Iran is a populous West Asian nation and an ancient Persian civilization, possessing cultural treasures like Isfahan mosques, Shiraz poetry, and Persian carpets. Tehran is the political and economic center. Its oil and gas reserves are among the world\'s highest, and it is an important OPEC member. However, long-term international sanctions have impacted its economy, facing inflation and currency devaluation pressures. Shia Islam is the state religion; Persian is the main language; its literature (Rumi, Hafez) and film art enjoy international acclaim. With a high proportion of young people and relatively high education levels, social restrictions and women\'s rights issues often spark debate. Nuclear issues and regional influence remain international focal points.'
        }, {
            label: 'Turkey',
            weight: 0.0106,
            backgroundColor: '#E30A13',
            labelColor: '#FFFFFF',
            desc: 'Turkey straddles Europe and Asia; Istanbul is a millennia-old metropolis connecting East and West, home to Hagia Sophia, the Blue Mosque, and the hot air balloons of Cappadocia. Once the center of the Ottoman Empire, it is now a regional military and economic power. Textiles, automobiles, tourism, and agricultural exports are well-developed. The economy has recently experienced high inflation and currency crises, but its geopolitical position is strategically strong (Bosporus Strait, NATO member). Its culture blends Islamic, Byzantine, and secular traditions; doner kebabs, Turkish baths, and desserts are globally known. Long-term rule by Erdogan has brought political polarization and earthquake reconstruction challenges.'
        }, {
            label: 'Germany',
            weight: 0.0102,
            backgroundColor: '#FF0000',
            labelColor: '#FFCC00',
            desc: 'Germany is Europe\'s strongest economy, leading globally in manufacturing (automotive: Mercedes-Benz, BMW, Volkswagen; machinery, chemicals). Berlin, Munich, and Hamburg are major cities; Oktoberfest, Neuschwanstein Castle, and classical music (Beethoven, Bach) are cultural symbols. A core EU member and pillar of the Eurozone, it faces energy transition (phasing out nuclear and coal), aging, labor shortages, and an energy crisis following the Russia-Ukraine conflict. Known for precision, efficiency, and strong environmental awareness, its higher education and vocational training systems are world-class. Increased immigration in recent years has brought multiculturalism, alongside a rise in right-wing sentiment. Living standards are high, with a well-developed social welfare system.'
        }, {
            label: 'Thailand',
            weight: 0.0087,
            backgroundColor: '#ED1C24',
            labelColor: '#FFFFFF',
            desc: 'Thailand is a major Southeast Asian tourist destination, famous globally for Bangkok\'s Grand Palace, Pattaya, Chiang Mai, and Phuket beaches. Buddhism is the state religion, and its "Land of Smiles" image is deeply ingrained. Agriculture (rice, fruit), tourism, automobile assembly, and electronics are economic pillars; Bangkok is a regional transportation hub. Recent years have seen frequent political turmoil (coups and protests), but the economy remains resilient. Thai massage, Muay Thai, tom yum soup, and street food are world-renowned. The young population is decreasing, aging is beginning, and climate change and flooding are long-term threats. Under the constitutional monarchy, the monarchy holds a revered position.'
        }, {
            label: 'Tanzania',
            weight: 0.0086,
            backgroundColor: '#00A550',
            labelColor: '#0000FF',
            desc: 'Tanzania is located in East Africa, home to Mount Kilimanjaro, the Serengeti plains, and Zanzibar Island—a paradise for wildlife migration and safari tourism. Dar es Salaam is the economic center; Zanzibar has a blend of Arab and Swahili cultures. Coffee, cashews, gold, and natural gas are major exports. The population is growing rapidly, with Christianity and Islam coexisting. Recent infrastructure investments (standard gauge railway, ports) have increased, but high poverty rates and inadequate education and healthcare resources persist. Climate change affects agriculture and lake water levels. Politically relatively stable, the young population provides developmental momentum.'
        }, {
            label: 'United Kingdom',
            weight: 0.0084,
            backgroundColor: '#00247D',
            labelColor: '#FFFFFF',
            desc: 'The United Kingdom is an established developed nation; London is one of the world\'s financial centers. Cultural symbols include Big Ben, Buckingham Palace, Shakespeare\'s birthplace, and the Premier League. The birthplace of the Industrial Revolution, its economy now focuses on services, finance, technology, and creative industries (music, fashion, film/TV). Post-Brexit adjustments to trade and immigration policies have led to slowed economic growth and Northern Ireland issues. A constitutional monarchy, the King/Queen symbolizes national unity. Afternoon tea, fish and chips, football, and rock music have global influence. Higher education (Oxford, Cambridge) is top-tier, but aging and healthcare system pressures are increasing.'
        }, {
            label: 'France',
            weight: 0.0081,
            backgroundColor: '#002395',
            labelColor: '#FFFFFF',
            desc: 'France is a European cultural and tourism powerhouse, globally renowned for the Paris Eiffel Tower, Louvre Museum, Palace of Versailles, and Provence lavender fields. It leads in fashion (Chanel, Dior), cuisine (Michelin, wine, foie gras), film, and art. It has a high proportion of nuclear power and advanced aerospace (Airbus) and high-speed rail technology. A founding EU member, it holds strong diplomatic influence. However, recent Yellow Vest protests, inflation, and pension reforms have sparked social unrest. Immigrant diversity brings cultural fusion but also integration challenges. Romance, elegance, and a strike culture coexist, with a high quality of life.'
        }, {
            label: 'South Africa',
            weight: 0.0079,
            backgroundColor: '#007A4D',
            labelColor: '#FFFFFF',
            desc: 'South Africa is located at the southern tip of Africa, home to Table Mountain, Kruger National Park, and diverse ethnic cultures (Zulu, Xhosa, Afrikaner, etc.). Cape Town and Johannesburg are major cities. Rich in minerals (gold, platinum, diamonds), it is one of Africa\'s most developed economies. However, high unemployment, extreme wealth disparity, power shortages (load shedding), and crime are persistent challenges. Mandela\'s "Rainbow Nation" ideal of racial reconciliation continues. Wine, football (2010 World Cup), and music (Kwaito) are globally known. Its climate is diverse, ranging from Mediterranean to desert.'
        }, {
            label: 'Italy',
            weight: 0.0072,
            backgroundColor: '#009246',
            labelColor: '#FFFFFF',
            desc: 'Italy is the birthplace of the Renaissance, famous for the Colosseum, Leaning Tower of Pisa, Venice canals, and Milan Fashion Week. Its cuisine (pasta, pizza, espresso, Parmesan cheese) conquers the world. It has strong automotive (Ferrari, Lamborghini), luxury goods (Gucci, Prada), and machinery manufacturing sectors. Tourism is highly developed. However, there is a large north-south economic divide, high debt, severe aging, and one of the world\'s lowest birth rates. Family businesses are numerous, the pace of life is leisurely, and family and food are valued. The Vatican is located within its borders, with the Pope having global influence.'
        }, {
            label: 'Kenya',
            weight: 0.0070,
            backgroundColor: '#006600',
            labelColor: '#FF0000',
            desc: 'Kenya is located in East Africa, the "Safari Capital of Africa," with the Maasai Mara National Reserve witnessing the Great Migration. Nairobi is a regional technology and financial center ("Silicon Savannah"). Tea, coffee, flowers, and tourism are major foreign exchange earners. The population is rapidly becoming younger; mobile payment (M-Pesa) is a globally leading innovation. However, drought, famine, tribal conflicts, and corruption issues persist. Swahili and English are used; its running (marathon) is world-class. Recent years have seen increased Belt and Road projects, with the Mombasa-Nairobi Railway improving transportation. Political multi-party competition is active.'
        }, {
            label: 'Myanmar',
            weight: 0.0067,
            backgroundColor: '#FECB00',
            labelColor: '#FF0000',
            desc: 'Myanmar is located in Southeast Asia, home to the Irrawaddy River, Shwedagon Pagoda, and the ancient Bagan temple complex, a center of Buddhist culture. Its population is about 57 million, predominantly Burman. The economy relies on agriculture (rice), natural gas, jade, and garment processing. However, long-term civil war, political instability since 2021, and international sanctions have led to slow economic growth, severe poverty, and inflation. Yangon and Mandalay are major cities; traditions like the Kayan long-neck women, the Ta\'ngbyan (floating lantern) festival, and monk culture are unique. Recent conflicts have caused a humanitarian crisis and refugee outflow. Infrastructure is poor, but tourism potential is great (if stable, comparable to Thailand). The young population proportion is high, but education and healthcare resources are scarce.'
        }, {
            label: 'Colombia',
            weight: 0.0065,
            backgroundColor: '#FFCC00',
            labelColor: '#003087',
            desc: 'Colombia is located in northwestern South America, with the Andes Mountains, Amazon Rainforest, and Caribbean coast. Bogotá, Medellín, and Cartagena are major cities. Coffee (world-class producer), flowers, oil, and emeralds are important exports. Once plagued by drug violence and guerrilla warfare, peace processes have advanced in recent years, improving security and boosting tourism (Coffee Cultural Landscape, Lost City). Latin culture is vibrant, with salsa, cumbia music, and lively festivals. However, inequality, illegal mining, and climate change (floods, droughts) remain challenges. Biodiversity is among the world\'s highest; coffee culture and street art (Bogotá graffiti) are internationally known.'
        }, {
            label: 'South Korea',
            weight: 0.0063,
            backgroundColor: '#FFFFFF',
            labelColor: '#CD2E3A',
            desc: 'South Korea is a developed East Asian country; Seoul is a high-tech and pop culture hub. K-POP (BTS, BLACKPINK), Korean dramas, Korean food (kimchi, bibimbap), and the beauty industry have swept the globe, with strong cultural soft power. It leads in semiconductors (Samsung), automobiles (Hyundai), shipbuilding, and gaming. The economy is highly export-oriented but faces extremely rapid aging, the world\'s lowest birth rate, high housing prices, and tensions with North Korea. Educational competition is fierce, and university enrollment rates are high. Hanok (traditional houses), Jeju Island, and hanbok coexist with modern skyscrapers. The "Korean Wave" continues to expand, with strong exports in esports and cosmetics.'
        }, {
            label: 'Sudan',
            weight: 0.0063,
            backgroundColor: '#FF0000',
            labelColor: '#FFFFFF',
            desc: 'Sudan is located in Northeast Africa, traversed by the Nile River, home to the Meroë Pyramids and Red Sea coast. Khartoum is the capital. Oil was once the economic pillar, but resources sharply declined after South Sudan\'s independence. Agriculture (cotton, gum arabic), gold, and livestock are important. Recent civil war and frequent coups (conflict intensified after 2023) have caused severe famine, humanitarian disasters, and millions displaced. Islamic culture predominates, blending Nubian and Arab traditions. The climate is hot and dry, with severe desertification. The young population is growing rapidly, but education, healthcare, and infrastructure are extremely poor, with high dependence on international aid.'
        }, {
            label: 'Uganda',
            weight: 0.0062,
            backgroundColor: '#FF0000',
            labelColor: '#000000',
            desc: 'Uganda is located in East Africa on the shores of Lake Victoria, known as the "Pearl of Africa." Kampala is the capital. It boasts gorilla sanctuaries (Bwindi), the source of the Nile, and abundant wildlife. Coffee, tea, and fisheries are main exports; oil development has begun recently. The population is young and growing rapidly; Christianity and Islam coexist. Culturally diverse, traditional drumming and dance are lively. However, it faces poverty, high fertility rates, corruption, and health challenges like malaria. Infrastructure is improving (Chinese-funded roads), and tourism and agriculture have great potential. Politics have long been dominated by Museveni.'
        }, {
            label: 'Spain',
            weight: 0.0058,
            backgroundColor: '#AA151B',
            labelColor: '#F1BF00',
            desc: 'Spain is located on the Iberian Peninsula, with historic cities like Madrid, Barcelona, and Seville. Gaudí\'s architecture (Sagrada Família), flamenco, bullfighting, and tapas are globally famous. Tourism is highly developed (Mediterranean coast, islands); olive oil, wine, and ham are strong exports. An EU and Eurozone member, its economy relies on services, automobiles, and renewable energy. However, it faces the Catalonian independence issue, high unemployment (especially youth), and aging. Bullfighting culture is increasingly controversial; football (Real Madrid, Barcelona) passion is high. The lifestyle is leisurely, with the siesta tradition persisting.'
        }, {
            label: 'Algeria',
            weight: 0.0058,
            backgroundColor: '#006233',
            labelColor: '#FFFFFF',
            desc: 'Algeria is Africa\'s largest country by area, with a Mediterranean coast in the north and the Sahara Desert in the south. Algiers is the capital. Oil and gas exports dominate the economy, making it a key energy supplier to the EU. Arab-Berber cultural fusion, and traditional Rai music is globally known. It has a deep history of independence war; French is still widely used. Recent high youth unemployment and frequent social protests (Hirak movement) have occurred, with politics leaning conservative. Tourism potential is great (Roman ruins, Sahara desert tours), but security and infrastructure limit development. The population is young, with accelerating urbanization.'
        }, {
            label: 'Iraq',
            weight: 0.0057,
            backgroundColor: '#CE1126',
            labelColor: '#FFFFFF',
            desc: 'Iraq is located in the Middle East; the Mesopotamia region nurtured ancient civilizations (Babylon, Ur). Baghdad is the historical and cultural center. Oil reserves are among the world\'s highest; the economy depends heavily on energy exports. The majority is Shia Muslim, with Sunni and Kurdish minorities. Long-term conflict post-2003, ISIS devastation, and ongoing corruption and sectarian strife have made reconstruction difficult. However, security has improved recently, and tourism potential is reviving (Baghdad, Kurdistan Region). Arab cuisine (kebabs, rice) and poetry tradition are rich. The young population is large, but education and employment pressures are high, and drought worsens water crises.'
        }, {
            label: 'Argentina',
            weight: 0.0056,
            backgroundColor: '#74ACDF',
            labelColor: '#FFFFFF',
            desc: 'Argentina is located in southern South America, known for Buenos Aires, the tango, football (Maradona, Messi), and Patagonian glaciers. Pampas beef and Malbec wine are globally famous. It is a major agricultural (soybeans, corn) and livestock exporter. However, the economy has long been unstable, with recurring high inflation, debt defaults, and currency devaluation. Recent politics have swung between left and right, with fluctuating poverty rates. Culture is deeply influenced by European immigrants (many of Italian, Spanish descent); literature (Borges) and film are developed. Natural landscapes are diverse, from the Andes to Iguazu Falls.'
        }, {
            label: 'Afghanistan',
            weight: 0.0053,
            backgroundColor: '#000000',
            labelColor: '#FFFFFF',
            desc: 'Afghanistan is located at the crossroads of Central and South Asia; Kabul is the capital. The Hindu Kush mountains run through it, home to ancient Buddhist relics (the former Bamiyan Buddhas). Ethnic groups include Pashtun, Tajik, etc.; Islamic culture predominates. The economy heavily depends on agriculture (pomegranates, almonds), carpets, and aid. After the Taliban regained power in 2021, women\'s education and work have been restricted, causing a severe humanitarian crisis, hunger, and refugee issues. Mineral potential (copper, lithium) is great, but infrastructure is devastated. Traditional kite-flying and poetry culture persist; the young population proportion is very high.'
        }, {
            label: 'Yemen',
            weight: 0.0051,
            backgroundColor: '#CE1126',
            labelColor: '#FFFFFF',
            desc: 'Yemen is located in southwestern Arabia, with historic cities Sana\'a and Aden. It possesses the unique biodiversity of Socotra Island and an ancient spice trade heritage. It is the origin of coffee (Mocha). Prolonged civil war (Houthi rebels vs. government) has caused the world\'s worst humanitarian crisis: hunger, cholera, and collapsed infrastructure. Oil and gas were once economic pillars, now nearly stagnant. Arab culture is strong; qat chewing is common. Its strategic location (Bab el-Mandeb Strait) is overshadowed by conflict halting development. The population is young, but reconstruction prospects are distant.'
        }, {
            label: 'Canada',
            weight: 0.0049,
            backgroundColor: '#FF0000',
            labelColor: '#FFFFFF',
            desc: 'Canada is the world\'s second-largest country by area; Toronto, Vancouver, and Montreal are multicultural centers. Maple leaves, the flag symbol, maple syrup, ice hockey, and auroras are renowned. Rich in natural resources (oil, timber, minerals), its economy is developed, with high shares of services and technology. An immigrant nation with successful multicultural policies, it faces challenges including Indigenous rights, climate change (Arctic melting), and high housing prices. Quebec\'s French-speaking region is unique; maple tours and the Rockies attract tourists. Living standards are high, with excellent healthcare and education benefits; winters are cold but outdoor activities abound.'
        }, {
            label: 'Angola',
            weight: 0.0047,
            backgroundColor: '#FF0000',
            labelColor: '#000000',
            desc: 'Angola is located in southwestern Africa; Luanda is the capital. Oil and diamond exports constitute most of the economy; it was extremely impoverished after civil war (until 2002). Reconstruction has accelerated recently, with infrastructure improving. Chinese investment is significant (roads, railways). A Portuguese-speaking country, football and music (semba, kizomba) are vibrant. Biodiversity is rich (part of the Okavango Delta). However, corruption, wealth disparity, and oil price volatility make the economy vulnerable. The population is young, urbanization is rapid, and drought and food security remain challenges.'
        }, {
            label: 'Ukraine',
            weight: 0.0047,
            backgroundColor: '#005BBB',
            labelColor: '#FFD700',
            desc: 'Ukraine is located in Eastern Europe on the Black Sea coast; Kyiv is a thousand-year-old capital (St. Sophia\'s Cathedral). It is a leading global exporter of wheat, corn, and sunflower seeds ("breadbasket of Europe"). Its industrial base is strong (steel, machinery). Since the 2022 Russian invasion, conflict has continued, with severe war damage in the east, a devastated economy, and millions of refugees. However, national unity has strengthened, and EU candidate status brings hope. Culture features Orthodox Christianity, embroidery, and literature (Shevchenko). Tourism potential remains at Chernobyl and the Carpathian Mountains. Its food security impacts the globe.'
        }, {
            label: 'Morocco',
            weight: 0.0047,
            backgroundColor: '#C1272D',
            labelColor: '#006233',
            desc: 'Morocco is located in North Africa, with cultural hubs Casablanca, Marrakech, and Fez. It boasts the Sahara Desert, Atlas Mountains, and Mediterranean coast. Tourism is well-developed (desert camping, riads); leather, handicrafts, and spice markets are famous. It is the world\'s top phosphate exporter, with emerging automotive and aerospace industries. A constitutional monarchy, it blends Islamic and Berber traditions. Recent infrastructure progress (high-speed rail) is notable, but urban-rural gaps and youth unemployment persist. Cuisine (tagine, couscous) and film festivals attract international attention.'
        }, {
            label: 'Poland',
            weight: 0.0046,
            backgroundColor: '#FFFFFF',
            labelColor: '#DC143C',
            desc: 'Poland is located in Central Europe; Warsaw, Kraków, and Gdańsk have long histories. After WWII and communist era transitions, it is now a relatively fast-growing EU economy. Manufacturing (automotive, appliances), IT outsourcing, and coal remain important. Culture is represented by Catholicism, Chopin\'s music, and pierogi (dumplings). Recent right-wing government policies have been conservative, but judicial controversies are many. Receiving many Ukrainian refugees shows humanitarian commitment. Aging is beginning; the Warsaw Stock Exchange is active. Baltic beaches and Carpathian Mountains offer rich tourism resources.'
        }, {
            label: 'Uzbekistan',
            weight: 0.0045,
            backgroundColor: '#1EB53A',
            labelColor: '#FFFFFF',
            desc: 'Uzbekistan is located in Central Asia; Samarkand, Bukhara, and Khiva are ancient Silk Road cities, famous for blue mosques and mosaic architecture. Tashkent is the capital. Cotton (world-leading), gold, gas, and fruit are important exports. Recent reforms and openness have spurred rapid tourism growth (visa simplification). Islamic culture predominates; traditional silk and carpet handicrafts are exquisite. However, water scarcity (Aral Sea drying) and legacy authoritarian political issues persist. The population is young, education levels are relatively high, and Russian is still widely used.'
        }, {
            label: 'Malaysia',
            weight: 0.0044,
            backgroundColor: '#010066',
            labelColor: '#FF0000',
            desc: 'Malaysia is located in Southeast Asia, famous for Kuala Lumpur\'s Petronas Twin Towers and Penang food streets. Multi-ethnic (Malay, Chinese, Indian); Islam is the state religion but with pluralistic tolerance. Palm oil, petroleum, electronics, and semiconductors are top global exports. Tourist highlights include Sabah islands, Borneo rainforests, and Langkawi. Recent political stability; the economy is transitioning from middle to high income. However, racial policies and corruption issues occasionally arise. A food paradise (Nyonya cuisine, satay, laksa); tropical climate suitable for year-round tourism.'
        }, {
            label: 'Malaysia', // Note: Duplicate entry in original data. Translation identical to above.
            weight: 0.0044,
            backgroundColor: '#010066',
            labelColor: '#FF0000',
            desc: 'Malaysia is located in Southeast Asia, consisting of Peninsular Malaysia and parts of Borneo; Kuala Lumpur\'s Twin Towers are a modern landmark. A multi-ethnic society (Malays, Chinese, Indians), Islam is the state religion but religious freedom is relatively high. The economy is based on electronics/semiconductors, palm oil, oil/gas, and tourism; it is representative of a middle-income country transitioning to high income. Penang food streets, Sabah diving spots, Genting Highlands, and Langkawi islands attract global tourists. Culture blends diverse influences; Nyonya cuisine, satay, laksa are famous. Recent politics have been relatively stable, but racial policies and corruption issues occasionally cause debate. Tropical climate suitable for year-round tourism; urbanization and green development proceed simultaneously.'
        }, {
            label: 'Mozambique',
            weight: 0.0043,
            backgroundColor: '#009739',
            labelColor: '#000000',
            desc: 'Mozambique is located in southeastern Africa, with a long Indian Ocean coastline and Maputo Bay. Maputo is the capital. Vast natural gas reserves (among world\'s largest) have recently made it an emerging energy exporter. Agriculture (cashews, sugar, cotton) and fisheries are traditionally important. A Portuguese-speaking country, culture blends African and European elements; music (marrabenta) and dance are vibrant. However, the north has long been troubled by Islamist extremist conflict, hindering security and development. Poverty rates are high, infrastructure lags, but Chinese-funded road, port, and rail projects have significantly improved transportation. Tourism potential is great (Bazaruto Archipelago, Gorongosa National Park), but natural disasters (cyclones) are frequent. The population is young and growing rapidly.'
        }, {
            label: 'Ghana',
            weight: 0.0043,
            backgroundColor: '#006B3F',
            labelColor: '#FCD116',
            desc: 'Ghana is located in West Africa on the Gulf of Guinea; Accra is the capital. Formerly the British colony "Gold Coast," it is an African democracy exemplar post-independence. Gold, cocoa, oil, and timber are key exports; it is the world\'s second-largest cocoa producer. Culture is rich with Ashanti tradition, Kente cloth, and highlife music. English is the official language; Christianity predominates. The economy has grown steadily recently, but corruption, erratic power supply, and youth unemployment persist. Tourist highlights include slave forts (historical sites), Mole National Park, and beaches. Peaceful multi-party alternation; Nobel Peace laureate Kofi Annan hailed from here. The population is young, with an active entrepreneurial atmosphere.'
        }, {
            label: 'Peru',
            weight: 0.0042,
            backgroundColor: '#D91023',
            labelColor: '#FFFFFF',
            desc: 'Peru is located in the Andes of South America, home to Machu Picchu, Nazca Lines, and Amazon Rainforest—core of the Inca civilization. Lima is the capital and culinary hub (ceviche, pisco sour). Copper, gold, and silver mining are top global exports; fishing (Peruvian anchovy) is developed. Culture is diverse, blending Indigenous (Quechua, Aymara) and Spanish influences. Recent economic growth has been relatively fast, but wealth disparity is large between highlands and coast. Political turmoil is frequent (presidents change often). Tourism is a pillar (historical sites, natural landscapes), but illegal mining and deforestation threaten the environment. Biodiversity is extremely high.'
        }, {
            label: 'Saudi Arabia',
            weight: 0.0042,
            backgroundColor: '#006C35',
            labelColor: '#FFFFFF',
            desc: 'Saudi Arabia is located on the Arabian Peninsula, site of Islam\'s two holiest cities (Mecca, Medina); Riyadh is the capital. Oil reserves and production are among the world\'s highest, long dependent on energy exports. "Vision 2030" promotes economic diversification, developing tourism, technology, and entertainment (NEOM city, Riyadh Season). Culture strictly follows Wahhabi Islamic rules, but recent reforms like allowing women to drive and opening cinemas are significant. Desert landscapes, Red Sea diving, and ancient sites attract tourists. A monarchy, oil wealth supports high welfare, but a young population creates employment pressure. Climate is extremely hot; Ramadan and Hajj are global focal points.'
        }, {
            label: 'Madagascar',
            weight: 0.0040,
            backgroundColor: '#FC3D32',
            labelColor: '#FFFFFF',
            desc: 'Madagascar is the world\'s fourth-largest island, located southeast in the Indian Ocean, with unique biodiversity (lemurs, traveler\'s tree, 90% endemic species). Antananarivo is the capital. The economy relies on agriculture (vanilla—world\'s major producer), textiles, and tourism. French and Malagasy are used; culture blends Southeast Asian, African, and European elements. Long-term poverty, poor infrastructure, and political instability hinder development. Recent droughts, locust plagues, and climate change worsen food crises. Tourist highlights include national parks, Île aux Nattes (Avalon Peninsula), and beaches, but transportation is difficult. The population is young, growing fast, with potential yet to be tapped.'
        }, {
            label: 'Côte d\'Ivoire',
            weight: 0.0040,
            backgroundColor: '#FF8C00',
            labelColor: '#FFFFFF',
            desc: 'Côte d\'Ivoire is located in West Africa on the Gulf of Guinea; Abidjan is the economic center. The world\'s largest cocoa producer, cocoa and coffee are export pillars. A French-speaking country, economically relatively developed in West Africa, with active ports and finance. Culture is diverse; traditional masks, music (Zouglou), and football (Drogba era) are famous. After recent political stability, economic growth has been strong, but urban-rural gaps, corruption, and youth unemployment persist. It experienced civil war and election conflicts, now tending toward peace. Tropical climate; coastal tourism potential is great (Assinie Beach). Population is young, urbanization accelerating.'
        }, {
            label: 'Cameroon',
            weight: 0.0036,
            backgroundColor: '#007A5E',
            labelColor: '#FFD700',
            desc: 'Cameroon is located at the junction of Central and West Africa, known as "Africa in miniature" (rainforest, savanna, highlands, volcanoes). Yaoundé is the political capital; a bilingual country (French + English). Oil, timber, cocoa, coffee are important exports. Culture is extremely diverse, with over 250 ethnic groups; traditional music and dance are rich. However, Anglophone separatist conflict continues, security situation severe. Tourism resources are rich (Mount Cameroon, Waza National Park), but infrastructure and corruption limit development. Population is young, growing rapidly; football (African Cup champion) is a national passion.'
        }, {
            label: 'Nepal',
            weight: 0.0036,
            backgroundColor: '#DC143C',
            labelColor: '#003893',
            desc: 'Nepal is located south of the Himalayas; Kathmandu is the capital. Home to the world\'s highest peak, Mount Everest, mountaineering and trekking (Annapurna, Langtang) are globally famous. Hinduism and Buddhism coexist; Patan and Pokhara have many historical sites. The economy depends on agriculture, remittances, and tourism; hydropower potential is growing recently. However, frequent earthquakes (rebuilding after 2015 quake), poverty, poor infrastructure, and political instability persist long-term. Culture is rich with festivals (Diwali, Holi) vibrant. Population is young; mountain guiding and handicraft traditions are strong.'
        }, {
            label: 'Venezuela',
            weight: 0.0035,
            backgroundColor: '#00247D',
            labelColor: '#FFD700',
            desc: 'Venezuela is located in northern South America, with the Andes, Amazon Rainforest, and Caribbean beaches. Caracas is the capital. Oil reserves are among the world\'s highest, but the economy heavily depends on energy; recent hyperinflation, inflation, and sanctions have caused collapse, with millions of refugees. Humanitarian crisis is severe, with food and medicine shortages. Culture is passionate; Latin music, baseball, and beauty pageants are strong traditions. Natural landscapes are spectacular (Angel Falls—world\'s highest waterfall), but security and political turmoil limit tourism. Recent attempts at economic diversification face huge challenges.'
        }, {
            label: 'Niger',
            weight: 0.0034,
            backgroundColor: '#0E9549',
            labelColor: '#FFFFFF',
            desc: 'Niger is located in the West African Sahel; Niamey is the capital. The Sahara Desert covers most of the country; climate is arid. Uranium exports are important; livestock and millet farming are mainstays. Population growth is extremely fast, one of the world\'s highest fertility rates; poverty and famine are frequent. Islamic culture predominates; Tuareg and Hausa traditions are rich. Recent extremist armed groups (Boko Haram affiliates) and cross-border conflicts threaten security. High dependence on international aid; education and healthcare resources are extremely scarce. Niger River valley agriculture potential exists, but climate change worsens desertification.'
        }, {
            label: 'Australia',
            weight: 0.0033,
            backgroundColor: '#00008B',
            labelColor: '#FFFFFF',
            desc: 'Australia is the world\'s smallest continent but a vast country; Sydney Opera House, Melbourne, and the Great Barrier Reef are icons. The economy is developed; mining (iron ore, coal, lithium), agriculture, and services are strong. Multicultural immigration; English-speaking; high living standards. Indigenous culture (Dreamtime, boomerang) is increasingly recognized. Natural landscapes are diverse, from deserts to rainforests; koalas, kangaroos, and platypuses are unique. Recent challenges include climate change (bushfires, floods), high housing prices, and Indigenous rights issues. Sports (Australian Open, rugby) enthusiasm is high; education and healthcare systems are excellent.'
        }, {
            label: 'North Korea',
            weight: 0.0032,
            backgroundColor: '#024FA2',
            labelColor: '#FF0000',
            desc: 'North Korea is located in the northern Korean Peninsula; Pyongyang is the capital. A highly centralized socialist system under three generations of Kim family leadership. The economy focuses on heavy industry, agriculture, and military industry but long affected by sanctions and natural disasters; food shortages are common. Nuclear weapons and missile development are international focal points. Culture emphasizes Juche ideology; mass performances (Arirang) and gymnastics are famous. Information is tightly controlled; internet is extremely limited; tourism is strictly managed (mainly group tours). Population is relatively homogeneous; Korean language used; education and healthcare are free but quality is limited. Recent attempts at special economic zones and limited foreign opening.'
        }, {
            label: 'Syria',
            weight: 0.0031,
            backgroundColor: '#CE1126',
            labelColor: '#FFFFFF',
            desc: 'Syria is located in the Middle East, home to Damascus (oldest continuously inhabited city), Aleppo\'s ancient city, and Palmyra ruins. Civil war (since 2011) caused devastating destruction, millions of refugees, and infrastructure collapse. The economy severely shrank, dependent on agriculture and oil; once an important Middle Eastern nation. Arab culture predominates; cuisine (hummus, kebabs) is rich. Religious diversity (Sunni, Alawite, Christian). Conflict has eased recently, but reconstruction is distant; sanctions and fragmentation persist. Historical depth is profound; if peace returns, tourism and cultural influence could recover.'
        }, {
            label: 'Mali',
            weight: 0.0031,
            backgroundColor: '#009E60',
            labelColor: '#FFD700',
            desc: 'Mali is located in the West African Sahel; Timbuktu and Djenné were medieval Islamic academic centers. Bamako is the capital. Cotton and gold exports are important; Niger River irrigates agriculture. Culture is known for Mandingo tradition and dongon (likely referring to "dogon" or traditional music) music. Recent extremist armed groups and Tuareg rebellions in the north have worsened security; coups are frequent. Poverty rates are high; education and healthcare lacking; climate drought and desertification severe. Population is young, growing fast. International peacekeeping forces long present; food security fragile. Traditional handicrafts (mud architecture) are unique.'
        }, {
            label: 'Burkina Faso',
            weight: 0.0029,
            backgroundColor: '#009E49',
            labelColor: '#EF2B2D',
            desc: 'Burkina Faso is a landlocked West African nation; Ouagadougou is the capital. The "African Hollywood" film festival (FESPACO) is famous. Cotton exports are world-leading; gold mining is growing. A French-speaking country, culturally diverse; Mossi kingdom tradition and mask dances are rich. Recent Sahel region extremist attacks are frequent, security worsening, millions internally displaced. Poverty and famine severe; climate change worsens drought. Music (balafon) and handwoven textiles are developed. Population is young; political instability (multiple coups). High dependence on international aid.'
        }, {
            label: 'Sri Lanka',
            weight: 0.0028,
            backgroundColor: '#006A4E',
            labelColor: '#FF0000',
            desc: 'Sri Lanka is an island in the Indian Ocean; Colombo is the commercial center. Ceylon tea, gems, and coconut are traditional strong exports. Buddhism predominates; Kandy\'s Temple of the Tooth and ancient cities like Polonnaruwa are World Heritage Sites. Beaches (south coast), tea plantations, and wildlife (Yala National Park) attract tourists. Recent economic crisis (2022 debt default near bankruptcy) caused fuel, food shortages, and protests. Tourism and remittances recovering. Culture blends Sinhalese, Tamil, and Muslim; curry, kottu, and festivals vibrant. Post-political turmoil tending stable, but debt restructuring and inflation remain major challenges.'
        }, {
            label: 'Malawi',
            weight: 0.0027,
            backgroundColor: '#000000',
            labelColor: '#FF0000',
            desc: 'Malawi is located in southeastern Africa, the "Warm Heart of Africa"; Lake Malawi (Africa\'s third-largest lake) is the tourism core. Lilongwe is the capital. Economy highly dependent on agriculture (tobacco, tea, sugar); poverty rates high. Population growing fast, noticeably young. Culture features Chewa tradition, Gule Wamkulu dance. Recent climate change causing droughts and floods; food security fragile. Chinese-funded infrastructure (roads, parliament building) significant. Politically relatively stable, but corruption and inadequate healthcare persist. Lake fisheries and wildlife viewing potential great.'
        }, {
            label: 'Zambia',
            weight: 0.0027,
            backgroundColor: '#006600',
            labelColor: '#FF0000',
            desc: 'Zambia is located in southern Africa; Victoria Falls (one of world\'s largest waterfalls) is an icon. Lusaka is the capital. Copper exports are world-leading; recent attempts at economic diversification. Wildlife resources abundant; South Luangwa National Park safari famous. English-speaking; Christianity predominates. Recent power shortages (hydro-dependent) and debt pressure high. Tradition of peaceful political transition good. Population young; agriculture (maize) and tourism potential exist. But infrastructure lags; poverty and HIV/AIDS impact remain heavy. Chinese mining and infrastructure investments active.'
        }, {
            label: 'Chad',
            weight: 0.0025,
            backgroundColor: '#002664',
            labelColor: '#FFD700',
            desc: 'Chad is located in Central Africa; N\'Djamena is the capital. Sahara Desert and Lake Chad (severely shrinking) coexist. Oil exports began in the 2000s, but revenue distribution unequal. Islam and Christianity coexist; culture diverse (Sara, Arab groups). Long-term civil war, terrorism (Boko Haram), and refugee crises plague. Poverty rates extremely high; education and healthcare scarce. Climate arid; famine frequent. Strong dependence on international peacekeeping and aid. Population young, growing rapidly; development challenges enormous.'
        }, {
            label: 'Kazakhstan',
            weight: 0.0025,
            backgroundColor: '#00AEEF',
            labelColor: '#000000',
            desc: 'Kazakhstan is Central Asia\'s largest country; Astana (now Nur-Sultan) and Almaty are major cities. Oil, gas, and uranium exports are world-leading. Vast steppes; nomadic culture (eagle hunting, kumis) traditions. Post-independence economic growth fast; key "Belt and Road" node. Significant Chinese investment (oil pipelines, roads). Multi-ethnic (Kazakh, Russian, Uyghur, etc.); Islam predominates. Recent political reforms (post-Nazarbayev), but authoritarian traits persist. Winters extremely cold, summers dry and hot; natural resources abundant.'
        }, {
            label: 'Chile',
            weight: 0.0024,
            backgroundColor: '#0033A0',
            labelColor: '#FFFFFF',
            desc: 'Chile is located on South America\'s west coast between the Andes and Pacific; Santiago is the capital. World\'s top copper producer; lithium resources (salt flats) strategically important. Wine (Carménère), salmon, and fruit exports strong. Culture deeply influenced by European immigrants; literature (Neruda, Borges influence) developed. Natural landscapes extremely diverse (Atacama Desert, Patagonian glaciers, Easter Island). Recent social protests (since 2019) driving constitutional reform; wealth disparity large. Earthquakes frequent; disaster prevention capabilities strong. Living standards relatively high in Latin America.'
        }, {
            label: 'Somalia',
            weight: 0.0024,
            backgroundColor: '#4189DD',
            labelColor: '#FFFFFF',
            desc: 'Somalia is located in the Horn of Africa; Mogadishu is the capital. Long-term civil war (since 1991) and piracy have shattered the state. Clan-based society; Islam predominates. Economy depends on livestock (camels, goats), fishing, and remittances. Recent federal government rebuilding, but Somaliland and Al-Shabaab controlled areas coexist. Famine and drought frequent; humanitarian crisis severe. Culture known for poetry, camel culture. Long Indian Ocean coastline; fishing potential great. But security extremely unstable; international aid and peacekeeping ongoing. Population young, growing fast.'
        }, {
            label: 'Senegal',
            weight: 0.0023,
            backgroundColor: '#00853E',
            labelColor: '#FF0000',
            desc: 'Senegal is located at westernmost West Africa; Dakar is the capital. French-speaking; culturally open; music (Youssou N\'Dour) and wrestling (Laamb) traditions strong. Peanuts, fisheries, and phosphate exports important. Tourist highlights include Gorée Island (slave history), Saloum Delta, and desert. Politically stable, democratic transitions smooth; a West African democratic benchmark. Recent natural gas discoveries bring development opportunities. But youth unemployment high; rural poverty persists. Sufi Islam influential; religious tolerance. Cuisine (thieboudienne) rich.'
        }, {
            label: 'Romania',
            weight: 0.0023,
            backgroundColor: '#002B7F',
            labelColor: '#FCD116',
            desc: 'Romania is located in Eastern Europe; Bucharest is the capital. The Carpathian Mountains and Transylvania (Dracula legend) famous. EU and NATO member; post-transition economy growing relatively fast; IT outsourcing and automotive manufacturing developed. Culture features Orthodox Christianity, folklore, and vampire tourism appeal. Recent anti-corruption progress, but rural poverty and brain drain issues persist. Black Sea beaches, Bran Castle, and painted monasteries are tourist highlights. Wine and traditional food (sarmale) popular. Aging population beginning.'
        }, {
            label: 'Guatemala',
            weight: 0.0023,
            backgroundColor: '#4997D0',
            labelColor: '#FFFFFF',
            desc: 'Guatemala is located in Central America, home to Maya ruins (Tikal), Antigua Guatemala, and Lake Atitlán. Guatemala City is the capital. Coffee, bananas, and sugar exports important. Culturally diverse; Indigenous (Maya) proportion high; textile handicrafts exquisite. Recent violent crime and gang problems severe, but tourism recovering. Natural disasters (earthquakes, volcanoes) frequent. Political corruption and wealth disparity large. Cuisine (tortillas, black beans) traditional. Population young, growing relatively fast.'
        }, {
            label: 'Netherlands',
            weight: 0.0022,
            backgroundColor: '#AE1C28',
            labelColor: '#FFFFFF',
            desc: 'The Netherlands is located in Western Europe, a low-lying country; Amsterdam canals, windmills, and tulip fields famous. Economy highly developed; services, agriculture (greenhouses), ports (Rotterdam—Europe\'s largest), and high-tech strong. EU founding member; open and inclusive; LGBTQ+ rights leading. Culture known for painting (Rembrandt, Van Gogh), cheese, and wooden clogs tradition. Recent housing crisis, climate change (sea-level rise), and agricultural nitrogen emissions controversies large. Bicycle culture, cows, and canal lifestyle unique. Quality of life high; welfare system well-developed.'
        }, {
            label: 'Ecuador',
            weight: 0.0022,
            backgroundColor: '#FFFF00',
            labelColor: '#0000FF',
            desc: 'Ecuador is located on the equator in South America; Quito (world\'s highest capital) and Guayaquil are main cities. Galápagos Islands biodiversity globally famous. Oil, bananas, and shrimp exports important. Culture blends Inca, Spanish, and African elements; music and festivals vibrant. Recent dollarized economy stable, but debt and political turmoil (Indigenous protests) frequent. Andes highlands, Amazon, and Pacific coast landscapes diverse. Tourism potential great (Quito Old Town, Otavalo market). Population young; biodiversity conservation pressure high.'
        }, {
            label: 'Cambodia',
            weight: 0.0022,
            backgroundColor: '#032EA1',
            labelColor: '#E69B00',
            desc: 'Cambodia is located in Southeast Asia; Angkor Wat (world\'s largest religious complex) is an icon. Phnom Penh is the capital. Economy relies on tourism, garments, and agriculture (rice). Chinese investment active (Belt and Road projects). Khmer culture; Buddhism predominant; traditional Apsara dance and cuisine (amok fish) famous. Khmer Rouge historical trauma deep; recent economic growth fast, but poverty and corruption issues persist. Population young, growing fast. Sihanoukville and Tonlé Sap Lake tourism potential great. Politics long dominated by Hun Sen family.'
        }, {
            label: 'Zimbabwe',
            weight: 0.0021,
            backgroundColor: '#006400',
            labelColor: '#FFCE00',
            desc: 'Zimbabwe is located in southern Africa; Victoria Falls and Great Zimbabwe ruins famous. Harare is the capital. Once "breadbasket of Africa," agriculture (tobacco, maize) and minerals (platinum, lithium) strong. But post-land reform economy long collapsed; hyperinflation history lesson profound. Recent attempts at recovery, but sanctions, corruption, and power shortages still plague. Wildlife resources abundant (Hwange National Park). Culture features Shona and Ndebele traditions. Population young; education levels relatively high.'
        }, {
            label: 'Guinea',
            weight: 0.0018,
            backgroundColor: '#CE1126',
            labelColor: '#FCD116',
            desc: 'Guinea is located in West Africa; Conakry is the capital. Bauxite reserves world-leading; mining exports dominate economy. French-speaking; culturally diverse; music (Mandingo) influences West Africa. Recent coups frequent (military rule post-2021); political unstable. Poverty rates high; Ebola and malaria health challenges large. Hydropower potential great (Souapiti Dam). Tropical climate; coastal and forest landscapes. Population young, growing fast. International mining investment active, but revenue distribution unequal.'
        }, {
            label: 'Benin',
            weight: 0.0018,
            backgroundColor: '#FCD116',
            labelColor: '#E8112D',
            desc: 'Benin is located in West Africa; Porto-Novo is administrative capital, Cotonou economic center. Birthplace of Vodun (Voodoo), influencing African diaspora cultures in the Americas. Cotton, cashews, and port transit trade important. French-speaking; politically relatively stable; democratic transitions smooth. Culture rich; traditional markets and bronze handicrafts. Recent tourism attempts (Ouidah slave route). Poverty and youth unemployment issues persist. Population young, growing rapidly. One of West Africa\'s stable nations.'
        }, {
            label: 'Rwanda',
            weight: 0.0018,
            backgroundColor: '#20603D',
            labelColor: '#FFD700',
            desc: 'Rwanda is located in East Africa, "Land of a Thousand Hills"; Kigali is the capital. Post-1994 genocide reconstruction successful; security good; economic growth fast. Coffee and tea exports; conference tourism and tech hub ("Africa\'s Singapore" vision). Volcanoes National Park gorilla trekking globally famous. English, French, and Kinyarwanda used. High proportion of women in politics. Politics highly centralized, development-oriented. But freedom of speech and relations with neighbors (DRC) controversial. Clean cities and anti-corruption image prominent.'
        }, {
            label: 'Burundi',
            weight: 0.0017,
            backgroundColor: '#1EB53A',
            labelColor: '#FFFFFF',
            desc: 'Burundi is located in East Africa on Lake Tanganyika; Bujumbura is the capital. Population density Africa\'s highest; agriculture (coffee, tea) mainstay. Politics long turbulent; post-2015 crisis caused refugee outflow. Economy extremely poor; food insecurity. Culture features Hutu, Tutsi, and Twa traditions; drumming famous. Recent attempts at stability, but governance challenges large. Lake fisheries and eco-tourism potential exist. Population young, growing extremely fast; development pressure enormous.'
        }, {
            label: 'Bolivia',
            weight: 0.0015,
            backgroundColor: '#D91023',
            labelColor: '#FFFFFF',
            desc: 'Bolivia is a landlocked South American nation; La Paz (world\'s highest administrative capital) and Sucre coexist. Uyuni Salt Flat (world\'s largest) and Lake Titicaca are natural wonders. Minerals (silver, lithium, tin) and gas exports important. Indigenous (Aymara, Quechua) proportion high; culture diverse. Recent leftist policies emphasize resource nationalization. Poverty and high altitude (Altiplano) bring health challenges. Tourism potential great (La Paz cable cars, Amazon). Political polarization noticeable.'
        }, {
            label: 'Tunisia',
            weight: 0.0015,
            backgroundColor: '#E7000D',
            labelColor: '#FFFFFF',
            desc: 'Tunisia is located in North Africa on Mediterranean coast; Tunis and Carthage ruins famous. Arab-Berber culture; French widely used. Tourism (Hammamet beaches, Sahara desert), olive oil, and phosphate exports important. Birthplace of 2011 "Arab Spring," democratic transition relatively successful, but economic stagnation and high youth unemployment. Recent political turmoil (presidential consolidation post-2021). Cuisine (couscous, brik) rich. Climate mild; tourism recovering.'
        }, {
            label: 'South Sudan',
            weight: 0.0015,
            backgroundColor: '#0C8A45',
            labelColor: '#000000',
            desc: 'South Sudan is the world\'s youngest nation (independent 2011); Juba is the capital. Oil exports mainstay, but civil war and ethnic conflicts continue. Infrastructure extremely poor; famine and refugee crisis severe. Humanitarian situation among world\'s worst. Christianity and traditional beliefs predominant; culture diverse. Upper Nile region; swamps and wildlife resources abundant. But security and governance collapse limit development. Extremely high dependence on international aid. Population young; potential awaits peace.'
        }, {
            label: 'Haiti',
            weight: 0.0014,
            backgroundColor: '#002B7F',
            labelColor: '#FFFFFF',
            desc: 'Haiti is located in the Caribbean; Port-au-Prince is the capital. First black republic; Creole culture and Vodou unique. Economy extremely poor; agriculture (coffee, cocoa) and remittances mainstays. Earthquakes (2010), hurricanes, and political violence repeatedly strike. Recent gang control over large areas; security collapsed. Culture rich; painting, music (kompa), and cuisine (griot). Population young, growing fast. Long-term international aid presence; reconstruction difficult.'
        }, {
            label: 'Belgium',
            weight: 0.0014,
            backgroundColor: '#000000',
            labelColor: '#FF0000',
            desc: 'Belgium is located in Western Europe; Brussels hosts EU and NATO headquarters. Flanders and Wallonia language regions; culture diverse. Chocolate, beer (thousands of varieties), waffles, and fries globally famous. Economy developed; diamond trade, pharmaceuticals, and port (Antwerp) strong. Historic cities (Bruges, Ghent) medieval charm well-preserved. Recent political fragmentation; federal system complex. Quality of life high; welfare well-developed. Football and cycling culture passionate.'
        }, {
            label: 'Jordan',
            weight: 0.0014,
            backgroundColor: '#CE1126',
            labelColor: '#000000',
            desc: 'Jordan is located in the Middle East; Amman is the capital. Petra (Rose-Red City), Dead Sea, and Wadi Rum desert famous. Tourism pillar; phosphate and potash exports important. Constitutional monarchy, Hashemite dynasty rule. Hosts many Syrian and Iraqi refugees; humanitarian burden heavy. Arab culture tradition; hospitality renowned. Recent economic pressures high; youth unemployment high. Water resources extremely scarce. Geopolitically maintains relative stability.'
        }, {
            label: 'Dominican Republic',
            weight: 0.0014,
            backgroundColor: '#002D62',
            labelColor: '#FFFFFF',
            desc: 'The Dominican Republic occupies eastern half of Hispaniola island; Santo Domingo is Americas\' oldest European-founded city. Tourism developed (Playa Dorada, Punta Cana). Cigars, rum, and coffee exports famous. Latin culture vibrant; merengue and bachata music globally popular. Recent economic growth fast, but wealth disparity and hurricane risks persist. Neighbor Haiti; immigration issues sensitive. Baseball is national sport.'
        }, {
            label: 'United Arab Emirates',
            weight: 0.0014,
            backgroundColor: '#00732F',
            labelColor: '#FFFFFF',
            desc: 'The UAE comprises seven emirates; Dubai and Abu Dhabi highlights. Oil wealth transformed; Dubai became global trade, tourism, and finance hub (Burj Khalifa, Palm Islands). Abu Dhabi cultural investments (Louvre Abu Dhabi). Economy highly diversified; tax-free and zero income tax attract talent. Islamic culture and modern luxury coexist. Expatriates majority. Climate hot; air-conditioned society. Recent space programs and green energy development active.'
        }, {
            label: 'Honduras',
            weight: 0.0013,
            backgroundColor: '#0077B6',
            labelColor: '#FFFFFF',
            desc: 'Honduras is located in Central America; Tegucigalpa is the capital. Maya ruins (Copán) and Caribbean beaches (Roatán Island) tourist highlights. Bananas, coffee, and textiles exports important. Long plagued by gang violence (MS-13) and corruption; security problems severe. Recent migration waves toward US. Natural disasters (hurricanes) frequent. Latin culture passionate; football popular. Population young; poverty rates high.'
        }, {
            label: 'Cuba',
            weight: 0.0013,
            backgroundColor: '#002A8F',
            labelColor: '#FFFFFF',
            desc: 'Cuba is located in the Caribbean; Havana old town, cigars, rum, classic cars famous. Socialist system; healthcare and education free and relatively high quality. Music (son, salsa) and dance global influence. Recent economic difficulties; attempts at dollarization and tourism opening. But US sanctions and pandemic hit tourism hard. Culture rich; revolutionary history (Che Guevara) symbols strong. Aging population beginning. Beaches and music festivals attract tourists.'
        }, {
            label: 'Tajikistan',
            weight: 0.0013,
            backgroundColor: '#CC0000',
            labelColor: '#F0E68C',
            desc: 'Tajikistan is located in Central Asia Pamir Mountains; Dushanbe is the capital. Persian-speaking; culture close to Iran, Afghanistan. Cotton, hydropower, and aluminum exports important. Mountainous terrain; earthquakes frequent. Recent Chinese "Belt and Road" investment significant (roads, tunnels). Poverty rates high; remittance dependence strong. Islamic culture; traditional carpets and tea culture. Population young, growing fast. Mountain scenery (Pamir Highway) tourism potential great.'
        }, {
            label: 'Papua New Guinea',
            weight: 0.0013,
            backgroundColor: '#CE1126',
            labelColor: '#000000',
            desc: 'Papua New Guinea is located in Oceania; over 800 languages; culture extremely diverse. Port Moresby is capital. Minerals (gold, copper, LNG) exports dominate. Tropical rainforest and coral reefs biodiversity high. Tribal traditions strong; sing-sing festivals vibrant. But tribal conflicts, crime, and poor infrastructure severe. Population young, growing fast. Australian and Chinese investments active.'
        }, {
            label: 'Sweden',
            weight: 0.0013,
            backgroundColor: '#004B87',
            labelColor: '#FFCD00',
            desc: 'Sweden is located in Northern Europe; Stockholm is capital. Welfare state model; innovation strong (Spotify, IKEA, Volvo). Forest coverage high; renewable energy leading. Culture emphasizes equality, fika (coffee break), and auroras, Midsummer. Recent immigration increase brings integration challenges. Aging and high taxes coexist. Design, music (ABBA), and environmental awareness globally known. Quality of life extremely high; winters long.'
        }, {
            label: 'Czech Republic',
            weight: 0.0013,
            backgroundColor: '#FFFFFF',
            labelColor: '#11457E',
            desc: 'Czech Republic is located in Central Europe; Prague among Europe\'s most beautiful capitals, Charles Bridge and castle famous. Beer (Pilsner, Budweiser) culture deep. Economy transition successful; automotive (Škoda), machinery, and tourism developed. EU member; long history (Bohemia, Moravia). Culture represented by Kafka, Dvořák. Recent political stable, but corruption issues occasional. Spas (Karlovy Vary) and medieval town tourism resources rich.'
        }, {
            label: 'Portugal',
            weight: 0.0013,
            backgroundColor: '#006600',
            labelColor: '#FF0000',
            desc: 'Portugal is located on Iberian Peninsula\'s western end; Lisbon and Porto main cities. Age of Discovery history; azulejo tiles and fado music famous. Wine (Port), olive oil, seafood cuisine. Tourism developed (Algarve beaches, Sintra palaces). Recent economic recovery; golden visa attracts investment. Aging severe; youth outflow problem. Football (Ronaldo) national passion. Climate mild; pace of life leisurely.'
        }, {
            label: 'Azerbaijan',
            weight: 0.0013,
            backgroundColor: '#00AEEF',
            labelColor: '#E30A13',
            desc: 'Azerbaijan is located in South Caucasus; Baku is capital, "Land of Fire." Oil and gas exports dominate; "Belt and Road" node. Caspian Sea coast; modern architecture (Flame Towers) and ancient fire temples coexist. Culture blends Turkic, Persian, Russian elements. Recent Nagorno-Karabakh conflict resolved, territorial integrity restored; investing in tourism and diversification. Islam predominant but highly secular. Baku Old City World Heritage. Population young; economic growth relatively fast.'
        }, {
            label: 'Greece',
            weight: 0.0012,
            backgroundColor: '#0C6BCF',
            labelColor: '#FFFFFF',
            desc: 'Greece is birthplace of Western civilization; Athens Acropolis, Santorini, Mykonos famous. Tourism pillar; olive oil, feta cheese, Mediterranean diet global influence. Post-debt crisis economy gradually recovering; shipping industry world-leading. Cultural heritage rich (Delphi, Olympia). Recent migration and refugee pressures high. Aging and youth unemployment issues persist. Many islands; beaches and historical sites attract tourists. Hospitable; lifestyle leisurely.'
        }, {
            label: 'Togo',
            weight: 0.0012,
            backgroundColor: '#006A4E',
            labelColor: '#FF0000',
            desc: 'Togo is located in West Africa; Lomé is capital. Port transit trade and phosphate exports important. French-speaking; culturally diverse; Vodou and Christianity coexist. Recent infrastructure improvement (Chinese-funded); economic growth stable. But poverty and governance issues persist. Coastal lagoons and northern mountainous landscapes. Population young, growing fast. Politics long dominated by same family. Market culture active; traditional textiles and wood carving handicrafts.'
        }, {
            label: 'Hungary',
            weight: 0.0012,
            backgroundColor: '#477050',
            labelColor: '#FFFFFF',
            desc: 'Hungary is located in Central Europe; Budapest ("Pearl of the Danube") is capital. Thermal baths (Gellért), Rubik\'s Cube, Hungarian wine famous. Economy based on automotive (Audi, Mercedes plants), pharmaceuticals, IT outsourcing. EU member but politically conservative trend. Culture features folk music, paprika, goulash soup. Thermal tourism and Lake Balaton summer popular. Aging population; immigration policy strict. Long history; national pride strong.'
        }, {
            label: 'Israel',
            weight: 0.0012,
            backgroundColor: '#0038B8',
            labelColor: '#FFFFFF',
            desc: 'Israel is located in Middle East; Tel Aviv economic hub, Jerusalem religious holy site. High-tech "Startup Nation" (chips, cybersecurity, drip irrigation). Military strength strong; compulsory conscription. Culture blends Jewish tradition, Arab influence, global immigrants. Recent economy robust, but Israeli-Palestinian conflict long unresolved; security issues prominent. Dead Sea, Masada, Negev Desert tourist highlights. Innovation capabilities world-class; cost of living high. Population young, growing stable.'
        }, {
            label: 'Austria',
            weight: 0.0011,
            backgroundColor: '#EF3E42',
            labelColor: '#FFFFFF',
            desc: 'Austria is located in Central Europe; Vienna capital, classical music (Mozart, Strauss, Beethoven) capital. Alps skiing resorts (Tyrol). Economy developed; tourism, machinery, finance strong. EU member; neutrality tradition. Café culture, Sachertorte, waltz famous. Recent immigration increase; political rightward trend. Quality of life extremely high; welfare well-developed. Natural landscapes (lakes, mountains) and historic cities coexist.'
        }, {
            label: 'Belarus',
            weight: 0.0011,
            backgroundColor: '#C81107',
            labelColor: '#009E49',
            desc: 'Belarus is located in Eastern Europe; Minsk is capital. Close relations with Russia; economy depends on energy subsidies and manufacturing (tractors, fertilizers). Agriculture (potatoes, dairy) developed. Politics long dominated by Lukashenko; post-2020 protests and international sanctions increased pressure. Culture features Orthodox Christianity, Slavic tradition, circus famous. Forests and lakes coverage high; Chernobyl radiation impact persists. Aging population; youth outflow noticeable. Industrial base relatively strong, but innovation lacking.'
        }
    ],
}