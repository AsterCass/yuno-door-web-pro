import {Parser} from 'sql-ddl-to-json-schema'

//to delete
export const defaultSql = `
CREATE TABLE \`goods\` (

  \`item_id\` varchar(20) NOT NULL COMMENT '商品id',
  
  \`item_name\` varchar(200) NOT NULL COMMENT '商品标题',
  
  \`item_desc\` varchar(200)  COMMENT '商品描述',
  
  \`item_price\` decimal(8,2)  NOT NULL DEFAULT 0 COMMENT '商品价格',
  
  \`status\` int NOT NULL COMMENT '商品状态，0-正常，1- 下架 2-删除',
  
  \`create_time\` datetime NOT NULL COMMENT '创建时间',
  
  \`update_time\` datetime NOT NULL COMMENT '更新时间',
  
  PRIMARY KEY (\`goods_id\`)
  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='商品表';
`;

//sql data type to kotlin map
//https://github.com/duartealexf/sql-ddl-to-json-schema/blob/master/src/mysql/formatter/compact/models/datatype.ts
let sqlDataType2KotlinMap = new Map([
    ["int", "Int"], ["bit", "Int"], ["binary", "Int"], ["bit", "Int"],
    ["decimal", "BigDecimal"], ["float", "BigDecimal"], ["double", "BigDecimal"], ["boolean", "Boolean"],
    ["date", "Date"], ["time", "Date"], ["datetime", "Date"], ["timestamp", "Date"],
    ["blob", "String"], ["text", "String"], ["char", "String"], ["varchar", "String"],
])

let defaultValueMap = new Map([
    ["Int", " = 0"], ["String", " = \"\""], [""], ["Double", " = 0.0"], ["BigDecimal", " = BigDecimal.ZERO"],
    ["Boolean", " = false"], ["Date", " = Date()"], ["LocalDateTime", " = LocalDateTime.now()"]
])

//kotlin code result
let resCode = ""

//options
export let convertOptions = {
    packageName: "com.aster.extend",
    isLocalDateTime: false,
    isNeedComment: true,
    isCamelCase: true,
    isBigDecimal: true,
    isAllNullable: false,
    isSetDefaultValue: true,
}

//parser init
const parser = new Parser('mysql');
let tableObj = {}

function parseSql(sql) {
    try {
        const compactJsonTablesArray = parser.feed(sql).toCompactJson(parser.results);
        tableObj = compactJsonTablesArray[0]
    } catch (err) {
        return false
    }
    return true
}

//change line
function wrapWrite(text, textOther = "") {
    if (text) {
        return text + "\n" + textOther
    }
    return textOther
}

function camelBuilder(name, firstUpper = false) {
    if (!convertOptions.isCamelCase) {
        return name
    }
    let nameArr = name.split('')
    let upperIndex = firstUpper ? 0 : -1
    for (let index = 0; index < name.length; ++index) {
        if (upperIndex === index) {
            nameArr[index] = nameArr[index].toUpperCase()
            upperIndex = -1
        }
        if (nameArr[index] === '_') {
            upperIndex = index + 1
        }
    }
    return nameArr.join('').replaceAll('_', '')
}

//add package
function addPackage() {
    //package
    resCode = wrapWrite(resCode, 'package ' + convertOptions.packageName)
    //end
    resCode = wrapWrite(resCode)
}

function addImport() {
    const dataTypeArr = tableObj.columns.map(col => col.type.datatype)
    //date time
    if (dataTypeArr.includes("timestamp") || dataTypeArr.includes("date") ||
        dataTypeArr.includes("time") || dataTypeArr.includes("datetime")) {
        if (convertOptions.isLocalDateTime) {
            resCode = wrapWrite(resCode, "import java.time.LocalDateTime")
        } else {
            resCode = wrapWrite(resCode, "import java.util.Date")
        }
    }
    //decimal
    if (dataTypeArr.includes("decimal") && convertOptions.isBigDecimal) {
        resCode = wrapWrite(resCode, "import java.math.BigDecimal")
    }
    //end
    resCode = wrapWrite(resCode)
}

function addProperty() {
    for (let index in tableObj.columns) {
        let curColumn = tableObj.columns[index]

        let curName = camelBuilder(curColumn.name)
        let curType = sqlDataType2KotlinMap.get(curColumn.type.datatype)
        let isAllowNull = curColumn.options.nullable || convertOptions.isAllNullable
        let isAllowNullNotation = isAllowNull ? "?" : ""

        if (convertOptions.isLocalDateTime && "Date" === curType) {
            curType = "LocalDateTime"
        }
        if (!convertOptions.isBigDecimal && "BigDecimal" === curType) {
            curType = "Double"
        }
        if (!curType) {
            curType = "String"
        }

        if (convertOptions.isNeedComment) {
            let comment = curColumn.options.comment ? curColumn.options.comment : curName
            resCode = wrapWrite(resCode, `\n    /**\n     * ${comment}\n     */`)
        }

        let defaultValueStr = ""
        if (convertOptions.isSetDefaultValue) {
            defaultValueStr = " = null"
            if (!isAllowNull) {
                defaultValueStr = defaultValueMap.get(curType)
            }
        }

        resCode = wrapWrite(resCode,
            `    var ${curName}: ${curType}${isAllowNullNotation}${defaultValueStr},`)
    }
}

function addBody() {
    resCode = wrapWrite(resCode, "data class " +
        camelBuilder(tableObj.name, true) + " (")
    addProperty()
    resCode = wrapWrite(resCode, ")")
}

function buildResCode() {
    resCode = ""
    addPackage()
    addImport()
    addBody()
    return resCode
}

export function ddlConvertKotlinDataClass(sql) {
    if (parseSql(sql) && tableObj) {
        return buildResCode()
    }
    return ""
}